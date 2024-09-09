

import React, { useCallback, useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification, Badge, Dropdown } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

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
  Status2: 'due' | 'Upcoming';
  Status: string;
}


interface DueComplianceTableProps {
  data: DueComplianceDataRow[];
  onUploadSingle: (complianceId: number, file: File | undefined, remark: string) => void;
  onUpdateStatus: (complianceId: number, newStatus: DueComplianceDataRow['Status']) => void;
}

const StatusOption = {
    statusOption: [
      { key: 'Complied', name: 'Complied' },
      { key: 'Not Complied', name: 'Not Complied' },
      { key: 'Not Applicable', name: 'Not Applicable' },
  ],
}

interface StatusOption {
  value: string;
  label: string;
}

const DueComplianceTable: React.FC<DueComplianceTableProps> = ({ data, onUploadSingle, onUpdateStatus }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remark, setRemark] = useState('');
  const [selectedCompliance, setSelectedCompliance] = useState<DueComplianceDataRow | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<StatusOption | null>(null);
      // const [complianceStatuses, setComplianceStatuses] = useState<Record<number, string>>({});


  const [tableData, setTableData] = useState({
    total: data.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  const openDialog = useCallback((compliance: DueComplianceDataRow) => {
    setSelectedCompliance(compliance);
    setSelectedStatus(compliance.Status ? { value: compliance.Status, label: compliance.Status } : null);
    setDialogIsOpen(true);
  }, []);

  const onDialogClose = useCallback(() => {
    setDialogIsOpen(false);
    setSelectedFile(null);
    setRemark('');
    setSelectedCompliance(null);
    setSelectedStatus(null);
  }, []);

  const onSubmit = useCallback(() => {
    if (selectedCompliance && selectedStatus) {
      console.log('Submitting:', { selectedCompliance, selectedStatus, remark });
      try {
        onUploadSingle(selectedCompliance.Compliance_Instance_ID, selectedFile || undefined, remark);
        console.log('Upload successful');
      } catch (error) {
        console.error('Error in onUploadSingle:', error);
        toast.push(
          <Notification title="Error" type="danger">
            Failed to upload file. Please try again.
          </Notification>
        );
        return;
      }

      try {
        onUpdateStatus(selectedCompliance.Compliance_Instance_ID, selectedStatus.value);
        console.log('Status update successful');
        toast.push(
          <Notification title="Success" type="success">
            Compliance status updated successfully
          </Notification>
        );
      } catch (error) {
        console.error('Error in onUpdateStatus:', error);
        toast.push(
          <Notification title="Error" type="danger">
            Failed to update status. Please try again.
          </Notification>
        );
        return;
      }
    } else {
      console.warn('Submit clicked without selectedCompliance or selectedStatus');
    }
    onDialogClose();
  }, [selectedCompliance, selectedFile, remark, selectedStatus, onUploadSingle, onUpdateStatus, onDialogClose]);





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



  const onStatusChange = useCallback((value: StatusOption) => {
    console.log('Status changed to:', value);
    setSelectedStatus(value);
  }, []);


  
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
        header: 'Criticality',
        accessorKey: 'Criticality',
        cell: (props) => {
            const criticality = props.getValue();
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
              <div className="w-20 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
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
              <div className="w-20 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Description',
        accessorKey: 'Compliance_Description',
        cell: (props) => (
          <Tooltip title={props.getValue() as string} placement="left">
            <div className="w-40 truncate">{(props.getValue() as string).substring(0, 30)}...</div>
          </Tooltip>
        ),
      },
      {
        header: 'Due Date',
        accessorKey: 'Due_Date',
        cell: (props) => (
          <div className="w-20">
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
        header: 'Compliance Status',
        accessorKey: 'Status',
        cell: ({ getValue }) => {
          const status = getValue<DueComplianceDataRow['Status']>();
          let textColor = 'text-gray-500';
          
          if (status === 'Not Complied') {
            textColor = 'text-red-500';
          } else if (status === 'Not Applicable') {
            textColor = 'text-yellow-500';
          } else if (status === 'Complied') {
            textColor = 'text-green-500';
          } else if (status === 'Complied With Delay') {
            textColor = 'text-blue-500';
          }
          
          return (
            <div className="flex items-center w-40">
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
            </div>
          );
        },
      },
    ],
    [openDialog]
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
          total: data.length,
          pageIndex: 1,
          pageSize: 10,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={(value: number) => {}}
      />
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
      >
        <h5 className="mb-4">Change Compliance Status</h5>
        <div className='flex items-center gap-3 mb-4'>
        <p className='font-semibold'>Select the Compliance status</p>

        <div className='w-40'>

        <OutlinedSelect
  label="Set Status"
  options={StatusOption.statusOption.map(option => ({
    value: option.key,
    label: option.name
  }))}
  value={selectedStatus}
  onChange={onStatusChange}
/>
          </div>
        </div>

        {selectedCompliance?.Proof_Of_Compliance_Mandatory === 'Yes' && (
          <>
            <label className='text-red-500'>*Please Upload The Proof Of Compliance:</label>
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
        )}
        {selectedCompliance?.Proof_Of_Compliance_Mandatory === 'No' && (
          <>
            <label>Please Upload The Proof Of Compliance:</label>
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
        )}
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
