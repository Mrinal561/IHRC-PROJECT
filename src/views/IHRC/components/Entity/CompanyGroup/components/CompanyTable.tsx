    // import React, { useEffect, useMemo, useState } from 'react';
    // import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
    // import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
    // import { FiTrash } from 'react-icons/fi';
    // import { MdEdit } from 'react-icons/md';
    // import OutlinedInput from '@/components/ui/OutlinedInput';
    // import cloneDeep from 'lodash/cloneDeep';
    // import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
    // import { fetchCompanyGroups } from '@/store/slices/companyGroup/companyGroupSlice';
    // import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';
    // import { useDispatch } from 'react-redux';
    // import { AppDispatch } from '@/store';
    // import { useAppDispatch } from '@/store';


    // const CompanyTable: React.FC = () => {
    //     const dispatch = useAppDispatch();
    //     const [data, setData] = useState(entityDataSet);
    //     const [dialogIsOpen, setDialogIsOpen] = useState(false);
    //     const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    //     const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    //     const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    //     const [editedCompanyGroupName, setEditedCompanyGroupName] = useState('');
    //     const [companyTable,setCompanyTable] = useState([]);

    //     useEffect(()=>{
    //         fetchCompanyDataTable();
    //     },[])

    //     const fetchCompanyDataTable = async () => {
    //             const { payload: data }: any = await dispatch(fetchCompanyGroups()); 
    //             setCompanyTable(data.data)
    //             console.log(companyTable)
    //             console.log(data)
            
    //             }
    //     const [tableData, setTableData] = useState({
    //         total: data.length,
    //         pageIndex: 1,
    //         pageSize: 5,
    //         query: '',
    //         sort: { order: '', key: '' },
    //     });


    //     const columns = useMemo(
    //         () => [
    //             {
    //                 header: 'Company Group',
    //                 accessorKey: 'name',
    //                 cell: (props) => (
    //                     <div className="w-96 truncate">{props.getValue() as string}</div>
    //                 ),
    //             },
    //             {
    //                 header: 'Actions',
    //                 id: 'actions',
    //                 cell: ({ row }) => (
    //                     <div className="flex items-center gap-2">
    //                         <Tooltip title="Edit">
    //                             <Button
    //                                 size="sm"
    //                                 onClick={() => openEditDialog(row.index)}
    //                                 icon={<MdEdit />}
    //                                 className="text-blue-500"
    //                             />
    //                         </Tooltip>
    //                         <Tooltip title="Delete">
    //                             <Button
    //                                 size="sm"
    //                                 onClick={() => openDeleteDialog(row.index)}
    //                                 icon={<FiTrash />}
    //                                 className="text-red-500"
    //                             />
    //                         </Tooltip>
    //                     </div>
    //                 ),
    //             },
    //         ],
    //         []
    //     );

    //     const openDeleteDialog = (index: number) => {
    //         setItemToDelete(index);
    //         setDialogIsOpen(true);
    //     };

    //     const openEditDialog = (index: number) => {
    //         setItemToEdit(index);
    //         setEditedCompanyGroupName(data[index].Company_Group_Name || '');
    //         setEditDialogIsOpen(true);
    //     };

    //     const handleDialogClose = () => {
    //         setDialogIsOpen(false);
    //         setEditDialogIsOpen(false);
    //         setItemToDelete(null);
    //         setItemToEdit(null);
    //         setEditedCompanyGroupName('');
    //     };

    //     const handleDeleteConfirm = () => {
    //         if (itemToDelete !== null) {
    //             setData(prev => prev.filter((_, index) => index !== itemToDelete));
    //             handleDialogClose();
    //         }
    //     };

    //     const handleEditConfirm = () => {
    //         if (itemToEdit !== null) {
    //             setData(prev => prev.map((item, index) => 
    //                 index === itemToEdit ? { ...item, Company_Group_Name: editedCompanyGroupName } : item
    //             ));
    //             handleDialogClose();
    //             showSuccessNotification();
    //         }
    //     };

    //     const showSuccessNotification = () => {
    //         toast.push(
    //             <Notification title="Success" type="success">
    //                 Company Group Name changed successfully.
    //             </Notification>
    //         );
    //     };

    //     const onPaginationChange = (page: number) => {
    //         const newTableData = cloneDeep(tableData);
    //         newTableData.pageIndex = page;
    //         setTableData(newTableData);
    //     };
    //     const getSortedData = () => {
    //         if (tableData.sort.order && tableData.sort.key) {
    //             return [...data].sort((a, b) => {
    //                 if (a[tableData.sort.key] < b[tableData.sort.key]) return tableData.sort.order === 'asc' ? -1 : 1;
    //                 if (a[tableData.sort.key] > b[tableData.sort.key]) return tableData.sort.order === 'asc' ? 1 : -1;
    //                 return 0;
    //             });
    //         }
    //         return data;
    //     };

    //     const onSelectChange = (value: number) => {
    //         const newTableData = cloneDeep(tableData);
    //         newTableData.pageSize = Number(value);
    //         newTableData.pageIndex = 1;
    //         setTableData(newTableData);
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
    //             <DataTable
    //                 columns={columns}
    //                 data={companyTable}
    //                 skeletonAvatarColumns={[0]}
    //                 skeletonAvatarProps={{ className: 'rounded-md' }}
    //                 loading={false}
    //                 pagingData={{
    //                     total: tableData.total,
    //                     pageIndex: tableData.pageIndex,
    //                     pageSize: tableData.pageSize,
    //                 }}
    //                 onPaginationChange={onPaginationChange}
    //                 onSelectChange={onSelectChange}
    //                 onSort={onSort}
    //                 stickyHeader={true}
    //                 stickyFirstColumn={true}
    //                 stickyLastColumn={true}
    //             />

    //             {/* Delete Confirmation Dialog */}
    //             <Dialog
    //                 isOpen={dialogIsOpen}
    //                 onClose={handleDialogClose}
    //                 onRequestClose={handleDialogClose}
    //             >
    //                 <h5 className="mb-4">Confirm Deletion</h5>
    //                 <p>
    //                     Are you sure you want to delete this company? This action cannot be undone.
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

    //             {/* Edit Dialog */}
    //             <Dialog
    //                 isOpen={editDialogIsOpen}
    //                 onClose={handleDialogClose}
    //                 onRequestClose={handleDialogClose}
    //             >
    //                 <h5 className="mb-4">Edit Company Group Name</h5>
    //                 <div className="mb-4">
    //                     <OutlinedInput
    //                         label="Company Group Name"
    //                         value={editedCompanyGroupName}
    //                         onChange={(value: string) => setEditedCompanyGroupName(value)}
    //                     />
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
    //     );
    // };

    // export default CompanyTable;

    import React, { useEffect, useMemo, useState } from 'react';
import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput';
import cloneDeep from 'lodash/cloneDeep';
import { useAppDispatch } from '@/store';
import { deleteCompanyGroup, fetchCompanyGroups } from '@/store/slices/companyGroup/companyGroupSlice';
import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

const CompanyTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CompanyGroupData | null>(null);
    const [itemToEdit, setItemToEdit] = useState<CompanyGroupData | null>(null);
    const [editedCompanyGroupName, setEditedCompanyGroupName] = useState('');
    const [companyTable, setCompanyTable] = useState<CompanyGroupData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 5,
        query: '',
        sort: { order: '', key: '' },
    });

    useEffect(() => {
        fetchCompanyDataTable();
    }, []);
    // useEffect(() => {
    //     fetchCompanyDataTable();
    // }, [companyTable]);

    const fetchCompanyDataTable = async () => {
        setIsLoading(true);
        try {
            const { payload: data }: any = await dispatch(fetchCompanyGroups());
            setCompanyTable(data.data);
            setTableData(prev => ({ ...prev, total: data.data.length }));
        } catch (error) {
            showErrorNotification('Failed to fetch company groups');
        }
        setIsLoading(false);
    };

    const columns = useMemo(
        () => [
            {
                header: 'Company Group',
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
                        <Tooltip title="Edit">
                            <Button
                                size="sm"
                                onClick={() => openEditDialog(row.original)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="sm"
                                onClick={() => openDeleteDialog(row.original)}
                                icon={<FiTrash />}
                                className="text-red-500"
                            />
                        </Tooltip>
                    </div>
                ),
            },
        ],
        []
    );

    const openDeleteDialog = (company: CompanyGroupData) => {
        setItemToDelete(company);
        setDialogIsOpen(true);
    };

    const openEditDialog = (company: CompanyGroupData) => {
        setItemToEdit(company);
        setEditedCompanyGroupName(company.name);
        setEditDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setEditedCompanyGroupName('');
    };

    const handleDeleteConfirm = async () => {
        if (itemToDelete?.id) {
            setIsLoading(true);
            try {
                console.log(itemToDelete.id)
                await dispatch(deleteCompanyGroup(itemToDelete.id));
                showSuccessNotification('Company group deleted successfully');
                fetchCompanyDataTable(); // Refresh the table
            } catch (error) {
                console.log(error)
                showErrorNotification('Failed to delete company group');
            }
            setIsLoading(false);
            handleDialogClose();
        }
    };

    const showSuccessNotification = (message: string) => {
        toast.push(
            <Notification title="Success" type="success">
                {message}
            </Notification>
        );
    };

    const showErrorNotification = (message: string) => {
        toast.push(
            <Notification title="Error" type="danger">
                {message}
            </Notification>
        );
    };

    const handleEditConfirm = () => {
        if (itemToEdit) {
            // Implement edit functionality here
            handleDialogClose();
            showSuccessNotification('Company Group Name changed successfully.');
        }
    };

    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
    };

    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
    };

    const onSort = (sort: OnSortParam) => {
        setTableData(prev => ({ ...prev, sort }));
    };

    const getPaginatedData = () => {
        const startIndex = (tableData.pageIndex - 1) * tableData.pageSize;
        const endIndex = startIndex + tableData.pageSize;
        return companyTable.slice(startIndex, endIndex);
    };

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={getPaginatedData()}
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
                onSort={onSort}
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
                    Are you sure you want to delete the company group "{itemToDelete?.name}"? 
                    This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="solid" 
                        onClick={handleDeleteConfirm}
                        loading={isLoading}
                    >
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
                <h5 className="mb-4">Edit Company Group Name</h5>
                <div className="mb-4">
                    <OutlinedInput
                        label="Company Group Name"
                        value={editedCompanyGroupName}
                        onChange={(value: string) => setEditedCompanyGroupName(value)}
                    />
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

export default CompanyTable;