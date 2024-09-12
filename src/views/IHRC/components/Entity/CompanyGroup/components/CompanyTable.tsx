import React, { useState } from 'react';
import { Table, Button, Dialog, Tooltip } from '@/components/ui';
import { FiTrash, FiEdit } from 'react-icons/fi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { MdEdit } from 'react-icons/md';

const { Tr, Th, Td, THead, TBody } = Table;

interface CompanyTableProps {
    data: Array<{
        Company_Group_Name?: string;
    }>;
    onDelete: (index: number) => void;
    onEdit: (index: number, newName: string) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ data, onDelete, onEdit }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');

    const openDeleteDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };

    const openEditDialog = (index: number) => {
        setItemToEdit(index);
        setEditedName(data[index].Company_Group_Name || '');
        setEditDialogIsOpen(true);
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

    const handleEditConfirm = () => {
        if (itemToEdit !== null && editedName.trim()) {
            onEdit(itemToEdit, editedName.trim());
            handleDialogClose();
        }
    };

    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th>Company Group Name</Th>
                        <Th className="w-28">Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.Company_Group_Name || '-'}</Td>
                            <Td className="w-28 flex gap-1">
                                <Tooltip title="Edit Company Group">
                                    <Button 
                                        size="sm"
                                        onClick={() => openEditDialog(index)}
                                        icon={<MdEdit />}
                                        className="text-blue-500"
                                    />
                                </Tooltip>
                                <Tooltip title="Delete Company Group">
                                    <Button  
                                        size="sm" 
                                        onClick={() => openDeleteDialog(index)}
                                        icon={<FiTrash />}
                                        className="text-red-500"
                                    /> 
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>

            {/* Delete Confirmation Dialog */}
            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deletion</h5>
                <p>
                    Are you sure you want to delete this company group? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit Company Group Name</h5>
                <div className="mb-4">
                    <OutlinedInput 
                        label="Company Group Name"
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
        </>
    );
};

export default CompanyTable;