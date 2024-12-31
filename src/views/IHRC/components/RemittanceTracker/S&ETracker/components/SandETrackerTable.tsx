
// import React, { useMemo, useState } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { FiEdit, FiTrash } from 'react-icons/fi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { MdEdit } from 'react-icons/md';
// import SandETrackerEditDialog from './SandETrackerEditDialog';
// // import LWFTrackerEditDialog from './LWFTrackerEditDialog';
// // import PFTrackerEditDialog from './PFTrackerEditDialog';
// import ConfigDropDown from './ConfigDropDown';


// const documentPath = "../store/AllMappedCompliancesDetails.xls";

// // Define the structure of your data
// export interface SandETrackerData {
//     companyName: string;
//     state: string;
//     location: string;
//     address: string;
//     branchOpeningDate: string;
//     sandeNumber: string;
//     userId: string;
//     password: string;
//     dueDate: string;
//     aggreedDueDate: string;
//     actualDate: string;
//     delay: string;
//     delayReason: string;
//     payment: string;
// }

// // Dummy data (replace with your actual data source)
// export const dummyData: SandETrackerData[] = [
//     {
//         companyName: 'India shelter PVT Ltd',
//         state: 'Uttar Pradesh',
//         location: 'Agra',
//         address: 'Shop No.6, Upper Ground Floor, C.R. Mall, Church Road, Ram Nagar Colony, Agra 282002',
//         branchOpeningDate: '6-Jan-18',
//         sandeNumber: "UPSA16707715",
//         userId: "241186951268",
//         password: "Pass@1234",
//         dueDate: '31-Jan-23',
//         aggreedDueDate: '31-Jan-23',
//         actualDate: '',
//         delay: '',
//         delayReason: '',
//         payment: "Payment Receipt",
//     },
//     {
//         companyName: 'India shelter PVT Ltd',
//         state: 'Gujarat',
//         location: 'Ahmedabad',
//         address: '302, Ratna Business Square, Old Nataraj Cinema, 3rd Floor, Ellish Bridge, Ashram Road, Ahemdabad - 380009 (Gujrat)',
//         branchOpeningDate: '2-May-14',
//         sandeNumber: 'PII/LG/2900020/0163488',
//         userId: "241186951268",
//         password: "Pass@1234",
//         dueDate: '31-Jan-23',
//         aggreedDueDate: '31-Jan-23',
//         actualDate: '',
//         delay: '',
//         delayReason: '',
//         payment: "Payment Receipt",
//     },
//     {
//         companyName: 'India shelter PVT Ltd',
//         state: 'Maharashtra',
//         location: 'Ahmednagar',
//         address: 'Office No. 220, Sai Midas Touch, Commercial Complex, Second Floor, Nagar -  Manmad Road Savedi, Ahmednagar - 414003',
//         branchOpeningDate: '21-Sep-17',
//         sandeNumber: '',
//         userId: "241186951268",
//         password: "Pass@1234",
//         dueDate: '30-Apr-23',
//         aggreedDueDate: '30-Apr-23',
//         actualDate: '26-Apr-23',
//         delay: '',
//         delayReason: '',
//         payment: "Payment Receipt",
//     },
//     {
//         companyName: 'India shelter PVT Ltd',
//         state: 'Rajasthan',
//         location: 'Ajmer',
//         address: 'Marwad House, 2nd Floor, Jaipur Road, Suchana Kendra Chouraha,Ajmer - 305001',
//         branchOpeningDate: '1-Aug-10',
//         sandeNumber: 'SCA/2021/1/132630',
//         userId: "241186951268",
//         password: "Pass@1234",
//         dueDate: '',
//         aggreedDueDate: '',
//         actualDate: '',
//         delay: '',
//         delayReason: '',
//         payment: "",
//     },
//     {
//         companyName: 'India shelter PVT Ltd',
//         state: 'Maharashtra',
//         location: 'Akola',
//         address: 'Office No. 18 & 19, 2nd Floor, Yamuna Tarang Complex, National Highway No. 6, Vidya Nagar, Akola - 444001',
//         branchOpeningDate: '1-May-16',
//         sandeNumber: '',
//         userId: "241186951268",
//         password: "Pass@1234",
//         dueDate: '30-Apr-23',
//         aggreedDueDate: '30-Apr-23',
//         actualDate: '26-Apr-23',
//         delay: '',
//         delayReason: '',
//         payment: "Payment Receipt",
//     },
    
// ];

// const SandETrackerTable: React.FC = () => {
//     const [data, setData] = useState<SandETrackerData[]>(dummyData);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [editingData, setEditingData] = useState<SandETrackerData | null>(null);

//     const handleEdit = (row: SandETrackerData) => {
//         setEditingData(row);
//         setEditDialogOpen(true);
//     };


//     const handleEditSubmit = (editedData: SandETrackerData) => {
//         setData((prevData) =>
//             prevData.map((item) =>
//                 item === editingData ? editedData : item
//             )
//         );
//         setEditDialogOpen(false);
//         setEditingData(null);
//     };
//     const columns: ColumnDef<SandETrackerData>[] = useMemo(
//         () => [
//             {
//                 header: 'Company Name',
//                 accessorKey: 'companyName',
//                 cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'State',
//                 accessorKey: 'state',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Location',
//                 accessorKey: 'location',
//                 cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
//             },
//             {
//                 header: 'Address',
//                 accessorKey: 'address',
//                 cell: (props) => {
//                     const value = props.getValue() as string;
//                     return(
//                         <Tooltip title={value} placement="top">
//                         <div className="w-52 truncate">{props.getValue() as string}</div>,
//                         </Tooltip>
//                     );
//                 }
//             },
//             {
//                 header: 'Opening Date',
//                 accessorKey: 'branchOpeningDate',
//                 cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
//             },
//             {
//                 header: 'S&E Number',
//                 accessorKey: 'sandeNumber',
//                 cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//             },
//             {
//                 header: 'User ID',
//                 accessorKey: 'userId',
//                 cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//             },
//             {
//                 header: 'Password',
//                 accessorKey: 'password',
//                 cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//             },
//             {
//                 header: 'Due Date',
//                 accessorKey: 'dueDate',
//                 cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//             },
//             {
//               header: 'Agreed Due Date',
//               accessorKey: 'aggreedDueDate',
//               cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//           },
//             {
//               header: 'Actual Date',
//               accessorKey: 'actualDate',
//               cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//           },
//             {
//               header: 'Delay',
//               accessorKey: 'delay',
//               cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
//           },
//           {
//               header: 'Delay Reason',
//               accessorKey: 'delayReason',
//               cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//           },
//           {
//             header: 'Payment Receipt',
//             accessorKey: 'payment',
//             cell: (props) => 
//             <div className="w-40 truncate">
//               <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//                 {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//                 {props.getValue() as string}
//               </a>
//             </div>,
//           },
//           {
//             header: 'Upload Status',
//             id: 'uploadStatus',
//             cell: ({ row }) => {
//                 const {  payment} = row.original;
//                 const uploadedCount = [payment].filter(Boolean).length;
//                 return <div className="w-32 truncate">{`${uploadedCount}/1`}</div>;
//             },
//         },
//           {
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
//                         <ConfigDropDown companyName={undefined} companyGroupName={undefined}            />
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
//                 <SandETrackerEditDialog
//                     isOpen={editDialogOpen}
//                     onClose={() => setEditDialogOpen(false)}
//                     onSubmit={handleEditSubmit}
//                     data={editingData}
//                 />
//             )}
//         </div>
//     );
// };

// export default SandETrackerTable;

import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import ConfigDropDown from './ConfigDropDown';

// Define the new interface for the notice tracker data
export interface NoticeTrackerData {
    serialNumber: string;
    companyGroupName: string;
    entityName: string;
    state: string;
    location: string;
    noticeType: string;
    noticeReceivedDate: string;
    letterNumber: string;
    relatedAct: string;
    noticeCopy: string;
}

// Create dummy data with the new structure
export const dummyData: NoticeTrackerData[] = [
    {
        serialNumber: '001',
        companyGroupName: 'ABC Group',
        entityName: 'ABC Technologies Pvt Ltd',
        state: 'Maharashtra',
        location: 'Mumbai',
        noticeType: 'Legal Notice',
        noticeReceivedDate: '2024-01-15',
        letterNumber: 'LN/2024/001',
        relatedAct: 'Companies Act 2013',
        noticeCopy: 'notice_001.pdf'
    },
    {
        serialNumber: '002',
        companyGroupName: 'XYZ Corporation',
        entityName: 'XYZ Industries Ltd',
        state: 'Karnataka',
        location: 'Bangalore',
        noticeType: 'Show Cause Notice',
        noticeReceivedDate: '2024-01-20',
        letterNumber: 'SCN/2024/045',
        relatedAct: 'Labor Laws',
        noticeCopy: 'notice_002.pdf'
    },
    {
        serialNumber: '003',
        companyGroupName: 'PQR Enterprises',
        entityName: 'PQR Solutions',
        state: 'Gujarat',
        location: 'Ahmedabad',
        noticeType: 'Compliance Notice',
        noticeReceivedDate: '2024-01-25',
        letterNumber: 'CN/2024/089',
        relatedAct: 'GST Act',
        noticeCopy: 'notice_003.pdf'
    },
    {
        serialNumber: '004',
        companyGroupName: 'LMN Holdings',
        entityName: 'LMN Services Ltd',
        state: 'Tamil Nadu',
        location: 'Chennai',
        noticeType: 'Tax Notice',
        noticeReceivedDate: '2024-01-30',
        letterNumber: 'TN/2024/123',
        relatedAct: 'Income Tax Act',
        noticeCopy: 'notice_004.pdf'
    }
];

const NoticeTrackerTable: React.FC = () => {
    const [data, setData] = useState<NoticeTrackerData[]>(dummyData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingData, setEditingData] = useState<NoticeTrackerData | null>(null);

    const handleEdit = (row: NoticeTrackerData) => {
        setEditingData(row);
        setEditDialogOpen(true);
    };

    const handleEditSubmit = (editedData: NoticeTrackerData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.serialNumber === editingData?.serialNumber ? editedData : item
            )
        );
        setEditDialogOpen(false);
        setEditingData(null);
    };

    const columns: ColumnDef<NoticeTrackerData>[] = useMemo(
        () => [
            {
                header: 'Sr. No.',
                accessorKey: 'serialNumber',
                cell: (props) => <div className="w-20">{props.getValue() as string}</div>,
            },
            {
                header: 'Company Group',
                accessorKey: 'companyGroupName',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Entity Name',
                accessorKey: 'entityName',
                cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'State',
                accessorKey: 'state',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Location',
                accessorKey: 'location',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Notice Type',
                accessorKey: 'noticeType',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Notice Received Date',
                accessorKey: 'noticeReceivedDate',
                cell: (props) => <div className="w-40">{props.getValue() as string}</div>,
            },
            {
                header: 'Letter Number',
                accessorKey: 'letterNumber',
                cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Related Act',
                accessorKey: 'relatedAct',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Notice Copy',
                accessorKey: 'noticeCopy',
                cell: (props) => (
                    <div className="w-32 truncate">
                        <a href="#" className="text-blue-600 hover:underline">
                            {props.getValue() as string}
                        </a>
                    </div>
                ),
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
                        <ConfigDropDown companyName={undefined} companyGroupName={undefined} />
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
            />
            {/* {editingData && (
                // <NoticeTrackerEditDialog
                //     isOpen={editDialogOpen}
                //     onClose={() => setEditDialogOpen(false)}
                //     onSubmit={handleEditSubmit}
                //     data={editingData}
                // />
            )} */}
        </div>
    );
};

export default NoticeTrackerTable;