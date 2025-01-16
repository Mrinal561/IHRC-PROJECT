

import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import { fetchPtrcTrackerById, updatePtrcTracker } from '@/store/slices/ptSetup/ptrcTrackerSlice';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';




interface PTRCTrackerData {
  id: number;
  no_of_emp?: number;
  gross_salary: number;
  total_paid_amt?: number;
  payment_due_date?: string;
  delay_reason?: string;
  differenceInAmount?: number;
  payment_date?: string;
  difference_reason?: string;
}


interface PTRCTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PTRCTrackerData) => void;
  trackerId: number;
    onRefresh: () => void;
}

const PTRCTrackerEditDialog: React.FC<PTRCTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
   onRefresh
}) => {
  const [editedData, setEditedData] = useState<PTRCTrackerData>({
    id: trackerId,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if (isOpen && trackerId) {
      fetchTrackerData();
    }
  }, [isOpen, trackerId]);

  const fetchTrackerData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchPtrcTrackerById(trackerId))
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
      console.log(editedData);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tracker data:', err);
      setError('Failed to load tracker details');
      setLoading(false);
      openNotification('danger', 'Failed to load tracker details');
    }
  };


  const handleChange = (field: keyof PTRCTrackerData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
       try {
    // Create updateData object (matching the original updateTracker data expectation)
    const updateData = {
      payment_date: editedData.payment_date || '',
      delay_reason: editedData.delay_reason || '',
      difference_reason: editedData.difference_reason,
      total_paid_amt: editedData.total_paid_amt,
      no_of_emp: editedData.no_of_emp,
      gross_salary: editedData.gross_salary,
    };

    // Dispatch updateTracker with id and updateData
    const resultAction = await dispatch(updatePtrcTracker({
      id: trackerId, 
      data: updateData // Note: data, not formData
    }));

    onClose();
    openNotification('success', 'PTRC Tracker edited successfully');
     if (onRefresh) {
      onRefresh();
    }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
    openNotification('danger', 'Failed to save changes');
  }
  };
  
  const handleDateChange = (field: 'dueDate' | 'dateOfPayment' | 'month' | 'payment_due_date', date: Date | null) => {
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
    )
  }

  const frequencyOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Yearly', label: 'Yearly' },
  ];

  const remittanceModeOptions = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={420}  shouldCloseOnOverlayClick={false} 
    >
      <h5 className="mb-4">Edit PT RC Tracker Detail</h5>

      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>No. of Employees</label>
            <OutlinedInput
              label="No. of Employees"
              value={editedData.no_of_emp?.toString() || '' }
              onChange={(value) => handleChange('no_of_emp', parseInt(value, 10))}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Gross Salary</label>
            <OutlinedInput
              label="Gross Salary"
              value={editedData.gross_salary?.toString() || '' }
              onChange={(value) => handleChange('gross_salary', value)}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center'>
         
          <div className='flex flex-col gap-2 w-full'>
            <label>Total Amount Paid</label>
            <OutlinedInput
              label="Total Amount Paid"
              value={editedData.total_paid_amt?.toString() || ''  }
              onChange={(value) => handleChange('total_paid_amt', parseFloat(value))}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Date of Payment</label>
            <DatePicker
            size='sm'
              placeholder="Date of Payment"
              value={editedData.payment_date ? new Date(editedData.payment_date) : undefined}
              onChange={(date) => handleDateChange('payment_date', date)}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Delay Reason</label>
            <OutlinedInput
              label="Delay Reason"
              value={editedData.delay_reason?.toString() || ''  }
              onChange={(value) => handleChange('delay_reason', value)}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2 w-full'>
            <label>Difference Amount Reason</label>
            <OutlinedInput
              label="Reason"
              value={editedData.difference_reason?.toString() || ''  }
              onChange={(value) => handleChange('difference_reason', value)}
            />
          </div>
        <div className='flex flex-col gap-2 w-full'>
            {/* <label>Difference Amount Reason</label>
            <OutlinedInput
              label="Reason"
              value={editedData.differenceInAmount?.toString() || ''  }
              onChange={(value) => handleChange('differenceInAmount', value)}
            /> */}
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

export default PTRCTrackerEditDialog;