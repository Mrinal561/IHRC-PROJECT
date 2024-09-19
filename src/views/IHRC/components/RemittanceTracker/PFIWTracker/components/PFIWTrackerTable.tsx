import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PFIWTrackerEditDialog from './PFIWTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

// Define the structure of your data
export interface PFIWTrackerData {
    companyName: string;
    pfCode: string;
    location: string;
    month: string;
    dueDate: string;
    submissionDate: string;
    delay:string;
    delayReason:string;
    challan: string;
    payment: string;
}

// Dummy data (replace with your actual data source)
export const dummyData: PFIWTrackerData[] = [
    {
      companyName: 'India Shelter',
        pfCode: 'RJUDR0021857000',
        location: 'UDAIPUR',
        month: 'Apr-23',
        dueDate: '15-May-23',
        submissionDate: '1-May-23',
        delay:'5 Days',
        delayReason:'Technical issues with the portal',
        challan: "Challan Receipt",
        payment: "Payment Receipt",
    },
    {
      companyName: 'India Shelter',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Apr-23',
        dueDate: '15-May-23',
        submissionDate: '1-May-23',
        delay:'',
        delayReason:'',
        challan: "Challan Receipt",
        payment: "",
    },
    // Add more dummy data here
];

const PFIWTrackerTable: React.FC = () => {
    const [data, setData] = useState<PFIWTrackerData[]>(dummyData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingData, setEditingData] = useState<PFIWTrackerData | null>(null);

    const handleEdit = (row: PFIWTrackerData) => {
        console.log('Edit', row);
        setEditingData(row);
        setEditDialogOpen(true);
        // Implement edit functionality
    };

    const handleEditSubmit = (editedData: PFIWTrackerData) => {
      setData((prevData) =>
          prevData.map((item) =>
              item === editingData ? editedData : item
          )
      );
      setEditDialogOpen(false);
      setEditingData(null);
  };
    const columns: ColumnDef<PFIWTrackerData>[] = useMemo(
        () => [
            {
                header: 'Company Name',
                accessorKey: 'companyName',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
                header: 'Due Date',
                accessorKey: 'dueDate',
                cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
            },
            {
                header: 'Submission Date',
                accessorKey: 'submissionDate',
                cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
            },
            {
              header: 'Dealy',
              accessorKey: 'delay',
              cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
          },
          {
            header: 'Dealy Reason',
            accessorKey: 'delayReason',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
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
            header: 'Upload Status',
            id: 'uploadStatus',
            cell: ({ row }) => {
                const { challan, payment } = row.original;
                const uploadedCount = [challan, payment].filter(Boolean).length;
                return <div className="w-32 truncate">{`${uploadedCount}/2`}</div>;
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
        <PFIWTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
        />
      )}
        </div>
    );
};

export default PFIWTrackerTable;