// import React, { useMemo } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { HiArrowLeft } from 'react-icons/hi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { useNavigate } from 'react-router-dom';
// import { PFTrackerData } from './PFTrackerTable'; // Import the PFTrackerData interface
// import { MdEdit } from 'react-icons/md';
// import { FiTrash } from 'react-icons/fi';
// import ConfigDropdown from './ConfigDropdown';

// const documentPath = "../store/AllMappedCompliancesDetails.xls";


// export const dummyData: PFTrackerData[] = [
//   {
//       companyName: 'India shelter PVT Ltd',
//       pfCode: 'GNGGN2789109000',
//       location: 'Gurgaon',
//       month: 'Apr-23',
//       noOfEmployees: 2842,
//       wages: "43,355,212",
//       epsWage: "33,792,208",
//       totalChallanAmount: 11000569,
//       totalAmountPaid: 11000569 ,
//       difference: '',
//       reasonForDifference: '',
//       dueDate: '15-May-23',
//       dateOfPayment: '20-May-23',
//       delay: "5 Days",
//       delayReason: 'Gov. Portal server down',
//       typeOfChallan: 'Main',
//       trrnNo: '2032305004230',
//       crnNo: '229100523000279',
//       challan: 'Challan_IndiaShelter_Apr2023.pdf',
//       payment: 'Payment_IndiaShelter_Apr2023.pdf',
//       ecr: 'ECR_IndiaShelter_Apr2023.pdf'
//   },
//   {
//       companyName: 'India shelter PVT Ltd',
//       pfCode: 'GNGGN2789109000',
//       location: 'Gurgaon',
//       month: 'May-23',
//       noOfEmployees: 2934,
//       wages: "46,326,266",
//       epsWage: "35,492,350",
//       totalChallanAmount: 11715531,
//       totalAmountPaid: 11715531 ,
//       difference: '',
//       reasonForDifference: '',
//       dueDate: '15-Jun-23',
//       dateOfPayment: '13-Jun-23',
//       delay: "",
//       delayReason: '',
//       typeOfChallan: 'Main',
//       trrnNo: '2032306009449',
//       crnNo: '229130623009410',
//       challan: 'Challan_IndiaShelter_May2023.pdf',
//       payment: 'Payment_IndiaShelter_May2023.pdf',
//       ecr: 'ECR_IndiaShelter_May2023.pdf'
//   },
//   {
//       companyName: 'India shelter PVT Ltd',
//       pfCode: 'GNGGN2789109000',
//       location: 'Gurgaon',
//       month: 'Jun-23',
//       noOfEmployees: 551,
//       wages: "947,447",
//       epsWage: "599,602",
//       totalChallanAmount: 235132,
//       totalAmountPaid: 235132 ,
//       difference: '',
//       reasonForDifference: '',
//       dueDate: '15-Jun-23',
//       dateOfPayment: '13-Jul-23',
//       delay: "",
//       delayReason: '',
//       typeOfChallan: 'Arrear',
//       trrnNo: '2032307004954',
//       crnNo: '229130723000561',
//       challan: 'Challan_IndiaShelter_Jun2023.pdf',
//       payment: '',
//       ecr: 'ECR_IndiaShelter_Jun2023.pdf'
//   },
//   {
//       companyName: 'India shelter PVT Ltd',
//       pfCode: 'GNGGN2789109000',
//       location: 'Gurgaon',
//       month: 'Jun-23',
//       noOfEmployees: 551,
//       wages: "947,447",
//       epsWage: "599,602",
//       totalChallanAmount: 235132,
//       totalAmountPaid: 235132 ,
//       difference: '',
//       reasonForDifference: '',
//       dueDate: '15-Jun-23',
//       dateOfPayment: '12-Jul-23',
//       delay: "",
//       delayReason: '',
//       typeOfChallan: 'Main',
//       trrnNo: '2032307004894',
//       crnNo: '229130723000523',
//       challan: '',
//       payment: 'Payment_IndiaShelter_Jun2023.pdf',
//       ecr: 'ECR_IndiaShelter_Jun2023.pdf'
//   },
// ];

// interface UploadedPFDetailsProps {
//   onBack: () => void;
// }

// const UploadedPFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
//   const navigate = useNavigate();

//   const columns: ColumnDef<PFTrackerData>[] = useMemo(
//     () => [
  
//       {
//         header: 'PF Code',
//         accessorKey: 'pfCode',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'Location',
//         accessorKey: 'location',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'Month',
//         accessorKey: 'month',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'No. of Employees',
//         accessorKey: 'noOfEmployees',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
//     },
//     {
//         header: 'EPF Wages',
//         accessorKey: 'wages',
//         cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//     },
//     {
//         header: 'EPS Wage',
//         accessorKey: 'epsWage',
//         cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//     },
//     {
//         header: 'Total Challan Amount',
//         accessorKey: 'totalChallanAmount',
//         cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//     },
//     {
//         header: 'Total Amount Paid',
//         accessorKey: 'totalAmountPaid',
//         cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
//     },
//     {
//         header: 'Difference',
//         accessorKey: 'difference',
//         cell: (props) => <div className="w-52 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//     },
//     {
//         header: 'Reason For Difference',
//         accessorKey: 'reasonForDifference',
//         cell: (props) => <div className="w-52 truncate">{(props.getValue() as number).toLocaleString()}</div>,
//     },
//     {
//         header: 'Due Date',
//         accessorKey: 'dueDate',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'Date of Payment',
//         accessorKey: 'dateOfPayment',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'Delay',
//         accessorKey: 'delay',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
//     },
//     {
//         header: 'Delay Reason',
//         accessorKey: 'delayReason',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'Type of Challan',
//         accessorKey: 'typeOfChallan',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'TRRN No',
//         accessorKey: 'trrnNo',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//     {
//         header: 'CRN No',
//         accessorKey: 'crnNo',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//     },
//       {
//         header: 'ECR',
//         accessorKey: 'ecr',
//         cell: (props) => 
//         <div className="w-40 truncate">
//           <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//             {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//             {props.getValue() as string}
//           </a>
//         </div>,
//       },
//       {
//         header: 'Challan',
//         accessorKey: 'challan',
//         cell: (props) => 
//         <div className="w-40 truncate">
//           <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
//             {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
//             {props.getValue() as string}
//           </a>
//         </div>,
//       },
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
    //   {
    //     header: 'Actions',
    //     id: 'actions',
    //     cell: ({ row }) => (
    //         <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
    //     ),
    // },
//     ],
//     []
//   );

//   const backFunction = () => {
//     navigate('/pf-tracker');
//   };


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
//         <h2 className="text-2xl font-bold">Uploaded PF Tracker Details</h2>
//       </div>
//       <DataTable
//         columns={columns}
//         data={dummyData}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />
//     </div>
//   );
// };

// export default UploadedPFDetails;

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { PFTrackerData } from './PFTrackerTable'; // Import the PFTrackerData interface
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import ConfigDropdown from './ConfigDropdown';
import { PfChallanData } from '@/@types/pfTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import dayjs from 'dayjs';

const documentPath = "../store/AllMappedCompliancesDetails.xls";



interface UploadedPFDetailsProps {
  onBack: () => void;
}

const UploadedPFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<PfChallanData[]>([]);


  useEffect(() => {
    fetchPFTrackerData();
  }, []);

  const fetchPFTrackerData = async () => {
    try {
      const res = await httpClient.get(endpoints.tracker.pfGetALl())
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PF tracker data:', error);
    }
  };
  const columns: ColumnDef<PFTrackerData>[] = useMemo(
    () => [
      {
        header: 'PF Code',
        accessorKey: 'PfSetup.pf_code',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Company Group',
        accessorKey: 'PfSetup.CompanyGroup.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Company',
        accessorKey: 'PfSetup.Company.name',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        accessorKey: 'PfSetup.Location.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'No. of Employees',
        accessorKey: 'no_of_emp',
        cell: (props) => <div className="w-28 truncate  text-center">{props.getValue() as number}</div>,
      },
      {
        header: 'Month',
        accessorKey: 'payroll_month',
        cell: (props) => {
          const date = new Date(props.getValue() as string);
          return (
            <div className="w-28 truncate">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
          );
        }
      },
      {
        header: 'EPF Wage',
        accessorKey: 'epf_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EPS Wage',
        accessorKey: 'eps_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EDLI Wage',
        accessorKey: 'edli_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Challan Amount',
        accessorKey: 'total_challan_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Paid Amount',
        accessorKey: 'total_paid_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference Amount',
        accessorKey: 'difference_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference Reason',
        accessorKey: 'difference_reason',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payment Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => <div className="w-28 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Payment Date',
        accessorKey: 'payment_date',
        cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Delay in Days',
        accessorKey: 'delay_in_days',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as number || '-'}</div>,
      },
      {
        header: 'Delay Reason',
        accessorKey: 'delay_reason',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string || '-'}</div>,
      },
      {
        header: 'Challan Type',
        accessorKey: 'challan_type',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
        header: 'Remark',
        accessorKey: 'remark',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Upload Date',
        accessorKey: 'upload_date',
        cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Uploaded By',
        accessorKey: 'UploadBy.first_name',
        cell: (props) => (
          <div className="w-40 truncate">
            {`${props.row.original.UploadBy?.first_name} ${props.row.original.UploadBy?.last_name}`}
          </div>
        ),
      },
      {
        header: 'ECR Document',
        accessorKey: 'ecr_document',
        cell: (props) => (
          <div className="w-40 truncate">
            {props.getValue() ? (
              <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
                {props.getValue() as string}
              </a>
            ) : (
               '--'
            )}
          </div>
        ),
      },
      {
        header: 'Challan Document',
        accessorKey: 'challan_document',
        cell: (props) => (
          <div className="w-40 truncate">
            {props.getValue() ? (
              <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
                {props.getValue() as string}
              </a>
            ) : (
               '--'
            )}
          </div>
        ),
      },
      {
        header: 'Receipt Document',
        accessorKey: 'receipt_document',
        cell: (props) => (
          <div className="w-40 truncate">
            {props.getValue() ? (
              <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
                {props.getValue() as string}
              </a>
            ) : (
               '--'
            )}
          </div>
        ),
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
            <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
        ),
    },
    ],
    []
  );

  const backFunction = () => {
    navigate('/pf-tracker');
  };


  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Implement the download functionality here
    // For example, you could use the `fetch` API to download the file
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
        <h2 className="text-2xl font-bold">Uploaded PF Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
    </div>
  );
};

export default UploadedPFDetails;