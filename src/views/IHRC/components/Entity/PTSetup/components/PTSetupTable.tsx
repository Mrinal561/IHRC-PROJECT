import React, { useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import PTEditedData from './PTEditedData';
import { IoPersonRemoveOutline } from 'react-icons/io5';

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

const PTSetupTable: React.FC<ESISetupTableProps> = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<PTSetupData>>({});
  const [suspendDialogIsOpen, setSuspendDialogIsOpen] = useState(false);

  const openSuspendDialog = (index: number) => {
    setSuspendDialogIsOpen(true);
};

  const [data, setData] = useState<PTSetupData[]>([
    {
      Company_Group_Name: "IND Money",
      Company_Name: "India Shelter Pvt Ltd",
      ptState: "Rajasthan",
      ptLocation: "Jaipur",
      ptEnrollmentNumber: "RJ0012345678",
      ptRegistrationNumber: "REG-101",
      ptRegistrationDate: "2023-01-15",
      ptRemmitanceMode: "Online",
      ptUserId: "user123",
      ptPassword: "********",
      authorizedSignatory: "Amit Sharma",
      signatoryDesignation: "HR Manager",
      signatoryMobile: "+91 9556543210",
      signatoryEmail: "amit.sharma@example.com",
      ptecPaymentFrequency: "Yearly",
      ptrcPaymentFrequency: "Monthly",
      lwfRegistrationCertificate: null, // Assuming no file is uploaded
      ptrcUpload: null // Assuming no file is uploaded
    },
    {
      Company_Group_Name: "IND Money",
      Company_Name: "India Shelter Pvt Ltd",
      ptState: "Gujarat",
      ptLocation: "Ahmedabad",
      ptEnrollmentNumber: "GJ0098765432",
      ptRegistrationNumber: "REG-102",
      ptRegistrationDate: "2023-02-20",
      ptRemmitanceMode: "Online",
      ptUserId: "user124",
      ptPassword: "********",
      authorizedSignatory: "Ajay Patel",
      signatoryDesignation: "CFO",
      signatoryMobile: "+91 9877743210",
      signatoryEmail: "ajay.patel@example.com",
      ptecPaymentFrequency: "Yearly",
      ptrcPaymentFrequency: "Monthly",
      lwfRegistrationCertificate: new File([""], "lwf-certificate.pdf"), // Mock file
      ptrcUpload: new File([""], "ptrc-upload.pdf") // Mock file
    },
    {
      Company_Group_Name: "IND Money",
      Company_Name: "India Shelter Pvt Ltd",
      ptState: "Maharashtra",
      ptLocation: "Mumbai",
      ptEnrollmentNumber: "MH0123456789",
      ptRegistrationNumber: "REG-103",
      ptRegistrationDate: "2023-03-10",
      ptRemmitanceMode: "Offline",
      ptUserId: "user125",
      ptPassword: "********",
      authorizedSignatory: "Krishna Reddy",
      signatoryDesignation: "SEO",
      signatoryMobile: "+91 9874443210",
      signatoryEmail: "krishna.reddy@example.com",
      ptecPaymentFrequency: "Yearly",
      ptrcPaymentFrequency: "Monthly",
      lwfRegistrationCertificate: null, // Assuming no file is uploaded
      ptrcUpload: null // Assuming no file is uploaded
    }
  ]);
  
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
        header: 'PT EC Frequency ',
        accessorKey: 'ptecPaymentFrequency',
        cell: (props) => (
          <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'PT RC Frequency',
        accessorKey: 'ptrcPaymentFrequency',
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
      // {
      //   header: 'Authorised Signatory',
      //   accessorKey: 'authorizedSignatory',
      //   cell: (props) => (
      //     <div className="w-48 truncate">{props.getValue() as string}</div>
      //   ),
      // },
      // {
      //   header: 'Designation',
      //   accessorKey: 'signatoryDesignation',
      //   cell: (props) => (
      //     <div className="w-48 truncate">{props.getValue() as string}</div>
      //   ),
      // },
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
                onClick={() => openEditDialog(row.original)}
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

  const openEditDialog = (item:PTSetupData) => {
    setItemToEdit(item);
    // setEditedData(data[index]);
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
      // onDelete(itemToDelete);
      const newData = [...data];
      newData.splice(itemToDelete, 1);
      setData(newData);
      setDialogIsOpen(false);
      setItemToDelete(null);
      openNotification('danger', 'PT Setup deleted successfully');

    }
  };

  const handleEditConfirm = () => {
    if (itemToEdit !== null) {
      const newData = [...data];
      const index = newData.findIndex(item => item === itemToEdit);
      if(index!== -1){
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
        width={1060}
        height={570}
      >
        <h5 className="mb-4">Edit PT Setup</h5>
        {/* Add your edit form fields here */}
        <PTEditedData
        initialData={itemToEdit}
        onClose={handleDialogClose}
        onSubmit={handleEditConfirm} />
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