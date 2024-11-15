import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import ESITrackerEditDialog from './ESITrackerEditDialog';
import ESIConfigDropdown from './ESIConfigDropDown'
import { PfChallanData } from '@/@types/pfTracker';
import { esiChallanData } from '@/@types/esiTracker';

interface EsiTrackerTableProps {
    dataSent: PfChallanData[];
    loading: boolean
  }

const ESITrackerTable: React.FC<EsiTrackerTableProps> = ({ dataSent, loading }) => {
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
                header: 'Month',
                accessorKey: 'payroll_month',
                cell: (props) => (
                    <div className="w-28 truncate">
                        {props.getValue() as string}
                    </div>
                ),
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
                cell: (props) => (
                    <div className="w-28 truncate">
                        {props.getValue() as string}
                    </div>
                ),
            },
            {
                header: 'Date of Payment',
                accessorKey: 'payment_date',
                cell: (props) => (
                    <div className="w-40 truncate">
                        {props.getValue() as string}
                    </div>
                ),
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
                header: 'Challan',
                accessorKey: 'challan_document',
                cell: (props) => 
                <div className="w-40 truncate">
                  <a onClick={handleDownload} className="text-blue-600 hover:underline">
                    {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
                    {props.getValue() as string}
                  </a>
                </div>,
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
                        <ESIConfigDropdown companyName={undefined} companyGroupName={undefined}            />
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

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={dataSent}
                loading={loading}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
            />
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