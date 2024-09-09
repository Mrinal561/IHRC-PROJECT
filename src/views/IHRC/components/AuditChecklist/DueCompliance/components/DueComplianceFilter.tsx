// import React from 'react';
// import { components, ControlProps, OptionProps } from 'react-select';
// import { Badge, Select } from '@/components/ui';
// import { HiCheck } from 'react-icons/hi';

// interface DueComplianceFilterProps {
//   onFilterChange: (filter: string) => void;
//   currentFilter: string;
// }

// type Option = {
//   value: string;
//   label: string;
//   color: string;
// };

// const options: Option[] = [
//   { value: 'Due', label: 'Due', color: 'bg-red-500' },
//   { value: 'Upcoming', label: 'Upcoming', color: 'bg-yellow-500' },
// ];

// const CustomSelectOption = ({
//   innerProps,
//   label,
//   data,
//   isSelected,
// }: OptionProps<Option>) => {
//   return (
//     <div
//       className={`flex items-center justify-between p-2 cursor-pointer  border-gray-300 relative ${
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
//       {isSelected && (
//         <HiCheck className="text-indigo-600 text-xl" />
//       )}
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

// const DueComplianceFilter: React.FC<DueComplianceFilterProps> = ({ onFilterChange, currentFilter }) => {
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
//       size="sm"
//       className="min-w-[140px]"
//       classNamePrefix="react-select"
//       components={{
//         Option: CustomSelectOption,
//         Control: CustomControl,
//       }}
//     />
//   );
// };

// export default DueComplianceFilter;


import React from 'react';
import { components, ControlProps, OptionProps } from 'react-select';
import { HiCheck } from 'react-icons/hi';
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

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: OptionProps<Option>) => {
  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${
        isSelected
          ? 'bg-gray-100 dark:bg-gray-500'
          : 'hover:bg-gray-50 dark:hover:bg-gray-600'
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <Badge innerClass={data.color} />
        <span>{label}</span>
      </div>
      {isSelected && (
        <div className="text-indigo-600 text-xl">
          <HiCheck />
        </div>
      )}
    </div>
  );
};

const CustomControl = ({
  children,
  ...props
}: ControlProps<Option, false>) => {
  const selected = props.getValue()[0] as Option;
  return (
    <components.Control {...props}>
      {selected && (
        <Badge
          className="ltr:ml-4 rtl:mr-4"
          innerClass={selected.color}
        />
      )}
      {children}
    </components.Control>
  );
};

const DueComplianceFilter: React.FC<DueComplianceFilterProps> = ({
  onFilterChange,
  currentFilter,
}) => {
  const handleFilterChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onFilterChange(selectedOption.value);
    }
  };

  return (
    <div className="w-44">
      <OutlinedSelect
        label="Filter"
        options={options}
        value={options.find((option) => option.value === currentFilter) || options[0]}
        onChange={handleFilterChange}
        components={{
          Option: CustomSelectOption,
        }}
      />
    </div>
  );
};

export default DueComplianceFilter;