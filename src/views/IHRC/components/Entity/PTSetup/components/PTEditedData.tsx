

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { PTSetupData } from './PTSetupTable';
import { fetchptsetupById, updatePT } from '@/store/slices/ptSetup/ptSetupSlice';
import * as yup from 'yup';


interface ValidationErrors {
  register_number?: string;
  enroll_number?: string;
  username?:string;
  password?:string;
  email?: string;
  mobile?: string;
  register_date?: Date;
}

const ptSchema = yup.object().shape({
  register_number: yup
    .string()
    .required('Register Number is required'),
    enroll_number: yup
    .string()
    .required('Enrollment Number is required'),
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
    email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    // .positive('Mobile number must be positive')
    // .integer('Mobile number must be an integer')
    .test('len', 'Mobile number must be exactly 10 digits', (val) => 
      val ? val.toString().length === 10 : false
    ),
    register_date: yup
    .date()
    .required('Registration date is required')
    .max(new Date(), 'Registration date cannot be in the future'),
});
interface PTEditedDataProps {
  id?: number;
  initialData?: PTSetupData | null;
  onClose: () => void;
  onSubmit: (data: PTSetupData) => void;
  onRefresh?: () => void;
}

const PTEditedData: React.FC<PTEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<PTSetupData>({
    register_number: '',
    enroll_number: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    register_date: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (id) {
      fetchPTData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchPTData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchptsetupById(id))
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
      console.error('Error fetching PT data:', err);
      setError('Failed to load PT details');
      setLoading(false);
      openNotification('danger', 'Failed to load PT details');
    }
  };

  const handleChange = (field: keyof PTSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = async () => {
    try {
        // Validate the form data against the schema
        await ptSchema.validate({
          register_number: formData.register_number,
          mobile: formData.mobile,
            enroll_number: formData.enroll_number,
            username: formData.username,
            password: formData.password,
            email: formData.email,
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
      // Implement your update logic similar to LW
      const updateData = {
        register_number: formData.register_number,
        enroll_number: formData.enroll_number,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        mobile: formData.mobile,
        register_date: formData.register_date || '',
      };

      const resultAction = await dispatch(updatePT({
        id: id, 
        data: updateData 
      }));

        //   onSubmit(formData);
        if (resultAction) {
            onClose();
            
            if (onRefresh) {
              onRefresh();
            }
            openNotification('success', 'PT Setup edited successfully'); 
        }
      
    } catch (err) {
      console.error('Error submitting PT data:', err);
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
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT Registration Number</label>
          <div className="w-full">
            <OutlinedInput
              label="PT Registration Number"
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
          <label>Enter PT Enrollment Number</label>
          <div className="w-full">
            <OutlinedInput
              label="PT Enrollment Number"
              value={formData.enroll_number}
              onChange={(value) => handleChange('enroll_number', value)}
            />
            <div className="h-5">
              {errors.enroll_number && (
                <div className="text-red-500 text-sm">{errors.enroll_number}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT User ID</label>
          <div className="w-full">
            <OutlinedInput
              label="PT User ID"
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
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT Password</label>
          <div className="w-full">
            <OutlinedInput
              label="PT Password"
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
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>Enter Email</label>
          <div className="w-full">
            <OutlinedInput
              label="Email"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
            />
            <div className="h-5">
              {errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Enter Mobile Number</label>
          <div className="w-full">
            <OutlinedInput
              label="Mobile Number"
              value={formData.mobile}
              onChange={(value) => handleChange('mobile', value)}
            />
             <div className="h-5">
              {errors.mobile && (
                <div className="text-red-500 text-sm">{errors.mobile}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>PT Registration Date</label>
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

export default PTEditedData;
