
// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
// import Table from '@/components/ui/Table/Table';
// import Tr from '@/components/ui/Table/Tr';
// import Th from '@/components/ui/Table/Th';
// import Td from '@/components/ui/Table/Td';
// import THead from '@/components/ui/Table/THead';
// import TBody from '@/components/ui/Table/TBody';
// import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getExpandedRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import { updateRolePermissions } from '@/store/slices/role/roleSlice';
// import { useDispatch } from 'react-redux';
// import Checkbox from '@/components/ui/Checkbox/Checkbox';
// import Button from '@/components/ui/Button/Button';

// const RolePermission = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const role = location.state?.role;
//   const roleData = location.state?.roleData;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const transformModuleData = (moduleAccess) => {
//     return moduleAccess?.map(module => ({
//       id: module.id,
//       module_id: module.id,
//       menu: module.name,
//       view: module.access.can_list,
//       create: module.access.can_create,
//       edit: module.access.can_edit,
//       delete: module.access.can_delete,
//       subRows: module.menus?.map(menu => ({
//         id: menu.id,
//         module_id: module.id,
//         menu_id: menu.id,
//         menu: menu.name,
//         view: menu.access.can_list,
//         create: menu.access.can_create,
//         edit: menu.access.can_edit,
//         delete: menu.access.can_delete,
//         subRows: menu.children?.map(child => ({
//           id: child.id,
//           module_id: module.id,
//           menu_id: child.id,
//           menu: child.name,
//           view: child.access.can_list,
//           create: child.access.can_create,
//           edit: child.access.can_edit,
//           delete: child.access.can_delete
//         }))
//       }))
//     })) || [];
//   };

//   const [permissions, setPermissions] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     if (roleData?.moduleAccess) {
//       const transformedData = transformModuleData(roleData.moduleAccess);
//       setPermissions(transformedData);
//     }
//   }, [roleData]);

//   const handleCheckboxChange = (rowId, permission, value) => {
//     setPermissions(current => {
//       const updatePermission = (items) => {
//         return items.map(item => {
//           if (item.id === rowId) {
//             let updatedItem = { ...item };
            
//             if (permission === 'view' && !value) {
//               updatedItem = {
//                 ...updatedItem,
//                 view: false,
//                 create: false,
//                 edit: false,
//                 delete: false
//               };
//             } else {
//               updatedItem[permission] = value;
//             }

//             if (item.subRows) {
//               updatedItem.subRows = item.subRows.map(subItem => {
//                 const updatedSubItem = permission === 'view' && !value
//                   ? {
//                       ...subItem,
//                       view: false,
//                       create: false,
//                       edit: false,
//                       delete: false
//                     }
//                   : { ...subItem, [permission]: value };

//                 return {
//                   ...updatedSubItem,
//                   subRows: subItem.subRows?.map(childItem =>
//                     permission === 'view' && !value
//                       ? {
//                           ...childItem,
//                           view: false,
//                           create: false,
//                           edit: false,
//                           delete: false
//                         }
//                       : { ...childItem, [permission]: value }
//                   )
//                 };
//               });
//             }
//             return updatedItem;
//           }
//           if (item.subRows) {
//             return { ...item, subRows: updatePermission(item.subRows) };
//           }
//           return item;
//         });
//       };
//       return updatePermission(current);
//     });
//   };

//   const handleUpdateAll = () => {
//     const flattenPermissions = (data) => {
//       let result = [];
      
//       const processRow = (row) => {
//         if (row.menu_id) { 
//           result.push({
//             module_id: row.module_id,
//             menu_id: row.menu_id,
//             can_list: row.view,
//             can_create: row.create,
//             can_edit: row.edit,
//             can_delete: row.delete
//           });
//         }
        
//         if (row.subRows) {
//           row.subRows.forEach(processRow);
//         }
//       };

//       data.forEach(processRow);
//       return result;
//     };

//     const formattedData = {
//       id: roleData.id,
//       permissions: flattenPermissions(permissions)
//     };
    
//     const res = dispatch(updateRolePermissions(formattedData));
//     if(res) {
//       navigate(-1);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         id: 'expander',
//         header: 'Menu',
//         cell: ({ row }) => (
//           <div className="flex items-center">
//             {row.getCanExpand() ? (
//               <button
//                 className="text-xl mr-2"
//                 onClick={row.getToggleExpandedHandler()}
//               >
//                 {row.getIsExpanded() ? (
//                   <HiOutlineMinusCircle className="h-5 w-5" />
//                 ) : (
//                   <HiOutlinePlusCircle className="h-5 w-5" />
//                 )}
//               </button>
//             ) : (
//               <span className="w-7" />
//             )}
//             <span className={row.depth > 0 ? 'ml-4' : ''}>
//               {row.original.menu}
//             </span>
//           </div>
//         ),
//       },
//       {
//         header: 'View',
//         accessorKey: 'view',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.view || false}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'view', checked)
//             }
//           />
//         ),
//       },
//       {
//         header: 'Create',
//         accessorKey: 'create',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.create || false}
//             disabled={!row.original.view}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'create', checked)
//             }
//           />
//         ),
//       },
//       {
//         header: 'Edit',
//         accessorKey: 'edit',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.edit || false}
//             disabled={!row.original.view}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'edit', checked)
//             }
//           />
//         ),
//       },
//       {
//         header: 'Delete',
//         accessorKey: 'delete',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.delete || false}
//             disabled={!row.original.view}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'delete', checked)
//             }
//           />
//         ),
//       },
//     ],
//     []
//   );

//   const tableModel = useReactTable({
//     data: permissions,
//     columns,
//     state: {
//       expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   });

//   const filteredRows = tableModel.getRowModel().rows.filter(row => 
//     !(row.original.module_id === 2 && row.depth > 0)
//   );

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">
//           {role ? `Permissions - ${role}` : 'Permissions'}
//         </h2>
//         <Button variant="solid" size="sm" onClick={handleUpdateAll}>
//           Update Permissions
//         </Button>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <THead>
//             {tableModel.getHeaderGroups().map((headerGroup) => (
//               <Tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <Th key={header.id} colSpan={header.colSpan}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </Th>
//                 ))}
//               </Tr>
//             ))}
//           </THead>
//           <TBody>
//             {filteredRows.map((row) => (
//               <Tr key={row.id} className={row.depth > 0 ? 'bg-gray-50' : ''}>
//                 {row.getVisibleCells().map((cell) => (
//                   <Td key={cell.id}>
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </Td>
//                 ))}
//               </Tr>
//             ))}
//           </TBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default RolePermission;

// //DO NOT DELETE THE CODE ABOVE !!!
// import React, { useState, useMemo, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Table from '@/components/ui/Table/Table';
// import Tr from '@/components/ui/Table/Tr';
// import Th from '@/components/ui/Table/Th';
// import Td from '@/components/ui/Table/Td';
// import THead from '@/components/ui/Table/THead';
// import TBody from '@/components/ui/Table/TBody';
// import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getExpandedRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import { updateRolePermissions } from '@/store/slices/role/roleSlice';
// import { useDispatch } from 'react-redux';
// import Checkbox from '@/components/ui/Checkbox/Checkbox';
// import Button from '@/components/ui/Button/Button';
// import { IoArrowBack } from 'react-icons/io5';
// import store from '@/store';

// const RolePermission = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const role = location.state?.roleData?.name;
//   const roleData = location.state?.roleData;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {login} = store.getState();
//   const ActualModuleAccess = login.user.user.moduleAccess;
//   const moduleNames = ActualModuleAccess
//   ?.map(module => module.name)
//   .filter(name => name !== 'Company Setup');

//   const transformModuleData = (moduleAccess) => {
//     return moduleAccess?.map(module => {
//       // Skip the Company Setup module
//       if (module.name === 'Company Setup') {
//         return null;
//       }

//       return {
//         id: module.id,
//         module_id: module.id,
//         menu: module.name,
//         view: module.access.can_list,
//         create: module.access.can_create,
//         edit: module.access.can_edit,
//         delete: module.access.can_delete,
//         subRows: module.menus?.map(menu => ({
//           id: menu.id,
//           module_id: module.id,
//           menu_id: menu.id,
//           menu: menu.name,
//           view: menu.access.can_list,
//           create: menu.access.can_create,
//           edit: menu.access.can_edit,
//           delete: menu.access.can_delete,
//           subRows: menu.children?.map(child => ({
//             id: child.id,
//             module_id: module.id,
//             menu_id: child.id,
//             menu: child.name,
//             view: child.access.can_list,
//             create: child.access.can_create,
//             edit: child.access.can_edit,
//             delete: child.access.can_delete
//           }))
//         }))
//       };
//     }).filter(Boolean) || [];
//   };

//   const [permissions, setPermissions] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(()=> {
//     console.log(moduleNames)
//   },[])
//   useEffect(() => {
//     if (roleData?.moduleAccess) {
//       const transformedData = transformModuleData(roleData.moduleAccess);
//       setPermissions(transformedData);
//     }
//   }, [roleData]);

//   const handleCheckboxChange = (rowId, permission, value) => {
//     setPermissions(current => {
//       const updatePermission = (items) => {
//         return items.map(item => {
//           if (item.id === rowId) {
//             let updatedItem = { ...item };
            
//             if (permission === 'view' && !value) {
//               updatedItem = {
//                 ...updatedItem,
//                 view: false,
//                 create: false,
//                 edit: false,
//                 delete: false
//               };
//             } else {
//               updatedItem[permission] = value;
//             }

//             if (item.subRows) {
//               updatedItem.subRows = item.subRows.map(subItem => {
//                 const updatedSubItem = permission === 'view' && !value
//                   ? {
//                       ...subItem,
//                       view: false,
//                       create: false,
//                       edit: false,
//                       delete: false
//                     }
//                   : { ...subItem, [permission]: value };

//                 return {
//                   ...updatedSubItem,
//                   subRows: subItem.subRows?.map(childItem =>
//                     permission === 'view' && !value
//                       ? {
//                           ...childItem,
//                           view: false,
//                           create: false,
//                           edit: false,
//                           delete: false
//                         }
//                       : { ...childItem, [permission]: value }
//                   )
//                 };
//               });
//             }
//             return updatedItem;
//           }
//           if (item.subRows) {
//             return { ...item, subRows: updatePermission(item.subRows) };
//           }
//           return item;
//         });
//       };
//       return updatePermission(current);
//     });
//   };

//   const handleUpdateAll = () => {
//     const flattenPermissions = (data) => {
//       let result = [];
      
//       const processRow = (row) => {
//         if (row.menu_id) { 
//           result.push({
//             module_id: row.module_id,
//             menu_id: row.menu_id,
//             can_list: row.view,
//             can_create: row.create,
//             can_edit: row.edit,
//             can_delete: row.delete
//           });
//         }
        
//         if (row.subRows) {
//           row.subRows.forEach(processRow);
//         }
//       };

//       data.forEach(processRow);
//       return result;
//     };

//     const formattedData = {
//       id: roleData.id,
//       permissions: flattenPermissions(permissions)
//     };
    
//     const res = dispatch(updateRolePermissions(formattedData));
//     if(res) {
//       navigate(-1);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         id: 'expander',
//         header: 'Menu',
//         cell: ({ row }) => (
//           <div className="flex items-center">
//             {row.getCanExpand() ? (
//               <button
//                 className="text-xl mr-2"
//                 onClick={row.getToggleExpandedHandler()}
//               >
//                 {row.getIsExpanded() ? (
//                   <HiOutlineMinusCircle className="h-5 w-5" />
//                 ) : (
//                   <HiOutlinePlusCircle className="h-5 w-5" />
//                 )}
//               </button>
//             ) : (
//               <span className="w-7" />
//             )}
//             <span className={row.depth > 0 ? 'ml-4' : ''}>
//               {row.original.menu}
//             </span>
//           </div>
//         ),
//       },
//       {
//         header: 'View',
//         accessorKey: 'view',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.view || false}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'view', checked)
//             }
//           />
//         ),
//       },
//       {
//         header: 'Create',
//         accessorKey: 'create',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.create || false}
//             disabled={!row.original.view}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'create', checked)
//             }
//           />
//         ),
//       },
//       {
//         header: 'Edit',
//         accessorKey: 'edit',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.edit || false}
//             disabled={!row.original.view}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'edit', checked)
//             }
//           />
//         ),
//       },
//       {
//         header: 'Delete',
//         accessorKey: 'delete',
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.original.delete || false}
//             disabled={!row.original.view}
//             onChange={(checked) => 
//               handleCheckboxChange(row.original.id, 'delete', checked)
//             }
//           />
//         ),
//       },
//     ],
//     []
//   );

//   const tableModel = useReactTable({
//     data: permissions,
//     columns,
//     state: {
//       expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   });

//   const filteredRows = tableModel.getRowModel().rows;

//   return (
//     <div className="">
//       <div className="flex justify-between items-center mb-4">
//         <div className='flex items-center gap-2 mb-3'>
//         <Button
//           size="sm"
//           variant="plain"
//           icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
//           onClick={() => navigate(-1)}
//         />
//         <h2 className="text-2xl font-bold">
//           {role ? `Permissions - ${role}` : 'Permissions'}
//         </h2>
//         </div>
//         <Button variant="solid" size="sm" onClick={handleUpdateAll}>
//           Update Permissions
//         </Button>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <THead>
//             {tableModel.getHeaderGroups().map((headerGroup) => (
//               <Tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <Th key={header.id} colSpan={header.colSpan}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </Th>
//                 ))}
//               </Tr>
//             ))}
//           </THead>
//           <TBody>
//             {filteredRows.map((row) => (
//               <Tr key={row.id} className={row.depth > 0 ? 'bg-gray-50' : ''}>
//                 {row.getVisibleCells().map((cell) => (
//                   <Td key={cell.id}>
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </Td>
//                 ))}
//               </Tr>
//             ))}
//           </TBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default RolePermission;

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Table from '@/components/ui/Table/Table';
import Tr from '@/components/ui/Table/Tr';
import Th from '@/components/ui/Table/Th';
import Td from '@/components/ui/Table/Td';
import THead from '@/components/ui/Table/THead';
import TBody from '@/components/ui/Table/TBody';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { updateRolePermissions } from '@/store/slices/role/roleSlice';
import { useDispatch } from 'react-redux';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';
import { IoArrowBack } from 'react-icons/io5';
import store from '@/store';

const RolePermission = () => {
  const { id } = useParams();
  const location = useLocation();
  const role = location.state?.roleData?.name;
  const roleData = location.state?.roleData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {login} = store.getState();
  const ActualModuleAccess = login.user.user.moduleAccess;
  const moduleNames = ActualModuleAccess
    ?.map(module => module.name)
    .filter(name => name !== 'Company Setup');

    useEffect(()=> {
      console.log(moduleNames)
    },[])

  const transformModuleData = (moduleAccess) => {
    return moduleAccess?.map(module => {
      // Skip the Company Setup module and modules not in moduleNames
      if (module.name === 'Company Setup' || !moduleNames.includes(module.name)) {
        return null;
      }

      return {
        id: module.id,
        module_id: module.id,
        menu: module.name,
        view: module.access.can_list,
        create: module.access.can_create,
        edit: module.access.can_edit,
        delete: module.access.can_delete,
        subRows: module.menus?.map(menu => ({
          id: menu.id,
          module_id: module.id,
          menu_id: menu.id,
          menu: menu.name,
          view: menu.access.can_list,
          create: menu.access.can_create,
          edit: menu.access.can_edit,
          delete: menu.access.can_delete,
          subRows: menu.children?.map(child => ({
            id: child.id,
            module_id: module.id,
            menu_id: child.id,
            menu: child.name,
            view: child.access.can_list,
            create: child.access.can_create,
            edit: child.access.can_edit,
            delete: child.access.can_delete
          }))
        }))
      };
    }).filter(Boolean) || [];
  };

  const [permissions, setPermissions] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (roleData?.moduleAccess) {
      const transformedData = transformModuleData(roleData.moduleAccess);
      setPermissions(transformedData);
    }
  }, [roleData]);

  const handleCheckboxChange = (rowId, permission, value) => {
    setPermissions(current => {
      const updatePermission = (items) => {
        return items.map(item => {
          if (item.id === rowId) {
            let updatedItem = { ...item };
            
            if (permission === 'view' && !value) {
              updatedItem = {
                ...updatedItem,
                view: false,
                create: false,
                edit: false,
                delete: false
              };
            } else {
              updatedItem[permission] = value;
            }

            if (item.subRows) {
              updatedItem.subRows = item.subRows.map(subItem => {
                const updatedSubItem = permission === 'view' && !value
                  ? {
                      ...subItem,
                      view: false,
                      create: false,
                      edit: false,
                      delete: false
                    }
                  : { ...subItem, [permission]: value };

                return {
                  ...updatedSubItem,
                  subRows: subItem.subRows?.map(childItem =>
                    permission === 'view' && !value
                      ? {
                          ...childItem,
                          view: false,
                          create: false,
                          edit: false,
                          delete: false
                        }
                      : { ...childItem, [permission]: value }
                  )
                };
              });
            }
            return updatedItem;
          }
          if (item.subRows) {
            return { ...item, subRows: updatePermission(item.subRows) };
          }
          return item;
        });
      };
      return updatePermission(current);
    });
  };

  const handleUpdateAll = () => {
    const flattenPermissions = (data) => {
      let result = [];
      
      const processRow = (row) => {
        if (row.menu_id) { 
          result.push({
            module_id: row.module_id,
            menu_id: row.menu_id,
            can_list: row.view,
            can_create: row.create,
            can_edit: row.edit,
            can_delete: row.delete
          });
        }
        
        if (row.subRows) {
          row.subRows.forEach(processRow);
        }
      };

      data.forEach(processRow);
      return result;
    };

    const formattedData = {
      id: roleData.id,
      permissions: flattenPermissions(permissions)
    };
    
    const res = dispatch(updateRolePermissions(formattedData));
    if(res) {
      navigate(-1);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: 'expander',
        header: 'Menu',
        cell: ({ row }) => (
          <div className="flex items-center">
            {row.getCanExpand() ? (
              <button
                className="text-xl mr-2"
                onClick={row.getToggleExpandedHandler()}
              >
                {row.getIsExpanded() ? (
                  <HiOutlineMinusCircle className="h-5 w-5" />
                ) : (
                  <HiOutlinePlusCircle className="h-5 w-5" />
                )}
              </button>
            ) : (
              <span className="w-7" />
            )}
            <span className={row.depth > 0 ? 'ml-4' : ''}>
              {row.original.menu}
            </span>
          </div>
        ),
      },
      {
        header: 'View',
        accessorKey: 'view',
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.view || false}
            onChange={(checked) => 
              handleCheckboxChange(row.original.id, 'view', checked)
            }
          />
        ),
      },
      {
        header: 'Create',
        accessorKey: 'create',
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.create || false}
            disabled={!row.original.view}
            onChange={(checked) => 
              handleCheckboxChange(row.original.id, 'create', checked)
            }
          />
        ),
      },
      {
        header: 'Edit',
        accessorKey: 'edit',
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.edit || false}
            disabled={!row.original.view}
            onChange={(checked) => 
              handleCheckboxChange(row.original.id, 'edit', checked)
            }
          />
        ),
      },
      {
        header: 'Delete',
        accessorKey: 'delete',
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.delete || false}
            disabled={!row.original.view}
            onChange={(checked) => 
              handleCheckboxChange(row.original.id, 'delete', checked)
            }
          />
        ),
      },
    ],
    []
  );

  const tableModel = useReactTable({
    data: permissions,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const filteredRows = tableModel.getRowModel().rows;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <div className='flex items-center gap-2 mb-3'>
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl font-bold">
          {role ? `Permissions - ${role}` : 'Permissions'}
        </h2>
        </div>
        <Button variant="solid" size="sm" onClick={handleUpdateAll}>
          Update Permissions
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <THead>
            {tableModel.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </THead>
          <TBody>
            {filteredRows.map((row) => (
              <Tr key={row.id} className={row.depth > 0 ? 'bg-gray-50' : ''}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default RolePermission;