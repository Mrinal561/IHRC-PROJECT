import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, toast, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdAdminPanelSettings, MdEdit } from 'react-icons/md';
import PFTrackerEditDialog from './PFTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import { PfChallanData } from '@/@types/pfTracker';
import dayjs from 'dayjs';
import { HiOutlineViewGrid } from 'react-icons/hi';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';
import { useDispatch } from 'react-redux';
import { deleteTracker } from '@/store/slices/pftracker/pfTrackerSlice';
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
import { FaUserShield } from 'react-icons/fa';
import { requestCompanyEdit } from '@/store/slices/request/requestSLice';
import store from '@/store';
const documentPath = "../store/AllMappedCompliancesDetails.xls";

interface PfTrackerTableProps {
  dataSent: PfChallanData[];
  loading: boolean;
  onRefresh?: () => void;
  code: string;
  companyName: string;
  pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
    canEdit: boolean;
    canDelete: boolean;
}
const { login } = store.getState()

const PFTrackerTable: React.FC<PfTrackerTableProps> =({ 
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
  const [editingData, setEditingData] = useState<PfChallanData | null>(null);
  const [pfTrackerData, setPfTrackerData] = useState<PfChallanData[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [trackerToDelete, setTrackerToDelete] = useState<string | null>(null);
 const userId = login?.user?.user?.id;
 const type = login?.user?.user?.type;
  const handleDeleteConfirmation = (trackerId: string) => {
    console.log(userId, type)
    setTrackerToDelete(trackerId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (trackerToDelete) {
      dispatch(deleteTracker(trackerToDelete));
      setDeleteConfirmOpen(false);
      if (onRefresh) {
        onRefresh();
      }
    }
  };

  const handleRequestToAdmin = async (id: any) => {
  try {
    // Dispatch the request with the required type
    const res = await dispatch(requestCompanyEdit({
      id: id,
      payload: {
        type: "pf" 
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
  
  const handleEdit = (row: PfChallanData) => {
    setEditingData(row);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (editedData: PfChallanData) => {
    setEditDialogOpen(false);
    setEditingData(null);
    if (onRefresh) {
      onRefresh();
    }
  };

  const columns: ColumnDef<PfChallanData>[] = useMemo(
    () => [
      {
        header: 'Company',
        enableSorting: false,
        accessorKey: 'PfSetup.Company.name',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PF Code',
        enableSorting: false,
        accessorKey: 'PfSetup.pf_code',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        enableSorting: false,
        accessorKey: 'PfSetup.Location.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payroll Month',
        enableSorting: false,
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
        enableSorting: false,
        accessorKey: 'no_of_emp',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
      },
      {
        header: 'EPF Wages',
        enableSorting: false,
        accessorKey: 'epf_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EPS Wage',
        enableSorting: false,
        accessorKey: 'eps_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EDLI Wage',
        enableSorting: false,
        accessorKey: 'edli_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Challan Amount',
        enableSorting: false,
        accessorKey: 'total_challan_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Amount Paid',
        enableSorting: false,
        accessorKey: 'total_paid_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference',
        enableSorting: false,
        accessorKey: 'difference_amt',
        cell: (props) => <div className="w-52 truncate">{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Due Date',
        enableSorting: false,
        accessorKey: 'payment_due_date',
        cell: (props) => <div className="w-28 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Date of Payment',
        enableSorting: false,
        accessorKey: 'payment_date',
        cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Delay Reason',
        enableSorting: false,
        accessorKey: 'delay_reason',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'TRRN No',
        enableSorting: false,
        accessorKey: 'trrn_no',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'CRN No',
        enableSorting: false,
        accessorKey: 'crn_no',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Challan',
        enableSorting: false,
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
                </a>
              ) : (
                '--'
              )}
            </div>
          );
        },
      },
      {
        header: 'ECR',
        enableSorting: false,
        accessorKey: 'ecr_document',
        cell: (props) => {
          const ecrDocument = props.getValue() as string | null;
          
          const handleEcrDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (ecrDocument) {
              const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${ecrDocument}`;
              window.open(fullPath, '_blank');
            }
          };

          return (
            <div className="w-40 flex items-center">
              {ecrDocument ? (
                <a 
                  href="#" 
                  onClick={handleEcrDownload} 
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
        header: 'Payment Receipt',
        enableSorting: false,
        accessorKey: 'receipt_document',
        cell: (props) => {
          const paymentReceiptDocument = props.getValue() as string | null;
          
          const handlePaymentReceiptDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (paymentReceiptDocument) {
              const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${paymentReceiptDocument}`;
              window.open(fullPath, '_blank');
            }
          };

          return (
            <div className="w-40 flex items-center">
              {paymentReceiptDocument ? (
                <a 
                  href="#" 
                  onClick={handlePaymentReceiptDownload} 
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
          const { ecr_document, challan_document, receipt_document } = row.original;
          const uploadedCount = [ecr_document, challan_document, receipt_document].filter(Boolean).length;
          return <div className="w-32 truncate">{`${uploadedCount}/3`}</div>;
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const { iseditable, uploaded_by } = row.original;
      
          // Check if user is admin or if they're the uploader
          const canShowActions = type === 'admin' || (type === 'user' && userId === uploaded_by);
      
          if (!canShowActions) {
            return null; // Don't show any actions
          }
      
          return (
            <div className="flex items-center gap-2">
              {iseditable ? (
                // Show all actions when iseditable is true
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
                    companyName={row.original.PfSetup.Company.name} 
                    companyGroupName={row.original.PfSetup.CompanyGroup.name} 
                    trackerId={row.original.id} 
                    onRefresh={onRefresh}
                  />
                </>
              ) : (
                // Show only Request to Admin button when iseditable is false
                <>
                  {/* {canEdit && ( */}
                    <Tooltip title="Request to Admin">
                      <Button
                        size="sm"
                        onClick={() => handleRequestToAdmin(row.original.id)}
                        icon={<FaUserShield />}
                        className="text-blue-500"
                      />
                    </Tooltip>
                  {/* // )} */}
                </>
              )}
            </div>
          );
        },
      }
    ],
    [onRefresh]
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
        <div className="w-28 h-28">
          <Lottie 
            animationData={loadingAnimation} 
            loop 
            className="w-24 h-24"
          />
        </div>
        <p className="text-lg font-semibold">Loading Data...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!companyName ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
          <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-center">Please select a company first to view data</p>
        </div>
      ) : dataSent.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
          <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
          <p className="text-center">
            {code 
              ? `No data available for ${companyName} and PF code ${code}`
              : `No data available for ${companyName}`}
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
        <PFTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          trackerId={editingData.id}
          onRefresh={onRefresh}
        />
      )}

      <Dialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}  shouldCloseOnOverlayClick={false} 
      >
        <div className="p-2">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this PF Tracker entry?</p>
          
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
              // color="blue"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PFTrackerTable;