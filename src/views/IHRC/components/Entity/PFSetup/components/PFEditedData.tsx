
import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, Select, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFSetupData } from './PFSetupTable';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchPFById, updatePF } from '@/store/slices/pfSetup/pfSlice';
import * as yup from 'yup';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import DistrictAutosuggest from '../../Branch/components/DistrictAutoSuggest';
import LocationAutosuggest from '../../Branch/components/LocationAutosuggest';
import { Eye } from 'lucide-react';


interface ValidationErrors {
  pf_code?: string;
  pf_user?:string;
  password?:string;
  register_date?: Date;
}

const pfSchema = yup.object().shape({
    pf_code: yup
    .string()
    .required('PF Code is required')
    .matches(/^[A-Za-z0-9]+$/, 'ESI code must contain only letters and numbers'),
    // pf_user: yup
    // .string(),
    // password: yup
    // .string(),
    // .required('Password is required')
    // .min(8, 'Password must be at least 8 characters'),
    register_date: yup
    .date()
    .required('Registration date is required')
    .max(new Date(), 'Registration date cannot be in the future'),
});
interface PFEditedDataProps {
  id: number;
  initialData?: PFSetupData | null;
  onClose: () => void;
  onSubmit: (data: PFSetupData) => void;
  onRefresh: () => void;
}

interface PFSetupData {
  group_id?: number;
  company_id?: number;
  state_id?: number;
  district: string;
  location: string;
  pf_code: string;
  register_date: Date | string | null;
  register_certificate: string;
  signatory_data: SignatoryData[];
  pf_user: string;
  password: string;
  Company_Group_Name?: string;
  Company_Name?: string;
}

interface SignatoryData {
  signatory_id: number;
  dsc_validity: string;
  e_sign: string;
  e_sign_status: string;
}

const PFEditedData: React.FC<PFEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<PFSetupData>({
    group_id: 0,
    company_id: 0,
    state_id: 0,
    district: '',
    location: '',
    pf_code: '',
    register_date: null,
    register_certificate: '',
    signatory_data: [],
    pf_user: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [states, setStates] = useState<Array<{ value: string; label: string }>>([]);
  const [selectedState, setSelectedState] = useState<{ value: string; label: string } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedSignatories, setSelectedSignatories] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number>();
  const [loader, setLoader] = useState(false)
  
  const handleDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.register_certificate) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.register_certificate}`;
        window.open(fullPath, '_blank');
    }
 };
 const handleLeaseDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.register_certificate) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.register_certificate}`;
        window.open(fullPath, '_blank');
    }
 };
  useEffect(() => {
    loadStates();
    loadUsers();
    if (id) {
      fetchPFData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const loadStates = async () => {
    try {
      const response = await httpClient.get(endpoints.common.state());
      if (response.data) {
        const formattedStates = response.data.map((state: any) => ({
          label: state.name,
          value: String(state.id),
        }));
        setStates(formattedStates);
      }
    } catch (error) {
      console.error('Failed to load states:', error);
      showErrorNotification('Failed to load states');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await httpClient.get(endpoints.user.getAll());
      if (response.data) {
        const formattedUsers = response.data.data.map((user: any) => ({
          id: user.user_details.id,
          name: user.user_details.name,
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
      showErrorNotification('Failed to load users');
    }
  };

  const fetchPFData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchPFById(id))
        .unwrap()
        .catch((error: any) => {
          if (error.response?.data?.message) {
            showErrorNotification(error.response.data.message);
          } else if (error.message) {
            showErrorNotification(error.message);
          } else if (Array.isArray(error)) {
            showErrorNotification(error);
          }
          throw error;
        });

      // Transform the signatory data to include details
      const transformedSignatoryData = response.signatory_data.map((signatory: any) => ({
        signatory_id: signatory.signatory_id,
        dsc_validity: signatory.dsc_validity,
        e_sign: '',
        e_sign_status: signatory.e_sign_status,
        details: signatory.details // Keep the details for display
      }));

      // Transform the data including company group and company names
      const transformedData = {
        ...response,
        Company_Group_Name: response.CompanyGroup?.name || '',
        Company_Name: response.Company?.name || '',
        signatory_data: transformedSignatoryData
      };

      setFormData(transformedData);
      
      // Handle nested location data
      if (response.Location) {
        // Set state
        const stateData = response.Location.District?.State;
        if (stateData) {
          const stateOption = {
            value: String(stateData.id),
            label: stateData.name
          };
          setSelectedState(stateOption);
          handleChange('state_id', stateData.id);
        }

        // Set district
        const districtData = response.Location.District;
        if (districtData) {
          setSelectedDistrict(districtData.name);
          setSelectedDistrictId(districtData.id);
          handleChange('district', districtData.name);
        }

        // Set location
        setSelectedLocation(response.Location.name);
        handleChange('location', response.Location.name);
      }
      
      // Update signatory selection with complete data from signatory_data
      const signatoryUsers = response.signatory_data.map((signatory: any) => ({
        id: signatory.signatory_id,
        name: signatory.details.name,
        email: signatory.details.email,
        role: signatory.details.Role?.name
      }));
      setSelectedSignatories(signatoryUsers);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching PF data:', err);
      setError('Failed to load PF details');
      setLoading(false);
      openNotification('danger', 'Failed to load PF details');
    }
  };


  const handleChange = (field: keyof PFSetupData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate fields that have validation rules
    if (field === 'pf_code' || field === 'pf_user' || field === 'password' || field === 'register_date') {
      validateField(field, value);
    }
  };


  const handleSignatoryChange = (newSignatories: Array<{ value: string; label: string }>) => {
    const signatoryData = newSignatories.map(sig => ({
      signatory_id: Number(sig.value),
      dsc_validity: '',
      e_sign: '',
      e_sign_status: 'active',
    }));
    
    setFormData(prev => ({
      ...prev,
      signatory_data: signatoryData,
    }));

    const selectedUsers = newSignatories.map(sig => 
      users.find(user => user.id === Number(sig.value))
    ).filter(user => user) as Array<{ id: number; name: string }>;
    setSelectedSignatories(selectedUsers);
  };

  const handleStateChange = (option: { value: string; label: string } | null) => {
    setSelectedState(option);
    // Reset district and location when state changes
    setSelectedDistrict('');
    setSelectedDistrictId(undefined);
    setSelectedLocation('');
    handleChange('district', '');
    handleChange('location', '');
    
    if (option) {
      handleChange('state_id', Number(option.value));
    }
  };
  const handleDistrictChange = (value: string, districtId?: number) => {
    setSelectedDistrict(value);
    setSelectedDistrictId(districtId);
    handleChange('district', value);
    // Reset location when district changes
    setSelectedLocation('');
    handleChange('location', '');
  };

  // Update location handling
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    handleChange('location', value);
  };
  const handleDateChange = (date: Date | null) => {
    handleChange('register_date', date);
    validateField('register_date', date);
  };

  const validateField = async (field: keyof ValidationErrors, value: any) => {
    try {
      // Create a schema for just this field
      const fieldSchema = yup.reach(pfSchema, field);
      await fieldSchema.validate(value);
      
      // Clear error for this field if validation passes
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Set error for just this field
        setErrors(prev => ({
          ...prev,
          [field]: err.message
        }));
      }
    }
  };


  const validateForm = async () => {
    try {
        // Validate the form data against the schema
        await pfSchema.validate({
            pf_code: formData.pf_code,
            pf_user: formData.pf_user,
            password: formData.password,
            register_date: formData.register_date ? new Date(formData.register_date) : undefined
        }, { abortEarly: false });
        
        // Clear any existing errors if validation passes
        setErrors({});
        return true;
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            const validationErrors: ValidationErrors = {};
            err.inner.forEach((error) => {
                if (error.path) {
                    // Update the ValidationErrors interface to include all possible fields
                    validationErrors[error.path as keyof ValidationErrors] = error.message;
                }
            });
            setErrors(validationErrors);
        }
        return false;
    }
};

const handleSubmit = async () => {
  try {
    setLoader(true)
    const isValid = await validateForm();
    if (!isValid) return;

    // Create updateData object with exact required fields
    const updateData = {
      // IDs
      group_id: formData.group_id,
      company_id: formData.company_id,
      state_id: selectedState ? Number(selectedState.value) : undefined,
      
      // Location data
      district: selectedDistrict || undefined,
      location: selectedLocation || undefined,
      
      // PF details
      pf_code: formData.pf_code || undefined,
      pf_user: formData.pf_user || undefined,
      password: formData.password || undefined,
      
      // Registration details
      register_date: formData.register_date || undefined,
      register_certificate: formData.register_certificate || undefined,
      
      // Signatory data
      signatory_data: formData.signatory_data || undefined
    };

    // Remove any undefined values to keep the payload clean
    const cleanedUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    // Dispatch update action
    const resultAction = await dispatch(
      updatePF({
        id: id,
        pfData: cleanedUpdateData
      })
    );

    if (resultAction) {
      openNotification('success', 'PF Setup edited successfully');
      if (onRefresh) {
        onRefresh();
      }
      onClose();
    }
  } catch (err) {
    console.error('Error submitting PF data:', err);
    openNotification('danger', 'Failed to save changes');
  } finally {
    setLoader(false)
  }
};

  const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {message}
      </Notification>
    );
  };
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
      try {
          const base64String = await convertToBase64(file);
          setFormData(prev => ({
              ...prev,
              register_certificate: base64String
          }));
      } catch (error) {
          console.error('Error converting file to base64:', error);
          toast.push(
              <Notification title="Error" type="danger">
                  Failed to process certificate
              </Notification>
          );
      }
  }
};

  if (error) {
    return (
      <Dialog
        isOpen={true}
        onClose={onClose}
        onRequestClose={onClose}
        width={800}
        height={600}
        shouldCloseOnOverlayClick={false} 
      >
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </Dialog>
    );
  }

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 space-y-3">
      {/* First Row: Company Group, Company, PF Code */}
      <div className="grid grid-cols-3 gap-3">
      
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Group</label>
          <OutlinedInput
            label="Company Group"
            value={formData.Company_Group_Name || ''}
            disabled
          />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <OutlinedInput
            label="Company"
            value={formData.Company_Name || ''}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PF Code</label>
          <OutlinedInput
            label="PF Code"
            value={formData.pf_code}
            onChange={(value) => handleChange('pf_code', value)}
          />
          {errors.pf_code && (
            <p className="mt-0.5 text-xs text-red-600">{errors.pf_code}</p>
          )}
        </div>
      </div>

      {/* Second Row: PF User, Password, Registration Date */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PF User</label>
          <OutlinedInput
            label="PF User"
            value={formData.pf_user}
            onChange={(value) => handleChange('pf_user', value)}
          />
          {errors.pf_user && (
            <p className="mt-0.5 text-xs text-red-600">{errors.pf_user}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <OutlinedInput
            label="Password"
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
          />
          {errors.password && (
            <p className="mt-0.5 text-xs text-red-600">{errors.password}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PF Registration Date</label>
          <DatePicker
            size="sm"
            value={formData.register_date ? new Date(formData.register_date) : null}
            onChange={handleDateChange}
          />
          {errors.register_date && (
            <p className="mt-0.5 text-xs text-red-600">{errors.register_date}</p>
          )}
        </div>
      </div>

      {/* Signatories Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Signatories</label>
        <Select
          isDisabled
          isMulti
          options={users.map(user => ({
            value: String(user.id),
            label: user.name,
          }))}
          value={selectedSignatories.map(signatory => ({
            value: String(signatory.id),
            label: signatory.name
          }))}
          onChange={handleSignatoryChange}
        />
      </div>

      {/* Selected Signatories Details */}
      {/* {selectedSignatories.length > 0 && (
        <div className="border rounded-lg p-2 space-y-2">
          <h6 className="font-semibold text-sm">Selected Signatories</h6>
          {selectedSignatories.map((signatory, index) => (
            <div key={signatory.id} className="border p-2 rounded-lg">
              <h4 className="text-sm mb-2">{signatory.name}</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DSC Validity</label>
                  <DatePicker
                    disabled
                    size="sm"
                    value={formData.signatory_data[index]?.dsc_validity ? new Date(formData.signatory_data[index].dsc_validity) : null}
                    onChange={(date) => {
                      const newSignatoryData = [...formData.signatory_data];
                      newSignatoryData[index] = {
                        ...newSignatoryData[index],
                        dsc_validity: date ? date.toISOString() : '',
                      };
                      handleChange('signatory_data', newSignatoryData);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-sign Status</label>
                  <Select
                    size="sm"
                    isDisabled
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                    value={{
                      value: formData.signatory_data[index]?.e_sign_status || 'inactive',
                      label: (formData.signatory_data[index]?.e_sign_status || 'inactive').charAt(0).toUpperCase() +
                        (formData.signatory_data[index]?.e_sign_status || 'inactive').slice(1)
                    }}
                    onChange={(option) => {
                      const newSignatoryData = [...formData.signatory_data];
                      newSignatoryData[index] = {
                        ...newSignatoryData[index],
                        e_sign_status: option?.value || 'inactive',
                      };
                      handleChange('signatory_data', newSignatoryData);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* Certificate Upload Section */}
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PF Certificate(Accepted : Pdf/Zip/Image(Max Size: 20mb))</label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept=".pdf, .zip, .jpg"
            />
            {formData.register_certificate && (
              <button
                onClick={handleDocumentView}
                className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
                title="View Document"
              >
                <Eye size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        <Button variant="plain" onClick={onClose}>Cancel</Button>
        <Button variant="solid" onClick={handleSubmit} disabled={loading} loading={loader}>
          Confirm
        </Button>
      </div>
    </div>
);
};

export default PFEditedData;

