import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import EsiConfigDropdown from './ESIConfigDropDown';

// Define the ESITrackerData interface
interface ESITrackerData {
    companyName: string;
    esiCode: string;
    location: string;
    month: string;
    noOfEmployees: number;
    wages: string;
    esiContribution: string;
    totalChallanAmount: number;
    dueDate: string;
    dateOfPayment: string;
    delay: string;
    delayReason: string;
    typeOfChallan: string;
    challanNo: string;
}

const dummyData: ESITrackerData[] = [
    {
        companyName: 'India shelter PVT Ltd',
        esiCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Apr-23',
        noOfEmployees: 2842,
        wages: "43,355,212",
        esiContribution: "1,950,984",
        totalChallanAmount: 1950984,
        dueDate: '15-May-23',
        dateOfPayment: '20-May-23',
        delay: "5 Days",
        delayReason: 'Gov. Portal server down',
        typeOfChallan: 'Main Challan',
        challanNo: '2032305004230'
    },
    {
        companyName: 'India shelter PVT Ltd',
        esiCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'May-23',
        noOfEmployees: 2934,
        wages: "46,326,266",
        esiContribution: "2,084,682",
        totalChallanAmount: 2084682,
        dueDate: '15-Jun-23',
        dateOfPayment: '13-Jun-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Main Challan',
        challanNo: '2032306009449'
    },
    // Add more dummy data entries here...
];

interface UploadedESIDetailsProps {
  onBack: () => void;
}

const UploadedESIDetails: React.FC<UploadedESIDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<ESITrackerData>[] = useMemo(
    () => [
      {
        header: 'ESI Code',
        accessorKey: 'esiCode',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Month',
        accessorKey: 'month',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'No. of Employees',
        accessorKey: 'noOfEmployees',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
      },
      {
        header: 'Wages',
        accessorKey: 'wages',
        cell: (props) => <div className="w-28 truncate">₹{props.getValue() as string}</div>,
      },
      {
        header: 'ESI Contribution',
        accessorKey: 'esiContribution',
        cell: (props) => <div className="w-40 truncate">₹{props.getValue() as string}</div>,
      },
      {
        header: 'Total Challan Amount',
        accessorKey: 'totalChallanAmount',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Due Date',
        accessorKey: 'dueDate',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Date of Payment',
        accessorKey: 'dateOfPayment',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Delay',
        accessorKey: 'delay',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Type of Challan',
        accessorKey: 'typeOfChallan',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
            <EsiConfigDropdown companyName={undefined} companyGroupName={undefined} />
        ),
      },
    ],
    []
  );

  const backFunction = () => {
    navigate('/esi-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded ESI Tracker Details</h2>
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

export default UploadedESIDetails;