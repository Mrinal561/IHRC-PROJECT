import React, { useMemo } from 'react';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropdown';

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
    delayReason: 'Technical issues with the portal'
  },
  {
    companyName: 'India shelter PVT Ltd',
    pfCode: 'GNGGN2789109000',
    location: 'Delhi',
    month: 'May-23',
    dueDate: '15-Jun-23',
    submissionDate: '14-Jun-23',
    delay: "",
    delayReason: ''
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
        header: 'Company Name',
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
        header: 'Submission Date',
        accessorKey: 'submissionDate',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Delay',
        accessorKey: 'delay',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Delay Reason',
        accessorKey: 'delayReason',
        cell: (props) => <div className="w-60 truncate">{props.getValue() as string}</div>,
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