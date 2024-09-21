
import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip, toast, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import ESIEditedData from './ESIEditedData';

export interface ESISetupData {
    Company_Group_Name: string;
    Company_Name: string;
    esiCode: string;
    esiCodeType: string;
    esiCodeLocation: string;
    esiRegistrationDate: string;
    esiUserId?: string;
    esiPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    esiRegistrationCertificate?: File | null;
}

interface ESISetupTableProps {
  // Add any props if needed
}

const ESISetupTable: React.FC<ESISetupTableProps> = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ESISetupData | null>(null);

  const [data, setData] = useState<ESISetupData[]>([
    {
      Company_Group_Name: "IND Money",
      Company_Name: "India Shelter Pvt Ltd",
      esiCode: "ESI1234567890",
      esiCodeType: "Main",
      esiCodeLocation: "Delhi",
      esiRegistrationDate: "",
      esiUserId: "esiuser01",
      esiPassword: "********",
      authorizedSignatory: "Ajay Thakur",
      signatoryDesignation: "HR Head",
      signatoryMobile: "+91 9911223344",
      signatoryEmail: "AjayThakur@example.com",
    },
    {
      Company_Group_Name: "IND Money",
      Company_Name: "India Shelter Pvt Ltd",
      esiCode: "ESI0987654321",
      esiCodeType: "Main",
      esiCodeLocation: "Mumbai",
      esiRegistrationDate: "",
      esiUserId: "esiuser02",
      esiPassword: "********",
      authorizedSignatory: "Krishna Kumar Singh",
      signatoryDesignation: "Finance Manager",
      signatoryMobile: "+91 9922334455",
      signatoryEmail: "Krishna@example.com",
    },
    {
      Company_Group_Name: "IND Money",
      Company_Name: "India Shelter Pvt Ltd",
      esiCode: "ESI1122334455",
      esiCodeType: "Main",
      esiCodeLocation: "Bengaluru",
      esiRegistrationDate: "",
      esiUserId: "esiuser03",
      esiPassword: "********",
      authorizedSignatory: "Ajay Thakur",
      signatoryDesignation: "Legal Advisor",
      signatoryMobile: "+91 9933445566",
      signatoryEmail: "AjayThakur@example.com",
    }
  ]);
  
  const columns: ColumnDef<ESISetupData>[] = useMemo(
    () => [
      {
        header: 'Company Group Name',
        accessorKey: 'Company_Group_Name',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Company Name',
        accessorKey: 'Company_Name',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI Code Type',
        accessorKey: 'esiCodeType',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI Code',
        accessorKey: 'esiCode',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI Code Location',
        accessorKey: 'esiCodeLocation',
        cell: (props) => (
          <div className="w-36 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI User ID',
        accessorKey: 'esiUserId',
        cell: (props) => (
          <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI User Password',
        accessorKey: 'esiPassword',
        cell: (props) => (
          <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Authorized Signatory',
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

  const openEditDialog = (item: ESISetupData) => {
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
      const newData = [...data];
      newData.splice(itemToDelete, 1);
      setData(newData);
      setDialogIsOpen(false);
      setItemToDelete(null);
      openNotification('danger', 'ESI Setup deleted successfully');
    }
  };

  const handleEditConfirm = () => {
    const newData = [...data];
    const index = newData.findIndex(item => item === itemToEdit);
    if (index !== -1) {
      setEditDialogIsOpen(false);
      setItemToEdit(null);
      openNotification('success', 'ESI Setup updated successfully');
    }
  };

  return (
    <div className="relative">
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No ESI setup data available
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
          Are you sure you want to delete this ESI Setup?
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
        <h5 className="mb-4">Edit ESI Setup</h5>
        {itemToEdit && (
          <ESIEditedData
            initialData={itemToEdit}
            onClose={handleDialogClose}
            onSubmit={handleEditConfirm}
          />
        )}
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

export default ESISetupTable;