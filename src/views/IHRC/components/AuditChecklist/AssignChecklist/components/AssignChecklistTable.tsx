import React, { useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Calendar, Dialog, Tooltip, Select, Checkbox, Input, toast, Notification } from '@/components/ui';
import { HiBellAlert } from "react-icons/hi2";
import { MdEdit } from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { dummyData, ComplianceData } from '@/views/IHRC/store/dummyData';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

const AssignChecklistTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ComplianceData[]>(dummyData);
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<ComplianceData>>({});
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [reminderEmail, setReminderEmail] = useState('');
  const [tempDueDate, setTempDueDate] = useState<Date | string | null>(null);

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

  const handleEditClick = (row: ComplianceData) => {
    setActiveRowId(row.Compliance_Instance_ID);
    setEditData({
      Compliance_Instance_ID: row.Compliance_Instance_ID,
      Owner_Name: row.Owner_Name,
      Approver_Name: row.Approver_Name,
      Due_Date: row.Due_Date
    });
    setTempDueDate(row.Due_Date);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (activeRowId) {
      const updatedData = {
        ...editData,
        Due_Date: tempDueDate || editData.Due_Date
      };
      setData((prevData) =>
        prevData.map((item) =>
          item.Compliance_Instance_ID === activeRowId
            ? { ...item, ...updatedData }
            : item
        )
      );
      setIsEditDialogOpen(false);
      setActiveRowId(null);
      setEditData({});
      setTempDueDate(null);
    }
  };

  const handleBellClick = (row: ComplianceData) => {
    setActiveRowId(row.Compliance_Instance_ID);
    setReminderDate(null);
    setReminderEmail('');
    setIsReminderDialogOpen(true);
  };

  const handleReminderSave = () => {
    if (activeRowId && reminderDate && reminderEmail) {
      console.log(`Reminder set for compliance ID ${activeRowId} on ${reminderDate.toDateString()} to ${reminderEmail}`);
      
      toast.push(
        <Notification title="Success" type="success">
          Reminder set successfully
          <br />
          Date: {reminderDate.toDateString()}
          <br />
          Email: {reminderEmail}
        </Notification>,
        { placement: 'top-end' }
      );

      setIsReminderDialogOpen(false);
      setActiveRowId(null);
      setReminderDate(null);
      setReminderEmail('');
    } else {
      toast.push(
        <Notification title="Error" type="danger">
          Please fill in all fields
        </Notification>,
        { placement: 'top-end' }
      );
    }
  };

  const columns: ColumnDef<ComplianceData>[] = useMemo(
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
        cell: (props) => <div className="w-24 text-start">{props.getValue()}</div>,
      },
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_ID',
        cell: (props) => <div className="w-32 text-start">{props.getValue()}</div>,
      },
      {
        header: 'Legislation',
        accessorKey: 'Legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-32 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Criticality',
        accessorKey: 'Criticality',
        cell: (props) => {
          const criticality = props.getValue() as string;
          return (
            <div className="w-24 font-semibold truncate">
              {criticality === 'High' ? (
                <span className="text-red-500">{criticality}</span>
              ) : criticality === 'Medium' ? (
                <span className="text-yellow-500">{criticality}</span>
              ) : (
                <span className="text-green-500">{criticality}</span>
              )}
            </div>
          );
        }
      },
      {
        header: 'Location',
        accessorKey: 'Location',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-36 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-40 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Due Date',
        accessorKey: 'Due_Date',
        cell: ({ getValue }) => {
          const date = getValue<Date | string>();
          return <div className="w-20">
            {date instanceof Date ? date.toLocaleDateString() : date || ''}
          </div>;
        },
      },
      {
        header: "Owner's Name",
        accessorKey: 'Owner_Name',
        cell: ({ getValue }) => <div className="w-32">{getValue<string>()}</div>,
      },
      {
        header: "Approver's Name",
        accessorKey: 'Approver_Name',
        cell: ({ getValue }) => <div className="w-36">{getValue<string>()}</div>,
      },
      {
        header: 'Actions',
        id: 'actions',  
        cell: ({ row }) => (
          <div className='flex space-x-2'>
            <Tooltip title="Set Owner & Approver" placement="top">
              <Button
                size="sm"
                onClick={() => handleEditClick(row.original)}
                icon={<MdEdit />}
                className='hover:bg-transparent'
              />
            </Tooltip>
            <Tooltip title="Set Compliance Reminder" placement="top">
              <Button
                size="sm"
                onClick={() => handleBellClick(row.original)}
                icon={<HiBellAlert />}
                className='hover:bg-transparent text-red-500'
              />
            </Tooltip>
            <Tooltip title="View Compliance Detail" placement="top">
              <Button
                size="sm"
                onClick={() => navigate(`/app/IHRC/assign-list-detail/${row.original.Compliance_ID}`, { state: row.original })}
                icon={<RiEyeLine />}
                className='hover:bg-transparent'
              />
            </Tooltip>
          </div>
        ),
      }
    ],
    [selectedItems, isAllSelected]
  );

  const [tableData, setTableData] = useState({
    total: dummyData.length,
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
  const ownerOptions = useMemo(() => {
    return Array.from(new Set(dummyData.map(item => item.Owner_Name)))
      .filter(name => name) // Remove any undefined or empty names
      .map(name => ({ value: name, label: name }));
  }, []);
  const approverOptions = useMemo(() => {
    return Array.from(new Set(dummyData.map(item => item.Approver_Name)))
      .filter(name => name) // Remove any undefined or empty names
      .map(name => ({ value: name, label: name }));
  }, []);

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
        onClose={() => {
          setIsEditDialogOpen(false);
          setTempDueDate(null);
        }}
        onRequestClose={() => {
          setIsEditDialogOpen(false);
          setTempDueDate(null);
        }}
        className="max-w-md p-4"
      >
        <h5 className="mb-2 text-lg font-semibold">
          Compliance Instance ID:{' '}
          <span className="text-indigo-600">
            {editData.Compliance_Instance_ID}
          </span>
        </h5>
        <div className="space-y-6">
          <div>
            <label className="block mb-6">Set Owner Name</label>
            <OutlinedSelect
            label='Set Owner Name'
              options={ownerOptions}
              value={editData.Owner_Name ? { value: editData.Owner_Name, label: editData.Owner_Name } : null}
              onChange={(selectedOption) => setEditData({ ...editData, Owner_Name: selectedOption ? selectedOption.value : '' })}
              isClearable
            />
          </div>
          <div>
            <label className="block mb-6">Set Approver Name</label>
            <OutlinedSelect
            label="Set Approver Name"
              options={approverOptions}
              value={editData.Approver_Name ? { value: editData.Approver_Name, label: editData.Approver_Name } : null}
              onChange={(selectedOption) => setEditData({ ...editData, Approver_Name: selectedOption ? selectedOption.value : '' })}
              isClearable
            />
          </div>
          {(!editData.Due_Date || editData.Due_Date === '') && (
            <div>
              <label className="block mb-2">Set Due Date</label>
              {editData.Due_Date instanceof Date ? (
                <div>{editData.Due_Date.toLocaleDateString()}</div>
              ) : editData.Due_Date ? (
                <div>{editData.Due_Date}</div>
              ) : (
                <div></div>
              )}
              <Calendar 
                value={tempDueDate instanceof Date ? tempDueDate : undefined} 
                onChange={(date) => setTempDueDate(date)}
              />
            </div>
          )}
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