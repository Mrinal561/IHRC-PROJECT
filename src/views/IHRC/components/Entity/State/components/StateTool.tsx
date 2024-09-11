// import React, { useState } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';


// interface CompanyNameToolProps {
//   updateCompanyName: (companyGroupName: string, newCompanyName: string) => void;
//   companyGroupNames: string[];
// }

// const StateTool: React.FC<CompanyNameToolProps> = ({ updateCompanyName, companyGroupNames }) => {
//   const [dialogIsOpen, setIsOpen] = useState(false);
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState('');
//   const [companyName, setCompanyName] = useState('');

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const onDialogClose = () => {
//     setIsOpen(false);
//     setSelectedCompanyGroup('');
//     setCompanyName('');
//   };

//   const showSuccessToast = (message: string) => {
//     toast.push(
//       <Notification title="Success" type="success">
//         <div className="flex items-center">
//           <span>{message}</span>
//         </div>
//       </Notification>
//     );
//   };

//   const showFailToast = (message: string) => {
//     toast.push(
//       <Notification title="Error" type="danger">
//         <div className="flex items-center">
//           <span>{message}</span>
//         </div>
//       </Notification>
//     );
//   };

//   const onDialogOk = () => {
//     if (selectedCompanyGroup && companyName.trim()) {
//       updateCompanyName(selectedCompanyGroup, companyName.trim());
//       showSuccessToast(`Company Name "${companyName.trim()}" has been successfully added to "${selectedCompanyGroup}".`);
//       setIsOpen(false);
//       setSelectedCompanyGroup('');
//       setCompanyName('');
//     } else {
//       showFailToast('Please select a Company Group and enter a valid Company Name.');
//     }
//   };

//   const selectOptions = companyGroupNames.map(name => ({ value: name, label: name }));

//   return (
//     <div>
//       <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
//         Add State
//       </Button>
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={onDialogClose}
//         onRequestClose={onDialogClose}
//         width={500}
//         height={300}
//       >
//         <div className="flex flex-col h-full justify-between">
//           <h5 className="mb-4">Add State</h5>
//           <OutlinedSelect
//             label="Select Company Group"
//             options={selectOptions}
//             value={selectedCompanyGroup}
//             onChange={(newValue: string) => setSelectedCompanyGroup(newValue)}
//           />
//           <div className="relative mt-4">
//             <input
//               type="text"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               placeholder="Enter company name"
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <span className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs font-semibold text-indigo-600">
//               Company Name
//             </span>
//           </div>
//           <div className="text-right mt-6">
//             <Button
//               className="mr-2"
//               variant="plain"
//               onClick={onDialogClose}
//             >
//               Cancel
//             </Button>
//             <Button variant="solid" onClick={onDialogOk}>
//               Submit
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default StateTool;

import React from 'react'

const StateTool = () => {
  return (
    <div>StateTool</div>
  )
}

export default StateTool