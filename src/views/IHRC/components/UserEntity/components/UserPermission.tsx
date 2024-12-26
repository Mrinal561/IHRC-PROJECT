

// import React, { useState, useMemo, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// // import  Table  from '@/components/ui/table/table';
// import Table from '@/components/ui/Table/Table';
// import Tr from '@/components/ui/Table/Tr';
// import Th from '@/components/ui/Table/Th';
// import Td from '@/components/ui/Table/Td';
// import THead from '@/components/ui/Table/THead';
// import TBody from '@/components/ui/Table/TBody';
// import  Checkbox  from '@/components/ui/checkbox/Checkbox';
// // import { Button } from '@/components/ui/button';
// import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getExpandedRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import { useDispatch } from 'react-redux';
// import { updateUserPermissions } from '@/store/slices/userEntity/UserEntitySlice';
// import Button from '@/components/ui/Button/Button';

// // const {  Th, Td, THead, TBody } = Table;

// const UserPermission = () => {
//   const location = useLocation();
//   const userData = location.state?.userData;
//   const dispatch = useDispatch();

//   const transformModuleData = (moduleAccess) => {
//     return moduleAccess?.map(module => ({
//       id: module.id,
//       module_id: module.id,
//       menu: module.name,
//       view: module.access.can_list,
//       create: module.access.can_create,
//       edit: module.access.can_edit,
//       delete: module.access.can_delete,
//       subRows: module.menus?.map(menu => {
//         const menuItem = {
//           id: menu.id,
//           module_id: module.id,
//           menu_id: menu.id,
//           menu: menu.name,
//           view: menu.access.can_list,
//           create: menu.access.can_create,
//           edit: menu.access.can_edit,
//           delete: menu.access.can_delete,
//         };

//         if (menu.children && menu.children.length > 0) {
//           menuItem.subRows = menu.children.map(child => ({
//             id: child.id,
//             module_id: module.id,
//             menu_id: child.id,
//             menu: child.name,
//             view: child.access.can_list,
//             create: child.access.can_create,
//             edit: child.access.can_edit,
//             delete: child.access.can_delete
//           }));
//         }

//         return menuItem;
//       })
//     })) || [];
//   };

//   const [permissions, setPermissions] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData?.moduleAccess) {
//       const transformedData = transformModuleData(userData.moduleAccess);
//       setPermissions(transformedData);
//     }
//   }, [userData]);

//   const handleCheckboxChange = (rowId, permission, value) => {
//     setPermissions(current => {
//       const updatePermission = (items) => {
//         return items.map(item => {
//           if (item.id === rowId) {
//             let updatedItem = { ...item };
            
//             // If turning off view, also turn off other permissions
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

//             // Update children if any
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

//                 // Handle nested children if they exist
//                 if (subItem.subRows) {
//                   return {
//                     ...updatedSubItem,
//                     subRows: subItem.subRows.map(childItem =>
//                       permission === 'view' && !value
//                         ? {
//                             ...childItem,
//                             view: false,
//                             create: false,
//                             edit: false,
//                             delete: false
//                           }
//                         : { ...childItem, [permission]: value }
//                     )
//                   };
//                 }

//                 return updatedSubItem;
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
//       id: userData.id,
//       permissions: flattenPermissions(permissions)
//     };
//    const res = dispatch(updateUserPermissions(formattedData));
//    if(res){
//     navigate(-1);
//    }
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
//             <span className={`${row.depth > 0 ? 'ml-4' : ''} ${row.depth > 1 ? 'ml-8' : ''}`}>
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

//   const table = useReactTable({
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

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">
//           User Permissions - {userData?.name || 'User'}
//         </h2>
//         <Button variant="solid" size="sm" onClick={handleUpdateAll}>
//           Update Permissions
//         </Button>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <THead>
//             {table.getHeaderGroups().map((headerGroup) => (
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
//             {table.getRowModel().rows.map((row) => (
//               <Tr 
//                 key={row.id} 
//                 className={row.depth > 0 ? `bg-gray-50 ${row.depth > 1 ? 'bg-gray-100' : ''}` : ''}
//               >
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

// export default UserPermission;

import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '@/components/ui/Table/Table';
import Tr from '@/components/ui/Table/Tr';
import Th from '@/components/ui/Table/Th';
import Td from '@/components/ui/Table/Td';
import THead from '@/components/ui/Table/THead';
import TBody from '@/components/ui/Table/TBody';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useDispatch } from 'react-redux';
import { updateUserPermissions } from '@/store/slices/userEntity/UserEntitySlice';
import Button from '@/components/ui/Button/Button';

const UserPermission = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const dispatch = useDispatch();

  const transformModuleData = (moduleAccess) => {
    return moduleAccess?.map(module => ({
      id: module.id,
      module_id: module.id,
      menu: module.name,
      view: module.access.can_list,
      create: module.access.can_create,
      edit: module.access.can_edit,
      delete: module.access.can_delete,
      subRows: module.menus?.map(menu => {
        const menuItem = {
          id: menu.id,
          module_id: module.id,
          menu_id: menu.id,
          menu: menu.name,
          view: menu.access.can_list,
          create: menu.access.can_create,
          edit: menu.access.can_edit,
          delete: menu.access.can_delete,
        };

        if (menu.children && menu.children.length > 0) {
          menuItem.subRows = menu.children.map(child => ({
            id: child.id,
            module_id: module.id,
            menu_id: child.id,
            menu: child.name,
            view: child.access.can_list,
            create: child.access.can_create,
            edit: child.access.can_edit,
            delete: child.access.can_delete
          }));
        }

        return menuItem;
      })
    })) || [];
  };

  const [permissions, setPermissions] = useState([]);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.moduleAccess) {
      const transformedData = transformModuleData(userData.moduleAccess);
      setPermissions(transformedData);
    }
  }, [userData]);

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

                if (subItem.subRows) {
                  return {
                    ...updatedSubItem,
                    subRows: subItem.subRows.map(childItem =>
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
                }

                return updatedSubItem;
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
      id: userData.id,
      permissions: flattenPermissions(permissions)
    };
    const res = dispatch(updateUserPermissions(formattedData));
    if(res){
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
            <span className={`${row.depth > 0 ? 'ml-4' : ''} ${row.depth > 1 ? 'ml-8' : ''}`}>
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

  const filteredRows = tableModel.getRowModel().rows.filter(row => 
    !(row.original.module_id === 2 && row.depth > 0)
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          User Permissions - {userData?.name || 'User'}
        </h2>
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
              <Tr 
                key={row.id} 
                className={row.depth > 0 ? `bg-gray-50 ${row.depth > 1 ? 'bg-gray-100' : ''}` : ''}
              >
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

export default UserPermission;