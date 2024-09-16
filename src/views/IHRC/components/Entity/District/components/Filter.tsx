import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

type Option = {
  value: string;
  label: string;
};

const getUniqueDistricts = (data: EntityData[]): string[] => {
  const districts = data.map(item => item.District);
  return Array.from(new Set(districts)).filter((district): district is string => district !== undefined);
};

const options: Option[] = getUniqueDistricts(entityDataSet).map(district => ({
  value: district,
  label: district,
}));
const getUniqueGroup = (data: EntityData[]): string[] => {
  const companyGroupName = data.map(item => item.Company_Group_Name);
  return Array.from(new Set(companyGroupName)).filter((companyGroupName): companyGroupName is string => companyGroupName !== undefined);
};

const groupOptions: Option[] = getUniqueGroup(entityDataSet).map(companyGroupName => ({
  value: companyGroupName,
  label: companyGroupName,
}));

const getUniqueName = (data: EntityData[]): string[] => {
  const companyName = data.map(item => item.Company_Name);
  return Array.from(new Set(companyName)).filter((companyName): companyName is string => companyName !== undefined);
};

const nameOptions: Option[] = getUniqueName(entityDataSet).map(companyName => ({
  value: companyName,
  label: companyName,
}));
const Filter: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string>(options[0]?.value || '');
  const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value||'');
  const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value||'');

  const handleFilterChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      setCurrentFilter(selectedOption.value);
      // You can add any additional logic here that needs to happen when the filter changes
    }
  };
  const handleGroupChange = (selectedOption: Option | null) => {
    if (selectedOption) {
        setCurrentGroup(selectedOption.value)
      
      // You can add any additional logic here that needs to happen when the filter changes
    }
  };
  const handleNameChange = (selectedOption: Option | null) => {
    if (selectedOption) {
        setGroupName(selectedOption.value)
      
      // You can add any additional logic here that needs to happen when the filter changes
    }
  };
  return (
    <div className=" flex gap-3">    
        <div>
        <OutlinedSelect
        label="Group Name"
        options={groupOptions}
        value={groupOptions.find((option) => option.value === currentGroup)}
        onChange={handleGroupChange}
      />
        </div>
        <div>
        <OutlinedSelect
        label="Company Name"
        options={nameOptions}
        value={nameOptions.find((option) => option.value === groupName)}
        onChange={handleNameChange}
      />
        </div>
    </div>
  );
};

export default Filter;