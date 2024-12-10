  // import React, { useState, useEffect } from 'react';
  // import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
  // import OutlinedInput from '@/components/ui/OutlinedInput';
  // import OutlinedSelect from '@/components/ui/Outlined';
  // import { LWFTrackerData } from './LWFTrackerTable';


  // interface LWFTrackerEditDialogProps {
  //   isOpen: boolean;
  //   onClose: () => void;
  //   onSubmit: (editedData: LWFTrackerData) => void;
  //   data: LWFTrackerData;
  // }

  // const LWFTrackerEditDialog: React.FC<LWFTrackerEditDialogProps> = ({
  //   isOpen,
  //   onClose,
  //   onSubmit,
  //   data,
  // }) => {
  //   const [editedData, setEditedData] = useState<LWFTrackerData>(data);

  //   useEffect(() => {
  //     setEditedData(data);
  //   }, [data]);

  //   const handleChange = (field: keyof LWFTrackerData, value: string | number) => {
  //     setEditedData((prev) => ({ ...prev, [field]: value }));
  //   };

  //   const handleSubmit = () => {
  //     onSubmit(editedData);
  //     onClose();
  //     openNotification('success', 'LWF Tracker edited successfully');

  //   };
    
  //   const handleDateChange = (field: 'dueDate' | 'submittedOn', date: Date | null) => {
  //     if (date) {
  //       handleChange(field, date.toISOString().split('T')[0]);
  //     }
  //   };

  //   const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
  //     toast.push(
  //         <Notification
  //             title={type.charAt(0).toUpperCase() + type.slice(1)}
  //             type={type}
  //         >
  //             {message}
  //         </Notification>
  //     )
  // }

  //   return (
  //     <Dialog
  //       isOpen={isOpen}
  //       onClose={onClose}
  //       onRequestClose={onClose}
  //       width={800}
  //       height={450}
  //     >
  //       <h5 className="mb-4">Edit LWF Tracker Detail</h5>

        
  //       <div className="p-4 space-y-4">
  //         <div className='flex gap-4 items-center'>
  //           <div className='flex flex-col gap-2 w-full'>
  //             <label>Enter Receipt Number</label>
  //             <div className='w-full'>
  //             <OutlinedInput
  //                 label="Receipt Number"
  //                 value={editedData.receiptNo}
  //                 onChange={(value) => handleChange('receiptNo', value)}
  //                 />
  //           </div>
  //                 </div>

  //           <div className='flex flex-col gap-2 w-full'>
  //             <label>Enter Total Amount</label>
  //             <div className='w-full'>
  //             <OutlinedInput
  //                 label="Total Amount"
  //                 value={editedData.lwfAmount}
  //                 onChange={(value) => handleChange('lwfAmount', value)}
  //                 />
  //                 </div>
  //           </div>
  //         </div>

  //         <div className="flex gap-4 items-center">
  //       <div className='flex flex-col gap-2 w-full'>
  //           <label>Delay</label>
  //           <div className='w-full'>
  //           <OutlinedInput
  //           label="Delay"
  //           value={editedData.delay}
  //           onChange={(value) => handleChange('delay', value)}
  //         />
  //             </div>
  //         </div>
  //         <div className='flex flex-col gap-2 w-full'>
  //           <label>Enter Delay Reason</label>
  //           <div className='w-full'>
  //           <OutlinedInput
  //           label="Delay Reason"
  //           value={editedData.delayReason}
  //           onChange={(value) => handleChange('delayReason', value)}
  //         />
  //             </div>
  //         </div>
  //       </div>

  //       <div className='flex gap-8 items-center'>
  //         <div className='flex flex-col gap-2 w-full'>
  //           <label>Select Due Date</label>
  //           <div className='w-full'>
  //           <DatePicker
  //           placeholder="Due Date"
  //           value={new Date(editedData.dueDate)}
  //           onChange={(date) => handleDateChange('dueDate', date)}
  //         />
  //             </div>
  //         </div>
  //         <div className='flex flex-col gap-2 w-full'>
  //           <label>Select Date of Payment</label>
  //           <div className='w-full'>
  //           <DatePicker
  //           placeholder="Date of Payment"
  //           value={new Date(editedData.submittedOn)}
  //           onChange={(date) => handleDateChange('submittedOn', date)}
  //         />
  //             </div>
  //         </div>
  //       </div>


        
  //       </div>
  //       <div className="flex justify-end mt-6">
  //         <Button variant="plain" onClick={onClose} className="mr-2">
  //           Cancel
  //         </Button>
  //         <Button variant="solid" onClick={handleSubmit}>
  //           Save Changes
  //         </Button>
  //       </div>
  //     </Dialog>
  //   );
  // };

// export default LWFTrackerEditDialog;
  
import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchLwfTrackerById, updateLwfTracker } from '@/store/slices/lwfTracker/lwfTracker';

interface LWFTrackerData {
  id: number;
  receipt_no?: string;
  total_paid_amt?: number;
  delay_in_days?: string;
  delay_reason?: string;
  difference_reason?: string;
  payment_date?: string;
}

interface LWFTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: LWFTrackerData) => void;
  trackerId: number;
   onRefresh: () => void;
}

const LWFTrackerEditDialog: React.FC<LWFTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
  onRefresh
}) => {
  const [editedData, setEditedData] = useState<LWFTrackerData>({
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
      const response = await dispatch((fetchLwfTrackerById(trackerId)))
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

  const handleChange = (field: keyof LWFTrackerData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
      try {
    // Create updateData object (matching the original updateTracker data expectation)
    const updateData = {
      payment_date: editedData.payment_date || '',
      delay_reason: editedData.delay_reason || '',
      receipt_no: editedData.receipt_no,
      total_paid_amt: editedData.total_paid_amt,
    };

    // Dispatch updateTracker with id and updateData
    const resultAction = await dispatch(updateLwfTracker({
      id: trackerId, 
      data: updateData // Note: data, not formData
    }));

    onClose();
    openNotification('success', 'LWF Tracker edited successfully');
     if (onRefresh) {
      onRefresh();
    }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
    openNotification('danger', 'Failed to save changes');
  }
  };
  
  const handleDateChange = (field: 'dueDate' | 'submittedOn', date: Date | null) => {
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

  if (error) {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        width={800}
        height={450}
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
      height={360}
    >
      <h5 className="mb-4">Edit LWF Tracker Detail</h5>
      
      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Receipt Number</label>
            <div className='w-full'>
              <OutlinedInput
                label="Receipt Number"
                value={editedData.receipt_no || ''}
                onChange={(value) => handleChange('receipt_no', value)}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Total Amount</label>
            <div className='w-full'>
              <OutlinedInput
                label="Total Paid Amount"
                value={editedData.total_paid_amt?.toString() || ''}
                onChange={(value) => handleChange('total_paid_amt', parseFloat(value))}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* <div className='flex flex-col gap-2 w-full'>
            <label>Delay</label>
            <div className='w-full'>
              <OutlinedInput
                label="Delay"
                value={editedData.delay_in_days || ''}
                onChange={(value) => handleChange('delay_in_days', value)}
              />
            </div>
          </div> */}
          
        </div>

        <div className='flex gap-8 items-center'>
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
          <div className='flex flex-col gap-2 w-full'>
            <label>Select Date of Payment</label>
            <div className='w-full'>
              <DatePicker
                placeholder="Date of Payment"
                value={editedData.payment_date ? new Date(editedData.payment_date) : undefined}
                onChange={(date) => handleDateChange('payment_date', date)}
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

export default LWFTrackerEditDialog;