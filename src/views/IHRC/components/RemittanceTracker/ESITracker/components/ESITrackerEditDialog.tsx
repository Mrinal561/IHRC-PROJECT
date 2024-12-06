
import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import OutlinedSelect from '@/components/ui/Outlined';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchTrackerById, updateTracker } from '@/store/slices/esitracker/esitrackerSlice';

interface ESITrackerFormData {
  id?: number;
  no_of_emp?: number;
  gross_wage?: number;
  employee_esi?: number;
  employer_esi?: number;
  total_esi?: number;
  challan_amt?: number;
  payment_date?: string;
  challan_no?: number;
  delay_reason?: string;
  difference_reason?: string;
  challan_type?: string;
  
  payroll_month?: string;
}

interface ESIChallanData {
  id: number;
  no_of_emp?: number;
  gross_wage?: number;
  employee_esi?: number;
  employer_esi?: number;
  total_esi?: number;
  challan_amt?: number;
  // payroll_month?: string;
  payment_date?: string;
  challan_no?: number;
  // challan_type?: string;
  delay_reason?: string;
  difference_reason?: string;
  payroll_month?: string;
}

interface ESITrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: ESIChallanData) => void;
  trackerId: number;
  onRefresh: () => void;

}

const ESITrackerEditDialog: React.FC<ESITrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
  onRefresh,
}) => {
  const [editedData, setEditedData] = useState<ESIChallanData>({
    id: trackerId,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setEditedData(data);
  // }, [data]);


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

  const handleChange = (field: keyof ESIChallanData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };
  
// const handleSubmit = async () => {
//     try {
//       // Create formData with all the specified fields
//       const formData: ESITrackerFormData = {
//         // id: trackerId,
//         no_of_emp: editedData.no_of_emp,
//         gross_wage: editedData.gross_wage,
//         employee_esi: editedData.employee_esi,
//         employer_esi: editedData.employer_esi,
//         total_esi: editedData.total_esi,
//         challan_amt: editedData.challan_amt,
//         payment_date: editedData.payment_date,
//         challan_no: editedData.challan_no,
//         delay_reason: editedData.delay_reason,
//         difference_reason: editedData.difference_reason,
//         challan_type: 'main',
//         payroll_month: editedData.payroll_month
//       };

//       // Log the formData
//       console.log('Form Data to Submit:', formData);

//       // Optional: If you want to submit the formData
//       // onSubmit(formData);

//       onClose();
//       openNotification('success', 'ESI Tracker edited successfully');
//     } catch (err) {
//       console.error('Error submitting tracker data:', err);
//       openNotification('danger', 'Failed to save changes');
//     }
//   };
  
  
const handleSubmit = async () => {
  try {
    // Create updateData object (matching the original updateTracker data expectation)
    const updateData = {
      no_of_emp: editedData.no_of_emp,
      gross_wage: editedData.gross_wage,
      employee_esi: editedData.employee_esi,
      employer_esi: editedData.employer_esi,
      total_esi: editedData.total_esi,
      challan_amt: editedData.challan_amt,
      payment_date: editedData.payment_date || '',
      challan_no: editedData.challan_no?.toString() || '',
      delay_reason: editedData.delay_reason || '',
      difference_reason: editedData.difference_reason || '',
      challan_type: 'main',
      payroll_month: editedData.payroll_month || '',
    };

    // Dispatch updateTracker with id and updateData
    const resultAction = await dispatch(updateTracker({
      id: trackerId, 
      data: updateData // Note: data, not formData
    }));

    onClose();
    openNotification('success', 'ESI Tracker edited successfully');
     if (onRefresh) {
      onRefresh();
    }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
    openNotification('danger', 'Failed to save changes');
  }
};
  const handleDateChange = (field: 'dueDate' | 'amountPaidOn' | 'month', date: Date | null) => {
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

  const challanTypeOptions = [
    { value: 'Main Challan', label: 'Main Challan' },
    { value: 'Supplementary Challan', label: 'Supplementary Challan' },
  ];

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
      height={520}
    >
      <h5 className="mb-4">Edit ESI Tracker Detail</h5>
      
      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
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
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Challan No .</label>
            <div className='w-full'>
              <OutlinedInput
                label="Challan No"
                value={editedData.challan_no?.toString() || ''}
                onChange={(value) => handleChange('challan_no', value)}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          {/* <div className='flex flex-col gap-2'>
            <label>Select Month</label>
            <div className='w-[219px]'>
              <DatePicker
                placeholder="Month"
                value={new Date(editedData.month)}
                onChange={(date) => handleDateChange('month', date)}
              />
            </div>
          </div> */}
          {/* <div className='flex flex-col gap-2'>
            <label>Select Due Date</label>
            <div className='w-[219px]'>
              <DatePicker
                placeholder="Due Date"
                value={new Date(editedData.dueDate)}
                onChange={(date) => handleDateChange('dueDate', date)}
              />
            </div>
          </div> */}
          <div className='flex flex-col gap-2'>
            <label>Select Date of Payment</label>
            <div className='w-[219px]'>
              <DatePicker
                placeholder="Amount Paid On"
                value={editedData.payment_date ? new Date(editedData.payment_date) : undefined}
                onChange={(date) => handleDateChange('payment_date', date)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
             <label>Enter ESI Gross Wages</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="ESI Gross Wages"
                value={editedData.gross_wage?.toString() || ''}
                onChange={(value) => handleChange('gross_wage', parseFloat(value))}
              />
            </div>
           
           
          </div>
          <div className='flex flex-col gap-2 w-full'>
             <label>Enter EE ESI</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="EE ESI"
                value={editedData.employee_esi?.toString() || ''}
                onChange={(value) => handleChange('employee_esi', parseFloat(value))}
              />
            </div>
           
           
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className='flex flex-col gap-2'>
            <label>Enter ER ESI</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="ER ESI"
                value={editedData.employer_esi?.toString() || ''}
                onChange={(value) => handleChange('employer_esi', parseFloat(value))}
              />
            </div>
           
          </div>
          <div className='flex flex-col gap-2'>
            <label>Total ESI</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Esi"
                value={editedData.total_esi?.toString() || ''}
                onChange={(value) => handleChange('total_esi', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
             <label>Total Challan Amount</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Amount As per Challan"
                value={editedData.challan_amt?.toString() || ''}
                onChange={(value) => handleChange('challan_amt', parseFloat(value))}
              />
            </div>
          </div>
        </div>
 <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2'>
             <label>Difference Reason</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Difference Reason"
                value={editedData.difference_reason?.toString() || ''}
                onChange={(value) => handleChange('difference_reason', value)}
              />
            </div>
           
          </div>
          <div className='flex flex-col gap-2'>
            <label>Delay Reason</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Delay Reason"
                value={editedData.delay_reason?.toString() || ''}
                onChange={(value) => handleChange('delay_reason', parseFloat(value))}
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
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

export default ESITrackerEditDialog;