import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PFTrackerEditDialog from './PFTrackerEditDialog';


// Define the structure of your data
export interface PFTrackerData {
    companyName: string;
    pfCode: string;
    location: string;
    month: string;
    noOfEmployees: number;
    wages: string;
    epsWage: string;
    totalChallanAmount: number;
    dueDate: string;
    dateOfPayment: string;
    delay: string;
    delayReason: string;
    typeOfChallan: string;
    trrnNo: string;
    crnNo: string;
}

// Dummy data (replace with your actual data source)
export const dummyData: PFTrackerData[] = [
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
        crnNo: '229100523000279'
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
        crnNo: '229130623009410'
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
        crnNo: '229130723000561'
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
        crnNo: '229130723000523'
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'RJUDR0021857000',
        location: 'Udaipur',
        month: 'Apr-22',
        noOfEmployees: 3,
        wages: "64,028",
        epsWage: "45,000",
        totalChallanAmount: 15914,
        dueDate: '15-May-22',
        dateOfPayment: '13-May-23',
        delay: "",
        delayReason: '',
        typeOfChallan: '3 employees Udaipur challan (Apr22) ',
        trrnNo: '4032304005732',
        crnNo: '229130523000438'
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'RJUDR0021857000',
        location: 'Udaipur',
        month: 'May-22',
        noOfEmployees: 3,
        wages: "71,815",
        epsWage: "45,000",
        totalChallanAmount: 17820,
        dueDate: '15-Jun-22',
        dateOfPayment: '13-May-23',
        delay: "",
        delayReason: '',
        typeOfChallan: '3 employees Udaipur challan (Apr22) ',
        trrnNo: '4032304005739',
        crnNo: '229130523000451'
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'RJUDR0021857000',
        location: 'Udaipur',
        month: 'Jun-22',
        noOfEmployees: 3,
        wages: "71,815",
        epsWage: "45,000",
        totalChallanAmount: 17820,
        dueDate: '15-Jul-22',
        dateOfPayment: '13-May-23',
        delay: "",
        delayReason: '',
        typeOfChallan: '3 employees Udaipur challan (Apr22) ',
        trrnNo: '4032304005754',
        crnNo: '229130523000473'
    },
    // Add more dummy data here
];

const PFTrackerTable: React.FC = () => {
    const [data, setData] = useState<PFTrackerData[]>(dummyData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingData, setEditingData] = useState<PFTrackerData | null>(null);

    const handleEdit = (row: PFTrackerData) => {
        setEditingData(row);
        setEditDialogOpen(true);
    };


    const handleEditSubmit = (editedData: PFTrackerData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item === editingData ? editedData : item
            )
        );
        setEditDialogOpen(false);
        setEditingData(null);
    };
    const columns: ColumnDef<PFTrackerData>[] = useMemo(
        () => [
            {
                header: 'Company Name',
                accessorKey: 'companyName',
                cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'PF Code',
                accessorKey: 'pfCode',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Location',
                accessorKey: 'location',
                cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
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
                cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
            },
            {
                header: 'EPS Wage',
                accessorKey: 'epsWage',
                cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
            },
            {
                header: 'Total Challan Amount',
                accessorKey: 'totalChallanAmount',
                cell: (props) => <div className="w-52 truncate">{(props.getValue() as number).toLocaleString()}</div>,
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
                cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
            },
            {
                header: 'Delay Reason',
                accessorKey: 'delayReason',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Type of Challan',
                accessorKey: 'typeOfChallan',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'TRRN No',
                accessorKey: 'trrnNo',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'CRN No',
                accessorKey: 'crnNo',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
                    </div>
                ),
            },
        ],
        []
    );

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
                <PFTrackerEditDialog
                    isOpen={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    onSubmit={handleEditSubmit}
                    data={editingData}
                />
            )}
        </div>
    );
};

export default PFTrackerTable;