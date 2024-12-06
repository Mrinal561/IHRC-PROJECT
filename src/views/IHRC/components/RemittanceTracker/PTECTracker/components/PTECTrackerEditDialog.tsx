

// import React, { useState, useEffect } from 'react';
// import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined';
// import { PTTrackerData } from './PTECTrackerTable';

// interface PTTrackerEditDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (editedData: PTTrackerData) => void;
//   data: PTTrackerData;
// }

// const PTECTrackerEditDialog: React.FC<PTTrackerEditDialogProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   data,
// }) => {
//   const [editedData, setEditedData] = useState<PTTrackerData>(data);

//   useEffect(() => {
//     setEditedData(data);
//   }, [data]);

//   const handleChange = (field: keyof PTTrackerData, value: string | number) => {
//     setEditedData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     onSubmit(editedData);
//     onClose();
//     openNotification('success', 'PT EC Tracker edited successfully');
//   };
  
//   const handleDateChange = (field: 'dueDate' | 'payment_due_date' | 'month', date: Date | null) => {
//     if (date) {
//       handleChange(field, date.toISOString().split('T')[0]);
//     }
//   };

//   const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
//     toast.push(
//       <Notification
//         title={type.charAt(0).toUpperCase() + type.slice(1)}
//         type={type}
//       >
//         {message}
//       </Notification>
//     )
//   }

//   const frequencyOptions = [
//     { value: 'Monthly', label: 'Monthly' },
//     { value: 'Quarterly', label: 'Quarterly' },
//     { value: 'Yearly', label: 'Yearly' },
//   ];

//   const remittanceModeOptions = [
//     { value: 'Online', label: 'Online' },
//     { value: 'Offline', label: 'Offline' },
//   ];

//   return (
//     <Dialog
//       isOpen={isOpen}
//       onClose={onClose}
//       onRequestClose={onClose}
//       width={800}
//       height={600}
//     >
//       <h5 className="mb-4">Edit PT EC Tracker Detail</h5>

//       <div className="p-4 space-y-4">
//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>No. of Employees</label>
//             <OutlinedInput
//               label="No. of Employees"
//               value={editedData.noOfEmployees }
//               onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Receipt No/Ack no</label>
//             <OutlinedInput
//               label="Receipt No"
//               value={editedData.receiptNo}
//               onChange={(value) => handleChange('receiptNo', value)}
//             />
//           </div>
//         </div>

//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>total_paid_amt</label>
//             <OutlinedInput
//               label="total_paid_amt"
//               value={editedData.total_paid_amt }
//               onChange={(value) => handleChange('total_paid_amt', parseFloat(value))}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Total Amount Paid</label>
//             <OutlinedInput
//               label="Total Amount Paid"
//               value={editedData.total_challan_amt }
//               onChange={(value) => handleChange('total_challan_amt', parseFloat(value))}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Difference in Amount</label>
//             <OutlinedInput
//               label="Difference in Amount"
//               value={editedData.differenceInAmount }
//               onChange={(value) => handleChange('differenceInAmount', parseFloat(value))}
//             />
//           </div>
//         </div>

//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Month</label>
//             <DatePicker
//               placeholder="Month"
//               value={new Date(editedData.month)}
//               onChange={(date) => handleDateChange('month', date)}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Due Date</label>
//             <DatePicker
//               placeholder="Due Date"
//               value={new Date(editedData.dueDate)}
//               onChange={(date) => handleDateChange('dueDate', date)}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Date of Payment</label>
//             <DatePicker
//               placeholder="Date of Payment"
//               value={new Date(editedData.payment_due_date)}
//               onChange={(date) => handleDateChange('payment_due_date', date)}
//             />
//           </div>
//         </div>

//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Frequency</label>
//             <OutlinedSelect
//               label="Frequency"
//               options={frequencyOptions}
//               value={frequencyOptions.find(option => option.value === editedData.frequency)}
//               onChange={(option) => handleChange('frequency', option?.value || '')}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Remittance Mode</label>
//             <OutlinedSelect
//               label="Remittance Mode"
//               options={remittanceModeOptions}
//               value={remittanceModeOptions.find(option => option.value === editedData.remittanceMode)}
//               onChange={(option) => handleChange('remittanceMode', option?.value || '')}
//             />
//           </div>
//           {/* <div className='flex flex-col gap-2 w-full'>
//             <label>Remarks</label>
//             <OutlinedInput
//               label="Remarks"
//               value={editedData.remarks}
//               onChange={(value) => handleChange('remarks', value)}
//             />
//           </div> */}
//         </div>

//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Delay</label>
//             <OutlinedInput
//               label="Delay"
//               value={editedData.delay}
//               onChange={(value) => handleChange('delay', value)}
//             />
//           </div>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Delay Reason</label>
//             <OutlinedInput
//               label="Delay Reason"
//               value={editedData.delayReason}
//               onChange={(value) => handleChange('delayReason', value)}
//             />
//           </div>
//         </div>
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

// export default PTECTrackerEditDialog;



import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchPtecTrackerById } from '@/store/slices/ptSetup/ptecTrackerSlice';

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
}

interface PTTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PTTrackerData) => void;
  trackerId: number;
}

const PTECTrackerEditDialog: React.FC<PTTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
}) => {
  const [editedData, setEditedData] = useState<PTTrackerData>({
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
  };

  const handleSubmit = async () => {
    try {
      console.log(editedData);
      onSubmit(editedData);
      onClose();
      openNotification('success', 'PT EC Tracker edited successfully');
    } catch (err) {
      console.error('Error submitting tracker data:', err);
      openNotification('danger', 'Failed to save changes');
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
      height={450}
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
          <div className="flex flex-col gap-2 w-full">
            <label>Receipt No/Ack no</label>
            <OutlinedInput
              label="Receipt No"
              value={editedData.receipt_no || ''}
              onChange={(value) => handleChange('receipt_no', value)}
            />
          </div>
           <div className="flex flex-col gap-2 w-full">
            <label>Date of Payment</label>
            <DatePicker
              size='sm'
              placeholder="Date of Payment"
              value={editedData.payment_due_date ? new Date(editedData.payment_due_date) : undefined}
              onChange={(date) => handleDateChange('payment_due_date', date)}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2 w-full">
            <label>Total Challan Amount</label>
            <OutlinedInput
              label="Total Challan Amount"
              value={editedData.total_challan_amt?.toString() || ''}
              onChange={(value) => handleChange('total_challan_amt', parseFloat(value))}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Total Amount Paid</label>
            <OutlinedInput
              label="Total Amount Paid"
              value={editedData.total_paid_amt?.toString() || ''}
              onChange={(value) => handleChange('total_paid_amt', parseFloat(value))}
            />
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

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2 w-full">
            {/* <label>Delay</label>
            <OutlinedInput
              label="Delay"
              value={editedData.delay_in_days || ''}
              onChange={(value) => handleChange('delay_in_days', value)}
            />
          </div> */}
          <div className="flex flex-col gap-2 w-full">
            <label>Delay Reason</label>
            <OutlinedInput
              label="Delay Reason"
              value={editedData.delay_reason || ''}
              onChange={(value) => handleChange('delay_reason', value)}
            />
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

export default PTECTrackerEditDialog;