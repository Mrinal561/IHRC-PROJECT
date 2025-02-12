
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
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
import { HiOutlineViewGrid } from 'react-icons/hi';

export interface LWFSetupData {
    email:string;
    mobile_number:string;
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
    signatories?: Array<{
        name: string;
        Role: { name: string };
        email: string;
        mobile: string;
    }>;
}

interface LWFSetupTableProps {
    data: LWFSetupData[];
    onSuspend?: (index: number) => void;
    onRefresh?: () => void;
    pagination: {
        total: number;
        pageIndex: number;
        pageSize: number;
    };
    onPaginationChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    isLoading: boolean;
}

const LWFSetupTable: React.FC<LWFSetupTableProps> = ({ 
    data,
    onSuspend,
    onRefresh,
    pagination,
    onPageSizeChange,
    onPaginationChange,
    isLoading
}) => {
    const dispatch = useDispatch();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<LWFSetupData | null>(null);
    const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false)
    const maxSignatories = useMemo(() => {
        return data.reduce((max, item) => {
            const signatoryCount = item.signatories?.length || 0;
            return Math.max(max, signatoryCount);
        }, 0);
    }, [data]);

    const transformedData = useMemo(() => {
        return data.map(item => {
            const transformed = {
                ...item,
                lwfState: item.lwfState,
                lwfLocation: item.lwfLocation,
                lwfRegistrationNumber: item.lwfRegistrationNumber,
                lwfRegistrationDate: item.lwfRegistrationDate,
                lwfRemmitanceMode: item.lwfRemmitanceMode,
                lwfRemmitanceFrequency: item.lwfRemmitanceFrequency,
                lwfUserId: item.lwfUserId,
                lwfPassword: item.lwfPassword,
            };

            for (let i = 0; i < maxSignatories; i++) {
                const signatory = item.signatories?.[i];
                transformed[`signatory_name_${i + 1}`] = signatory?.name || '';
                transformed[`signatory_role_${i + 1}`] = signatory?.Role?.name || '';
                transformed[`signatory_email_${i + 1}`] = signatory?.email || '';
                transformed[`signatory_mobile_${i + 1}`] = signatory?.mobile || '';
            }

            return transformed;
        });
    }, [data, maxSignatories]);

    const columns = useMemo(() => {
        const baseColumns = [
            {
                header: 'LWF State',
                enableSorting: false,
                accessorKey: 'Location.District.State.name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Location',
                enableSorting: false,
                accessorKey: 'Location.name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Registration Number',
                enableSorting: false,
                accessorKey: 'register_number',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Registration Date',
                enableSorting: false,
                accessorKey: 'register_date',
                cell: (props) => (
                    <div className="w-32 flex items-center justify-center">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>
                ),
            },
            {
                header: 'Remmitance Mode',
                enableSorting: false,
                accessorKey: 'remmit_mode',
                cell: (props) => (
                    <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Mobile',
                enableSorting: false,
                accessorKey: 'mobile_number',
                cell: (props) => (
                  <div className=" flex items-center justify-center">{props.getValue()}</div>
                ),
              },
              {
                header: 'Email',
                enableSorting: false,
                accessorKey: 'email',
                cell: (props) => (
                  <div className=" flex items-center justify-center">{props.getValue()}</div>
                ),
              },
            {
                header: 'User Name',
                enableSorting: false,
                accessorKey: 'username',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Password',
                enableSorting: false,
                accessorKey: 'password',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
        ];

        // for (let i = 0; i < maxSignatories; i++) {
        //     const signatoryNum = i + 1;
        //     baseColumns.push(
        //         {
        //             header: `Authorized Signatory ${signatoryNum}`,
        //             accessorKey: `signatory_name_${signatoryNum}`,
        //             cell: (props) => (
        //                 <div className="w-48 truncate">{props.getValue()}</div>
        //             ),
        //         },
        //         {
        //             header: `Designation ${signatoryNum}`,
        //             accessorKey: `signatory_role_${signatoryNum}`,
        //             cell: (props) => (
        //                 <div className="w-48 truncate">{props.getValue()}</div>
        //             ),
        //         },
        //         {
        //             header: `Email ${signatoryNum}`,
        //             accessorKey: `signatory_email_${signatoryNum}`,
        //             cell: (props) => (
        //                 <div className="w-48 truncate">{props.getValue()}</div>
        //             ),
        //         },
        //         {
        //             header: `Mobile ${signatoryNum}`,
        //             accessorKey: `signatory_mobile_${signatoryNum}`,
        //             cell: (props) => (
        //                 <div className="w-48 truncate">{props.getValue()}</div>
        //             ),
        //         }
        //     );
        // }

        baseColumns.push({
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
        });

        return baseColumns;
    }, [maxSignatories]);

    const openDialog = (item: LWFSetupData) => {
        setItemToDelete(item.id);
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
                setLoading(true)
                const res = await dispatch(deleteLwf(itemToDelete)).unwrap();
                if (res) {
                    toast.push(
                        <Notification title="Success" type="success">
                            LWF Setup deleted successfully
                        </Notification>
                    );
                    setDialogIsOpen(false);
                    setItemToDelete(null);
                    if (onRefresh) {
                        onRefresh();
                    }
                }
            } catch (error) {
                if (error.response?.data?.message) {
                    showErrorNotification(error.response.data.message);
                } else if (error.message) {
                    showErrorNotification(error.message);
                } else if (Array.isArray(error)) {
                    showErrorNotification(error);
                } else {
                    showErrorNotification(error);
                }
            } finally {
                setLoading(false)
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
                toast.push(
                    <Notification title="Success" type="success">
                        LWF Setup updated successfully
                    </Notification>
                );
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
                <div className="w-28 h-28">
                    <Lottie 
                        animationData={loadingAnimation} 
                        loop 
                        className="w-24 h-24"
                    />
                </div>
                <p className="text-lg font-semibold">
                    Loading Data...
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            {transformedData.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
               <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
               <p className="text-center">No Data Available</p>
             </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={transformedData}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ className: 'rounded-md' }}
                    loading={isLoading}
                    pagingData={{
                        total: pagination.total,
                        pageIndex: pagination.pageIndex,
                        pageSize: pagination.pageSize,
                    }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onPageSizeChange}
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
                <p>Are you sure you want to delete this LWF Setup?</p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDialogOk} loading={loading}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
                width={800}
                height={510}
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