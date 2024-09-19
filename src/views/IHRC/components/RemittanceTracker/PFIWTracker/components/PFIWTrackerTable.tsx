import React, { useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PFIWTrackerEditDialog from './PFIWTrackerEditDialog';

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
        delayReason:'Technical issues with the portal'
    },
    {
      companyName: 'India Shelter',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Apr-23',
        dueDate: '15-May-23',
        submissionDate: '1-May-23',
        delay:'',
        delayReason:''
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