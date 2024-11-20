// import React, { useMemo, useState } from 'react';
// import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
// import { FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import LWFEditedData from './LWFEditedData';
// import { IoPersonRemoveOutline } from 'react-icons/io5';

// export interface LWFSetupData {
//     Company_Group_Name: string;
//     Company_Name: string;
//     lwfState: string;
//     lwfLocation: string;
//     lwfRegistrationNumber: string;
//     lwfRegistrationDate: string;
//     lwfRemmitanceMode: string;
//     lwfRemmitanceFrequency: string;
//     lwfUserId?: string;
//     lwfPassword?: string;
//     authorizedSignatory: string;
//     signatoryDesignation?: string;
//     signatoryMobile?: string;
//     signatoryEmail?: string;
//     lwfFrequency: string;
//     lwfPaymentDueDate: string;
//     lwfApplicableState: string;
//     lwfRegistrationCertificate?: File | null;
// }

// interface ESISetupTableProps {
//   data: LWFSetupData[];
//   // onDelete: (index: number) => void;
//   // onEdit: (index: number, newData: Partial<LWFSetupData>) => void;
// }

// const LWFSetupTable: React.FC<ESISetupTableProps> = () => {
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<number | null>(null);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToEdit, setItemToEdit] = useState<number | null>(null);
//   const [editedData, setEditedData] = useState<Partial<LWFSetupData>>({});
//   const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);

//   const openSuspendDialog = (index: number) => {
//     setSuspendDialogIsOpen(true);
// };

//   const [data, setData] = useState<LWFSetupData[]>([
//     {
//       Company_Group_Name: "IND Money",
//       Company_Name: "India shelter Pvt Ltd",
//       lwfState: "ANDHRA PRADESH",
//       lwfLocation: "Vishakapatnam",
//       lwfRegistrationNumber: "LWF12345",
//       lwfRegistrationDate: "2023-01-15",
//       lwfRemmitanceMode: "Online",
//       lwfRemmitanceFrequency: "Yearly",
//       lwfUserId: "user123",
//       lwfPassword: "********",
//       authorizedSignatory: "Amit",
//       signatoryDesignation: "HR Manager",
//       signatoryMobile: "+91 9876543210",
//       signatoryEmail: "Amit@example.com",
//       lwfFrequency: "Yearly",
//       lwfPaymentDueDate: "15th",
//       lwfApplicableState: "Vishakapatnam"
//     },
//     {
//       Company_Group_Name: "IND Money",
//       Company_Name: "India shelter Pvt Ltd",
//       lwfState: "CHHATTISGARH",
//       lwfLocation: "CHHATTISGARH",
//       lwfRegistrationNumber: "LWF67890",
//       lwfRegistrationDate: "2023-02-20",
//       lwfRemmitanceMode: "Offline",
//       lwfRemmitanceFrequency: "Yearly",
//       lwfUserId: "user2",
//       lwfPassword: "********",
//       authorizedSignatory: "Krishna Kumar Singh",
//       signatoryDesignation: "Finance Director",
//       signatoryMobile: "+91 9876543211",
//       signatoryEmail: "Krishna@example.com",
//       lwfFrequency: "Yearly",
//       lwfPaymentDueDate: "20th",
//       lwfApplicableState: "CHHATTISGARH"
//     },
//     {
//       Company_Group_Name: "IND Money",
//       Company_Name: "India shelter Pvt Ltd",
//       lwfState: "DELHI",
//       lwfLocation: "DELHI",
//       lwfRegistrationNumber: "LWF67890",
//       lwfRegistrationDate: "2023-02-20",
//       lwfRemmitanceMode: "Offline",
//       lwfRemmitanceFrequency: "Yearly",
//       lwfUserId: "user23",
//       lwfPassword: "********",
//       authorizedSignatory: "Ajay Thakur",
//       signatoryDesignation: "Finance Director",
//       signatoryMobile: "+91 9876543211",
//       signatoryEmail: "Ajay@example.com",
//       lwfFrequency: "Yearly",
//       lwfPaymentDueDate: "20th",
//       lwfApplicableState: "DELHI"
//     },
//     {
//       Company_Group_Name: "IND Money",
//       Company_Name: "India shelter Pvt Ltd",
//       lwfState: "TAMILNADU",
//       lwfLocation: "TAMILNADU",
//       lwfRegistrationNumber: "LWF67890",
//       lwfRegistrationDate: "2023-02-20",
//       lwfRemmitanceMode: "Online",
//       lwfRemmitanceFrequency: "Half Yearly",
//       lwfUserId: "user234",
//       lwfPassword: "********",
//       authorizedSignatory: "Ajay Thakur",
//       signatoryDesignation: "Finance Director",
//       signatoryMobile: "+91 9876543211",
//       signatoryEmail: "Ajay@example.com",
//       lwfFrequency: "Half Yearly",
//       lwfPaymentDueDate: "20th",
//       lwfApplicableState: "TAMILNADU"
//     }
//   ]);


//   const columns: ColumnDef<LWFSetupData>[] = useMemo(
//     () => [
//         {
//             header: 'Company Group',
//             accessorKey: 'Company_Group_Name',
//             cell: (props) => (
//               <div className="w-36 text-start">{props.getValue() as string}</div>
//             ),
//           },
//           {
//             header: 'Company',
//             accessorKey: 'Company_Name',
//             cell: (props) => (
//               <div className="w-36 text-start">{props.getValue() as string}</div>
//             ),
//           },
//       {
//         header: 'LWF State',
//         accessorKey: 'lwfState',
//         cell: (props) => (
//           <div className="w-36 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'LWF Location',
//         accessorKey: 'lwfLocation',
//         cell: (props) => (
//           <div className="w-36 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'LWF Frequency',
//         accessorKey: 'lwfFrequency',
//         cell: (props) => (
//           <div className="w-36 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'LWF Registration Number',
//         accessorKey: 'lwfRegistrationNumber',
//         cell: (props) => (
//           <div className="w-36 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'LWF Registration Date',
//         accessorKey: 'lwfRegistrationDate',
//         cell: (props) => (
//           <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Remmitance Mode',
//         accessorKey: 'lwfRemmitanceMode',
//         cell: (props) => (
//           <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'User ID',
//         accessorKey: 'lwfUserId',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Password',
//         accessorKey: 'lwfPassword',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Authorised Signatory',
//         accessorKey: 'authorizedSignatory',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Designation',
//         accessorKey: 'signatoryDesignation',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Mobile',
//         accessorKey: 'signatoryMobile',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Email',
//         accessorKey: 'signatoryEmail',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="Edit">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete">
//               <Button
//                 size="sm"
//                 onClick={() => openDialog(row.index)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <Tooltip title="Suspend User">
//                             <Button
//                                 size="sm"
//                                 onClick={() => openSuspendDialog(row.index)}
//                                 icon={<IoPersonRemoveOutline />}
//                                 className="text-blue-500"
//                             />
//                         </Tooltip>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
//     toast.push(
//         <Notification
//             title={type.charAt(0).toUpperCase() + type.slice(1)}
//             type={type}
//         >
//             {message}
//         </Notification>
//     )
// }

//   const openDialog = (index: number) => {
//     setItemToDelete(index);
//     setDialogIsOpen(true);
//   };

//   const openEditDialog = (item: LWFSetupData) => {
//     setItemToEdit(item);
//     // setEditedData(data[index]);
//     setEditDialogIsOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogIsOpen(false);
//     setEditDialogIsOpen(false);
//     setItemToDelete(null);
//     setItemToEdit(null);
//     // setEditedData({});
//   };

//   const handleDialogOk = () => {
//     if (itemToDelete !== null) {
//       const newData = [...data];
//       newData.splice(itemToDelete, 1);
//       setData(newData);
//       setDialogIsOpen(false);
//       setItemToDelete(null);
//       openNotification('danger', 'LWF Setup deleted successfully');
//     }
//   };

//   const handleEditConfirm = (editedData: LWFSetupData) => {
//     if (itemToEdit !== null) {
//       const newData = [...data];
//       const index = newData.findIndex(item => item === itemToEdit);
//       if (index !== -1) {
//         newData[index] = editedData;
//         setData(newData);
//         setEditDialogIsOpen(false);
//         setItemToEdit(null);
//         openNotification('success', 'LWF Setup updated successfully');
//       }
//     }
//   };

//   return (
//     <div className="relative">
//       {data.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No LWF setup data available
//         </div>
//       ) : (
//         <DataTable
//           columns={columns}
//           data={data}
//           skeletonAvatarColumns={[0]}
//           skeletonAvatarProps={{ className: 'rounded-md' }}
//           loading={false}
//           pagingData={{
//             total: data.length,
//             pageIndex: 1,
//             pageSize: 10,
//           }}
//           stickyHeader={true}
//           stickyFirstColumn={true}
//           stickyLastColumn={true}
//         />
//       )}

//       <Dialog
//         isOpen={dialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//       >
//         <h5 className="mb-4">Confirm Deletion</h5>
//         <p>
//           Are you sure you want to delete this PF Setup?
//         </p>
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleDialogOk}>
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//         width={800}
//         height={570}
//       >
//         <h5 className="mb-4">Edit LWF Setup</h5>
//         {/* Add your edit form fields here */}
//         <LWFEditedData
//           initialData={itemToEdit}
//           onClose={handleDialogClose}
//           onSubmit={handleEditConfirm}
//         />
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

// export default LWFSetupTable;


import React, { useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import LWFEditedData from './LWFEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';

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
    // onSuspend?: (index: number) => void;
}

const LWFSetupTable: React.FC<LWFSetupTableProps> = ({ 
    data,
    // onDelete,
    // onEdit,
    // onSuspend 
}) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<LWFSetupData | null>(null);
    const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);

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
            {
                header: 'Company Group',
                accessorKey: 'Company_Group_Name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'Company_Name',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF State',
                accessorKey: 'lwfState',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Location',
                accessorKey: 'lwfLocation',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Frequency',
                accessorKey: 'lwfFrequency',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Registration Number',
                accessorKey: 'lwfRegistrationNumber',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'LWF Registration Date',
                accessorKey: 'lwfRegistrationDate',
                cell: (props) => (
                    <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Remmitance Mode',
                accessorKey: 'lwfRemmitanceMode',
                cell: (props) => (
                    <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'User ID',
                accessorKey: 'lwfUserId',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Password',
                accessorKey: 'lwfPassword',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Authorised Signatory',
                accessorKey: 'authorizedSignatory',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Designation',
                accessorKey: 'signatoryDesignation',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Mobile',
                accessorKey: 'signatoryMobile',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Email',
                accessorKey: 'signatoryEmail',
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
                                onClick={() => openDialog(row.index)}
                                icon={<FiTrash />}
                                className="text-red-500"
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
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            onDelete?.(itemToDelete);
            setDialogIsOpen(false);
            setItemToDelete(null);
            openNotification('danger', 'LWF Setup deleted successfully');
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
                height={570}
            >
                <h5 className="mb-4">Edit LWF Setup</h5>
                {itemToEdit && (
                    <LWFEditedData
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