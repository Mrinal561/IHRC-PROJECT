import React, { useState } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';

const CompanyGroupTool: React.FC = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [companyGroupName, setCompanyGroupName] = useState('');

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setCompanyGroupName('');
  };

  const showNotification = (message: string) => {
    toast.push(
      <Notification title="Success" type="success">
        <div className="flex items-center">
          <span>{message}</span>
        </div>
      </Notification>
    );
  };

  const onDialogOk = () => {
    if (companyGroupName.trim()) {
      showNotification(`Company Group Name "${companyGroupName.trim()}" has been submitted.`);
      setIsOpen(false);
      setCompanyGroupName('');
    } else {
      showNotification('Please enter a valid Company Group Name.');
    }
  };

  const handleInputChange = (value: string) => {
    setCompanyGroupName(value);
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
        Add Company Group Name
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={500}
        height={250}
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Add Company Name</h5>
          <div className='flex flex-col gap-2'>
            <p>Enter Your Company Group Name</p>
            <OutlinedInput 
              label="Company Group Name"
              value={companyGroupName}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-right mt-6">
            <Button
              className="mr-2"
              variant="plain"
              onClick={onDialogClose}
            >
              Cancel
            </Button>
            <Button variant="solid" onClick={onDialogOk}>
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyGroupTool;