import React from 'react';
import { Badge } from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

interface DueComplianceFilterProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

type Option = {
  value: string;
  label: string;
  color: string;
};

const options: Option[] = [
  { value: 'Due', label: 'Due', color: 'bg-red-500' },
  { value: 'Upcoming', label: 'Upcoming', color: 'bg-yellow-500' },
];

const DueComplianceFilter: React.FC<DueComplianceFilterProps> = ({
  onFilterChange,
  currentFilter,
}) => {
  const handleFilterChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onFilterChange(selectedOption.value);
    }
  };

  const optionsWithBadges = options.map(option => ({
    ...option,
    label: (
      <div className="flex items-center gap-2">
        <Badge innerClass={option.color} />
        <span>{option.label}</span>
      </div>
    )
  }));

  return (
    <div className="w-44">
      <OutlinedSelect
        label="Filter"
        options={optionsWithBadges}
        value={optionsWithBadges.find((option) => option.value === currentFilter) || optionsWithBadges[0]}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default DueComplianceFilter;