import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { RiCloseLine, RiEyeLine } from 'react-icons/ri';
import { CiSquareRemove } from "react-icons/ci";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { 
    fetchUsers, 
    deleteUser, 
    updateUser,
    selectUsers,
    selectLoading
} from '@/store/slices/userEntity/UserEntitySlice';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from "@/@types/userEntity";
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import dayjs from 'dayjs';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';
import { HiOutlineViewGrid } from 'react-icons/hi'


const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);
    const [userTableData, setUserTableData] = useState([]);
    // const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    // const [dialogState, setDialogState] = useState({
    //     delete: false,
    //     edit: false,
    //     suspend: false,
    //     disable: false
    // });
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<UserData | null>(null);
    const [itemToEdit, setItemToEdit] = useState<UserData | null>(null);
    const [editedUserData, setEditedUserData] = useState<Partial<UserData>>({});



    const columns = useMemo(
        () => [
            {
                header: 'Company Group',
                accessorKey: 'CompanyGroup.name',
                cell: (props) => (
                    <div className="w-32 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'First Name',
                accessorKey: 'name',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            // {
            //     header: 'Last Name',
            //     accessorKey: 'last_name',
            //     cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            // },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            // {
            //     header: 'Password',
            //     accessorKey: 'password',
            //     cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            // },
            {
                header: 'Mobile Number',
                accessorKey: 'mobile',
                cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
            },
            // {
            //     header: 'Job Role',
            //     accessorKey: 'role_id',
            //     cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            // },
            {
                header: 'PAN',
                accessorKey: 'pan_card',
                cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Aadhar',
                accessorKey: 'aadhar_no',
                cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Date of Joining',
                accessorKey: 'joining_date',
                cell: (props) => <div className="w-32 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
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
                                onClick={() => openEditDialog(row.original)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Suspend User">
                            <Button
                                size="sm"
                                // onClick={() => openSuspendDialog(row.original)}
                                icon={<IoPersonRemoveOutline />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Disable Login">
                            <Button
                                size="sm"
                                // onClick={() => openDisableDialog(row.original)}
                                icon={<RiCloseLine />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete User">
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

    const handleDeleteConfirm = async () => {
        if (itemToDelete?.id) {
            try {
                const response = await dispatch(deleteUser(itemToDelete.id)).unwrap();
                
                if (response) {
                    handleDialogClose();
                    
                    const newTotal = tableData.total - 1;
                    const lastPage = Math.ceil(newTotal / tableData.pageSize);
                    const newPageIndex = tableData.pageIndex > lastPage ? lastPage : tableData.pageIndex;
                    
                    fetchUserData(newPageIndex, tableData.pageSize);
                    toast.push(
                        <Notification title="Success" type="success">
                            User deleted successfully
                        </Notification>
                    );
                }
            } catch (error: any) {
                if (error.response?.data?.message) {
                    showErrorNotification(error.response.data.message);
                } else if (error.message) {
                    showErrorNotification(error.message);
                } else {
                    showErrorNotification('An unexpected error occurred while deleting the user');
                }
            }
        }
    };

    // const handleEditConfirm = async () => {
    //     if (itemToEdit?.id) {
    //         try {
    //             const response = await dispatch(updateUser({
    //                 id: itemToEdit.id,
    //                 data: editedUserData
    //             })).unwrap();

    //             if (response) {
    //                 handleDialogClose();
    //                 toast.push(
    //                     <Notification title="Success" type="success">
    //                         User Edited successfully
    //                     </Notification>
    //                 );
    //                 fetchUserData(tableData.pageIndex, tableData.pageSize);
    //             }
    //         } catch (error: any) {
    //             if (error.response?.data?.message) {
    //                 showErrorNotification(error.response.data.message);
    //             } else if (error.message) {
    //                 showErrorNotification(error.message);
    //             } else {
    //                 showErrorNotification('An unexpected error occurred while updating the user');
    //             }
    //         }
    //     }
    // };

    const openDeleteDialog = (user: UserData) => {
        setItemToDelete(user);
        setDialogIsOpen(true);
    };
    // const openSuspendDialog = (index: number) => {
    //     setSuspendDialogIsOpen(true);
    // };
    // const openDisableDialog = (index: number) => {
    //     setDisableDialogIsOpen(true);
    // };

    const openEditDialog = (user: UserData) => {
        setItemToEdit(user);
        setEditedUserData(user);
        setEditDialogIsOpen(true);
    };



    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setEditedUserData({});
    };


    // const handleDialogOk = () => {
    //     if (itemToDelete !== null) {
    //         const newData = [...data];
    //         newData.splice(itemToDelete, 1);
    //         setData(newData);
    //         setDialogIsOpen(false);
    //         setItemToDelete(null);
    //         openNotification('danger', 'User deleted successfully');
    //     }
    // }
    // const suspendConfirm = () => {
    //     setSuspendDialogIsOpen(false)
    //     openNotification('success', 'User suspended successfully');
    // }
    // const disableConfirm = () => {
    //     setDisableDialogIsOpen(false);
    //     openNotification('success', 'User disable successfully');
    // }

    // const handleEditConfirm = () => {
    //     if (itemToEdit !== null) {
    //         const newData = [...data];
    //         newData[itemToEdit] = editedUser;
    //         setData(newData);
    //         setEditDialogIsOpen(false);
    //         setItemToEdit(null);
    //         setEditedUser({});
    //         openNotification('success', 'User updated successfully');
    //     }
    // };

    useEffect(() => {
        fetchUserData(1, 10)
    },[])

    const fetchUserData = async (page: number, size: number) => {
        setIsLoading(true);
        try{

            const { payload: data } = await dispatch(fetchUsers({page: page, page_size: size}));
        //     .unwrap()
        //     .catch((error: any) => {
        //       // Handle different error formats
        //       if (error.data?.data?.message) {
        //           // API error response
        //           showErrorNotification(error.data.data.message);
        //       } else if (error.message) {
        //           // Regular error object
        //           showErrorNotification(error.message);
        //       } else if (Array.isArray(error)) {
        //           // Array of error messages
        //           showErrorNotification(error);
        //       } else {
        //           // Fallback error message
        //           showErrorNotification('An unexpected error occurred. Please try again.');
        //       }
        //       throw error; // Re-throw to prevent navigation
        //   });
          if(data?.data){
              setUserTableData(data.data);
              setTableData((prev) => ({
                  ...prev,
                  total: data.paginate_data.totalResult,
                  pageIndex: data.paginate_data.page,
                }))
            }
        }
        catch(error) {
            console.error('Failed to fetch users:', error);
            // toast.push(
            //   <Notification title="Error" type="danger">
            //     Failed to fetch Users
            //   </Notification>
            // );
          } finally {
            setIsLoading(false);
          }
        }
    

       


    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });
    
    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
        fetchUserData(page, tableData.pageSize)
    };
    
    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
        fetchUserData(1, value)
    };


    if (isLoading) {
        console.log("Loading....................");
        
        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500  rounded-xl">
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
        <div className='relative'>
             {userTableData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
                <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-center">
        No Data Available
                </p>
      </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={userTableData}
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
                )}

             <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deleting User</h5>
                <p>
                Are you sure you want to delete the user "{itemToDelete?.name}"? 
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
                        Confirm
                    </Button>
                </div>
            </Dialog>

            {/* <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit User Details</h5>
                <div className="grid grid-cols-2 gap-4">
                    <OutlinedInput
                        label="First Name"
                        value={editedUserData.first_name || ''}
                        onChange={(value) => setEditedUserData(prev => ({ ...prev, first_name: value }))}
                    />
                    <OutlinedInput
                        label="Last Name"
                        value={editedUserData.last_name || ''}
                        onChange={(value) => setEditedUserData(prev => ({ ...prev, last_name: value }))}
                    />
                    <OutlinedInput
                        label="Email"
                        value={editedUserData.email || ''}
                        onChange={(value) => setEditedUserData(prev => ({ ...prev, email: value }))}
                    />
                    <OutlinedInput
                        label="Mobile"
                        value={editedUserData.mobile || ''}
                        onChange={(value) => setEditedUserData(prev => ({ ...prev, mobile: value }))}
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
                        Save Changes
                    </Button>
                </div>
            </Dialog> */}
            {/*
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
            */}
        </div>
    );
};

export default UserTable;