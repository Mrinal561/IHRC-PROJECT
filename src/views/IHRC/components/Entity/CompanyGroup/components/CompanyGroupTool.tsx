// import React, { useState } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiCheckCircle, HiPlusCircle, HiXCircle } from 'react-icons/hi';

// // Import the interface (adjust the import path as needed)
// import { EntityData } from '@/views/IHRC/store/dummyEntityData';

// interface CompanyGroupToolProps {
//   addCompanyGroup: (newEntityData: EntityData) => void;
// }

// const CompanyGroupTool: React.FC<CompanyGroupToolProps> = ({ addCompanyGroup }) => {
//   const [dialogIsOpen, setIsOpen] = useState(false);
//   const [companyGroupName, setCompanyGroupName] = useState('');

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const onDialogClose = () => {
//     setIsOpen(false);
//     setCompanyGroupName('');
//   };

  // const showSuccessToast = (message: string) => {
  //   const toastNotification = (
  //     <Notification title="Success" type="success">
  //       <div className="flex items-center">
  //         <HiCheckCircle className="text-emerald-500 text-xl mr-2" />
  //         <span>{message}</span>
  //       </div>
  //     </Notification>
  //   );
  //   toast.push(toastNotification);
  // };

  // const showFailToast = (message: string) => {
  //   const toastNotification = (
  //     <Notification title="Error" type="danger">
  //       <div className="flex items-center">
  //         <HiXCircle className="text-red-500 text-xl mr-2" />
  //         <span>{message}</span>
  //       </div>
  //     </Notification>
  //   );
  //   toast.push(toastNotification);
  // };

//   const onDialogOk = () => {
//     if (companyGroupName.trim()) {
//       const newEntityData: EntityData = {
//         Company_Group_Name: companyGroupName.trim()
//       };
//       addCompanyGroup(newEntityData);
//       showSuccessToast(`Company Group Name "${companyGroupName.trim()}" has been successfully added.`);
//       setIsOpen(false);
//       setCompanyGroupName('');
//     } else {
//       showFailToast('Please enter a valid Company Group Name.');
//     }
//   };

  // return (
  //   <div>
  //     <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
  //       Add Company Group Name
  //     </Button>
  //     <Dialog
  //       isOpen={dialogIsOpen}
  //       onClose={onDialogClose}
  //       onRequestClose={onDialogClose}
  //       width={500}
  //       height={250}
  //     >
  //       <div className="flex flex-col h-full justify-between">
  //         <h5 className="mb-4">Add Company Group Name</h5>
  //         <input
  //           type="text"
  //           value={companyGroupName}
  //           onChange={(e) => setCompanyGroupName(e.target.value)}
  //           placeholder="Enter company group name"
  //           className="border p-2 rounded"
  //         />
  //         <div className="text-right mt-6">
  //           <Button
  //             className="mr-2"
  //             variant="plain"
  //             onClick={onDialogClose}
  //           >
  //             Cancel
  //           </Button>
  //           <Button variant="solid" onClick={onDialogOk}>
  //             Submit
  //           </Button>
  //         </div>
  //       </div>
  //     </Dialog>
  //   </div>
  // );
// };

// export default CompanyGroupTool;


import React, { useState, useEffect } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import OutlinedInput from '@/components/ui/OutlinedInput';

interface CompanyGroupToolProps {
  addCompanyGroup: (newEntityData: EntityData) => void;
}

const CompanyGroupTool: React.FC<CompanyGroupToolProps> = ({ addCompanyGroup }) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [companyGroupName, setCompanyGroupName] = useState('');
  const [entityDataList, setEntityDataList] = useState<EntityData[]>(() => {
    const savedData = localStorage.getItem('entityDataList');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('entityDataList', JSON.stringify(entityDataList));
  }, [entityDataList]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setCompanyGroupName('');
  };

  const showSuccessToast = (message: string) => {
    const toastNotification = (
      <Notification title="Success" type="success">
        <div className="flex items-center">
          <span>{message}</span>
        </div>
      </Notification>
    );
    toast.push(toastNotification);
  };

  const showFailToast = (message: string) => {
    const toastNotification = (
      <Notification title="Error" type="danger">
        <div className="flex items-center">
          <span>{message}</span>
        </div>
      </Notification>
    );
    toast.push(toastNotification);
  };

  const onDialogOk = () => {
    if (companyGroupName.trim()) {
      const newEntityData: EntityData = {
        Company_Group_Name: companyGroupName.trim()
      };
      
      const updatedEntityDataList = [...entityDataList, newEntityData];
      setEntityDataList(updatedEntityDataList);
      
      addCompanyGroup(newEntityData);
      showSuccessToast(`Company Group Name "${companyGroupName.trim()}" has been successfully added.`);
      setIsOpen(false);
      setCompanyGroupName('');
    } else {
      showFailToast('Please enter a valid Company Group Name.');
    }
  };

  const handleInputChange = (value: string) => {
    setCompanyGroupName(value);
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
        Add Company Group Name
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={500}
        height={250}
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Add Company Name</h5>
          <div className='flex flex-col gap-2'>
            <p>Enter Your Company Group Name</p>
          <OutlinedInput 
           label="Company Group Name"
           value={companyGroupName}
           onChange={handleInputChange}
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
            <Button variant="solid" onClick={onDialogOk}>
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyGroupTool;
