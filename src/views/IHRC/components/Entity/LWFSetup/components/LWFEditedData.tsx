// import React, { useEffect, useState } from 'react';
// import { Button, Input, Dialog, DatePicker, Select } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { LWFSetupData } from './LWFSetupTable';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// interface LWFEditedDataProps {
//   initialData: LWFSetupData | null;
//   onClose: () => void;
//   onSubmit: (data: LWFSetupData) => void;
//   onRefresh: () => void;
// }


// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }

// const LWFEditedData: React.FC<LWFEditedDataProps> = ({ initialData, onClose, onSubmit , onRefresh}) => {
//   // Hardcoded LWF Setup Data
//   const [formData, setFormData] = useState<LWFSetupData>({
//     Company_Group_Name: '',
//     Company_Name: '',
//     lwfState: '',
//     lwfLocation: '',
//     lwfRegistrationNumber: '',
//     lwfRegistrationDate: '',
//     lwfRemmitanceMode: '',
//     lwfRemmitanceFrequency: '',
//     lwfUserId: '',
//     lwfPassword: '',
//     authorizedSignatory: '',
//     signatoryDesignation: '',
//     signatoryMobile: '',
//     signatoryEmail: '',
//     lwfFrequency: '',
//     lwfPaymentDueDate: '',
//     lwfApplicableState: '',
//   });

//   // Hardcoded signatories
//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (field: keyof LWFSetupData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//   }

//   const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
//     { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
//     { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
//     { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
//   ]);


//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex gap-4 items-center">
//         <div className="w-full">
//           <OutlinedInput
//                       label="Company Group"
//                       value={formData.Company_Group_Name} onChange={function (value: string): void {
//                           throw new Error('Function not implemented.');
//                       } }
//           />
//         </div>
//         <div className="w-full">
//           <OutlinedInput
//                       label="Company"
//                       value={formData.Company_Name} onChange={function (value: string): void {
//                           throw new Error('Function not implemented.');
//                       } }
//           />
//         </div>
//       </div>

//       <div className="flex gap-8 items-center">
//       <div className='flex flex-col gap-2'>
//           <label>Enter the LWF State</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="State"
//             value={formData.lwfState}
//             onChange={function (value: string): void {
//                 throw new Error('Function not implemented.');
//             } }
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the LWF Location</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="Location"
//             value={formData.lwfLocation}
//             onChange={function (value: string): void {
//                 throw new Error('Function not implemented.');
//             } }
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>LWF Registration Number</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="Registration Number"
//             value={formData.lwfRegistrationNumber || ''}
//             onChange={function (value: string): void {
//                 throw new Error('Function not implemented.');
//             } }
//             />
//             </div>
//         </div>
//       </div>

//       <div className='flex gap-8 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter User ID</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="User ID (Optional)"
//             value={formData.lwfUserId || ''}
//             onChange={function (value: string): void {
//                 throw new Error('Function not implemented.');
//             } }
//             />
//             </div>
//         </div>
//          <div className='flex flex-col gap-2'>
//           <label>Enter User Password</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="Password (Optional)"
//             value={formData.lwfPassword || ''}
//             onChange={function (value: string): void {
//                 throw new Error('Function not implemented.');
//             } }
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the Remmitance Mode</label>
//           <div className='w-[219px]'>
//           <OutlinedSelect
//             label="Mode"
//             options={[
//               { value: 'online', label: 'Online' },
//               { value: 'offline', label: 'Offline' },
//             ]}
//             value={formData.lwfRemmitanceMode || ''}
//             onChange={function (value: string): void {
//                 throw new Error('Function not implemented.');
//             } }
//             />
//             </div>
//         </div>
//       </div>


//       <div className="flex gap-4 items-center">
//                 <div className="flex flex-col gap-2">
//                     <label>PT Registration Date</label>
//                     <div className="w-56">
//                         <DatePicker
//                             placeholder="Select date"
//                             value={new Date(formData.lwfRegistrationDate)}
//                             // disabled
//                         />
//                     </div>
//                 </div>


//                 <div className='flex flex-col gap-2 w-full'>
//           <label>Choose the Signatories</label>
//           <div>
//           <Select
//             options={[
//               ...existingSignatories.map(s => ({ value: s.name, label: s.name })),
//               // { value: 'add_new'}
//             ]}
//             // value={esiSetupData.authorizedSignatory.map(name => ({ value: name, label: name }))}
//             // onChange={handleSignatoryChange}
//             />
//             </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-4">
//         <label>Upload the LWF certificate</label>
//         <Input id="file-upload" type="file"  />
//       </div>

     
//     </div>
//   );
// };

// export default LWFEditedData;

import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchLwfById, updateLwf } from '@/store/slices/lwfSetup/lwfTrackerSlice';

interface LWFEditedDataProps {
  id: number;
  initialData?: LWFSetupData | null;
  onClose: () => void;
  onSubmit: (data: LWFSetupData) => void;
  onRefresh: () => void;
}

interface LWFSetupData {
  register_number: string;
  username: string;
  password: string;
  register_date: string;
}

const LWFEditedData: React.FC<LWFEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<LWFSetupData>({
    register_number: '',
    username: '',
    password: '',
    register_date: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchLWFData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchLWFData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchLwfById(id))
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
      console.error('Error fetching LWF data:', err);
      setError('Failed to load LWF details');
      setLoading(false);
      openNotification('danger', 'Failed to load LWF details');
    }
  };

  const handleChange = (field: keyof LWFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const updateData = {
        register_number: formData.register_number,
        username: formData.username,
        password: formData.password,
        register_date: formData.register_date || '',
      };

      const resultAction = await dispatch(updateLwf({
        id: id, 
        data: updateData 
      }));

      onClose();
      if (resultAction) {
        openNotification('success', 'LWF Setup edited successfully');
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (err) {
      console.error('Error submitting LWF data:', err);
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
        <div className="flex flex-col gap-2">
          <label>Enter LWF Registration Number</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="LWF Registration Number"
              value={formData.register_number}
              onChange={(value) => handleChange('register_number', value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Enter LWF User ID</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="LWF User ID"
              value={formData.username}
              onChange={(value) => handleChange('username', value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <label>Enter LWF Password</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="LWF Password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>LWF Registration Date</label>
          <div className="w-full">
            <DatePicker
              size="sm"
              placeholder="Select date"
              value={formData.register_date ? new Date(formData.register_date) : null}
              onChange={(date) => handleChange('register_date', date?.toISOString() || '')}
            />
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

export default LWFEditedData;
