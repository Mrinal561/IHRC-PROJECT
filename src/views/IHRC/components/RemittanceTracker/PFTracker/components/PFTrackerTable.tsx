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
}

const PFTrackerTable: React.FC<PfTrackerTableProps> =({ 
  dataSent, 
  loading, 
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  companyName, 
  code
}) => {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PfChallanData | null>(null);
  const [pfTrackerData, setPfTrackerData] = useState<PfChallanData[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [trackerToDelete, setTrackerToDelete] = useState<string | null>(null);

  const handleDeleteConfirmation = (trackerId: string) => {
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
        accessorKey: 'PfSetup.Company.name',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PF Code',
        accessorKey: 'PfSetup.pf_code',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        accessorKey: 'PfSetup.Location.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payroll Month',
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
        cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
      },
      {
        header: 'EPF Wages',
        accessorKey: 'epf_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EPS Wage',
        accessorKey: 'eps_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Challan Amount',
        accessorKey: 'total_challan_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Amount Paid',
        accessorKey: 'total_paid_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference',
        accessorKey: 'difference_amt',
        cell: (props) => <div className="w-52 truncate">{(props.getValue() as number).toLocaleString()}</div>,
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
        header: 'TRRN No',
        accessorKey: 'trrn_no',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'CRN No',
        accessorKey: 'crn_no',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Challan',
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
    const { iseditable } = row.original;
    console.log("editable:",iseditable)
    return (
      <div className="flex items-center gap-2">
        {iseditable ? (
          <Tooltip title="Edit">
            <Button
              size="sm"
              onClick={() => handleEdit(row.original)}
              icon={<MdEdit />}
            />
          </Tooltip>
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
        <Tooltip title="Delete">
          <Button
            size="sm"
            onClick={() => handleDeleteConfirmation(row.original.id)}
            icon={<FiTrash />}
            className="text-red-500"
          />
        </Tooltip>
        <ConfigDropdown 
          companyName={row.original.PfSetup.Company.name} 
          companyGroupName={row.original.PfSetup.CompanyGroup.name} 
          trackerId={row.original.id} 
          onRefresh={onRefresh}
        />
      </div>
    );
  },
}
      // {
      //   header: 'Actions',
      //   id: 'actions',
      //   cell: ({ row }) => (
      //     <div className="flex items-center gap-2">
      //       <Tooltip title="Edit">
      //         <Button
      //           size="sm"
      //           onClick={() => handleEdit(row.original)}
      //           icon={<MdEdit />}
      //         />
      //       </Tooltip>
      //       <Tooltip title="Delete">
      //         <Button
      //           size="sm"
      //           onClick={() => handleDeleteConfirmation(row.original.id)}
      //           icon={<FiTrash />}
      //           className="text-red-500"
      //         />
      //       </Tooltip>
      //        <Tooltip title="Request to Admin">
      //         <Button
      //           size="sm"
      //           onClick={() => console.log(row.index)}
      //           icon={<FaUserShield />}
      //           className="text-blue-500"
      //         />
      //       </Tooltip>
      //       <ConfigDropdown 
      //         companyName={row.original.PfSetup.Company.name} 
      //         companyGroupName={row.original.PfSetup.CompanyGroup.name} 
      //         trackerId={row.original.id} 
      //         onRefresh={onRefresh}
      //       />
      //     </div>
      //   ),
      // },
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
        onClose={() => setDeleteConfirmOpen(false)}
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

export default PFTrackerTable;