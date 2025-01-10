
import React, { useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import ESIEditedData from './ESIEditedData';
import { EsiSetupData } from '@/@types/esiSetup';
import dayjs from 'dayjs';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { deleteESI } from '@/store/slices/esiSetup/esiSetupSlice';
import { useDispatch } from 'react-redux';

interface ESISetupTableProps {
    data: EsiSetupData[];
    onDelete?: (index: number) => void;
  onEdit?: (index: number, newData: EsiSetupData) => void;
    loading?: boolean;
     onRefresh?: () => void;
}

const ESISetupTable: React.FC<ESISetupTableProps> = ({ 
    data,
    loading = false,
    onDelete,
    onEdit,
    onRefresh
}) => {
    const dispatch = useDispatch()
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<EsiSetupData | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

    const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>
        );
    };

    const columns: ColumnDef<EsiSetupData>[] = useMemo(
        () => [
            {
                header: 'Company Group',
                accessorKey: 'CompanyGroup.name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'Company.name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Code Type',
                accessorKey: 'code_Type',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Code',
                accessorKey: 'code',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Code Location',
                accessorKey: 'Location.name',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI User ID',
                accessorKey: 'esi_user',
                cell: (props) => (
                    <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI User Password',
                accessorKey: 'password',
                cell: (props) => (
                    <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
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
                                onClick={() => openDialog(row.original)}
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

    const openDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };

    const openEditDialog = (item: EsiSetupData) => {
        setItemToEdit(item);
        setEditDialogIsOpen(true);
         setEditingId(item.id);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
    };

    const handleDialogOk = async () => {
        if (itemToDelete) {
          try {
            const res = await dispatch(deleteESI(itemToDelete.id)).unwrap()
            .catch((error: any) => {
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
                  showErrorNotification(error);
              }
              throw error; // Re-throw to prevent navigation
          });
            
            if (res) {
              toast.push(
                <Notification title="Success" type="success">
                  ESI Setup deleted successfully
                </Notification>
              );
              setDialogIsOpen(false);
              setItemToDelete(null);
              if (onRefresh) {
                onRefresh(); // Refresh the data after successful deletion
              }
            }
          } catch (error) {
            console.log(error)
            // toast.push(
            //   <Notification title="Error" type="danger">
            //     Failed to delete ESI Setup
            //   </Notification>
            // );
          }
        }
      };

    const handleEditConfirm = (editedData: EsiSetupData) => {
        if (itemToEdit !== null) {
            const index = data.findIndex(item => item === itemToEdit);
            if (index !== -1) {
                onEdit?.(index, editedData);
                setEditDialogIsOpen(false);
                setItemToEdit(null);
                openNotification('success', 'ESI Setup updated successfully');
            }
        }
    };

    return (
        <div className="relative">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No ESI setup data available
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ className: 'rounded-md' }}
                    loading={loading}
                    pagingData={{
                        total: data.length,
                        pageIndex: 1,
                        pageSize: 10,
                    }}
                    stickyHeader={true}
                    stickyFirstColumn={true}
                    stickyLastColumn={true}
                />
            )}

            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deletion</h5>
                <p>
                    Are you sure you want to delete this ESI Setup?
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDialogOk}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
                width={800}
                height={470}
            >
                <h5 className="mb-4">Edit ESI Setup</h5>
                {itemToEdit && (
                    <ESIEditedData
                        onRefresh={onRefresh}
                        id = {editingId}
                        initialData={itemToEdit}
                        onClose={handleDialogClose}
                        onSubmit={handleEditConfirm}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default ESISetupTable;