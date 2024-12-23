

import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import LWFTrackerEditDialog from './LWFTrackerEditDialog';
import ConfigDropdown from './ConfigDropDown'
import dayjs from 'dayjs';
import { HiOutlineViewGrid } from 'react-icons/hi';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';
import { deleteLwfTracker } from '@/store/slices/lwfTracker/lwfTracker';
import { useDispatch } from 'react-redux';
import { FaUserShield } from 'react-icons/fa';
import { requestCompanyEdit } from '@/store/slices/request/requestSLice';

export interface Company {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface CompanyGroup {
  id: number;
  name: string;
}

export interface LWFTrackerData {
  id: number;
  uuid: string;
  lwf_setup_id: number;
  period: string;
  salary_register_amt: number;
  total_paid_amt: number;
  difference_amt: number;
  difference_reason: string | null;
  payment_due_date: string;
  payment_date: string;
  delay_in_days: number | null;
  delay_reason: string | null;
  receipt_no: string;
  receipt_document: string | null;
  remark: string | null;
  upload_date: string;
  status: string;
  uploaded_by: number;
  created_at: string;
  updated_at: string;
  is_requested?: boolean;
  iseditable?: boolean;
  UploadBy: {
    id: number;
    name: string;
    email: string;
    mobile: string | null;
  };
  LwfSetup: {
    register_number: string;
    CompanyGroup: CompanyGroup;
    Company: Company;
    Location: Location;
  };
}

interface LWFTrackerTableProps {
  dataSent: LWFTrackerData[];
  loading?: boolean;
  companyName: string;
  code: string;
  onRefresh?: () => void;
    pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const LWFTrackerTable: React.FC<LWFTrackerTableProps> = ({ 
  dataSent, 
  loading = false, 
  onRefresh,
   pagination,
  onPaginationChange,
  onPageSizeChange,
  companyName,
  code
}) => {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<LWFTrackerData | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [trackerToDelete, setTrackerToDelete] = useState<string | null>(null);

    const handleDeleteConfirmation = (trackerId: string) => {
    setTrackerToDelete(trackerId);
    setDeleteConfirmOpen(true);
  };

   const confirmDelete = () => {
    if (trackerToDelete) {
      dispatch(deleteLwfTracker(trackerToDelete));
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
          type: "lwf" 
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

  const handleEdit = (row: LWFTrackerData) => {
    setEditingData(row);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (editedData: LWFTrackerData) => {
    // Implement update logic or pass to parent component
    setEditDialogOpen(false);
    setEditingData(null);
     if (onRefresh) {
      onRefresh();
    }
  };

  const columns: ColumnDef<LWFTrackerData>[] = useMemo(
    () => [
      {
        header: 'Company',
        accessorKey: 'LwfSetup.Company.name',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        accessorKey: 'LwfSetup.Location.name',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Registration Number',
        accessorKey: 'LwfSetup.register_number',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payroll month',
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
      {
        header: 'Salary Register Amt',
        accessorKey: 'salary_register_amt',
        cell: (props) => <div className="w-52 truncate">
          ₹{(props.getValue() as number)?.toLocaleString() || '-'}
        </div>,
      },
      {
        header: 'Total Paid Amt',
        accessorKey: 'total_paid_amt',
        cell: (props) => <div className="w-52 truncate">
          ₹{(props.getValue() as number)?.toLocaleString() || '-'}
        </div>,
      },
      {
        header: 'Difference Amt',
        accessorKey: 'difference_amt',
        cell: (props) => <div className="w-52 truncate">
          ₹{(props.getValue() as number)?.toLocaleString() || '-'}
        </div>,
      },
      {
        header: 'Difference Reason',
        accessorKey: 'difference_reason',
        cell: (props) => <div className="w-40 truncate">
          {(props.getValue() as string) || '-'}
        </div>,
      },
      {
        header: 'Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => <div className="w-28 truncate">
          {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
        </div>,
      },
      {
        header: 'Payment Date',
        accessorKey: 'payment_date',
        cell: (props) => <div className="w-28 truncate">
          {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
        </div>,
      },
      {
        header: 'Delay in Days',
        accessorKey: 'delay_in_days',
        cell: (props) => <div className="w-28 truncate">
          {props.getValue() ? `${props.getValue()} Days` : '-'}
        </div>,
      },
      {
        header: 'Delay Reason',
        accessorKey: 'delay_reason',
        cell: (props) => <div className="w-40 truncate">
          {(props.getValue() as string) || '-'}
        </div>,
      },
      {
        header: 'Receipt No',
        accessorKey: 'receipt_no',
        cell: (props) => <div className="w-52 truncate">
          {props.getValue() as string || '-'}
        </div>,
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
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => <div className="w-28 truncate">
          {props.getValue() as string}
        </div>,
      },
      {
        header: 'Uploaded By',
        accessorKey: 'UploadBy.name',
        cell: (props) => <div className="w-40 truncate">
          {props.getValue() as string}
        </div>,
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
            const { iseditable } = row.original;
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
                        companyName={row.original.LwfSetup.Company.name}
                        companyGroupName={row.original.LwfSetup.CompanyGroup.name}
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
      //       <ConfigDropdown 
      //         companyName={row.original.LwfSetup.Company.name} 
      //         companyGroupName={row.original.LwfSetup.CompanyGroup.name} 
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
                ? `No data available for ${companyName} and LWF code ${code}`
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
        <LWFTrackerEditDialog
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
          <p className="mb-6">Are you sure you want to delete this LWF Tracker entry?</p>
          
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

export default LWFTrackerTable;