import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PTTrackerEditDialog from './PTECTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Define the structure of your data
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

// Dummy data (replace with your actual data source)
export const dummyData: PTTrackerData[] = [
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

const PTECTrackerTable: React.FC = () => {
  const [data, setData] = useState<PTTrackerData[]>(dummyData);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PTTrackerData | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});


  const handleEdit = (row: PTTrackerData) => {
    setEditingData(row);
    setEditDialogOpen(true);
};


const handleEditSubmit = (editedData: PTTrackerData) => {
    setData((prevData) =>
        prevData.map((item) =>
            item === editingData ? editedData : item
        )
    );
    setEditDialogOpen(false);
    setEditingData(null);
};
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
    cell: (props) =>{ 
      const value= props.getValue() as string;
      return(
        <Tooltip title={value}>
        <div className="w-52 truncate">{props.getValue() as string}</div> 
        </Tooltip>
      )
  }
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
    header: 'Upload Status',
    id: 'uploadStatus',
    cell: ({ row }) => {
      const { challan, payment, ret } = row.original;
      const uploadedCount = [challan, payment, ret].filter(Boolean).length;
      return <div className="w-32 truncate">{`${uploadedCount}/3`}</div>;
    },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Tooltip title="Edit">
          <Button
            size="sm"
            onClick={() => console.log('Edit', row.original)}
            icon={<MdEdit />}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            size="sm"
            onClick={() => console.log('Delete', row.original)}
            icon={<FiTrash />}
            className="text-red-500"
          />
        </Tooltip>
        <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
      </div>
    ),
  },
];
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
    <div className="relative">
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
      {editingData && (
        <PTTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
        />
      )}
    </div>
  );
};

export default PTECTrackerTable;