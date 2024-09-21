import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import ConfigDropdown from './ConfigDropdown';
// import ConfigDropdown from './ConfigDropdown';


const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Define the interface for PT Tracker Data
interface PTTrackerData {
  companyName: string;
  state: string;
  ptRCDistrict: string;
  ptRCLocation: string;
  stateLocation: string;
  locationAddress: string;
  ptRC: string;
  userId: string;
  password: string;
  frequency: string;
  remittanceMode: string;
  month: string;
  noOfEmployees: number;
  wages: number;
  pt: number;
  totalAmountPaid: number;
  differenceInAmount: number;
  differenceReason: string;
  receiptNo: string;
  dueDate: string;
  dateOfPayment: string;
  remarks: string;
  delay: string;
  delayReason:string;
  challan: string;
  payment: string;
  ret:string;
}

export const dummyData: PTTrackerData[] = [
  {
    companyName: 'India Shelter',
    state: 'Gujarat',
    ptRCDistrict: 'Ahmedabad',
    ptRCLocation: 'Navrangpura',
    stateLocation: 'GUJARAT',
    locationAddress: '123 Main St, Navrangpura, Ahmedabad, Gujarat 380009',
    ptRC: 'PRC010512001831',
    userId: 'sakshamhrservices',
    password: 'Tonk@304001',
    frequency: 'Monthly',
    remittanceMode: 'Online',
    month: 'Jul-24',
    noOfEmployees: 34,
    wages: 660066,
    pt: 2024,
    totalAmountPaid: 660000,
    differenceInAmount: 66,
    differenceReason: 'Rounding error',
    receiptNo: '1275383',
    dueDate: '15-Aug-24',
    dateOfPayment: '20-Aug-24',
    remarks: 'Paid with delay due to technical issues',
    delay: "5 Days",
    delayReason: "Server Error",
    challan: 'Challan_IndiaShelter_Jul2024.pdf',
    payment: 'Payment_IndiaShelter_Jul2024.pdf',
    ret: 'Return_IndiaShelter_Jul2024.pdf'
  },
  {
    companyName: 'Tech Solutions',
    state: 'Maharashtra',
    ptRCDistrict: 'Mumbai Suburban',
    ptRCLocation: 'Andheri',
    stateLocation: 'MAHARASHTRA',
    locationAddress: '456 Tech Park, Andheri East, Mumbai 400093',
    ptRC: 'PRC020613002942',
    userId: 'techsolutionshr',
    password: 'Mumbai@2024',
    frequency: 'Half Yearly',
    remittanceMode: 'Online',
    month: 'Jun-24',
    noOfEmployees: 120,
    wages: 3500000,
    pt: 7500,
    totalAmountPaid: 7500,
    differenceInAmount: 0,
    differenceReason: '',
    receiptNo: '2468101',
    dueDate: '30-Jun-24',
    dateOfPayment: '28-Jun-24',
    remarks: 'Paid on time',
    delay: "",
    delayReason: "",
    challan: 'Challan_TechSolution_Jun2024.pdf',
    payment: 'Payment_TechSolution_Jun2024.pdf',
    ret: 'Return_TechSolution_Jun2024.pdf'
  },
  {
    companyName: 'Green Energy Ltd',
    state: 'Tamil Nadu',
    ptRCDistrict: 'Chennai',
    ptRCLocation: 'Anna Nagar',
    stateLocation: 'TAMIL NADU',
    locationAddress: '789 Eco Building, Anna Nagar, Chennai 600040',
    ptRC: 'PRC030714003053',
    userId: 'greenenergytax',
    password: 'Chennai@2024',
    frequency: 'Monthly',
    remittanceMode: 'Offline',
    month: 'Aug-24',
    noOfEmployees: 67,
    wages: 1200000,
    pt: 3500,
    totalAmountPaid: 3400,
    differenceInAmount: 100,
    differenceReason: 'Calculation error',
    receiptNo: '3579246',
    dueDate: '15-Sep-24',
    dateOfPayment: '14-Sep-24',
    remarks: 'Difference to be adjusted next month',
    delay: "",
    delayReason: "",
    challan: 'Challan_Green_Energy_Ltd__Aug2024.pdf',
    payment: 'Payment_Green_Energy_Ltd__Aug2024.pdf',
    ret: ''
  },
  {
    companyName: 'Innovate Systems',
    state: 'Karnataka',
    ptRCDistrict: 'Bengaluru Urban',
    ptRCLocation: 'Whitefield',
    stateLocation: 'KARNATAKA',
    locationAddress: '101 Tech Valley, Whitefield, Bengaluru 560066',
    ptRC: 'PRC040815004164',
    userId: 'innovatesyshr',
    password: 'Bangalore@2024',
    frequency: 'Monthly',
    remittanceMode: 'Online',
    month: 'Sep-24',
    noOfEmployees: 89,
    wages: 2800000,
    pt: 6000,
    totalAmountPaid: 6000,
    differenceInAmount: 0,
    differenceReason: '',
    receiptNo: '4681012',
    dueDate: '15-Oct-24',
    dateOfPayment: '10-Oct-24',
    remarks: 'Paid early',
    delay: "",
    delayReason: "",
    challan: 'Challan_Innovate_Systems_Sep2024.pdf',
    payment: 'Payment_Innovate_Systems_Sep2024.pdf',
    ret: 'Return_Innovate_Systems_Sep2024.pdf'
  },
  {
    companyName: 'Global Logistics',
    state: 'West Bengal',
    ptRCDistrict: 'Kolkata',
    ptRCLocation: 'Howrah',
    stateLocation: 'WEST BENGAL',
    locationAddress: '222 Port Road, Howrah, Kolkata 711101',
    ptRC: 'PRC050916005275',
    userId: 'globallogisticsfinance',
    password: 'Kolkata@2024',
    frequency: 'Half Yearly',
    remittanceMode: 'Online',
    month: 'Oct-24',
    noOfEmployees: 145,
    wages: 4000000,
    pt: 9000,
    totalAmountPaid: 8800,
    differenceInAmount: 200,
    differenceReason: 'New joinees not included',
    receiptNo: '5792468',
    dueDate: '31-Oct-24',
    dateOfPayment: '05-Nov-24',
    remarks: 'Paid with delay, difference to be paid separately',
    delay: "5 Days",
    delayReason: "Administrative delay",
    challan: 'Challan_Global_Logistics_Oct2024.pdf',
    payment: '',
    ret: 'Return_Global_Logistics_Oct2024.pdf'
  }
];

interface UploadedPTDetailsProps {
  onBack: () => void;
}

const UploadedPTRCDetails: React.FC<UploadedPTDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<PTTrackerData>[] = useMemo(
    () => [
      {
        header: 'State',
        accessorKey: 'state',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PT RC District',
        accessorKey: 'ptRCDistrict',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PT RC Location',
        accessorKey: 'ptRCLocation',
        cell: (props) => 
        <div className="w-36 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PT RC Location Address',
        accessorKey: 'locationAddress',
        cell: (props) =>  {
          const value = props.getValue() as string;
          return (
              <Tooltip title={value} placement="top">
          <div className="w-36 truncate">{props.getValue() as string}</div>
        </Tooltip>
          )
      },
      },
      {
        header: 'PT RC Number',
        accessorKey: 'ptRC',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
        header: 'No. of Employees',
        accessorKey: 'noOfEmployees',
        cell: (props) => <div className="w-36 truncate">{props.getValue() as number}</div>,
      },
      {
        header: 'Month',
        accessorKey: 'month',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Gross Salary',
        accessorKey: 'wages',
        cell: (props) => <div className="w-32 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      }, 
      {
        header: 'PT Amount',
        accessorKey: 'pt',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Amount Paid',
        accessorKey: 'totalAmountPaid',
        cell: (props) => <div className="w-40 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference in Amount',
        accessorKey: 'differenceInAmount',
        cell: (props) => <div className="w-44 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Reason for Difference',
        accessorKey: 'differenceReason',
        cell: (props) => <div className="w-44 truncate">{(props.getValue() as number).toLocaleString()}</div>,
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
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      // {
      //   header: 'Challan',
      //   accessorKey: 'challan',
      //   cell: (props) => 
      //   <div className="w-40 truncate">
      //     <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
      //       {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
      //       {props.getValue() as string}
      //     </a>
      //   </div>,
      // },
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
        header: 'Return Receipt',
        accessorKey: 'ret',
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
          <ConfigDropdown companyName={undefined} companyGroupName={undefined} />
        ),
      },
    ],
    []
  );

  const backFunction = () => {
    navigate('/ptrc-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded PT RC Tracker Details</h2>
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

export default UploadedPTRCDetails;