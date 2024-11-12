import React, { useCallback, useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification } from '@/components/ui';
import { RiEyeLine } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { HiDocumentDownload } from 'react-icons/hi';
import OutlinedSelect from '@/components/ui/Outlined';
import { updateStatus } from '@/store/slices/dueCompliance/statusUpdateSlice';
import { useDispatch } from 'react-redux';
import { StatusRequest } from '@/@types/status';
export type DueComplianceDetailData = {
  id: number;
  uuid: string;
  ac_compliance_id: number;
  proof_document: string | null;
  status: "pending" | "completed" | "due" | "overdue";
  compliance_detail: {
    id: number;
    uuid: string;
    legislation: string;
    category: string;
    penalty_type: string;
    default_due_date: {
      first_date: string;
      last_date: string;
    };
    scheduled_frequency: string;
    proof_mandatory: boolean;
    header: string;
    description: string;
    penalty_description: string;
    applicability: string;
    bare_act_text: string;
    type: string;
    clause: string;
    frequency: string;
    statutory_auth: string;
    approval_required: boolean;
    criticality: string;
    created_type: string;
    created_at: string;
    updated_at: string;
  };
  upload_date: string | null;
  first_due_date: string | null;
  due_date: string;
  data_status: string;
  uploaded_by: number | null;
  approved_by: number | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  UploadBy: {
    id: number;
   first_name: string,
  last_name: string,
  email: string,
  mobile: number,
  } | null;
  ApprovedBy: {
    id: number;
    name: string;
  } | null;
  AssignedComplianceRemark: Array<{
    id: number;
    remark: string;
    created_by: number;
    created_at: string;
    updated_at: string;
  }>;
};
const StatusOption = {
  statusOption: [
    { value: 'complied', label: 'Complied' },
    { value: 'not_complied', label: 'Not Complied' },
    { value: 'not_applicable', label: 'Not Applicable' },
],
}
 
interface ComplianceDetailTableProps {
  data: DueComplianceDetailData[];
  loading?: boolean;
  onViewDetail?: (compliance: DueComplianceDetailData) => void;
  onUpdateStatus?: (id: number, status: DueComplianceDetailData['status']) => void;
  onDownloadProof?: (documentUrl: string) => void;
  onDataUpdate?: () => void;
}
 
const ComplianceDetailTable: React.FC<ComplianceDetailTableProps> = ({
  data,
  loading = false,
  onViewDetail,
  onUpdateStatus,
  onDownloadProof,
  onDataUpdate
}) => {
  const [tableData, setTableData] = useState({
    total: data.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });
 
  const [selectedCompliance, setSelectedCompliance] = useState<DueComplianceDetailData | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<StatusOption | null>(null);
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remark, setRemark] = useState('');
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
 
 
 
 
    const onDialogClose = useCallback(() => {
    setDialogIsOpen(false);
    setSelectedFile(null);
    setSelectedCompliance(null);
    setSelectedStatus(null);
    setRemark('');
  }, []);
 
  const handleStatusUpdate = (compliance: DueComplianceDetailData) => {
    setSelectedCompliance(compliance);
    setIsStatusDialogOpen(true);
  };
  const onStatusChange = useCallback((value: StatusOption) => {
    console.log('Status changed to:', value);
    setSelectedStatus(value);
  }, []);
 
 
  const handleUpdateStatus = async () => {
    if (!selectedCompliance || !selectedStatus) {
      toast.push(
        <Notification title="Error" type="danger">
          Please select a status and provide a remark.
        </Notification>
      );
      return;
    }
 
    const formData = new FormData();
    formData.append('status', selectedStatus.value);
    formData.append('remark', remark);
 
    if (selectedCompliance.compliance_detail.proof_mandatory) {
      if (!selectedFile) {
        toast.push(
          <Notification title="Error" type="danger">
            Please upload the proof of compliance.
          </Notification>
        );
        return;
      }
      formData.append('document', selectedFile);
    } else if (selectedFile) {
      formData.append('document', selectedFile);
    }
 
    try {
      console.log(selectedFile);
      await dispatch(updateStatus({ id: selectedCompliance.id.toString(), data: formData })).unwrap();
      toast.push(
        <Notification title="Success" type="success">
          Status updated successfully.
        </Notification>
      );
      setIsStatusDialogOpen(false);
      onDialogClose();
 
      if (onDataUpdate) {
        onDataUpdate();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setIsStatusDialogOpen(false);
      toast.push(
        <Notification title="Error" type="danger">
          Error updating status.
        </Notification>
      );
    }
  };
 
 
  const getStatusBadgeColor = (status: DueComplianceDetailData['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'due':
        return 'text-blue-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
 
  const columns: ColumnDef<DueComplianceDetailData>[] = useMemo(
    () => [
      {
        header: 'Compliance ID',
        accessorKey: 'compliance_detail.record_id',
        cell: (props) => <div className="w-24 text-start">{props.getValue()}</div>,
      },
      {
        header: 'Legislation',
        accessorFn: (row) => row.compliance_detail.legislation,
        cell: (props) => (
          <Tooltip title={props.getValue() as string} placement="top">
            <div className="w-32 truncate">
              {((props.getValue() as string) || '').length > 20
                ? `${(props.getValue() as string).substring(0, 20)}...`
                : props.getValue()}
            </div>
          </Tooltip>
        ),
      },
      {
        header: 'Criticality',
        accessorFn: (row) => row.compliance_detail.criticality,
        cell: (props) => {
          const criticality = props.getValue() as string;
          return (
            <div className="w-24 font-semibold truncate">
              {criticality.toLowerCase() === 'high' ? (
                <span className="text-red-500">High</span>
              ) : criticality.toLowerCase() === 'medium' ? (
                <span className="text-yellow-500">Medium</span>
              ) : (
                <span className="text-green-500">Low</span>
              )}
            </div>
          );
        },
      },
      {
        header: 'Category',
        accessorFn: (row) => row.compliance_detail.category,
        cell: (props) => (
          <Tooltip title={props.getValue() as string} placement="top">
            <div className="w-32 truncate">{props.getValue()}</div>
          </Tooltip>
        ),
      },
      {
        header: 'Due Date',
        accessorKey: 'due_date',
        cell: (props) => (
          <div className="w-28">
            {new Date(props.getValue() as string).toLocaleDateString()}
          </div>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'data_status',
        cell: (props) => (
          <div className={`w-24 font-semibold ${getStatusBadgeColor(props.getValue() as DueComplianceDetailData['status'])}`}>
            {(props.getValue() as string).charAt(0).toUpperCase() + (props.getValue() as string).slice(1)}
          </div>
        ),
      },
      {
        header: 'Uploaded By',
        accessorFn: (row) => `${row.UploadBy?.first_name || ''} ${row.UploadBy?.last_name || ''}`.trim(),
        cell: (props) => (
          <div className="w-32">
            {props.getValue() || '--'}
          </div>
         
        ),
      },
     
      {
        header: 'Approved By',
        accessorFn: (row) => row.ApprovedBy?.name,
        cell: (props) => <div className="w-32">{props.getValue() || '--'}</div>,
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Tooltip title="View Details" placement="top">
              <Button
                size="sm"
                onClick={() => onViewDetail?.(row.original)}
                icon={<RiEyeLine />}
                className="hover:bg-transparent"
              />
            </Tooltip>
            <Tooltip title="Update Status" placement="top">
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(row.original)}
                icon={<MdEdit />}
                className="hover:bg-transparent"
              />
            </Tooltip>
            {row.original.proof_document && (
              <Tooltip title="Download Proof" placement="top">
                <Button
                  size="sm"
                  onClick={() => onDownloadProof?.(row.original.proof_document as string)}
                  icon={<HiDocumentDownload />}
                  className="hover:bg-transparent"
                />
              </Tooltip>
            )}
          </div>
        ),
      },
    ],
    [onViewDetail, onDownloadProof]
  );
 
  const handlePageChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
  };
 
  const handlePageSizeChange = (pageSize: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(pageSize), pageIndex: 1 }));
  };
 
  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={isLoading}
        pagingData={{
          total: tableData.total,
          pageIndex: tableData.pageIndex,
          pageSize: tableData.pageSize,
        }}
        onPaginationChange={handlePageChange}
        onSelectChange={handlePageSizeChange}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
 
<Dialog
        isOpen={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
      >
        <h5 className="mb-4">Change Compliance Status</h5>
        <div className='flex items-center gap-3 mb-4'>
          <p className='font-semibold'>Select the Compliance status</p>
          <div className='w-40'>
            <OutlinedSelect
              label="Set Status"
              options={StatusOption.statusOption.map(option => ({
                value: option.value,
                label: option.label
              }))}
              value={selectedStatus}
              onChange={onStatusChange}
            />
          </div>
        </div>
 
          <>
          {selectedCompliance?.compliance_detail.proof_mandatory ? (
    <label className='text-red-500'>*Please Upload The Proof Of Compliance:</label>
  ) : (
    <label>Please Upload The Proof Of Compliance:</label>
  )}
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                console.log('File selected:', file?.name);
                setSelectedFile(file);
              }}
              className="mb-4 mt-4"
            />
          </>
        <label className='mb-2'>Please Enter the Remark:</label>
        <Input
          placeholder="Remarks"
          textArea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="mb-4"
        />
 
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={() => {setIsStatusDialogOpen(false)
              onDialogClose();
            }}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleUpdateStatus}>  {/*  onClick={onSubmit} */}
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
 
export default ComplianceDetailTable