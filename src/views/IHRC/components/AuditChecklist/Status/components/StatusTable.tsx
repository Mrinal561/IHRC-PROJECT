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
import { dummyData, ComplianceData } from '@/views/IHRC/store/dummyData';

interface StatusTableProps {
  onFilterChange: (filter: string) => void;
  onSearch: (searchTerm: string) => void;
  onClearAll: () => void;
  currentFilter: string;
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
  const [data, setData] = useState(dummyData);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = currentFilter === 'ALL'
      ? data
      : data.filter(item => item.Status === currentFilter);
    setFilteredData(filtered);
  }, [data, currentFilter]);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedData = data.map((item) =>
      item.Compliance_Instance_ID === id
        ? { ...item, Status: newStatus }
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
      selectedItems.has(item.Compliance_Instance_ID)
        ? { ...item, Status: 'Approved' }
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
        selectedItems.has(item.Compliance_Instance_ID)
          ? { ...item, Status: 'Rejected' }
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
                setSelectedItems(new Set(filteredData.map(item => item.Compliance_Instance_ID)));
              }
            }}
          />
        ),
        id: 'select',
        cell: ({ row }) => (
          <Checkbox
            checked={selectedItems.has(row.original.Compliance_Instance_ID)}
            onChange={() => {
              setSelectedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(row.original.Compliance_Instance_ID)) {
                  newSet.delete(row.original.Compliance_Instance_ID);
                } else {
                  newSet.add(row.original.Compliance_Instance_ID);
                }
                return newSet;
              });
            }}
          />
        ),
      },
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_ID',
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
        header: 'Location',
        accessorKey: 'Location',
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
        header: 'Header',
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
        header: 'Status',
        accessorKey: 'Status',
        cell: ({ row }) => {
          const status = row.original.Status;
          const rejectionRemark = row.original.Remark; // Assuming we add this field to our data structure
          return (
            <div className="flex items-center">
              {/* <Badge className={statusColor[status]} /> */}
              {status === 'Rejected' && rejectionRemark ? (
                <Tooltip title={`Rejection Reason: ${rejectionRemark}`} placement="top">
                  <span className="text-red-500 font-semibold truncate">{status}</span>
                </Tooltip>
              ) : (
                // <span className="ml-2 rtl:mr-2 capitalize">{status}</span>
                <div className="w-24 font-semibold truncate">
                {status === 'Pending' ? (
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
          const status = row.original.Status.toLowerCase();
          return (
            <div className="flex gap-2">
               {(status === 'pending' || status === 'rejected' || status === 'approved') && (
                <Tooltip title="View Compliance Detail">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/IHRC/compliance-status-list-detail/${row.original.Compliance_Instance_ID}`, { state: row.original })}
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
              )}
              {status === 'pending' && (
                <>
                  <Tooltip title="Approve Compliance">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(row.original.Compliance_Instance_ID, 'Approved')}
                      icon={<RiCheckLine />}
                    />
                  </Tooltip>
                  <Tooltip title="Reject Compliance">
                    <Button
                      size="sm"
                      onClick={() => handleReject(row.original.Compliance_Instance_ID)}
                      icon={<RiCloseLine />}
                    />
                  </Tooltip>
                </>
              )}
             
              {/* {(status === 'rejected') && (
                <Tooltip title="Download Compliance Report">
                  <Button
                    size="sm"
                    onClick={() => console.log('Download', row.original.Compliance_Instance_ID)}
                    icon={<RiDownloadLine />}
                  />
                </Tooltip>
              )} */}
            </div>
          );
        },
      },
    ],
    [selectedItems, filteredData, handleStatusChange, handleReject, navigate]
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
          <StatusTableFilter onFilterChange={onFilterChange} currentFilter={currentFilter} />
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