import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { LWFTrackerData } from './LWFTrackerTable';
import ConfigDropdown from './ConfigDropdown';




const dummyData: LWFTrackerData[] = [
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Madhya Pradesh',
        lwfRegNo: 'HO/0011854',
        lwdRegDate: 'Online',
        frequency: 'Yearly',
        period: "Jan24-Dec24",
        lwfAmount: "15,063.00",
        dueDate: '31-Jan-24',
        submittedOn: '07-Oct-24',
        delay: '',
        delayReason: '',
        receiptNo: '24071001017115355215',
        amountDiff: '',
        amountDiffReason: '',
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Chhattisgarh',
        lwfRegNo: '19087',
        lwdRegDate: 'Online',
        frequency: 'Half Yearly',
        period: "Jun24-Dec24",
        lwfAmount: "4800.00",
        dueDate: '15-Jan-24',
        submittedOn: '07-Sep-24',
        delay: '',
        delayReason: '',
        receiptNo: '531347',
        amountDiff: '',
        amountDiffReason: '',
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Delhi',
        lwfRegNo: '19087',
        lwdRegDate: 'Online',
        frequency: 'Half Yearly',
        period: "Jun24-Dec24",
        lwfAmount: "243.00",
        dueDate: '15-Jan-24',
        submittedOn: '07-Oct-24',
        delay: '',
        delayReason: '',
        receiptNo: 'DLWB202400007165',
        amountDiff: '',
        amountDiffReason: '',
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Gujarat',
        lwfRegNo: 'HO/0011854',
        lwdRegDate: 'Online',
        frequency: 'Half Yearly',
        period: "Jun24-Dec24",
        lwfAmount: "3600.00",
        dueDate: '31-Jul-24',
        submittedOn: '07-Nov-24',
        delay: '',
        delayReason: '',
        receiptNo: 'ONL/2024/T/0026476',
        amountDiff: '',
        amountDiffReason: '',
    },
];

interface UploadedPFDetailsProps {
  onBack: () => void;
}

const UploadedLWFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<LWFTrackerData>[] = useMemo(
    () => [
        // {
        //     header: 'State',
        //     accessorKey: 'state',
        //     cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        // },
        {
            header: 'Registration Number',
            accessorKey: 'lwfRegNo',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Registration Date',
            accessorKey: 'lwdRegDate',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Frequency',
            accessorKey: 'frequency',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
        },
        {
            header: 'Period',
            accessorKey: 'period',
            cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
        },
        {
            header: 'Due Date',
            accessorKey: 'dueDate',
            cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
        },
        {
            header: 'Submission Date',
            accessorKey: 'submittedOn',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Delay',
            accessorKey: 'delay',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
        },
        {
            header: 'Delay Reason',
            accessorKey: 'delayReason',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Total Amount',
            accessorKey: 'lwfAmount',
            cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
        },
        
        {
            header: 'Receipt Number',
            accessorKey: 'receiptNo',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
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