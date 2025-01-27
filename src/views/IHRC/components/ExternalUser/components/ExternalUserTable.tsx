import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import DataTable from '@/components/shared/DataTable';

const dummyData = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    phoneNo: '+1-234-567-8900',
    company: 'Tech Corp',
    status: 'active'
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    phoneNo: '+1-234-567-8901',
    company: 'Digital Solutions',
    status: 'inactive'
  },
  {
    id: 3,
    username: 'bob_wilson',
    email: 'bob@example.com',
    phoneNo: '+1-234-567-8902',
    company: 'Innovation Inc',
    status: 'active'
  }
];

const ExternalUserTable = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleStatusToggle = (id, currentStatus) => {
    console.log(`Toggling status for user ${id} from ${currentStatus}`);
    // Add your status toggle logic here
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setItemToDelete(null);
  };

  const handleDialogConfirm = () => {
    console.log(`Deleting user ${itemToDelete}`);
    // Add your delete logic here
    setDialogIsOpen(false);
    setItemToDelete(null);
  };

  const columns = useMemo(
    () => [
      {
        header: 'Username',
        enableSorting: false,
        accessorKey: 'username',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Email',
        enableSorting: false,
        accessorKey: 'email',
        cell: (props) => (
          <div className="w-40 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Phone Number',
        enableSorting: false,
        accessorKey: 'phoneNo',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Company',
        enableSorting: false,
        accessorKey: 'company',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Status',
        enableSorting: false,
        accessorKey: 'status',
        cell: (props) => (
          <div className={`w-24 px-2 py-1 rounded-full text-center ${
            props.getValue() === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {props.getValue()}
          </div>
        ),
      },
      {
        header: 'Actions',
        enableSorting: false,
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Tooltip title={row.original.status === 'active' ? 'Deactivate' : 'Activate'}>
              <Button
                size="sm"
                variant="plain"
                onClick={() => handleStatusToggle(row.original.id, row.original.status)}
                icon={row.original.status === 'active' ? 
                  <IoCloseCircle className="text-red-500" /> : 
                  <IoCheckmarkCircle className="text-emerald-500" />
                }
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                size="sm"
                variant="plain"
                onClick={() => handleDelete(row.original.id)}
                icon={<FiTrash className="text-red-500" />}
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={dummyData}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
      />

      <Dialog
        isOpen={dialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Confirm Deletion</h5>
        <p>Are you sure you want to delete this user?</p>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleDialogConfirm}>
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ExternalUserTable;