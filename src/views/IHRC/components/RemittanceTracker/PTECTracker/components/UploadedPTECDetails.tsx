
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropdown';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { PTTrackerData } from '@/@types/PTTracker';
import { FiFile } from 'react-icons/fi';
import dayjs from 'dayjs';

interface UploadedPTDetailsProps {
  onBack: () => void;
}

const UploadedPTECDetails: React.FC<UploadedPTDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<PTTrackerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  });

  const fetchPTTrackerData = useCallback(
    async (page: number, pageSize: number) => {
      setIsLoading(true);
      try {
        const res = await httpClient.get(endpoints.ptec.getAll(), {
          params: {
            page,
            page_size: pageSize,
          },
        });
        setData(res.data.data);
        setPagination((prev) => ({
          ...prev,
          total: res.data.paginate_data.totalResults,
        }));
      } catch (error) {
        console.error('Error fetching PT tracker data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPTTrackerData(pagination.pageIndex, pagination.pageSize);
  }, [fetchPTTrackerData, pagination.pageIndex, pagination.pageSize]);

  const handlePaginationChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 1,
    }));
  };

  const columns: ColumnDef<PTTrackerData>[] = [
    {
        header: 'Company',
        accessorKey: 'PtSetup.Company.name',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      // {
      //   header: 'State',
      //   accessorKey: 'state',
      //   cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      // },
      {
        header: 'PT EC Location',
        accessorKey: 'PtSetup.Location.name',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PT EC Number',
        accessorKey: 'PtSetup.enroll_number',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      // {
      //   header: 'Date of Enrolment',
      //   accessorKey: 'dateOfEnrolment',
      //   cell: (props) => (
      //     <div className="w-36 truncate">
      //       {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
      //     </div>
      //   ),
      // },
      // {
      //   header: 'PT EC Enrolment Address',
      //   accessorKey: 'ptEcEnrolmentAddress',
      //   cell: (props) => {
      //     const value = props.getValue() as string;
      //     return (
      //       <Tooltip title={value}>
      //         <div className="w-52 truncate">{value}</div>
      //       </Tooltip>
      //     );
      //   }
      // },
      // {
      //   header: 'Remittance Mode',
      //   accessorKey: 'remittanceMode',
      //   cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      // },
      // {
      //   header: 'Frequency',
      //   accessorKey: 'frequency',
      //   cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      // },
      {
        header: 'Period',
        accessorKey: 'period',
         cell: (props) => (
          <div className="w-28 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Total Amount (Challan)',
        accessorKey: 'total_challan_amt',
        cell: (props) => (
          <div className="w-40 truncate">
            ₹{(props.getValue() as number).toLocaleString()}
          </div>
        ),
      },
      {
        header: 'Total Amount Paid',
        accessorKey: 'total_paid_amt',
        cell: (props) => (
          <div className="w-40 truncate">
            ₹{(props.getValue() as number).toLocaleString()}
          </div>
        ),
      },
      {
        header: 'Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => (
          <div className="w-28 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Date of Payment',
        accessorKey: 'payment_date',
        cell: (props) => (
          <div className="w-36 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Delay',
        accessorKey: 'delay_in_days',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Delay Reason',
        accessorKey: 'delay_reason',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Receipt No',
        accessorKey: 'receipt_no',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
      },
      // {
      //   header: 'Challan',
      //   accessorKey: 'challan',
      //   cell: (props) => {
      //     const challanDocument = props.getValue() as string | null;
          
      //     const handleChallanDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
      //       e.preventDefault();
      //       if (challanDocument) {
      //         const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${challanDocument}`;
      //         window.open(fullPath, '_blank');
      //       }
      //     };

      //     return (
      //       <div className="w-40 flex items-center">
      //         {challanDocument ? (
      //           <a 
      //             href="#" 
      //             onClick={handleChallanDownload} 
      //             className="text-blue-600 hover:text-blue-800 transition-colors"
      //           >
      //             <FiFile className="w-5 h-5" />
      //           </a>
      //         ) : (
      //           '--'
      //         )}
      //       </div>
      //     );
      //   },
      // },
      {
        header: 'Payment',
        accessorKey: 'payment_document',
        cell: (props) => {
          const paymentDocument = props.getValue() as string | null;
          
          const handlePaymentDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (paymentDocument) {
              const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${paymentDocument}`;
              window.open(fullPath, '_blank');
            }
          };

          return (
            <div className="w-40 flex items-center">
              {paymentDocument ? (
                <a 
                  href="#" 
                  onClick={handlePaymentDownload} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiFile className="w-5 h-5" />
                </a>
              ) : (
                '--'
              )}
            </div>
          );
        },
      },
      {
        header: 'Return',
        accessorKey: 'pt_return_document',
        cell: (props) => {
          const returnDocument = props.getValue() as string | null;
          
          const handleReturnDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (returnDocument) {
              const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${returnDocument}`;
              window.open(fullPath, '_blank');
            }
          };

          return (
            <div className="w-40 flex items-center">
              {returnDocument ? (
                <a 
                  href="#" 
                  onClick={handleReturnDownload} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiFile className="w-5 h-5" />
                </a>
              ) : (
                '--'
              )}
            </div>
          );
        },
      },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <ConfigDropdown 
          companyName={row.original.PtSetup.Company.name}
          companyGroupName={row.original.PtSetup.CompanyGroup.name}
          trackerId={row.original.id}
          onRefresh={() => fetchPTTrackerData(pagination.pageIndex, pagination.pageSize)}
        />
      ),
    },
  ];

  const backFunction = () => {
    navigate('/ptec-tracker');
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-8">
        <Button
          variant="plain"
          size="sm"
          icon={<HiArrowLeft />}
          onClick={backFunction}
          className="mr-4"
        />
        <h2 className="text-2xl font-bold">Uploaded PT EC Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={isLoading}
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
        onPaginationChange={handlePaginationChange}
        onSelectChange={handlePageSizeChange}
      />
    </div>
  );
};

export default UploadedPTECDetails;