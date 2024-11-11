
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Calendar, Dialog, Tooltip, Input, toast, Notification , Checkbox} from '@/components/ui';
import { HiBellAlert } from "react-icons/hi2";
import { MdEdit } from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { useDispatch, useSelector } from 'react-redux';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { updateApproverOwner, selectUpdateLoading, selectUpdateSuccess, resetUpdateStatus, selectUpdateError
 } from '@/store/slices/AssignedCompliance/assignedComplianceSlice';
import { fetchUsers } from '@/store/slices/userEntity/UserEntitySlice';
import { AppDispatch } from '@/store';

interface UserData {
  id: number;
  group_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  joining_date: string;
  role: string;
  aadhar_no: string;
  pan_card: string;
  auth_signatory: boolean;
  suspend: boolean;
  disable: boolean;
  CompanyGroup: {
    id: number;
    name: string;
  };
}

interface MasterCompliance {
  id: number;
  uuid: string;
  legislation: string;
  header: string;
  criticality: string;
  description: string;
  default_due_date: {
    first_date: string;
    last_date: string;
  };
}

interface Owner {
  id: number;
  first_name: string;
  email: string;
  last_name: string;
}
interface SelectOption {
  value: string;
  label: string;
}

interface ComplianceData {
  id: number;
  branch_id: number;
  mst_compliance_id: number;
  owner_id: number | null;
  approver_id: number | null;
  status: boolean;
  MasterCompliance: MasterCompliance;
  Owner: Owner | null;
  Approver: Owner | null;
}

interface AssignChecklistTableProps {
  data: ComplianceData[];
  loading: boolean;
  tableKey?: number;
  refreshTable: () => void;
  onSelectedIdsChange: (selectedIds: number[]) => void;
}

const AssignChecklistTable: React.FC<AssignChecklistTableProps> = ({ data, loading, tableKey, refreshTable, onSelectedIdsChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<ComplianceData>>({});
  // const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [reminderEmail, setReminderEmail] = useState('');
  const [tempDueDate, setTempDueDate] = useState<Date | string | null>(null);
  const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedOwnerOption, setSelectedOwnerOption] = useState<any>(null);
  const [selectedApproverOption, setSelectedApproverOption] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // const handleEditSave = async () => {
  //   if (activeRowId && (selectedOwnerOption !== null || selectedApproverOption !== null)) {
  //     const updateData = {
  //       owner_id: selectedOwnerOption?.value || 0,
  //       approver_id: selectedApproverOption?.value || 0
  //     };

  //     setIsUpdating(true);
  //     try {
  //       await dispatch(updateApproverOwner({
  //         id: activeRowId.toString(),
  //         data: updateData
  //       })).unwrap();
        
  //       toast.push(
  //         <Notification title="Success" type="success">
  //           Owner and Approver updated successfully
  //         </Notification>
  //       );
  //       setIsEditDialogOpen(false);
  //       setSelectedOwnerOption(null);
  //       setSelectedApproverOption(null);
  //       refreshTable();
  //     } catch (error) {
  //       console.log(error)
  //       toast.push(
  //         <Notification title="Error" type="danger">
  //           Failed to update owner and approver
  //         </Notification>
  //       );
  //       console.error('Error updating owner/approver:', error);
  //     } finally {
  //       setIsUpdating(false);
  //     }
  //   } else {
  //     toast.push(
  //       <Notification title="Warning" type="warning">
  //         Please select an owner or approver
  //       </Notification>
  //     );
  //   }
  // };
 
 
  const handleEditSave = async () => {
    if (activeRowId && (selectedOwnerOption !== null || selectedApproverOption !== null)) {
      const updateData: ApproverOwnerAssignedCompliances = {
        owner_id: selectedOwnerOption?.value || 0,
        approver_id: selectedApproverOption?.value || 0,
        assigned_compliance_id: [activeRowId] // Pass the active row ID in an array as expected by the type
      };
      console.log('INSIDE TABLE', updateData)
  
      setIsUpdating(true);
      try {
        await dispatch(updateApproverOwner({
          id: activeRowId.toString(),
          data: updateData
        })).unwrap();
        
        toast.push(
          <Notification title="Success" type="success">
            Owner and Approver updated successfully
          </Notification>
        );
        setIsEditDialogOpen(false);
        setSelectedOwnerOption(null);
        setSelectedApproverOption(null);
        refreshTable();
      } catch (error) {
        console.log(error)
        toast.push(
          <Notification title="Error" type="danger">
            Failed to update owner and approver
          </Notification>
        );
        console.error('Error updating owner/approver:', error);
      } finally {
        setIsUpdating(false);
      }
    } else {
      toast.push(
        <Notification title="Warning" type="warning">
          Please select an owner or approver
        </Notification>
      );
    }
  };
  const handleOwnerChange = (value: any) => {
    setSelectedOwnerOption(value);
  };

  const handleApproverChange = (value: any) => {
    setSelectedApproverOption(value);
  };


  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await httpClient.get(endpoints.user.getAll());
      console.log("Raw response:", response);
      
      if (response?.data?.data && Array.isArray(response.data.data)) {
        const mappedOptions = response.data.data.map((user: any) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: user.id
        }));
        
        console.log("Mapped options:", mappedOptions);
        setUserOptions(mappedOptions);
      } else {
        console.error("Invalid data structure:", response);
        toast.push(
          <Notification title="Error" type="danger">
            Invalid data format received
          </Notification>
        );
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to fetch users
        </Notification>
      );
    }
  };
  useEffect(() => {
    console.log("Updated userOptions:", userOptions);
  }, [userOptions]);
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
      // Convert Set to Array and notify parent
      onSelectedIdsChange(Array.from(newSet));
      return newSet;
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
      onSelectedIdsChange([]);
    } else {
      const allIds = data.map((item) => item.id);
      setSelectedItems(new Set(allIds));
      onSelectedIdsChange(allIds);
    }
  };

  
  const handleEditClick = (row: ComplianceData) => {
    setActiveRowId(row.id);
    setEditData({
      id: row.id,
      owner_id: row.owner_id,
      approver_id: row.approver_id,
    });
    
    // Set the initial selected options based on existing data
    const ownerOption = userOptions.find(option => option.value === row.owner_id);
    const approverOption = userOptions.find(option => option.value === row.approver_id);
    
    setSelectedOwnerOption(ownerOption || null);
    setSelectedApproverOption(approverOption || null);
    setIsEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setTempDueDate(null);
    setSelectedOwnerOption(null);
    setSelectedApproverOption(null);
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
              checked={selectedItems.has(row.original.id)}
              onChange={() => handleCheckboxChange(row.original.id)}
            />
          </div>
        ),
      },
      // {
      //   header: 'Instance ID',
      //   accessorKey: 'id',
      //   cell: (props) => <div className="w-24 text-start">{props.getValue()}</div>,
      // },
      {
        header: 'Compliance ID',
        accessorKey: 'MasterCompliance.record_id',
        cell: (props) => <div className="w-32 text-start">{props.getValue()}</div>,
      },
      {
        header: 'Legislation',
        accessorFn: (row) => row.MasterCompliance.legislation,
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
        accessorFn: (row) => row.MasterCompliance.criticality,
        cell: (props) => {
          const criticality = props.getValue() as string;
          return (
            <div className="w-24 font-semibold truncate">
              {criticality === 'high' ? (
                <span className="text-red-500">High</span>
              ) : criticality === 'medium' ? (
                <span className="text-yellow-500">Medium</span>
              ) : (
                <span className="text-green-500">Low</span>
              )}
            </div>
          );
        }
      },
      {
        header: 'Header',
        accessorFn: (row) => row.MasterCompliance.header,
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
        accessorFn: (row) => row.MasterCompliance.default_due_date.last_date,
        cell: ({ getValue }) => {
          const date = getValue<string>();
          return <div className="w-20">
            {new Date(date).toLocaleDateString()}
          </div>;
        },
      },
      {
        header: "Owner",
        accessorFn: (row) => row.Owner ? `${row.Owner.first_name} ${row.Owner.last_name}` : null,
        cell: ({ getValue }) => <div className="w-32">{getValue() || 'Not Assigned'}</div>,
      },
      {
        header: "Approver",
        accessorFn: (row) => row.Approver ? `${row.Approver.first_name} ${row.Approver.last_name}` : null,
        cell: ({ getValue }) => <div className="w-36">{getValue<string>() || 'Not Assigned'}</div>,
      },
      {
        header: 'Actions',
        id: 'actions',  
        cell: ({ row }) => (
          <div className='flex space-x-2'>
            <Tooltip title="View Compliance Detail" placement="top">
              <Button
                size="sm"
                onClick={() => navigate(`/app/IHRC/assign-list-detail/${row.original.mst_compliance_id}`, { state: row.original })}
                icon={<RiEyeLine />}
                className='hover:bg-transparent'
              />
            </Tooltip>
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
          </div>
        ),
      }
    ],
    [selectedItems, isAllSelected]
  );

  const [tableData, setTableData] = useState({
    total: data.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={loading}
        pagingData={{
          total: tableData.total,
          pageIndex: tableData.pageIndex,
          pageSize: tableData.pageSize,
        }}
        onPaginationChange={(page) => setTableData(prev => ({ ...prev, pageIndex: page }))}
        onSelectChange={(value) => setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }))}
        onSort={(sort) => setTableData(prev => ({ ...prev, sort }))}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
        selectable={true}
      />
<Dialog
        isOpen={isEditDialogOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
        className="max-w-md p-4"
      >
        <h5 className="mb-2 text-lg font-semibold">
          Compliance Instance ID:{' '}
          <span className="text-indigo-600">{editData.id}</span>
        </h5>
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Set Owner Name</label>
            <OutlinedSelect
              label="Set Owner Name"
              options={userOptions}
              value={selectedOwnerOption}
              onChange={handleOwnerChange}
            />
          </div>
          <div>
            <label className="block mb-2">Set Approver Name</label>
            <OutlinedSelect
              label="Set Approver Name"
              options={userOptions}
              value={selectedApproverOption}
              onChange={handleApproverChange}
            />
          </div>
        </div>
        <div className="mt-6 text-right">
          <Button 
            variant="solid" 
            onClick={handleEditSave}
            loading={isUpdating}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
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
          <Button variant="solid">  
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AssignChecklistTable;