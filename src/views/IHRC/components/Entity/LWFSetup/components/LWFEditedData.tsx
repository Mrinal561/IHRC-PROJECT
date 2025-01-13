
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DatePicker, toast, Notification, Input } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchLwfById, updateLwf } from '@/store/slices/lwfSetup/lwfTrackerSlice';
import * as yup from 'yup';
import { Eye } from 'lucide-react';

interface ValidationErrors {
  register_number?: string;
  username?: string;
  password?: string;
  register_date?: Date;
  remmit_mode?: string;
}

interface Company {
  id: number;
  name: string;
}

interface CompanyGroup {
  id: number;
  name: string;
}

interface LWFSetupData {
  register_number: string;
  username: string;
  password: string;
  register_date: string;
  remmit_mode: string;
  Company?: Company;
  CompanyGroup?: CompanyGroup;
  certificate?:string;
  signatory_id?:number;
}

const lwfSchema = yup.object().shape({
  register_number: yup
    .string()
    .required('Register Number is required'),
  // username: yup
  //   .string()
  //   .required('User is required')
  //   .min(3, 'Username must be at least 3 characters'),
  // password: yup
  //   .string()
  //   .required('Password is required')
  //   .min(8, 'Password must be at least 8 characters')
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  //     'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
  //   ),
  register_date: yup
    .date()
    .required('Registration date is required')
    .max(new Date(), 'Registration date cannot be in the future'),
  remmit_mode: yup
    .string()
    .required('Remittance mode is required')
    .oneOf(['online', 'offline'], 'Invalid remittance mode'),
});

interface LWFEditedDataProps {
  id: number;
  initialData?: LWFSetupData | null;
  onClose: () => void;
  onSubmit: (data: LWFSetupData) => void;
  onRefresh: () => void;
}

const LWFEditedData: React.FC<LWFEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh,
}) => {
  const [formData, setFormData] = useState<LWFSetupData>({
    register_number: '',
    username: '',
    password: '',
    register_date: '',
    remmit_mode: '',
    certificate:'',
    signatory_id: 0
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const remittanceModeOptions = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' }
  ];

  const handleDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.certificate) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.certificate}`;
        window.open(fullPath, '_blank');
    }
 };
 const handleLeaseDocumentView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.certificate) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${formData.certificate}`;
        window.open(fullPath, '_blank');
    }
 };

  useEffect(() => {
    if (id) {
      fetchLWFData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchLWFData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchLwfById(id))
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
      console.error('Error fetching LWF data:', err);
      setError('Failed to load LWF details');
      setLoading(false);
      openNotification('danger', 'Failed to load LWF details');
    }
  };

  const validateForm = async () => {
    try {
      await lwfSchema.validate({
        username: formData.username,
        register_number: formData.register_number,
        password: formData.password,
        register_date: formData.register_date ? new Date(formData.register_date) : undefined,
        remmit_mode: formData.remmit_mode
      }, { abortEarly: false });
      
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

const validateField = async (field: keyof LWFSetupData, value: any) => {
  try {
    // Create a schema for just this field
    const fieldSchema = yup.reach(lwfSchema, field);
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

// Modified handleChange function with real-time validation
const handleChange = (field: keyof LWFSetupData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  
  // Special handling for register_date since it needs to be converted to Date
  if (field === 'register_date') {
    validateField(field, value ? new Date(value) : undefined);
  } else {
    validateField(field, value);
  }
};

// Modified handleSubmit to still do a final validation
const handleSubmit = async () => {
  try {
    const isValid = await validateForm();
    if (!isValid) return;
    
    const updateData = {
      register_number: formData.register_number,
      username: formData.username,
      password: formData.password,
      register_date: formData.register_date || '',
      remmit_mode: formData.remmit_mode,
      signatory_id: formData.signatory_id,
      certificate: formData.certificate,
    };

    const resultAction = await dispatch(updateLwf({
      id: id, 
      data: updateData 
    }));

    if (resultAction) {
      onClose();
      if (onRefresh) {
        onRefresh();
      }
      openNotification('success', 'LWF Setup edited successfully');
    }
  } catch (err) {
    console.error('Error submitting LWF data:', err);
    openNotification('danger', 'Failed to save changes');
  }
};

// For the Select component, we need to modify its onChange handler
const handleRemitModeChange = (option: { value: string; label: string } | null) => {
  const value = option ? option.value : '';
  handleChange('remmit_mode', value);
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
      {/* Company and Group Information */}
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* Registration Number and User ID */}
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>Enter LWF Registration Number</label>
          <div className="w-full">
            <OutlinedInput
              label="LWF Registration Number"
              value={formData.register_number}
              onChange={(value) => handleChange('register_number', value)}
            />
            <div className="h-5">
              {errors.register_number && (
                <div className="text-red-500 text-sm">{errors.register_number}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Enter LWF User ID</label>
          <div className="w-full">
            <OutlinedInput
              label="LWF User ID"
              value={formData.username}
              onChange={(value) => handleChange('username', value)}
            />
            <div className="h-5">
              {errors.username && (
                <div className="text-red-500 text-sm">{errors.username}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password and Registration Date */}
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>Enter LWF Password</label>
          <div className="w-full">
            <OutlinedPasswordInput
              label="LWF Password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
            />
            <div className="h-5">
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>LWF Registration Date</label>
          <div className="w-full">
            <DatePicker
              size="sm"
              placeholder="Select date"
              value={formData.register_date ? new Date(formData.register_date) : null}
              onChange={(date) => handleChange('register_date', date?.toISOString() || '')}
            />
            <div className="h-5">
              {errors.register_date && (
                <div className="text-red-500 text-sm">{errors.register_date}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Remittance Mode */}
      <div className="grid grid-cols-2 gap-4">
  {/* Remit Mode Section */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-700 mb-2">Remit Mode</label>
    <div>
      <OutlinedSelect
        label="Select Mode"
        options={remittanceModeOptions}
        value={formData.remmit_mode ? { 
          value: formData.remmit_mode, 
          label: formData.remmit_mode.charAt(0).toUpperCase() + formData.remmit_mode.slice(1) 
        } : null}
        onChange={handleRemitModeChange}
      />
      <div className="h-5">
        {errors.remmit_mode && (
          <div className="text-red-500 text-sm">{errors.remmit_mode}</div>
        )}
      </div>
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">LWF Certificate</label>
    <div className="flex items-center gap-2">
    <Input
      type="file"
      onChange={handleFileChange}
      className="w-full"
      accept=".pdf" 
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

      <div className="flex justify-end mt-6">
        <Button variant="plain" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button variant="solid" onClick={handleSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default LWFEditedData;