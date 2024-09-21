import React, { useMemo } from 'react';
import { Button } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropdown';
const documentPath = "../store/AllMappedCompliancesDetails.xls";
// import ConfigDropdown from './ConfigDropdown';

// Define the interface for PT Tracker Data
export interface PTTrackerData {
  companyName: string;
  state: string;
  ptEcLocation: string;
  ptEcNumber: string;
  dateOfEnrolment: string;
  ptEcEnrolmentAddress: string;
  remittanceMode: string;
  frequency: string;
  period: string;
  totalAmountAsPerChallan: number;
  totalAmountPaid: number;
  dueDate: string;
  dateOfPayment: string;
  delay: string;
  delayReason:string;
  receiptNo: number;
  challan: string;
  payment: string;
  ret:string;
}

 const dummyData: PTTrackerData[] = [
  {
    companyName: 'India Shelter',
    state: 'Karnataka',
    ptEcLocation: 'Bangalore',
    ptEcNumber: 'PEC010513005484',
    dateOfEnrolment: '2018-08-29',
    ptEcEnrolmentAddress: 'SY NO 250 1 OLD MADRAS ROAD NH 4 ABOVE AXIS BANK HOSKOTE TOWN BANGALORE, PIN:562114',
    remittanceMode: 'Online',
    frequency: 'Yearly',
    period: 'Jul-2024',
    totalAmountAsPerChallan: 50000,
    totalAmountPaid: 50000,
    dueDate: '2024-08-15',
    dateOfPayment: '2024-08-10',
    delay: '',
    delayReason: '',
    receiptNo: 987654,
    challan: 'Challan_IndiaShelter_Jul2024.pdf',
    payment: 'Payment_IndiaShelter_Jul2024.pdf',
    ret: 'Return_IndiaShelter_Jul2024.pdf'
  },
  {
    companyName: 'GreenEnergy Solutions',
    state: 'Maharashtra',
    ptEcLocation: 'Mumbai',
    ptEcNumber: 'PTEC789012',
    dateOfEnrolment: '2022-11-30',
    ptEcEnrolmentAddress: '456 Green Building, Andheri, Mumbai 400069',
    remittanceMode: 'Offline',
    frequency: 'Yearly',
    period: 'Q2-2024',
    totalAmountAsPerChallan: 150000,
    totalAmountPaid: 145000,
    dueDate: '2024-07-31',
    dateOfPayment: '2024-08-05',
    delay: '5 days',
    delayReason: 'Bank holiday',
    receiptNo: 456789,
    challan: 'Challan_GreenEnergy_Q22024.pdf',
    payment: 'Payment_GreenEnergy_Q22024.pdf',
    ret: ''
  },
  {
    companyName: 'AutoParts Manufacturing',
    state: 'Tamil Nadu',
    ptEcLocation: 'Chennai',
    ptEcNumber: 'PTEC345678',
    dateOfEnrolment: '2023-03-01',
    ptEcEnrolmentAddress: '789 Industrial Area, Ambattur, Chennai 600053',
    remittanceMode: 'Online',
    frequency: 'Yearly',
    period: 'Aug-2024',
    totalAmountAsPerChallan: 75000,
    totalAmountPaid: 75000,
    dueDate: '2024-09-15',
    dateOfPayment: '2024-09-14',
    delay: '',
    delayReason: '',
    receiptNo: 234567,
    challan: 'Challan_AutoParts_Aug2024.pdf',
    payment: 'Payment_AutoParts_Aug2024.pdf',
    ret: 'Return_AutoParts_Aug2024.pdf'
  }
];


interface UploadedPTDetailsProps {
  onBack: () => void;
}

const UploadedPTECDetails: React.FC<UploadedPTDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<PTTrackerData>[] = [
    {
      header: 'Company Name',
      accessorKey: 'companyName',
      cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'State',
      accessorKey: 'state',
      cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'PT EC Location',
      accessorKey: 'ptEcLocation',
      cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'PT EC Number',
      accessorKey: 'ptEcNumber',
      cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Date of Enrolment',
      accessorKey: 'dateOfEnrolment',
      cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'PT EC Enrolment Address',
      accessorKey: 'ptEcEnrolmentAddress',
      cell: (props) => <div className="w-64 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Remittance Mode',
      accessorKey: 'remittanceMode',
      cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Frequency',
      accessorKey: 'frequency',
      cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Period',
      accessorKey: 'period',
      cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Total Amount (Challan)',
      accessorKey: 'totalAmountAsPerChallan',
      cell: (props) => <div className="w-40 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
    },
    {
      header: 'Total Amount Paid',
      accessorKey: 'totalAmountPaid',
      cell: (props) => <div className="w-40 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Date of Payment',
      accessorKey: 'dateOfPayment',
      cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Delay',
      accessorKey: 'delay',
      cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Delay Reason',
      accessorKey: 'delayReason',
      cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
    },
    {
      header: 'Receipt No',
      accessorKey: 'receiptNo',
      cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
    },
    {
      header: 'Challan',
      accessorKey: 'challan',
      cell: (props) => (
        <div className="w-40 truncate">
          <a href="#" className="text-blue-600 hover:underline">
            {props.getValue() as string}
          </a>
        </div>
      ),
    },
    {
      header: 'Payment',
      accessorKey: 'payment',
      cell: (props) => (
        <div className="w-40 truncate">
          <a href="#" className="text-blue-600 hover:underline">
            {props.getValue() as string}
          </a>
        </div>
      ),
    },
    {
      header: 'Return',
      accessorKey: 'ret',
      cell: (props) => (
        <div className="w-40 truncate">
          <a href="#" className="text-blue-600 hover:underline">
            {props.getValue() as string}
          </a>
        </div>
      ),
    },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <ConfigDropdown companyName={undefined} companyGroupName={undefined} />
        ),
      },
    ]


  const backFunction = () => {
    navigate('/ptec-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded PT EC Tracker Details</h2>
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

export default UploadedPTECDetails;