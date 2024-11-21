import React, { useState, useMemo, useEffect } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useAppDispatch } from '@/store';
import { 
    deleteCompanyGroup, 
    updateCompanyGroup,
    fetchCompanyGroups 
} from '@/store/slices/companyGroup/companyGroupSlice';
import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';
import { showErrorNotification } from '@/components/ui/ErrorMessage';

interface CompanyTableProps {
    companyData: CompanyGroupData[];
    isLoading: boolean;
    onDataChange: (page?: number, pageSize?: number) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ 
    companyData, 
    isLoading, 
    onDataChange 
}) => {
    const dispatch = useAppDispatch();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [companyGroupTableData, setCompanyGroupTableData] = useState<CompanyGroupData[]>([]);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CompanyGroupData | null>(null);
    const [itemToEdit, setItemToEdit] = useState<CompanyGroupData | null>(null);
    const [editedCompanyGroupName, setEditedCompanyGroupName] = useState('');
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });

    useEffect(() => {
        setCompanyGroupTableData(companyData);
    }, [companyData]);

    useEffect(() => {
        fetchCompanyGroupData(tableData.pageIndex, tableData.pageSize);
    }, [tableData.pageIndex, tableData.pageSize]);

    const fetchCompanyGroupData = async (page: number, size: number) => {
        const { payload: data } = await dispatch(
            fetchCompanyGroups({ page, page_size: size })
        );
        if (data?.data) {
            setCompanyGroupTableData(data.data);
            setTableData(prev => ({
                ...prev,
                total: data.paginate_data.totalResult,
                pageIndex: data.paginate_data.page,
            }));
        }
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

    const handleDeleteConfirm = async () => {
        if (itemToDelete?.id) {
            try {
              const response=  await dispatch(deleteCompanyGroup(itemToDelete.id)).unwrap().catch((error: any) => {
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
                    // showErrorNotification('An unexpected error occurred. Please try again.');
                }
                throw error; // Re-throw to prevent navigation
            });

            if(response){
                handleDialogClose();
                
                const newTotal = tableData.total - 1;
                const lastPage = Math.ceil(newTotal / tableData.pageSize);
                const newPageIndex = tableData.pageIndex > lastPage ? lastPage : tableData.pageIndex;
                
                onDataChange(newPageIndex, tableData.pageSize);
                showSuccessNotification('Company group deleted successfully');
            }
            } catch (error) {
                showErrorNotification(error);
                console.log(error);
                
            }
            handleDialogClose();
        }
    };

    const handleEditConfirm = async () => {
        
        if (itemToEdit?.id && editedCompanyGroupName.trim()) {
            try {
                const result = await dispatch(updateCompanyGroup({
                    id: itemToEdit.id,
                    data: { name: editedCompanyGroupName.trim() }
                })).unwrap().catch((error: any) => {
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

                if (result.payload) {
                    showSuccessNotification('Company group updated successfully');
                    onDataChange(tableData.pageIndex, tableData.pageSize);
                } 
            } catch (error) {
                console.error('Error updating company group:', error);
                // showErrorNotification('Failed to update company group');
            } finally {
                handleDialogClose();
            }
        } else {
            showErrorNotification('Please enter a valid company group name');
        }
    };

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

    const showSuccessNotification = (message: string) => {
        toast.push(
            <Notification title="Success" type="success">
                {message}
            </Notification>
        );
    };

    // const showErrorNotification = (message: string) => {
    //     toast.push(
    //         <Notification title="Error" type="danger">
    //             {message}
    //         </Notification>
    //     );
    // };

    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
    };

    const onSelectChange = (value: number) => {
        setTableData(prev => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 1,
        }));
    };

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={companyGroupTableData}
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
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="solid" 
                        onClick={handleDeleteConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </Dialog>

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
                    <Button 
                        variant="solid" 
                        onClick={handleEditConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default CompanyTable;