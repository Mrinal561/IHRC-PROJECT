import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { ESICSetupData } from '../EsicSetup';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';



interface ESICSetupTableProps {
    data: ESICSetupData[];
    onDelete: (index: number) => void;
    onEdit: (index: number, newData: Partial<ESICSetupData>) => void;
}

const EsicSetupTable: React.FC<ESICSetupTableProps> = ({ data, onDelete, onEdit }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedData, setEditedData] = useState<Partial<ESICSetupData>>({});



    const columns: ColumnDef<ESICSetupData>[] = useMemo(
        () => [
            {
                header: 'Company Group Name',
                accessorKey: 'Company_Group_Name',
                cell: (props) => (
                    <div className="w-44 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company Name',
                accessorKey: 'Company_Name',
                cell: (props) => (
                    <div className="w-44 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Code Type',
                accessorKey: 'esicCodeType',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Code',
                accessorKey: 'esicCode',
                cell: (props) => (
                    <div className="w-36 text-start">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Code Location',
                accessorKey: 'esicCodeLocation',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI User ID',
                accessorKey: 'esicUserId',
                cell: (props) => (
                    <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Password',
                accessorKey: 'esicPassword',
                cell: (props) => (
                    <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Authorized Signatory',
                accessorKey: 'authorizedSignatory',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Designation',
                accessorKey: 'signatoryDesignation',
                cell: (props) => (
                    <div className="w-40 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Mobile',
                accessorKey: 'signatoryMobile',
                cell: (props) => (
                    <div className="w-40 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Email',
                accessorKey: 'signatoryEmail',
                cell: (props) => (
                    <div className="w-40 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'ESI Certificate',
                accessorKey: 'esicRegistrationCertificate',
                cell: (props) => {
                    const file = props.getValue() as File | undefined;
                    return (
                        <div className="w-40 truncate">
                            {file ? file.name : 'No file uploaded'}
                        </div>
                    );
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
                                onClick={() => openEditDialog(row.index)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="sm"
                                onClick={() => openDialog(row.index)}
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

    const openEditDialog = (index: number) => {
        setItemToEdit(index);
        setEditedData(data[index]);
        setEditDialogIsOpen(true);
    };

    const openDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setEditedData({});
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            onDelete(itemToDelete);
            setDialogIsOpen(false);
            setItemToDelete(null);
        }
    };

    const handleEditConfirm = () => {
        if (itemToEdit !== null) {
            onEdit(itemToEdit, editedData);
            setEditDialogIsOpen(false);
            setItemToEdit(null);
            setEditedData({});
        }
    };

   // State for table pagination and sorting
   const [tableData, setTableData] = useState({
    total: data.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
});

// Function to handle pagination changes
const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
};

// Function to handle page size changes
const onSelectChange = (value: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
};
    return (
        <div className="relative">
        {data.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
                No data available
            </div>
        ) : (
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                pagingData={{
                    total: data.length,
                    pageIndex: 1,
                    pageSize: 10,
                }}
            />
        )}

            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deletion</h5>
                <p>
                    Are you sure you want to delete this PF Setup?
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDialogOk}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit ESI Setup Details</h5>
                {/* Add your edit form fields here */}
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleEditConfirm}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
            </div>
    );
};

export default EsicSetupTable