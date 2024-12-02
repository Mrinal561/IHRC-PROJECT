// import React, { useCallback, useMemo, useState } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { FiEdit, FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { MdEdit } from 'react-icons/md';
// import PTTrackerEditDialog from './PTRCTrackerEditDialog';
// import ConfigDropdown from './ConfigDropdown';
// const documentPath = "../store/AllMappedCompliancesDetails.xls";

// // Define the structure of your data
// export interface PTTrackerData {
//   companyName: string;
//   state: string;
//   ptRCDistrict: string;
//   ptRCLocation: string;
//   stateLocation: string;
//   locationAddress: string;
//   ptRC: string;
//   userId: string;
//   password: string;
//   frequency: string;
//   remittanceMode: string;
//   month: string;
//   noOfEmployees: number;
//   wages: number;
//   pt: number;
//   totalAmountPaid: number;
//   differenceInAmount: number;
//   differenceReason: string;
//   receiptNo: string;
//   dueDate: string;
//   dateOfPayment: string;
//   remarks: string;
//   delay: string;
//   delayReason:string;
//   challan: string;
//   payment: string;
//   ret:string;
// }

// // Dummy data (replace with your actual data source)
// export const dummyData: PTTrackerData[] = [
//   {
//     companyName: 'India Shelter',
//     state: 'Gujarat',
//     ptRCDistrict: 'Ahmedabad',
//     ptRCLocation: 'Navrangpura',
//     stateLocation: 'GUJARAT',
//     locationAddress: '123 Main St, Navrangpura, Ahmedabad, Gujarat 380009',
//     ptRC: 'PRC010512001831',
//     userId: 'sakshamhrservices',
//     password: 'Tonk@304001',
//     frequency: 'Monthly',
//     remittanceMode: 'Online',
//     month: 'Jul-24',
//     noOfEmployees: 34,
//     wages: 660066,
//     pt: 2024,
//     totalAmountPaid: 660000,
//     differenceInAmount: 66,
//     differenceReason: 'Rounding error',
//     receiptNo: '1275383',
//     dueDate: '15-Aug-24',
//     dateOfPayment: '20-Aug-24',
//     remarks: 'Paid with delay due to technical issues',
//     delay: "5 Days",
//     delayReason: "Server Error",
//     challan: 'Challan_IndiaShelter_Jul2024.pdf',
//     payment: 'Payment_IndiaShelter_Jul2024.pdf',
//     ret: 'Return_IndiaShelter_Jul2024.pdf'
//   },
//   {
//     companyName: 'Tech Solutions',
//     state: 'Maharashtra',
//     ptRCDistrict: 'Mumbai Suburban',
//     ptRCLocation: 'Andheri',
//     stateLocation: 'MAHARASHTRA',
//     locationAddress: '456 Tech Park, Andheri East, Mumbai 400093',
//     ptRC: 'PRC020613002942',
//     userId: 'techsolutionshr',
//     password: 'Mumbai@2024',
//     frequency: 'Half Yearly',
//     remittanceMode: 'Online',
//     month: 'Jun-24',
//     noOfEmployees: 120,
//     wages: 3500000,
//     pt: 7500,
//     totalAmountPaid: 7500,
//     differenceInAmount: 0,
//     differenceReason: '',
//     receiptNo: '2468101',
//     dueDate: '30-Jun-24',
//     dateOfPayment: '28-Jun-24',
//     remarks: 'Paid on time',
//     delay: "",
//     delayReason: "",
//     challan: 'Challan_TechSolution_Jun2024.pdf',
//     payment: 'Payment_TechSolution_Jun2024.pdf',
//     ret: 'Return_TechSolution_Jun2024.pdf'
//   },
//   {
//     companyName: 'Green Energy Ltd',
//     state: 'Tamil Nadu',
//     ptRCDistrict: 'Chennai',
//     ptRCLocation: 'Anna Nagar',
//     stateLocation: 'TAMIL NADU',
//     locationAddress: '789 Eco Building, Anna Nagar, Chennai 600040',
//     ptRC: 'PRC030714003053',
//     userId: 'greenenergytax',
//     password: 'Chennai@2024',
//     frequency: 'Monthly',
//     remittanceMode: 'Offline',
//     month: 'Aug-24',
//     noOfEmployees: 67,
//     wages: 1200000,
//     pt: 3500,
//     totalAmountPaid: 3400,
//     differenceInAmount: 100,
//     differenceReason: 'Calculation error',
//     receiptNo: '3579246',
//     dueDate: '15-Sep-24',
//     dateOfPayment: '14-Sep-24',
//     remarks: 'Difference to be adjusted next month',
//     delay: "",
//     delayReason: "",
//     challan: 'Challan_Green_Energy_Ltd__Aug2024.pdf',
//     payment: 'Payment_Green_Energy_Ltd__Aug2024.pdf',
//     ret: ''
//   },
//   {
//     companyName: 'Innovate Systems',
//     state: 'Karnataka',
//     ptRCDistrict: 'Bengaluru Urban',
//     ptRCLocation: 'Whitefield',
//     stateLocation: 'KARNATAKA',
//     locationAddress: '101 Tech Valley, Whitefield, Bengaluru 560066',
//     ptRC: 'PRC040815004164',
//     userId: 'innovatesyshr',
//     password: 'Bangalore@2024',
//     frequency: 'Monthly',
//     remittanceMode: 'Online',
//     month: 'Sep-24',
//     noOfEmployees: 89,
//     wages: 2800000,
//     pt: 6000,
//     totalAmountPaid: 6000,
//     differenceInAmount: 0,
//     differenceReason: '',
//     receiptNo: '4681012',
//     dueDate: '15-Oct-24',
//     dateOfPayment: '10-Oct-24',
//     remarks: 'Paid early',
//     delay: "",
//     delayReason: "",
//     challan: 'Challan_Innovate_Systems_Sep2024.pdf',
//     payment: 'Payment_Innovate_Systems_Sep2024.pdf',
//     ret: 'Return_Innovate_Systems_Sep2024.pdf'
//   },
//   {
//     companyName: 'Global Logistics',
//     state: 'West Bengal',
//     ptRCDistrict: 'Kolkata',
//     ptRCLocation: 'Howrah',
//     stateLocation: 'WEST BENGAL',
//     locationAddress: '222 Port Road, Howrah, Kolkata 711101',
//     ptRC: 'PRC050916005275',
//     userId: 'globallogisticsfinance',
//     password: 'Kolkata@2024',
//     frequency: 'Half Yearly',
//     remittanceMode: 'Online',
//     month: 'Oct-24',
//     noOfEmployees: 145,
//     wages: 4000000,
//     pt: 9000,
//     totalAmountPaid: 8800,
//     differenceInAmount: 200,
//     differenceReason: 'New joinees not included',
//     receiptNo: '5792468',
//     dueDate: '31-Oct-24',
//     dateOfPayment: '05-Nov-24',
//     remarks: 'Paid with delay, difference to be paid separately',
//     delay: "5 Days",
//     delayReason: "Administrative delay",
//     challan: 'Challan_Global_Logistics_Oct2024.pdf',
//     payment: '',
//     ret: 'Return_Global_Logistics_Oct2024.pdf'
//   }
// ];

// const PTRCTrackerTable: React.FC = () => {
//   const [data, setData] = useState<PTTrackerData[]>(dummyData);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editingData, setEditingData] = useState<PTTrackerData | null>(null);
//   const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});


//   const handleEdit = (row: PTTrackerData) => {
//     setEditingData(row);
//     setEditDialogOpen(true);
// };


// const handleEditSubmit = (editedData: PTTrackerData) => {
//     setData((prevData) =>
//         prevData.map((item) =>
//             item === editingData ? editedData : item
//         )
//     );
//     setEditDialogOpen(false);
//     setEditingData(null);
// };





//   const columns: ColumnDef<PTTrackerData>[] = useMemo(
//     () => [
//       {
//         header: 'Company',
//         accessorKey: 'companyName',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'State',
//         accessorKey: 'state',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'PT RC District',
//         accessorKey: 'ptRCDistrict',
//         cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'PT RC Location',
//         accessorKey: 'ptRCLocation',
//         cell: (props) =>
//         <div className="w-36 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'PT RC Location Address',
//         accessorKey: 'locationAddress',
//         cell: (props) =>  {
//           const value = props.getValue() as string;
//           return (
//               <Tooltip title={value} placement="top">
//           <div className="w-36 truncate">{props.getValue() as string}</div>
//         </Tooltip>
//           )
//       },
//       },
//       {
//         header: 'PT RC Number',
//         accessorKey: 'ptRC',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//       },
      
//       {
//         header: 'Remittance Mode',
//         accessorKey: 'remittanceMode',
//         cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Frequency',
//         accessorKey: 'frequency',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'No. of Employees',
//         accessorKey: 'noOfEmployees',
//         cell: (props) => <div className="w-36 truncate">{props.getValue() as number}</div>,
//       },
//       {
//         header: 'Month',
//         accessorKey: 'month',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Gross Salary',
//         accessorKey: 'wages',
//         cell: (props) => <div className="w-32 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//       },
//       {
//         header: 'PT Amount',
//         accessorKey: 'pt',
//         cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//       },
//       {
//         header: 'Total Amount Paid',
//         accessorKey: 'totalAmountPaid',
//         cell: (props) => <div className="w-40 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//       },
//       {
//         header: 'Difference in Amount',
//         accessorKey: 'differenceInAmount',
//         cell: (props) => <div className="w-44 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//       },
//       {
//         header: 'Reason for Difference',
//         accessorKey: 'differenceReason',
//         cell: (props) => <div className="w-44 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//       },
//       {
//         header: 'Due Date',
//         accessorKey: 'dueDate',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Date of Payment',
//         accessorKey: 'dateOfPayment',
//         cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Delay',
//         accessorKey: 'delay',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Delay Reason',
//         accessorKey: 'delayReason',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       // {
//       //   header: 'Challan',
//       //   accessorKey: 'challan',
//       //   cell: (props) =>
//       //   <div className="w-40 truncate">
//       //     <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//       //       {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//       //       {props.getValue() as string}
//       //     </a>
//       //   </div>,
//       // },
//       {
//         header: 'Payment Receipt',
//         accessorKey: 'payment',
//         cell: (props) =>
//         <div className="w-40 truncate">
//           <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//             {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//             {props.getValue() as string}
//           </a>
//         </div>,
//       },
//       {
//         header: 'Return Receipt',
//         accessorKey: 'ret',
//         cell: (props) =>
//         <div className="w-40 truncate">
//           <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//             {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//             {props.getValue() as string}
//           </a>
//         </div>,
//       },
//       {
//         header: 'Upload Status',
//         id: 'uploadStatus',
//         cell: ({ row }) => {
//             const {  payment,ret } = row.original;
//             const uploadedCount = [ payment, ret].filter(Boolean).length;
//             return <div className="w-32 truncate">{`${uploadedCount}/2`}</div>;
//         },
//     },
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
//                 onClick={() => console.log('delete')}
//                 icon={<FiTrash />}
//                 className="text-red-500"
//               />
//             </Tooltip>
//             <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
//           </div>
//         ),
//       },
//     ],
//     []
//   );
//   const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     // Implement the download functionality here
//     // For example, you could use the `fetch` API to download the file
//     fetch(documentPath)
//       .then(response => response.blob())
//       .then(blob => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = 'AllMappedCompliancesDetails.xls';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       })
//       .catch(() => console.error('Download failed'));
//   };
//   return (
//     <div className="relative">
//       <DataTable
//         columns={columns}
//         data={data}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />
//       {editingData && (
//         <PTTrackerEditDialog
//           isOpen={editDialogOpen}
//           onClose={() => setEditDialogOpen(false)}
//           onSubmit={handleEditSubmit}
//           data={editingData}
//         />
//       )}
//     </div>
//   );
// };

// export default PTRCTrackerTable;


import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PTTrackerEditDialog from './PTRCTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import { PTTrackerData } from '@/@types/PTTracker';
import dayjs from 'dayjs';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';
import { HiOutlineViewGrid } from 'react-icons/hi';

interface PTTrackerTableProps {
  dataSent: PTTrackerData[];
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
}

const PTRCTrackerTable: React.FC<PTTrackerTableProps> = ({
  dataSent,
  loading,
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  companyName
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
      // {
      //   header: 'PT RC District',
      //   accessorKey: 'ptRCDistrict',
      //   cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      // },
      {
        header: 'PT RC Location',
        accessorKey: 'PtSetup.Location.name',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      // {
      //   header: 'PT RC Location Address',
      //   accessorKey: 'locationAddress',
      //   cell: (props) => {
      //     const value = props.getValue() as string;
      //     return (
      //       <Tooltip title={value}>
      //         <div className="w-52 truncate">{value}</div>
      //       </Tooltip>
      //     );
      //   }
      // },
      {
        header: 'PT RC Number',
        accessorKey: 'PtSetup.register_number',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
        header: 'No. of Employees',
        accessorKey: 'no_of_emp',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as number}</div>,
      },
      {
        header: 'Month',
        accessorKey: 'payroll_month',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Gross Salary',
        accessorKey: 'gross_salary',
        cell: (props) => (
          <div className="w-32 truncate">
            ₹{(props.getValue() as number).toLocaleString()}
          </div>
        ),
      },
      // {
      //   header: 'PT Amount',
      //   accessorKey: 'pt',
      //   cell: (props) => (
      //     <div className="w-28 truncate">
      //       ₹{(props.getValue() as number).toLocaleString()}
      //     </div>
      //   ),
      // },
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
        header: 'Difference in Amount',
        accessorKey: 'difference_amt',
        cell: (props) => (
          <div className="w-44 truncate">
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
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payment',
        accessorKey: 'ptrc_document',
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
        accessorKey: 'ptrc_return_document',
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
        id: 'uploadStatus',
        cell: ({ row }) => {
          const { ptrc_document, ptrc_return_document } = row.original;
          const uploadedCount = [ptrc_document, ptrc_return_document].filter(Boolean).length;
          return <div className="w-32 truncate">{`${uploadedCount}/2`}</div>;
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

export default PTRCTrackerTable;