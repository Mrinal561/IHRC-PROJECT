
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable from '@/components/shared/DataTable';
import PTEditedData from './PTEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { PTSetupData } from '@/@types/PtSetup';
import dayjs from 'dayjs';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { deletePT } from '@/store/slices/ptSetup/ptSetupSlice';
import { useDispatch } from 'react-redux';

interface PTSetupTableProps {
  data: PTSetupData[];
    onRefresh?: () => void;
}

const PTSetupTable: React.FC<PTSetupTableProps> = ({ data , onRefresh}) => {
  const dispatch = useDispatch()
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<PTSetupData | null>(null);
  const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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
          <div className="w-48 truncate">{props.getValue()}</div>
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

  const openEditDialog = (item: PTSetupData) => {
    setItemToEdit(item);
    setEditDialogIsOpen(true);
        setEditingId(item.id);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setSuspendDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
  };

  const handleDialogOk = async () => {
    if (itemToDelete) {
      try {
        const res = await dispatch(deletePT(itemToDelete.id)).unwrap()
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
              PT Setup deleted successfully
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
          <Button variant="solid" onClick={handleDialogOk}>Delete</Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={editDialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
        width={1060}
        height={650}
      >
        <h5 className="mb-4">Edit PT Setup</h5>
        {itemToEdit && (
          <PTEditedData
             onRefresh={onRefresh}
            id={editingId}
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