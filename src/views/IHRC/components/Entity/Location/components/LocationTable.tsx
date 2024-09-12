import React, { useState } from 'react';
import { Table, Button, Dialog, Tooltip } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';

const { Tr, Th, Td, THead, TBody } = Table;

interface LocationTableProps {
    data: Array<{
        Company_Group_Name?: string | { value: string; label: string };
        Company_Name?: string;
        State?: string;
        Location?: string;
    }>;
    onDeleteLocation: (index: number) => void;
    onEdit: (index: number, newName: string) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ data, onDeleteLocation, onEdit }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');

    const openEditDialog = (index: number) => {
        setItemToEdit(index);
        setEditedName(data[index].Location || '');
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

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            onDeleteLocation(itemToDelete);
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

    if (data.length === 0) {
        return (
            <div className="text-center py-4 min-h-[100px]">
                <Table className='min-h-[100px]'>
                    <THead>
                        <Tr>
                            <Th>No Data Available</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {/* No data available */}
                    </TBody>
                </Table>
            </div>
        );
    }

    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th>Company Group Name</Th>
                        <Th>Company Name</Th>
                        <Th>State</Th>
                        <Th>Location</Th>
                        <Th className="w-28">Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{renderCompanyGroupName(item.Company_Group_Name)}</Td>
                            <Td>{item.Company_Name || '-'}</Td>
                            <Td>{item.State || '-'}</Td>
                            <Td>{item.Location || '-'}</Td>
                            <Td className="w-28 flex gap-1">
                                <Tooltip title="Edit Location">
                                    <Button 
                                        size="sm"
                                        onClick={() => openEditDialog(index)}
                                        icon={<MdEdit />}
                                        className="text-blue-500"
                                    />
                                </Tooltip>
                                <Tooltip title="Delete Location">
                                    <Button  
                                        size="sm" 
                                        onClick={() => openDialog(index)}
                                        icon={<FiTrash />}
                                        className="text-red-500"
                                    /> 
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>

            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deleting Location</h5>
                <p>
                    Are you sure you want to delete this location? This action cannot be undone.
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
                <h5 className="mb-4">Edit Location</h5>
                <div className="mb-4">
                    <OutlinedInput 
                        label="Location"
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

export default LocationTable;