import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropdown';
const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Updated PFIWTrackerData interface
interface PFIWTrackerData {
    companyName: string;
    pfCode: string;
    location: string;
    month: string;
    dueDate: string;
    submissionDate: string;
    delay: string;
    delayReason: string;
    challan:string;
}

const dummyData: PFIWTrackerData[] = [
  {
    companyName: 'India shelter PVT Ltd',
    pfCode: 'GNGGN2789109000',
    location: 'Gurgaon',
    month: 'Apr-23',
    dueDate: '15-May-23',
    submissionDate: '20-May-23',
    delay: "5 Days",
    delayReason: 'Technical issues with the portal',
    challan: "Challan_IndiaShelter_Apr2023.pdf",
  },
  {
    companyName: 'India shelter PVT Ltd',
    pfCode: 'GNGGN2789109000',
    location: 'Delhi',
    month: 'May-23',
    dueDate: '15-Jun-23',
    submissionDate: '14-Jun-23',
    delay: "",
    delayReason: '',
    challan: "Challan_IndiaShelter_May2023.pdf",
  },
  // Add more dummy data entries here...
];

interface UploadedPFIWDetailsProps {
  onBack: () => void;
}

const UploadedPFIWDetails: React.FC<UploadedPFIWDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<PFIWTrackerData>[] = useMemo(
    () => [
      {
        header: 'Company',
        accessorKey: 'companyName',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PF Code',
        accessorKey: 'pfCode',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        accessorKey: 'location',
        cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Month',
        accessorKey: 'month',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Due Date',
        accessorKey: 'dueDate',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Date OF Payment',
        accessorKey: 'submissionDate',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Delay',
        accessorKey: 'delay',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Dealy Reason',
        accessorKey: 'delayReason',
        cell: (props) =>{
            const value = props.getValue() as string;
            return(
                <Tooltip title={value}>
                <div className="w-40 truncate">{props.getValue() as string}</div>
                </Tooltip>
            )
            }
    },
      {
        header: 'Challan',
        accessorKey: 'challan',
        cell: (props) => 
        <div className="w-40 truncate">
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
            {props.getValue() as string}
          </a>
        </div>,
      },
     
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <ConfigDropdown companyName={row.original.companyName} companyGroupName={undefined} />
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
        <h2 className="text-2xl font-bold">Uploaded PFIW Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={dummyData}
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