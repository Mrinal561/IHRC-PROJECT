import React, { useState } from 'react';
import { Table, Button, Dialog, Tooltip } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import { ESICSetupData } from '../EsicSetup';


const { Tr, Th, Td, THead, TBody } = Table;

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
                        <Th>ESIC Code Type</Th>
                        <Th>ESIC Code</Th>
                        <Th>ESIC Code Location</Th>
                        <Th>ESIC User ID</Th>
                        <Th>ESIC User Password</Th>
                        <Th>Authorized Signatory</Th>
                        <Th>Designation</Th>
                        <Th>Mobile</Th>
                        <Th>Email</Th>
                        {/* <Th>Upload PF Reg. Certificate</Th> */}
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.Company_Group_Name}</Td>
                            <Td>{item.Company_Name}</Td>
                            <Td>{item.esicCodeType}</Td>
                            <Td>{item.esicCode}</Td>
                            <Td>{item.esicCodeLocation}</Td>
                            <Td>{item.esicUserId}</Td>
                            <Td>{item.esicPassword}</Td>
                            <Td>{item.authorizedSignatory}</Td>
                            <Td>{item.signatoryDesignation}</Td>
                            <Td>{item.signatoryMobile}</Td>
                            <Td>{item.signatoryEmail}</Td>
                            {/* <Td>{item.pfRegistrationCertificate}</Td> */}
                            <Td className="flex items-center gap-1">
                                <Tooltip title="Edit">
                                    <Button 
                                        size="sm"
                                        onClick={() => openEditDialog(index)}
                                        icon={<MdEdit />}
                                        className="text-blue-500"
                                    />
                                </Tooltip>
                                <Tooltip title="Delete">
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
                <h5 className="mb-4">Edit PF Setup</h5>
                <div className="flex flex-col gap-4">
                    <OutlinedInput 
                        label="PF Code"
                        value={editedData.esicCode || ''}
                        onChange={(value: string) => setEditedData(prev => ({ ...prev, pfCode: value }))}
                    />
                    <OutlinedInput 
                        label="PF Code Location"
                        value={editedData.esicCodeLocation || ''}
                        onChange={(value: string) => setEditedData(prev => ({ ...prev, pfCodeLocation: value }))}
                    />
                    <OutlinedInput 
                        label="Authorized Signatory"
                        value={editedData.authorizedSignatory || ''}
                        onChange={(value: string) => setEditedData(prev => ({ ...prev, authorizedSignatory: value }))}
                    />
                    {/* Add more fields as needed */}
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

export default EsicSetupTable