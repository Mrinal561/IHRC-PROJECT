import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip, toast, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import PFEditedData from './PFEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { PFData } from '@/@types/pfData';
import dayjs from 'dayjs';
import { deletePF } from '@/store/slices/pfSetup/pfSlice';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';

interface SignatoryData {
  signatory_id: number;
  dsc_validity: string;
  e_sign_status: string;
}

interface PFSetupTableProps {
  data: PFData[];
  onRefresh?: () => void;
  companyName: string;
  groupName: string;
  pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
};
onPaginationChange: (page: number) => void;
onPageSizeChange: (pageSize: number) => void;
  // onDelete: (index: number) => void;
  // onEdit: (index: number, newData: Partial<PFSetupData>) => void;
}

const PFSetupTable: React.FC<PFSetupTableProps> =  ({ data, onRefresh , companyName, groupName,pagination,onPageSizeChange,onPaginationChange}) => {
  const dispatch = useDispatch()
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<PFSetupData>>({});
  const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // Add these new state declarations
const [editedSignatoryData, setEditedSignatoryData] = useState<SignatoryData[]>([]);
const [editFormData, setEditFormData] = useState<PFData | null>(null);
  const openSuspendDialog = (index: number) => {
    setSuspendDialogIsOpen(true);
};



  const columns: ColumnDef<PFData>[] = useMemo(
    () => [
      // {
      //   header: 'Company Group',
      //   accessorKey: 'CompanyGroup.name',
      //   cell: (props) => (
      //     <div className="w-36 text-start">{props.getValue() as string}</div>
      //   ),
      // },
      // {
      //   header: 'Company',
      //   accessorKey: 'Company.name',
      //   cell: (props) => (
      //     <div className="w-36 text-start">{props.getValue() as string}</div>
      //   ),
      // },
      {
        header: 'PF Code',
        accessorKey: 'pf_code',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PF Code Location',
        accessorKey: 'Location.name',
        cell: (props) => (
          <div className="w-36 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PF Registration Date',
        accessorKey: 'register_date',
        cell: (props) => (
          <div className="w-44 flex items-center justify-center">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>
        ),
      },
      {
        header: 'PF User ID',
        accessorKey: 'id',
        cell: (props) => (
          <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      // {
      //   header: 'PF User Password',
      //   accessorKey: 'pfPassword',
      //   cell: (props) => (
      //     <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
      //   ),
      // },
      {
        header: 'Authorized Signatory',
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
        header: 'DSC Validity',
        accessorKey: 'dsc_validity',
        cell: (props) => (
          <div className="w-44 flex items-center justify-center">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>
        ),
      },
      {
        header: 'E Sign',
        accessorKey: 'e_sign_status',
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

  const openDialog = (index: number) => {
    setItemToDelete(index);
    setDialogIsOpen(true);
  };

  const openEditDialog = (item: PFData) => {
    // setItemToEdit(item);
    // setEditedData(data[index]);
    console.log(data)
    setEditingId(item.id);
    setEditDialogIsOpen(true);
    setEditFormData(item);
    console.log(item)
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
    setEditFormData(null);
    setEditedSignatoryData([]); 
    // setEditedData({});
  };

  const handleDialogOk = async () => {
    if (itemToDelete) {
      try {
        const res = await dispatch(deletePF(itemToDelete.id)).unwrap()
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
          setDialogIsOpen(false);
          toast.push(
            <Notification title="Success" type="success">
              PF Setup deleted successfully
            </Notification>
          );
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
      }
    }
  };
  const handleEditConfirm = () => {
    if (itemToEdit !== null) {
      // onEdit(itemToEdit, editedData);
      const newData = [...data];
      const index = newData.findIndex(item => item === itemToEdit);
      if(index !== -1){
      setEditDialogIsOpen(false);
      setItemToEdit(null);
      openNotification('success', 'PF Setup updated successfully');
      // setEditedData({});
      }
    }
  };

  return (
    <div className="relative">
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No PF setup data available
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          skeletonAvatarColumns={[0]}
          skeletonAvatarProps={{ className: 'rounded-md' }}
          loading={false}
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
        <p>
          Are you sure you want to delete this PF Setup?
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
        height={660}
      >
        <h5 className="mb-4">Edit PF Setup</h5>
        {/* Add your edit form fields here */}
        <PFEditedData
          onRefresh={onRefresh}
          id={editingId}
        initialData={editFormData}
        onClose={handleDialogClose}
        onSubmit={handleEditConfirm} />
        <div className="text-right mt-6">
          {/* <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleEditConfirm}>
            Confirm
          </Button> */}
        </div>
      </Dialog>
    </div>
  );
};

export default PFSetupTable;