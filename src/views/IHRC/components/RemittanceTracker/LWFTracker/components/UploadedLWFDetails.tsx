import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import ConfigDropdown from './ConfigDropDown';
const documentPath = "../store/AllMappedCompliancesDetails.xls";



export interface LWFTrackerData {
  companyName: string;
  state: string;
  lwfRegNo: string;
  frequency: string;
  period: string;
  lwfAmount: number;
  totalAmount: number;
  difference: string;
  differenceReason: string;
  dueDate: string;
  dateOfPayment: string;
  delay: string;
  delayReason: string;
  receiptNo: string;
  payment: string;
}

export const dummyData: LWFTrackerData[] = [
  {
      companyName: 'India Shelter',
      state: 'Karnataka',
      lwfRegNo: 'MH/123456',
      frequency: 'Yearly',
      period: 'Jul-2024',
      lwfAmount: 5000,
      totalAmount: 5000,
      difference: '0',
      differenceReason: '',
      dueDate: '2024-08-15',
      dateOfPayment: '2024-08-10',
      delay: '',
      delayReason: '',
      receiptNo: 'REC123456',
      payment: 'Payment_IndiaShelter_Jul2024.pdf',
    },
  {
      companyName: 'XYZ Industries',
      state: 'Karnataka',
      lwfRegNo: 'KA/789012',
      frequency: 'Yearly',
      period: 'Jul-2024',
      lwfAmount: 15000,
      totalAmount: 14500,
      difference: '500',
      differenceReason: 'Calculation error',
      dueDate: '30-Apr-2024',
      dateOfPayment: '05-May-2024',
      delay: '5',
      delayReason: 'Bank holiday',
      receiptNo: 'REC789012',
      payment: '',
  },
  {
      companyName: 'PQR Enterprises',
      state: 'Tamil Nadu',
      lwfRegNo: 'TN/345678',
      frequency: 'Half Yearly',
      period: 'H1 2024',
      lwfAmount: 25000,
      totalAmount: 25000,
      difference: '0',
      differenceReason: '',
      dueDate: '31-Jul-2024',
      dateOfPayment: '28-Jul-2024',
      delay: '',
      delayReason: '',
      receiptNo: 'REC345678',
      payment: 'Payment_PQREnterprises_Jul2024.pdf',
  },
];

interface UploadedPFDetailsProps {
  onBack: () => void;
}

const UploadedLWFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<LWFTrackerData>[] = useMemo(
    () => [
      {
        header: 'Company',
        accessorKey: 'companyName',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'State',
        accessorKey: 'state',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Registration Number',
        accessorKey: 'lwfRegNo',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Frequency',
        accessorKey: 'frequency',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Period',
        accessorKey: 'period',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'LWF Amount',
        accessorKey: 'lwfAmount',
        cell: (props) => <div className="w-52 truncate">₹{props.getValue() as string}</div>,
    },
    {
        header: 'Total Amount',
        accessorKey: 'totalAmount',
        cell: (props) => <div className="w-52 truncate">₹{props.getValue() as string}</div>,
    },
    {
        header: 'Difference',
        accessorKey: 'difference',
        cell: (props) => <div className="w-52 truncate">₹{props.getValue() as string}</div>,
    },
    {
        header: 'Difference Reason',
        accessorKey: 'differenceReason',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Due Date',
        accessorKey: 'dueDate',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Date Of Payment',
        accessorKey: 'dateOfPayment',
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
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Receipt Number',
        accessorKey: 'receiptNo',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
    },
    {
        header: 'Payment Receipt',
        accessorKey: 'payment',
        cell: (props) => 
        <div className="w-40 truncate">
          <a href="#" className="text-blue-600 hover:underline">
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
    navigate('/lwf-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded LWF Tracker Details</h2>
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

export default UploadedLWFDetails;