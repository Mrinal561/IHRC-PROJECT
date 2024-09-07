
// import React, { useState } from 'react';
// import { Badge, Button, Dialog, Notification, toast, Tooltip } from '@/components/ui';
// import DataTable from '@/components/shared/DataTable';
// import { ColumnDef } from '@/components/shared/DataTable';
// import { FaDownload } from 'react-icons/fa6';
// import { HiDownload } from 'react-icons/hi';

// interface CertificateData {
//   complianceId: number;
//   complianceHeader: string;
//   issueDate: string;
//   expiryDate: string;
//   status: string;
//   Compliance_Instance_ID: number;
//   Legislation: string;
//   Location: string;
// }

// const statusColor: Record<string, string> = {
//   Active: 'bg-emerald-500',
//   Pending: 'bg-yellow-500',
//   Rejected: 'bg-red-500',
// };

// const initialData: CertificateData[] = [
//   {
//     complianceId: 3236,
//     complianceHeader: 'Renewal of Registration',
//     issueDate: '2024-01-15',
//     expiryDate: '2025-01-14',
//     status: 'Active',
//     Compliance_Instance_ID: 1003,
//     Legislation: 'Maharashtra Shops and Establishments Act 1948',
//     Location: 'Maharashtra',
//   },
//   {
//     complianceId: 4501,
//     complianceHeader: 'Annual Renewal of License',
//     issueDate: '2024-03-01',
//     expiryDate: '2024-03-31',
//     status: 'Active',
//     Compliance_Instance_ID: 1001,
//     Legislation: 'License Act 1963',
//     Location: 'Delhi',
//   },
//   {
//     complianceId: 5602,
//     complianceHeader: 'Monthly Compliance Report',
//     issueDate: '2024-04-01',
//     expiryDate: '2024-06-30',
//     status: 'Active',
//     Compliance_Instance_ID: 1002,
//     Legislation: 'Monthly Reporting Regulation 2020',
//     Location: 'Mumbai',
//   },
//   {
//     complianceId: 6789,
//     complianceHeader: 'Quarterly Wage Report',
//     issueDate: '2024-04-01',
//     expiryDate: '2024-06-30',
//     status: 'Active',
//     Compliance_Instance_ID: 1003,
//     Legislation: 'Wage Reporting Act 2021',
//     Location: 'Pune',
//   },
//   {
//     complianceId: 7890,
//     complianceHeader: 'Renewal of Trade License',
//     issueDate: '2024-04-01',
//     expiryDate: '2024-06-30',
//     status: 'Active',
//     Compliance_Instance_ID: 1004,
//     Legislation: 'Trade License Renewal Act 2018',
//     Location: 'Bengaluru',
//   },
  
// ];

// const DownloadCertificateButton = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleAssignClick = () => {
//     setIsDialogOpen(true);
//   };

//   const handleConfirm = () => {
//     setIsDialogOpen(false);
//     toast.push(
//       <Notification title="Success" type="success">
//         Certificate downloaded successfully!
//       </Notification>,
//       {
//         placement: 'top-end',
//       }
//     );
//   };

//   const handleCancel = () => {
//     setIsDialogOpen(false);
//   };

//   return (
//     <>
//       <Tooltip title="Download" placement="top">
//         <Button size='sm' icon={<HiDownload />} onClick={handleAssignClick}>
//         </Button>
//       </Tooltip>
//       <Dialog isOpen={isDialogOpen} onClose={handleCancel} width={400}>
//         <h5 className="mb-4">Confirm Download</h5>
//         <p>Are you sure you want to download certificate?</p>
//         <div className="mt-6 text-right">
//           <Button size="sm" className="mr-2" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button variant="solid" size="sm" onClick={handleConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// const ComplianceCertificateDetails = () => {
//   const [data] = useState(initialData);

//   const handleDownload = (id: number) => {
//     console.log(`Downloading certificate for compliance ID: ${id}`);
//   };

//   const columns: ColumnDef<CertificateData>[] = [
//     {
//       header: 'Compliance Instance ID',
//       accessorKey: 'Compliance_Instance_ID',
//       cell: (props) => {
//         const value = props.getValue() as string;
//         return (
//             <div className="w-16">
//               {value}
//             </div>
//         );
//       },
//     },
//     {
//       header: 'Compliance ID',
//       accessorKey: 'complianceId',
//     },
//     {
//       header: 'Legislation',
//       accessorKey: 'Legislation',
//       cell: (props) => {
//         const value = props.getValue() as string;
//         return (
//           <Tooltip title={value} placement="top">
//             <div className="w-32 truncate">
//               {value}
//             </div>
//           </Tooltip>
//         );
//       },
//     },
//     {
//       header: 'Location',
//       accessorKey: 'Location',
//       cell: (props) => {
//         const value = props.getValue() as string;
//         return (
//           <Tooltip title={value} placement="top">
//             <div className="w-32 truncate">
//               {value}
//             </div>
//           </Tooltip>
//         );
//       },
//     },
//     {
//       header: 'Compliance Header',
//       accessorKey: 'complianceHeader',
//     },
    
//     {
//       header: 'Action',
//       id: 'action',
//       cell: ({ row }) => <DownloadCertificateButton />,
//     },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={data}
//       skeletonAvatarColumns={[0]}
//       skeletonAvatarProps={{ className: 'rounded-md' }}
//       loading={false}
//     />
//   );
// };

// export default ComplianceCertificateDetails;

import React, { useState } from 'react';
import { Badge, Button, Dialog, Notification, toast, Tooltip } from '@/components/ui';
import DataTable from '@/components/shared/DataTable';
import { ColumnDef } from '@/components/shared/DataTable';
import { FaDownload } from 'react-icons/fa6';
import { HiDownload } from 'react-icons/hi';

interface CertificateData {
  companyName: string;
  year: number;
  month: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  Location: string;
  CompanyGroup:string;
  Branch:string;
}

const statusColor: Record<string, string> = {
  Active: 'bg-emerald-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

const initialData: CertificateData[] = [
  { 
    CompanyGroup: "Tech Giants",
    companyName: 'Apple',
    year: 2024,
    month: 'January',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-14',
    status: 'Active',
    Location: 'Maharashtra',
    Branch: 'Headquarters',
  },
  { 
    CompanyGroup: "Tech Giants",
    companyName: 'Google',
    year: 2024,
    month: 'March',
    issueDate: '2024-03-01',
    expiryDate: '2024-03-31',
    status: 'Active',
    Location: 'Delhi',
    Branch: 'Main Office',
  },
  { 
    CompanyGroup: "Retail Leaders",
    companyName: 'TCS',
    year: 2024,
    month: 'April',
    issueDate: '2024-04-01',
    expiryDate: '2024-06-30',
    status: 'Active',
    Location: 'Mumbai',
    Branch: 'Regional Office',
  },
  { 
    CompanyGroup: "Financial Services",
    companyName: 'Paypal',
    year: 2024,
    month: 'April',
    issueDate: '2024-04-01',
    expiryDate: '2024-06-30',
    status: 'Active',
    Location: 'Pune',
    Branch: 'Support Center',
  },
  { 
    CompanyGroup: "Tech Giants",
    companyName: 'Amazon',
    year: 2024,
    month: 'April',
    issueDate: '2024-04-01',
    expiryDate: '2024-06-30',
    status: 'Active',
    Location: 'Bengaluru',
    Branch: 'Warehouse',
  },
];

const DownloadCertificateButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAssignClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    toast.push(
      <Notification title="Success" type="success">
        Certificate downloaded successfully!
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Tooltip title="Download Compliance Certificate" placement="top">
        <Button size='sm' icon={<HiDownload />} onClick={handleAssignClick}>
        </Button>
      </Tooltip>
      <Dialog isOpen={isDialogOpen} onClose={handleCancel} width={400}>
        <h5 className="mb-4">Confirm Download</h5>
        <p>Are you sure you want to download certificate?</p>
        <div className="mt-6 text-right">
          <Button size="sm" className="mr-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="solid" size="sm" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

const ComplianceCertificateDetails = () => {
  const [data] = useState(initialData);

  const columns: ColumnDef<CertificateData>[] = [
    // {
    //   header: 'Company Group',
    //   accessorKey: 'CompanyGroup',
    //   cell: (props) => {
    //     const value = props.getValue() as string;
    //     return (
    //       <Tooltip title={value} placement="top">
    //         <div className="w-32 truncate">
    //           {value}
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   header: 'Company Name',
    //   accessorKey: 'companyName',
    //   cell: (props) => {
    //     const value = props.getValue() as string;
    //     return (
    //       <Tooltip title={value} placement="top">
    //         <div className="w-32 truncate">
    //           {value}
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      header: 'Year',
      accessorKey: 'year',
    },
    {
      header: 'Month',
      accessorKey: 'month',
    },
    // {
    //   header: 'Branch',
    //   accessorKey: 'Branch',
    //   cell: (props) => {
    //     const value = props.getValue() as string;
    //     return (
    //       <Tooltip title={value} placement="top">
    //         <div className="w-28 truncate">
    //           {value}
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
    // {
    //   header: 'State',
    //   accessorKey: 'Location',
    //   cell: (props) => {
    //     const value = props.getValue() as string;
    //     return (
    //       <Tooltip title={value} placement="top">
    //         <div className="w-32 truncate">
    //           {value}
    //         </div>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      header: 'Action',
      id: 'action',
      cell: ({ row }) => <DownloadCertificateButton />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ className: 'rounded-md' }}
      loading={false}
    />
  );
};

export default ComplianceCertificateDetails;