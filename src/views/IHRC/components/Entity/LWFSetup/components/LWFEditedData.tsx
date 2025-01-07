
import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchLwfById, updateLwf } from '@/store/slices/lwfSetup/lwfTrackerSlice';
import * as yup from 'yup';


interface ValidationErrors {
  register_number?: string;
  username?:string;
  password?:string;
  register_date?: Date;
}

const lwfSchema = yup.object().shape({
  register_number: yup
    .string()
    .required('Register Number is required'),
    username: yup
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
interface LWFEditedDataProps {
  id: number;
  initialData?: LWFSetupData | null;
  onClose: () => void;
  onSubmit: (data: LWFSetupData) => void;
  onRefresh: () => void;
}

interface LWFSetupData {
  register_number: string;
  username: string;
  password: string;
  register_date: string;
}

const LWFEditedData: React.FC<LWFEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<LWFSetupData>({
    register_number: '',
    username: '',
    password: '',
    register_date: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

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

  const handleChange = (field: keyof LWFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const validateForm = async () => {
    try {
        // Validate the form data against the schema
        await lwfSchema.validate({
          username: formData.username,
          register_number: formData.register_number,
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
      if(!isValid) return;
      const updateData = {
        register_number: formData.register_number,
        username: formData.username,
        password: formData.password,
        register_date: formData.register_date || '',
      };

      const resultAction = await dispatch(updateLwf({
        id: id, 
        data: updateData 
      }));

      onClose();
      if (resultAction) {
        openNotification('success', 'LWF Setup edited successfully');
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (err) {
      console.error('Error submitting LWF data:', err);
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
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <label>Enter LWF Registration Number</label>
          <div className="w-[352px]">
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
        <div className="flex flex-col gap-2">
          <label>Enter LWF User ID</label>
          <div className="w-[352px]">
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

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <label>Enter LWF Password</label>
          <div className="w-[352px]">
            <OutlinedInput
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
