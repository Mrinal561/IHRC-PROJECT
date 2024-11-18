// import React, { useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui'; // Import Notification and toast
// import { FiSettings, FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import { APP_PREFIX_PATH } from '@/constants/route.constant';
// import { RiEyeLine } from 'react-icons/ri';
// import { GrConfigure } from "react-icons/gr";
// import cloneDeep from 'lodash/cloneDeep';

// import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
// import OutlinedSelect from '@/components/ui/Outlined';
// import ConfigDropdown from './ConfigDropdown';

// const CompanyNameTable: React.FC = () => {
//     const [dialogIsOpen, setDialogIsOpen] = useState(false);
//     const [itemToDelete, setItemToDelete] = useState<number | null>(null);
//     const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//     const [itemToEdit, setItemToEdit] = useState<number | null>(null);
//     const [editedName, setEditedName] = useState('');
//     const navigate = useNavigate();
//     const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);


//     const companyGroups = useMemo(() => {
//         const uniqueGroups = new Set(entityDataSet.map(item => item.Company_Group_Name));
//         return Array.from(uniqueGroups).map(group => ({ label: group, value: group }));
//     }, []);


//     const [tableData, setTableData] = useState({
//         total: entityDataSet.length,
//         pageIndex: 1,
//         pageSize: 5,
//         query: '',
//         sort: { order: '', key: '' },
//     });

//     const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
//         const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//         navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, { state: { companyName, companyGroupName } });
//     };

//     const handleViewDetails = (companyName: string, companyGroupName: string) => {
//         const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//         navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
//             state: { companyName, companyGroupName }
//         });
//     };
//     const ConfigMenu: React.FC<{ companyName: string; companyGroupName: string }> = ({ companyName, companyGroupName }) => (
//         <Dropdown placement="bottom-end" renderTitle={<Button size="sm" icon={<FiSettings />} />}>
//             <Dropdown.Menu className='absolute h-96 right-0 mt-2 z-[9999]'>
//                 <Dropdown.Item eventKey="pf" onClick={() => handleSetupClick('PF', companyName, companyGroupName)}>
//                     PF Config
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="pt" onClick={() => handleSetupClick('PT', companyName, companyGroupName)}>
//                     PT Config
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="esi" onClick={() => handleSetupClick('ESI', companyName, companyGroupName)}>
//                     ESI Config
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="lwf" onClick={() => handleSetupClick('LWF', companyName, companyGroupName)}>
//                     LWF Config
//                 </Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     );


//     const columns: ColumnDef<EntityData>[] = useMemo(
//         () => [
//             {
//                 header: 'Company Group',
//                 accessorKey: 'Company_Group_Name',
//                 cell: (props) => (
//                     <div className="w-96 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'Company',
//                 accessorKey: 'Company_Name',
//                 cell: (props) => (
//                     <div className="w-96 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'Actions',
//                 id: 'actions',
//                 cell: ({ row }) => (
//                     <div className="flex items-center gap-2">
                       
//                         <Tooltip title="View Company Details">
//                             <Button
//                                 size="sm"
//                                 onClick={() => handleViewDetails(
//                                     row.original.Company_Name || '',
//                                     row.original.Company_Group_Name || ''
//                                 )}
//                                 icon={<RiEyeLine />}
//                                 className="text-blue-500"
//                             />
//                         </Tooltip>
//                         <Tooltip title="Edit Company">
//                             <Button
//                                 size="sm"
//                                 onClick={() => openEditDialog(row.index)}
//                                 icon={<MdEdit />}
//                                 className="text-blue-500"
//                             />
//                         </Tooltip>
//                         <Tooltip title="Delete Company">
//                             <Button
//                                 size="sm"
//                                 onClick={() => openDeleteDialog(row.index)}
//                                 icon={<FiTrash />}
//                                 className="text-red-500"
//                             />
//                         </Tooltip>
//                         <ConfigDropdown
//                         companyName={row.original.Company_Name || ''}
//                         companyGroupName={row.original.Company_Group_Name || ''}
//                       />
//                     </div>
//                 ),
//             },
//         ],
//         []
//     );

//     const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
//         toast.push(
//             <Notification
//                 title={type.charAt(0).toUpperCase() + type.slice(1)}
//                 type={type}
//             >
//                 {message}
//             </Notification>
//         )
//     }

//     const openDeleteDialog = (index: number) => {
//         setItemToDelete(index);
//         setDialogIsOpen(true);
//     };
    
//     const openEditDialog = (index: number) => {
//         const item = entityDataSet[index];
//         setItemToEdit(index);
//         setEditedName(entityDataSet[index].Company_Name || '');
//         setEditDialogIsOpen(true);
//         setSelectedCompanyGroup({ label: item.Company_Group_Name || '', value: item.Company_Group_Name || '' });
//     };

//     const handleDialogClose = () => {
//         setDialogIsOpen(false);
//         setEditDialogIsOpen(false);
//         setItemToDelete(null);
//         setItemToEdit(null);
//         setEditedName('');
//     };
    
//     const handleDeleteConfirm = () => {
//         if (itemToDelete !== null) {
//             // Implement delete functionality here
//             openNotification('danger', 'Company name deleted successfully');
//             handleDialogClose();
//         }
//     };

//     const handleEditConfirm = () => {
//         if (itemToEdit !== null && editedName.trim()) {
//             // Implement edit functionality here
//             // Show success notification
//             toast.push(
//                 <Notification
//                     title="Success"
//                     type="success"
//                 >
//                     The company name has been updated successfully.
//                 </Notification>
//             );
//             setEditDialogIsOpen(false);
//             setItemToEdit(null);
//             setEditedName('');
//         } else {
//             // Show error notification if no name provided
//             toast.push(
//                 <Notification
//                     title="Error"
//                     type="danger"
//                 >
//                     Please enter a valid company name.
//                 </Notification>
//             );
//         }
//     };

//     const onPaginationChange = (page: number) => {
//         const newTableData = cloneDeep(tableData);
//         newTableData.pageIndex = page;
//         setTableData(newTableData);
//     };

//     const onSelectChange = (value: number) => {
//         const newTableData = cloneDeep(tableData);
//         newTableData.pageSize = Number(value);
//         newTableData.pageIndex = 1;
//         setTableData(newTableData);
//     };

//     const getSortedData = () => {
//         if (tableData.sort.order && tableData.sort.key) {
//             return [...entityDataSet].sort((a, b) => {
//                 if (a[tableData.sort.key] < b[tableData.sort.key]) return tableData.sort.order === 'asc' ? -1 : 1;
//                 if (a[tableData.sort.key] > b[tableData.sort.key]) return tableData.sort.order === 'asc' ? 1 : -1;
//                 return 0;
//             });
//         }
//         return entityDataSet;
//     };

//     const getPaginatedData = () => {
//         const sortedData = getSortedData();
//         const startIndex = (tableData.pageIndex - 1) * tableData.pageSize;
//         const endIndex = startIndex + tableData.pageSize;
//         return sortedData.slice(startIndex, endIndex);
//     };

//     const onSort = (sort: OnSortParam) => {
//         const newTableData = cloneDeep(tableData);
//         newTableData.sort = sort;
//         setTableData(newTableData);
//     };

//     return (
//         <div className="relative">
         
//             {entityDataSet.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                     No data available
//                 </div>
//             ) : (
//                 <DataTable
//                     columns={columns}
//                     data={getPaginatedData()}
//                     skeletonAvatarColumns={[0]}
//                     skeletonAvatarProps={{ className: 'rounded-md' }}
//                     loading={false}
//                     pagingData={{
//                         total: tableData.total,
//                         pageIndex: tableData.pageIndex,
//                         pageSize: tableData.pageSize,
//                     }}
//                     onPaginationChange={onPaginationChange}
//                     onSelectChange={onSelectChange}
//                     onSort={onSort}
//                     stickyHeader={true}
//                     stickyFirstColumn={true}
//                     stickyLastColumn={true}
//                 />
//             )}

//             <Dialog
//                 isOpen={dialogIsOpen}
//                 onClose={handleDialogClose}
//                 onRequestClose={handleDialogClose}
//             >
//                 <h5 className="mb-4">Confirm Deletion</h5>
//                 <p>
//                     Are you sure you want to delete this company? This action
//                     cannot be undone.
//                 </p>
//                 <div className="text-right mt-6">
//                     <Button
//                         className="ltr:mr-2 rtl:ml-2"
//                         variant="plain"
//                         onClick={handleDialogClose}
//                     >
//                         Cancel
//                     </Button>
//                     <Button variant="solid" onClick={handleDeleteConfirm}>
//                         Delete
//                     </Button>
//                 </div>
//             </Dialog>

//             <Dialog
//                 isOpen={editDialogIsOpen}
//                 onClose={handleDialogClose}
//                 onRequestClose={handleDialogClose}
//             >
//                 <h5 className="mb-4">Edit Company Name</h5>
//                 <div className="flex flex-col gap-5">
//                     <div>
//                         <OutlinedSelect
//                             label="Select Company Group"
//                             options={companyGroups}
//                             value={selectedCompanyGroup}
//                             onChange={(option: SelectOption | null) => {
//                                 setSelectedCompanyGroup(option)
//                             }}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <OutlinedInput
//                             label="Company Name"
//                             value={editedName}
//                             onChange={(value: string) => setEditedName(value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="text-right mt-6">
//                     <Button
//                         className="ltr:mr-2 rtl:ml-2"
//                         variant="plain"
//                         onClick={handleDialogClose}
//                     >
//                         Cancel
//                     </Button>
//                     <Button variant="solid" onClick={handleEditConfirm}>
//                         Confirm
//                     </Button>
//                 </div>
//             </Dialog>
//         </div>
//     )
// };

// export default CompanyNameTable;

// import React, { useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
// import { FiSettings, FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import { RiEyeLine } from 'react-icons/ri';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined';
// import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import { APP_PREFIX_PATH } from '@/constants/route.constant';
// import { useAppDispatch } from '@/store';
// import { deleteCompany, updateCompany } from '@/store/slices/company/companySlice';
// import ConfigDropdown from './ConfigDropdown';

// interface CompanyData {
//   id: number;
//   name: string;
//   company_group_name: string;
//   company_group_id: number;
// }

// interface CompanyNameTableProps {
//   companyData: CompanyData[];
//   isLoading: boolean;
//   onDataChange: () => void;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
//   companyData,
//   isLoading,
//   onDataChange
// }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
//   const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
//   const [editedName, setEditedName] = useState('');
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
//   const [tableData, setTableData] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 5,
//     query: '',
//     sort: { order: '', key: '' },
//   });

//   // Memoize company groups from the data
//   const companyGroups = useMemo(() => {
//     const uniqueGroups = new Set(companyData.map(item => item.company_group_name));
//     return Array.from(uniqueGroups).map(group => ({ label: group, value: group }));
//   }, [companyData]);

//   const columns = useMemo<ColumnDef<CompanyData>[]>(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey:'company_group_name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Company',
//         accessorKey: 'name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="View Company Details">
//               <Button
//                 size="sm"
//                 onClick={() => handleViewDetails(row.original)}
//                 icon={<RiEyeLine />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Edit Company">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete Company">
//               <Button
//                 size="sm"
//                 onClick={() => openDeleteDialog(row.original)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <ConfigDropdown
//               companyName={row.original.name}
//               companyGroupName={row.original.company_group_name}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleViewDetails = (company: CompanyData) => {
//     const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
//       state: { 
//         companyName: company.name, 
//         companyGroupName: company.company_group_name 
//       }
//     });
//   };

//   const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
//     const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
//       state: { companyName, companyGroupName }
//     });
//   };

//   const openDeleteDialog = (company: CompanyData) => {
//     setItemToDelete(company);
//     setDialogIsOpen(true);
//   };

//   const openEditDialog = (company: CompanyData) => {
//     setItemToEdit(company);
//     setEditedName(company.name);
//     setSelectedCompanyGroup({
//       label: company.company_group_name,
//       value: String(company.company_group_id)
//     });
//     setEditDialogIsOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogIsOpen(false);
//     setEditDialogIsOpen(false);
//     setItemToDelete(null);
//     setItemToEdit(null);
//     setEditedName('');
//     setSelectedCompanyGroup(null);
//   };

//   const showNotification = (type: 'success' | 'danger', message: string) => {
//     toast.push(
//       <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
//         {message}
//       </Notification>
//     );
//   };

//   const handleDeleteConfirm = async () => {
//     if (itemToDelete?.id) {
//       try {
//         await dispatch(deleteCompany(itemToDelete.id));
//         showNotification('success', 'Company deleted successfully');
//         onDataChange();
//       } catch (error) {
//         showNotification('danger', 'Failed to delete company');
//       }
//       handleDialogClose();
//     }
//   };

//   const handleEditConfirm = async () => {
//     // console.log("This is ",itemToEdit?.id , selectedCompanyGroup)
//     console.log(selectedCompanyGroup)
//     if (itemToEdit?.id && editedName.trim() && selectedCompanyGroup) {
//       try {
//         await dispatch(updateCompany({
//             id: itemToEdit.id,
//           data: {
//             name: editedName.trim(),
//             group_id: parseInt(selectedCompanyGroup.value)
//           }
//         }));
//         showNotification('success', 'Company updated successfully');
//         onDataChange();
//       } catch (error) {
//         showNotification('danger', 'Failed to update company');
//       }
//       handleDialogClose();
//     } else {
//       showNotification('danger', 'Please fill in all required fields');
//     }
//   };

//   const onPaginationChange = (page: number) => {
//     setTableData(prev => ({ ...prev, pageIndex: page }));
//   };

//   const onSelectChange = (value: number) => {
//     setTableData(prev => ({ ...prev, pageSize: value, pageIndex: 1 }));
//   };

//   const onSort = (sort: OnSortParam) => {
//     setTableData(prev => ({ ...prev, sort }));
//   };

//   return (
//     <div className="relative">
//       <DataTable
//         columns={columns}
//         data={companyData}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         loading={isLoading}
//         pagingData={{
//           total: companyData.length,
//           pageIndex: tableData.pageIndex,
//           pageSize: tableData.pageSize,
//         }}
//         onPaginationChange={onPaginationChange}
//         onSelectChange={onSelectChange}
//         onSort={onSort}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Confirm Deletion</h5>
//         <p>
//           Are you sure you want to delete company "{itemToDelete?.name}"? 
//           This action cannot be undone.
//         </p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Edit Company</h5>
//         <div className="flex flex-col gap-5">
//           <div>
//             <OutlinedSelect
//               label="Select Company Group"
//               options={companyGroups}
//               value={selectedCompanyGroup}
//               onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
//             />
//           </div>
//           <div>
//             <OutlinedInput
//               label="Company Name"
//               value={editedName}
//               onChange={(value: string) => setEditedName(value)}
//             />
//           </div>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleEditConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyNameTable;


// import React, { useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
// import { FiSettings, FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import { RiEyeLine } from 'react-icons/ri';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined';
// import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import { APP_PREFIX_PATH } from '@/constants/route.constant';
// import { useAppDispatch } from '@/store';
// import { deleteCompany, updateCompany } from '@/store/slices/company/companySlice';
// import ConfigDropdown from './ConfigDropdown';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';

// interface CompanyData {
//   id: number;
//   name: string;
//   company_group_name: string;
//   company_group_id: number;
// }

// interface CompanyNameTableProps {
//   companyData: CompanyData[];
//   isLoading: boolean;
//   onDataChange: () => void;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
//   companyData,
//   isLoading,
//   onDataChange
// }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
//   const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
//   const [editedName, setEditedName] = useState('');
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
//   const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
//   const [tableData, setTableData] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 5,
//     query: '',
//     sort: { order: '', key: '' },
//   });

//   useEffect(() => {
//     loadCompanyGroups();
//   }, []);

//   const loadCompanyGroups = async () => {
//     try {
//       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
//         params: { ignorePlatform: true },
//       });
//       setCompanyGroups(
//         data.data.map((v: any) => ({
//           label: v.name,
//           value: String(v.id),
//         }))
//       );
//     } catch (error) {
//       console.error('Failed to load company groups:', error);
//       showNotification('danger', 'Failed to load company groups');
//     }
//   };

//   const columns = useMemo<ColumnDef<CompanyData>[]>(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey:'company_group_name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Company',
//         accessorKey: 'name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="View Company Details">
//               <Button
//                 size="sm"
//                 onClick={() => handleViewDetails(row.original)}
//                 icon={<RiEyeLine />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Edit Company">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete Company">
//               <Button
//                 size="sm"
//                 onClick={() => openDeleteDialog(row.original)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <ConfigDropdown
//               companyName={row.original.name}
//               companyGroupName={row.original.company_group_name}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleViewDetails = (company: CompanyData) => {
//     const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
//       state: { 
//         companyName: company.name, 
//         companyGroupName: company.company_group_name 
//       }
//     });
//   };

//   const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
//     const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
//       state: { companyName, companyGroupName }
//     });
//   };

//   const openDeleteDialog = (company: CompanyData) => {
//     setItemToDelete(company);
//     setDialogIsOpen(true);
//   };

//   const openEditDialog = (company: CompanyData) => {
//     setItemToEdit(company);
//     setEditedName(company.name);
    
//     // Create a default selection based on the current company group
//     const defaultSelection: SelectOption = {
//       label: company.company_group_name,
//       value: String(company.company_group_id)
//     };
    
//     setSelectedCompanyGroup(defaultSelection);
//     setEditDialogIsOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogIsOpen(false);
//     setEditDialogIsOpen(false);
//     setItemToDelete(null);
//     setItemToEdit(null);
//     setEditedName('');
//     setSelectedCompanyGroup(null);
//   };

//   const showNotification = (type: 'success' | 'danger', message: string) => {
//     toast.push(
//       <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
//         {message}
//       </Notification>
//     );
//   };

//   const handleDeleteConfirm = async () => {
//     if (itemToDelete?.id) {
//       try {
//         await dispatch(deleteCompany(itemToDelete.id));
//         showNotification('success', 'Company deleted successfully');
//         onDataChange();
//       } catch (error) {
//         showNotification('danger', 'Failed to delete company');
//       }
//       handleDialogClose();
//     }
//   };

//   const handleEditConfirm = async () => {
//     if (itemToEdit?.id && editedName.trim() && selectedCompanyGroup) {
//       try {
//         // Only update if company group has changed or name has changed
//         if (
//           selectedCompanyGroup.value !== String(itemToEdit.company_group_id) ||
//           editedName.trim() !== itemToEdit.name
//         ) {
//           await dispatch(updateCompany({
//             id: itemToEdit.id,
//             data: {
//               name: editedName.trim(),
//               group_id: parseInt(selectedCompanyGroup.value)
//             }
//           }));
//           showNotification('success', 'Company updated successfully');
//           onDataChange();
//         }
//       } catch (error) {
//         showNotification('danger', 'Failed to update company');
//       }
//       handleDialogClose();
//     } else {
//       showNotification('danger', 'Please fill in all required fields');
//     }
//   };

//   const onPaginationChange = (page: number) => {
//     setTableData(prev => ({ ...prev, pageIndex: page }));
//   };

//   const onSelectChange = (value: number) => {
//     setTableData(prev => ({ ...prev, pageSize: value, pageIndex: 1 }));
//   };

//   const onSort = (sort: OnSortParam) => {
//     setTableData(prev => ({ ...prev, sort }));
//   };

//   return (
//     <div className="relative">
//       <DataTable
//         columns={columns}
//         data={companyData}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         loading={isLoading}
//         pagingData={{
//           total: companyData.length,
//           pageIndex: tableData.pageIndex,
//           pageSize: tableData.pageSize,
//         }}
//         onPaginationChange={onPaginationChange}
//         onSelectChange={onSelectChange}
//         onSort={onSort}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Confirm Deletion</h5>
//         <p>
//           Are you sure you want to delete company "{itemToDelete?.name}"? 
//           This action cannot be undone.
//         </p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Edit Company</h5>
//         <div className="flex flex-col gap-5">
//           <div>
//             <OutlinedSelect
//               label="Company Group"
//               options={[
//                 // Show current company group first
//                 ...(selectedCompanyGroup ? [selectedCompanyGroup] : []),
//                 // Then show other company groups, filtering out the current one
//                 ...companyGroups.filter(
//                   group => group.value !== selectedCompanyGroup?.value
//                 )
//               ]}
//               value={selectedCompanyGroup}
//               onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
//             />
//           </div>
//           <div>
//             <OutlinedInput
//               label="Company Name"
//               value={editedName}
//               onChange={(value: string) => setEditedName(value)}
//             />
//           </div>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleEditConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyNameTable;

// import React, { useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
// import { FiSettings, FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import { RiEyeLine } from 'react-icons/ri';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined';
// import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import { APP_PREFIX_PATH } from '@/constants/route.constant';
// import { useAppDispatch } from '@/store';
// import { deleteCompany, updateCompany } from '@/store/slices/company/companySlice';
// import ConfigDropdown from './ConfigDropdown';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';

// interface CompanyData {
//   id: number;
//   name: string;
//   company_group_name: string;
//   company_group_id: number;
// }

// interface CompanyNameTableProps {
//   companyData: CompanyData[];
//   isLoading: boolean;
//   onDataChange: () => void;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
//   companyData,
//   isLoading,
//   onDataChange
// }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
//   const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
//   const [editedName, setEditedName] = useState('');
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
//   const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
//   const [tableData, setTableData] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 5,
//     query: '',
//     sort: { order: '', key: '' },
//   });

//   useEffect(() => {
//     loadCompanyGroups();
//   }, []);

//   const loadCompanyGroups = async () => {
//     try {
//       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
//         params: { ignorePlatform: true },
//       });
//       setCompanyGroups(
//         data.data.map((v: any) => ({
//           label: v.name,
//           value: String(v.id),
//         }))
//       );
//     } catch (error) {
//       console.error('Failed to load company groups:', error);
//       showNotification('danger', 'Failed to load company groups');
//     }
//   };

//   const columns = useMemo<ColumnDef<CompanyData>[]>(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey:'company_group_name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Company',
//         accessorKey: 'name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="View Company Details">
//               <Button
//                 size="sm"
//                 onClick={() => handleViewDetails(row.original)}
//                 icon={<RiEyeLine />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Edit Company">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete Company">
//               <Button
//                 size="sm"
//                 onClick={() => openDeleteDialog(row.original)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <ConfigDropdown
//               companyName={row.original.name}
//               companyGroupName={row.original.company_group_name}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleViewDetails = (company: CompanyData) => {
//     const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
//       state: { 
//         companyName: company.name, 
//         companyGroupName: company.company_group_name 
//       }
//     });
//   };

//   const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
//     const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
//       state: { companyName, companyGroupName }
//     });
//   };

//   const openDeleteDialog = (company: CompanyData) => {
//     setItemToDelete(company);
//     setDialogIsOpen(true);
//   };

//   const openEditDialog = (company: CompanyData) => {
//     setItemToEdit(company);
//     setEditedName(company.name);
//     setSelectedCompanyGroup({
//       label: company.company_group_name,
//       value: String(company.company_group_id)
//     });
//     setEditDialogIsOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogIsOpen(false);
//     setEditDialogIsOpen(false);
//     setItemToDelete(null);
//     setItemToEdit(null);
//     setEditedName('');
//     setSelectedCompanyGroup(null);
//   };

//   const showNotification = (type: 'success' | 'danger', message: string) => {
//     toast.push(
//       <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
//         {message}
//       </Notification>
//     );
//   };

//   const handleDeleteConfirm = async () => {
    
//     console.log(companyGroups)
//     if (itemToDelete?.id) {
//       try {
//         await dispatch(deleteCompany(itemToDelete.id));
//         showNotification('success', 'Company deleted successfully');
//         onDataChange();
//       } catch (error) {
//         showNotification('danger', 'Failed to delete company');
//       }
//       handleDialogClose();
//     }
//   };

//   const handleEditConfirm = async () => {
//     console.log(selectedCompanyGroup)
//     if (itemToEdit?.id && editedName.trim() && selectedCompanyGroup) {
//       try {
//         if (
//           selectedCompanyGroup.value !== String(itemToEdit.company_group_id) ||
//           editedName.trim() !== itemToEdit.name
//         ) {
//           await dispatch(updateCompany({
//             id: itemToEdit.id,
//             data: {
//               name: editedName.trim(),
//               group_id: parseInt(selectedCompanyGroup.value)
//             }
//           }));
//           showNotification('success', 'Company updated successfully');
//           onDataChange();
//         }
//       } catch (error) {
//         showNotification('danger', 'Failed to update company');
//       }
//       handleDialogClose();
//     } else {
//       showNotification('danger', 'Please fill in all required fields');
//     }
//   };

//   const onPaginationChange = (page: number) => {
//     setTableData(prev => ({ ...prev, pageIndex: page }));
//   };

//   const onSelectChange = (value: number) => {
//     setTableData(prev => ({ ...prev, pageSize: value, pageIndex: 1 }));
//   };

//   const onSort = (sort: OnSortParam) => {
//     setTableData(prev => ({ ...prev, sort }));
//   };

//   return (
//     <div className="relative">
//       <DataTable
//         columns={columns}
//         data={companyData}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         loading={isLoading}
//         pagingData={{
//           total: companyData.length,
//           pageIndex: tableData.pageIndex,
//           pageSize: tableData.pageSize,
//         }}
//         onPaginationChange={onPaginationChange}
//         onSelectChange={onSelectChange}
//         onSort={onSort}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Confirm Deletion</h5>
//         <p>
//           Are you sure you want to delete company "{itemToDelete?.name}"? 
//           This action cannot be undone.
//         </p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Edit Company</h5>
//         <div className="flex flex-col gap-5">
//           <div>
//             <OutlinedSelect
//               label="Company Group"
//               options={companyGroups}
//               value={selectedCompanyGroup}
//               onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
//             />
//           </div>
//           <div>
//             <OutlinedInput
//               label="Company Name"
//               value={editedName}
//               onChange={(value: string) => setEditedName(value)}
//             />
//           </div>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleEditConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyNameTable;

// import React, { useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
// import { FiSettings, FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import { RiEyeLine } from 'react-icons/ri';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined';
// import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import { APP_PREFIX_PATH } from '@/constants/route.constant';
// import { useAppDispatch } from '@/store';
// import { deleteCompany, fetchCompanies, updateCompany } from '@/store/slices/company/companySlice';
// import ConfigDropdown from './ConfigDropdown';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';

// interface CompanyData {
//   id: number;
//   name: string;
//   company_group_name: string;
//   group_id: number;
// }

// interface CompanyNameTableProps {
//   companyData: CompanyData[];
//   isLoading: boolean;
//   onDataChange: () => void;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
//   companyData,
//   isLoading,
//   onDataChange
// }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [companyTableData, setCompanyTableData] = useState([]);
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
//   const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
//   const [editedName, setEditedName] = useState('');
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
//   const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
//   const [tableData, setTableData] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 5,
//     query: '',
//     sort: { order: '', key: '' },
//   });

//   useEffect(() => {
//     loadCompanyGroups();
//   }, []);

//   useEffect(() => {
//     fetchCompanyData(1, 10)
//   }, [])


//   const fetchCompanyData = async (page: number, size: number) => {
//     const { payload: data } = await dispatch(
//       fetchCompanies({page: page, page_size: size}),
//     )
//     setCompanyTableData(data?.data)
//     setTableData((prev) => ({
//       ...prev,
//       total: data?.paginate_data.totalResult,
//       pageIndex: data?.paginate_data.page,
//   }))
//   }

//   const loadCompanyGroups = async () => {
//     try {
//       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
//         params: { ignorePlatform: true },
//       });
//       setCompanyGroups(
//         data.data.map((v: any) => ({
//           label: v.name,
//           value: String(v.id),
//         }))
//       );
//     } catch (error) {
//       console.error('Failed to load company groups:', error);
//       showNotification('danger', 'Failed to load company groups');
//     }
//   };

//   const columns = useMemo<ColumnDef<CompanyData>[]>(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey:'company_group_name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Company',
//         accessorKey: 'name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="View Company Details">
//               <Button
//                 size="sm"
//                 onClick={() => handleViewDetails(row.original)}
//                 icon={<RiEyeLine />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Edit Company">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete Company">
//               <Button
//                 size="sm"
//                 onClick={() => openDeleteDialog(row.original)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <ConfigDropdown
//               companyName={row.original.name}
//               companyGroupName={row.original.company_group_name}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleViewDetails = (company: CompanyData) => {
//     const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
//       state: { 
//         companyName: company.name, 
//         companyGroupName: company.company_group_name 
//       }
//     });
//   };

//   const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
//     const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
//       state: { companyName, companyGroupName }
//     });
//   };

//   const openDeleteDialog = (company: CompanyData) => {
//     setItemToDelete(company);
//     setDialogIsOpen(true);
//   };

//   const openEditDialog = (company: CompanyData) => {
//     setItemToEdit(company);
//     setEditedName(company.name);
//     setSelectedCompanyGroup({
//       label: company.company_group_name,
//       value: String(company.group_id)
//     });
//     setEditDialogIsOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogIsOpen(false);
//     setEditDialogIsOpen(false);
//     setItemToDelete(null);
//     setItemToEdit(null);
//     setEditedName('');
//     setSelectedCompanyGroup(null);
//   };

//   const showNotification = (type: 'success' | 'danger', message: string) => {
//     toast.push(
//       <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
//         {message}
//       </Notification>
//     );
//   };

//   const handleDeleteConfirm = async () => {
//     if (itemToDelete?.id) {
//       try {
//         await dispatch(deleteCompany(itemToDelete.id));
//         showNotification('success', 'Company deleted successfully');
//         onDataChange();
//       } catch (error) {
//         showNotification('danger', 'Failed to delete company');
//       }
//       handleDialogClose();
//     }
//   };

//   const handleEditConfirm = async () => {
//     if (itemToEdit?.id && editedName.trim()) {
//       try {
//         // Always use either the selected company group ID or the original company group ID
//         const groupId = selectedCompanyGroup 
//           ? parseInt(selectedCompanyGroup.value)
//           : itemToEdit.group_id;
//         //   console.log(parseInt(groupId))

//         // Only update if either name or group has changed
//         if (editedName.trim() !== itemToEdit.name || groupId !== itemToEdit.company_group_id) {
//           await dispatch(updateCompany({
//             id: itemToEdit.id,
//             data: {
//               name: editedName.trim(),
//               group_id: groupId
//             }
//           }));
//           showNotification('success', 'Company updated successfully');
//           onDataChange();
//         }
//       } catch (error) {
//         console.log(error)
//         showNotification('danger', 'Failed to update company');
//       }
//       handleDialogClose();
//     } else {
//       showNotification('danger', 'Please fill in all required fields');
//     }
//   };

//   const onPaginationChange = (page: number) => {
//     setTableData(prev => ({ ...prev, pageIndex: page }));;
//     fetchCompanyData(page, tableData.pageSize)
//   };

//   const onSelectChange = (value: number) => {
//     setTableData((prev) => ({
//       ...prev,
//       pageSize: Number(value),
//       pageIndex: 1,
//   }))
//   fetchCompanyData(1, value)
  
//   };



//   return (
//     <div className="relative">
//       <DataTable
//         columns={columns}
//         data={companyTableData}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         loading={isLoading}
//         pagingData={{
//           total: tableData.total,
//           pageIndex: tableData.pageIndex,
//           pageSize: tableData.pageSize,
//         }}
//         onPaginationChange={onPaginationChange}
//         onSelectChange={onSelectChange}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Confirm Deletion</h5>
//         <p>
//           Are you sure you want to delete company "{itemToDelete?.name}"? 
//           This action cannot be undone.
//         </p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Edit Company</h5>
//         <div className="flex flex-col gap-5">
//           <div>
//             <OutlinedSelect
//               label="Company Group"
//               options={companyGroups}
//               value={selectedCompanyGroup}
//               onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
//             />
//           </div>
//           <div>
//             <OutlinedInput
//               label="Company Name"
//               value={editedName}
//               onChange={(value: string) => setEditedName(value)}
//             />
//           </div>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleEditConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyNameTable;

// import React, { useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
// import { FiSettings, FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import { RiEyeLine } from 'react-icons/ri';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined';
// import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import { APP_PREFIX_PATH } from '@/constants/route.constant';
// import { useAppDispatch } from '@/store';
// import { deleteCompany, fetchCompanies, updateCompany } from '@/store/slices/company/companySlice';
// import ConfigDropdown from './ConfigDropdown';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';

// interface CompanyData {
//   id: number;
//   name: string;
//   company_group_name: string;
//   group_id: number;
// }

// interface CompanyNameTableProps {
//   companyData: CompanyData[];
//   isLoading: boolean;
//   onDataChange: () => void;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
//   companyData,
//   isLoading,
//   onDataChange
// }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [companyTableData, setCompanyTableData] = useState([]);
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
//   const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
//   const [editedName, setEditedName] = useState('');
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
//   const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
//   const [tableData, setTableData] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 1,
//     query: '',
//     sort: { order: '', key: '' },
//   });

//   useEffect(() => {
//     loadCompanyGroups();
//   }, []);

//   useEffect(() => {
//     fetchCompanyData(1, 10)
//   }, []);

//   const fetchCompanyData = async (page: number, size: number) => {
//     const { payload: data } = await dispatch(
//       fetchCompanies({page: page, page_size: size}),
//     )
//     setCompanyTableData(data?.data)
//     setTableData((prev) => ({
//       ...prev,
//       total: data?.paginate_data.totalResult,
//       pageIndex: data?.paginate_data.page,
//     }))
//   }

//   const loadCompanyGroups = async () => {
//     try {
//       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
//         params: { ignorePlatform: true },
//       });
//       setCompanyGroups(
//         data.data.map((v: any) => ({
//           label: v.name,
//           value: String(v.id),
//         }))
//       );
//     } catch (error) {
//       console.error('Failed to load company groups:', error);
//       showNotification('danger', 'Failed to load company groups');
//     }
//   };

//   const columns = useMemo<ColumnDef<CompanyData>[]>(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey:'company_group_name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Company',
//         accessorKey: 'name',
//         cell: (props) => (
//           <div className="w-96 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="View Company Details">
//               <Button
//                 size="sm"
//                 onClick={() => handleViewDetails(row.original)}
//                 icon={<RiEyeLine />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Edit Company">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete Company">
//               <Button
//                 size="sm"
//                 onClick={() => openDeleteDialog(row.original)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <ConfigDropdown
//               companyName={row.original.name}
//               companyGroupName={row.original.company_group_name}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleViewDetails = (company: CompanyData) => {
//     const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
//       state: { 
//         companyName: company.name, 
//         companyGroupName: company.company_group_name 
//       }
//     });
//   };

//   const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
//     const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
//     navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
//       state: { companyName, companyGroupName }
//     });
//   };

//   const openDeleteDialog = (company: CompanyData) => {
//     setItemToDelete(company);
//     setDialogIsOpen(true);
//   };

//   const openEditDialog = (company: CompanyData) => {
//     setItemToEdit(company);
//     setEditedName(company.name);
//     setSelectedCompanyGroup({
//       label: company.company_group_name,
//       value: String(company.group_id)
//     });
//     setEditDialogIsOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogIsOpen(false);
//     setEditDialogIsOpen(false);
//     setItemToDelete(null);
//     setItemToEdit(null);
//     setEditedName('');
//     setSelectedCompanyGroup(null);
//   };

//   const showNotification = (type: 'success' | 'danger', message: string) => {
//     toast.push(
//       <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
//         {message}
//       </Notification>
//     );
//   };

//   const handleDeleteConfirm = async () => {
//     if (itemToDelete?.id) {
//       try {
//         await dispatch(deleteCompany(itemToDelete.id));
//         showNotification('success', 'Company deleted successfully');
        
//         // Recalculate the current page after deletion
//         const newTotal = tableData.total - 1;
//         const lastPage = Math.ceil(newTotal / tableData.pageSize);
//         const newPageIndex = tableData.pageIndex > lastPage ? lastPage : tableData.pageIndex;
        
//         // Fetch data for the correct page
//         await fetchCompanyData(newPageIndex, tableData.pageSize);
//         onDataChange(); // Notify parent component
//       } catch (error) {
//         showNotification('danger', 'Failed to delete company');
//       }
//       handleDialogClose();
//     }
//   };

//   const handleEditConfirm = async () => {
//     if (itemToEdit?.id && editedName.trim()) {
//       try {
//         const groupId = selectedCompanyGroup 
//           ? parseInt(selectedCompanyGroup.value)
//           : itemToEdit.group_id;

//         if (editedName.trim() !== itemToEdit.name || groupId !== itemToEdit.group_id) {
//           await dispatch(updateCompany({
//             id: itemToEdit.id,
//             data: {
//               name: editedName.trim(),
//               group_id: groupId
//             }
//           }));
//           showNotification('success', 'Company updated successfully');
          
//           // Fetch data for the current page
//           await fetchCompanyData(tableData.pageIndex, tableData.pageSize);
//           onDataChange(); // Notify parent component
//         }
//       } catch (error) {
//         console.log(error)
//         showNotification('danger', 'Failed to update company');
//       }
//       handleDialogClose();
//     } else {
//       showNotification('danger', 'Please fill in all required fields');
//     }
//   };

//   const onPaginationChange = (page: number) => {
//     setTableData(prev => ({ ...prev, pageIndex: page }));
//     fetchCompanyData(page, tableData.pageSize);
//   };

//   const onSelectChange = (value: number) => {
//     setTableData((prev) => ({
//       ...prev,
//       pageSize: Number(value),
//       pageIndex: 1,
//     }));
//     fetchCompanyData(1, value);
//   };

//   return (
//     <div className="relative">
//       <DataTable
//         columns={columns}
//         data={companyTableData}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         loading={isLoading}
//         pagingData={{
//           total: tableData.total,
//           pageIndex: tableData.pageIndex,
//           pageSize: tableData.pageSize,
//         }}
//         onPaginationChange={onPaginationChange}
//         onSelectChange={onSelectChange}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Confirm Deletion</h5>
//         <p>
//           Are you sure you want to delete company "{itemToDelete?.name}"? 
//           This action cannot be undone.
//         </p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Edit Company</h5>
//         <div className="flex flex-col gap-5">
//           <div>
//             <OutlinedSelect
//               label="Company Group"
//               options={companyGroups}
//               value={selectedCompanyGroup}
//               onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
//             />
//           </div>
//           <div>
//             <OutlinedInput
//               label="Company Name"
//               value={editedName}
//               onChange={(value: string) => setEditedName(value)}
//             />
//           </div>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleEditConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyNameTable;

import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
import { FiSettings, FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import { useAppDispatch } from '@/store';
import { deleteCompany, fetchCompanies, updateCompany } from '@/store/slices/company/companySlice';
import ConfigDropdown from './ConfigDropdown';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { showErrorNotification } from '@/components/ui/ErrorMessage';

interface CompanyData {
  id: number;
  name: string;
  company_group_name: string;
  group_id: number;
  CompanyGroup?: {
    name: string;
  };
}

interface CompanyNameTableProps {
  companyData: CompanyData[];
  isLoading: boolean;
  onDataChange: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
  companyData,
  isLoading,
  onDataChange
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [companyTableData, setCompanyTableData] = useState<CompanyData[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
  const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
  const [editedName, setEditedName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  useEffect(() => {
    loadCompanyGroups();
  }, []);

  useEffect(() => {
    fetchCompanyData(1, 10);
  }, []);

  const fetchCompanyData = async (page: number, size: number) => {
    try {
      const { payload: data } = await dispatch(
        fetchCompanies({ page: page, page_size: size })
      );
      
      // Map the data to include company_group_name from CompanyGroup
      const mappedData = data?.data?.map((company: CompanyData) => ({
        ...company,
        company_group_name: company.CompanyGroup?.name || company.company_group_name || 'N/A'
      })) || [];

      setCompanyTableData(mappedData);
      setTableData((prev) => ({
        ...prev,
        total: data?.paginate_data.totalResult,
        pageIndex: data?.paginate_data.page,
      }));
    } catch (error) {
      console.error('Failed to fetch company data:', error);
      showNotification('danger', 'Failed to fetch company data');
    }
  };

  const loadCompanyGroups = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true },
      });
      setCompanyGroups(
        data.data.map((v: any) => ({
          label: v.name,
          value: String(v.id),
        }))
      );
    } catch (error) {
      console.error('Failed to load company groups:', error);
      showNotification('danger', 'Failed to load company groups');
    }
  };

  const columns = useMemo<ColumnDef<CompanyData>[]>(
    () => [
      {
        header: 'Company Group',
        accessorKey: 'company_group_name',
        cell: (props) => (
          <div className="w-96 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Company',
        accessorKey: 'name',
        cell: (props) => (
          <div className="w-96 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="View Company Details">
              <Button
                size="sm"
                onClick={() => handleViewDetails(row.original)}
                icon={<RiEyeLine />}
                className="text-blue-500"
              />
            </Tooltip>
            <Tooltip title="Edit Company">
              <Button
                size="sm"
                onClick={() => openEditDialog(row.original)}
                icon={<MdEdit />}
                className="text-blue-500"
              />
            </Tooltip>
            <Tooltip title="Delete Company">
              <Button
                size="sm"
                onClick={() => openDeleteDialog(row.original)}
                icon={<FiTrash />}
                className="text-red-500"
              />
            </Tooltip>
            <ConfigDropdown
              companyName={row.original.name}
              companyGroupName={row.original.company_group_name}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleViewDetails = (company: CompanyData) => {
    const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
    navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
      state: { 
        companyName: company.name, 
        companyGroupName: company.company_group_name 
      }
    });
  };

  const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
    const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
    navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
      state: { companyName, companyGroupName }
    });
  };

  const openDeleteDialog = (company: CompanyData) => {
    setItemToDelete(company);
    setDialogIsOpen(true);
  };

  const openEditDialog = (company: CompanyData) => {
    setItemToEdit(company);
    setEditedName(company.name);
    setSelectedCompanyGroup({
      label: company.company_group_name,
      value: String(company.group_id)
    });
    setEditDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
    setEditedName('');
    setSelectedCompanyGroup(null);
  };

  const showNotification = (type: 'success' | 'danger', message: string) => {
    toast.push(
      <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
        {message}
      </Notification>
    );
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete?.id) {
      try {
        await dispatch(deleteCompany(itemToDelete.id));
        showNotification('success', 'Company deleted successfully');
        
        // Recalculate the current page after deletion
        const newTotal = tableData.total - 1;
        const lastPage = Math.ceil(newTotal / tableData.pageSize);
        const newPageIndex = tableData.pageIndex > lastPage ? lastPage : tableData.pageIndex;
        
        // Fetch data for the correct page
        await fetchCompanyData(newPageIndex, tableData.pageSize);
        onDataChange(); // Notify parent component
      } catch (error) {
        showNotification('danger', 'Failed to delete company');
      }
      handleDialogClose();
    }
  };

  const handleEditConfirm = async () => {
    if (itemToEdit?.id && editedName.trim()) {
      try {
        const groupId = selectedCompanyGroup 
          ? parseInt(selectedCompanyGroup.value)
          : itemToEdit.group_id;

        if (editedName.trim() !== itemToEdit.name || groupId !== itemToEdit.group_id) {
         const response= await dispatch(updateCompany({
            id: itemToEdit.id,
            data: {
              name: editedName.trim(),
              group_id: groupId
            }
          })).catch((error: any) => {
            // Handle different error formats
            if (error.response?.data?.message) {
                // API error response
                showErrorNotification(error.response.data.message);
            } else if (error.message) {
                // Regular error object
                showErrorNotification(error.message);
            } else if (Array.isArray(error)) {
                // Array of error messages
                showErrorNotification(error);
            } else {
                // Fallback error message
                showErrorNotification('An unexpected error occurred. Please try again.');
            }
            throw error; // Re-throw to prevent navigation
        });

        if(response){

          
          
          onDataChange(); // Notify parent component
          
          // Fetch data for the current page
          await fetchCompanyData(tableData.pageIndex, tableData.pageSize);
          console.log("re rendering the table")
          showNotification('success', 'Company updated successfully');
        }
        }
      } catch (error) {
        console.error(error);
        showNotification('danger', 'Failed to update company');
      }
      handleDialogClose();
    } else {
      showNotification('danger', 'Please fill in all required fields');
    }
  };

  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
    fetchCompanyData(page, tableData.pageSize);
  };

  const onSelectChange = (value: number) => {
    setTableData((prev) => ({
      ...prev,
      pageSize: Number(value),
      pageIndex: 1,
    }));
    fetchCompanyData(1, value);
  };

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={companyTableData}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={isLoading}
        pagingData={{
          total: tableData.total,
          pageIndex: tableData.pageIndex,
          pageSize: tableData.pageSize,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={dialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Confirm Deletion</h5>
        <p>
          Are you sure you want to delete company "{itemToDelete?.name}"? 
          This action cannot be undone.
        </p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </div>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        isOpen={editDialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Edit Company</h5>
        <div className="flex flex-col gap-5">
          <div>
            <p className='mb-4'>Select Company Group <span className='text-red-500'>*</span></p>
            <OutlinedSelect
              label="Company Group"
              options={companyGroups}
              value={selectedCompanyGroup}
              onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
            />
          </div>
          <div>
          <p className='mb-4'>Enter Company Name <span className='text-red-500'>*</span></p>
            <OutlinedInput
              label="Company Name"
              value={editedName}
              onChange={(value: string) => setEditedName(value)}
            />
          </div>
        </div>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleEditConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyNameTable;