// // import React, { useState } from 'react';
// // import { Button, Dialog, Tooltip, toast, Notification, Select, Input } from '@/components/ui';
// // import { HiDownload, HiPlusCircle } from 'react-icons/hi';
// // import { FaDownload } from 'react-icons/fa';
// // import AssignChecklistTableFilter from './AssignChecklistTableFilter';
// // import AssignChecklistTableSearch from './AssignChecklistTableSearch';
// // import BulkAlertButton from './BulkAlertButton';
// // import { ActionMeta, components, SingleValue } from 'react-select'
// // import { FaChevronDown } from 'react-icons/fa'
// // import DashboardFilter from '../../../Home/components/DashboardFilter'
// // import Company from '../../../Home/components/Company';


// // const documentPath = "../store/AllMappedCompliancesDetails.xls";

// // export const BulkSetOwnerApproverButton = () => {
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [remark, setRemark] = useState('');
// //   const [file, setFile] = useState<File | null>(null);

// //   const handleAssignClick = () => {
// //     setIsDialogOpen(true);
// //   };

// //   const handleConfirm = () => {
// //     setIsDialogOpen(false);
// //     // Here you would typically handle the file upload and remark submission
// //     // For this example, we'll just show a success notification
// //     toast.push(
// //       <Notification
// //         title="Success"
// //         type="success"
// //       >
// //         Owner/Approver set successfully!
// //       </Notification>,
// //       {
// //         placement: 'top-end',
// //       }
// //     );
// //   };

// //   const handleCancel = () => {
// //     setIsDialogOpen(false);
// //     setRemark('');
// //     setFile(null);
// //   };

// //   const handleDownload = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
// //     e.preventDefault();
// //     // Implement the download functionality here
// //     // For example, you could use the `fetch` API to download the file
// //     fetch(documentPath)
// //       .then(response => response.blob())
// //       .then(blob => {
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.style.display = 'none';
// //         a.href = url;
// //         a.download = 'AllMappedCompliancesDetails.xls';
// //         document.body.appendChild(a);
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //       })
// //       .catch(() => console.error('Download failed'));
// //   };

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.files) {
// //       setFile(event.target.files[0]);
// //     }
// //   };

// //   return (
// //     <div className='flex items-center justify-center gap-3'>
// //     <BulkAlertButton/>
// //       <Button 
// //         variant="solid" 
// //         size="sm" 
// //         icon={<HiPlusCircle />} 
// //         onClick={handleAssignClick}
// //       >
// //         Bulk Owner/Approver
// //       </Button>

// //       <Dialog
// //         isOpen={isDialogOpen}
// //         onClose={handleCancel}
// //         width={450}
// //       >
// //         <h5 className="mb-4">Set Owner/Approver</h5>
// //         <div className="my-4 flex items-center gap-2">
// //         <p>Download Assigned Compliance</p>
// //           <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
// //             <Button size='xs' icon={<HiDownload />}>Download</Button>
// //           </a>
// //         </div>
// //         <div className='flex flex-col gap-2'>
// //         <p>Upload Assigned Compliance:</p>
        
// //         <Input
// //           type="file"
// //           onChange={handleFileChange}
// //           className="mb-4"
// //           />
// //         </div>
// //         <p>Please Enter the remark:</p>
// //         <textarea
// //           className="w-full p-2 border rounded mb-2"
// //           rows={3}
// //           placeholder="Enter remark"
// //           value={remark}
// //           onChange={(e) => setRemark(e.target.value)}
// //         />
// //         <div className="mt-6 text-right">
// //           <Button
// //             size="sm"
// //             className="mr-2"
// //             onClick={handleCancel}
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             variant="solid"
// //             size="sm"
// //             onClick={handleConfirm}
// //           >
// //             Confirm
// //           </Button>
// //         </div>
// //       </Dialog>
// //     </div>
// //   );
// // };
// // const AssignChecklistTableTool = () => {

// //   return (
// //     <div className="flex flex-col lg:flex-row lg:items-center gap-3">
// //         <div>
// //       <AssignChecklistTableSearch />
// //         </div>
// //       <div>
// //         <BulkSetOwnerApproverButton />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AssignChecklistTableTool;

// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, Tooltip, toast, Notification, Select, Input } from '@/components/ui';
// import { HiDownload, HiPlusCircle } from 'react-icons/hi';
// import { FaDownload } from 'react-icons/fa';
// import AssignChecklistTableFilter from './AssignChecklistTableFilter';
// import AssignChecklistTableSearch from './AssignChecklistTableSearch';
// import BulkAlertButton from './BulkAlertButton';
// import { ActionMeta, components, SingleValue } from 'react-select';
// import { FaChevronDown } from 'react-icons/fa';
// import DashboardFilter from '../../../Home/components/DashboardFilter';
// import Company from '../../../Home/components/Company';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';
// import { useDispatch } from 'react-redux';
// import { updateApproverOwner } from '@/store/slices/AssignedCompliance/assignedComplianceSlice';

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface BulkSetOwnerApproverButtonProps {
//   selectedIds: number[];
//   refreshTable: () => void;
// }

// export const BulkSetOwnerApproverButton: React.FC<BulkSetOwnerApproverButtonProps> = ({ 
//   selectedIds,
//   refreshTable 
// }) => {
//   const dispatch = useDispatch();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [remark, setRemark] = useState('');
//   const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
//   const [selectedOwnerOption, setSelectedOwnerOption] = useState<SelectOption | null>(null);
//   const [selectedApproverOption, setSelectedApproverOption] = useState<SelectOption | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     fetchUsersData();
//   }, []);

//   const fetchUsersData = async () => {
//     try {
//       const response = await httpClient.get(endpoints.user.getAll());
      
//       if (response?.data?.data && Array.isArray(response.data.data)) {
//         const mappedOptions = response.data.data.map((user: any) => ({
//           label: `${user.first_name} ${user.last_name}`,
//           value: user.id
//         }));
        
//         setUserOptions(mappedOptions);
//       } else {
//         toast.push(
//           <Notification title="Error" type="danger">
//             Invalid data format received
//           </Notification>
//         );
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.push(
//         <Notification title="Error" type="danger">
//           Failed to fetch users
//         </Notification>
//       );
//     }
//   };

//   const handleOwnerChange = (value: SelectOption | null) => {
//     setSelectedOwnerOption(value);
//   };

//   const handleApproverChange = (value: SelectOption | null) => {
//     setSelectedApproverOption(value);
//   };

//   const handleConfirm = async () => {
//     if (!selectedIds.length) {
//       toast.push(
//         <Notification title="Warning" type="warning">
//           Please select compliances to update
//         </Notification>
//       );
//       return;
//     }

//     if (!selectedOwnerOption && !selectedApproverOption) {
//       toast.push(
//         <Notification title="Warning" type="warning">
//           Please select an owner or approver
//         </Notification>
//       );
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       const updateData = {
//         owner_id: selectedOwnerOption?.value || 0,
//         approver_id: selectedApproverOption?.value || 0,
//         assigned_compliance_id: selectedIds,
//         remark: remark
//       };

//       // await dispatch(updateApproverOwner({
//       //   id: selectedIds[0].toString(), // Using first ID as reference
//       //   data: updateData
//       // })).unwrap();

//       toast.push(
//         <Notification title="Success" type="success">
//           Owner and Approver updated successfully for selected compliances
//         </Notification>
//       );
      
//       handleCancel();
//       refreshTable();
//     } catch (error) {
//       console.error('Error updating owner/approver:', error);
//       toast.push(
//         <Notification title="Error" type="danger">
//           Failed to update owner and approver
//         </Notification>
//       );
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsDialogOpen(false);
//     setRemark('');
//     setSelectedOwnerOption(null);
//     setSelectedApproverOption(null);
//   };

//   const documentPath = "../store/AllMappedCompliancesDetails.xls";

//   const handleDownload = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     e.preventDefault();
//     fetch(documentPath)
//       .then(response => response.blob())
//       .then(blob => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = 'AllMappedCompliancesDetails.xls';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       })
//       .catch(() => console.error('Download failed'));
//   };

//   return (
//     <div className="flex items-center justify-center gap-3">
//       <Button 
//         variant="solid" 
//         size="sm" 
//         icon={<HiPlusCircle />} 
//         onClick={() => setIsDialogOpen(true)}
//       >
//         Bulk Owner/Approver
//       </Button>

//       <Dialog
//         isOpen={isDialogOpen}
//         onClose={handleCancel}
//         width={500}
//       >
//         <h5 className="mb-4">Set Owner/Approver for Selected Compliances</h5>
        
//         {/* <div className="my-4 flex items-center gap-2">
//           <p>Download Current Assignments</p>
//           <a href={documentPath} onClick={handleDownload}>
//             <Button size="xs" icon={<HiDownload />}>Download</Button>
//           </a>
//         </div> */}

//         <div className="space-y-6">
//           <div>
//             <label className="block mb-2">Set Owner</label>
//             <OutlinedSelect
//               label="Set Owner"
//               options={userOptions}
//               value={selectedOwnerOption}
//               onChange={handleOwnerChange}
//             />
//           </div>

//           <div>
//             <label className="block mb-2">Set Approver</label>
//             <OutlinedSelect
//               label="Set Approver"
//               options={userOptions}
//               value={selectedApproverOption}
//               onChange={handleApproverChange}
//             />
//           </div>

//           <div>
//             <label className="block mb-2">Remark</label>
//             <textarea
//               className="w-full p-2 border rounded"
//               rows={3}
//               placeholder="Enter remark"
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="mt-6 text-right space-x-2">
//           <Button
//             size="sm"
//             onClick={handleCancel}
//             disabled={isUpdating}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="solid"
//             size="sm"
//             onClick={handleConfirm}
//             loading={isUpdating}
//             disabled={isUpdating}
//           >
//             {isUpdating ? 'Updating...' : 'Confirm'}
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// interface AssignChecklistTableToolProps {
//   selectedIds: number[];
//   refreshTable: () => void;
// }

// const AssignChecklistTableTool: React.FC<AssignChecklistTableToolProps> = ({ 
//   selectedIds, 
//   refreshTable 
// }) => {
//   return (
//     <div className="flex flex-col lg:flex-row lg:items-center gap-3">
//       <div>
//         <AssignChecklistTableSearch />
//       </div>
//       <div className="flex items-center gap-3">
//         <BulkAlertButton />
//         <BulkSetOwnerApproverButton 
//           selectedIds={selectedIds}
//           refreshTable={refreshTable}
//         />
//       </div>
//     </div>
//   );
// };

// export default AssignChecklistTableTool;

import React, { useState, useEffect } from 'react';
import { Button, Dialog, Notification, Input, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import AssignChecklistTableSearch from './AssignChecklistTableSearch';
import BulkAlertButton from './BulkAlertButton';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useDispatch } from 'react-redux';
import { updateApproverOwner } from '@/store/slices/AssignedCompliance/assignedComplianceSlice';

interface SelectOption {
  value: number;
  label: string;
}

interface BulkSetOwnerApproverButtonProps {
  selectedIds: number[];
  refreshTable: () => void;
}

export const BulkSetOwnerApproverButton: React.FC<BulkSetOwnerApproverButtonProps> = ({ 
  selectedIds,
  refreshTable 
}) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
  const [selectedOwnerOption, setSelectedOwnerOption] = useState<SelectOption | null>(null);
  const [selectedApproverOption, setSelectedApproverOption] = useState<SelectOption | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await httpClient.get(endpoints.user.getAll());
      
      if (response?.data?.data && Array.isArray(response.data.data)) {
        const mappedOptions = response.data.data.map((user: any) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id // Ensure value is string
        }));
        
        setUserOptions(mappedOptions);
      } else {
        toast.push(
          <Notification title="Error" type="danger">
            Invalid data format received
          </Notification>
        );
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to fetch users
        </Notification>
      );
    }
  };

  const handleOwnerChange = (value: SelectOption | null) => {
    setSelectedOwnerOption(value);
  };

  const handleApproverChange = (value: SelectOption | null) => {
    setSelectedApproverOption(value);
  };



  const handleConfirm = async () => {
    // if (selectedIds.length === 0) {
    //   toast.push(
    //     <Notification title="Warning" type="warning">
    //       Please select compliances to update
    //     </Notification>
    //   );
    //   return;
    // }

    if (!selectedOwnerOption && !selectedApproverOption) {
      toast.push(
        <Notification title="Warning" type="warning">
          Please select at least an owner or approver
        </Notification>
      );
      return;
    }

    setIsUpdating(true);
    try {
      const updateData = {
        owner_id: selectedOwnerOption?.value || null,
        approver_id: selectedApproverOption?.value || null,
        assigned_compliance_id: selectedIds,
        // remark: remark.trim()
      };

      // console.log(updateData)
      const response = await httpClient.put(endpoints.assign.update(), updateData);

      if (response) {
        toast.push(
          <Notification title="Success" type="success">
            Owner and Approver updated successfully
          </Notification>
        );
        handleCancel();
        refreshTable();
        // This will refresh the table and reset selections
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating owner/approver:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to update owner and approver
        </Notification>
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setSelectedOwnerOption(null);
    setSelectedApproverOption(null);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Button 
        variant="solid" 
        size="sm" 
        icon={<HiPlusCircle />} 
        onClick={() =>{
          if (selectedIds.length === 0) {
            toast.push(
              <Notification title="Warning" type="warning">
                Please select compliances to update
              </Notification>
            );
            return;
          }
          setIsDialogOpen(true)}}
      >
        Bulk Owner/Approver
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={500}
      >
        <h5 className="mb-4">Set Owner/Approver for Selected Compliances</h5>
        
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Set Owner</label>
            <OutlinedSelect
              label="Set Owner"
              options={userOptions}
              value={selectedOwnerOption}
              onChange={handleOwnerChange}
            />
          </div>

          <div>
            <label className="block mb-2">Set Approver</label>
            <OutlinedSelect
              label="Set Approver"
              options={userOptions}
              value={selectedApproverOption}
              onChange={handleApproverChange}
            />
          </div>

          {/* <div>
            <label className="block mb-2">Remark</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div> */}
        </div>

        <div className="mt-6 text-right space-x-2">
          <Button
            size="sm"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={handleConfirm}
            loading={isUpdating}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Confirm'}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

interface AssignChecklistTableToolProps {
  selectedIds: number[];
  refreshTable: () => void;
}

const AssignChecklistTableTool: React.FC<AssignChecklistTableToolProps> = ({ 
  selectedIds, 
  refreshTable 
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div>
        <AssignChecklistTableSearch />
      </div>
      <div className="flex items-center gap-3">
        <BulkAlertButton />
        <BulkSetOwnerApproverButton 
          selectedIds={selectedIds}
          refreshTable={refreshTable}
        />
      </div>
    </div>
  );
};

export default AssignChecklistTableTool;