// // import React, { useMemo } from 'react';
// // import { Button, Tooltip } from '@/components/ui';
// // import { HiArrowLeft } from 'react-icons/hi';
// // import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// // import { useNavigate } from 'react-router-dom';
// // import { MdEdit } from 'react-icons/md';
// // import { FiTrash } from 'react-icons/fi';
// // import ConfigDropdown from './ConfigDropDown';
// // const documentPath = "../store/AllMappedCompliancesDetails.xls";



// // export interface LWFTrackerData {
// //   companyName: string;
// //   state: string;
// //   lwfRegNo: string;
// //   frequency: string;
// //   period: string;
// //   lwfAmount: number;
// //   totalAmount: number;
// //   difference: string;
// //   differenceReason: string;
// //   dueDate: string;
// //   dateOfPayment: string;
// //   delay: string;
// //   delayReason: string;
// //   receiptNo: string;
// //   payment: string;
// // }

// // export const dummyData: LWFTrackerData[] = [
// //   {
// //       companyName: 'India Shelter',
// //       state: 'Karnataka',
// //       lwfRegNo: 'MH/123456',
// //       frequency: 'Yearly',
// //       period: 'Jul-2024',
// //       lwfAmount: 5000,
// //       totalAmount: 5000,
// //       difference: '0',
// //       differenceReason: '',
// //       dueDate: '2024-08-15',
// //       dateOfPayment: '2024-08-10',
// //       delay: '',
// //       delayReason: '',
// //       receiptNo: 'REC123456',
// //       payment: 'Payment_IndiaShelter_Jul2024.pdf',
// //     },
// //   {
// //       companyName: 'XYZ Industries',
// //       state: 'Karnataka',
// //       lwfRegNo: 'KA/789012',
// //       frequency: 'Yearly',
// //       period: 'Jul-2024',
// //       lwfAmount: 15000,
// //       totalAmount: 14500,
// //       difference: '500',
// //       differenceReason: 'Calculation error',
// //       dueDate: '30-Apr-2024',
// //       dateOfPayment: '05-May-2024',
// //       delay: '5',
// //       delayReason: 'Bank holiday',
// //       receiptNo: 'REC789012',
// //       payment: '',
// //   },
// //   {
// //       companyName: 'PQR Enterprises',
// //       state: 'Tamil Nadu',
// //       lwfRegNo: 'TN/345678',
// //       frequency: 'Half Yearly',
// //       period: 'H1 2024',
// //       lwfAmount: 25000,
// //       totalAmount: 25000,
// //       difference: '0',
// //       differenceReason: '',
// //       dueDate: '31-Jul-2024',
// //       dateOfPayment: '28-Jul-2024',
// //       delay: '',
// //       delayReason: '',
// //       receiptNo: 'REC345678',
// //       payment: 'Payment_PQREnterprises_Jul2024.pdf',
// //   },
// // ];

// // interface UploadedPFDetailsProps {
// //   onBack: () => void;
// // }

// // const UploadedLWFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
// //   const navigate = useNavigate();

// //   const columns: ColumnDef<LWFTrackerData>[] = useMemo(
// //     () => [
// //       {
// //         header: 'Company',
// //         accessorKey: 'companyName',
// //         cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'State',
// //         accessorKey: 'state',
// //         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Registration Number',
// //         accessorKey: 'lwfRegNo',
// //         cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Frequency',
// //         accessorKey: 'frequency',
// //         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Period',
// //         accessorKey: 'period',
// //         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'LWF Amount',
// //         accessorKey: 'lwfAmount',
// //         cell: (props) => <div className="w-52 truncate">₹{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Total Amount',
// //         accessorKey: 'totalAmount',
// //         cell: (props) => <div className="w-52 truncate">₹{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Difference',
// //         accessorKey: 'difference',
// //         cell: (props) => <div className="w-52 truncate">₹{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Difference Reason',
// //         accessorKey: 'differenceReason',
// //         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Due Date',
// //         accessorKey: 'dueDate',
// //         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Date Of Payment',
// //         accessorKey: 'dateOfPayment',
// //         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Delay',
// //         accessorKey: 'delay',
// //         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Delay Reason',
// //         accessorKey: 'delayReason',
// //         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Receipt Number',
// //         accessorKey: 'receiptNo',
// //         cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
// //     },
// //     {
// //         header: 'Payment Receipt',
// //         accessorKey: 'payment',
// //         cell: (props) =>
// //         <div className="w-40 truncate">
// //           <a href="#" className="text-blue-600 hover:underline">
// //             {props.getValue() as string}
// //           </a>
// //         </div>,
// //     },
// //       {
// //         header: 'Actions',
// //         id: 'actions',
// //         cell: ({ row }) => (
// //             <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
// //         ),
// //     },
// //     ],
// //     []
// //   );

// //   const backFunction = () => {
// //     navigate('/lwf-tracker');
// //   };
// //   const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
// //     e.preventDefault();
// //     // Implement the download functionality here
// //     // For example, you could use the `fetch` API to download the file
// //     fetch(documentPath)
// //       .then(response => response.blob())
// //       .then(blob => {
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.style.display = 'none';
// //         a.href = url;
// //         a.download = 'AllMappedCompliancesDetails.xls';
// //         document.body.appendChild(a);
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //       })
// //       .catch(() => console.error('Download failed'));
// //   };


// //   return (
// //     <div className="p-4">
// //       <div className="flex items-center mb-8">
// //         <Button
// //           variant="plain"
// //           size="sm"
// //           icon={<HiArrowLeft />}
// //           onClick={backFunction}
// //           className="mr-4"
// //         >
// //         </Button>
// //         <h2 className="text-2xl font-bold">Uploaded LWF Tracker Details</h2>
// //       </div>
// //       <DataTable
// //         columns={columns}
// //         data={dummyData}
// //         skeletonAvatarColumns={[0]}
// //         skeletonAvatarProps={{ className: 'rounded-md' }}
// //         stickyHeader={true}
// //         stickyFirstColumn={true}
// //         stickyLastColumn={true}
// //       />
// //     </div>
// //   );
// // };

// // export default UploadedLWFDetails;


// import React, { useEffect, useMemo, useState } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { HiArrowLeft } from 'react-icons/hi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { useNavigate } from 'react-router-dom';
// import ConfigDropdown from './ConfigDropdown';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';
// import dayjs from 'dayjs';

// export interface LWFTrackerData {
//   id: number;
//   uuid: string;
//   lwf_setup_id: number;
//   period: string;
//   salary_register_amt: number;
//   total_paid_amt: number;
//   difference_amt: number;
//   difference_reason: string | null;
//   payment_due_date: string;
//   payment_date: string;
//   delay_in_days: number | null;
//   delay_reason: string | null;
//   receipt_no: string;
//   receipt_document: string | null;
//   remark: string | null;
//   upload_date: string;
//   status: string;
//   uploaded_by: number;
//   created_at: string;
//   updated_at: string;
//   UploadBy: {
//     id: number;
//     name: string;
//     email: string;
//     mobile: string | null;
//   };
//   LwfSetup: {
//     register_number: string;
//     CompanyGroup: {
//       id: number;
//       name: string;
//     };
//     Company: {
//       id: number;
//       name: string;
//     };
//     Location: {
//       id: number;
//       name: string;
//     };
//   };
// }

// interface UploadedLWFDetailsProps {
//   onBack: () => void;
// }

// const UploadedLWFDetails: React.FC<UploadedLWFDetailsProps> = ({ onBack }) => {
//   const navigate = useNavigate();
//   const [data, setData] = useState<LWFTrackerData[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchLWFTrackerData();
//   }, []);

//   const fetchLWFTrackerData = async () => {
//     try {
//       setLoading(true);
//       const res = await httpClient.get(endpoints.lwftracker.lwfGetAll());
//       setData(res.data.data);
//     } catch (error) {
//       console.error('Error fetching LWF tracker data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns: ColumnDef<LWFTrackerData>[] = useMemo(
//     () => [
//      {
//       header: 'Company',
//       accessorKey: 'LwfSetup.Company.name',
//       cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
//     },
//     {
//       header: 'Location',
//       accessorKey: 'LwfSetup.Location.name',
//       cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//     {
//       header: 'Registration Number',
//       accessorKey: 'LwfSetup.register_number',
//       cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
//     },
//     {
//       header: 'Period',
//       accessorKey: 'period',
//       cell: (props) => <div className="w-28 truncate">
//         {dayjs(props.getValue() as string).format('MMM YYYY')}
//       </div>,
//     },
//     {
//       header: 'Salary Register Amt',
//       accessorKey: 'salary_register_amt',
//       cell: (props) => <div className="w-52 truncate">
//         ₹{(props.getValue() as number)?.toLocaleString() || '-'}
//       </div>,
//     },
//     {
//       header: 'Total Paid Amt',
//       accessorKey: 'total_paid_amt',
//       cell: (props) => <div className="w-52 truncate">
//         ₹{(props.getValue() as number)?.toLocaleString() || '-'}
//       </div>,
//     },
//     {
//       header: 'Difference Amt',
//       accessorKey: 'difference_amt',
//       cell: (props) => <div className="w-52 truncate">
//         ₹{(props.getValue() as number)?.toLocaleString() || '-'}
//       </div>,
//     },
//     {
//       header: 'Difference Reason',
//       accessorKey: 'difference_reason',
//       cell: (props) => <div className="w-40 truncate">
//         {(props.getValue() as string) || '-'}
//       </div>,
//     },
//     {
//       header: 'Due Date',
//       accessorKey: 'payment_due_date',
//       cell: (props) => <div className="w-28 truncate">
//         {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
//       </div>,
//     },
//     {
//       header: 'Payment Date',
//       accessorKey: 'payment_date',
//       cell: (props) => <div className="w-28 truncate">
//         {dayjs(props.getValue() as string).format('DD-MM-YYYY')}
//       </div>,
//     },
//     {
//       header: 'Delay in Days',
//       accessorKey: 'delay_in_days',
//       cell: (props) => <div className="w-28 truncate">
//         {props.getValue() ? `${props.getValue()} Days` : '-'}
//       </div>,
//     },
//     {
//       header: 'Delay Reason',
//       accessorKey: 'delay_reason',
//       cell: (props) => <div className="w-40 truncate">
//         {(props.getValue() as string) || '-'}
//       </div>,
//     },
//     {
//       header: 'Receipt No',
//       accessorKey: 'receipt_no',
//       cell: (props) => <div className="w-52 truncate">
//         {props.getValue() as string || '-'}
//       </div>,
//     },
//     {
//       header: 'Receipt Document',
//       accessorKey: 'receipt_document',
//       cell: (props) => (
//         <div className="w-40 truncate">
//           {props.getValue() ? (
//             <a
//               href={props.getValue() as string}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               Download
//             </a>
//           ) : (
//             '--'
//           )}
//         </div>
//       ),
//     },
//     {
//       header: 'Status',
//       accessorKey: 'status',
//       cell: (props) => <div className="w-28 truncate">
//         {props.getValue() as string}
//       </div>,
//     },
//     {
//       header: 'Uploaded By',
//       accessorKey: 'UploadBy.name',
//       cell: (props) => <div className="w-40 truncate">
//         {props.getValue() as string}
//       </div>,
//     },
//     {
//       header: 'Actions',
//       id: 'actions',
//       cell: ({ row }) => (
//         <ConfigDropdown
//           companyName={row.original.LwfSetup.Company.name}
//           companyGroupName={row.original.LwfSetup.CompanyGroup.name}
//         />
//       ),
//     },
//     ],
//     []
//   );

//   const backFunction = () => {
//     navigate('/lwf-tracker');
//   };

//   return (
//     <div className="p-4">
//       <div className="flex items-center mb-8">
//         <Button
//           variant="plain"
//           size="sm"
//           icon={<HiArrowLeft />}
//           onClick={backFunction}
//           className="mr-4"
//         >
//         </Button>
//         <h2 className="text-2xl font-bold">Uploaded LWF Tracker Details</h2>
//       </div>
//       <DataTable
//         columns={columns}
//         data={data}
//         loading={loading}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />
//     </div>
//   );
// };

// export default UploadedLWFDetails;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import { FiFile } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropDown'
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import dayjs from 'dayjs';

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
  UploadBy: {
    id: number;
    name: string;
    email: string;
    mobile: string | null;
  };
  LwfSetup: {
    register_number: string;
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
  };
}

interface UploadedLWFDetailsProps {
  onBack: () => void;
}

const UploadedLWFDetails: React.FC<UploadedLWFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<LWFTrackerData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLWFTrackerData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await httpClient.get(endpoints.lwftracker.lwfGetAll());
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching LWF tracker data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLWFTrackerData();
  }, [fetchLWFTrackerData]);

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
        header: 'Period',
        accessorKey: 'period',
        cell: (props) => {
          const date = new Date(props.getValue() as string);
          return (
            <div className="w-28 truncate">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
          );
        },
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
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value}>
              <div className="w-40 truncate">{value || '-'}</div>
            </Tooltip>
          );
        },
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
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value}>
              <div className="w-40 truncate">{value || '-'}</div>
            </Tooltip>
          );
        },
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
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
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
        cell: ({ row }) => (
          <ConfigDropdown 
            companyName={row.original.LwfSetup.Company.name} 
            companyGroupName={row.original.LwfSetup.CompanyGroup.name} 
            trackerId={row.original.id}
            onRefresh={fetchLWFTrackerData}
          />
        ),
      },
    ],
    []
  );

  const backFunction = () => {
    navigate('/lwf-tracker');
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
        >
        </Button>
        <h2 className="text-2xl font-bold">Uploaded LWF Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
    </div>
  );
};

export default UploadedLWFDetails;