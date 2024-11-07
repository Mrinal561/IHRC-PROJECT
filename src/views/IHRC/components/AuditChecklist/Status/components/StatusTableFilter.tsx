// import React from 'react';
// import { Badge } from '@/components/ui';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// interface StatusTableFilterProps {
//   onFilterChange: (filter: string) => void;
//   currentFilter: string;
// }

// type Option = {
//   value: string;
//   label: string;
//   color: string;
// };

// const options: Option[] = [
//   { value: 'Pending', label: 'Pending', color: 'bg-yellow-500' },
//   { value: 'Approved', label: 'Approved', color: 'bg-emerald-500' },
//   { value: 'Rejected', label: 'Rejected', color: 'bg-red-500' },
// ];


// const StatusTableFilter: React.FC<StatusTableFilterProps> = ({
//   onFilterChange,
//   currentFilter,
// }) => {
//   const handleFilterChange = (selectedOption: Option | null) => {
//     if (selectedOption) {
//       onFilterChange(selectedOption.value);
//     }
//   };

//    const optionsWithBadges = options.map(option => ({
//     ...option,
//     label: (
//       <div className="flex items-center gap-2">
//         <Badge innerClass={option.color} />
//         <span>{option.label}</span>
//       </div>
//     )
//   }));

//   return (
//     <div className="min-w-[140px]">
//       <OutlinedSelect
//         label="Status"
//         options={optionsWithBadges}
//         value={optionsWithBadges.find((option) => option.value === currentFilter) || optionsWithBadges[0]}
//         onChange={handleFilterChange}
//       />
//     </div>
//   );
// };

// export default StatusTableFilter;

import React from 'react';
import { Badge } from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

interface StatusTableFilterProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

type Option = {
  value: string;
  label: string;
  color: string;
};

const options: Option[] = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'approved', label: 'Approved', color: 'bg-emerald-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

const StatusTableFilter: React.FC<StatusTableFilterProps> = ({
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
    <div className="min-w-[140px]">
      <OutlinedSelect
        label="Status"
        options={optionsWithBadges}
        value={optionsWithBadges.find((option) => option.value === currentFilter) || optionsWithBadges[0]}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default StatusTableFilter;