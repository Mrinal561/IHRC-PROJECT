import React, { useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Calendar, Dialog, Tooltip, Select, Checkbox, Input, toast, Notification } from '@/components/ui';
import { HiBellAlert } from "react-icons/hi2";

interface ChecklistDataRow {
  Compliance_Instance_ID: number;
  Compliance_ID: number;
  Compliance_Header: string;
  Due_Date: Date;
  Owner_Name: string;
  Approver_Name: string;
}

const initialData: ChecklistDataRow[] = [
  {
    Compliance_Instance_ID: 1001,
    Compliance_ID: 3236,
    Compliance_Header: 'Renewal of Registration',
    Due_Date: new Date('2024-09-15'),
    Owner_Name: 'Admin',
    Approver_Name: 'Shivesh Verma'
  },
  {
    Compliance_Instance_ID: 1002,
    Compliance_ID: 4501,
    Compliance_Header: 'Annual Renewal of License',
    Due_Date: new Date('2024-10-01'),
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma'
  },
  {
    Compliance_Instance_ID: 1003,
    Compliance_ID: 5602,
    Compliance_Header: 'Monthly Compliance Report',
    Due_Date: new Date('2024-09-05'),
    Owner_Name: 'Finance',
    Approver_Name: 'Shivesh Verma'
  },
  {
    Compliance_Instance_ID: 1004,
    Compliance_ID: 6789,
    Compliance_Header: 'Quarterly Wage Report',
    Due_Date: new Date('2024-10-15'),
    Owner_Name: 'Ravi Shankar Singh',
    Approver_Name: 'Shivesh Verma'
  },
  {
    Compliance_Instance_ID: 1005,
    Compliance_ID: 7890,
    Compliance_Header: 'Renewal of Trade License',
    Due_Date: new Date('2024-11-01'),
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma'
  }
];

const AssignChecklistTable: React.FC = () => {
  const [data, setData] = useState<ChecklistDataRow[]>(initialData);
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<ChecklistDataRow>>({});
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [reminderEmail, setReminderEmail] = useState('');

  const isAllSelected = useMemo(
    () => selectedItems.size === data.length,
    [selectedItems, data]
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(data.map((item) => item.Compliance_Instance_ID)));
    }
  };

  const handleEditClick = (row: ChecklistDataRow) => {
    setActiveRowId(row.Compliance_Instance_ID);
    setEditData({
      Compliance_Instance_ID: row.Compliance_Instance_ID,
      Owner_Name: row.Owner_Name,
      Approver_Name: row.Approver_Name
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (activeRowId) {
      setData((prevData) =>
        prevData.map((item) =>
          item.Compliance_Instance_ID === activeRowId
            ? { ...item, ...editData }
            : item
        )
      );
      setIsEditDialogOpen(false);
      setActiveRowId(null);
      setEditData({});
    }
  };

  const handleBellClick = (row: ChecklistDataRow) => {
    setActiveRowId(row.Compliance_Instance_ID);
    setReminderDate(null);
    setReminderEmail('');
    setIsReminderDialogOpen(true);
  };

  const handleReminderSave = () => {
    if (activeRowId && reminderDate && reminderEmail) {
      // Here you would typically send this data to your backend
      console.log(`Reminder set for compliance ID ${activeRowId} on ${reminderDate.toDateString()} to ${reminderEmail}`);
      
      // Show the toast notification with the new style
      toast.push(
        <Notification
          title="Success"
          type="success"
        >
          Reminder set successfully
          <br />
          Date: {reminderDate.toDateString()}
          <br />
          Email: {reminderEmail}
        </Notification>,
        {
          placement: 'top-end',
        }
      );

      setIsReminderDialogOpen(false);
      setActiveRowId(null);
      setReminderDate(null);
      setReminderEmail('');
    } else {
      // Show an error toast if any required field is missing
      toast.push(
        <Notification
          title="Error"
          type="danger"
        >
          Please fill in all fields
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    }
  };

  const EditIcon = () => (
    <span className="text-[#7c828e] hover:text-indigo-600">
      <svg
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        ></path>
      </svg>
    </span>
  );
  const columns: ColumnDef<ChecklistDataRow>[] = useMemo(
    () => [
      {
        header: ({ table }) => (
          <div className="w-2">
            <Checkbox
              checked={isAllSelected}
              onChange={handleSelectAllChange}
            />
          </div>
        ),
        id: 'select',
        cell: ({ row }) => (
          <div className="w-2">
            <Checkbox
              checked={selectedItems.has(row.original.Compliance_Instance_ID)}
              onChange={() => handleCheckboxChange(row.original.Compliance_Instance_ID)}
            />
          </div>
        ),
      },
      {
        header: 'Instance ID',
        accessorKey: 'Compliance_Instance_ID',
        cell: (props) => (
          <div className="w-16 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_ID',
        cell: (props) => (
          <div className="w-20 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Compliance Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-32 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Due Date',
        accessorKey: 'Due_Date',
        cell: ({ getValue }) => {
          const date = getValue<Date>();
          return <div className="w-28">{date.toLocaleDateString()}</div>;
        },
      },
      {
        header: "Owner's Name",
        accessorKey: 'Owner_Name',
        cell: ({ getValue }) => {
          return <div className="w-36">{getValue<string>()}</div>;
        },
      },
      {
        header: "Approver's Name",
        accessorKey: 'Approver_Name',
        cell: ({ getValue }) => {
          return <div className="w-36">{getValue<string>()}</div>;
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
            const value1= "Edit"
            const value2= "Reminder"
            return(

            <div className='flex space-x-2'>
            <Tooltip title={value1} placement="top">
            <Button
                size="sm"
                variant="plain"
                onClick={() => handleEditClick(row.original)}
                icon={<EditIcon />}
                className='hover:bg-transparent'
                />
            </Tooltip>
            <Tooltip title={value2} placement="top">
            <Button
                size="sm"
                variant="plain"
                onClick={() => handleBellClick(row.original)}
                icon={<HiBellAlert />}
                className='hover:bg-transparent text-red-500'
                />
            </Tooltip>
        </div>
        )
        },
      }
    ],
    [selectedItems, isAllSelected]
  );

  const [tableData, setTableData] = useState({
    total: initialData.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
  };

  const onSelectChange = (value: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
  };

  const onSort = (sort: OnSortParam) => {
    setTableData(prev => ({ ...prev, sort }));
  };

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={false}
        pagingData={{
          total: tableData.total,
          pageIndex: tableData.pageIndex,
          pageSize: tableData.pageSize,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />

      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onRequestClose={() => setIsEditDialogOpen(false)}
        className="max-w-md p-6"
      >
        <h5 className="mb-4 text-lg font-semibold">
          Compliance Instance ID: <span className="text-indigo-600">{editData.Compliance_Instance_ID}</span>
        </h5>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Set Owner</label>
            <Select
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'User', label: 'User' },
                { value: 'HR', label: 'HR' },
                { value: 'Finance User', label: 'Finance User' },
                { value: 'Ravi Shankar Singh', label: 'Ravi Shankar Singh' }
              ]}
              value={editData.Owner_Name ? { value: editData.Owner_Name, label: editData.Owner_Name } : null}
              onChange={(selectedOption) => setEditData({ ...editData, Owner_Name: selectedOption ? selectedOption.value : '' })}
              isClearable
            />
          </div>
          <div>
            <label className="block mb-2">Approver Name</label>
            <Select
              options={[
                { value: 'Shivesh Varma', label: 'Shivesh Varma' },
                { value: 'Amit Sharma', label: 'Amit Sharma' },
                { value: 'Priya Singh', label: 'Priya Singh' },
                { value: 'Ravi Kumar', label: 'Ravi Kumar' }
              ]}
              value={editData.Approver_Name ? { value: editData.Approver_Name, label: editData.Approver_Name } : null}
              onChange={(selectedOption) => setEditData({ ...editData, Approver_Name: selectedOption ? selectedOption.value : '' })}
              isClearable
            />
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button variant="solid" onClick={handleEditSave}>
            Save Changes
          </Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={isReminderDialogOpen}
        onClose={() => setIsReminderDialogOpen(false)}
        onRequestClose={() => setIsReminderDialogOpen(false)}
        className="max-w-md p-6"
      >
        <h5 className="mb-4 text-lg font-semibold">Set Reminder</h5>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Set Reminder Date</label>
            <Calendar
              value={reminderDate}
              onChange={(date) => setReminderDate(date)}
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <Input
              type="email"
              value={reminderEmail}
              onChange={(e) => setReminderEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button variant="solid" onClick={handleReminderSave}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AssignChecklistTable;
