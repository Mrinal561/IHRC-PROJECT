import React, { useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';

export interface PTSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    ptState: string;
    ptLocation: string;
    ptEnrollmentNumber: string;
    ptRegistrationNumber: string;
    ptRegistrationDate: string;
    ptRemmitanceMode: string;
    ptUserId?: string;
    ptPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    ptecPaymentFrequency: string;
    ptrcPaymentFrequency: string;
    lwfRegistrationCertificate?: File | null;
    ptrcUpload?: File | null;
}

interface ESISetupTableProps {
  data: PTSetupData[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newData: Partial<PTSetupData>) => void;
}

const PTSetupTable: React.FC<ESISetupTableProps> = ({ data, onDelete, onEdit }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<PTSetupData>>({});

  const columns: ColumnDef<PTSetupData>[] = useMemo(
    () => [
      {
        header: 'Company Group Name',
        accessorKey: 'Company_Group_Name',
        cell: (props) => (
          <div className="w-44 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Company Name',
        accessorKey: 'Company_Name',
        cell: (props) => (
          <div className="w-48 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PT State',
        accessorKey: 'ptState',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PT Location',
        accessorKey: 'ptLocation',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PT Enrollment Number',
        accessorKey: 'ptEnrollmentNumber',
        cell: (props) => (
          <div className="w-48 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PT Registration Number',
        accessorKey: 'ptRegistrationNumber',
        cell: (props) => (
          <div className="w-48 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PT Registration Date',
        accessorKey: 'ptRegistrationDate',
        cell: (props) => (
          <div className="w-48 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Remmitance Mode',
        accessorKey: 'ptRemmitanceMode',
        cell: (props) => (
          <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'User ID',
        accessorKey: 'ptUserId',
        cell: (props) => (
          <div className="w-48 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Password',
        accessorKey: 'ptPassword',
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
            <Tooltip title="Edit PF Setup">
              <Button
                size="sm"
                onClick={() => openEditDialog(row.index)}
                icon={<MdEdit />}
                className="text-blue-500"
              />
            </Tooltip>
            <Tooltip title="Delete PF Setup">
              <Button
                size="sm"
                onClick={() => openDialog(row.index)}
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

  const openDialog = (index: number) => {
    setItemToDelete(index);
    setDialogIsOpen(true);
  };

  const openEditDialog = (index: number) => {
    setItemToEdit(index);
    setEditedData(data[index]);
    setEditDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
    setEditedData({});
  };

  const handleDialogOk = () => {
    if (itemToDelete !== null) {
      onDelete(itemToDelete);
      setDialogIsOpen(false);
      setItemToDelete(null);
      openNotification('danger', 'PT Setup deleted successfully');

    }
  };

  const handleEditConfirm = () => {
    if (itemToEdit !== null) {
      onEdit(itemToEdit, editedData);
      setEditDialogIsOpen(false);
      setItemToEdit(null);
      setEditedData({});
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
      >
        <h5 className="mb-4">Edit PF Setup</h5>
        {/* Add your edit form fields here */}
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

export default PTSetupTable;