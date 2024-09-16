import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

type Option = {
  value: string;
  label: string;
};

const getUniqueDistricts = (data: EntityData[]): string[] => {
  const branch = data.map(item => item.Branch);
  return Array.from(new Set(branch)).filter((branch): branch is string => branch !== undefined);
};

const options: Option[] = getUniqueDistricts(entityDataSet).map(branch => ({
  value: branch,
  label: branch,
}));

const Filter: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string>(options[0]?.value || '');

  const handleFilterChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      setCurrentFilter(selectedOption.value);
      // You can add any additional logic here that needs to happen when the filter changes
    }
  };

  return (
    <div className="w-44">
      <OutlinedSelect
        label="Filter by Branch"
        options={options}
        value={options.find((option) => option.value === currentFilter) || options[0]}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;