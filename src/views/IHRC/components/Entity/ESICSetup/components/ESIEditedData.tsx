// import React, { useEffect, useState } from 'react';
// import { Button, Input, Dialog, Notification, DatePicker, Select } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { ESISetupData } from './EsicSetupTable';
// import OutlinedSelect from '@/components/ui/Outlined';



// interface ESIEditedDataProps {
//   initialData: ESISetupData | null;
//   onClose: () => void;
//   onSubmit: (data: ESISetupData) => void;
//   id: number;
// }

// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }


// const ESIEditedData: React.FC<ESIEditedDataProps> = ({ initialData, onClose, onSubmit,id }) => {

//   const [formData, setFormData] = useState<ESISetupData>({
//     Company_Group_Name:'',
//     Company_Name:'',
//     esiCode:'',
//     esiCodeType:'',
//     esiCodeLocation:'',
//     esiUserId:'',
//     esiPassword:'',
//     authorizedSignatory:'',
//     signatoryDesignation:'',
//     signatoryMobile:'',
//     signatoryEmail:'',
//     esiRegistrationDate: ''
//   })
//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (field: keyof PFSetupData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };


//   const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);

 
//   const handleAddSignatory = () => {
//     setShowAddSignatoryDialog(false);
//   };


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
//                       label="Company Group"
//                       value={formData.Company_Group_Name} onChange={function (value: string): void {
//                           throw new Error('Function not implemented.');
//                       } }               
//           />
//         </div>
//         <div className='w-full'>
//           <OutlinedInput
//                       label="Company"
//                       value={formData.Company_Name} onChange={function (value: string): void {
//                           throw new Error('Function not implemented.');
//                       } }               
//           />
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the ESI Code Type</label>
//           <div className='w-[352px]'>
//           <OutlinedSelect
//             label="ESI Code Type"
//             options={[
//               { value: 'main', label: 'Main' },
//               { value: 'subCode', label: 'Sub Code' },
//             ]}
//                           value={formData.esiCodeType} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }                 
//             />
//           </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the ESI Code</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="ESI Code"
//                           value={formData.esiCode} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }                 
//             />
//           </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the ESI Code Location</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="ESI Code Location"
//                           value={formData.esiCodeLocation} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }                 
//             />
//           </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter ESI User ID</label>
//           <div className='w-[352px]'>
//             <OutlinedInput
//                           label="ESI User ID (Optional)"
//                           value={formData.esiUserId} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }                 
//             />
//           </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-4'>
//           <label>Enter ESI User Password</label>
//           <div className='w-56'>
//             <OutlinedInput
//                           label="ESI Password (Optional)"
//                           value={formData.esiPassword} onChange={function (value: string): void {
//                               throw new Error('Function not implemented.');
//                           } }                 
//             />
//           </div>
//         </div>

//         {/* <div className='flex flex-col gap-2 w-full'>
//           <label>Choose the Signatories</label>
//           <div>
//           <Input
//               value={formData.authorizedSignatory}
//               onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
//             />
//           </div>
//         </div> */}

// <div className='flex flex-col gap-2 w-full'>
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

//       <div className='flex flex-col gap-4'>
//         <label>Upload the ESI certificate</label>
//         <Input
//           id="file-upload"
//           type="file"
             
//         />
//       </div>

     

   
//     </div>
//   );
// };

// export default ESIEditedData;
import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { ESISetupData } from './EsicSetupTable';
import OutlinedSelect from '@/components/ui/Outlined';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchEsiSetupById, updateEsiSetup } from '@/store/slices/esiSetup/esiSetupSlice';

interface ESIEditedDataProps {
  initialData: ESISetupData | null;
  onClose: () => void;
  onSubmit: (data: ESISetupData) => void;
  onRefresh: () => void;
  id: number;
}

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

const ESIEditedData: React.FC<ESIEditedDataProps> = ({ 
  initialData, 
  onClose, 
  onSubmit, 
  onRefresh,
  id 
}) => {
  const [formData, setFormData] = useState<ESISetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    code: '',
    esiCodeType: '',
    esiCodeLocation: '',
    esi_user: '',
    password: '',
    authorizedSignatory: '',
    signatoryDesignation: '',
    signatoryMobile: '',
    signatoryEmail: '',
    esiRegistrationDate: ''
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
      fetchESIData();
    } else if (initialData) {
      setFormData(initialData);
      setLoading(false);
    }
  }, [id, initialData]);

  const fetchESIData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchEsiSetupById(id))
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
      console.error('Error fetching ESI data:', err);
      setError('Failed to load ESI details');
      setLoading(false);
      openNotification('danger', 'Failed to load ESI details');
    }
  };

  const handleChange = (field: keyof ESISetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit =async () => {
    try {
      const updateData = {
        code: formData.code,
        esi_user: formData.esi_user,
        password: formData.password,
        // register_date: formData.register_date || '',
      };

      const resultAction = await dispatch(updateEsiSetup({
        id: id, 
        esiData: updateData 
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
    // Implement notification logic here
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
      {/* <div className="flex gap-4 items-center">
        <div className="w-full">
          <OutlinedInput
            label="Company Group"
            value={formData.Company_Group_Name}
            onChange={(value) => handleChange('Company_Group_Name', value)}
          />
        </div>
        <div className="w-full">
          <OutlinedInput
            label="Company"
            value={formData.Company_Name}
            onChange={(value) => handleChange('Company_Name', value)}
          />
        </div>
      </div> */}

      <div className="flex gap-4 items-center">
        {/* <div className="flex flex-col gap-2">
          <label>Enter the ESI Code Type</label>
          <div className="w-[352px]">
            <OutlinedSelect
              label="ESI Code Type"
              options={[
                { value: 'main', label: 'Main' },
                { value: 'subCode', label: 'Sub Code' },
              ]}
              value={formData.esiCodeType}
              onChange={(value) => handleChange('esiCodeType', value)}
            />
          </div>
        </div> */}
        <div className="flex flex-col gap-2 w-full">
          <label>Enter the ESI Code</label>
          <div className="w-full">
            <OutlinedInput
              label="ESI Code"
              value={formData.code}
              onChange={(value) => handleChange('code', value)}
            />
          </div>
        </div>
         {/* <div className="flex flex-col gap-2">
          <label>Enter the ESI Code Location</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="ESI Code Location"
              value={formData.esiCodeLocation}
              onChange={(value) => handleChange('esiCodeLocation', value)}
            />
          </div>
        </div> */}
      </div>

      <div className="flex gap-4 items-center">
       
        <div className="flex flex-col gap-2">
          <label>Enter ESI User ID</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="ESI User ID (Optional)"
              value={formData.esi_user}
              onChange={(value) => handleChange('esi_user', value)}
            />
          </div>
        </div>
         <div className="flex flex-col gap-4">
          <label>Enter ESI User Password</label>
          <div className="w-[352px]">
            <OutlinedInput
              label="ESI Password (Optional)"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
            />
          </div>
        </div>

      </div>

      <div className="flex gap-4 items-center">
       
        {/* <div className="flex flex-col gap-2 w-full">
          <label>Choose the Signatories</label>
          <div>
            <Select
              options={existingSignatories.map(s => ({ value: s.name, label: s.name }))}
              value={formData.authorizedSignatory}
              onChange={(value) => handleChange('authorizedSignatory', value)}
            />
          </div>
        </div> */}
      </div>

      {/* <div className="flex flex-col gap-4">
        <label>Upload the ESI certificate</label>
        <Input
          id="file-upload"
          type="file"
        />
      </div> */}

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

export default ESIEditedData;