import React, { useCallback, useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification, Badge } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';

interface DueComplianceDataRow {
  Compliance_Instance_ID: number;
  Compliance_ID: number;
  Legislation: string;
  Location: string;
  Compliance_Categorization: string;
  Compliance_Header: string;
  Compliance_Description: string;
  Penalty_Description: string;
  Compliance_Applicability: string;
  Bare_Act_Text: string;
  Compliance_Clause: string;
  Compliance_Type: string;
  Compliance_Frequency: string;
  Compliance_Statutory_Authority: string;
  Approval_Required: string;
  Criticality: string;
  Penalty_Type: string;
  Default_Due_Date: string;
  First_Due_Date: string;
  Due_Date: Date;
  Scheduled_Frequency: string;
  Proof_Of_Compliance_Mandatory: string;
  Owner_Name: string;
  Approver_Name: string;
  Category: string;
  Status2: 'Due' | 'Upcoming';
  Status: 'Complied' | 'Not Complied' | 'NA' | 'Complied without Proof';
}

interface DueComplianceTableProps {
  data: DueComplianceDataRow[];
  onUploadSingle: (complianceId: number, file: File | undefined, remark: string) => void;
  onUpdateStatus: (complianceId: number, newStatus: DueComplianceDataRow['Status']) => void;
}

const DueComplianceTable: React.FC<DueComplianceTableProps> = ({ data, onUploadSingle, onUpdateStatus }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remark, setRemark] = useState('');
  const [selectedCompliance, setSelectedCompliance] = useState<DueComplianceDataRow | null>(null);

  const [tableData, setTableData] = useState({
    total: data.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  const openDialog = useCallback((compliance: DueComplianceDataRow) => {
    setSelectedCompliance(compliance);
    setDialogIsOpen(true);
  }, []);

  const onDialogClose = useCallback(() => {
    console.log('onDialogClose called');
    setDialogIsOpen(false);
    setSelectedFile(null);
    setRemark('');
    setSelectedCompliance(null);
  }, []);

  const onSubmit = useCallback(() => {
    console.log('onSubmit called');
    if (selectedCompliance) {
      console.log('Selected compliance:', selectedCompliance);
      onUploadSingle(selectedCompliance.Compliance_Instance_ID, selectedFile || undefined, remark);
      
      const newStatus = selectedCompliance.Proof_Of_Compliance_Mandatory === 'Yes' ? 'Complied' : 'Complied without Proof';
      onUpdateStatus(selectedCompliance.Compliance_Instance_ID, newStatus);

      toast.push(
        <Notification title="Success" type="success">
          Compliance status updated successfully
        </Notification>
      );
    } else {
      console.log('No compliance selected');
    }
    console.log('Calling onDialogClose from onSubmit');
    onDialogClose();
  }, [selectedCompliance, selectedFile, remark, onUploadSingle, onUpdateStatus, onDialogClose]);


  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const handleDownload = () => {
    toast.push(
      <Notification title="Success" type="success">
        All Documents downloaded successfully
      </Notification>
    );
  };

  const columns: ColumnDef<DueComplianceDataRow>[] = useMemo(
    () => [
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_ID',
        cell: (props) => (
          <div className="w-10 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Legislation',
        accessorKey: 'Legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-28 truncate">{value.length > 11 ? value.substring(0, 11) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Location',
        accessorKey: 'Location',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-20 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Compliance Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-20 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Due Date',
        accessorKey: 'Due_Date',
        cell: (props) => (
          <div className="w-14">
            {new Date(props.getValue() as Date).toLocaleDateString()}
          </div>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'Category',
        cell: ({ getValue }) => {
          return <div className="w-24">{getValue<string>()}</div>;
        },
      },
      {
        header: 'Status',
        accessorKey: 'Status2',
        cell: ({ getValue }) => {
          const status = getValue<DueComplianceDataRow['Status2']>();
          const badgeColor = status === 'Due' ? 'bg-red-500' : 'bg-yellow-500';
          const textColor = status === 'Due' ? 'text-red-500' : 'text-yellow-500';
          
          return (
            <div className="flex items-center w-28">
              <Badge className={`mr-2 ${badgeColor}`} />
              <div className={`font-semibold ${textColor}`}>{status}</div>
            </div>
          );
        },
      },
      {
        header: 'Compliance Status',
        accessorKey: 'Status',
        cell: ({ getValue }) => {
          const status = getValue<DueComplianceDataRow['Status']>();
          let statusColor = 'bg-yellow-500';
          let textColor = 'text-yellow-500';
          if (status === 'Not Complied') {
            statusColor = 'bg-red-500';
            textColor = 'text-red-500';
          }
          if (status === 'Complied') {
            statusColor = 'bg-green-500';
            textColor = 'text-green-500';
          }
          if (status === 'Complied without Proof') {
            return (
              <div className="flex items-center w-40">
                <Badge style={{backgroundColor: '#676bc5'}} className="mr-2" />
                <div style={{color: '#676bc5'}} className="font-semibold">{status}</div>
              </div>
            );
          }
          
          return (
            <div className="flex items-center w-40">
              <Badge className={`mr-2 ${statusColor}`} />
              <div className={`font-semibold ${textColor}`}>{status}</div>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const compliance = row.original;
          return (
            <div className='flex gap-2'>
              <Tooltip title="Change Compliance Status" placement="top">
                <Button
                  size="sm"
                  onClick={() => openDialog(compliance)}
                >
                  <MdEdit />
                </Button>
              </Tooltip>
              <Tooltip title="Download" placement="top">
                <Button size="sm" onClick={handleDownload}>
                  <HiDownload />
                </Button>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    []
  );

  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
  };

  const onSelectChange = (value: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
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
      />
<Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
      >
        <h5 className="mb-4">Change Compliance Status</h5>
        
        <Input 
          placeholder="Please Enter the Remarks" 
          textArea 
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="mb-4"
        />

        

        {selectedCompliance?.Proof_Of_Compliance_Mandatory === 'Yes' && (
          <Input
            type="file"
            onChange={onFileChange}
            className="mb-4"
          />
        )}
        {selectedCompliance && (
          <p className="mb-4 text-red-500">
            {selectedCompliance.Proof_Of_Compliance_Mandatory === 'Yes' ? '*Proof is mandatory' : ''}
          </p>
        )}

        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={onSubmit}>
            Confirm
          </Button>
        </div>
      </Dialog>
  </div>
  );
};

export default DueComplianceTable;