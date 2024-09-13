// import React, { useState, useMemo } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import { EntityData } from '@/views/IHRC/store/dummyEntityData';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// interface BranchToolProps {
//   addBranch: (newBranch: BranchData) => void;
//   entityData: EntityData[];
//   locationData: EntityData[];
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface BranchData extends EntityData {
//   Branch: string;
// }

// const BranchTool: React.FC<BranchToolProps> = ({ addBranch, entityData, locationData }) => {
//   const [dialogIsOpen, setIsOpen] = useState(false);
//   const [branchName, setBranchName] = useState('');
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
//   const [selectedCompanyName, setSelectedCompanyName] = useState<SelectOption | null>(null);
//   const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
//   const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null);

//   const companyGroupOptions = useMemo(() => {
//     const groups = [...new Set(entityData.map(item => item.Company_Group_Name))];
//     return groups.map(group => ({ value: group, label: group }));
//   }, [entityData]);

//   const filteredCompanyNameOptions = useMemo(() => {
//     if (!selectedCompanyGroup) return [];
//     const names = entityData
//       .filter(item => item.Company_Group_Name === selectedCompanyGroup.value)
//       .map(item => item.Company_Name);
//     return [...new Set(names)].map(name => ({ value: name, label: name }));
//   }, [entityData, selectedCompanyGroup]);

//   const filteredStateOptions = useMemo(() => {
//     if (!selectedCompanyGroup || !selectedCompanyName) return [];
//     const states = entityData
//       .filter(item => item.Company_Group_Name === selectedCompanyGroup.value && item.Company_Name === selectedCompanyName.value)
//       .map(item => item.State);
//     return [...new Set(states)].map(state => ({ value: state, label: state }));
//   }, [entityData, selectedCompanyGroup, selectedCompanyName]);

//   const filteredLocationOptions = useMemo(() => {
//     if (!selectedCompanyGroup || !selectedCompanyName || !selectedState) return [];
//     const locations = locationData
//       .filter(item => 
//         item.Company_Group_Name === selectedCompanyGroup.value && 
//         item.Company_Name === selectedCompanyName.value &&
//         item.State === selectedState.value
//       )
//       .map(item => item.Location);
//     return [...new Set(locations)].map(location => ({ value: location, label: location }));
//   }, [locationData, selectedCompanyGroup, selectedCompanyName, selectedState]);

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const onDialogClose = () => {
//     setIsOpen(false);
//     setBranchName('');
//     setSelectedCompanyGroup(null);
//     setSelectedCompanyName(null);
//     setSelectedState(null);
//     setSelectedLocation(null);
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
//     if (branchName.trim() && selectedCompanyGroup && selectedCompanyName && selectedState && selectedLocation) {
//       const newBranchData: BranchData = {
//         Company_Group_Name: selectedCompanyGroup.value,
//         Company_Name: selectedCompanyName.value,
//         State: selectedState.value,
//         Location: selectedLocation.value,
//         Branch: branchName.trim()
//       };
      
//       addBranch(newBranchData);
//       showSuccessToast(`Branch "${branchName.trim()}" has been successfully added.`);
//       onDialogClose();
//     } else {
//       showFailToast('Please enter a valid Branch Name and select all required fields.');
//     }
//   };

//   return (
//     <div>
//       <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size="sm">
//         Assign Branch
//       </Button>
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={onDialogClose}
//         onRequestClose={onDialogClose}
//       >
//         <h5 className="mb-4">Add Branch</h5>
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col gap-2">
//             <p>Select The Company Group</p>
//             <OutlinedSelect
//               label="Select Company Group"
//               options={companyGroupOptions}
//               value={selectedCompanyGroup}
//               onChange={(option: SelectOption | null) => {
//                 setSelectedCompanyGroup(option);
//                 setSelectedCompanyName(null);
//                 setSelectedState(null);
//                 setSelectedLocation(null);
//               }}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <p>Select The Company Name</p>
//             <OutlinedSelect
//               label="Select Company Name"
//               options={filteredCompanyNameOptions}
//               value={selectedCompanyName}
//               onChange={(option: SelectOption | null) => {
//                 setSelectedCompanyName(option);
//                 setSelectedState(null);
//                 setSelectedLocation(null);
//               }}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <p>Select The State</p>
//             <OutlinedSelect
//               label="Select State"
//               options={filteredStateOptions}
//               value={selectedState}
//               onChange={(option: SelectOption | null) => {
//                 setSelectedState(option);
//                 setSelectedLocation(null);
//               }}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <p>Select The Location</p>
//             <OutlinedSelect
//               label="Select Location"
//               options={filteredLocationOptions}
//               value={selectedLocation}
//               onChange={(option: SelectOption | null) => {
//                 setSelectedLocation(option);
//               }}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <p>Enter Branch Name</p>
//             <OutlinedInput 
//               label="Branch Name"
//               value={branchName}
//               onChange={(value: string) => {
//                 setBranchName(value);
//               }}
//             />
//           </div>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             className="mr-2"
//             variant="plain"
//             onClick={onDialogClose}
//           >
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

// export default BranchTool;

import React from 'react';
import { Button } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';

const BranchTool: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBranch = () => {
    navigate(`/add-branch`);
  };

  return (
    <div>
      <Button variant="solid" onClick={handleAddBranch} icon={<HiPlusCircle />} size="sm">
        Assign Branch
      </Button>
    </div>
  );
};

export default BranchTool;

