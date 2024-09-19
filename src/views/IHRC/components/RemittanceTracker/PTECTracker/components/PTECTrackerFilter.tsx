import React, { useState, useMemo } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// Define the structure of your PTTrackerData (based on your dummy data)
interface PTTrackerData {
  companyName: string;
  ptCode: string;
  location: string;
  month: string;
  noOfEmployees: number;
  wages: string;
  totalChallanAmount: number;
  dueDate: string;
  dateOfPayment: string;
  delay: string;
  delayReason: string;
  typeOfChallan: string;
  trrnNo: string;
  crnNo: string;
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

interface PTTrackerFilterProps {
  data: PTTrackerData[];
  onFilterChange: (filters: { groupName: string; companyName: string; ptCode: string }) => void;
}

const PTECTrackerFilter: React.FC<PTTrackerFilterProps> = ({ data, onFilterChange }) => {
  const groupOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
  const nameOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
  const ptCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'ptRC')), [data]);

  const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value || '');
  const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value || '');
  const [currentPtCode, setCurrentPtCode] = useState<string>(ptCodeOptions[0]?.value || '');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) => 
    (selectedOption: Option | null) => {
      if (selectedOption) {
        setter(selectedOption.value);
        onFilterChange({
          groupName: filterType === 'groupName' ? selectedOption.value : currentGroup,
          companyName: filterType === 'companyName' ? selectedOption.value : groupName,
          ptCode: filterType === 'ptCode' ? selectedOption.value : currentPtCode,
        });
      }
    };

  return ( 
    <div className="flex gap-3">  
      <div className='w-52'>
        <OutlinedSelect
          label="Group Name"
          options={groupOptions}
          value={groupOptions.find((option) => option.value === currentGroup)}
          onChange={handleChange(setCurrentGroup, 'groupName')}
        />
      </div>
      <div className='w-52'>
        <OutlinedSelect
          label="Company Name"
          options={nameOptions}
          value={nameOptions.find((option) => option.value === groupName)}
          onChange={handleChange(setGroupName, 'companyName')}
        />
      </div>
      <div className='w-52 z-20'>
        <OutlinedSelect
          label="PT Code"
          options={ptCodeOptions}
          value={ptCodeOptions.find((option) => option.value === currentPtCode)}
          onChange={handleChange(setCurrentPtCode, 'ptCode')}
        />
      </div> 
    </div>
  );
};

export default PTECTrackerFilter;