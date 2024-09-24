import React, { useState, useMemo } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// Define the structure of your PFIWTrackerData
interface PFIWTrackerData {
  entityName: string;
  companyName: string;
  pfCode: string;
  location: string;
  month: string;
  dueDate: string;
  submissionDate: string;
}

type Option = {
  value: string;
  label: string;
};

const getUniqueValues = (data: any[], key: string): string[] => {
  const values = data.map(item => item[key]);
  return Array.from(new Set(values)).filter((value): value is string => value !== undefined);
};

const createOptions = (values: string[]): Option[] => 
  values.map(value => ({ value, label: value }));

interface PFIWTrackerFilterProps {
  data: PFIWTrackerData[];
  onFilterChange: (filters: { entityName: string; companyName: string; pfCode: string; location: string }) => void;
}

const PFIWTrackerFilter: React.FC<PFIWTrackerFilterProps> = ({ data, onFilterChange }) => {
  const entityOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
  const companyOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
  const pfCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'pfCode')), [data]);
  const locationOptions = useMemo(() => createOptions(getUniqueValues(data, 'location')), [data]);

  const [currentEntity, setCurrentEntity] = useState<string>(entityOptions[0]?.value || '');
  const [currentCompany, setCurrentCompany] = useState<string>(companyOptions[0]?.value || '');
  const [currentPfCode, setCurrentPfCode] = useState<string>(pfCodeOptions[0]?.value || '');
  const [currentLocation, setCurrentLocation] = useState<string>(locationOptions[0]?.value || '');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) => 
    (selectedOption: Option | null) => {
      if (selectedOption) {
        setter(selectedOption.value);
        onFilterChange({
          entityName: filterType === 'entityName' ? selectedOption.value : currentEntity,
          companyName: filterType === 'companyName' ? selectedOption.value : currentCompany,
          pfCode: filterType === 'pfCode' ? selectedOption.value : currentPfCode,
          location: filterType === 'location' ? selectedOption.value : currentLocation,
        });
      }
    };

  return ( 
    <div className="flex gap-3">  
    <div className='w-full'>
        <OutlinedSelect
          label="Company Group"
          options={companyOptions}
          value={companyOptions.find((option) => option.value === currentCompany)}
          onChange={handleChange(setCurrentCompany, 'companyName')}
        />
      </div>
      <div className='w-full'>
        <OutlinedSelect
          label="Company"
          options={entityOptions}
          value={entityOptions.find((option) => option.value === currentEntity)}
          onChange={handleChange(setCurrentEntity, 'entityName')}
        />
      </div>
      <div className='w-full z-20'>
        <OutlinedSelect
          label="PF Code"
          options={pfCodeOptions}
          value={pfCodeOptions.find((option) => option.value === currentPfCode)}
          onChange={handleChange(setCurrentPfCode, 'pfCode')}
        />
      </div>
    </div>
  );
};

export default PFIWTrackerFilter;