
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


interface ValidationErrors {
  pf_code?: string;
  pf_user?:string;
  password?:string;
  register_date?: Date;
}

const pfSchema = yup.object().shape({
    pf_code: yup
    .string()
    .required('PF Code is required'),
    pf_user: yup
    .string()
    .required('PF User is required')
    .min(3, 'Username must be at least 3 characters'),
    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
    ),
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
  location_id?:string;
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

      // Transform the data including company group and company names
      const transformedData = {
        ...response,
        Company_Group_Name: response.CompanyGroup?.name || '',
        Company_Name: response.Company?.name || '',
        signatory_data: [{
          signatory_id: response.signatory_id,
          dsc_validity: response.dsc_validity,
          e_sign: '',
          e_sign_status: response.e_sign_status
        }]
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
      
      // Update signatory selection with complete data
      if (response.Signatory) {
        const signatoryUser = {
          id: response.Signatory.id,
          name: response.Signatory.name
        };
        setSelectedSignatories([signatoryUser]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching PF data:', err);
      setError('Failed to load PF details');
      setLoading(false);
      openNotification('danger', 'Failed to load PF details');
    }
  };


  const handleChange = (field: keyof PFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
  const handleLocationChange = (value: string, locationId?: number) => {
    setSelectedLocation(value);
    setSelectedLocationId(locationId);
    handleChange('location', value);
    handleChange('location_id', locationId); // Add location_id to your form data if needed
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

  if (error) {
    return (
      <Dialog
        isOpen={true}
        onClose={onClose}
        onRequestClose={onClose}
        width={800}
        height={600}
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
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <OutlinedInput
            label="Company Group"
            value={formData.Company_Group_Name || ''}
            disabled
          />
        </div>
        <div>
          <OutlinedInput
            label="Company"
            value={formData.Company_Name || ''}
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <OutlinedInput
            label="PF Code"
            value={formData.pf_code}
            onChange={(value) => handleChange('pf_code', value)}
            error={errors.pf_code}
          />
        </div>
        <div>
          <OutlinedSelect
            label="Select State"
            options={states}
            value={selectedState}
            onChange={handleStateChange}
            // isDisabled={true}
            // error={errors.state_id}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DistrictAutosuggest
          value={selectedDistrict}
          onChange={(value: string) => handleDistrictChange(value)}
          stateId={selectedState ? parseInt(selectedState.value) : undefined}
          onDistrictSelect={setSelectedDistrictId}
          // error={errors.district}
          // isDisabled={true}
        />
        <LocationAutosuggest
          value={selectedLocation}
          locationId={selectedLocationId}
          onChange={(value: string) => handleLocationChange(value)}
          districtId={selectedDistrictId}
          // error={errors.location}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <OutlinedInput
            label="PF User"
            value={formData.pf_user}
            onChange={(value) => handleChange('pf_user', value)}
            error={errors.pf_user}
          />
        </div>
        <div>
          <OutlinedInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
            error={errors.password}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
                            PF Registration Date
                        </label>
      <DatePicker
        // label="Registration Date"
        value={formData.register_date ? new Date(formData.register_date) : null}
        onChange={(date) => handleChange('register_date', date)}
        // error={errors.register_date}
      />
    </div>
    <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
                            Choose the Signatories
                        </label>
      <Select
      isDisabled
        isMulti
        label="Select Signatories"
        options={users.map(user => ({
          value: String(user.id),
          label: user.name,
        }))}
        value={selectedSignatories.map(signatory => ({
          value: String(signatory.id),
          label: signatory.name
        }))}
        onChange={handleSignatoryChange}
        // error={errors.signatory_data}
      />
    </div>
  </div>

  {selectedSignatories.length > 0 && (
  <div className="space-y-4 border rounded-lg p-4">
    <h6 className="font-semibold">Selected Signatories</h6>
    {selectedSignatories.map((signatory, index) => (
      <div key={signatory.id} className="border p-4 rounded-lg">
        <h4 className="text-sm mb-4">{signatory.name}</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DatePicker
             disabled
              label="DSC Valid Upto"
              value={formData.signatory_data[index]?.dsc_validity ? new Date(formData.signatory_data[index].dsc_validity) : null}
              onChange={(date) => {
                const newSignatoryData = [...formData.signatory_data];
                newSignatoryData[index] = {
                  ...newSignatoryData[index],
                  dsc_validity: date ? date.toISOString() : '',
                };
                handleChange('signatory_data', newSignatoryData);
              }}
              // error={errors[`signatory_data.${index}.dsc_validity`]}
            />
          </div>
          <div>
            <Select
            isDisabled
              // label="E-Sign Status"
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
              // error={errors[`signatory_data.${index}.e_sign_status`]}
            />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-6">
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button variant='solid' onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Update PF Setup'}
        </Button>
      </div>
    </div>
  );
};

export default PFEditedData;

