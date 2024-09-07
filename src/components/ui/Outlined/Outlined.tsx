import React, { useState, useEffect } from 'react';
import { Select } from '../Select';

const OutlinedSelect = ({ label, options, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (newValue) => {
    setSelectedValue(newValue || '');
    onChange(newValue);
  };

  const isFloating = isFocused || (selectedValue !== null && selectedValue !== undefined && selectedValue !== '');
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
        value={selectedValue}
        onChange={handleChange}
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
            marginTop: isFloating ? '8px' : '0',
          }),
          input: (provided) => ({
            ...provided,
            marginTop: isFloating ? '8px' : '0',
          }),
        }}
        placeholder=""
      />
    </div>
  );
};

export default OutlinedSelect;