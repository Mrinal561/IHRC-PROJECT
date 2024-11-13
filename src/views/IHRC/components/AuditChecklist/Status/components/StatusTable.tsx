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
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useDispatch } from 'react-redux';
import { approveRejectComplianceStatus } from '@/store/slices/approveRejected/approveRejectSlice';

interface StatusTableProps {
  onFilterChange: (filter: string) => void;
  onSearch: (searchTerm: string) => void;
  onClearAll: () => void;
  currentFilter: string;
}

interface BulkActionData {
  status: string;
  compliace_data_id: number[];
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

interface RejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  currentRejectId: number | null;
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
        <Button size="sm" className="mr-2" onClick={onClose}>Cancel</Button>
        <Button variant="solid" size="sm" onClick={onConfirm}>Confirm</Button>
      </div>
    </Dialog>
  );
};

const RejectDialog: React.FC<RejectDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  currentRejectId 
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      <h5 className="mb-4">{currentRejectId !== null ? 'Reject Compliance' : 'Bulk Reject Compliances'}</h5>
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
          onClick={() => {
            setReason('');
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="solid" size="sm" onClick={handleConfirm}>
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<ComplianceData[]>([]);
  const [filteredData, setFilteredData] = useState<ComplianceData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data_status, setDataStatus] = useState(['pending']);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [selectedData, setSelectedData] = useState<BulkActionData>({
    status: '',
    compliace_data_id: []
  });

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
    } catch (error) {
      console.error('Error fetching status data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setDataStatus([filter.toLowerCase()]);
    fetchStatusData();
  };

  useEffect(() => {
    console.log('Fetching data due to update or status change...');
    fetchStatusData();
  }, [data_status, updateCounter]);

  const handleBulkApprove = async () => {
    const bulkData: BulkActionData = {
      status: 'approved',
      compliace_data_id: Array.from(selectedItems)
    };
    
    setIsProcessing(true);
    
    try {
      await dispatch(approveRejectComplianceStatus(bulkData)).unwrap();
      
      toast.push(
        <Notification title="Bulk Action Completed" type="success">
          {selectedItems.size} items approved successfully
        </Notification>,
        { placement: 'top-end' }
      );
      setUpdateCounter(prev => prev + 1);
    } catch (error) {
      console.error('Failed to approve compliances:', error);
      toast.push(
        <Notification title="Failed" type="danger">
          Failed to approve compliances
        </Notification>,
        { placement: 'top-end' }
      );
    } finally {
      setIsProcessing(false);
      setSelectedItems(new Set());
      setSelectedData({ status: '', compliace_data_id: [] });
      setIsConfirmDialogOpen(false);
    }
  };

  const handleBulkReject = async (reason: string) => {
    if (!reason) {
      toast.push(
        <Notification title="Rejection Cancelled" type="warning">
          Rejection cancelled. No reason provided.
        </Notification>,
        { placement: 'top-end' }
      );
      return;
    }

    const bulkData: BulkActionData = {
      status: 'rejected',
      compliace_data_id: currentRejectId !== null ? [currentRejectId] : Array.from(selectedItems)
    };
    
    console.log('Reject Data:', bulkData);
    setIsProcessing(true);
    
    try {
      const res = await dispatch(approveRejectComplianceStatus(bulkData)).unwrap();

      if(res) {
        toast.push(
          <Notification title="Status Updated" type="success">
            {currentRejectId !== null ? 'Compliance' : `${selectedItems.size} items`} rejected successfully
            <p>Reason: {reason}</p>
          </Notification>,
          { placement: 'top-end' }
        );
        setUpdateCounter(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to reject compliance(s):', error);
      toast.push(
        <Notification title="Failed" type="danger">
          Failed to reject compliance(s)
        </Notification>,
        { placement: 'top-end' }
      );
    } finally {
      setIsProcessing(false);
      if (currentRejectId === null) {
        setSelectedItems(new Set());
        setSelectedData({ status: '', compliace_data_id: [] });
      }
      setIsRejectDialogOpen(false);
      setCurrentRejectId(null);
    }
  };

  const handleSingleApprove = async (id: number) => {
    const singleApproveData: BulkActionData = {
      status: 'approved',
      compliace_data_id: [id]
    };
    
    setIsProcessing(true);
    
    try {
      await dispatch(approveRejectComplianceStatus(singleApproveData)).unwrap();
      
      toast.push(
        <Notification title="Status Updated" type="success">
          Compliance status updated to approved
        </Notification>,
        { placement: 'top-end' }
      );
      
      setUpdateCounter(prev => prev + 1);
    } catch (error) {
      console.error('Failed to approve compliance:', error);
      toast.push(
        <Notification title="Failed" type="danger">
          Failed to approve compliance
        </Notification>,
        { placement: 'top-end' }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = (id: number) => {
    setCurrentRejectId(id);
    setIsRejectDialogOpen(true);
  };

  const BulkDownload = () => {
    toast.push(
      <Notification title="Downloaded Successfully" type="success">
        <p>All Compliances Downloaded Successfully</p>
      </Notification>,
      { placement: 'top-end' }
    );
  };

  const handleBulkSelection = (isSelectAll: boolean) => {
    if (isSelectAll) {
      const allIds = filteredData.map(item => item.id);
      setSelectedItems(new Set(allIds));
      setSelectedData(prev => ({
        ...prev,
        compliace_data_id: allIds
      }));
    } else {
      setSelectedItems(new Set());
      setSelectedData(prev => ({
        ...prev,
        compliace_data_id: []
      }));
    }
  };

  const handleSingleSelection = (id: number, checked: boolean) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });

    setSelectedData(prev => ({
      ...prev,
      compliace_data_id: checked 
        ? [...prev.compliace_data_id, id]
        : prev.compliace_data_id.filter(itemId => itemId !== id)
    }));
  };

  const columns: ColumnDef<ComplianceData>[] = useMemo(
    () => [
      {
        header: ({ table }) => (
          filteredData.some((item) => item.data_status === 'pending') ? (
            <Checkbox
              checked={selectedItems.size === filteredData.length}
              onChange={(checked: boolean) => handleBulkSelection(selectedItems.size !== filteredData.length)}
            />
          ) : (
            <div />
          )
        ),
        id: 'select',
        cell: ({ row }) => (
          row.original.data_status === 'pending' ? (
            <Checkbox
              checked={selectedItems.has(row.original.id)}
              onChange={(checked: boolean) => handleSingleSelection(row.original.id, checked)}
            />
          ) : (
            <div />
          )
        )
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
                      onClick={() => handleSingleApprove(row.original.id)}
                      icon={<RiCheckLine />}
                      disabled={isProcessing}
                    />
                  </Tooltip>
                  <Tooltip title="Reject Compliance">
                    <Button
                      size="sm"
                      onClick={() => handleReject(row.original.id)}
                      icon={<RiCloseLine />}
                      disabled={isProcessing}
                    />
                  </Tooltip>
                </>
              )}
            </div>
          );
        },
      },
      // ... rest of the columns remain the same
    ],
    [selectedItems, filteredData, handleBulkSelection, handleSingleSelection]
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
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between my-8">
        <div className="flex flex-row items-center gap-4">
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
            onClick={() => {
              setCurrentRejectId(null);
              setIsRejectDialogOpen(true);
            }}
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
  onConfirm={handleBulkReject}
  currentRejectId={currentRejectId}
/>
    </div>
  );
};

export default StatusTable;