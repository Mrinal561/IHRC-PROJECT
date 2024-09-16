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
        label="Filter by District"
        options={options}
        value={options.find((option) => option.value === currentFilter) || options[0]}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;