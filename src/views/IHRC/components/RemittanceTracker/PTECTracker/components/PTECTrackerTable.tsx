import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiEye, FiEyeOff, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PTTrackerEditDialog from './PTECTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import { PTTrackerData } from '@/@types/PTTracker';
const documentPath = "../store/AllMappedCompliancesDetails.xls";


interface PTTrackerTableProps {
  dataSent: PTTrackerData[];
  loading: boolean

}

const PTECTrackerTable: React.FC<PTTrackerTableProps> = ({dataSent, loading }) => {
  const [data, setData] = useState<PTTrackerData[]>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PTTrackerData | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});


  const handleEdit = (row: PTTrackerData) => {
    setEditingData(row);
    setEditDialogOpen(true);
};


const handleEditSubmit = (editedData: PTTrackerData) => {
    // setData((prevData) =>
    //     prevData.map((item) =>
    //         item === editingData ? editedData : item
    //     )
    // );
    setEditDialogOpen(false);
    setEditingData(null);
};
const columns: ColumnDef<PTTrackerData>[] = [
  {
    header: 'Company',
    accessorKey: 'PTSetup.company.name',
    cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
  },
  {
    header: 'State',
    accessorKey: 'state',
    cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
  },
  {
    header: 'PT EC Location',
    accessorKey: 'pt_ec_location',
    cell: (props) => <div className="w-36 truncate">{props.getValue() as string}</div>,
  },
  {
    header: 'PT EC Number',
    accessorKey: 'pt_ec_number',
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
  // {
  //   header: 'Upload Status',
  //   id: 'uploadStatus',
  //   cell: ({ row }) => {
  //     const { challan, payment, ret } = row.original;
  //     const uploadedCount = [challan, payment, ret].filter(Boolean).length;
  //     return <div className="w-32 truncate">{`${uploadedCount}/3`}</div>;
  //   },
  // },
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
        data={dataSent}
        skeletonAvatarColumns={[0]}
        loading={loading}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
      {/* {editingData && (
        <PTTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
        />
      )} */}
    </div>
  );
};

export default PTECTrackerTable;