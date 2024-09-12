
import React, { useState, useMemo } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

interface StateToolProps {
  addState: (newState: EntityData) => void;
  entityData: EntityData[];
}

interface SelectOption {
  value: string;
  label: string;
}

const StateTool: React.FC<StateToolProps> = ({ addState, entityData }) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [stateName, setStateName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<SelectOption | null>(null);

  const companyGroupOptions = useMemo(() => {
    const groups = [...new Set(entityData.map(item => item.Company_Group_Name))];
    return groups.map(group => ({ value: group, label: group }));
  }, [entityData]);

  const filteredCompanyNameOptions = useMemo(() => {
    if (!selectedCompanyGroup) return [];
    const names = entityData
      .filter(item => item.Company_Group_Name === selectedCompanyGroup.value)
      .map(item => item.Company_Name);
    return [...new Set(names)].map(name => ({ value: name, label: name }));
  }, [entityData, selectedCompanyGroup]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setStateName('');
    setSelectedCompanyGroup(null);
    setSelectedCompanyName(null);
  };

  const showSuccessToast = (message: string) => {
    toast.push(
      <Notification title="Success" type="success">
        {message}
      </Notification>
    );
  };

  const showFailToast = (message: string) => {
    toast.push(
      <Notification title="Error" type="danger">
        {message}
      </Notification>
    );
  };

  const onDialogOk = () => {
    if (stateName.trim() && selectedCompanyGroup && selectedCompanyName) {
      const newEntityData: EntityData = {
        Company_Group_Name: selectedCompanyGroup.value,
        Company_Name: selectedCompanyName.value,
        State: stateName.trim()
      };
      
      addState(newEntityData);
      showSuccessToast(`State "${stateName.trim()}" has been successfully added.`);
      onDialogClose();
    } else {
      showFailToast('Please enter a valid State Name, select a Company Group, and select a Company Name.');
    }
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size="sm">
        Add State
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Add State</h5>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p>Select The Company Group</p>
            <OutlinedSelect
              label="Select Company Group"
              options={companyGroupOptions}
              value={selectedCompanyGroup}
              onChange={(option: SelectOption | null) => {
                setSelectedCompanyGroup(option);
                setSelectedCompanyName(null);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Select The Company Name</p>
            <OutlinedSelect
              label="Select Company Name"
              options={filteredCompanyNameOptions}
              value={selectedCompanyName}
              onChange={(option: SelectOption | null) => {
                setSelectedCompanyName(option);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Enter State Name</p>
            <OutlinedInput 
              label="State Name"
              value={stateName}
              onChange={(value: string) => {
                setStateName(value);
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

export default StateTool;