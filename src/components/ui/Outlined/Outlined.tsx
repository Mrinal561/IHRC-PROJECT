import React, { useState } from 'react';
import { Select } from '@/components/ui/select';

const OutlinedSelect = ({ label, options, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const isFloating = isFocused || value;

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
        value={value}
        onChange={onChange}
        options={options}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full border-none bg-transparent"
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
          }),
        }}
      />
    </div>
  );
};

export default OutlinedSelect;