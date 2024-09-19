import React, { useState, useMemo } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// Define the structure of your PFTrackerData (based on your dummy data)
interface PFTrackerData {
  companyName: string;
  pfCode: string;
  location: string;
  month: string;
  noOfEmployees: number;
  wages: string;
  epsWage: string;
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

interface PFTrackerFilterProps {
  data: PFTrackerData[];
  onFilterChange: (filters: { groupName: string; companyName: string; pfCode: string }) => void;
}

const PFTrackerFilter: React.FC<PFTrackerFilterProps> = ({ data, onFilterChange }) => {
  const groupOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
  const nameOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
  const pfCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'pfCode')), [data]);

  const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value || '');
  const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value || '');
  const [currentPfCode, setCurrentPfCode] = useState<string>(pfCodeOptions[0]?.value || '');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) => 
    (selectedOption: Option | null) => {
      if (selectedOption) {
        setter(selectedOption.value);
        onFilterChange({
          groupName: filterType === 'groupName' ? selectedOption.value : currentGroup,
          companyName: filterType === 'companyName' ? selectedOption.value : groupName,
          pfCode: filterType === 'pfCode' ? selectedOption.value : currentPfCode,
        });
      }
    };

  return ( 
    <div className="flex gap-3">  
     
      <div className='w-40'>
        <OutlinedSelect
          label="Group Name"
          options={groupOptions}
          value={groupOptions.find((option) => option.value === currentGroup)}
          onChange={handleChange(setCurrentGroup, 'groupName')}
        />
      </div>
      <div className='w-40'>
        <OutlinedSelect
          label="Company Name"
          options={nameOptions}
          value={nameOptions.find((option) => option.value === groupName)}
          onChange={handleChange(setGroupName, 'companyName')}
        />
      </div>
      <div className='w-40 z-20'>
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

export default PFTrackerFilter;