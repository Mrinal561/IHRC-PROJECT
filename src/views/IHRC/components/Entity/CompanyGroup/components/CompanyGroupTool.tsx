import React, { useState } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { fetchCompanyGroups ,
  fetchCompanyGroupById,
  createCompanyGroup,
  updateCompanyGroup,
  deleteCompanyGroup,
  clearError
} from '@/store/slices/companyGroup/companyGroupSlice';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';


const CompanyGroupTool: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [companyGroupName, setCompanyGroupName] = useState('');
  const [newCompanyGroup, setNewCompanyGroup] = useState({
    name:''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      // const transformedData = transformStatePayload(newStateData);
      setIsLoading(true)
      const result = await dispatch(createCompanyGroup(newCompanyGroup));
      console.log(result)
      if(result){
      toast.push(
        <Notification title="Success" type="success">
          Company Group added successfully!
        </Notification>
      );
      }
    } catch (error) {
      // Error handling is done in the useEffect above
      toast.push(
        <Notification title="Success" type="danger">
          Not added
        </Notification>
      );
    } finally {
      setIsLoading(false)
    }
    onDialogClose();
  };
  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setCompanyGroupName('');
    setNewCompanyGroup({
      name:''
    })
  };

  const showNotification = (message: string) => {
    toast.push(
      <Notification title="Success" type="success">
        <div className="flex items-center">
          <span>{message}</span>
        </div>
      </Notification>
    );
  };

  const onDialogOk = () => {
    if (companyGroupName.trim()) {
      showNotification(`Company Group Name "${companyGroupName.trim()}" has been submitted.`);
      setIsOpen(false);
      setCompanyGroupName('');
    } else {
      showNotification('Please enter a valid Company Group Name.');
    }
  };

  const handleInputChange = (field: keyof CompanyGroupData, value: any) => {
    setNewCompanyGroup(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
        Add Company Group
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={500}
        height={250}
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Add Company Group</h5>
          <div className='flex flex-col gap-2'>
            <p>Enter Your Company Group</p>
            <OutlinedInput 
              label="Company Group Name"
              value={newCompanyGroup.name}
              onChange={(value: string) => handleInputChange('name', value)}
            />
          </div>
          <div className="text-right mt-6">
            <Button
              className="mr-2"
              variant="plain"
              onClick={onDialogClose}
            >
              Cancel
            </Button>
            <Button variant="solid" onClick={handleConfirm}>
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyGroupTool;

// import React, { useState } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import { 
//   fetchCompanyGroups,
//   fetchCompanyGroupById,
//   createCompanyGroup,
//   updateCompanyGroup,
//   deleteCompanyGroup,
//   clearError
// } from '@/store/slices/companyGroup/companyGroupSlice';
// import { AppDispatch, RootState } from '@/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { CompanyGroupData } from '@/@types/companyGroup';

// const CompanyGroupTool: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [dialogIsOpen, setIsOpen] = useState(false);
//   const [companyGroupName, setCompanyGroupName] = useState('');
//   const [newCompanyGroup, setNewCompanyGroup] = useState<CompanyGroupData>({
//     name: ''
//   });

//   const handleInputChange = (value: string) => {
//     setNewCompanyGroup(prev => ({ ...prev, name: value }));
//     setCompanyGroupName(value); // Keep both state values in sync
//   };

//   const handleConfirm = async () => {
//     try {
//     console.log("company group being created")  
//     await dispatch(createCompanyGroup(newCompanyGroup)).unwrap();
//       toast.push(
//         <Notification title="Success" type="success">
//           Company Group created successfully!
//         </Notification>
//       );
//       onDialogClose();
//     } catch (error) {
//       console.log(error)
//       toast.push(
//         <Notification title="Error" type="danger">
//           Failed to create Company Group
//         </Notification>
//       );
//     }
//   };

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const onDialogClose = () => {
//     setIsOpen(false);
//     setCompanyGroupName('');
//     setNewCompanyGroup({
//       name: ''
//     });
//   };

//   return (
//     <div>
//       <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
//         Add Company Group
//       </Button>
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={onDialogClose}
//         onRequestClose={onDialogClose}
//         width={500}
//         height={250}
//       >
//         <div className="flex flex-col h-full justify-between">
//           <h5 className="mb-4">Add Company Group</h5>
//           <div className='flex flex-col gap-2'>
//             <p>Enter Your Company Group</p>
//             <OutlinedInput 
//               label="Company Group Name"
//               value={newCompanyGroup.name}
//               onChange={(value: string) => handleInputChange(value)}
//             />
//           </div>
//           <div className="text-right mt-6">
//             <Button
//               className="mr-2"
//               variant="plain"
//               onClick={onDialogClose}
//             >
//               Cancel
//             </Button>
//             <Button variant="solid" onClick={handleConfirm}>
//               Submit
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyGroupTool;