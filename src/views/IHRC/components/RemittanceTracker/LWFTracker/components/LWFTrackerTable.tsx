
import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import LWFTrackerEditDialog from './LWFTrackerEditDialog';
import ConfigDropdown from './ConfigDropDown';

const documentPath = "../store/AllMappedCompliancesDetails.xls";
// import PFTrackerEditDialog from './PFTrackerEditDialog';


// Define the structure of your data
export interface LWFTrackerData {
    companyName: string;
    state: string;
    lwfRegNo: string;
    lwdRegDate: string;
    frequency: string;
    period: string;
    lwfAmount: string;
    dueDate: string;
    delay: string;
    submittedOn: string;
    delayReason: string;
    receiptNo: string;
    amountDiff: string;
    amountDiffReason: string;
    payment: string;
}

// Dummy data (replace with your actual data source)
export const dummyData: LWFTrackerData[] = [
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
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Chhattisgarh',
        lwfRegNo: '19087',
        lwdRegDate: 'Online',
        frequency: 'Half Yearly',
        period: "Jun24-Dec24",
        lwfAmount: "4800.00",
        dueDate: '15-Jul-24',
        submittedOn: '07-Sep-24',
        delay: '',
        delayReason: '',
        receiptNo: '531347',
        amountDiff: '',
        amountDiffReason: '',
        payment: "Payment Receipt",
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
        payment: "",
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
        payment: "Payment Receipt",
    },
];

const LWFTrackerTable: React.FC = () => {
    const [data, setData] = useState<LWFTrackerData[]>(dummyData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingData, setEditingData] = useState<LWFTrackerData | null>(null);

    const handleEdit = (row: LWFTrackerData) => {
        setEditingData(row);
        setEditDialogOpen(true);
    };


    const handleEditSubmit = (editedData: LWFTrackerData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item === editingData ? editedData : item
            )
        );
        setEditDialogOpen(false);
        setEditingData(null);
    };
    const columns: ColumnDef<LWFTrackerData>[] = useMemo(
        () => [
            {
                header: 'Company Name',
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
                header: 'Upload Status',
                id: 'uploadStatus',
                cell: ({ row }) => {
                    const { payment } = row.original;
                    const uploadedCount = [ payment].filter(Boolean).length;
                    return <div className="w-32 truncate">{`${uploadedCount}/1`}</div>;
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
                                onClick={() => handleEdit(row.original)}
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
        ],
        []
    );

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
                <LWFTrackerEditDialog
                    isOpen={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    onSubmit={handleEditSubmit}
                    data={editingData}
                />
            )}
        </div>
    );
};

export default LWFTrackerTable;