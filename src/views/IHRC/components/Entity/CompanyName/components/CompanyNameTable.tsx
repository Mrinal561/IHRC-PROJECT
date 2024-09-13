import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Tooltip } from '@/components/ui';
import { FiSettings, FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { APP_PREFIX_PATH } from '@/constants/route.constant';



interface CompanyData {
    Company_Group_Name?: string | { value: string; label: string };
    Company_Name?: string;
}

interface CompanyNameTableProps {
    data: CompanyData[];
    onDelete: (index: number) => void;
    onEdit: (index: number, newName: string) => void;
}

const CompanyNameTable: React.FC<CompanyNameTableProps> = ({ data, onDelete, onEdit }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');
    const navigate = useNavigate();

    const handleSetupClick = (setupType: string, companyName: string) => {
        // Convert company name to URL-safe string
        const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
        // Navigate to the appropriate setup page
        navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`);
    };


    const columns: ColumnDef<CompanyData>[] = useMemo(
        () => [
            {
                header: 'Company Group Name',
                accessorKey: 'Company_Group_Name',
                cell: (props) => (
                    <div className="w-52 truncate">
                        {typeof props.getValue() === 'object'
                            ? (props.getValue() as { label: string }).label
                            : props.getValue() as string}
                    </div>
                ),
            },
            {
                header: 'Company Name',
                accessorKey: 'Company_Name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'PF Setup',
                id: 'pf_setup',
                cell: ({ row }) => (
                    <Tooltip title="PF Config">
                        <Button
                            size="sm"
                            onClick={() => handleSetupClick('PF', row.original.Company_Name || '')}
                            icon={<FiSettings />}
                            className="text-blue-500"
                        />
                    </Tooltip>
                ),
            },
            {
                header: 'PT Setup',
                id: 'pt_setup',
                cell: ({ row }) => (
                    <Tooltip title="PT Config">
                        <Button
                            size="sm"
                            onClick={() => handleSetupClick('PT', row.original.Company_Name || '')}
                            icon={<FiSettings />}
                            className="text-blue-500"
                        />
                    </Tooltip>
                ),
            },
            {
                header: 'ESI Setup',
                id: 'esi_setup',
                cell: ({ row }) => (
                    <Tooltip title="ESI Config">
                        <Button
                            size="sm"
                            onClick={() => handleSetupClick('ESI', row.original.Company_Name || '')}
                            icon={<FiSettings />}
                            className="text-blue-500"
                        />
                    </Tooltip>
                ),
            },
            {
                header: 'LWF Setup',
                id: 'lwf_setup',
                cell: ({ row }) => (
                    <Tooltip title="LWF Config">
                        <Button
                            size="sm"
                            onClick={() => handleSetupClick('LWF', row.original.Company_Name || '')}
                            icon={<FiSettings />}
                            className="text-blue-500"
                        />
                    </Tooltip>
                ),
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
                                onClick={() => openDeleteDialog(row.index)}
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

    const openDeleteDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };


    const openEditDialog = (index: number) => {
        setItemToEdit(index);
        setEditedName(data[index].Company_Name || '');
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
        setEditedName('');
    };

    const handleDeleteConfirm = () => {
        if (itemToDelete !== null) {
            onDelete(itemToDelete);
            handleDialogClose();
        }
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            onDelete(itemToDelete);
            setDialogIsOpen(false);
            setItemToDelete(null);
        }
    };

    const handleEditConfirm = () => {
        if (itemToEdit !== null && editedName.trim()) {
            onEdit(itemToEdit, editedName.trim());
            setEditDialogIsOpen(false);
            setItemToEdit(null);
            setEditedName('');
        }
    };

    const renderCompanyGroupName = (companyGroupName: string | { value: string; label: string } | undefined) => {
        if (typeof companyGroupName === 'object' && companyGroupName !== null) {
            return companyGroupName.label || '-';
        }
        return companyGroupName || '-';
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
        <div className='relative'>
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
                    Are you sure you want to delete this company name? This action will remove only the company name, not the entire row.
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
                <h5 className="mb-4">Edit Company Name</h5>
                <div className="mb-4">
                    <OutlinedInput 
                        label="Company Name"
                        value={editedName}
                        onChange={(value: string) => setEditedName(value)}
                    />
                </div>
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

export default CompanyNameTable;