

import React, { useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import LWFEditedData from './LWFEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import dayjs from 'dayjs';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { deleteLwf } from '@/store/slices/lwfSetup/lwfTrackerSlice';
import { useDispatch } from 'react-redux';

export interface LWFSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    lwfState: string;
    lwfLocation: string;
    lwfRegistrationNumber: string;
    lwfRegistrationDate: string;
    lwfRemmitanceMode: string;
    lwfRemmitanceFrequency: string;
    lwfUserId?: string;
    lwfPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    lwfFrequency: string;
    lwfPaymentDueDate: string;
    lwfApplicableState: string;
    lwfRegistrationCertificate?: File | null;
}

interface LWFSetupTableProps {
    data: LWFSetupData[];
    // onDelete?: (index: number) => void;
    // onEdit?: (index: number, newData: LWFSetupData) => void;
    onSuspend?: (index: number) => void;
     onRefresh?: () => void;
}

const LWFSetupTable: React.FC<LWFSetupTableProps> = ({ 
    data,
    // onDelete,
    // onEdit,
    onSuspend,
    onRefresh
}) => {
    const dispatch = useDispatch();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<LWFSetupData | null>(null);
    const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

    const openSuspendDialog = (index: number) => {
        setSuspendDialogIsOpen(true);
        onSuspend?.(index);
    };

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

    const columns: ColumnDef<LWFSetupData>[] = useMemo(
        () => [
            // {
            //     header: 'Company Group',
            //     accessorKey: 'CompanyGroup.name',
            //     cell: (props) => (
            //         <div className="w-36 text-start">{props.getValue() as string}</div>
            //     ),
            // },
            // {
            //     header: 'Company',
            //     accessorKey: 'Company.name',
            //     cell: (props) => (
            //         <div className="w-36 text-start">{props.getValue() as string}</div>
            //     ),
            // },
            {
                header: 'LWF State',
                accessorKey: 'Location.District.State.name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Location',
                accessorKey: 'Location.name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            // {
            //     header: 'LWF Frequency',
            //     accessorKey: 'lwfFrequency',
            //     cell: (props) => (
            //         <div className="w-36 text-start">{props.getValue() as string}</div>
            //     ),
            // },
            {
                header: 'LWF Registration Number',
                accessorKey: 'register_number',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Registration Date',
                accessorKey: 'register_date',
                cell: (props) => (
                    <div className="w-32 flex items-center justify-center">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>
                ),
            },
            {
                header: 'Remmitance Mode',
                accessorKey: 'remmit_mode',
                cell: (props) => (
                    <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'User ID',
                accessorKey: 'username',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Password',
                accessorKey: 'password',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Authorised Signatory',
                accessorKey: 'Signatory.name',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Designation',
                accessorKey: 'Signatory.Role.name',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Mobile',
                accessorKey: 'Signatory.mobile',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Email',
                accessorKey: 'Signatory.email',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
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
                        {/* <Tooltip title="Suspend User">
                            <Button
                                size="sm"
                                onClick={() => openSuspendDialog(row.index)}
                                icon={<IoPersonRemoveOutline />}
                                className="text-blue-500"
                            />
                        </Tooltip> */}
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

    const openEditDialog = (item: LWFSetupData) => {
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
            const res = await dispatch(deleteLwf(itemToDelete.id)).unwrap()
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
                  LWF Setup deleted successfully
                </Notification>
              );
              setDialogIsOpen(false);
              setItemToDelete(null);
              if (onRefresh) {
                onRefresh(); // Refresh the data after successful deletion
              }
            }
          } catch (error) {
            // toast.push(
            //   <Notification title="Error" type="danger">
            //     Failed to delete PF Setup
            //   </Notification>
            // );
            console.log(error)
          }
        }
      };
    const handleEditConfirm = (editedData: LWFSetupData) => {
        if (itemToEdit !== null) {
            const index = data.findIndex(item => item === itemToEdit);
            if (index !== -1) {
                onEdit?.(index, editedData);
                setEditDialogIsOpen(false);
                setItemToEdit(null);
                openNotification('success', 'LWF Setup updated successfully');
            }
        }
    };

    return (
        <div className="relative">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No LWF setup data available
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ className: 'rounded-md' }}
                    loading={false}
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
                    Are you sure you want to delete this LWF Setup?
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
                height={550}
            >
                <h5 className="mb-4">Edit LWF Setup</h5>
                {itemToEdit && (
                    <LWFEditedData
                        onRefresh={onRefresh}
                        id={editingId}
                        initialData={itemToEdit}
                        onClose={handleDialogClose}
                        onSubmit={handleEditConfirm}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default LWFSetupTable;