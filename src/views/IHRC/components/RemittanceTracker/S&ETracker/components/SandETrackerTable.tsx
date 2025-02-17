
// import React, { useMemo, useState } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import ConfigDropDown from './ConfigDropDown';

// // Define the new interface for the notice tracker data
// export interface NoticeTrackerData {
//     serialNumber: string;
//     companyGroupName: string;
//     entityName: string;
//     state: string;
//     location: string;
//     noticeType: string;
//     noticeReceivedDate: string;
//     letterNumber: string;
//     relatedAct: string;
//     noticeCopy: string;
// }

// // Create dummy data with the new structure
// export const dummyData: NoticeTrackerData[] = [
//     {
//         serialNumber: '001',
//         companyGroupName: 'ABC Group',
//         entityName: 'ABC Technologies Pvt Ltd',
//         state: 'Maharashtra',
//         location: 'Mumbai',
//         noticeType: 'Legal Notice',
//         noticeReceivedDate: '2024-01-15',
//         letterNumber: 'LN/2024/001',
//         relatedAct: 'Companies Act 2013',
//         noticeCopy: 'notice_001.pdf'
//     },
//     {
//         serialNumber: '002',
//         companyGroupName: 'XYZ Corporation',
//         entityName: 'XYZ Industries Ltd',
//         state: 'Karnataka',
//         location: 'Bangalore',
//         noticeType: 'Show Cause Notice',
//         noticeReceivedDate: '2024-01-20',
//         letterNumber: 'SCN/2024/045',
//         relatedAct: 'Labor Laws',
//         noticeCopy: 'notice_002.pdf'
//     },
//     {
//         serialNumber: '003',
//         companyGroupName: 'PQR Enterprises',
//         entityName: 'PQR Solutions',
//         state: 'Gujarat',
//         location: 'Ahmedabad',
//         noticeType: 'Compliance Notice',
//         noticeReceivedDate: '2024-01-25',
//         letterNumber: 'CN/2024/089',
//         relatedAct: 'GST Act',
//         noticeCopy: 'notice_003.pdf'
//     },
//     {
//         serialNumber: '004',
//         companyGroupName: 'LMN Holdings',
//         entityName: 'LMN Services Ltd',
//         state: 'Tamil Nadu',
//         location: 'Chennai',
//         noticeType: 'Tax Notice',
//         noticeReceivedDate: '2024-01-30',
//         letterNumber: 'TN/2024/123',
//         relatedAct: 'Income Tax Act',
//         noticeCopy: 'notice_004.pdf'
//     }
// ];

// const NoticeTrackerTable: React.FC = () => {
//     const [data, setData] = useState<NoticeTrackerData[]>(dummyData);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [editingData, setEditingData] = useState<NoticeTrackerData | null>(null);

//     const handleEdit = (row: NoticeTrackerData) => {
//         setEditingData(row);
//         setEditDialogOpen(true);
//     };

//     const handleEditSubmit = (editedData: NoticeTrackerData) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item.serialNumber === editingData?.serialNumber ? editedData : item
//             )
//         );
//         setEditDialogOpen(false);
//         setEditingData(null);
//     };

//     const columns: ColumnDef<NoticeTrackerData>[] = useMemo(
//         () => [
//             {
//                 header: 'Sr. No.',
//                 accessorKey: 'serialNumber',
//                 cell: (props) => <div className="w-20">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Company Group',
//                 accessorKey: 'companyGroupName',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Entity Name',
//                 accessorKey: 'entityName',
//                 cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'State',
//                 accessorKey: 'state',
//                 cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Location',
//                 accessorKey: 'location',
//                 cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Notice Type',
//                 accessorKey: 'noticeType',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Notice Received Date',
//                 accessorKey: 'noticeReceivedDate',
//                 cell: (props) => <div className="w-40">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Letter Number',
//                 accessorKey: 'letterNumber',
//                 cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Related Act',
//                 accessorKey: 'relatedAct',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Notice Copy',
//                 accessorKey: 'noticeCopy',
//                 cell: (props) => (
//                     <div className="w-32 truncate">
//                         <a href="#" className="text-blue-600 hover:underline">
//                             {props.getValue() as string}
//                         </a>
//                     </div>
//                 ),
//             },
//             {
//                 header: 'Actions',
//                 id: 'actions',
//                 cell: ({ row }) => (
//                     <div className="flex items-center gap-2">
//                         <Tooltip title="Edit">
//                             <Button
//                                 size="sm"
//                                 onClick={() => handleEdit(row.original)}
//                                 icon={<MdEdit />}
//                             />
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                             <Button
//                                 size="sm"
//                                 onClick={() => console.log('Delete', row.original)}
//                                 icon={<FiTrash />}
//                                 className="text-red-500"
//                             />
//                         </Tooltip>
//                         <ConfigDropDown companyName={undefined} companyGroupName={undefined} />
//                     </div>
//                 ),
//             },
//         ],
//         []
//     );

//     return (
//         <div className="relative">
//             <DataTable
//                 columns={columns}
//                 data={data}
//                 skeletonAvatarColumns={[0]}
//                 skeletonAvatarProps={{ className: 'rounded-md' }}
//                 stickyHeader={true}
//                 stickyFirstColumn={true}
//                 stickyLastColumn={true}
//             />
//             {/* {editingData && (
//                 // <NoticeTrackerEditDialog
//                 //     isOpen={editDialogOpen}
//                 //     onClose={() => setEditDialogOpen(false)}
//                 //     onSubmit={handleEditSubmit}
//                 //     data={editingData}
//                 // />
//             )} */}
//         </div>
//     );
// };

// export default NoticeTrackerTable;


// import React, { useMemo, useState } from 'react';
// import { Button, Dialog, Tooltip } from '@/components/ui';
// import { FiFile, FiTrash } from 'react-icons/fi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { MdEdit } from 'react-icons/md';
// import { HiOutlineViewGrid } from 'react-icons/hi';
// import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
// import Lottie from 'lottie-react';
// import { useDispatch } from 'react-redux';
// import dayjs from 'dayjs';
// import { deleteNotice } from '@/store/slices/noticeTracker/noticeTrackerSlice';
// import EditNoticeDialog from './EditNoticeDialog';

// interface NoticeData {
//   id: number;
//   uuid: string;
//   group_id: number;
//   company_id: number;
//   location_id: number;
//   notice_type: string;
//   notice_date: string;
//   reference_number: string;
//   related_act: string;
//   notice_document: string;
//   CompanyGroup: {
//     id: number;
//     name: string;
//   };
//   Company: {
//     id: number;
//     name: string;
//   };
//   Location: {
//     id: number;
//     name: string;
//   };
// }

// interface NoticeTrackerTableProps {
//   data: NoticeData[];
//   loading: boolean;
//   onRefresh?: () => void;
//   companyName:string;
//   pagination: {
//     total: number;
//     pageIndex: number;
//     pageSize: number;
//   };
//   onPaginationChange: (page: number) => void;
//   onPageSizeChange: (pageSize: number) => void;
// }

// const NoticeTrackerTable: React.FC<NoticeTrackerTableProps> = ({
//   data,
//   loading,
//   onRefresh,
//   pagination,
//   onPaginationChange,
//   onPageSizeChange,
//   companyName,
// }) => {
//   const dispatch = useDispatch();
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
// const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
//   const handleDeleteConfirmation = (noticeId: number) => {
//     setNoticeToDelete(noticeId);
//     setDeleteConfirmOpen(true);
//   };

//   const confirmDelete = () => {
//     if (noticeToDelete) {
//       // Implement delete dispatch action here
//       dispatch(deleteNotice(noticeToDelete))
//       setDeleteConfirmOpen(false);
//       if (onRefresh) {
//         onRefresh();
//       }
//     }
//   };

//   const handleEdit = (row: NoticeData) => {
//     const handleEdit = (row: NoticeData) => {
//       setSelectedNoticeId(row.id);
//       setEditDialogOpen(true);
//     };
//   };

//   const columns: ColumnDef<NoticeData>[] = useMemo(
//     () => [
//       {
//         header: 'Company Group',
//         accessorKey: 'CompanyGroup.name',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Company',
//         accessorKey: 'Company.name',
//         cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Location',
//         accessorKey: 'Location.name',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Notice Type',
//         accessorKey: 'notice_type',
//         cell: (props) => (
//           <div className="w-32 truncate capitalize">
//             {(props.getValue() as string).replace(/_/g, ' ')}
//           </div>
//         ),
//       },
//       {
//         header: 'Notice Date',
//         accessorKey: 'notice_date',
//         cell: (props) => (
//           <div className="w-32 truncate">
//             {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
//           </div>
//         ),
//       },
//       {
//         header: 'Reference Number',
//         accessorKey: 'reference_number',
//         cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Related Act',
//         accessorKey: 'related_act',
//         cell: (props) => (
//           <div className="w-32 truncate capitalize">
//             {(props.getValue() as string).replace(/_/g, ' ')}
//           </div>
//         ),
//       },
//       {
//         header: 'Notice Document',
//         accessorKey: 'notice_document',
//         cell: (props) => {
//           const document = props.getValue() as string | null;
          
//           const handleDocumentDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
//             e.preventDefault();
//             if (document) {
//               const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${document}`;
//               window.open(fullPath, '_blank');
//             }
//           };

//           return (
//             <div className="w-40 flex items-center">
//               {document ? (
//                 <a 
//                   href="#" 
//                   onClick={handleDocumentDownload} 
//                   className="text-blue-600 hover:text-blue-800 transition-colors"
//                 >
//                   <FiFile className="w-5 h-5" />
//                 </a>
//               ) : (
//                 '--'
//               )}
//             </div>
//           );
//         },
//       },
//       {
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <Tooltip title="Edit">
//               <Button
//                 size="sm"
//                 onClick={() => handleEdit(row.original)}
//                 icon={<MdEdit />}
//               />
//             </Tooltip>
//             <Tooltip title="Delete">
//               <Button
//                 size="sm"
//                 onClick={() => handleDeleteConfirmation(row.original.id)}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//           </div>
//         ),
//       },
//     ],
//     [onRefresh]
//   );

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
//         <div className="w-28 h-28">
//           <Lottie 
//             animationData={loadingAnimation} 
//             loop 
//             className="w-24 h-24"
//           />
//         </div>
//         <p className="text-lg font-semibold">Loading Data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//        {!companyName ? (
//         <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
//           <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
//           <p className="text-center">Please select a company first to view data</p>
//         </div>
//       ) : data.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
//           <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
//         </div>
//       ) : (
//         <DataTable
//           columns={columns}
//           data={data}
//           loading={loading}
//           skeletonAvatarColumns={[0]}
//           skeletonAvatarProps={{ className: 'rounded-md' }}
//           stickyHeader={true}
//           stickyFirstColumn={true}
//           stickyLastColumn={true}
//           pagingData={{
//             total: pagination.total,
//             pageIndex: pagination.pageIndex,
//             pageSize: pagination.pageSize,
//           }}
//           onPaginationChange={onPaginationChange}
//           onSelectChange={onPageSizeChange}
//         />
//       )}

//       <Dialog
//         isOpen={deleteConfirmOpen}
//         onClose={() => setDeleteConfirmOpen(false)}
//       >
//         <div className="p-2">
//           <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
//           <p className="mb-6">Are you sure you want to delete this notice entry?</p>
          
//           <div className="flex justify-end space-x-2">
//             <Button 
//               onClick={() => setDeleteConfirmOpen(false)}
//               variant="plain"
//             >
//               Cancel
//             </Button>
//             <Button 
//               onClick={confirmDelete}
//               variant="solid"
//               color="blue"
//             >
//               Delete
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//       <EditNoticeDialog
//   isOpen={editDialogOpen}
//   onClose={() => {
//     setEditDialogOpen(false);
//     setSelectedNoticeId(null);
//   }}
//   noticeId={selectedNoticeId}
//   onSuccess={onRefresh}
// />
//     </div>
//   );
// };

// export default NoticeTrackerTable;


import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip } from '@/components/ui';
import { FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import { HiOutlineViewGrid } from 'react-icons/hi';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
import Lottie from 'lottie-react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { deleteNotice } from '@/store/slices/noticeTracker/noticeTrackerSlice';
import EditNoticeDialog from './EditNoticeDialog';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

interface NoticeData {
  id: number;
  uuid: string;
  group_id: number;
  company_id: number;
  location_id: number;
  notice_type: string;
  notice_date: string;
  reference_number: string;
  related_act: string;
  notice_document: string;
  CompanyGroup: {
    id: number;
    name: string;
  };
  Company: {
    id: number;
    name: string;
  };
  Location: {
    id: number;
    name: string;
  };
}

interface NoticeTrackerTableProps {
  data: NoticeData[];
  loading: boolean;
  onRefresh?: () => void;
  companyName: string;
  pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  canEdit:boolean;
  canDelete: boolean;
}

const NoticeTrackerTable: React.FC<NoticeTrackerTableProps> = ({
  data,
  loading,
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  companyName,
  canEdit,
  canDelete
}) => {
  const dispatch = useDispatch();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleDeleteConfirmation = (noticeId: number) => {
    setNoticeToDelete(noticeId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (noticeToDelete) {
      dispatch(deleteNotice(noticeToDelete));
      setDeleteConfirmOpen(false);
      if (onRefresh) {
        onRefresh();
      }
    }
  };

  // Fixed handleEdit function
  const handleEdit = (row: NoticeData) => {
    setSelectedNoticeId(row.id);
    setEditDialogOpen(true);
  };

  const columns: ColumnDef<NoticeData>[] = useMemo(
    () => [
      {
        header: 'Company Group',
        enableSorting: false,
        accessorKey: 'CompanyGroup.name',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Company',
        enableSorting: false,
        accessorKey: 'Company.name',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        enableSorting: false,
        accessorKey: 'Location.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Notice Type',
        enableSorting: false,
        accessorKey: 'notice_type',
        cell: (props) => (
          <div className="w-32 truncate capitalize">
            {(props.getValue() as string).replace(/_/g, ' ')}
          </div>
        ),
      },
      {
        header: 'Notice Date',
        enableSorting: false,
        accessorKey: 'notice_date',
        cell: (props) => (
          <div className="w-32 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Reference Number',
        enableSorting: false,
        accessorKey: 'reference_number',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Related Act',
        enableSorting: false,
        accessorKey: 'related_act',
        cell: (props) => (
          <div className="w-32 truncate capitalize">
            {(props.getValue() as string).replace(/_/g, ' ')}
          </div>
        ),
      },
      {
        header: 'Notice Document',
        enableSorting: false,
        accessorKey: 'notice_document',
        cell: (props) => {
          const document = props.getValue() as string | null;
          
          const handleDocumentDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            if (document) {
              const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${document}`;
              window.open(fullPath, '_blank');
            }
          };

          return (
            <div className="w-40 flex items-center">
              {document ? (
                <a 
                  href="#" 
                  onClick={handleDocumentDownload} 
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
          <div className="flex items-center gap-2">
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
             <Tooltip title="View Responses">
          <Button
            size="sm"
            onClick={() => navigate(`/notice-tracker/response/`)} 
            icon={<FaEye />}
          />
        </Tooltip>
          </div>
        ),
      },
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
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
          <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
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

      <Dialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <div className="p-2">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this notice entry?</p>
          
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
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>

      <EditNoticeDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedNoticeId(null);
        }}
        noticeId={selectedNoticeId}
        onSuccess={onRefresh}
      />
    </div>
  );
};

export default NoticeTrackerTable;