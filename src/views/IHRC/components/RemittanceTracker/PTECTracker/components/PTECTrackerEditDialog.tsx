


import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchPtecTrackerById, updatePtecTracker } from '@/store/slices/ptSetup/ptecTrackerSlice';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  receipt_no: yup
    .string()
    .required('Receipt number is required'),
  total_paid_amt: yup
    .number()
    .typeError("Total paid amount cannot be zero")
    .required('Total paid amount is required')
    .positive('Total paid amount must be positive'),
  total_challan_amt: yup
    .number()
    .typeError("Total challan amount cannot be zero")
    .required('Total challan amount is required')
    .positive('Total challan amount must be positive'),
  payment_date: yup
    .date()
    .required('Payment date is required')
    .max(new Date(), 'Payment date cannot be in the future'),
  delay_reason: yup
    .string()
    .nullable()
});
interface PTTrackerData {
  id: number;
  noOfEmployees?: number;
  receipt_no?: string;
  total_paid_amt?: number;
  total_challan_amt?: number;
  differenceInAmount?: number;
  month?: string;
  // dueDate?: string;
  payment_due_date?: string;
  frequency?: string;
  remittanceMode?: string;
  delay_in_days?: string;
  delay_reason?: string;
  payment_date?: string;
}
interface ValidationErrors {
  receipt_no?: string;
  total_paid_amt?: string;
  total_challan_amt?: string;
  payment_date?: string;
  delay_reason?: string;
}

interface PTTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PTTrackerData) => void;
  trackerId: number;
    onRefresh: () => void;
}

const PTECTrackerEditDialog: React.FC<PTTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
  onRefresh
}) => {
  const [editedData, setEditedData] = useState<PTTrackerData>({
    id: trackerId,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (isOpen && trackerId) {
      fetchTrackerData();
    }
  }, [isOpen, trackerId]);

  const fetchTrackerData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchPtecTrackerById(trackerId))
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

      setEditedData(response);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tracker data:', err);
      setError('Failed to load tracker details');
      setLoading(false);
      openNotification('danger', 'Failed to load tracker details');
    }
  };

const handleChange = (field: keyof PTTrackerData, value: string | number) => {
  setEditedData((prev) => ({ ...prev, [field]: value }));
  
  validationSchema.validateAt(field, { [field]: value }).catch((err) => {
    setValidationErrors((prev) => ({
      ...prev,
      [field]: err.message
    }));
  });
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
        openNotification('danger', 'Please fix the validation errors');
        return;
      }
    // Create updateData object (matching the original updateTracker data expectation)
    const updateData = {
      payment_date: editedData.payment_date || '',
      delay_reason: editedData.delay_reason || '',
      receipt_no: editedData.receipt_no,
      total_paid_amt: editedData.total_paid_amt,
      total_challan_amt: editedData.total_challan_amt,
    };

    // Dispatch updateTracker with id and updateData
    const resultAction = await dispatch(updatePtecTracker({
      id: trackerId, 
      data: updateData // Note: data, not formData
    })) .unwrap()
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
            showErrorNotification(error);
        }
        throw error; // Re-throw to prevent navigation
    });

    onClose();
    openNotification('success', 'PTEC Tracker edited successfully');
     if (onRefresh) {
      onRefresh();
    }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
    // openNotification('danger', 'Failed to save changes');
  }
  };
  
  const handleDateChange = (field: 'month' | 'dueDate' | 'payment_due_date', date: Date | null) => {
    if (date) {
      handleChange(field, date.toISOString().split('T')[0]);
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

  const frequencyOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Yearly', label: 'Yearly' },
  ];

  const remittanceModeOptions = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
  ];

  if (error) {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        width={800}
        height={600}  shouldCloseOnOverlayClick={false} 
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
      width={800}
      height={480}
    >
      <h5 className="mb-4">Edit PT EC Tracker Detail</h5>

      <div className="p-4 space-y-4">
        <div className="flex gap-4 items-center">
          {/* <div className="flex flex-col gap-2 w-full">
            <label>No. of Employees</label>
            <OutlinedInput
              label="No. of Employees"
              value={editedData.noOfEmployees?.toString() || ''}
              onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
            />
          </div> */}
          <div className="flex flex-col gap-2 w-full  min-h-[90px]">
            <label>Receipt No/Ack no</label>
            <OutlinedInput
              label="Receipt No"
              value={editedData.receipt_no || ''}
              onChange={(value) => handleChange('receipt_no', value)}
            />
            {validationErrors.receipt_no && (
    <p className="text-red-500 text-sm mt-1">{validationErrors.receipt_no}</p>
  )}
          </div>
           <div className="flex flex-col gap-2 w-full  min-h-[90px]">
            <label>Date of Payment</label>
            <DatePicker
              size='sm'
              placeholder="Date of Payment"
              value={editedData.payment_date ? new Date(editedData.payment_date) : undefined}
              onChange={(date) => handleDateChange('payment_date', date)}
            />
            {validationErrors.payment_date && (
    <p className="text-red-500 text-sm mt-1">{validationErrors.payment_date}</p>
  )}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2 w-full  min-h-[90px]">
            <label>Total Challan Amount</label>
            <OutlinedInput
              label="Total Challan Amount"
              value={editedData.total_challan_amt?.toString() || ''}
              onChange={(value) => handleChange('total_challan_amt', parseFloat(value))}
            />
            {validationErrors.total_challan_amt && (
    <p className="text-red-500 text-sm mt-1">{validationErrors.total_challan_amt}</p>
  )}
          </div>
          <div className="flex flex-col gap-2 w-full  min-h-[90px]">
            <label>Total Amount Paid</label>
            <OutlinedInput
              label="Total Amount Paid"
              value={editedData.total_paid_amt?.toString() || ''}
              onChange={(value) => handleChange('total_paid_amt', parseFloat(value))}
            />
            {validationErrors.total_paid_amt && (
    <p className="text-red-500 text-sm mt-1">{validationErrors.total_paid_amt}</p>
  )}
          </div>
          {/* <div className="flex flex-col gap-2 w-full">
            <label>Difference in Amount</label>
            <OutlinedInput
              label="Difference in Amount"
              value={editedData.differenceInAmount?.toString() || ''}
              onChange={(value) => handleChange('differenceInAmount', parseFloat(value))}
            />
          </div> */}
        </div>

        <div className="flex gap-4 items-center">
          {/* <div className="flex flex-col gap-2 w-full">
            <label>Month</label>
            <DatePicker
              placeholder="Month"
              value={editedData.month ? new Date(editedData.month) : undefined}
              onChange={(date) => handleDateChange('month', date)}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2 w-full">
            <label>Due Date</label>
            <DatePicker
              placeholder="Due Date"
              value={editedData.dueDate ? new Date(editedData.dueDate) : undefined}
              onChange={(date) => handleDateChange('dueDate', date)}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2 w-full">
            <label>Date of Payment</label>
            <DatePicker
              placeholder="Date of Payment"
              value={editedData.payment_due_date ? new Date(editedData.payment_due_date) : undefined}
              onChange={(date) => handleDateChange('payment_due_date', date)}
            />
          </div> */}
        </div>

        {/* <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2 w-full">
            <label>Frequency</label>
            <OutlinedSelect
              label="Frequency"
              options={frequencyOptions}
              value={frequencyOptions.find(option => option.value === editedData.frequency)}
              onChange={(option) => handleChange('frequency', option?.value || '')}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Remittance Mode</label>
            <OutlinedSelect
              label="Remittance Mode"
              options={remittanceModeOptions}
              value={remittanceModeOptions.find(option => option.value === editedData.remittanceMode)}
              onChange={(option) => handleChange('remittanceMode', option?.value || '')}
            />
          </div>
        </div> */}

        <div className="flex gap-4 items-center mb-5">
          <div className="flex flex-col gap-2 w-full">
            {/* <label>Delay</label>
            <OutlinedInput
              label="Delay"
              value={editedData.delay_in_days || ''}
              onChange={(value) => handleChange('delay_in_days', value)}
            />
          </div> */}
          <div className="flex flex-col gap-2 w-full  min-h-[90px]">
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
      </div>
    </Dialog>
  );
};

export default PTECTrackerEditDialog;