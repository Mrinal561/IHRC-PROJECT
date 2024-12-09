
import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchTrackerById, updatePfTracker } from '@/store/slices/pftracker/pfTrackerSlice';

interface PfChallanData {
  id: number;
  trrn_no?: string;
  crn_no?: string;
  epf_wage?: number;
  eps_wage?: number;
  edli_wage?: number;
  total_challan_amt?: number;
  payroll_month?: string;
  dueDate?: string;
  payment_date?: string;
  challan_type?: string;
  no_of_emp?: number;
  delay_in_days?: string;
  delay_reason?: string;
  difference_reason?: string;
  total_paid_amt?: number;
}

interface PFTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PfChallanData) => void;
  trackerId: number;
     onRefresh: () => void;
}

const PFTrackerEditDialog: React.FC<PFTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
  onRefresh
}) => {
  const [editedData, setEditedData] = useState<PfChallanData>({
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
      // console.log(trackerId)
      setLoading(true);
      const response = await dispatch((fetchTrackerById(trackerId)))
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
      console.log(response)
        setEditedData(response);
        console.log(editedData)
        setLoading(false);
    } catch (err) {
      console.error('Error fetching tracker data:', err);
      setError('Failed to load tracker details');
      setLoading(false);
      openNotification('danger', 'Failed to load tracker details');
    }
  };

  const handleChange = (field: keyof PfChallanData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
    // Create updateData object (matching the original updateTracker data expectation)
    const updateData = {
      no_of_emp: editedData.no_of_emp,
      delay_reason: editedData.delay_reason || '',
      epf_wage: editedData.epf_wage || 0,
      eps_wage: editedData.eps_wage || 0,
      edli_wage: editedData.edli_wage || 0,
      total_challan_amt: editedData.total_challan_amt || 0,
      total_paid_amt: editedData.total_paid_amt || 0,
      payment_date: editedData.payment_date || '',
      challan_type: editedData.challan_type,
      trrn_no: editedData.trrn_no || '',
      crn_no: editedData.crn_no || '',
      difference_reason: editedData.difference_reason || '',
      payroll_month: editedData.payroll_month,
     
    };

    // Dispatch updateTracker with id and updateData
    const resultAction =  await dispatch(updatePfTracker({
      id: trackerId,
      data: updateData
    }));

    onClose();
    openNotification('success', 'PF Tracker edited successfully');
     if (onRefresh) {
      onRefresh();
    }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
  }
  };
  
  const handleDateChange = (field: 'month' | 'dueDate' | 'dateOfPayment', date: Date | null) => {
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

  const challanTypeOptions = [
    { value: 'Main Challan', label: 'Main Challan' },
    { value: 'Arrear Challan', label: 'Arrear Challan' },
  ];

  // if (loading) {
  //   return (
  //     <Dialog
  //       isOpen={isOpen}
  //       onClose={onClose}
  //       onRequestClose={onClose}
  //       width={800}
  //       height={600}
  //     >
  //       <div className="flex justify-center items-center h-full">
  //         <p>Loading...</p>
  //       </div>
  //     </Dialog>
  //   );
  // }

  if (error) {
    return (
      <Dialog
        isOpen={isOpen}
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

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={600}
    >
      <h5 className="mb-4">Edit PF Tracker Detail</h5>

      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter TRR NO.</label>
            <div className='w-full'>
              <OutlinedInput
                label="TRRN No"
                value={editedData.trrn_no || ''}
                onChange={(value) => handleChange('trrn_no', value)}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label>Enter CRN NO.</label>
            <div className='w-full'>
              <OutlinedInput
                label="CRN No"
                value={editedData.crn_no || ''}
                onChange={(value) => handleChange('crn_no', value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <div className='flex flex-col gap-2'>
            <label>Enter EPF Wages</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="EPF Wage"
                value={editedData.epf_wage?.toString() || ''}
                onChange={(value) => handleChange('epf_wage', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Enter EPS Wage</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="EPS Wage"
                value={editedData.eps_wage?.toString() || ''}
                onChange={(value) => handleChange('eps_wage', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
           <label>Edli Wage</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Edli Wage"
                value={editedData.edli_wage?.toString() || ''}
                onChange={(value) => handleChange('edli_wage', parseFloat(value))}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          <div className='flex flex-col gap-2'>
             <label>Enter Total Challan Amount</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Challan Amount"
                value={editedData.total_challan_amt?.toString() || ''}
                onChange={(value) => handleChange('total_challan_amt', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Select Date of Payment</label>
            <div className='w-full'>
              <DatePicker
                size='sm'
                placeholder="Date of Payment"
                value={editedData.payment_date ? new Date(editedData.payment_date) : undefined}
                onChange={(date) => handleDateChange('payment_date', date)}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
           <div className='flex flex-col gap-2'>
            <label>Total Paid Amount </label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Paid Amount"
                value={editedData.total_paid_amt?.toString() || ''}
                onChange={(value) => handleChange('total_paid_amt', parseFloat(value))}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Number of Employees</label>
            <div className='w-full'>
              <OutlinedInput
                label="No. of Employees"
                value={editedData.no_of_emp?.toString() || ''}
                onChange={(value) => handleChange('no_of_emp', parseInt(value, 10))}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Difference Reason</label>
            <div className='w-full'>
              <OutlinedInput
                label="Difference Reason"
                value={editedData.difference_reason || ''}
                onChange={(value) => handleChange('difference_reason', value)}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Delay Reason</label>
            <div className='w-full'>
              <OutlinedInput
                label="Delay Reason"
                value={editedData.delay_reason || ''}
                onChange={(value) => handleChange('delay_reason', value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="plain" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button variant="solid" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Dialog>
  );
};

export default PFTrackerEditDialog;
