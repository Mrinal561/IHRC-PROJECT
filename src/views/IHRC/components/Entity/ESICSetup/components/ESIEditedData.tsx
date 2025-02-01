
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchEsiSetupById, updateEsiSetup } from '@/store/slices/esiSetup/esiSetupSlice';
import * as yup from 'yup';
import { Eye } from 'lucide-react';

interface ESISetupData {
  id: number;
  group_id: number;
  company_id: number;
  code_Type: string;
  code: string;
  esi_user: string;
  password: string;
  certificate?: string; 
  CompanyGroup?: {
    id: number;
    name: string;
  };
  Company?: {
    id: number;
    name: string;
  };
  district_id?:number;
  Location?:{
    name?:string;
    id?:number;
    District?:{
      id?:number;
      name?: string;
      State?:{
        id?:number;
        name?:string;
      }
    }
  }
}

interface ValidationErrors {
  code_Type?: string;
  code?: string;
  esi_user?: string;
  password?: string;
  certificate?:string;
}

interface ESIEditedDataProps {
  initialData: ESISetupData | null;
  onClose: () => void;
  onRefresh: () => void;
  id: number;
}

const esiSchema = yup.object().shape({
  code_Type: yup.string().required('Code type is required'),
  code: yup.string()
  .required('ESI code is required')
  .matches(/^[A-Za-z0-9]+$/, 'ESI code must contain only letters and numbers'),
  // esi_user: yup
  //   .string()
  //   .required('ESI user is required')
  //   .min(3, 'ESI user must be at least 3 characters'),
  // password: yup
  //   .string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters')
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  //     'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
  //   ),
});

const ESIEditedData: React.FC<ESIEditedDataProps> = ({
  initialData,
  onClose,
  onRefresh,
  id,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loader, setLoader] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<ESISetupData>({
    id: 0,
    group_id: 0,
    company_id: 0,
    code_Type: '',
    code: '',
    esi_user: '',
    password: '',
    certificate: '',
  });
  const storedId = id;

  const codeTypeOptions = [
    { value: 'main', label: 'Main' },
    { value: 'subcode', label: 'SubCode' },
  ];

  const handleDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.certificate) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.certificate}`;
        window.open(fullPath, '_blank');
    }
 };


  useEffect(() => {
    console.log(id)
    if (id) {
      fetchESIData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchESIData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchEsiSetupById(id))
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
      setFormData(response);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching ESI data:', err);
      setError('Failed to load ESI details');
      setLoading(false);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to load ESI details
        </Notification>
      );
    }
  };

  const validateField = async (field: keyof ESISetupData, value: string) => {
    try {
      // Create a schema for just this field
      const fieldSchema = yup.reach(esiSchema, field);
      await fieldSchema.validate(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: err.message }));
      }
    }
  };
  const handleChange = async (field: keyof ESISetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    await validateField(field, value);
  };

  const isFieldValid = (field: keyof ValidationErrors) => {
    return touched[field] && !errors[field];
  };



  const validateForm = async () => {
    try {
      await esiSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
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
      // Mark all fields as touched
      setLoader(true)
      const allFields = ['code_Type', 'code', 'esi_user', 'password'];
      setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

      const isValid = await validateForm();
      if (!isValid) return;

      const updateData = {
        group_id: formData.group_id,
        company_id: formData.company_id,
        district_id: formData.Location?.District?.id,
        location: formData?.Location?.name,
        code_Type: formData.code_Type,
        code: formData.code,
        esi_user: formData.esi_user,
        password: formData.password,
        certificate: formData.certificate,
      };

      if (!id) {
        toast.push(
          <Notification title="Error" type="danger">
            ESI Setup ID is missing
          </Notification>
        );
        return;
      }

      const resultAction = await dispatch(
        updateEsiSetup({
          id: id,
          esiData: updateData,
        })
      );

      if (resultAction) {
        toast.push(
          <Notification title="Success" type="success">
            ESI Data updated successfully
          </Notification>
        );
        onClose();
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (err) {
      console.error('Error updating ESI data:', err);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to update ESI data
        </Notification>
      );
    } finally {
      setLoader(false)
    }
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
              certificate: base64String
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Dialog isOpen={true} onClose={onClose} onRequestClose={onClose}  shouldCloseOnOverlayClick={false} >
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </Dialog>
    );
  }

return (
    <div className="p-4 space-y-6">
      {/* First Row: Company Group, Company, Code Type */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-[70px]">
          <p className="text-sm font-medium mb-2">Company Group</p>
          <OutlinedInput
            label="Company Group"
            value={formData.CompanyGroup?.name || ''}
            disabled
          />
        </div>
        <div className="h-[70px]">
          <p className="text-sm font-medium mb-2">Company</p>
          <OutlinedInput
            label="Company"
            value={formData.Company?.name || ''}
            disabled
          />
        </div>
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">Code Type</p>
          <OutlinedSelect
            label="Select Code Type"
            options={codeTypeOptions}
            value={codeTypeOptions.find((option) => option.value === formData.code_Type)}
            onChange={(option: any) => {
              handleChange('code_Type', option?.value || '');
            }}
          />
          {errors.code_Type && (
            <p className="text-red-500 text-xs mt-1">{errors.code_Type}</p>
          )}
        </div>
      </div>

      {/* Second Row: ESI Code, ESI User, Password */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">ESI Code</p>
          <OutlinedInput
            label="ESI Code"
            value={formData.code}
            onChange={(value) => handleChange('code', value)}
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">ESI User</p>
          <OutlinedInput
            label="ESI User"
            value={formData.esi_user}
            onChange={(value) => handleChange('esi_user', value)}
          />
          {errors.esi_user && (
            <p className="text-red-500 text-xs mt-1">{errors.esi_user}</p>
          )}
        </div>
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">Password</p>
          <OutlinedPasswordInput
            label="Password"
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
      </div>

      {/* ESI Certificate */}
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ESI Certificate(Accepted : Pdf/Zip/Image(Max Size: 20mb))</label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept=".pdf, .zip , .jpg"
            />
            {formData.certificate && (
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
      <div className="flex justify-end gap-2">
        <Button variant="plain" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" onClick={handleSubmit} loading={loader}>
          Confirm
        </Button>
      </div>
    </div>
);
};

export default ESIEditedData;