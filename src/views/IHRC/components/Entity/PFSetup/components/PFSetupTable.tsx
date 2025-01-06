import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip, toast, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import PFEditedData from './PFEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { PFData } from '@/@types/pfData';
import dayjs from 'dayjs';


interface PFSetupTableProps {
  data: PFData[];
  onRefresh?: () => void;
  companyName: string;
  groupName: string;
  // onDelete: (index: number) => void;
  // onEdit: (index: number, newData: Partial<PFSetupData>) => void;
}

const PFSetupTable: React.FC<PFSetupTableProps> =  ({ data, onRefresh , companyName, groupName}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<PFSetupData>>({});
  const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const openSuspendDialog = (index: number) => {
    setSuspendDialogIsOpen(true);
};



  const columns: ColumnDef<PFData>[] = useMemo(
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
                onClick={() => openDialog(row.index)}
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
    setEditingId(item.id);
    setEditDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
    // setEditedData({});
  };

  const handleDialogOk = () => {
    if (itemToDelete !== null) {
      const newData = [...data];
      newData.splice(itemToDelete, 1);
      setData(newData);
      setDialogIsOpen(false);
      setItemToDelete(null);
      openNotification('danger', 'PF Setup deleted successfully');

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
        height={320}
      >
        <h5 className="mb-4">Edit PF Setup</h5>
        {/* Add your edit form fields here */}
        <PFEditedData
          onRefresh={onRefresh}
          id={editingId}
        initialData={itemToEdit}
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