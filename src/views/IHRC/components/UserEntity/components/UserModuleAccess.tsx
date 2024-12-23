
// import React, { useState, useMemo } from 'react';
// import { ColumnDef } from '@/components/shared/DataTable';
// import DataTable from '@/components/shared/DataTable';
// import { Button, Tooltip, Dialog, Select, Badge } from '@/components/ui';
// import { HiOutlinePlusCircle, HiPlusCircle } from 'react-icons/hi';

// // Define interfaces for better type checking
// interface User {
//   id: string;
//   name: string;
//   accessedModules: string[];
// }

// interface Module {
//   value: string;
//   label: string;
//   color?: string;
// }

// const UserModuleAccess = () => {
//   // Predefined list of modules using the Select component's format
//  const moduleOptions: Module[] = [
//     { value: '1', label: 'View', color: '#00B8D9' },
//     { value: '2', label: 'Add', color: '#0052CC' },
//     { value: '3', label: 'Edit', color: '#5243AA' },
//     { value: '4', label: 'Delete', color: '#FF5630' },
//   ];

//   // Initial user data
//   const [users, setUsers] = useState<User[]>([
//     { id: '1', name: 'Rahul Das', accessedModules: ['1', '3'] },
//     { id: '2', name: 'Samrat Banerjee', accessedModules: ['2', '4'] },
//     { id: '3', name: 'Ajit Kapoor', accessedModules: ['1', '2', '3'] }
//   ]);

//   // State for managing dialogs and current user selection
//   const [isAddAccessDialogOpen, setIsAddAccessDialogOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [selectedModules, setSelectedModules] = useState<Module[]>([]);

//   // Function to open add/edit access dialog
//   const handleOpenAccessDialog = (user: User) => {
//     // Convert user's accessed module IDs to Select component's module objects
//     const currentUserModules = user.accessedModules.map(
//       moduleId => moduleOptions.find(m => m.value === moduleId)
//     ).filter(Boolean) as Module[];

//     setCurrentUser(user);
//     setSelectedModules(currentUserModules);
//     setIsAddAccessDialogOpen(true);
//   };

//   // Function to update user's module access
//   const handleUpdateModuleAccess = () => {
//     if (!currentUser) return;

//     const updatedUsers = users.map(user => 
//       user.id === currentUser.id 
//         ? { ...user, accessedModules: selectedModules.map(m => m.value) }
//         : user
//     );

//     setUsers(updatedUsers);
//     setIsAddAccessDialogOpen(false);
//     setCurrentUser(null);
//   };

//   const columns: ColumnDef<User>[] = useMemo(
//     () => [
//       {
//         header: 'User Name',
//         accessorKey: 'name',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue()}</div>
//         ),
//       },
//       {
//         header: 'Permissions',
//         accessorKey: 'accessedModules',
//         cell: (props) => {
//           const moduleIds = props.getValue() as string[];
//           const modules = moduleIds
//             .map(id => moduleOptions.find(m => m.value === id))
//             .filter(Boolean);

//           return (
//             <div className="flex flex-wrap gap-2">
//               {modules.map((module, index) => (
//                 <Badge
//                   key={index}
//                   className={`text-xs text-white bg-sky-600`}
//                   content={module?.label}
//                 />
//               ))}
//             </div>
//           );
//         },
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => {
//           const user = row.original;
//           return (
//             <div className="w-48 flex items-center gap-2">
//               <Tooltip title="Modify Module Access">
//                 <Button
//                   size="sm"
//                   icon={<HiOutlinePlusCircle />}
//                   onClick={() => handleOpenAccessDialog(user)}
//                 >
//                 </Button>
//               </Tooltip>
//             </div>
//           );
//         },
//       },
//     ],
//     [moduleOptions]
//   );

//   return (
//     <div className="p-8">
//       <div className="mb-12">
//         <h3 className="text-2xl font-bold">User Access Management</h3>
//       </div>

//       <DataTable
//         columns={columns}
//         data={users}
//         pagingData={{
//           total: users.length,
//           pageIndex: 1,
//           pageSize: 10,
//         }}
//       />

//       {/* Modify Module Access Dialog */}
//       <Dialog
//         isOpen={isAddAccessDialogOpen}
//         onClose={() => setIsAddAccessDialogOpen(false)}
//         // title="Modify Module Access"
//       >
//         {currentUser && (
//           <div className="space-y-4">
//             <div className="font-semibold">User: {currentUser.name}</div>
//             <Select
//               isMulti
//               placeholder="Select Modules"
//               value={selectedModules}
//               options={moduleOptions}
//             //   onChange={(selectedOptions: Module[]) => setSelectedModules(selectedOptions)}
//             />
//             <div className="flex justify-end space-x-2 mt-4">
//               <Button 
//               size='sm'
//                 variant="solid" 
//                 onClick={() => setIsAddAccessDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button 
//               size='sm'
//                 variant="solid" 
//                 onClick={handleUpdateModuleAccess}
//               >
//                 Update Access
//               </Button>
//             </div>
//           </div>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default UserModuleAccess;


import React, { useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchUsers } from '@/store/slices/userEntity/UserEntitySlice';
import UserAccessTable from './UserAccessTable';
// import UserTable from './components/UserTable';

const User = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [key, setKey] = useState(0);

  const refreshData = () => {
    setKey(prev => prev + 1);
  };

  const fetchUserData = async (page = 1, pageSize = 10) => {
    setIsLoading(true);
    try {
      // Replace this with your actual user fetch action
      const data = await dispatch(fetchUsers());
      setUserData(data.payload.data);
      console.log('User Data:', data.payload.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      showErrorNotification('Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Initial User Management Rendering");
    fetchUserData();
  }, [key]);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">User Management</h3>
        </div>
      </div>

      <UserAccessTable 
        userData={userData}
        isLoading={isLoading}
        onDataChange={fetchUserData}
      />
    </AdaptableCard>
  );
};

export default User;