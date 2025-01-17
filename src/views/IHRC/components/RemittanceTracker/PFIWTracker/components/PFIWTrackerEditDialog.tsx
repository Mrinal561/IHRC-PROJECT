
import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFIWTrackerData } from './PFIWTrackerTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchPfiwTrackerById, updatePfiwTracker } from '@/store/slices/pftracker/pfTrackerSlice';
import * as yup from 'yup';

interface PfChallanData {
  id: number;
  trrn_no?: string;
  crn_no?: string;
  epf_wage?: number;
  eps_wage?: number;
  total_challan_amt?: number;
  payroll_month?: string;
  dueDate?: string;
  payment_date?: string;
  challan_type?: string;
  no_of_emp?: number;
  delay_in_days?: string;
  delay_reason?: string;
  submit_date?: string;
}

interface ValidationErrors {
  submit_date?: string;
  delay_reason?: string;
}

const validationSchema = yup.object().shape({
  submit_date: yup
    .date()
    .required('Submission date is required')
    .typeError('Please enter a valid date'),
  delay_reason: yup
    .string()
    .required('Delay reason is required')
    .min(5, 'Delay reason must be at least 5 characters'),
});


interface PFIWTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PfChallanData) => void;
  trackerid: number;
   onRefresh: () => void;
}

const PFIWTrackerEditDialog: React.FC<PFIWTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerid,
  onRefresh
}) => {
  const [editedData, setEditedData] = useState<PfChallanData>({
    id:trackerid
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && trackerid) {
      fetchPFIWTrackerData();
    }
  }, [isOpen, trackerid]);

  const fetchPFIWTrackerData = async () => {
    try {
      const response = await dispatch((fetchPfiwTrackerById(trackerid)))
            .unwrap()
            .catch((error: any) => {
                // Handle different error formats
                if (error.response?.data?.message) {
                    // API error response
                    showErrorNotification(error.response.data.message);
                } else if (error.message) {
                    // Regular error object
                    showErrorNotification(error.message);
                } else if (Array.isArray(error)) {
                    // Array of error messages
                    showErrorNotification(error);
                } else {
                    // Fallback error message
                    // showErrorNotification('An unexpected error occurred. Please try again.');
                }
                throw error; // Re-throw to prevent navigation
            });
      setEditedData(response);
      setValidationErrors({});
    } catch (error) {
      setError('Failed to load PFIW Tracker details');
      console.error('Error fetching PFIW Tracker data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PFIWTrackerData, value: string | number) => {
    setEditedData((prev) => ({...prev, [field]: value }));
    setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleDateChange = (field: 'onth' | 'dueDate' | 'ubmissionDate', date: Date | null) => {
    if (date) {
      handleChange(field, date.toISOString().split('T')[0]);
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(editedData, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: ValidationErrors = {};
        err.inner.forEach((e) => {
          if (e.path) {
            errors[e.path as keyof ValidationErrors] = e.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
  try {

    const isValid = await validateForm();
      if (!isValid) {
        return;
      }
      // Create updateData object (matching the original updateTracker data expectation)
      const updateData = {
        submit_date: editedData.submit_date,
        delay_reason: editedData.delay_reason || '',
        payroll_month: editedData.payroll_month,
      
      };

      // Dispatch updateTracker with id and updateData
      const resultAction =  await dispatch(updatePfiwTracker({
        id: trackerid,
        data: updateData
      }));

      onClose();
      openNotification('success', 'PFIW Tracker edited successfully');
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error('Error submitting tracker data:', err);
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

  if (loading) {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        width={600}  shouldCloseOnOverlayClick={false} 
      >
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        width={600}
      >
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={600}
    >
      <h5 className="mb-4">Edit PFIW Tracker Detail</h5>
      
      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
           {/* <div className='flex flex-col gap-2 w-full'>
            <label>Select Month</label>
            <div className='w-full'>
              <DatePicker
                placeholder="Month"
                value={editedData.payroll_month ? new Date(editedData.payroll_month) : undefined}
                onChange={(date) => handleDateChange('payroll_month', date)}
              />
            </div>
          </div> */}
          {/* <div className='flex flex-col gap-2 w-full'>
            <label>Due Date</label>
            <DatePicker
              size='sm'
              placeholder="Due Date"
              value={editedData.dueDate? new Date(editedData.dueDate) : undefined}
              onChange={(date) => handleDateChange('dueDate', date)}
            />
          </div> */}
          <div className='flex flex-col gap-2 w-full'>
            <label>Submission Date</label>
            <div className='w-full'>
              <DatePicker
              size='sm'
                placeholder="Month"
                value={editedData.submit_date ? new Date(editedData.submit_date) : undefined}
                onChange={(date) => handleDateChange('submit_date', date)}
              />
              {validationErrors.submit_date && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.submit_date}</p>
              )}
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          {/* <div className='flex flex-col gap-2 w-full'>
            <label>Delay</label>
            <OutlinedInput
              label="Delay"
              value={editedData.delay_in_days?.toString() || ''}
              onChange={(value) => handleChange('delay_in_days', value)}
            />
          </div> */}
          <div className='flex flex-col gap-2 w-full'>
            <label>Delay Reason</label>
            <OutlinedInput
              label="Delay Reason"
              value={editedData.delay_reason || ''}
              onChange={(value) => handleChange('delay_reason', value)}
            />
             {validationErrors.delay_reason && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.delay_reason}</p>
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
    </Dialog>
  );
};

export default PFIWTrackerEditDialog;