// import React, { useEffect, useState } from 'react';
// import { Button, Input, Dialog, Select, DatePicker } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import {PFSetupData} from './PFSetupTable';

// interface PFEditedDataProps {
//   initialData: PFSetupData | null;
//   onClose: () => void;
//   onSubmit: (data: PFSetupData) => void;
//   id: number;
// }

// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }

// const PFEditedData: React.FC<PFEditedDataProps> = ({ initialData, onClose, onSubmit, id }) => {
//   const [formData, setFormData] = useState<PFSetupData>({
//     Company_Group_Name: '',
//     Company_Name: '',
//     pfCode: '',
//     pfCodeLocation: '',
//     registrationDate: '',
//     pfUserId: '',
//     pfPassword: '',
//     authorizedSignatory: '',
//     signatoryDesignation: '',
//     signatoryMobile: '',
//     signatoryEmail: '',
//     dscValidDate: '',
//     esign: '',
//   });
//   useEffect(() => {
//     console.log(id)
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (field: keyof PFSetupData, value: string) => {
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
//       <div className='flex gap-4 items-center'>
//         <div className='w-full'>
//           <OutlinedInput
//                       label="Company Group Name"
//                       value={formData.Company_Group_Name} onChange={function (value: string): void {
//                           throw new Error('Function not implemented.');
//                       } }
//           />
//         </div>
//         <div className='w-full'>
//           <OutlinedInput
//                       label="Company Name"
//                       value={formData.Company_Name} onChange={function (value: string): void {
//                           throw new Error('Function not implemented.');
//                       } }
//           />
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the PF Code</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="PF Code"
//                           value={formData.pfCode} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }
//             />
//           </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the PF Location</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="Location"
//                           value={formData.pfCodeLocation} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }
//             />
//           </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter PF user ID</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="PF User ID (Optional)"
//                           value={formData.pfUserId} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }
//             />
//           </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter PF User Password</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="PF Password (Optional)"
//                           value={formData.pfPassword} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }
//             />
//           </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>PF Registration Date</label>
//           <div className='w-56'>
//             <DatePicker
//               placeholder="Select date"
//               value={new Date(formData.registrationDate)}
              
//             />
//           </div>
//         </div>

//         <div className='flex flex-col gap-2 w-full'>
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

//       <div className='flex flex-col gap-2'>
//         <label>Upload the PF certificate</label>
//         <Input id="file-upload" type="file" />
//       </div>

//       {/* <div className="flex justify-end space-x-2">
//         <Button onClick={() => { }}>Cancel</Button>
//         <Button variant="solid" onClick={() => { }}>Confirm</Button>
//       </div> */}

//       {/* <Dialog isOpen={false} onClose={() => { }}>
//         <h5 className="mb-4">Add New Signatory</h5>
//         <div className="space-y-4">
//           <OutlinedInput label="Name" value={''} onChange={function (value: string): void {
//                       throw new Error('Function not implemented.');
//                   } }  />
//           <OutlinedInput label="Designation" value={''}  />
//           <OutlinedInput label="Mobile" value={''}  />
//           <OutlinedInput label="Email" value={''}  />
//           <OutlinedInput label="DSC Valid Date" value={''}  />
//           <OutlinedInput label="E-Sign" value={''}  />
//         </div>
//         <div className="flex justify-end space-x-2 mt-4">
//           <Button onClick={() => { }}>Cancel</Button>
//           <Button variant="solid" onClick={() => { }}>Add Signatory</Button>
//         </div>
//       </Dialog> */}
//     </div>
//   );
// };

// export default PFEditedData;

// import React, { useEffect, useState } from 'react';
// import { Button, Input, Dialog, Select, DatePicker } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { PFSetupData } from './PFSetupTable';
// // import { fetchPFById } from '@/api/endpoint'; // Assuming the API endpoint is defined here
// import { showErrorNotification } from '@/components/ui/ErrorMessage';
// import { useDispatch } from 'react-redux';
// import { fetchPFById } from '@/store/slices/pfSetup/pfSlice';

// interface PFEditedDataProps {
//   id: number;
//   onClose: () => void;
//   onRefresh: () => void; // Added onRefresh prop
// }

// const PFEditedData: React.FC<PFEditedDataProps> = ({ id, onClose, onRefresh }) => {
//   const [formData, setFormData] = useState<PFSetupData>({
//     Company_Group_Name: '',
//     Company_Name: '',
//     pf_code: '',
//     pfCodeLocation: '',
//     registrationDate: '',
//     pfUserId: '',
//     pfPassword: '',
//     authorizedSignatory: '',
//     signatoryDesignation: '',
//     signatoryMobile: '',
//     signatoryEmail: '',
//     dscValidDate: '',
//     esign: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (id) {
//       fetchPFData();
//     }
//   }, [id]);

//   const fetchPFData = async () => {
//     try {
//       setLoading(true);
//       const response = await dispatch(fetchPFById(id))
//        .unwrap()
//        .catch((error: any) => {
//           // Handle different error formats
//           if (error.response?.data?.message) {
//             // API error response
//             showErrorNotification(error.response.data.message);
//           } else if (error.message) {
//             // Regular error object
//             showErrorNotification(error.message);
//           } else if (Array.isArray(error)) {
//             // Array of error messages
//             showErrorNotification(error);
//           } else {
//             // Fallback error message
//             // showErrorNotification('An unexpected error occurred. Please try again.');
//           }
//           throw error; // Re-throw to prevent navigation
//         });
//       setFormData(response);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching PF data:', err);
//       setError('Failed to load PF details');
//       setLoading(false);
//       openNotification('danger', 'Failed to load PF details');
//     }
//   };

//   const handleChange = (field: keyof PFSetupData, value: string) => {
//     setFormData(prev => ({...prev, [field]: value }));
//   };

//   const openNotification = (type: 'uccess' | 'info' | 'danger' | 'warning', message: string) => {
//     //... (same as in the original code)
//   };

//   if (error) {
//     return (
//       <Dialog
//         isOpen={true}
//         onClose={onClose}
//         onRequestClose={onClose}
//         width={800}
//         height={600}
//       >
//         <div className="flex justify-center items-center h-full">
//           <p className="text-red-500">{error}</p>
//         </div>
//       </Dialog>
//     );
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4 space-y-4">
//       <div className='flex gap-4 items-center'>
//         <div className='w-full'>
//           <OutlinedInput
//             label="Company Group Name"
//             value={formData.Company_Group_Name}
//             onChange={(value) => handleChange('Company_Group_Name', value)}
//           />
//         </div>
//         <div className='w-full'>
//           <OutlinedInput
//             label="Company Name"
//             value={formData.Company_Name}
//             onChange={(value) => handleChange('Company_Name', value)}
//           />
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the PF Code</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//               label="PF Code"
//               value={formData.pf_code}
//               onChange={(value) => handleChange('pf_code', value)}
//             />
//           </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the PF Location</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//               label="Location"
//               value={formData.pfCodeLocation}
//               onChange={(value) => handleChange('pfCodeLocation', value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/*... (rest of the form fields, same pattern as above)... */}

//       <div className="flex justify-end mt-6">
//         <Button variant="plain" onClick={onClose} className="mr-2">
//           Cancel
//         </Button>
//         {/* Handle Submit is currently not implemented as per your request */}
//         {/* <Button variant="solid" onClick={handleSubmit}>
//           Confirm
//         </Button> */}
//       </div>
//     </div>
//   );
// };

// export default PFEditedData;


import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, Select, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFSetupData } from './PFSetupTable';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { fetchPFById, updatePF } from '@/store/slices/pfSetup/pfSlice';

interface PFEditedDataProps {
  id: number;
  initialData?: PFSetupData | null;
  onClose: () => void;
  onSubmit: (data: PFSetupData) => void;
  onRefresh: () => void;
}

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

const PFEditedData: React.FC<PFEditedDataProps> = ({ 
  id, 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh 
}) => {
  const [formData, setFormData] = useState<PFSetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    pf_code: '',
    pfCodeLocation: '',
    register_date: '',
    pf_user: '',
    password: '',
    authorizedSignatory: '',
    signatoryDesignation: '',
    signatoryMobile: '',
    signatoryEmail: '',
    dscValidDate: '',
    esign: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
    { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
    { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
    { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
  ]);

  useEffect(() => {
    if (id) {
      fetchPFData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchPFData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchPFById(id))
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
      console.error('Error fetching PF data:', err);
      setError('Failed to load PF details');
      setLoading(false);
      openNotification('danger', 'Failed to load PF details');
    }
  };

  const handleChange = (field: keyof PFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async() => {
    try {
    // Create updateData object (matching the original updateTracker data expectation)
    const updateData = {
      pf_code: formData.pf_code,
      pf_user: formData.pf_user,
      password: formData.password,
      register_date: formData.register_date || '',
    };

    // Dispatch updateTracker with id and updateData
    const resultAction = await dispatch(updatePF({
      id: id, 
      pfData: updateData 
    }));

      onClose();
      if (resultAction) {
        openNotification('success', 'PF Setup edited successfully');
         if (onRefresh) {
          onRefresh();
        }
      }
  } catch (err) {
    console.error('Error submitting tracker data:', err);
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
          <label>Enter the PF Code</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="PF Code"
              value={formData.pf_code}
              onChange={(value) => handleChange('pf_code', value)}
            />
          </div>
        </div>
          <div className="flex flex-col gap-2">
          <label>Enter PF user</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="PF User"
              value={formData.pf_user}
              onChange={(value) => handleChange('pf_user', value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
      
        <div className="flex flex-col gap-2">
          <label>Enter PF User Password</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="PF Password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>PF Registration Date</label>
          <div className="w-full">
            <DatePicker
              size='sm'
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

export default PFEditedData;

