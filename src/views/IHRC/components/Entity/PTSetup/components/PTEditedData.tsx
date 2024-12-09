// import React, { useEffect, useState } from 'react';
// import { Button, Input, Dialog, Notification } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { Select, DatePicker } from '@/components/ui';
// import {PTSetupData} from './PTSetupTable';
// import OutlinedSelect from '@/components/ui/Outlined';

// interface PTEditedDataProps {
//     initialData: PTSetupData | null;
//     onClose: () => void;
//     onSubmit: (data: PTSetupData) => void;
//   }

  
// interface Signatory {
//     name: string;
//     designation: string;
//     mobile: string;
//     email: string;
//   }


// const PTEditedData: React.FC<PTEditedDataProps> = ({ initialData, onClose, onSubmit }) => {
//     const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);
//     const [formData, setFormData] = useState<PTSetupData>({
//         Company_Group_Name:'',
//     Company_Name:'',
//     ptState:'',
//     ptLocation:'',
//     enroll_number:'',
//     ptRegistrationNumber:'',
//     register_date:'',
//     ptRemmitanceMode:'',
//     username:'',
//     password:'',
//     authorizedSignatory:'',
//     signatoryDesignation:'',
//     mobile:'',
//     email:'',
//     ptecPaymentFrequency:'',
//     ptrcPaymentFrequency:'',
//     })
//     useEffect(() => {
//         if (initialData) {
//           setFormData(initialData);
//         }
//       }, [initialData]);
    
//       const handleChange = (field: keyof PTSetupData, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//       };
    
//       const handleSubmit = () => {
//         onSubmit(formData);
//       }

//     const handleAddSignatory = () => {
//         setShowAddSignatoryDialog(false);
//     };

//     const handleInputChange = (field: keyof PTSetupData, value: string | Date | null | File | string[]) => {
//         setPTSetupData(prev => ({ ...prev, [field]: value }));
//       };

//       const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
//         { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
//         { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
//         { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
//       ]);

//     return (
//         <div className="py-4 px-2 space-y-4">
//             <div className="flex gap-4 items-center">
//                 <div className="w-full">
//                     <OutlinedInput
//                         label="Company Group"
//                         value={formData.Company_Group_Name}
//                         onChange={function (value: string): void {
//                             throw new Error('Function not implemented.')
//                         }}
//                     />
//                 </div>
//                 <div className="w-full">
//                     <OutlinedInput
//                         label="Company"
//                         value={formData.Company_Name}
//                         onChange={function (value: string): void {
//                             throw new Error('Function not implemented.')
//                         }}
//                     />
//                 </div>
//             </div>

//             <div className="flex gap-8 items-center">
//                 <div className="flex flex-col gap-2">
//                     <label>Enter the PT State</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="State"
//                             value={formData.ptState}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>Enter the PT Location</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="Location"
//                             value={formData.ptLocation}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>PT Registration Number</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="Registration Number"
//                             value={formData.ptRegistrationNumber}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>PT Enrollment Number</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="Enrollment Number"
//                             value={formData.enroll_number}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="flex gap-8 items-center">
//                 <div className="flex flex-col gap-2">
//                     <label>Enter User ID</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="User ID (Optional)"
//                             value={formData.username || ''}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>Enter User Password</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="Password (Optional)"
//                             value={formData.password || ''}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2 w-full">
//                     <label>Select Remittance Mode</label>
//                     <div className="w-full">
//                         <OutlinedSelect
//                             label="Mode"
//                             options={[
//                                 { value: 'online', label: 'Online' },
//                                 { value: 'offline', label: 'Offline' },
//                             ]}
//                             value={formData.ptRemmitanceMode}
//                             onChange={(value: string) =>
//                                 handleInputChange('ptRemmitanceMode', value)
//                             }
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>Enter Email</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="Email"
//                             value={formData.email}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="flex gap-8 items-center">
//                 <div className="flex flex-col gap-2">
//                     <label>PT Registration Date</label>
//                     <div className="w-56">
//                         <DatePicker
//                             placeholder="Select date"
//                             value={new Date(formData.register_date)}
//                             // disabled
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>Enter Mobile Number</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="Mobile"
//                             value={formData.mobile}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>PT EC Frequency</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="PT EC Frequency"
//                             value={formData.ptecPaymentFrequency}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label>PT RC Frequency</label>
//                     <div className="w-56">
//                         <OutlinedInput
//                             label="PT RC Frequency"
//                             value={formData.ptrcPaymentFrequency}
//                             onChange={function (value: string): void {
//                                 throw new Error('Function not implemented.')
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <div className="flex gap-4 items-center">
//                 <div className="flex flex-col gap-2 w-full">
//                     <label>Upload the PT EC certificate</label>
//                     <Input
//                         id="file-upload"
//                         type="file"
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                             const file = e.target.files?.[0] || null
//                             handleInputChange(
//                                 'lwfRegistrationCertificate',
//                                 file,
//                             )
//                         }}
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2 w-full">
//                     <label>Upload the PT RC certificate</label>
//                     <Input
//                         id="file-upload"
//                         type="file"
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                             const file = e.target.files?.[0] || null
//                             handleInputChange(
//                                 'lwfRegistrationCertificate',
//                                 file,
//                             )
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default PTEditedData;


import React, { useEffect, useState } from 'react';
import { Button, Dialog, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { PTSetupData } from './PTSetupTable';
import { fetchptsetupById, updatePT } from '@/store/slices/ptSetup/ptSetupSlice';

interface PTEditedDataProps {
  id?: number;
  initialData?: PTSetupData | null;
  onClose: () => void;
  onSubmit: (data: PTSetupData) => void;
  onRefresh?: () => void;
}

const PTEditedData: React.FC<PTEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<PTSetupData>({
    register_number: '',
    enroll_number: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    register_date: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchPTData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchPTData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchptsetupById(id))
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
      console.error('Error fetching PT data:', err);
      setError('Failed to load PT details');
      setLoading(false);
      openNotification('danger', 'Failed to load PT details');
    }
  };

  const handleChange = (field: keyof PTSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Implement your update logic similar to LW
      const updateData = {
        register_number: formData.register_number,
        enroll_number: formData.enroll_number,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        mobile: formData.mobile,
        register_date: formData.register_date || '',
      };

      const resultAction = await dispatch(updatePT({
        id: id, 
        data: updateData 
      }));

        //   onSubmit(formData);
        if (resultAction) {
            onClose();
            
            if (onRefresh) {
              onRefresh();
            }
            openNotification('success', 'PT Setup edited successfully'); 
        }
      
    } catch (err) {
      console.error('Error submitting PT data:', err);
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
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT Registration Number</label>
          <div className="w-full">
            <OutlinedInput
              label="PT Registration Number"
              value={formData.register_number}
              onChange={(value) => handleChange('register_number', value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT Enrollment Number</label>
          <div className="w-full">
            <OutlinedInput
              label="PT Enrollment Number"
              value={formData.enroll_number}
              onChange={(value) => handleChange('enroll_number', value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT User ID</label>
          <div className="w-full">
            <OutlinedInput
              label="PT User ID"
              value={formData.username}
              onChange={(value) => handleChange('username', value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Enter PT Password</label>
          <div className="w-full">
            <OutlinedInput
              label="PT Password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>Enter Email</label>
          <div className="w-full">
            <OutlinedInput
              label="Email"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Enter Mobile Number</label>
          <div className="w-full">
            <OutlinedInput
              label="Mobile Number"
              value={formData.mobile}
              onChange={(value) => handleChange('mobile', value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <label>PT Registration Date</label>
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

export default PTEditedData;
