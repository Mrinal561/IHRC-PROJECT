import React, { useState, useMemo } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { ActionMeta, MultiValue } from 'react-select';

interface DistrictToolProps {
  addDistricts: (newDistricts: EntityData[]) => void;
  entityData: EntityData[];
}

interface SelectOption {
  value: string;
  label: string;
}

// This is a mock list of districts. In a real application, you would have a comprehensive list of districts for each state.
const districtsByState: { [key: string]: SelectOption[] } = {
  'Andhra Pradesh': [
    { value: 'anantapur', label: 'Anantapur' },
    { value: 'chittoor', label: 'Chittoor' },
    { value: 'eastgodavari', label: 'East Godavari' },
  ],
  'Tamil Nadu': [
    { value: 'chennai', label: 'Chennai' },
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'madurai', label: 'Madurai' },
  ],
};

const DistrictTool: React.FC<DistrictToolProps> = ({ addDistricts, entityData }) => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<SelectOption | null>(null);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<SelectOption[]>([]);

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

  const filteredStateOptions = useMemo(() => {
    if (!selectedCompanyGroup || !selectedCompanyName) return [];
    const states = entityData
      .filter(item => item.Company_Group_Name === selectedCompanyGroup.value && item.Company_Name === selectedCompanyName.value)
      .map(item => item.State);
    return [...new Set(states)].map(state => ({ value: state, label: state }));
  }, [entityData, selectedCompanyGroup, selectedCompanyName]);

  const districtOptions = useMemo(() => {
    if (!selectedState) return [];
    return districtsByState[selectedState.label] || [];
  }, [selectedState]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setSelectedCompanyGroup(null);
    setSelectedCompanyName(null);
    setSelectedState(null);
    setSelectedDistricts([]);
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
    if (selectedCompanyGroup && selectedCompanyName && selectedState && selectedDistricts.length > 0) {
      const newDistricts = selectedDistricts.map(district => ({
        Company_Group_Name: selectedCompanyGroup.value,
        Company_Name: selectedCompanyName.value,
        State: selectedState.value,
        District: district.label
      }));
      
      addDistricts(newDistricts);
      showSuccessToast(`${selectedDistricts.length} district(s) have been successfully added.`);
      onDialogClose();
    } else {
      showFailToast('Please select a Company Group, Company Name, State, and at least one District.');
    }
  };

  const handleDistrictChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    setSelectedDistricts(newValue as SelectOption[]);
  };

  return (
    <div>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size="sm">
        Add Districts
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Add Districts</h5>
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
                setSelectedState(null);
                setSelectedDistricts([]);
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
                setSelectedState(null);
                setSelectedDistricts([]);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Select The State</p>
            <OutlinedSelect
              label="Select State"
              options={filteredStateOptions}
              value={selectedState}
              onChange={(option: SelectOption | null) => {
                setSelectedState(option);
                setSelectedDistricts([]);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Select Districts</p>
            <OutlinedSelect
              label="Select Districts"
              options={districtOptions}
              value={selectedDistricts}
              onChange={handleDistrictChange}
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

export default DistrictTool;