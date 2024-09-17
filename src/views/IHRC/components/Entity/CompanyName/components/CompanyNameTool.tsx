import React, { useState, useMemo } from 'react';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { entityDataSet, EntityData } from '../../../../store/dummyEntityData';
import Filter from './Filter';
interface SelectOption {
  value: string;
  label: string;
}

const CompanyNameTool: React.FC = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const companyGroupOptions = useMemo(() => {
    const uniqueGroups = Array.from(new Set(entityDataSet.map(entity => entity.Company_Group_Name)));
    return uniqueGroups.filter(Boolean).map(group => ({
      value: group as string,
      label: group as string
    }));
  }, []);

  const openDialog = () => {
    console.log("Opening dialog");
    setIsOpen(true);
  };

  const onDialogClose = () => {
    console.log("Closing dialog");
    setIsOpen(false);
    setCompanyName('');
    setSelectedCompanyGroup(null);
    setIsSubmitting(false);
  };

  const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {message}
      </Notification>
    );
  };

  const onDialogOk = () => {
    console.log("Dialog OK clicked", { companyName, selectedCompanyGroup });
    if (companyName.trim() && selectedCompanyGroup) {
      setIsSubmitting(true);
      // Simulating an API call with setTimeout
      setTimeout(() => {
        showNotification('success', `Company "${companyName.trim()}" has been successfully added.`);
        setIsSubmitting(false);
        onDialogClose();
      }, 1500);
    } else {
      showNotification('danger', 'Please enter a valid Company Name and select a Company Group.');
    }
  };

  return (
    <div className='flex gap-3 items-center'>
    <Filter></Filter>
      <Button
        size="sm"
        icon={<HiPlusCircle />}
        onClick={openDialog}
        variant="solid"
      >
        Add Company
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Add Company Name</h5>
        <div className='mb-4 flex flex-col gap-3'>
          <label>Select the company group name</label>
          <OutlinedSelect
            label="Select The Company Group"
            options={companyGroupOptions}
            value={selectedCompanyGroup}
            onChange={(option: SelectOption | null) => {
              console.log("Company Group selected:", option);
              setSelectedCompanyGroup(option);
            }}
          />
        </div>
        <div className='mb-4 flex flex-col gap-3'>
        <label>Select the company name</label>
          <OutlinedInput
            label="Enter Your Company Name"
            value={companyName}
            onChange={(value: string) => {
              console.log("Company Name changed:", value);
              setCompanyName(value);
            }}
          />
        </div>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            variant="solid" 
            onClick={onDialogOk}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Confirm'}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyNameTool;