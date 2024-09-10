
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification } from '@/components/ui';
import { MdEdit } from 'react-icons/md';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { dummyData, ComplianceData } from '@/views/IHRC/store/dummyData';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam } from '@/components/shared/DataTable';

const StatusOption = {
    statusOption: [
        { key: 'Complied', name: 'Complied' },
        { key: 'Not Complied', name: 'Not Complied' },
        { key: 'Not Applicable', name: 'Not Applicable' },
    ],
};

interface StatusOption {
    value: string;
    label: string;
}

interface DueComplianceTableProps {
    onUploadSingle: (complianceId: number, file: File | undefined, remark: string) => void;
    onUpdateStatus: (complianceId: number, newStatus: ComplianceData['Status']) => void;
}

const DueComplianceTable: React.FC<DueComplianceTableProps> = ({ onUploadSingle, onUpdateStatus }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [remark, setRemark] = useState('');
    const [selectedCompliance, setSelectedCompliance] = useState<ComplianceData | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<StatusOption | null>(null);
    const [tableData, setTableData] = useState<ComplianceData[]>(dummyData);
    const [displayData, setDisplayData] = useState<ComplianceData[]>([]);

    const [paginationData, setPaginationData] = useState({
        total: dummyData.length,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });
    useEffect(() => {
      const { pageIndex, pageSize, sort } = paginationData;
      let sortedData = [...tableData];
      if (sort.key) {
          sortedData.sort((a, b) => {
              if (a[sort.key as keyof ComplianceData] < b[sort.key as keyof ComplianceData]) return sort.order === 'asc' ? -1 : 1;
              if (a[sort.key as keyof ComplianceData] > b[sort.key as keyof ComplianceData]) return sort.order === 'asc' ? 1 : -1;
              return 0;
          });
      }
      const start = (pageIndex - 1) * pageSize;
      const end = start + pageSize;
      setDisplayData(sortedData.slice(start, end));
  }, [tableData, paginationData]);

    const openDialog = useCallback((compliance: ComplianceData) => {
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
            onUploadSingle(selectedCompliance.Compliance_ID, selectedFile || undefined, remark);
            
            // Update both tableData state and dummyData
            const updatedTableData = tableData.map(item => 
                item.Compliance_ID === selectedCompliance.Compliance_ID 
                    ? { ...item, Status: selectedStatus.value }
                    : item
            );
            setTableData(updatedTableData);

            const dummyDataIndex = dummyData.findIndex(item => item.Compliance_ID === selectedCompliance.Compliance_ID);
            if (dummyDataIndex !== -1) {
                dummyData[dummyDataIndex].Status = selectedStatus.value;
            }

            onUpdateStatus(selectedCompliance.Compliance_ID, selectedStatus.value as ComplianceData['Status']);
            toast.push(
                <Notification title="Success" type="success">
                    Compliance status updated successfully
                </Notification>
            );
        } else {
            console.warn('Submit clicked without selectedCompliance or selectedStatus');
        }
        onDialogClose();
    }, [selectedCompliance, selectedStatus, selectedFile, remark, onUploadSingle, onUpdateStatus, onDialogClose, tableData]);

    const onStatusChange = useCallback((value: StatusOption) => {
        setSelectedStatus(value);
    }, []);

    const columns: ColumnDef<ComplianceData>[] = useMemo(
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
              accessorKey: 'Default_Due_Date',
              cell: (props) => (
                  <div className="w-20">
                      {new Date(props.getValue() as string).toLocaleDateString()}
                  </div>
              ),
          },
          {
              header: 'Category',
              accessorKey: 'Compliance_Categorization',
              cell: ({ getValue }) => {
                  return <div className="w-28">{getValue<string>()}</div>;
              },
          },
            {
                header: 'Compliance Status',
                accessorKey: 'Status',
                cell: ({ getValue }) => {
                    const status = getValue<string>();
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
        setPaginationData(prev => ({ ...prev, pageIndex: page }));
    };

    const onSelectChange = (value: number) => {
        setPaginationData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
    };

    const onSort = (sort: OnSortParam) => {
        setPaginationData(prev => ({ ...prev, sort }));
    };

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={displayData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                pagingData={{
                  total: tableData.length,
                  pageIndex: paginationData.pageIndex,
                  pageSize: paginationData.pageSize,
              }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
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
