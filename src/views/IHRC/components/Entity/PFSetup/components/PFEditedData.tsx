
import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, Select, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFSetupData } from './PFSetupTable';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchPFById, updatePF } from '@/store/slices/pfSetup/pfSlice';
import * as yup from 'yup';


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

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

const PFEditedData: React.FC<PFEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<PFSetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    pf_code: '',
    pfCodeLocation: '',
    register_date: '',
    pf_user: '',
    password: '',
    authorizedSignatory: '',
    signatoryDesignation: '',
    signatoryMobile: '',
    signatoryEmail: '',
    dscValidDate: '',
    esign: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (id) {
      fetchPFData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

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
      setFormData(response);
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

  const handleSubmit = async() => {
    try {
    // Create updateData object (matching the original updateTracker data expectation)

    const isValid = await validateForm();
    if(!isValid) return;

    const updateData = {
      pf_code: formData.pf_code,
      pf_user: formData.pf_user,
      password: formData.password,
      register_date: formData.register_date || '',
    };

    // Dispatch updateTracker with id and updateData
    const resultAction = await dispatch(updatePF({
      id: id, 
      pfData: updateData 
    }));

      onClose();
      if (resultAction) {
        openNotification('success', 'PF Setup edited successfully');
         if (onRefresh) {
          onRefresh();
        }
      }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
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
    <div className="p-2 space-y-1">
      {/* First row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Enter the PF Code</label>
          <div>
            <OutlinedInput
              label="PF Code"
              value={formData.pf_code}
              onChange={(value) => handleChange('pf_code', value)}
            />
            <div className="h-5">
              {errors.pf_code && (
                <div className="text-red-500 text-sm">{errors.pf_code}</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Enter PF user</label>
          <div>
            <OutlinedInput
              label="PF User"
              value={formData.pf_user}
              onChange={(value) => handleChange('pf_user', value)}
            />
            <div className="h-5">
              {errors.pf_user && (
                <div className="text-red-500 text-sm">{errors.pf_user}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Enter PF User Password</label>
          <div>
            <OutlinedInput
              label="PF Password"
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">PF Registration Date</label>
          <div>
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

      {/* Button row */}
      <div className="flex justify-end gap-4">
        <Button variant="plain" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" onClick={handleSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default PFEditedData;

