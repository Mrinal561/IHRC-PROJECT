

import React, { useState, useMemo } from 'react';
import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useAppDispatch } from '@/store';
import { deleteCompanyGroup, updateCompanyGroup } from '@/store/slices/companyGroup/companyGroupSlice';
import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

interface CompanyTableProps {
    companyData: CompanyGroupData[];
    isLoading: boolean;
    onDataChange: () => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ 
    companyData, 
    isLoading, 
    onDataChange 
}) => {
    const dispatch = useAppDispatch();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CompanyGroupData | null>(null);
    const [itemToEdit, setItemToEdit] = useState<CompanyGroupData | null>(null);
    const [editedCompanyGroupName, setEditedCompanyGroupName] = useState('');
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 5,
        query: '',
        sort: { order: '', key: '' },
    });

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
                await dispatch(deleteCompanyGroup(itemToDelete.id));
                showSuccessNotification('Company group deleted successfully');
                onDataChange(); // Trigger parent refresh
            } catch (error) {
                showErrorNotification('Failed to delete company group');
            }
            handleDialogClose();
        }
    };

   
const handleEditConfirm = async () => {
    if (itemToEdit?.id && editedCompanyGroupName.trim()) {
        try {
            // First dispatch the update action
            const result = await dispatch(updateCompanyGroup({
                id: itemToEdit.id,
                data: { name: editedCompanyGroupName.trim() }
            }));

            // Check if the update was successful
            if (result.payload) {
                showSuccessNotification('Company group updated successfully');
                // Explicitly trigger the data refresh
                onDataChange(); // This will fetch fresh data from the server
            } else {
                showErrorNotification('Failed to update company group');
            }
        } catch (error) {
            console.error('Error updating company group:', error);
            showErrorNotification('Failed to update company group');
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

    const showErrorNotification = (message: string) => {
        toast.push(
            <Notification title="Error" type="danger">
                {message}
            </Notification>
        );
    };

    // Pagination handlers
    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
    };

    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
    };

    const onSort = (sort: OnSortParam) => {
        setTableData(prev => ({ ...prev, sort }));
    };

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={companyData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={isLoading}
                pagingData={{
                    total: companyData.length,
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