import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import EsiConfigDropdown from './ESIConfigDropDown';
const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Define the ESITrackerData interface
export interface ESITrackerData {
  companyName: string;
    esiCode: string;
    codeType: string;
    esiCodeLocation: string;
    month: string;
    noOfEmployees: number;
    esiGrossWages: number;
    eeESI: number;
    erESI: number;
    totalESI: number;
    totalAmountAsPerChallan: number;
    differenceInAmount: number;
    reasonForDifference: string;
    challanNo: string;
    challanType: string;
    dueDate: string;
    amountPaidOn: string;
    remarks: string;
    delay:string;
    delayReason:string;
    challan: string;
    payment: string;
}

// Sample data (replace with your actual data source)
export const sampleData: ESITrackerData[] = [
    {
        companyName: 'India shelter PVT Ltd',
        esiCode: '16000502200001004',
        codeType: 'Main Code',
        esiCodeLocation: 'Udaipur',
        month: 'Apr-24',
        noOfEmployees: 900,
        esiGrossWages: 22622393,
        eeESI: 167870,
        erESI: 725536,
        totalESI: 893406,
        totalAmountAsPerChallan: 893487,
        differenceInAmount: 81,
        reasonForDifference: "",
        challanNo: '0162411718861',
        challanType: 'Main',
        dueDate: '15-May-24',
        amountPaidOn: '11-May-24',
        remarks: 'Pay from SBI',
        delay:"5 Days",
        delayReason:"server problem",
        challan: "Challan_IndiaShelter_Apr2024.pdf",
        payment: "Payment_IndiaShelter_Apr2024.pdf",
    },
    { 
      companyName: 'India shelter PVT Ltd',
        esiCode: '16000502200001004',
        codeType: 'Main Code',
        esiCodeLocation: 'Udaipur',
        month: 'May-24',
        noOfEmployees: 924,
        esiGrossWages: 21291141,
        eeESI: 160144,
        erESI: 691973,
        totalESI: 852117,
        totalAmountAsPerChallan: 852201,
        differenceInAmount: 84,
        reasonForDifference: "",
        challanNo: '0162412183044',
        challanType: 'Main',
        dueDate: '15-Jun-24',
        amountPaidOn: '12-Jun-24',
        remarks: 'Pay from SBI',
        delay:"",
        delayReason:"",
        challan: "Challan_IndiaShelter_May2024.pdf",
        payment: "Payment_IndiaShelter_May2024.pdf",
    },{ 
      companyName: 'India shelter PVT Ltd',
        esiCode: '16000502200001004',
        codeType: 'Sub Code',
        esiCodeLocation: 'Udaipur',
        month: 'Jun-24',
        noOfEmployees: 947,
        esiGrossWages: 20170520,
        eeESI: 121747,
        erESI: 655529,
        totalESI: 807276,
        totalAmountAsPerChallan: 807384,
        challanType: 'Main',
        differenceInAmount: 108,
        reasonForDifference: "",
        challanNo: '01624125706547',
        dueDate: '15-Jul-24',
        amountPaidOn: '12-Jul-24',
        remarks: 'Pay from SBI',
        delay:"",
        delayReason:"",
        challan: "Challan_IndiaShelter_May2024.pdf",
        payment: "",
    },{ 
      companyName: 'India shelter PVT Ltd',
        esiCode: '16000502200001004',
        codeType: 'Main Code',
        esiCodeLocation: 'Udaipur',
        month: 'Jul-24',
        noOfEmployees: 977,
        esiGrossWages: 22944401,
        eeESI: 172560,
        erESI: 745700,
        totalESI: 918260,
        totalAmountAsPerChallan: 918350,
        differenceInAmount: 90,
        challanType: 'Main',
        reasonForDifference: "",
        challanNo: '01624129468490',
        dueDate: '15-Aug-24',
        amountPaidOn: '12-Aug-24',
        remarks: 'Pay from SBI',
        delay:"",
        delayReason:"",
        challan: "",
        payment: "Payment_IndiaShelter_May2024.pdf",
    },
    // Add more sample data here
];

interface UploadedESIDetailsProps {
  onBack: () => void;
}

const UploadedESIDetails: React.FC<UploadedESIDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<ESITrackerData>[] = useMemo(
    () => [
      {
        header: 'Company',
        accessorKey: 'companyName',
        cell: (props) => (
            <div className="w-52 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'ESI Code',
        accessorKey: 'esiCode',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Code Type',
        accessorKey: 'codeType',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'ESI Code Location',
        accessorKey: 'esiCodeLocation',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Month',
        accessorKey: 'month',
        cell: (props) => (
            <div className="w-28 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'No. of Employees',
        accessorKey: 'noOfEmployees',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as number}
            </div>
        ),
    },
    {
        header: 'ESI Gross Wages',
        accessorKey: 'esiGrossWages',
        cell: (props) => (
            <div className="w-40 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'EE ESI',
        accessorKey: 'eeESI',
        cell: (props) => (
            <div className="w-28 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'ER ESI',
        accessorKey: 'erESI',
        cell: (props) => (
            <div className="w-28 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Total ESI',
        accessorKey: 'totalESI',
        cell: (props) => (
            <div className="w-28 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Total Amount As per Challan',
        accessorKey: 'totalAmountAsPerChallan',
        cell: (props) => (
            <div className="w-52 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Difference in Amount',
        accessorKey: 'differenceInAmount',
        cell: (props) => (
            <div className="w-40 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Reason For Difference',
        accessorKey: 'reasonForDifference',
        cell: (props) => (
            <div className="w-40 truncate">
                {(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    
   
    {
        header: 'Due Date',
        accessorKey: 'dueDate',
        cell: (props) => (
            <div className="w-28 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Date of Payment',
        accessorKey: 'amountPaidOn',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
      header: 'Delay',
      accessorKey: 'delay',
      cell: (props) => (
          <div className="w-40 truncate">
              {props.getValue() as string}
          </div>
      ),
  },
  {
      header: 'Delay Reason',
      accessorKey: 'delayReason',
      cell: (props) => (
          <div className="w-40 truncate">
              {props.getValue() as string}
          </div>
      ),
  },
    {
        header: 'Challan No',
        accessorKey: 'challanNo',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Challan Type',
        accessorKey: 'challanType',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
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
            <EsiConfigDropdown companyName={undefined} companyGroupName={undefined} />
        ),
      },
    ],
    []
  );

  const backFunction = () => {
    navigate('/esi-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded ESI Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={sampleData}
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