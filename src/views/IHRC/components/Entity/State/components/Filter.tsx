import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

type Option = {
  value: string;
  label: string;
};

const getUniqueDistricts = (data: EntityData[]): string[] => {
  const state = data.map(item => item.State);
  return Array.from(new Set(state)).filter((state): state is string => state !== undefined);
};

const options: Option[] = getUniqueDistricts(entityDataSet).map(state => ({
  value: state,
  label: state,
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
        label="Filter by State"
        options={options}
        value={options.find((option) => option.value === currentFilter) || options[0]}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;