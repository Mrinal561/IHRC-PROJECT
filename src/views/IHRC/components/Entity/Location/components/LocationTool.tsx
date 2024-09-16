import React, { useState, useMemo } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import Bu from './Bu';
import Filter from './Filter';
interface SelectOption {
  value: string;
  label: string;
}

const LocationTool: React.FC = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<SelectOption | null>(null);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);

  const companyGroupOptions = useMemo(() => {
    const groups = [...new Set(entityDataSet.map(item => item.Company_Group_Name))];
    return groups.map(group => ({ value: group!, label: group! }));
  }, []);

  const filteredCompanyNameOptions = useMemo(() => {
    if (!selectedCompanyGroup) return [];
    const names = entityDataSet
      .filter(item => item.Company_Group_Name === selectedCompanyGroup.value)
      .map(item => item.Company_Name);
    return [...new Set(names)].map(name => ({ value: name!, label: name! }));
  }, [selectedCompanyGroup]);

  const filteredStateOptions = useMemo(() => {
    if (!selectedCompanyGroup || !selectedCompanyName) return [];
    const states = entityDataSet
      .filter(item => item.Company_Group_Name === selectedCompanyGroup.value && item.Company_Name === selectedCompanyName.value)
      .map(item => item.State);
    return [...new Set(states)].map(state => ({ value: state!, label: state! }));
  }, [selectedCompanyGroup, selectedCompanyName]);

  const filteredDistrictOptions = useMemo(() => {
    if (!selectedCompanyGroup || !selectedCompanyName || !selectedState) return [];
    const districts = entityDataSet
      .filter(item => 
        item.Company_Group_Name === selectedCompanyGroup.value && 
        item.Company_Name === selectedCompanyName.value &&
        item.State === selectedState.value
      )
      .map(item => item.District);
    return [...new Set(districts)].map(district => ({ value: district!, label: district! }));
  }, [selectedCompanyGroup, selectedCompanyName, selectedState]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setLocationName('');
    setSelectedCompanyGroup(null);
    setSelectedCompanyName(null);
    setSelectedState(null);
    setSelectedDistrict(null);
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
    if (locationName.trim() && selectedCompanyGroup && selectedCompanyName && selectedState && selectedDistrict) {
      const newEntityData: EntityData = {
        Company_Group_Name: selectedCompanyGroup.value,
        Company_Name: selectedCompanyName.value,
        State: selectedState.value,
        District: selectedDistrict.value,
        Location: locationName.trim()
      };
      
      // Instead of calling addLocation, we'll just log the new entity data
      console.log('New location added:', newEntityData);
      showSuccessToast(`Location "${locationName.trim()}" has been successfully added.`);
      onDialogClose();
    } else {
      showFailToast('Please enter a valid Location Name, select a Company Group, Company Name, State, and District.');
    }
  };

  return (
    <div className='flex gap-3'>
      <Filter></Filter>
      <Bu/>
      <Button variant="solid" onClick={openDialog} icon={<HiPlusCircle />} size="sm">
        Add Location
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Add Location</h5>
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
                setSelectedDistrict(null);
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
                setSelectedDistrict(null);
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
                setSelectedDistrict(null);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Select The District</p>
            <OutlinedSelect
              label="Select District"
              options={filteredDistrictOptions}
              value={selectedDistrict}
              onChange={(option: SelectOption | null) => {
                setSelectedDistrict(option);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Enter Location Name</p>
            <OutlinedInput 
              label="Location Name"
              value={locationName}
              onChange={(value: string) => {
                setLocationName(value);
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

export default LocationTool;