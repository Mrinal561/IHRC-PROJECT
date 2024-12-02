export const dummyData: PFIWTrackerData[] = [
    {
      companyName: 'India Shelter',
        pfCode: 'RJUDR0021857000',
        location: 'UDAIPUR',
        month: 'Apr-23',
        dueDate: '15-May-23',
        submissionDate: '1-May-23',
        delay:'5 Days',
        delayReason:'Technical issues with the portal',
        challan: "Challan_IndiaShelter_Apr2023.pdf",
    },
    {
      companyName: 'India Shelter',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Apr-23',
        dueDate: '15-May-23',
        submissionDate: '1-May-23',
        delay:'',
        delayReason:'',
        challan: "Challan_IndiaShelter_Apr2023.pdf",
    },
    // Add more dummy data here
];





// import React, { useMemo, useState } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { FiEdit, FiTrash } from 'react-icons/fi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { MdEdit } from 'react-icons/md';
// import PFIWTrackerEditDialog from './PFIWTrackerEditDialog';
// import ConfigDropdown from './ConfigDropdown';

// const documentPath = "../store/AllMappedCompliancesDetails.xls";

// // Define the structure of your data
// export interface PFIWTrackerData {
//     companyName: string;
//     pfCode: string;
//     location: string;
//     month: string;
//     dueDate: string;
//     submissionDate: string;
//     delay:string;
//     delayReason:string;
//     challan: string;
// }

// // Dummy data (replace with your actual data source)
// export const dummyData: PFIWTrackerData[] = [
//     {
//       companyName: 'India Shelter',
//         pfCode: 'RJUDR0021857000',
//         location: 'UDAIPUR',
//         month: 'Apr-23',
//         dueDate: '15-May-23',
//         submissionDate: '1-May-23',
//         delay:'5 Days',
//         delayReason:'Technical issues with the portal',
//         challan: "Challan_IndiaShelter_Apr2023.pdf",
//     },
//     {
//       companyName: 'India Shelter',
//         pfCode: 'GNGGN2789109000',
//         location: 'Gurgaon',
//         month: 'Apr-23',
//         dueDate: '15-May-23',
//         submissionDate: '1-May-23',
//         delay:'',
//         delayReason:'',
//         challan: "Challan_IndiaShelter_Apr2023.pdf",
//     },
//     // Add more dummy data here
// ];

// const PFIWTrackerTable: React.FC = () => {
//     const [data, setData] = useState<PFIWTrackerData[]>(dummyData);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [editingData, setEditingData] = useState<PFIWTrackerData | null>(null);

//     const handleEdit = (row: PFIWTrackerData) => {
//         console.log('Edit', row);
//         setEditingData(row);
//         setEditDialogOpen(true);
//         // Implement edit functionality
//     };

//     const handleEditSubmit = (editedData: PFIWTrackerData) => {
//       setData((prevData) =>
//           prevData.map((item) =>
//               item === editingData ? editedData : item
//           )
//       );
//       setEditDialogOpen(false);
//       setEditingData(null);
//   };
//     const columns: ColumnDef<PFIWTrackerData>[] = useMemo(
//         () => [
//             {
//                 header: 'Company',
//                 accessorKey: 'companyName',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'PF Code',
//                 accessorKey: 'pfCode',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Location',
//                 accessorKey: 'location',
//                 cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Month',
//                 accessorKey: 'month',
//                 cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Due Date',
//                 accessorKey: 'dueDate',
//                 cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Date Of Payment',
//                 accessorKey: 'submissionDate',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//               header: 'Dealy',
//               accessorKey: 'delay',
//               cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//           },
//           {
//             header: 'Dealy Reason',
//             accessorKey: 'delayReason',
//             cell: (props) =>{
//                 const value = props.getValue() as string;
//                 return(
//                     <Tooltip title={value}>
//                     <div className="w-40 truncate">{props.getValue() as string}</div>
//                     </Tooltip>
//                 )
//                 }
//         },
//         {
//             header: 'Challan',
//             accessorKey: 'challan',
//             cell: (props) => 
//             <div className="w-40 truncate">
//               <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//                 {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//                 {props.getValue() as string}
//               </a>
//             </div>,
//           },
//         //   {
//         //     header: 'Payment Receipt',
//         //     accessorKey: 'payment',
//         //     cell: (props) => 
//         //     <div className="w-40 truncate">
//         //       <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//         //         {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//         //         {props.getValue() as string}
//         //       </a>
//         //     </div>,
//         //   },
//           {
//             header: 'Upload Status',
//             id: 'uploadStatus',
//             cell: ({ row }) => {
//                 const { challan } = row.original;
//                 const uploadedCount = [challan].filter(Boolean).length;
//                 return <div className="w-32 truncate">{`${uploadedCount}/1`}</div>;
//             },
//         },
          
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
//                         <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
//                     </div>
//                 ),
//             },
//         ],
//         []
//     );
//     const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault();
//         // Implement the download functionality here
//         // For example, you could use the `fetch` API to download the file
//         fetch(documentPath)
//           .then(response => response.blob())
//           .then(blob => {
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.style.display = 'none';
//             a.href = url;
//             a.download = 'AllMappedCompliancesDetails.xls';
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//           })
//           .catch(() => console.error('Download failed'));
//       };


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
//             {editingData && (
//         <PFIWTrackerEditDialog
//           isOpen={editDialogOpen}
//           onClose={() => setEditDialogOpen(false)}
//           onSubmit={handleEditSubmit}
//           data={editingData}
//         />
//       )}
//         </div>
//     );
// };

// export default PFIWTrackerTable;

import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PFIWTrackerEditDialog from './PFIWTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import dayjs from 'dayjs';
import { PfiwChallanData } from '@/@types/PfiwChallanData';
import { HiOutlineViewGrid } from 'react-icons/hi';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Define the complete data structure with nested types
export interface Company {
  name: string;
}

export interface Location {
  name: string;
}

export interface CompanyGroup {
  name: string;
}

export interface PfSetup {
  Company: Company;
  CompanyGroup: CompanyGroup;
  Location: Location;
  pf_code: string;
}

export interface PFIWTrackerData {
  id: string;
  PfSetup: PfSetup;
  month: string;
  payment_due_date: string;
  payment_date: string;
  delay_days: number;
  delay_reason: string;
  challan_document: string | null;
  upload_status?: string;
}

interface PFIWTrackerTableProps {
  dataSent: PfiwChallanData[];
  loading?: boolean;
  onRefresh?: () => void;
  companyName: string;
   pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PFIWTrackerTable: React.FC<PFIWTrackerTableProps> =({ 
  dataSent, 
  loading = false, 
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  companyName
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PFIWTrackerData | null>(null);

  const handleEdit = (row: PFIWTrackerData) => {
    setEditingData(row);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (editedData: PFIWTrackerData) => {
    // Handle the update logic here
    setEditDialogOpen(false);
    setEditingData(null);
    if (onRefresh) {
    onRefresh();
  }
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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

  const columns: ColumnDef<PFIWTrackerData>[] = useMemo(
    () => [
      {
        header: 'Company',
        accessorKey: 'PfSetup.Company.name',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
        header: 'Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => (
          <div className="w-28 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Date Of Payment',
        accessorKey: 'payment_date',
        cell: (props) => (
          <div className="w-40 truncate">
            {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
          </div>
        ),
      },
      {
        header: 'Delay',
        accessorKey: 'delay_days',
        cell: (props) => (
          <div className="w-40 truncate">
            {props.getValue() ? `${props.getValue()} Days` : '--'}
          </div>
        ),
      },
      {
        header: 'Delay Reason',
        accessorKey: 'delay_reason',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value}>
              <div className="w-40 truncate">{value || '--'}</div>
            </Tooltip>
          );
        },
      },

{
  header: 'IW return',
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
          const uploadedCount = challan_document ? 1 : 0;
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
                onClick={() => console.log('Delete', row.original)}
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
        ),
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
            No data available for {companyName}
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
        <PFIWTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
        />
      )}
    </div>
  );
};

export default PFIWTrackerTable;