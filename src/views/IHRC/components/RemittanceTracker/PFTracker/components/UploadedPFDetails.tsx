import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { PFTrackerData } from './PFTrackerTable'; // Import the PFTrackerData interface
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import ConfigDropdown from './ConfigDropdown';

const documentPath = "../store/AllMappedCompliancesDetails.xls";


const dummyData: PFTrackerData[] = [
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Apr-23',
        noOfEmployees: 2842,
        wages: "43,355,212",
        epsWage: "33,792,208",
        totalChallanAmount: 11000569,
        dueDate: '15-May-23',
        dateOfPayment: '20-May-23',
        delay: "5 Days",
        delayReason: 'Gov. Portal server down',
        typeOfChallan: 'Main Challan',
        trrnNo: '2032305004230',
        crnNo: '229100523000279',
        ecr: "Ecr Receipt",
        challan: "Challan Receipt",
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'May-23',
        noOfEmployees: 2934,
        wages: "46,326,266",
        epsWage: "35,492,350",
        totalChallanAmount: 11715531,
        dueDate: '15-Jun-23',
        dateOfPayment: '13-Jun-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Main Challan',
        trrnNo: '2032306009449',
        crnNo: '229130623009410',
        ecr: "Ecr Receipt",
        challan: "Challan Receipt",
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Jun-23',
        noOfEmployees: 551,
        wages: "947,447",
        epsWage: "599,602",
        totalChallanAmount: 235132,
        dueDate: '15-Jun-23',
        dateOfPayment: '13-Jul-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Arrear Challan',
        trrnNo: '2032307004954',
        crnNo: '229130723000561',
        ecr: "Ecr Receipt",
        challan: "Challan Receipt",
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Jun-23',
        noOfEmployees: 551,
        wages: "947,447",
        epsWage: "599,602",
        totalChallanAmount: 235132,
        dueDate: '15-Jun-23',
        dateOfPayment: '12-Jul-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Main Challan',
        trrnNo: '2032307004894',
        crnNo: '229130723000523',
        ecr: "Ecr Receipt",
        challan: "Challan Receipt",
        payment: "Payment Receipt",
    },
  // Add more dummy data entries here...
];

interface UploadedPFDetailsProps {
  onBack: () => void;
}

const UploadedPFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<PFTrackerData>[] = useMemo(
    () => [
  
      {
        header: 'PF Code',
        accessorKey: 'pfCode',
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
        header: 'EPS Wage',
        accessorKey: 'epsWage',
        cell: (props) => <div className="w-28 truncate">₹{props.getValue() as string}</div>,
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
        header: 'ECR',
        accessorKey: 'ecr',
        cell: (props) => 
        <div className="w-40 truncate">
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
            {props.getValue() as string}
          </a>
        </div>,
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
        header: 'Payment Receipt',
        accessorKey: 'payment',
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

export default UploadedPFDetails;