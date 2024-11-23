// import React, { useMemo, useState } from 'react';
// import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
// import { FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import PTEditedData from './PTEditedData';
// import { IoPersonRemoveOutline } from 'react-icons/io5';
// import { PTSetupData } from '@/@types/PtSetup';



// interface PTSetupTableProps {
//   data: PTSetupData[];
//   // onDelete: (index: number) => void;
//   // onEdit: (index: number, newData: Partial<PTSetupData>) => void;
// }

// const PTSetupTable: React.FC<PTSetupTableProps> = ({ data }) => {
//   const [dialogIsOpen, setDialogIsOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<number | null>(null);
//   const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//   const [itemToEdit, setItemToEdit] = useState<number | null>(null);
//   const [editedData, setEditedData] = useState<Partial<PTSetupData>>({});
//   const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);

//   const openSuspendDialog = (index: number) => {
//     setSuspendDialogIsOpen(true);
// };

 
  
//   const columns = useMemo(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey: 'CompanyGroup.name',
//         cell: (props) => (
//           <div className="w-44 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Company',
//         accessorKey: 'Company.name',
//         cell: (props) => (
//           <div className="w-48 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT State',
//         accessorKey: 'ptState',
//         cell: (props) => (
//           <div className="w-36 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT Location',
//         accessorKey: 'ptLocation',
//         cell: (props) => (
//           <div className="w-36 text-start">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT Enrollment Number',
//         accessorKey: 'ptEnrollmentNumber',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT Registration Number',
//         accessorKey: 'ptRegistrationNumber',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT Registration Date',
//         accessorKey: 'ptRegistrationDate',
//         cell: (props) => (
//           <div className="w-48 flex items-center justify-center">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Remmitance Mode',
//         accessorKey: 'ptRemmitanceMode',
//         cell: (props) => (
//           <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT EC Frequency ',
//         accessorKey: 'ptecPaymentFrequency',
//         cell: (props) => (
//           <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'PT RC Frequency',
//         accessorKey: 'ptrcPaymentFrequency',
//         cell: (props) => (
//           <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'User ID',
//         accessorKey: 'ptUserId',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       {
//         header: 'Password',
//         accessorKey: 'ptPassword',
//         cell: (props) => (
//           <div className="w-48 truncate">{props.getValue() as string}</div>
//         ),
//       },
//       // {
//       //   header: 'Authorised Signatory',
//       //   accessorKey: 'authorizedSignatory',
//       //   cell: (props) => (
//       //     <div className="w-48 truncate">{props.getValue() as string}</div>
//       //   ),
//       // },
//       // {
//       //   header: 'Designation',
//       //   accessorKey: 'signatoryDesignation',
//       //   cell: (props) => (
//       //     <div className="w-48 truncate">{props.getValue() as string}</div>
//       //   ),
//       // },
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
//             <Tooltip title="Edit PF Setup">
//               <Button
//                 size="sm"
//                 onClick={() => openEditDialog(row.original)}
//                 icon={<MdEdit />}
//                 className="text-blue-500"
//               />
//             </Tooltip>
//             <Tooltip title="Delete PF Setup">
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

//   const openEditDialog = (item:PTSetupData) => {
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

//   // const handleDialogOk = () => {
//   //   if (itemToDelete !== null) {
//   //     // onDelete(itemToDelete);
//   //     const newData = [...data];
//   //     newData.splice(itemToDelete, 1);
//   //     setData(newData);
//   //     setDialogIsOpen(false);
//   //     setItemToDelete(null);
//   //     openNotification('danger', 'PT Setup deleted successfully');

//   //   }
//   // };

//   // const handleEditConfirm = () => {
//   //   if (itemToEdit !== null) {
//   //     const newData = [...data];
//   //     const index = newData.findIndex(item => item === itemToEdit);
//   //     if(index!== -1){
//   //     setEditDialogIsOpen(false);
//   //     setItemToEdit(null);
//   //     openNotification('success', 'PF Setup updated successfully');
//   //     // setEditedData({});
//   //     }
//   //   }
//   // };

//   return (
//     <div className="relative">
//       {data.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No PT setup data available
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
//           <Button variant="solid" >
//             Delete
//           </Button>
//         </div>
//       </Dialog>

//       <Dialog
//         isOpen={editDialogIsOpen}
//         onClose={handleDialogClose}
//         onRequestClose={handleDialogClose}
//         width={1060}
//         height={570}
//       >
//         <h5 className="mb-4">Edit PT Setup</h5>
//         {/* Add your edit form fields here */}
//         <PTEditedData
//           initialData={itemToEdit}
//           onClose={handleDialogClose} onSubmit={function (data: PTSetupData): void {
//             throw new Error('Function not implemented.');
//           } }        // onSubmit={handleEditConfirm}
//         />
//         <div className="text-right mt-6">
//           <Button
//             className="ltr:mr-2 rtl:ml-2"
//             variant="plain"
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" >
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default PTSetupTable;


import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable from '@/components/shared/DataTable';
import PTEditedData from './PTEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { PTSetupData } from '@/@types/PtSetup';
import dayjs from 'dayjs';

interface PTSetupTableProps {
  data: PTSetupData[];
}

const PTSetupTable: React.FC<PTSetupTableProps> = ({ data }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<PTSetupData | null>(null);
  const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);

  const openSuspendDialog = (index: number) => {
    setSuspendDialogIsOpen(true);
  };
  useEffect(()=>{
    console.log(data)
  },[])

  const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        {message}
      </Notification>
    );
  };

  const columns = useMemo(
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
        cell: (props: any) => (
          <div className="w-48 text-start">
           {props.getValue() as string}
          </div>
        ),
      },
      // {
      //   header: 'PT State',
      //   accessorKey: 'ptState',
      //   cell: (props: any) => (
      //     <div className="w-36 text-start">{props.getValue()}</div>
      //   ),
      // },
      {
        header: 'PT Location',
        accessorKey: 'Location.name',
        cell: (props: any) => (
          <div className="w-36 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'PT Enrollment Number(PTEC)',
        accessorKey: 'enroll_number',
        cell: (props: any) => (
          <div className="w-48 truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'PT Registration Number(PTRC)',
        accessorKey: 'register_number',
        cell: (props: any) => (
          <div className="w-48 truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'PT Registration Date',
        accessorKey: 'register_date',
        cell: (props: any) => (
          <div className="w-48 flex items-center justify-center">
           {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Remittance Mode',
        accessorKey: 'remmit_mode',
        cell: (props: any) => (
          <div className="w-40 flex items-center justify-center">
            {props.getValue()}
          </div>
        ),
      },
      // {
      //   header: 'PT EC Frequency',
      //   accessorKey: 'ptecPaymentFrequency',
      //   cell: (props: any) => (
      //     <div className="w-40 flex items-center justify-center">
      //       {props.getValue()}
      //     </div>
      //   ),
      // },
      // {
      //   header: 'PT RC Frequency',
      //   accessorKey: 'ptrcPaymentFrequency',
      //   cell: (props: any) => (
      //     <div className="w-40 flex items-center justify-center">
      //       {props.getValue()}
      //     </div>
      //   ),
      // },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: (props: any) => (
          <div className="w-48 truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'Password',
        accessorKey: 'password',
        cell: (props: any) => (
          <div className="w-48 truncate">{'********'}</div>
        ),
      },
      {
        header: 'Mobile',
        accessorKey: 'mobile',
        cell: (props: any) => (
          <div className="w-48 truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: (props: any) => (
          <div className="w-48 truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }: any) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Edit PT Setup">
              <Button
                size="sm"
                onClick={() => openEditDialog(row.original)}
                icon={<MdEdit />}
                className="text-blue-500"
              />
            </Tooltip>
            <Tooltip title="Delete PT Setup">
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

  const openEditDialog = (item: PTSetupData) => {
    setItemToEdit(item);
    setEditDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setSuspendDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
  };

  return (
    <div className="relative">
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No PT setup data available
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
          stickyHeader
          stickyFirstColumn
          stickyLastColumn
        />
      )}

      <Dialog
        isOpen={dialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Confirm Deletion</h5>
        <p>Are you sure you want to delete this PT Setup?</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid">Delete</Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={editDialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
        width={1060}
        height={570}
      >
        <h5 className="mb-4">Edit PT Setup</h5>
        {itemToEdit && (
          <PTEditedData
            initialData={itemToEdit}
            onClose={handleDialogClose}
            onSubmit={(data: PTSetupData) => {
              // Handle submit logic here
              handleDialogClose();
            }}
          />
        )}
      </Dialog>

      <Dialog
        isOpen={suspendDialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Confirm Suspension</h5>
        <p>Are you sure you want to suspend this user?</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid">Suspend</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default PTSetupTable;