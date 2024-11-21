// import React, { useMemo } from 'react';
// import { Button, Tooltip } from '@/components/ui';
// import { HiArrowLeft } from 'react-icons/hi';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { useNavigate } from 'react-router-dom';
// import ConfigDropdown from './ConfigDropdown';
// const documentPath = "../store/AllMappedCompliancesDetails.xls";

// // Updated PFIWTrackerData interface
// interface PFIWTrackerData {
//     companyName: string;
//     pfCode: string;
//     location: string;
//     month: string;
//     dueDate: string;
//     submissionDate: string;
//     delay: string;
//     delayReason: string;
//     challan:string;
// }

// const dummyData: PFIWTrackerData[] = [
//   {
//     companyName: 'India shelter PVT Ltd',
//     pfCode: 'GNGGN2789109000',
//     location: 'Gurgaon',
//     month: 'Apr-23',
//     dueDate: '15-May-23',
//     submissionDate: '20-May-23',
//     delay: "5 Days",
//     delayReason: 'Technical issues with the portal',
//     challan: "Challan_IndiaShelter_Apr2023.pdf",
//   },
//   {
//     companyName: 'India shelter PVT Ltd',
//     pfCode: 'GNGGN2789109000',
//     location: 'Delhi',
//     month: 'May-23',
//     dueDate: '15-Jun-23',
//     submissionDate: '14-Jun-23',
//     delay: "",
//     delayReason: '',
//     challan: "Challan_IndiaShelter_May2023.pdf",
//   },
//   // Add more dummy data entries here...
// ];

// interface UploadedPFIWDetailsProps {
//   onBack: () => void;
// }

// const UploadedPFIWDetails: React.FC<UploadedPFIWDetailsProps> = ({ onBack }) => {
//   const navigate = useNavigate();

//   const columns: ColumnDef<PFIWTrackerData>[] = useMemo(
//     () => [
//       {
//         header: 'Company',
//         accessorKey: 'companyName',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'PF Code',
//         accessorKey: 'pfCode',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Location',
//         accessorKey: 'location',
//         cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Month',
//         accessorKey: 'month',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Due Date',
//         accessorKey: 'dueDate',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Date OF Payment',
//         accessorKey: 'submissionDate',
//         cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Delay',
//         accessorKey: 'delay',
//         cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
//       },
//       {
//         header: 'Dealy Reason',
//         accessorKey: 'delayReason',
//         cell: (props) =>{
//             const value = props.getValue() as string;
//             return(
//                 <Tooltip title={value}>
//                 <div className="w-40 truncate">{props.getValue() as string}</div>
//                 </Tooltip>
//             )
//             }
//     },
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
//         header: 'Actions',
//         id: 'actions',
//         cell: ({ row }) => (
//           <ConfigDropdown companyName={row.original.companyName} companyGroupName={undefined} />
//         ),
//       },
//     ],
//     []
//   );

//   const backFunction = () => {
//     navigate('/pfiw-tracker');
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
//         <h2 className="text-2xl font-bold">Uploaded PF IW Tracker Details</h2>
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

// export default UploadedPFIWDetails;



import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropdown';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import dayjs from 'dayjs';
import { FiFile } from 'react-icons/fi';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Updated interface to match API response
interface PfiwChallanData {
  id: number;
  PfSetup: {
    pf_code: string;
    CompanyGroup: {
      name: string;
    };
    Company: {
      name: string;
    };
    Location: {
      name: string;
    };
  };
  payroll_month: string;
  payment_due_date: string;
  payment_date: string;
  delay_in_days: number;
  delay_reason: string;
  challan_document: string;
  status: string;
  UploadBy: {
    name: string;
    last_name: string;
  };
}

interface UploadedPFIWDetailsProps {
  onBack: () => void;
}

const UploadedPFIWDetails: React.FC<UploadedPFIWDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<PfiwChallanData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPFIWTrackerData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await httpClient.get(endpoints.pfiwtracker.pfiwGetAll());
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PFIW tracker data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPFIWTrackerData();
  }, [fetchPFIWTrackerData]);

  const columns: ColumnDef<PfiwChallanData>[] = useMemo(
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
        cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
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
        header: 'Delay in Days',
        accessorKey: 'delay_in_days',
        cell: (props) => <div className="w-28 truncate">{props.getValue() ? `${props.getValue()} Days` : '-'}</div>,
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
        }
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
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Uploaded By',
        accessorKey: 'UploadBy.name',
        cell: (props) => (
          <div className="w-40 truncate">
            {`${props.row.original.UploadBy?.name}`}
          </div>
        ),
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <ConfigDropdown 
            companyName={row.original.PfSetup.Company.name} 
            companyGroupName={row.original.PfSetup.CompanyGroup.name} 
            trackerId={row.original.id}  
            onRefresh={fetchPFIWTrackerData}
          />
        ),
      },
    ],
    []
  );

  const backFunction = () => {
    navigate('/pfiw-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded PF IW Tracker Details</h2>
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

export default UploadedPFIWDetails;