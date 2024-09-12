import React, { useState } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

interface CompanyNameToolProps {
  addCompany: (newEntityData: EntityData) => void;
  companyGroups: string[];
}

interface SelectOption {
  value: string;
  label: string;
}

const CompanyNameTool: React.FC<CompanyNameToolProps> = ({ addCompany, companyGroups }) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);


  const openDialog = () => {
    console.log("Opening dialog");
    setIsOpen(true);
  };

  const onDialogClose = () => {
    console.log("Closing dialog");
    setIsOpen(false);
    setCompanyName('');
    setSelectedCompanyGroup(null);
  };

  const showSuccessToast = (message: string) => {
    console.log("Showing success toast:", message);
    toast.push(
      <Notification title="Success" type="success">
        {message}
      </Notification>
    );
  };

  const showFailToast = (message: string) => {
    console.log("Showing fail toast:", message);
    toast.push(
      <Notification title="Error" type="danger">
        {message}
      </Notification>
    );
  };

  const onDialogOk = () => {
    console.log("Dialog OK clicked", { companyName, selectedCompanyGroup });
    if (companyName.trim() && selectedCompanyGroup) {
      const newEntityData: EntityData = {
        Company_Group_Name: selectedCompanyGroup.value,
        Company_Name: companyName.trim()
      };
      
      console.log("Adding new company:", newEntityData);
      addCompany(newEntityData);
      showSuccessToast(`Company "${companyName.trim()}" has been successfully added.`);
      onDialogClose();
    } else {
      showFailToast('Please enter a valid Company Name and select a Company Group.');
    }
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size='sm'>
        Add Company Name
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Add Company Name</h5>
        <div className='flex flex-col gap-6'>
          <div  className='flex flex-col gap-2'>
            <p>Select The Company Group</p>
        <OutlinedSelect
          label="Select Company Group"
          options={companyGroups.map(group => ({ value: group, label: group }))}
          value={selectedCompanyGroup}
          onChange={(option: SelectOption | null) => {
            console.log("Company Group selected:", option);
            setSelectedCompanyGroup(option);
          }}
          />
          </div>
          <div className='flex flex-col gap-2'>
          <p>Enter Your Company Name</p>
        <OutlinedInput 
          label="Company Name"
          value={companyName}
          onChange={(value: string) => {
            console.log("Company Name changed:", value);
            setCompanyName(value);
          }}
          />
          </div>
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
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyNameTool;