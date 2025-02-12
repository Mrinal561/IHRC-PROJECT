
// import React, { useState, useEffect } from 'react';
// import { Select } from '../Select';

// const OutlinedSelect = ({ label, options, value, onChange, isMulti = false, isDisabled = false }) => {
//   const [selectedValue, setSelectedValue] = useState(value);

//   useEffect(() => {
//     setSelectedValue(value || (isMulti ? [] : ''));
//   }, [value, isMulti]);

//   const handleChange = (newValue) => {
//     if (isMulti) {
//       // For multi-select, check if the selected option is already in the array
//       if (selectedValue.some(option => option.value === newValue.value)) {
//         // If it is, remove it from the array
//         const updatedValue = selectedValue.filter(option => option.value !== newValue.value);
//         setSelectedValue(updatedValue);
//         onChange(updatedValue);
//       } else {
//         // If it's not, add it to the array
//         setSelectedValue([...selectedValue, newValue]);
//         onChange([...selectedValue, newValue]);
//       }
//     } else {
//       // For single-select, check if the selected option is already selected
//       if (selectedValue === newValue) {
//         // If it is, unselect it
//         setSelectedValue('');
//         onChange('');
//       } else {
//         // If it's not, select it
//         setSelectedValue(newValue);
//         onChange(newValue);
//       }
//     }
//   };

//   // Check if the label should float
//   const isFloating = !isDisabled && (selectedValue !== null && selectedValue !== undefined && (isMulti ? selectedValue.length > 0 : selectedValue !== ''));

//   return (
//     <div className="relative">
//       <div className="absolute top-0 left-0 w-full h-full border rounded-md pointer-events-none border-gray-300">
//         <span
//           className={`absolute px-1 transition-all duration-200 ${
//             isFloating
//               ? '-top-3 left-3 text-xs font-semibold bg-white text-indigo-600'
//               : 'top-2 left-2 text-sm text-gray-500'
//           }`}
//         >
//           {label}
//         </span>
//       </div>
//       <Select
//         isDisabled={isDisabled}
//         isMulti={isMulti}
//         value={selectedValue}
//         onChange={handleChange}
//         options={options}
//         className="w-full border-none bg-ql-transparent"
//         size='sm'
//         styles={{
//           control: (provided) => ({
//             ...provided,
//             minHeight: '36px',
//             backgroundColor: 'transparent',
//             border: 'none',
//             boxShadow: 'none',
//             '&:hover': {
//               border: 'none',
//             },
//           }),
//           placeholder: (provided) => ({
//             ...provided,
//             color: 'transparent',
//           }),
//           singleValue: (provided) => ({
//             ...provided,
//             color: '#000',
//             marginTop: isFloating ? '8px' : '0',
//           }),
//           multiValue: (provided) => ({
//             ...provided,
//             marginTop: isFloating ? '8px' : '0',
//           }),
//           input: (provided) => ({
//             ...provided,
//             marginTop: isFloating ? '8px' : '0',
//           }),
//         }}
//         placeholder=""
//       />
//     </div>
//   );
// };

// export default OutlinedSelect;

import React, { useState, useEffect } from 'react';
import { Select } from '../Select';

const OutlinedSelect = ({ label, options, value, onChange, isMulti = false, isDisabled = false }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [hasInput, setHasInput] = useState(false);

  useEffect(() => {
    setSelectedValue(value || (isMulti ? [] : ''));
  }, [value, isMulti]);

  const handleChange = (newValue) => {
    if (isMulti) {
      if (selectedValue.some(option => option.value === newValue.value)) {
        const updatedValue = selectedValue.filter(option => option.value !== newValue.value);
        setSelectedValue(updatedValue);
        onChange(updatedValue);
      } else {
        setSelectedValue([...selectedValue, newValue]);
        onChange([...selectedValue, newValue]);
      }
    } else {
      if (selectedValue === newValue) {
        setSelectedValue('');
        onChange('');
      } else {
        setSelectedValue(newValue);
        onChange(newValue);
      }
    }
  };

  // Check if the label should float based on selection or input
  const isFloating = !isDisabled && (
    hasInput || 
    (selectedValue !== null && 
    selectedValue !== undefined && 
    (isMulti ? selectedValue.length > 0 : selectedValue !== ''))
  );

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full border rounded-md pointer-events-none border-gray-300">
        <span
          className={`absolute px-1 transition-all duration-200 ${
            isFloating
              ? '-top-3 left-3 text-xs font-semibold bg-white text-indigo-600'
              : 'top-2 left-2 text-sm text-gray-500'
          }`}
        >
          {label}
        </span>
      </div>
      <Select
        isDisabled={isDisabled}
        isMulti={isMulti}
        value={selectedValue}
        onChange={handleChange}
        options={options}
        className="w-full border-none bg-ql-transparent"
        size="sm"
        onInputChange={(inputValue) => {
          setHasInput(inputValue.length > 0);
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '36px',
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
              border: 'none',
            },
          }),
          placeholder: (provided) => ({
            ...provided,
            color: 'transparent',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#000',
            marginTop: isFloating ? '8px' : '0',
          }),
          multiValue: (provided) => ({
            ...provided,
            marginTop: isFloating ? '8px' : '0',
          }),
          input: (provided) => ({
            ...provided,
            marginTop: isFloating ? '8px' : '0',
            color: '#000',
          }),
        }}
        placeholder=""
      />
    </div>
  );
};

export default OutlinedSelect;