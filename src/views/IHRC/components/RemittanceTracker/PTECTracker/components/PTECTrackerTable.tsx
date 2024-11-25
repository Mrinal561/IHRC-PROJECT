


import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PTTrackerEditDialog from './PTECTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import { PTTrackerData } from '@/@types/PTTracker';
import dayjs from 'dayjs';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

interface PTTrackerTableProps {
  dataSent: PTTrackerData[];
  loading: boolean;
  onRefresh?: () => void;
  pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PTECTrackerTable: React.FC<PTTrackerTableProps> = ({
  dataSent,
  loading,
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PTTrackerData | null>(null);

  const handleEdit = (row: PTTrackerData) => {
    setEditingData(row);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (editedData: PTTrackerData) => {
    setEditDialogOpen(false);
    setEditingData(null);
    if (onRefresh) {
      onRefresh();
    }
  };

  const columns: ColumnDef<PTTrackerData>[] = useMemo(
    () => [
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
      // {
      //   header: 'Upload Status',
      //   id: 'uploadStatus',
      //   cell: ({ row }) => {
      //     const { challan, payment, ret } = row.original;
      //     const uploadedCount = [challan, payment, ret].filter(Boolean).length;
      //     return <div className="w-32 truncate">{`${uploadedCount}/3`}</div>;
      //   },
      // },
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
                onClick={() => console.log('Delete', row.original)}
                icon={<FiTrash />}
                className="text-red-500"
              />
            </Tooltip>
            <ConfigDropdown 
              companyName={row.original.PtSetup.Company.name}
              companyGroupName={row.original.PtSetup.CompanyGroup.name}
              trackerId={row.original.id}
              onRefresh={onRefresh}
            />
          </div>
        ),
      },
    ],
    [onRefresh]
  );

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
        pagingData={{
          total: pagination.total,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onPageSizeChange}
      />
      {editingData && (
        <PTTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
        />
      )}
    </div>
  );
};

export default PTECTrackerTable;