
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification, Badge } from '@/components/ui';
import { FaDownload } from 'react-icons/fa6';
import { HiDownload, HiOutlineEye } from 'react-icons/hi';
import { RiEyeLine } from 'react-icons/ri';
import { Navigate, useNavigate } from 'react-router-dom';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { ComplianceData } from '@/@types/compliance';
// Define the structure of our data
// interface ComplianceData {
//   id: number;
//     uuid: string;
//     legislation: string;
//     category: string;
//     penalty_type: string;
//     default_due_date: {
//         first_date: string; // in "YYYY-MM-DD" format
//         last_date: string;  // in "YYYY-MM-DD" format
//     };
//     scheduled_frequency: string;
//     proof_mandatory: boolean;
//     header: string;
//     description: string;
//     penalty_description: string;
//     applicability: string;
//     bare_act_text: string;
//     type: string;
//     clause: string;
//     frequency: string;
//     statutory_auth: string;
//     approval_required: boolean;
//     criticality: string;
//     assign:boolean;
// }


// const DownloadHistoryButton = () => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const navigate = useNavigate();
  
//     const handleAssignClick = () => {
//         setIsDialogOpen(true);
//     };
  
//     const handleConfirm = () => {
//         setIsDialogOpen(false);
//         toast.push(
//           <Notification
//             title="Success"
//             type="success"
//           >
//             Compliance Report downloaded successfully!
//           </Notification>,
//           {
//             placement: 'top-end',
//           }
//         );
//       };
  
//     const handleCancel = () => {
//         setIsDialogOpen(false);
//     };
//     const value="Download"
  
//     return (
//         <>
//          <Tooltip title="View Details">
//                   <Button
//                     size="sm"
//                     onClick={() => navigate(`/app/IHRC/compliance-status-list-detail/${row.original.Compliance_Id}`, { state: row.original })}
//                     icon={<RiEyeLine />}
//                   />
//                 </Tooltip>
//         </>
//     );
//   };

const HistoryPageTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ComplianceData[]>([]);
  const [filteredData, setFilteredData] = useState<ComplianceData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchHistoryData = async () => {
    setIsLoading(true);
    try {
      const response = await httpClient.get(endpoints.due.getAll(), {
        params: {
          'data_status[]': ['approved']
        }
      });
      console.log('API Response:', response);
      const fetchedData = response.data?.data || response.data || [];

      setData(fetchedData);
      setFilteredData(fetchedData);
    } catch (error) {
      console.error('Error fetching history data:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to fetch history data
        </Notification>,
        { placement: 'top-end' }
      );
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchHistoryData();
  }, [])



 
  const columns: ColumnDef<ComplianceData>[] = useMemo(
    () => [
      {
        header: 'Instance ID',
        accessorKey: 'record_id',
        cell: (props) => (
          <div className="w-40 text-start">{props.getValue()}</div>
        ),
      },
      // {
      //   header: 'Compliance ID',
      //   accessorKey: 'Compliance_ID',
      //   cell: (props) => (
      //     <div className="w-24 text-start">{props.getValue()}</div>
      //   ),
      // },
     
      {
        header: 'Legislation',
        accessorKey: 'compliance_detail.legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-28 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Location',
        accessorKey: 'compliance_detail.location',
        cell: (props) => (
          <div className="w-24 text-start truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'Header',
        accessorKey: 'compliance_detail.header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-40 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      // {
      //   header: 'Completion Date',
      //   accessorKey: 'Due_Date',
      //   cell: ({ getValue }) => {
      //     return <div className="w-26 flex items-center justify-center">{getValue<string>()}</div>;
      //   },
      // },
      {
        header: 'Compliance Status',
        accessorKey: 'data_status',
        cell: (props) => {
          // const status = getValue<'Completed'>();
          // let statusColor = 'bg-green-500';
          // let textColor = 'text-green-500';
          // return (
          //   <div className="w-30 flex items-center">
          //     <Badge className= 'mr-2 bg-green-500'/>
          //     <div className={`font-semibold ${textColor}`}>{status}</div>
          //   </div>
          const criticality = props.getValue(); // Get the value once
            
                    return (
                        <div className="w-24 font-semibold truncate">
                            {criticality === 'approved' ? (
                                <span className="text-green-500">{criticality}</span>
                            ) : criticality === 'NA' ? (
                                <span className="text-yellow-500">{criticality}</span>
                            ) : criticality === 'Not Complied' ? ( 
                                <span className="text-red-500">{criticality}</span>
                            ): (
                                <span></span>
                            )}
                        </div>
                    );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({row}) => (
          <Tooltip title="View Compliance Detail">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/IHRC/history-list-detail/${row.original.uuid}`, 
                      { state: row.original })}
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
        ),
      },
    ],
    []
  );

  // State for table pagination and sorting
  const [tableData, setTableData] = useState({
    total: data.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  // Function to handle pagination changes
  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
  };

  // Function to handle page size changes
  const onSelectChange = (value: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
  };

  return (
    <div className="relative">
      {/* Render the DataTable component */}
      {data.length === 0 && <div>No data available</div>}

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
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        stickyHeader={true}
        stickyLastColumn={true}
        stickyFirstColumn={true}
      />

      
    </div>
  );
};

export default HistoryPageTable;