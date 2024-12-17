
// // import React, { useEffect, useState } from 'react';
// // import { Badge, Button, Dialog, Notification, toast, Tooltip } from '@/components/ui';
// // import DataTable from '@/components/shared/DataTable';
// // import { ColumnDef } from '@/components/shared/DataTable';
// // import { FaDownload } from 'react-icons/fa6';
// // import { HiDownload } from 'react-icons/hi';
// // import { useDispatch } from 'react-redux';
// // import { fetchCertificates } from '@/store/slices/certificate/certificateSlice';

// // interface CertificateData {
// //   companyName: string;
// //   year: number;
// //   month: string;
// //   issueDate: string;
// //   expiryDate: string;
// //   status: string;
// //   Location: string;
// //   CompanyGroup:string;
// //   Branch:string;
// // }

// // const statusColor: Record<string, string> = {
// //   Active: 'bg-emerald-500',
// //   Pending: 'bg-yellow-500',
// //   Rejected: 'bg-red-500',
// // };

// // const initialData: CertificateData[] = [
// //   { 
// //     CompanyGroup: "Tech Giants",
// //     companyName: 'Apple',
// //     year: 2024,
// //     month: 'January',
// //     issueDate: '2024-01-15',
// //     expiryDate: '2025-01-14',
// //     status: 'Active',
// //     Location: 'Maharashtra',
// //     Branch: 'Headquarters',
// //   },
// //   { 
// //     CompanyGroup: "Tech Giants",
// //     companyName: 'Google',
// //     year: 2024,
// //     month: 'March',
// //     issueDate: '2024-03-01',
// //     expiryDate: '2024-03-31',
// //     status: 'Active',
// //     Location: 'Delhi',
// //     Branch: 'Main Office',
// //   },
// //   { 
// //     CompanyGroup: "Retail Leaders",
// //     companyName: 'TCS',
// //     year: 2024,
// //     month: 'April',
// //     issueDate: '2024-04-01',
// //     expiryDate: '2024-06-30',
// //     status: 'Active',
// //     Location: 'Mumbai',
// //     Branch: 'Regional Office',
// //   },
// //   { 
// //     CompanyGroup: "Financial Services",
// //     companyName: 'Paypal',
// //     year: 2024,
// //     month: 'April',
// //     issueDate: '2024-04-01',
// //     expiryDate: '2024-06-30',
// //     status: 'Active',
// //     Location: 'Pune',
// //     Branch: 'Support Center',
// //   },
// //   { 
// //     CompanyGroup: "Tech Giants",
// //     companyName: 'Amazon',
// //     year: 2024,
// //     month: 'April',
// //     issueDate: '2024-04-01',
// //     expiryDate: '2024-06-30',
// //     status: 'Active',
// //     Location: 'Bengaluru',
// //     Branch: 'Warehouse',
// //   },
// // ];

// // const DownloadCertificateButton = () => {
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const dispatch = useDispatch();
// //   const cert = async() =>{
// // await dispatch(fetchCertificates());
// //   }

// //   useEffect(() => {
// //     // Fetch certificates when component mounts
// //     cert()
// //   }, []);
// //   const handleAssignClick = () => {
// //     setIsDialogOpen(true);
// //   };

// //   const handleConfirm = () => {
// //     setIsDialogOpen(false);
// //     toast.push(
// //       <Notification title="Success" type="success">
// //         Certificate downloaded successfully!
// //       </Notification>,
// //       {
// //         placement: 'top-end',
// //       }
// //     );
// //   };

// //   const handleCancel = () => {
// //     setIsDialogOpen(false);
// //   };

// //   return (
// //     <>
// //       <Tooltip title="Download Compliance Certificate" placement="top">
// //         <Button size='sm' icon={<HiDownload />} onClick={handleAssignClick}>
// //         </Button>
// //       </Tooltip>
// //       <Dialog isOpen={isDialogOpen} onClose={handleCancel} width={400}>
// //         <h5 className="mb-4">Confirm Download</h5>
// //         <p>Are you sure you want to download certificate?</p>
// //         <div className="mt-6 text-right">
// //           <Button size="sm" className="mr-2" onClick={handleCancel}>
// //             Cancel
// //           </Button>
// //           <Button variant="solid" size="sm" onClick={handleConfirm}>
// //             Confirm
// //           </Button>
// //         </div>
// //       </Dialog>
// //     </>
// //   );
// // };

// // const ComplianceCertificateDetails = () => {
// //   const [data] = useState(initialData);

// //   const columns: ColumnDef<CertificateData>[] = [
// //     // {
// //     //   header: 'Company Group',
// //     //   accessorKey: 'CompanyGroup',
// //     //   cell: (props) => {
// //     //     const value = props.getValue() as string;
// //     //     return (
// //     //       <Tooltip title={value} placement="top">
// //     //         <div className="w-32 truncate">
// //     //           {value}
// //     //         </div>
// //     //       </Tooltip>
// //     //     );
// //     //   },
// //     // },
// //     // {
// //     //   header: 'Company Name',
// //     //   accessorKey: 'companyName',
// //     //   cell: (props) => {
// //     //     const value = props.getValue() as string;
// //     //     return (
// //     //       <Tooltip title={value} placement="top">
// //     //         <div className="w-32 truncate">
// //     //           {value}
// //     //         </div>
// //     //       </Tooltip>
// //     //     );
// //     //   },
// //     // },
// //     {
// //       header: 'Year',
// //       accessorKey: 'year',
// //     },
// //     {
// //       header: 'Month',
// //       accessorKey: 'month',
// //     },
// //     // {
// //     //   header: 'Branch',
// //     //   accessorKey: 'Branch',
// //     //   cell: (props) => {
// //     //     const value = props.getValue() as string;
// //     //     return (
// //     //       <Tooltip title={value} placement="top">
// //     //         <div className="w-28 truncate">
// //     //           {value}
// //     //         </div>
// //     //       </Tooltip>
// //     //     );
// //     //   },
// //     // },
// //     // {
// //     //   header: 'State',
// //     //   accessorKey: 'Location',
// //     //   cell: (props) => {
// //     //     const value = props.getValue() as string;
// //     //     return (
// //     //       <Tooltip title={value} placement="top">
// //     //         <div className="w-32 truncate">
// //     //           {value}
// //     //         </div>
// //     //       </Tooltip>
// //     //     );
// //     //   },
// //     // },
// //     {
// //       header: 'Action',
// //       id: 'action',
// //       cell: ({ row }) => <DownloadCertificateButton />,
// //     },
// //   ];

// //   return (
// //     <DataTable
// //       columns={columns}
// //       data={data}
// //       skeletonAvatarColumns={[0]}
// //       skeletonAvatarProps={{ className: 'rounded-md' }}
// //       loading={false}
// //     />
// //   );
// // };

// // export default ComplianceCertificateDetails;

// import React, { useEffect, useState } from 'react';
// import { Badge, Button, Dialog, Notification, toast, Tooltip } from '@/components/ui';
// import DataTable from '@/components/shared/DataTable';
// import { ColumnDef } from '@/components/shared/DataTable';
// import { HiDownload } from 'react-icons/hi';
// import { useDispatch } from 'react-redux';
// import { fetchCertificates } from '@/store/slices/certificate/certificateSlice';

// interface CertificateData {
//   id: number;
//   company: string;
//   company_group: string;
//   month: number;
//   year: number;
//   created_at: string;
// }

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
//       <Tooltip title="Download Compliance Certificate" placement="top">
//         <Button size="sm" icon={<HiDownload />} onClick={handleAssignClick}>
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
//   const [data, setData] = useState<CertificateData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await dispatch(fetchCertificates());
//         // Assuming the response shape matches what you provided
//         if (response.payload && response.payload.certificates) {
//           setData(response.payload.certificates);
//         }
//       } catch (error) {
//         console.error('Error fetching certificates:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   // Convert numeric month to name
//   const getMonthName = (monthNumber: number) => {
//     const date = new Date();
//     date.setMonth(monthNumber - 1);
//     return date.toLocaleString('default', { month: 'long' });
//   };

//   const columns: ColumnDef<CertificateData>[] = [
//     {
//       header: 'Year',
//       accessorKey: 'year',
//     },
//     {
//       header: 'Month',
//       accessorKey: 'month',
//       cell: (props) => {
//         const monthNumber = props.getValue() as number;
//         return getMonthName(monthNumber);
//       },
//     },
//     {
//       header: 'Action',
//       id: 'action',
//       cell: () => <DownloadCertificateButton />,
//     },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={data}
//       skeletonAvatarColumns={[0]}
//       skeletonAvatarProps={{ className: 'rounded-md' }}
//       loading={loading}
//     />
//   );
// };

// export default ComplianceCertificateDetails;

import React, { useEffect, useState } from 'react';
import { Button, Notification, toast, Tooltip } from '@/components/ui';
import DataTable from '@/components/shared/DataTable';
import { ColumnDef } from '@/components/shared/DataTable';
import { HiDownload } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { fetchCertificates, downloadCertificate } from '@/store/slices/certificate/certificateSlice';

interface CertificateData {
  id: number;
  company: string;
  company_group: string;
  month: number;
  year: number;
  created_at: string;
}

interface DownloadCertificateButtonProps {
  certificateId: number;
}

const DownloadCertificateButton: React.FC<DownloadCertificateButtonProps> = ({ certificateId }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const dispatch = useDispatch();

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await dispatch(downloadCertificate(certificateId.toString()));
      
      if (response.payload === true) {
        toast.push(
          <Notification title="Success" type="success">
            Certificate downloaded successfully!
          </Notification>,
          {
            placement: 'top-end',
          }
        );
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast.push(
        <Notification title="Error" type="danger">
          Failed to download certificate. Please try again.
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Tooltip title="Download Compliance Certificate" placement="top">
      <Button 
        size="sm" 
        icon={<HiDownload />} 
        onClick={handleDownload}
        // loading={isDownloading}
        // disabled={isDownloading}
      />
    </Tooltip>
  );
};

const ComplianceCertificateDetails = () => {
  const [data, setData] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(fetchCertificates());
        if (response.payload && response.payload.certificates) {
          setData(response.payload.certificates);
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const columns: ColumnDef<CertificateData>[] = [
    {
      header: 'Year',
      accessorKey: 'year',
    },
    {
      header: 'Month',
      accessorKey: 'month',
      cell: (props) => {
        const monthNumber = props.getValue() as number;
        return getMonthName(monthNumber);
      },
    },
    {
      header: 'Action',
      id: 'action',
      cell: ({ row }) => <DownloadCertificateButton certificateId={row.original.id} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ className: 'rounded-md' }}
      loading={loading}
    />
  );
};

export default ComplianceCertificateDetails;