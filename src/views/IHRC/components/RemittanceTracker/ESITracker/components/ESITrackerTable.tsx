import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import ESITrackerEditDialog from './ESITrackerEditDialog';
import ESIConfigDropdown from './ESIConfigDropDown'
import { PfChallanData } from '@/@types/pfTracker';
import { esiChallanData } from '@/@types/esiTracker';
import dayjs from 'dayjs';
import { HiOutlineViewGrid } from 'react-icons/hi';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';

interface EsiTrackerTableProps {
    dataSent: PfChallanData[];
    loading: boolean
    onRefresh?: () => void;
     pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  }

const ESITrackerTable: React.FC<EsiTrackerTableProps> =({ 
  dataSent, 
  loading = false, 
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange
}) => {
    // const [data, setData] = useState<ESITrackerData[]>(sampleData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingData, setEditingData] = useState<PfChallanData | null>(null);

    const handleEdit = (row: PfChallanData) => {
        setEditingData(row);
        setEditDialogOpen(true);
    };

    const handleEditSubmit = (editedData: PfChallanData) => {
        // setData((prevData) =>
        //     prevData.map((item) =>
        //         item === editingData ? editedData : item
        //     )
        // );
        setEditDialogOpen(false);
        setEditingData(null);
    };

    
    // useEffect(() => {
    //     fetchEsiTrackerData(1, 10);
    //   }, []);
      
    //   const fetchEsiTrackerData = async (page: number, size: number) => {
    //     const {payload: data} = await dispatch(fetchEsiTracker({page: page, page_size: size}));
    //     setEsiTrackerTableData(data.data)
    //     console.log(esiTrackerTableData);
        
    //     setTableData((prev) => ({
    //       ...prev,
    //       total: data?.paginate_data.totalResult,
    //       pageIndex: data?.paginate_data.page,
    //     }))
    //     // refreshData();
    //   }

    const columns: ColumnDef<esiChallanData>[] = useMemo(
        () => [
            {
                header: 'Company',
                accessorKey: 'EsiSetup.Company.name',
                cell: (props) => (
                    <div className="w-52 truncate">
                        {props.getValue() as string}
                    </div>
                ),
            },
            {
                header: 'ESI Code',
                accessorKey: 'EsiSetup.code',
                cell: (props) => (
                    <div className="w-40 truncate">
                        {props.getValue() as string}
                    </div>
                ),
            },
            // {
            //     header: 'Code Type',
            //     accessorKey: 'codeType',
            //     cell: (props) => (
            //         <div className="w-40 truncate">
            //             {props.getValue() as string}
            //         </div>
            //     ),
            // },
            {
                header: 'ESI Code Location',
                accessorKey: 'EsiSetup.Location.name',
                cell: (props) => (
                    <div className="w-40 truncate">
                        {props.getValue() as string}
                    </div>
                ),
            },
            {
                header: 'Payroll month',
                accessorKey: 'payroll_month',
                cell: (props) => {
                    const date = new Date(props.getValue() as string);
                    return (
                      <div className="w-32 truncate">
                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </div>
                    );
                  }
            },
            {
                header: 'No. of Employees',
                accessorKey: 'no_of_emp',
                cell: (props) => (
                    <div className="w-40 truncate">
                        {props.getValue() as number}
                    </div>
                ),
            },
            {
                header: 'ESI Gross Wages',
                accessorKey: 'gross_wage',
                cell: (props) => (
                    <div className="w-40 truncate">
                        ₹{(props.getValue() as number).toLocaleString()}
                    </div>
                ),
            },
            {
                header: 'EE ESI',
                accessorKey: 'employee_esi',
                cell: (props) => (
                    <div className="w-28 truncate">
                        ₹{(props.getValue() as number).toLocaleString()}
                    </div>
                ),
            },
            {
                header: 'ER ESI',
                accessorKey: 'employer_esi',
                cell: (props) => (
                    <div className="w-28 truncate">
                        ₹{(props.getValue() as number).toLocaleString()}
                    </div>
                ),
            },
            {
                header: 'Total ESI',
                accessorKey: 'total_esi',
                cell: (props) => (
                    <div className="w-28 truncate">
                        ₹{(props.getValue() as number).toLocaleString()}
                    </div>
                ),
            },
            {
                header: 'Total Amount As per Challan',
                accessorKey: 'challan_amt',
                cell: (props) => (
                    <div className="w-52 truncate">
                        ₹{(props.getValue() as number).toLocaleString()}
                    </div>
                ),
            },
            {
                header: 'Difference in Amount',
                accessorKey: 'difference_amt',
                cell: (props) => (
                    <div className="w-40 truncate">
                        ₹{(props.getValue() as number).toLocaleString()}
                    </div>
                ),
            },
            {
                header: 'Reason For Difference',
                accessorKey: 'difference_reason',
                cell: (props) => {
                    const value = props.getValue() as number;
                    return(
                        <Tooltip title={value}>
                        <div className="w-40 truncate">
                        {(props.getValue() as number).toLocaleString()}
                    </div>
                        </Tooltip>
                    )
                },
            },
            
           
            {
                header: 'Due Date',
                accessorKey: 'payment_due_date',
                cell: (props) => <div className="w-28 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
            },
            {
                header: 'Date of Payment',
                accessorKey: 'payment_date',
                cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
            },
            {
              header: 'Delay',
              accessorKey: 'delay_in_days',
              cell: (props) => (
                  <div className="w-40 truncate">
                      {props.getValue() as string}
                  </div>
              ),
          },
          {
              header: 'Delay Reason',
              accessorKey: 'delay_reason',
              cell: (props) => (
                  <div className="w-40 truncate">
                      {props.getValue() as string}
                  </div>
              ),
          },
            {
                header: 'Challan No',
                accessorKey: 'challan_no',
                cell: (props) => (
                    <div className="w-40 truncate">
                        {props.getValue() as string}
                    </div>
                ),
            },
            {
                header: 'Challan Type',
                accessorKey: 'challan_type',
                cell: (props) => (
                    <div className="w-40 truncate">
                        {props.getValue() as string}
                    </div>
                ),
            },
            {
  header: 'ESIC challan cum payment receipt',
  accessorKey: 'challan_document',
  cell: (props) => {
    const challanDocument = props.getValue() as string | null;
    
    const handleChallanDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (challanDocument) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${challanDocument}`;
        window.open(fullPath, '_blank');
      }
    };

    return (
      <div className="w-40 flex items-center">
        {challanDocument ? (
          <a 
            href="#" 
            onClick={handleChallanDownload} 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiFile className="w-5 h-5" />
             {/* <span className="truncate">View File</span> */}
          </a>
        ) : (
          '--'
        )}
      </div>
    );
  },
},
          
              {
                header: 'Upload Status',
                id: 'uploadStatus',
                cell: ({ row }) => {
                    const { challan_document } = row.original;
                    const uploadedCount = [challan_document].filter(Boolean).length;
                    return <div className="w-32 truncate">{`${uploadedCount}/1`}</div>;
                },
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Tooltip title="Edit">
                            <Button
                                size="sm"
                                onClick={() => handleEdit(row.original)}
                                icon={<MdEdit />}
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="sm"
                                onClick={() =>
                                    console.log('Delete', row.original)
                                }
                                icon={<FiTrash />}
                                className="text-red-500"
                            />
                        </Tooltip>
                        <ESIConfigDropdown  companyName={row.original.EsiSetup.Company.name} 
              companyGroupName={row.original.EsiSetup.CompanyGroup.name} 
              trackerId={row.original.id}  
              onRefresh={onRefresh}           />
                    </div>
                ),
            },
        ],
        [],
    )
    const documentPath = "../store/AllMappedCompliancesDetails.xls";

    const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Implement the download functionality here
        // For example, you could use the `fetch` API to download the file
        fetch(documentPath)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'AllMappedCompliancesDetails.xls';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(() => console.error('Download failed'));
      };

   if (loading) {
        console.log("Loading....................");
        
        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500  rounded-xl">
                <div className="w-28 h-28">
                    <Lottie 
                        animationData={loadingAnimation} 
                        loop 
                        className="w-24 h-24"
                    />
                </div>
                <p className="text-lg font-semibold">
                    Loading Data...
                </p>

            </div>
        );
    }

    return (
        <div className="relative">
            {dataSent.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
                    <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-center">
                        No Data Available
                    </p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={dataSent}
                    loading={loading}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ className: 'rounded-md' }}
                    stickyHeader={true}
                    stickyFirstColumn={true}
                    stickyLastColumn={true}
                    pagingData={{
                        total: pagination.total,
                        pageIndex: pagination.pageIndex,
                        pageSize: pagination.pageSize,
                    }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onPageSizeChange}
                />
            )}
            {editingData && (
                <ESITrackerEditDialog
                    isOpen={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    onSubmit={handleEditSubmit}
                    data={editingData}
                />
            )}
        </div>
    )
};

export default ESITrackerTable;