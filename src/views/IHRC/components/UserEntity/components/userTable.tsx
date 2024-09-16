import React, { useMemo, useState } from 'react';
import { Table, Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { UserData, userDataSet } from '../../../store/dummyEntityData'; // Adjust the import path as needed
import { RiCloseLine, RiEyeLine } from 'react-icons/ri';
import { CiSquareRemove } from "react-icons/ci";
import { IoPersonRemoveOutline } from "react-icons/io5";


const UserTable: React.FC = () => {
    const [data, setData] = useState<UserData[]>(userDataSet);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);
    const [disableDialogIsOpen, setDisableDialogIsOpen] = useState(false);
    const [editedUser, setEditedUser] = useState<UserData>({});

    const columns: ColumnDef<UserData>[] = useMemo(
        () => [
            {
                header: 'First Name',
                accessorKey: 'FirstName',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Last Name',
                accessorKey: 'LastName',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Email',
                accessorKey: 'Email',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Username',
                accessorKey: 'UserName',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Mobile Number',
                accessorKey: 'MobileNum',
                cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Job Role',
                accessorKey: 'JobRole',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'DSC',
                accessorKey: 'Dsc',
                cell: (props) => <div className="w-24 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'DSC Validity',
                accessorKey: 'DscValidity',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'PAN',
                accessorKey: 'Pan',
                cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Aadhar',
                accessorKey: 'Aadhar',
                cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Date of Joining',
                accessorKey: 'DateOfJoin',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Tooltip title="View User Details">
                            <Button
                                    size="sm"
                                    icon={<RiEyeLine />}
                                    className="text-blue-500"
                                />
                        </Tooltip>
                        <Tooltip title="Edit User Details">
                            <Button
                                size="sm"
                                onClick={() => openEditDialog(row.index)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Suspend User">
                            <Button
                                size="sm"
                                onClick={() => openSuspendDialog(row.index)}
                                icon={<IoPersonRemoveOutline />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Disable Login">
                            <Button
                                size="sm"
                                onClick={() => openDisableDialog(row.index)}
                                icon={<RiCloseLine />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete User">
                            <Button
                                size="sm"
                                onClick={() => openDeleteDialog(row.index)}
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

    const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>
        )
    }

    const openDeleteDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };
    const openSuspendDialog = (index: number) => {
        setSuspendDialogIsOpen(true);
    };
    const openDisableDialog = (index: number) => {
        setDisableDialogIsOpen(true);
    };

    const openEditDialog = (index: number) => {
        setItemToEdit(index);
        setEditedUser(data[index]);
        setEditDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setEditedUser({});
        setSuspendDialogIsOpen(false);
        setDisableDialogIsOpen(false);
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            const newData = [...data];
            newData.splice(itemToDelete, 1);
            setData(newData);
            setDialogIsOpen(false);
            setItemToDelete(null);
            openNotification('danger', 'User deleted successfully');
        }
    };
    const suspendConfirm = () => {
        setSuspendDialogIsOpen(false)
        openNotification('success', 'User suspended successfully');
    }
    const disableConfirm = () => {
        setDisableDialogIsOpen(false);
        openNotification('success', 'User disable successfully');
    }

    const handleEditConfirm = () => {
        if (itemToEdit !== null) {
            const newData = [...data];
            newData[itemToEdit] = editedUser;
            setData(newData);
            setEditDialogIsOpen(false);
            setItemToEdit(null);
            setEditedUser({});
            openNotification('success', 'User updated successfully');
        }
    };

    const [tableData, setTableData] = useState({
        total: data.length,
        pageIndex: 1,
        pageSize: 5,
        query: '',
        sort: { order: '', key: '' },
    });
    
    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
    };
    
    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
    };

    return (
        <div className='relative'>
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No data available
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
                        pageIndex: tableData.pageIndex,
                        pageSize: tableData.pageSize,
                    }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
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
                <h5 className="mb-4">Confirm Deleting User</h5>
                <p>
                    Are you sure you want to delete this user? This action cannot be undone.
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
                isOpen={disableDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Disable Login</h5>
                <p>
                    Are you sure you want to disable this user? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={disableConfirm}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
            <Dialog
                isOpen={suspendDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Suspend User</h5>
                <p>
                    Are you sure you want to suspend this user? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={suspendConfirm}>
                        Confirm
                    </Button>
                </div>
            </Dialog>

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit User</h5>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(editedUser).map(([key, value], index) => (
                        <OutlinedInput
                            key={key}
                            label={key.replace(/([A-Z])/g, ' $1').trim()}
                            value={value as string}
                            onChange={(newValue: string) => setEditedUser(prev => ({ ...prev, [key]: newValue }))}
                        />
                    ))}
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

export default UserTable;