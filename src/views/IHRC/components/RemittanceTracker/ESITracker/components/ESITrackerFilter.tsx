import React, { useState, useMemo } from 'react';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// Define the structure of your ESITrackerData
interface ESITrackerData {
  companyName: string;
  esiCode: string;
  location: string;
  month: string;
  noOfEmployees: number;
  wages: string;
  esiContribution: string;
  totalChallanAmount: number;
  dueDate: string;
  dateOfPayment: string;
  delay: string;
  delayReason: string;
  typeOfChallan: string;
  challanNo: string;
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

interface ESITrackerFilterProps {
  data: ESITrackerData[];
  onFilterChange: (filters: { groupName: string; companyName: string; esiCode: string }) => void;
}

const ESITrackerFilter: React.FC<ESITrackerFilterProps> = ({ data, onFilterChange }) => {
  const groupOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
  const nameOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
  const esiCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'esiCode')), [data]);

  const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value || '');
  const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value || '');
  const [currentEsiCode, setCurrentEsiCode] = useState<string>(esiCodeOptions[0]?.value || '');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) => 
    (selectedOption: Option | null) => {
      if (selectedOption) {
        setter(selectedOption.value);
        onFilterChange({
          groupName: filterType === 'groupName' ? selectedOption.value : currentGroup,
          companyName: filterType === 'companyName' ? selectedOption.value : groupName,
          esiCode: filterType === 'esiCode' ? selectedOption.value : currentEsiCode,
        });
      }
    };

  return ( 
    <div className="flex gap-3">  
      <div className='w-full'>
        <OutlinedSelect
          label="Company Group"
          options={groupOptions}
          value={groupOptions.find((option) => option.value === currentGroup)}
          onChange={handleChange(setCurrentGroup, 'groupName')}
        />
      </div>
      <div className='w-full'>
        <OutlinedSelect
          label="Company"
          options={nameOptions}
          value={nameOptions.find((option) => option.value === groupName)}
          onChange={handleChange(setGroupName, 'companyName')}
        />
      </div>
      <div className='w-full z-20'>
        <OutlinedSelect
          label="ESI Code"
          options={esiCodeOptions}
          value={esiCodeOptions.find((option) => option.value === currentEsiCode)}
          onChange={handleChange(setCurrentEsiCode, 'esiCode')}
        />
      </div> 
    </div>
  );
};

export default ESITrackerFilter;