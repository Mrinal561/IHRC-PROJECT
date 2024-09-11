import React, { useState } from 'react';
import { Table, Button, Dialog } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';

const { Tr, Th, Td, THead, TBody } = Table;

interface CompanyTableProps {
    data: Array<{
        Company_Group_Name: string;
        Company_Name: string;
    }>;
    onDelete: (companyGroupName: string) => void;
}

const CompanyNameTable: React.FC<CompanyTableProps> = ({ data, onDelete }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const openDialog = (companyGroupName: string) => {
        setItemToDelete(companyGroupName);
        setDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setItemToDelete(null);
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            onDelete(itemToDelete);
            setDialogIsOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th>Company Group Name</Th>
                        <Th>Company Name</Th>
                        <Th className="w-28">Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.Company_Group_Name}</Td>
                            <Td>{item.Company_Name || '-'}</Td>
                            <Td className="w-28">
                                <Button  
                                    size="sm" 
                                    onClick={() => openDialog(item.Company_Group_Name)}
                                    icon={<FiTrash />}
                                    className='hover:bg-transparent text-red-500'
                                > 
                                </Button>
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
                    Are you sure you want to delete this company name? This action cannot be undone.
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
        </>
    );
};

export default CompanyNameTable;