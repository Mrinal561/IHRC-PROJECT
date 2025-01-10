
// import React, { useEffect, useState } from 'react';
// import { Button, Input, Dialog, DatePicker, Select, toast, Notification } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { ESISetupData } from './EsicSetupTable';
// import OutlinedSelect from '@/components/ui/Outlined';
// import { useDispatch } from 'react-redux';
// import { showErrorNotification } from '@/components/ui/ErrorMessage';
// import { fetchEsiSetupById, updateEsiSetup } from '@/store/slices/esiSetup/esiSetupSlice';
// import * as yup from 'yup';


// interface ValidationErrors {
//   code?: string;
//   esi_user?:string;
//   password?:string;
//   register_date?: Date;
// }

// const esiSchema = yup.object().shape({
//   code: yup
//     .string()
//     .required('PF Code is required'),
//     esi_user: yup
//     .string()
//     .required('PF User is required')
//     .min(3, 'Username must be at least 3 characters'),
//     password: yup
//     .string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters')
//     .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
//         'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
//     ),
// });
// interface ESIEditedDataProps {
//   initialData: ESISetupData | null;
//   onClose: () => void;
//   onSubmit: (data: ESISetupData) => void;
//   onRefresh: () => void;
//   id: number;
// }

// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }

// const ESIEditedData: React.FC<ESIEditedDataProps> = ({ 
//   initialData, 
//   onClose, 
//   onSubmit, 
//   onRefresh,
//   id 
// }) => {
//   const [formData, setFormData] = useState<ESISetupData>({
//     Company_Group_Name: '',
//     Company_Name: '',
//     code: '',
//     esiCodeType: '',
//     esiCodeLocation: '',
//     esi_user: '',
//     password: '',
//     authorizedSignatory: '',
//     signatoryDesignation: '',
//     signatoryMobile: '',
//     signatoryEmail: '',
//     esiRegistrationDate: ''
//   });
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useDispatch();

//   const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
//     { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
//     { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
//     { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
//   ]);

//   useEffect(() => {
//     if (id) {
//       fetchESIData();
//     } else if (initialData) {
//       setFormData(initialData);
//       setLoading(false);
//     }
//   }, [id, initialData]);

//   const fetchESIData = async () => {
//     try {
//       setLoading(true);
//       const response = await dispatch(fetchEsiSetupById(id))
//         .unwrap()
//         .catch((error: any) => {
//           if (error.response?.data?.message) {
//             showErrorNotification(error.response.data.message);
//           } else if (error.message) {
//             showErrorNotification(error.message);
//           } else if (Array.isArray(error)) {
//             showErrorNotification(error);
//           }
//           throw error;
//         });
//       setFormData(response);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching ESI data:', err);
//       setError('Failed to load ESI details');
//       setLoading(false);
//       openNotification('danger', 'Failed to load ESI details');
//     }
//   };

  
//   const validateForm = async () => {
//     try {
//         // Validate the form data against the schema
//         await esiSchema.validate({
//           code: formData.pf_code,
//             esi_user: formData.pf_user,
//             password: formData.password
//         }, { abortEarly: false });
        
//         // Clear any existing errors if validation passes
//         setErrors({});
//         return true;
//     } catch (err) {
//         if (err instanceof yup.ValidationError) {
//             const validationErrors: ValidationErrors = {};
//             err.inner.forEach((error) => {
//                 if (error.path) {
//                     // Update the ValidationErrors interface to include all possible fields
//                     validationErrors[error.path as keyof ValidationErrors] = error.message;
//                 }
//             });
//             setErrors(validationErrors);
//         }
//         return false;
//     }
// };

//   const handleChange = (field: keyof ESISetupData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit =async () => {
//     try {
//       const isValid = await validateForm();
//     // if(!isValid) return;

//       const updateData = {
//         code: formData.code,
//         esi_user: formData.esi_user,
//         password: formData.password,
//         // register_date: formData.register_date || '',
//       };

//       const resultAction = await dispatch(updateEsiSetup({
//         id: id, 
//         esiData: updateData 
//       }));

//       onClose();
//       if (resultAction) {
//        toast.push(
//         <Notification title="Success" type="success">
//        ESI Data edited successfully
//        </Notification>
//        )
//         if (onRefresh) {
//           onRefresh();
//         }
//       }
//     } catch (err) {
//       console.error('Error submitting LWF data:', err);
//       openNotification('danger', 'Failed to save changes');
//     }
//   };

//   const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
//     // Implement notification logic here
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

//   // return (
//   //   <div className="p-4 space-y-4">
//   //     {/* <div className="flex gap-4 items-center">
//   //       <div className="w-full">
//   //         <OutlinedInput
//   //           label="Company Group"
//   //           value={formData.Company_Group_Name}
//   //           onChange={(value) => handleChange('Company_Group_Name', value)}
//   //         />
//   //       </div>
//   //       <div className="w-full">
//   //         <OutlinedInput
//   //           label="Company"
//   //           value={formData.Company_Name}
//   //           onChange={(value) => handleChange('Company_Name', value)}
//   //         />
//   //       </div>
//   //     </div> */}

//   //     <div className="flex gap-4 items-center">
//   //       {/* <div className="flex flex-col gap-2">
//   //         <label>Enter the ESI Code Type</label>
//   //         <div className="w-[352px]">
//   //           <OutlinedSelect
//   //             label="ESI Code Type"
//   //             options={[
//   //               { value: 'main', label: 'Main' },
//   //               { value: 'subCode', label: 'Sub Code' },
//   //             ]}
//   //             value={formData.esiCodeType}
//   //             onChange={(value) => handleChange('esiCodeType', value)}
//   //           />
//   //         </div>
//   //       </div> */}
//   //       <div className="flex flex-col gap-2 w-full">
//   //         <label>Enter the ESI Code</label>
//   //         <div className="w-full">
//   //           <OutlinedInput
//   //             label="ESI Code"
//   //             value={formData.code}
//   //             onChange={(value) => handleChange('code', value)}
//   //           />
//   //            <div className="h-5">
//   //             {errors.code && (
//   //               <div className="text-red-500 text-sm">{errors.code}</div>
//   //             )}
//   //           </div>
//   //         </div>
//   //       </div>
//   //        {/* <div className="flex flex-col gap-2">
//   //         <label>Enter the ESI Code Location</label>
//   //         <div className="w-[352px]">
//   //           <OutlinedInput
//   //             label="ESI Code Location"
//   //             value={formData.esiCodeLocation}
//   //             onChange={(value) => handleChange('esiCodeLocation', value)}
//   //           />
//   //         </div>
//   //       </div> */}
//   //     </div>

//   //     <div className="flex gap-4 items-center">
       
//   //       <div className="flex flex-col gap-2">
//   //         <label>Enter ESI User ID</label>
//   //         <div className="w-[352px]">
//   //           <OutlinedInput
//   //             label="ESI User ID (Optional)"
//   //             value={formData.esi_user}
//   //             onChange={(value) => handleChange('esi_user', value)}
//   //           />
//   //           <div className="h-5">
//   //             {errors.esi_user && (
//   //               <div className="text-red-500 text-sm">{errors.esi_user}</div>
//   //             )}
//   //           </div>
//   //         </div>
//   //       </div>
//   //        <div className="flex flex-col gap-4">
//   //         <label>Enter ESI User Password</label>
//   //         <div className="w-[352px]">
//   //           <OutlinedInput
//   //             label="ESI Password (Optional)"
//   //             value={formData.password}
//   //             onChange={(value) => handleChange('password', value)}
//   //           />
//   //            <div className="h-5">
//   //             {errors.password && (
//   //               <div className="text-red-500 text-sm">{errors.password}</div>
//   //             )}
//   //           </div>
//   //         </div>
//   //       </div>

//   //     </div>

//   //     <div className="flex gap-4 items-center">
       
//   //       {/* <div className="flex flex-col gap-2 w-full">
//   //         <label>Choose the Signatories</label>
//   //         <div>
//   //           <Select
//   //             options={existingSignatories.map(s => ({ value: s.name, label: s.name }))}
//   //             value={formData.authorizedSignatory}
//   //             onChange={(value) => handleChange('authorizedSignatory', value)}
//   //           />
//   //         </div>
//   //       </div> */}
//   //     </div>

//   //     {/* <div className="flex flex-col gap-4">
//   //       <label>Upload the ESI certificate</label>
//   //       <Input
//   //         id="file-upload"
//   //         type="file"
//   //       />
//   //     </div> */}

//   //     <div className="flex justify-end mt-6">
//   //       <Button variant="plain" onClick={onClose} className="mr-2">
//   //         Cancel
//   //       </Button>
//   //       <Button variant="solid" onClick={handleSubmit}>
//   //         Confirm
//   //       </Button>
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="p-4 space-y-6">
//       <div className="grid grid-cols-1 gap-6">
//         <div className="flex flex-col gap-2">
//           <label>Enter the ESI Code</label>
//           <div className="w-full">
//             <OutlinedInput
//               label="ESI Code"
//               value={formData.code}
//               onChange={(value) => handleChange('code', value)}
//             />
//             <div className="h-5">
//               {errors.code && (
//                 <div className="text-red-500 text-sm">{errors.code}</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
  
//       <div className="grid grid-cols-2 gap-6">
//         <div className="flex flex-col gap-2">
//           <label>Enter ESI User ID</label>
//           <div className="w-full">
//             <OutlinedInput
//               label="ESI User ID (Optional)"
//               value={formData.esi_user}
//               onChange={(value) => handleChange('esi_user', value)}
//             />
//             <div className="h-5">
//               {errors.esi_user && (
//                 <div className="text-red-500 text-sm">{errors.esi_user}</div>
//               )}
//             </div>
//           </div>
//         </div>
  
//         <div className="flex flex-col gap-2">
//           <label>Enter ESI User Password</label>
//           <div className="w-full">
//             <OutlinedInput
//               label="ESI Password (Optional)"
//               value={formData.password}
//               onChange={(value) => handleChange('password', value)}
//             />
//             <div className="h-5">
//               {errors.password && (
//                 <div className="text-red-500 text-sm">{errors.password}</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
  
//       <div className="flex justify-end mt-6 gap-2">
//         <Button variant="plain" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="solid" onClick={handleSubmit}>
//           Confirm
//         </Button>
//       </div>
//     </div>
//   );

// };

// export default ESIEditedData;

import React, { useEffect, useState } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchEsiSetupById, updateEsiSetup } from '@/store/slices/esiSetup/esiSetupSlice';
import * as yup from 'yup';

interface ESISetupData {
  id: number;
  group_id: number;
  company_id: number;
  code_Type: string;
  code: string;
  esi_user: string;
  password: string;
  CompanyGroup?: {
    id: number;
    name: string;
  };
  Company?: {
    id: number;
    name: string;
  };
  district_id?:number;
  Location?:{
    name?:string;
    id?:number;
    District?:{
      id?:number;
      name?: string;
      State?:{
        id?:number;
        name?:string;
      }
    }
  }
}

interface ValidationErrors {
  code_Type?: string;
  code?: string;
  esi_user?: string;
  password?: string;
}

interface ESIEditedDataProps {
  initialData: ESISetupData | null;
  onClose: () => void;
  onRefresh: () => void;
  id: number;
}

const esiSchema = yup.object().shape({
  code_Type: yup.string().required('Code type is required'),
  code: yup
    .string()
    .required('ESI code is required')
    .matches(/^[0-9]+$/, 'ESI code must contain only numbers'),
  esi_user: yup
    .string()
    .required('ESI user is required')
    .min(3, 'ESI user must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
    ),
});

const ESIEditedData: React.FC<ESIEditedDataProps> = ({
  initialData,
  onClose,
  onRefresh,
  id,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<ESISetupData>({
    id: 0,
    group_id: 0,
    company_id: 0,
    code_Type: '',
    code: '',
    esi_user: '',
    password: '',
  });
  const storedId = id;

  const codeTypeOptions = [
    { value: 'main', label: 'Main' },
    { value: 'subcode', label: 'SubCode' },
  ];

  useEffect(() => {
    console.log(id)
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
      toast.push(
        <Notification title="Error" type="danger">
          Failed to load ESI details
        </Notification>
      );
    }
  };

  const validateForm = async () => {
    try {
      await esiSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path as keyof ValidationErrors] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleChange = (field: keyof ESISetupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const isValid = await validateForm();
      if (!isValid) return;

      const updateData = {
        group_id: formData.group_id,
        company_id: formData.company_id,
        district_id: formData.Location?.District?.id,
        location: formData?.Location?.name,
        code_Type: formData.code_Type,
        code: formData.code,
        esi_user: formData.esi_user,
        password: formData.password,
      };
      if (!id) {
        toast.push(
          <Notification title="Error" type="danger">
            ESI Setup ID is missing
          </Notification>
        );
        return;
      }

      const resultAction = await dispatch(
        updateEsiSetup({
          id:id,
          esiData: updateData,
        })
      );

      if (resultAction) {
        toast.push(
          <Notification title="Success" type="success">
            ESI Data updated successfully
          </Notification>
        );
        onClose();
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (err) {
      console.error('Error updating ESI data:', err);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to update ESI data
        </Notification>
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Dialog isOpen={true} onClose={onClose} onRequestClose={onClose}>
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </Dialog>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Company Group and Company Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[70px]">
          <p className="text-sm font-medium mb-2">Company Group</p>
          <OutlinedInput
            label="Company Group"
            value={formData.CompanyGroup?.name || ''}
            disabled
          />
        </div>
        <div className="h-[70px]">
          <p className="text-sm font-medium mb-2">Company</p>
          <OutlinedInput
            label="Company"
            value={formData.Company?.name || ''}
            disabled
          />
        </div>
      </div>
  
      {/* ESI Code Type and Code */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">Code Type</p>
          <OutlinedSelect
            label="Select Code Type"
            options={codeTypeOptions}
            value={codeTypeOptions.find((option) => option.value === formData.code_Type)}
            onChange={(option: any) => {
              handleChange('code_Type', option?.value || '');
            }}
          />
          {errors.code_Type && (
            <p className="text-red-500 text-xs mt-1">{errors.code_Type}</p>
          )}
        </div>
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">ESI Code</p>
          <OutlinedInput
            label="ESI Code"
            value={formData.code}
            onChange={(value) => handleChange('code', value)}
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>
      </div>
  
      {/* ESI User and Password */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">ESI User</p>
          <OutlinedInput
            label="ESI User"
            value={formData.esi_user}
            onChange={(value) => handleChange('esi_user', value)}
          />
          {errors.esi_user && (
            <p className="text-red-500 text-xs mt-1">{errors.esi_user}</p>
          )}
        </div>
        <div className="h-[90px]">
          <p className="text-sm font-medium mb-2">Password</p>
          <OutlinedPasswordInput
            label="Password"
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
      </div>
  
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="plain" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default ESIEditedData;