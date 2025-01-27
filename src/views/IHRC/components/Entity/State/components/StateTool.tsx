
import React, { useState, useMemo } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { ActionMeta, MultiValue } from 'react-select';
import { EntityData, entityDataSet } from '@/views/IHRC/store/dummyEntityData'; // Import the interface and data
import BU from './BU';
import Filter from './Filter';
interface SelectOption {
  value: string;
  label: string;
}

const indianStates = [
  { value: 'AN', label: 'Andaman and Nicobar Islands' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli' },
  { value: 'DD', label: 'Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LA', label: 'Ladakh' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UT', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' }
];

const StateTool: React.FC = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState<SelectOption[]>([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<SelectOption | null>(null);

  const companyGroupOptions = useMemo(() => {
    const groups = [...new Set(entityDataSet.map(item => item.Company_Group_Name))];
    return groups.map(group => ({ value: group || '', label: group || '' }));
  }, []);

  const filteredCompanyNameOptions = useMemo(() => {
    if (!selectedCompanyGroup) return [];
    const names = entityDataSet
      .filter(item => item.Company_Group_Name === selectedCompanyGroup.value)
      .map(item => item.Company_Name);
    return [...new Set(names)].map(name => ({ value: name || '', label: name || '' }));
  }, [selectedCompanyGroup]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setSelectedStates([]);
    setSelectedCompanyGroup(null);
    setSelectedCompanyName(null);
  };

  const showSuccessToast = () => {
    toast.push(
      <Notification title="Success" type="success">
        State(s) added successfully!
      </Notification>
    );
  };

  const showFailToast = () => {
    toast.push(
      <Notification title="Error" type="danger">
        Please select at least one State, a Company Group, and a Company Name.
      </Notification>
    );
  };

  const onDialogOk = () => {
    if (selectedStates.length > 0 && selectedCompanyGroup && selectedCompanyName) {
      selectedStates.forEach(state => {
        const newEntityData: EntityData = {
          Company_Group_Name: selectedCompanyGroup.value,
          Company_Name: selectedCompanyName.value,
          State: state.label
        };
        // Here you would typically add the new entity data to your state or send it to an API
        console.log('New Entity Data:', newEntityData);
      });
      showSuccessToast();
      onDialogClose();
    } else {
      showFailToast();
    }
  };

  const handleStateChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    setSelectedStates(newValue as SelectOption[]);
  };

  return (
    <div className='flex gap-3 items-center'>
      <Filter></Filter>
      <BU/>
      <Button
        variant="solid"
        onClick={openDialog}
        icon={<HiPlusCircle />}
        size="sm"
      >
        Assign State
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}  shouldCloseOnOverlayClick={false} 
      >
        <h5 className="mb-4">Assign State</h5>
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
            <p>Select States</p>
            <OutlinedSelect
              label="Select States"
              options={indianStates}
              value={selectedStates}
              onChange={handleStateChange}
              isMulti={true}
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