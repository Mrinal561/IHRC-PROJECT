import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Badge, Dialog, toast, Notification, Checkbox, Input } from '@/components/ui';
import { RiCheckLine, RiCloseLine, RiUploadLine, RiDownloadLine, RiEyeLine } from 'react-icons/ri';
import StatusTableFilter from './StatusTableFilter';
import StatusTableSearch from './StatusTableSearch';
import { useNavigate } from 'react-router-dom';
import { HiDownload } from 'react-icons/hi';
import CustomDateRangePicker from '../../../Home/components/CustomDateRangePicker';
// import { dummyData, ComplianceData } from '@/views/IHRC/store/dummyData';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface StatusTableProps {
  onFilterChange: (filter: string) => void;
  onSearch: (searchTerm: string) => void;
  onClearAll: () => void;
  currentFilter: string;
}

interface ComplianceData {
  id: number;
  uuid: string;
  ac_compliance_id: number;
  proof_document: string;
  status: string;
  compliance_detail: {
    header: string;
    legislation: string;
    description: string;
  };
  upload_date: string | null;
  first_due_date: string | null;
  due_date: string | null;
  data_status: string;
  uploaded_by: number;
  approved_by: number | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  UploadBy: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string | null;
  };
  ApprovedBy: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string | null;
  } | null;
  AssignedComplianceRemark: {
    id: number;
    compliance_data_id: number;
    remark: string;
    created_at: string;
  }[];
}


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



const statusColor: Record<string, string> = {
  Approved: 'bg-emerald-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

const StatusTable: React.FC<StatusTableProps> = ({
  onSearch,
  onClearAll,
  onFilterChange,
  currentFilter,
}) => {
  const [data, setData] = useState<ComplianceData[]>([]);
  const [filteredData, setFilteredData] = useState<ComplianceData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data_status, setDataStatus] = useState(['pending']);

  const fetchStatusData = async () => {
    console.log('Fetching status data...');
    
    setIsLoading(true);
    try {
      const response = await httpClient.get(endpoints.due.getAll(), {
        params: {
          data_status
        }
      });
      console.log('API Response:', response.data);
      setData(response.data);
      setFilteredData(response.data.data);
      console.log("the data after filter is :", filteredData)
    } catch (error) {
      console.error('Error fetching status data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setDataStatus([filter.toLowerCase()]);
    fetchStatusData();
    console.log('filtered data', filteredData)
  };

  useEffect(() => {
    console.log('Initial component mount - Fetching data...');
    fetchStatusData();
  }, [data_status]);

  // useEffect(() => {
  //   const filtered = currentFilter === 'ALL'
  //     ? data
  //     : data.filter(item => item.Status === currentFilter);
  //   setFilteredData(filtered);
  // }, [data, currentFilter]);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);

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
      selectedItems.has(item.id) ? { ...item, status: 'complied' } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
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
        selectedItems.has(item.id) ? { ...item, status: 'rejected' } : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
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
      handleStatusChange(currentRejectId, 'rejected');
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


  const BulkDownload = () => {
    toast.push(
      <Notification
        title="Downloaded Successfully"
        type="success"
      >
        <p>All Compliances Downloaded Successfully</p>
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  }


  const columns: ColumnDef<ComplianceData>[] = useMemo(
    () => [
      {
        header: ({ table }) => (
          <Checkbox
            checked={selectedItems.size === filteredData.length}
            onChange={() => {
              if (selectedItems.size === filteredData.length) {
                setSelectedItems(new Set());
              } else {
                setSelectedItems(new Set(filteredData.map(item => item.id)));
              }
            }}
          />
        ),
        id: 'select',
        cell: ({ row }) => (
          <Checkbox
            checked={selectedItems.has(row.original.id)}
            onChange={() => {
              setSelectedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(row.original.id)) {
                  newSet.delete(row.original.id);
                } else {
                  newSet.add(row.original.id);
                }
                return newSet;
              });
            }}
          />
        ),
      },
      {
        header: 'ID',
        accessorKey: 'ac_compliance_id',
        cell: (props) => (
          <div className="w-24 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Legislation',
        accessorKey: 'compliance_detail.legislation',
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
        header: 'Header',
        accessorKey: 'compliance_detail.header',
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
        header: 'Description',
        accessorKey: 'compliance_detail.description',
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
        accessorKey: 'data_status',
        cell: ({ row }) => {
          const status = row.original.data_status;
          const rejectionRemark =
            row.original.AssignedComplianceRemark &&
            row.original.AssignedComplianceRemark.length > 0
              ? row.original.AssignedComplianceRemark[0].remark
              : null;
          return (
            <div className="flex items-center">
              {status === 'rejected' && rejectionRemark ? (
                <Tooltip title={`Rejection Reason: ${rejectionRemark}`} placement="top">
                  <span className="text-red-500 font-semibold truncate">{status}</span>
                </Tooltip>
              ) : (
                <div className="w-24 font-semibold truncate">
                  {status === 'pending' ? (
                    <span className="text-yellow-500">{status}</span>
                  ) : (
                    <span className="text-green-500">{status}</span>
                  )}
                </div>
              )}
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const status = row.original.data_status;
          return (
            <div className="flex gap-2">
              {(status === 'pending' || status === 'rejected' || status === 'complied') && (
                <Tooltip title="View Compliance Detail">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/app/IHRC/compliance-status-list-detail/${row.original.id}`, {
                        state: row.original,
                      })
                    }
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
              )}
              {status === 'pending' && (
                <>
                  <Tooltip title="Approve Compliance">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(row.original.id, 'complied')}
                      icon={<RiCheckLine />}
                    />
                  </Tooltip>
                  <Tooltip title="Reject Compliance">
                    <Button
                      size="sm"
                      onClick={() => handleReject(row.original.id)}
                      icon={<RiCloseLine />}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [selectedItems, filteredData, handleStatusChange, handleReject, navigate]
  );
  const [tableData, setTableData] = useState({
    total: data.length,
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

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    // You can add filtering logic here based on the selected date range
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between my-8">
        <div className="flex flex-row items-center gap-4">
          {/* <StatusTableFilter onFilterChange={onFilterChange} currentFilter={currentFilter} /> */}
          <StatusTableFilter
        onFilterChange={handleFilterChange}
        currentFilter={data_status[0]}
      />
        </div>
        <div className="flex gap-2">
        <StatusTableSearch onSearch={onSearch} />

          <CustomDateRangePicker onApply={handleDateRangeApply} />
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
          <Button size='sm' icon={<HiDownload />} variant='solid' onClick={BulkDownload}>Download</Button>
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
        stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
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