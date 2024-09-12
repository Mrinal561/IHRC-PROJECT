import React, { useState } from 'react';
import { Table, Button, Dialog, Tooltip } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';

const { Tr, Th, Td, THead, TBody } = Table;

interface PFSetupData {
  companyGroup: string;
  companyName: string;
  pfCode: string;
  pfCodeLocation: string;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  dscValidDate?: string;
}

interface PFSetupTableProps {
  data: PFSetupData[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newData: PFSetupData) => void;
}

const PFSetupTable: React.FC<PFSetupTableProps> = ({ data, onDelete, onEdit }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const openDialog = (index: number) => {
    setItemToDelete(index);
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

  const getESignStatus = (dscValidDate?: string) => {
    if (!dscValidDate) return 'N/A';
    return new Date(dscValidDate) > new Date() ? 'Active' : 'Inactive';
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
            <Th>Company Group</Th>
            <Th>Company Name</Th>
            <Th>PF Code</Th>
            <Th>PF Code Location</Th>
            <Th>Authorized Signatory</Th>
            <Th>eSign Status</Th>
            <Th className="w-28">Action</Th>
          </Tr>
        </THead>
        <TBody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.companyGroup}</Td>
              <Td>{item.companyName}</Td>
              <Td>{item.pfCode}</Td>
              <Td>{item.pfCodeLocation}</Td>
              <Td>{item.authorizedSignatory}</Td>
              <Td>{getESignStatus(item.dscValidDate)}</Td>
              <Td className="w-28 flex gap-1">
                <Tooltip title="Edit PF Setup">
                  <Button 
                    size="sm"
                    onClick={() => onEdit(index, item)}
                    icon={<MdEdit />}
                    className="text-blue-500"
                  />
                </Tooltip>
                <Tooltip title="Delete PF Setup">
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
          Are you sure you want to delete this PF Setup? This action cannot be undone.
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

export default PFSetupTable;