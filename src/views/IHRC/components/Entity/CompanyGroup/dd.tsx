// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import { MdEdit } from 'react-icons/md';
// import { FiTrash } from 'react-icons/fi';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import { useAppDispatch } from '@/store';
// import { 
//     fetchCompanyGroups, 
//     createCompanyGroup,
//     updateCompanyGroup,
//     deleteCompanyGroup 
// } from '@/store/slices/companyGroup/companyGroupSlice';

// const CompanyGroup = () => {
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const [dialogLoading, setDialogLoading] = useState(false);
//     const [companyData, setCompanyData] = useState([]);
//     const [createDialogOpen, setCreateDialogOpen] = useState(false);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [selectedGroup, setSelectedGroup] = useState(null);
//     const [companyGroupName, setCompanyGroupName] = useState('');

//     const fetchCompanyDataTable = async () => {
//         setIsLoading(true);
//         try {
//             const { payload: data } = await dispatch(fetchCompanyGroups({ page: 1, page_size: 10 }));
//             if (data?.data) {
//                 setCompanyData(data.data);
//             }
//         } catch (error) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Failed to fetch company groups
//                 </Notification>
//             );
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchCompanyDataTable();
//     }, []);

//     const handleCreate = async () => {
//         if (companyData.length > 0) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Only one company group is allowed. Please delete the existing group first.
//                 </Notification>
//             );
//             return;
//         }

//         if (!companyGroupName.trim()) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Please enter a valid company group name
//                 </Notification>
//             );
//             return;
//         }

//         setDialogLoading(true);
//         try {
//             await dispatch(createCompanyGroup({ name: companyGroupName })).unwrap();
//             await fetchCompanyDataTable();
//             setCreateDialogOpen(false);
//             setCompanyGroupName('');
//             toast.push(
//                 <Notification title="Success" type="success">
//                     Company Group created successfully
//                 </Notification>
//             );
//         } catch (error) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Failed to create company group
//                 </Notification>
//             );
//         }
//         setDialogLoading(false);
//     };

//     const handleEdit = async () => {
//         if (!companyGroupName.trim()) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Please enter a valid company group name
//                 </Notification>
//             );
//             return;
//         }

//         setDialogLoading(true);
//         try {
//             await dispatch(updateCompanyGroup({
//                 id: selectedGroup.id,
//                 data: { name: companyGroupName }
//             })).unwrap();
//             await fetchCompanyDataTable();
//             setEditDialogOpen(false);
//             setCompanyGroupName('');
//             setSelectedGroup(null);
//             toast.push(
//                 <Notification title="Success" type="success">
//                     Company Group updated successfully
//                 </Notification>
//             );
//         } catch (error) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Failed to update company group
//                 </Notification>
//             );
//         }
//         setDialogLoading(false);
//     };

//     const handleDelete = async () => {
//         setDialogLoading(true);
//         try {
//             await dispatch(deleteCompanyGroup(selectedGroup.id)).unwrap();
//             await fetchCompanyDataTable();
//             setDeleteDialogOpen(false);
//             setSelectedGroup(null);
//             toast.push(
//                 <Notification title="Success" type="success">
//                     Company Group deleted successfully
//                 </Notification>
//             );
//         } catch (error) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Failed to delete company group
//                 </Notification>
//             );
//         }
//         setDialogLoading(false);
//     };

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">Company Group Manager</h3>
//                 </div>
//                 <Button 
//                     variant="solid" 
//                     onClick={() => setCreateDialogOpen(true)} 
//                     icon={<HiPlusCircle />} 
//                     size="sm"
//                     disabled={companyData.length > 0}
//                 >
//                     Add Company Group
//                 </Button>
//             </div>

//             {isLoading ? (
//                 <div className="flex justify-center items-center h-48">
//                     Loading...
//                 </div>
//             ) : companyData.length === 0 ? (
//                 <div className="flex justify-center items-center h-48 text-gray-500">
//                     No company group found. Create one to get started.
//                 </div>
//             ) : (
//                 <div className="mt-4 border rounded-lg p-4">
//                     <div className="flex justify-between items-center">
//                         <div>
//                             <h4 className="text-lg font-semibold">{companyData[0].name}</h4>
//                         </div>
//                         <div className="flex gap-2">
//                             <Button
//                                 size="sm"
//                                 variant="solid"
//                                 icon={<MdEdit />}
//                                 onClick={() => {
//                                     setSelectedGroup(companyData[0]);
//                                     setCompanyGroupName(companyData[0].name);
//                                     setEditDialogOpen(true);
//                                 }}
//                             >
//                                 Edit
//                             </Button>
//                             <Button
//                                 size="sm"
//                                 variant="solid"
//                                 icon={<FiTrash />}
//                                 onClick={() => {
//                                     setSelectedGroup(companyData[0]);
//                                     setDeleteDialogOpen(true);
//                                 }}
//                             >
//                                 Delete
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Create Dialog */}
//             <Dialog
//                 isOpen={createDialogOpen}
//                 onClose={() => {
//                     setCreateDialogOpen(false);
//                     setCompanyGroupName('');
//                 }}
//                 onRequestClose={() => {
//                     setCreateDialogOpen(false);
//                     setCompanyGroupName('');
//                 }}
//             >
//                 <h5 className="mb-4">Create Company Group</h5>
//                 <div>
//                     <OutlinedInput
//                         label="Company Group Name"
//                         value={companyGroupName}
//                         onChange={(value) => setCompanyGroupName(value)}
//                     />
//                 </div>
//                 <div className="flex justify-end gap-2 mt-6">
//                     <Button
//                         variant="plain"
//                         onClick={() => {
//                             setCreateDialogOpen(false);
//                             setCompanyGroupName('');
//                         }}
//                         disabled={dialogLoading}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="solid"
//                         onClick={handleCreate}
//                         loading={dialogLoading}
//                     >
//                         Create
//                     </Button>
//                 </div>
//             </Dialog>

//             {/* Edit Dialog */}
//             <Dialog
//                 isOpen={editDialogOpen}
//                 onClose={() => {
//                     setEditDialogOpen(false);
//                     setCompanyGroupName('');
//                     setSelectedGroup(null);
//                 }}
//                 onRequestClose={() => {
//                     setEditDialogOpen(false);
//                     setCompanyGroupName('');
//                     setSelectedGroup(null);
//                 }}
//             >
//                 <h5 className="mb-4">Edit Company Group</h5>
//                 <div>
//                     <OutlinedInput
//                         label="Company Group Name"
//                         value={companyGroupName}
//                         onChange={(value) => setCompanyGroupName(value)}
//                     />
//                 </div>
//                 <div className="flex justify-end gap-2 mt-6">
//                     <Button
//                         variant="plain"
//                         onClick={() => {
//                             setEditDialogOpen(false);
//                             setCompanyGroupName('');
//                             setSelectedGroup(null);
//                         }}
//                         disabled={dialogLoading}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="solid"
//                         onClick={handleEdit}
//                         loading={dialogLoading}
//                     >
//                         Update
//                     </Button>
//                 </div>
//             </Dialog>

//             {/* Delete Dialog */}
//             <Dialog
//                 isOpen={deleteDialogOpen}
//                 onClose={() => {
//                     setDeleteDialogOpen(false);
//                     setSelectedGroup(null);
//                 }}
//                 onRequestClose={() => {
//                     setDeleteDialogOpen(false);
//                     setSelectedGroup(null);
//                 }}
//             >
//                 <h5 className="mb-4">Delete Company Group</h5>
//                 <p>Are you sure you want to delete this company group? This action cannot be undone.</p>
//                 <div className="flex justify-end gap-2 mt-6">
//                     <Button
//                         variant="plain"
//                         onClick={() => {
//                             setDeleteDialogOpen(false);
//                             setSelectedGroup(null);
//                         }}
//                         disabled={dialogLoading}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="solid"
//                         onClick={handleDelete}
//                         loading={dialogLoading}
//                     >
//                         Delete
//                     </Button>
//                 </div>
//             </Dialog>
//         </AdaptableCard>
//     );
// };

// export default CompanyGroup;













import React, { useState, useEffect, useMemo } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import AdaptableCard from '@/components/shared/AdaptableCard';
import DataTable from '@/components/shared/DataTable';
import { useAppDispatch } from '@/store';
import { 
    fetchCompanyGroups, 
    createCompanyGroup,
    updateCompanyGroup,
    deleteCompanyGroup 
} from '@/store/slices/companyGroup/companyGroupSlice';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';

const CompanyGroup = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [companyData, setCompanyData] = useState([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [companyGroupName, setCompanyGroupName] = useState('');
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    });

    const columns = useMemo(
        () => [
            {
                header: 'Company Group',
                accessorKey: 'name',
                cell: (props) => (
                    <div className="font-semibold">
                        {props.row.original.name}
                    </div>
                ),
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="solid"
                            icon={<MdEdit />}
                            onClick={() => {
                                setSelectedGroup(row.original);
                                setCompanyGroupName(row.original.name);
                                setEditDialogOpen(true);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="solid"
                            icon={<FiTrash />}
                            onClick={() => {
                                setSelectedGroup(row.original);
                                setDeleteDialogOpen(true);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const fetchCompanyDataTable = async (page = 1, pageSize = 10) => {
        setIsLoading(true);
        try {
            const { payload: data } = await dispatch(
                fetchCompanyGroups({ page, page_size: pageSize })
            );
            if (data?.data) {
                setCompanyData(data.data);
                setTableData(prev => ({
                    ...prev,
                    total: data.paginate_data?.totalResult || data.data.length,
                    pageIndex: page,
                }));
            }
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to fetch company groups
                </Notification>
            );
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCompanyDataTable(tableData.pageIndex, tableData.pageSize);
    }, [tableData.pageIndex, tableData.pageSize]);

    const handleCreate = async () => {
        if (companyData.length > 0) {
            toast.push(
                <Notification title="Error" type="danger">
                    Only one company group is allowed. Please delete the existing group first.
                </Notification>
            );
            return;
        }

        if (!companyGroupName.trim()) {
            toast.push(
                <Notification title="Error" type="danger">
                    Please enter a valid company group name
                </Notification>
            );
            return;
        }

        setDialogLoading(true);
        try {
            await dispatch(createCompanyGroup({ name: companyGroupName })).unwrap();
            await fetchCompanyDataTable();
            setCreateDialogOpen(false);
            setCompanyGroupName('');
            toast.push(
                <Notification title="Success" type="success">
                    Company Group created successfully
                </Notification>
            );
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to create company group
                </Notification>
            );
        }
        setDialogLoading(false);
    };

    const handleEdit = async () => {
        if (!companyGroupName.trim()) {
            toast.push(
                <Notification title="Error" type="danger">
                    Please enter a valid company group name
                </Notification>
            );
            return;
        }

        setDialogLoading(true);
        try {
            await dispatch(updateCompanyGroup({
                id: selectedGroup.id,
                data: { name: companyGroupName }
            })).unwrap();
            await fetchCompanyDataTable();
            setEditDialogOpen(false);
            setCompanyGroupName('');
            setSelectedGroup(null);
            toast.push(
                <Notification title="Success" type="success">
                    Company Group updated successfully
                </Notification>
            );
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to update company group
                </Notification>
            );
        }
        setDialogLoading(false);
    };

    const handleDelete = async () => {
        setDialogLoading(true);
        try {
            await dispatch(deleteCompanyGroup(selectedGroup.id)).unwrap();
            await fetchCompanyDataTable();
            setDeleteDialogOpen(false);
            setSelectedGroup(null);
            toast.push(
                <Notification title="Success" type="success">
                    Company Group deleted successfully
                </Notification>
            );
        } catch (error) {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to delete company group
                </Notification>
            );
        }
        setDialogLoading(false);
    };

    const onPaginationChange = (page) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
    };

    const onSelectChange = (pageSize) => {
        setTableData(prev => ({
            ...prev,
            pageSize: Number(pageSize),
            pageIndex: 1,
        }));
    };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Company Group Manager</h3>
                </div>
                <Button 
                    variant="solid" 
                    onClick={() => setCreateDialogOpen(true)} 
                    icon={<HiPlusCircle />} 
                    size="sm"
                    disabled={companyData.length > 0}
                >
                    Add Company Group
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={companyData}
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
            />

            {/* Create Dialog */}
            <Dialog
                isOpen={createDialogOpen}
                onClose={() => {
                    setCreateDialogOpen(false);
                    setCompanyGroupName('');
                }}
                onRequestClose={() => {
                    setCreateDialogOpen(false);
                    setCompanyGroupName('');
                }}
            >
                <h5 className="mb-4">Create Company Group</h5>
                <div>
                    <OutlinedInput
                        label="Company Group Name"
                        value={companyGroupName}
                        onChange={(value) => setCompanyGroupName(value)}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="plain"
                        onClick={() => {
                            setCreateDialogOpen(false);
                            setCompanyGroupName('');
                        }}
                        disabled={dialogLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleCreate}
                        loading={dialogLoading}
                    >
                        Create
                    </Button>
                </div>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                isOpen={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setCompanyGroupName('');
                    setSelectedGroup(null);
                }}
                onRequestClose={() => {
                    setEditDialogOpen(false);
                    setCompanyGroupName('');
                    setSelectedGroup(null);
                }}
            >
                <h5 className="mb-4">Edit Company Group</h5>
                <div>
                    <OutlinedInput
                        label="Company Group Name"
                        value={companyGroupName}
                        onChange={(value) => setCompanyGroupName(value)}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="plain"
                        onClick={() => {
                            setEditDialogOpen(false);
                            setCompanyGroupName('');
                            setSelectedGroup(null);
                        }}
                        disabled={dialogLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleEdit}
                        loading={dialogLoading}
                    >
                        Update
                    </Button>
                </div>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                isOpen={deleteDialogOpen}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedGroup(null);
                }}
                onRequestClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedGroup(null);
                }}
            >
                <h5 className="mb-4">Delete Company Group</h5>
                <p>Are you sure you want to delete this company group? This action cannot be undone.</p>
                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="plain"
                        onClick={() => {
                            setDeleteDialogOpen(false);
                            setSelectedGroup(null);
                        }}
                        disabled={dialogLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleDelete}
                        loading={dialogLoading}
                    >
                        Delete
                    </Button>
                </div>
            </Dialog>
        </AdaptableCard>
    );
};

export default CompanyGroup;