// import React from 'react';
// import { components, ControlProps, OptionProps } from 'react-select';
// import {Badge,Select} from '@/components/ui';
// import { HiCheck } from 'react-icons/hi';

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

// const CustomSelectOption = ({
//   innerProps,
//   label,
//   data,
//   isSelected,
// }: OptionProps<Option>) => {
//   return (
//     <div
//       className={`flex items-center justify-between p-2 cursor-pointer ${
//         isSelected
//           ? 'bg-gray-100 dark:bg-gray-500'
//           : 'hover:bg-gray-50 dark:hover:bg-gray-600'
//       }`}
//       {...innerProps}
//     >
//       <div className="flex items-center gap-2">
//         <Badge innerClass={data.color} />
//         <span>{label}</span>
//       </div>
//       {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
//     </div>
//   );
// };

// const CustomControl = ({ children, ...props }: ControlProps<Option, false>) => {
//   const selected = props.getValue()[0] as Option;
//   return (
//     <components.Control {...props}>
//       {selected && (
//         <Badge
//           className="ltr:ml-4 rtl:mr-4"
//           innerClass={selected.color}
//         />
//       )}
//       {children}
//     </components.Control>
//   );
// };

// const StatusTableFilter: React.FC<StatusTableFilterProps> = ({ onFilterChange, currentFilter }) => {
//   const handleFilterChange = (selectedOption: Option | null) => {
//     if (selectedOption) {
//       onFilterChange(selectedOption.value);
//     }
//   };

//   return (
//     <Select<Option>
//       options={options}
//       value={options.find(option => option.value === currentFilter) || options[0]}
//       onChange={handleFilterChange}
//       size = "sm"
//       className="min-w-[140px]"
//       classNamePrefix="react-select"
//       components={{
//         Option: CustomSelectOption,
//         Control: CustomControl,
//       }}
//     />
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
  { value: 'Pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'Approved', label: 'Approved', color: 'bg-emerald-500' },
  { value: 'Rejected', label: 'Rejected', color: 'bg-red-500' },
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

   // Create new options with badges in the labels
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