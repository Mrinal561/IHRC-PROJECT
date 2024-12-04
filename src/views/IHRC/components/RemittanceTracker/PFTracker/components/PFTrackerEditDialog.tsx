// import React, { useState, useEffect } from 'react';
// import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { PFTrackerData } from './PFTrackerTable';
// import OutlinedSelect from '@/components/ui/Outlined';



// interface PFTrackerEditDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (editedData: PFTrackerData) => void;
//   data: PFTrackerData;
// }

// const PFTrackerEditDialog: React.FC<PFTrackerEditDialogProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   data,
// }) => {
//   const [editedData, setEditedData] = useState<PFTrackerData>(data);

//   useEffect(() => {
//     setEditedData(data);
//   }, [data]);

//   const handleChange = (field: keyof PFTrackerData, value: string | number) => {
//     setEditedData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     onSubmit(editedData);
//     onClose();
//     openNotification('success', 'PF Tracker edited successfully');

//   };
  
//   const handleDateChange = (field: 'dueDate' | 'dateOfPayment' | 'month', date: Date | null) => {
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


// const challanTypeOptions = [
//   { value: 'Main Challan', label: 'Main Challan' },
//   { value: 'Arrear Challan', label: 'Arrear Challan' },
// ];

//   return (
//     <Dialog
//       isOpen={isOpen}
//       onClose={onClose}
//       onRequestClose={onClose}
//       width={800}
//       height={600}
//     >
//       <h5 className="mb-4">Edit PF Tracker Detail</h5>

      
//       <div className="p-4 space-y-4">
//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Enter TRR NO.</label>
//             <div className='w-full'>
//             <OutlinedInput
//                 label="TRRN No"
//                 value={editedData.trrnNo}
//                 onChange={(value) => handleChange('trrnNo', value)}
//                 />
//           </div>
//                 </div>

//           <div className='flex flex-col gap-2 w-full'>
//             <label>Enter CRN NO.</label>
//             <div className='w-full'>
//             <OutlinedInput
//                 label="CRN No"
//                 value={editedData.crnNo}
//                 onChange={(value) => handleChange('crnNo', value)}
//                 />
//                 </div>
//           </div>
//         </div>

//         <div className="flex gap-8 items-center">
//       <div className='flex flex-col gap-2'>
//           <label>Enter the Wages</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//           label="Wages"
//           value={editedData.wages}
//           onChange={(value) => handleChange('wages', value)}
//         />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter EPS Wage</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//           label="EPS Wage"
//           value={editedData.epsWage}
//           onChange={(value) => handleChange('epsWage', value)}
//         />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter Total Challan Amount</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//           label="Total Challan Amount"
//           value={editedData.totalChallanAmount}
//           onChange={(value) => handleChange('totalChallanAmount', parseFloat(value))}
//         />
//             </div>
//         </div>
//       </div>

//       <div className='flex gap-8 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Select Month</label>
//           <div className='w-[219px]'>
//           <DatePicker
//           placeholder="Month"
//           value={new Date(editedData.month)}
//           onChange={(date) => handleDateChange('month', date)}
//           />
//             </div>
//         </div>
//          <div className='flex flex-col gap-2'>
//           <label>Select Due Date</label>
//           <div className='w-[219px]'>
//           <DatePicker
//           placeholder="Due Date"
//           value={new Date(editedData.dueDate)}
//           onChange={(date) => handleDateChange('dueDate', date)}
//         />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Select Date of Payment</label>
//           <div className='w-[219px]'>
//           <DatePicker
//           placeholder="Date of Payment"
//           value={new Date(editedData.dateOfPayment)}
//           onChange={(date) => handleDateChange('dateOfPayment', date)}
//         />
//             </div>
//         </div>
//       </div>


//       <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Select Type of Challan</label>
//             <div className='w-full'>
//             <OutlinedSelect
//                 label="Type of Challan"
//                 options={challanTypeOptions}
//                 value={challanTypeOptions.find(option => option.value === editedData.typeOfChallan)}
//                 onChange={(option) => handleChange('typeOfChallan', option?.value || '')}
//               />
//           </div>
//                 </div>

//           <div className='flex flex-col gap-2 w-full'>
//             <label>Enter Number of Employees</label>
//             <div className='w-full'>
//             <OutlinedInput
//           label="No. of Employees"
//           value={editedData.noOfEmployees}
//           onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
//           />
//                 </div>
//           </div>
//         </div>

//         <div className='flex gap-4 items-center'>
//           <div className='flex flex-col gap-2 w-full'>
//             <label>Enter Delay</label>
//             <div className='w-full'>
//             <OutlinedInput
//           label="Delay"
//           value={editedData.delay}
//           onChange={(value) => handleChange('delay', value)}
//         />
//           </div>
//                 </div>

//           <div className='flex flex-col gap-2 w-full'>
//             <label>Enter Delay Reason</label>
//             <div className='w-full'>
//             <OutlinedInput
//           label="Delay Reason"
//           value={editedData.delayReason}
//           onChange={(value) => handleChange('delayReason', value)}
//         />
//                 </div>
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

// export default PFTrackerEditDialog;



import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchTrackerById } from '@/store/slices/pftracker/pfTrackerSlice';

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
}

interface PFTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PfChallanData) => void;
  trackerId: number;
}

const PFTrackerEditDialog: React.FC<PFTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  trackerId,
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
      // You might want to add an API call to update the data here
      console.log(editedData)
      // onSubmit(editedData);
      onClose();
      openNotification('success', 'PF Tracker edited successfully');
    } catch (err) {
      console.error('Error submitting tracker data:', err);
      openNotification('danger', 'Failed to save changes');
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
            <label>Enter the Wages</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Wages"
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
            <label>Enter Total Challan Amount</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Challan Amount"
                value={editedData.total_challan_amt?.toString() || ''}
                onChange={(value) => handleChange('total_challan_amt', parseFloat(value))}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Select Month</label>
            <div className='w-full'>
              <DatePicker
                placeholder="Month"
                value={editedData.payroll_month ? new Date(editedData.payroll_month) : undefined}
                onChange={(date) => handleDateChange('month', date)}
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

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Type of Challan</label>
            <div className='w-full'>
              <OutlinedInput
              label="Type of Challan"
              value={editedData.challan_type || ''}
              onChange={(value) => handleChange('challan_type', value)}
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
            <label>Enter Delay</label>
            <div className='w-full'>
              <OutlinedInput
                label="Delay"
                value={editedData.delay_in_days || ''}
                onChange={(value) => handleChange('delay_in_days', value)}
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