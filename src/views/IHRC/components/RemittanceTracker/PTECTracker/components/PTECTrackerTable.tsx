


import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PTTrackerEditDialog from './PTECTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import { PTTrackerData } from '@/@types/PTTracker';
import dayjs from 'dayjs';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { deletePtecTracker } from '@/store/slices/ptSetup/ptecTrackerSlice';
import { FaUserShield } from 'react-icons/fa';
import { requestCompanyEdit } from '@/store/slices/request/requestSLice';
import store from '@/store';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

interface PTTrackerTableProps {
  dataSent: PTTrackerData[];
  loading: boolean;
  onRefresh?: () => void;
  companyName: string;
  code: string;
  pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  canEdit:boolean;
  canDelete:boolean;
}
const { login } = store.getState()

const PTECTrackerTable: React.FC<PTTrackerTableProps> = ({
  dataSent,
  loading,
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  companyName,
  code,
  canDelete,
  canEdit
}) => {
   const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PTTrackerData | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [trackerToDelete, setTrackerToDelete] = useState<string | null>(null);
  const userId = login?.user?.user?.id;
  const type = login?.user?.user?.type;
    const handleDeleteConfirmation = (trackerId: string) => {
    setTrackerToDelete(trackerId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (trackerToDelete) {
      dispatch(deletePtecTracker(trackerToDelete));
      setDeleteConfirmOpen(false);
      if (onRefresh) {
        onRefresh();
      }
    }
  };
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
  const handleRequestToAdmin = async (id: any) => {
    try {
      // Dispatch the request with the required type
      const res = await dispatch(requestCompanyEdit({
        id: id,
        payload: {
          type: "ptec" 
        }
      })).unwrap(); 
  
      if (res) {
        console.log('Requested Successfully')
          if (onRefresh) {
              onRefresh()
          }
      }
  
    } catch (error) {
      console.log("Admin request error:", error);
    }
  };

  const columns: ColumnDef<PTTrackerData>[] = useMemo(
    () => [
      {
        header: 'Company',
        enableSorting: false,
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
        enableSorting: false,
        accessorKey: 'PtSetup.Location.name',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PT EC Number',
        enableSorting: false,
        accessorKey: 'PtSetup.enroll_number',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payroll month',
        enableSorting: false,
        accessorKey: 'period',
       cell: (props) => {
                    const date = new Date(props.getValue() as string);
                    return (
                      <div className="w-32 truncate">
                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </div>
                    );
                  }
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
        enableSorting: false,
        accessorKey: 'period',
         cell: (props) => (
          <div className="w-28 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Total Amount (Challan)',
        enableSorting: false,
        accessorKey: 'total_challan_amt',
        cell: (props) => (
          <div className="w-40 truncate">
            ₹{(props.getValue() as number).toLocaleString()}
          </div>
        ),
      },
      {
        header: 'Total Amount Paid',
        enableSorting: false,
        accessorKey: 'total_paid_amt',
        cell: (props) => (
          <div className="w-40 truncate">
            ₹{(props.getValue() as number).toLocaleString()}
          </div>
        ),
      },
      {
        header: 'Due Date',
        enableSorting: false,
        accessorKey: 'payment_due_date',
        cell: (props) => (
          <div className="w-28 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Date of Payment',
        enableSorting: false,
        accessorKey: 'payment_date',
        cell: (props) => (
          <div className="w-36 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Delay',
        enableSorting: false,
        accessorKey: 'delay_in_days',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Delay Reason',
        enableSorting: false,
        accessorKey: 'delay_reason',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Receipt No',
        enableSorting: false,
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
        enableSorting: false,
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
        enableSorting: false,
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
        header: 'Upload Status',
        enableSorting: false,
        id: 'uploadStatus',
        cell: ({ row }) => {
          const { payment_document, pt_return_document } = row.original;
          const uploadedCount = [payment_document, pt_return_document].filter(Boolean).length;
          return <div className="w-32 truncate">{`${uploadedCount}/2`}</div>;
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const { iseditable, uploaded_by } = row.original;
          const canShowActions = type === 'admin' || (type === 'user' && userId === uploaded_by);
      
          if (!canShowActions) {
            return null; // Don't show any actions
          }
          return(
          <div className="flex items-center gap-2">
            {iseditable ? (
              <>
              {canEdit && (
              <Tooltip title="Edit">
                <Button
                  size="sm"
                  onClick={() => handleEdit(row.original)}
                  icon={<MdEdit />}
                />
              </Tooltip>
                )}

                 {canDelete && (
            <Tooltip title="Delete">
              <Button
                size="sm"
                onClick={() => handleDeleteConfirmation(row.original.id)}
                icon={<FiTrash />}
                className="text-red-500"
              />
            </Tooltip>
              )}

            <ConfigDropdown 
              companyName={row.original.PtSetup.Company.name}
              companyGroupName={row.original.PtSetup.CompanyGroup.name}
              trackerId={row.original.id}
              onRefresh={onRefresh}
            />
              </>
            ) : (
              <Tooltip title="Request to Admin">
              <Button
                size="sm"
                onClick={() => handleRequestToAdmin(row.original.id)}
                icon={<FaUserShield />}
                className="text-blue-500"
              />
            </Tooltip>
            )}
              
             
          </div>
          )
        },
      },
    ],
    [onRefresh]
  );

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
      {!companyName ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
          <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-center">
            Please select a company first to view data
          </p>
        </div>
      ) : dataSent.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
          <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-center">
            {code 
                ? `No data available for ${companyName} and PTEC code ${code}`
                : `No data available for ${companyName}`
            }
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
        <PTTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
          trackerId={editingData.id}
          onRefresh={onRefresh}
        />
      )}

       <Dialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <div className="p-2">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this PTEC Tracker entry?</p>
          
          <div className="flex justify-end space-x-2">
            <Button 
              onClick={() => setDeleteConfirmOpen(false)}
              variant="plain"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              variant="solid"
              color="blue"
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PTECTrackerTable;