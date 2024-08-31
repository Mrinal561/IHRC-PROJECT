
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Badge, Dialog, toast, Notification, Checkbox, Input, DatePicker } from '@/components/ui';
import { RiCheckLine, RiCloseLine, RiUploadLine, RiDownloadLine, RiEyeLine } from 'react-icons/ri';
import StatusTableFilter from './StatusTableFilter';
import StatusTableSearch from './StatusTableSearch';
import { useNavigate } from 'react-router-dom';

interface StatusDataRow {
  Compliance_Id: number;
  Compliance_Header: string;
  Compliance_Status: string;
  Bare_Act_Text: string;
  Compliance_Instance_ID: number;
  Legislation: string;
}

interface StatusTableProps {
  onFilterChange: (filter: string) => void;
  onSearch: (searchTerm: string) => void;
  onClearAll: () => void;
  currentFilter: string;
}

const initialData: StatusDataRow[] = [
  { 
      Compliance_Id: 3237, 
      Compliance_Header: "Annual License Renewal", 
      Compliance_Status: "Complied",
      Bare_Act_Text: "Apply for the renewal of the annual license before the expiry date, along with the prescribed fee of fifty rupees.",
      Compliance_Instance_ID: 1002,
      Legislation: "Maharashtra Shops and Establishments Act 1948",
  },
  { 
      Compliance_Id: 3238, 
      Compliance_Header: "Health and Safety Inspection", 
      Compliance_Status: "Pending",
      Bare_Act_Text: "Schedule an inspection with the local health authority within thirty days to ensure compliance with safety standards.",
      Compliance_Instance_ID: 1003,
      Legislation: "Tamil Nadu Factories Act 1948",
  },
  { 
      Compliance_Id: 3239, 
      Compliance_Header: "Employee Welfare Fund Contribution", 
      Compliance_Status: "In Progress",
      Bare_Act_Text: "Deposit the employee welfare fund contribution of two percent of monthly wages to the designated fund within seven days of the end of the month.",
      Compliance_Instance_ID: 1004,
      Legislation: "Karnataka Shops and Establishments Act 1961",
  },
  { 
      Compliance_Id: 3240, 
      Compliance_Header: "Payment of Professional Tax", 
      Compliance_Status: "Complied",
      Bare_Act_Text: "Ensure payment of professional tax of one hundred rupees per employee by the 15th of each month.",
      Compliance_Instance_ID: 1005,
      Legislation: "West Bengal Professional Tax Act 1976",
  },
  { 
      Compliance_Id: 3241, 
      Compliance_Header: "Annual Return Filing", 
      Compliance_Status: "Pending",
      Bare_Act_Text: "File the annual return of business operations with the local municipal authority within sixty days of the end of the financial year.",
      Compliance_Instance_ID: 1006,
      Legislation: "Delhi Shops and Establishments Act 1954",
  },
  { 
      Compliance_Id: 3242, 
      Compliance_Header: "Labour Welfare Contributions", 
      Compliance_Status: "In Progress",
      Bare_Act_Text: "Contribute to the labour welfare fund at a rate of 1.5% of the total wages paid to employees by the end of each quarter.",
      Compliance_Instance_ID: 1007,
      Legislation: "Gujarat Labour Welfare Fund Act 1961",
  },
  { 
      Compliance_Id: 3243, 
      Compliance_Header: "Occupational Health Report", 
      Compliance_Status: "Rejected",
      Bare_Act_Text: "Submit an occupational health report to the health department every six months detailing employee health and safety measures.",
      Compliance_Instance_ID: 1008,
      Legislation: "Uttar Pradesh Factories Act 1948",
  },
  { 
      Compliance_Id: 3244, 
      Compliance_Header: "Wage Payment Records", 
      Compliance_Status: "Complied",
      Bare_Act_Text: "Maintain detailed records of wage payments and make them available for inspection upon request by labor inspectors.",
      Compliance_Instance_ID: 1009,
      Legislation: "Andhra Pradesh Shops and Establishments Act 1988",
  },
  { 
      Compliance_Id: 3245, 
      Compliance_Header: "Registration of New Establishment", 
      Compliance_Status: "In Progress",
      Bare_Act_Text: "Register a new establishment with the local labor department within thirty days of starting operations, including payment of a registration fee.",
      Compliance_Instance_ID: 1010,
      Legislation: "Kerala Shops and Establishments Act 1960",
  },
  { 
      Compliance_Id: 3246, 
      Compliance_Header: "Quarterly Tax Returns", 
      Compliance_Status: "Pending",
      Bare_Act_Text: "File quarterly tax returns detailing business income and expenditures by the end of the month following the end of each quarter.",
      Compliance_Instance_ID: 1011,
      Legislation: "Rajasthan Sales Tax Act 1994",
  },
  { 
      Compliance_Id: 3247, 
      Compliance_Header: "Fire Safety Certification", 
      Compliance_Status: "Complied",
      Bare_Act_Text: "Obtain a fire safety certification from the local fire department every year and ensure compliance with fire safety norms.",
      Compliance_Instance_ID: 1012,
      Legislation: "Haryana Fire Services Act 2009",
  }
];

const statusColor: Record<string, string> = {
  Complied: 'bg-emerald-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

const { DatePickerRange } = DatePicker;

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      <h5 className="mb-4">{title}</h5>
      <p>{message}</p>
      <div className="mt-6 text-right">
        <Button
          size="sm"
          className="mr-2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

const RejectDialog = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      <h5 className="mb-4">Reject Compliance</h5>
      <Input
        textArea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Remark"
      />
      <div className="mt-6 text-right">
        <Button
          size="sm"
          className="mr-2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={() => {
            onConfirm(reason);
            setReason('');
          }}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

const StatusTable: React.FC<StatusTableProps> = ({
  onSearch,
  onClearAll,
  onFilterChange,
  currentFilter,
}) => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = currentFilter === 'ALL'
      ? data
      : data.filter(item => item.Compliance_Status === currentFilter);
    setFilteredData(filtered);
  }, [data, currentFilter]);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedData = data.map((item) =>
      item.Compliance_Id === id
        ? { ...item, Compliance_Status: newStatus }
        : item
    );
    setData(updatedData);

    toast.push(
      <Notification
        title="Status Updated"
        type="success"
      >
        Compliance status updated to {newStatus}
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  };

  const handleBulkApprove = () => {
    const updatedData = data.map((item) =>
      selectedItems.has(item.Compliance_Id)
        ? { ...item, Compliance_Status: 'Complied' }
        : item
    );
    setData(updatedData);
    setSelectedItems(new Set());

    toast.push(
      <Notification
        title="Bulk Action Completed"
        type="success"
      >
        {selectedItems.size} items approved
      </Notification>,
      {
        placement: 'top-end',
      }
    );
    setIsConfirmDialogOpen(false);
  };

  const handleBulkReject = (reason: string) => {
    if (reason.trim()) {
      const updatedData = data.map((item) =>
        selectedItems.has(item.Compliance_Id)
          ? { ...item, Compliance_Status: 'Rejected' }
          : item
      );
      setData(updatedData);
      setSelectedItems(new Set());

      toast.push(
        <Notification
          title="Bulk Action Completed"
          type="success"
        >
          {selectedItems.size} items rejected
          <p>Reason: {reason}</p>
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    } else {
      toast.push(
        <Notification
          title="Bulk Reject Cancelled"
          type="warning"
        >
          Rejection cancelled. No reason provided.
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    }
    setIsRejectDialogOpen(false);
  };

  const handleReject = (id: number) => {
    setCurrentRejectId(id);
    setIsRejectDialogOpen(true);
  };

  const handleConfirmReject = (reason: string) => {
    if (currentRejectId !== null) {
      handleStatusChange(currentRejectId, 'Rejected');
      toast.push(
        <Notification
          title="Compliance Rejected"
          type="warning"
        >
          Compliance ID: {currentRejectId}
          <p>Reason: {reason}</p>
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    }
    setIsRejectDialogOpen(false);
    setCurrentRejectId(null);
  };

  const columns: ColumnDef<StatusDataRow>[] = useMemo(
    () => [
      {
        header: ({ table }) => (
          <Checkbox
            checked={selectedItems.size === filteredData.length}
            onChange={() => {
              if (selectedItems.size === filteredData.length) {
                setSelectedItems(new Set());
              } else {
                setSelectedItems(new Set(filteredData.map(item => item.Compliance_Id)));
              }
            }}
          />
        ),
        id: 'select',
        cell: ({ row }) => (
          <Checkbox
            checked={selectedItems.has(row.original.Compliance_Id)}
            onChange={() => {
              setSelectedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(row.original.Compliance_Id)) {
                  newSet.delete(row.original.Compliance_Id);
                } else {
                  newSet.add(row.original.Compliance_Id);
                }
                return newSet;
              });
            }}
          />
        ),
      },
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_Id',
        cell: (props) => (
          <div className="w-24 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Compliance Instance ID',
        accessorKey: 'Compliance_Instance_ID',
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
              <div className="w-24 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Bare Act Text',
        accessorKey: 'Bare_Act_Text',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-24 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Legislation',
        accessorKey: 'Legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-24 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'Compliance_Status',
        cell: ({ getValue }) => {
          const status = getValue<string>();
          return (
            <div className="flex items-center">
              <Badge className={statusColor[status]} />
              <span className="ml-2 rtl:mr-2 capitalize">{status}</span>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const status = row.original.Compliance_Status.toLowerCase();
          return (
            <div className="flex gap-2">
              {status === 'pending' && (
                <>
                  <Tooltip title="Approve">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(row.original.Compliance_Id, 'Complied')}
                      icon={<RiCheckLine />}
                    />
                  </Tooltip>
                  <Tooltip title="Reject">
                    <Button
                      size="sm"
                      onClick={() => handleReject(row.original.Compliance_Id)}
                      icon={<RiCloseLine />}
                    />
                  </Tooltip>
                </>
              )}
              {(status === 'pending' || status === 'rejected') && (
                <Tooltip title="View Details">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/IHRC/compliance-list-detail/${row.original.Compliance_Id}`, { state: row.original })}
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
              )}
              {(status === 'pending' || status === 'rejected') && (
                <Tooltip title="Download">
                  <Button
                    size="sm"
                    onClick={() => console.log('Download', row.original.Compliance_Id)}
                    icon={<RiDownloadLine />}
                  />
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ],
    [selectedItems, filteredData, handleStatusChange, handleReject, navigate]
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

  useEffect(() => {
    setTableData(prev => ({ ...prev, total: filteredData.length }));
  }, [filteredData]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between my-8">
        <div className="flex flex-row items-center gap-4">
          <StatusTableSearch onSearch={onSearch} />
          <StatusTableFilter onFilterChange={onFilterChange} currentFilter={currentFilter} />
        </div>
        <div className="flex gap-2">
          <DatePickerRange size='sm' placeholder="Select dates range" />
          <Button
            size="sm"
            onClick={() => setIsConfirmDialogOpen(true)}
            disabled={selectedItems.size === 0}
            variant='solid'
            color='emerald-600'
            className={`text-white ${selectedItems.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Bulk Approve
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRejectDialogOpen(true)}
            disabled={selectedItems.size === 0}
            variant='solid'
            color='red-600'
            className={`text-white ${selectedItems.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Bulk Reject
          </Button>
          <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
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
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleBulkApprove}
        title="Confirm Bulk Approval"
        message={`Are you sure you want to approve ${selectedItems.size} selected items?`}
      />
      <RejectDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
};

export default StatusTable;