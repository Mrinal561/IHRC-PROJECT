// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// interface PFSetupData {
//   companyGroup: string;
//   companyName: string;
//   pfCode: string;
//   pfCodeLocation: string;
//   pfUserId?: string;
//   pfPassword?: string;
//   authorizedSignatory: string;
//   signatoryMobile?: string;
//   signatoryEmail?: string;
//   dscValidDate?: string;
// }

// interface PFSetupToolProps {
//   addPFSetup: (newPFSetup: PFSetupData) => void;
//   companyGroups: string[];
//   getCompanyNames: (group: string) => string[];
//   pfCodeLocations: string[];
//   existingSignatories: string[];
// }

// const PFSetupTool: React.FC<PFSetupToolProps> = ({
//   addPFSetup,
//   companyGroups,
//   getCompanyNames,
//   pfCodeLocations,
//   existingSignatories,
// }) => {
//   const [dialogIsOpen, setIsOpen] = useState(false);
//   const [pfSetupData, setPFSetupData] = useState<PFSetupData>({
//     companyGroup: '',
//     companyName: '',
//     pfCode: '',
//     pfCodeLocation: '',
//     authorizedSignatory: '',
//   });
//   const [filteredCompanyNames, setFilteredCompanyNames] = useState<string[]>([]);

//   useEffect(() => {
//     if (pfSetupData.companyGroup) {
//       setFilteredCompanyNames(getCompanyNames(pfSetupData.companyGroup));
//     } else {
//       setFilteredCompanyNames([]);
//     }
//   }, [pfSetupData.companyGroup, getCompanyNames]);

//   const openDialog = () => setIsOpen(true);
//   const closeDialog = () => {
//     setIsOpen(false);
//     setPFSetupData({
//       companyGroup: '',
//       companyName: '',
//       pfCode: '',
//       pfCodeLocation: '',
//       authorizedSignatory: '',
//     });
//   };

//   const handleInputChange = (field: keyof PFSetupData, value: string) => {
//     setPFSetupData(prev => ({ ...prev, [field]: value }));
//     if (field === 'companyGroup') {
//       setPFSetupData(prev => ({ ...prev, companyName: '' }));
//     }
//   };

//   const showSuccessToast = (message: string) => {
//     toast.push(
//       <Notification title="Success" type="success">
//         {message}
//       </Notification>
//     );
//   };

//   const showFailToast = (message: string) => {
//     toast.push(
//       <Notification title="Error" type="danger">
//         {message}
//       </Notification>
//     );
//   };

//   const onDialogOk = () => {
//     if (pfSetupData.companyGroup && pfSetupData.companyName && pfSetupData.pfCode && pfSetupData.pfCodeLocation && pfSetupData.authorizedSignatory) {
//       addPFSetup(pfSetupData);
//       showSuccessToast(`PF Setup for "${pfSetupData.companyName}" has been successfully added.`);
//       closeDialog();
//     } else {
//       showFailToast('Please fill all required fields.');
//     }
//   };

//   return (
//     <div>
//       <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size="sm">
//         Add PF Setup
//       </Button>
//       <Dialog isOpen={dialogIsOpen} onClose={closeDialog} onRequestClose={closeDialog}>
//         <h5 className="mb-4">Add PF Setup</h5>
//         <div className="space-y-4">
//           <OutlinedSelect
//             label="Company Group"
//             options={companyGroups.map(group => ({ value: group, label: group }))}
//             value={pfSetupData.companyGroup}
//             onChange={(value: string) => handleInputChange('companyGroup', value)}
//           />
//           {/* <OutlinedSelect
//             label="Company Name"
//             options={filteredCompanyNames.map(name => ({ value: name, label: name }))}
//             value={pfSetupData.companyName}
//             onChange={(value: string) => handleInputChange('companyName', value)}
//             // disabled={!pfSetupData.companyGroup}
//           /> */}
//           <OutlinedInput
//             label="PF Code"
//             value={pfSetupData.pfCode}
//             onChange={(value: string) => handleInputChange('pfCode', value)}
//           />
//           <OutlinedSelect
//             label="PF Code Location"
//             options={pfCodeLocations.map(location => ({ value: location, label: location }))}
//             value={pfSetupData.pfCodeLocation}
//             onChange={(value: string) => handleInputChange('pfCodeLocation', value)}
//           />
//           <OutlinedInput
//             label="PF User ID (Optional)"
//             value={pfSetupData.pfUserId || ''}
//             onChange={(value: string) => handleInputChange('pfUserId', value)}
//           />
//           <OutlinedInput
//             label="PF Password (Optional)"
//             value={pfSetupData.pfPassword || ''}
//             onChange={(value: string) => handleInputChange('pfPassword', value)}
//           />
//           <OutlinedSelect
//             label="Authorized Signatory"
//             options={existingSignatories.map(name => ({ value: name, label: name }))}
//             value={pfSetupData.authorizedSignatory}
//             onChange={(value: string) => handleInputChange('authorizedSignatory', value)}
//           />
//           <OutlinedInput
//             label="Signatory Mobile (Optional)"
//             value={pfSetupData.signatoryMobile || ''}
//             onChange={(value: string) => handleInputChange('signatoryMobile', value)}
//           />
//           <OutlinedInput
//             label="Signatory Email (Optional)"
//             value={pfSetupData.signatoryEmail || ''}
//             onChange={(value: string) => handleInputChange('signatoryEmail', value)}
//           />
//           <OutlinedInput
//             label="DSC Valid Date (Optional)"
//             value={pfSetupData.dscValidDate || ''}
//             onChange={(value: string) => handleInputChange('dscValidDate', value)}
//           />
//         </div>
//         <div className="text-right mt-6">
//           <Button className="mr-2" variant="plain" onClick={closeDialog}>
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={onDialogOk}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default PFSetupTool;

import React from 'react'

const PFSetupTool = () => {
  return (
    <div>PFSetupTool</div>
  )
}

export default PFSetupTool