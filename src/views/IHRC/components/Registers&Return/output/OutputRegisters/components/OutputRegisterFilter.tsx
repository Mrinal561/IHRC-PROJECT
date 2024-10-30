// import React, { useState } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import DashboardFilter from '@/views/IHRC/components/Home/components/DashboardFilter';

// const dummyData = {
//   companies: [
//     { value: 'c1', label: 'CEAT' },
//     { value: 'c2', label: 'MRF' },
//   ],
//   states: [
//     { value: 's1', label: 'Maharashtra' },
//     { value: 's2', label: 'West Bengal' },
//   ],
//   frequencies: [
//     { value: 'monthly', label: 'Monthly' },
//     { value: 'yearly', label: 'Yearly' },
//   ],
//   cities: [
//     { value: 'city1', label: 'Mumbai' },
//     { value: 'city2', label: 'Kolkata' },
//   ],
//   branches: [
//     { value: 'b1', label: 'Branch 1' },
//     { value: 'b2', label: 'Branch 2' },
//   ],
//   months: [
//     { value: 'march-2024', label: 'March 2024' },
//     { value: 'april-2024', label: 'April 2024' },
//     { value: 'may-2024', label: 'May 2024' },
//     { value: 'june-2024', label: 'June 2024' },
//     { value: 'july-2024', label: 'July 2024' },
//     { value: 'august-2024', label: 'August 2024' },
//     { value: 'september-2024', label: 'September 2024' },
//     { value: 'october-2024', label: 'October 2024' },
//     { value: 'november-2024', label: 'November 2024' },
//     { value: 'december-2024', label: 'December 2024' },
//     { value: 'january-2025', label: 'January 2025' },
//     { value: 'february-2025', label: 'February 2025' },
//   ],
// };

// type SelectOption = {
//   value: string;
//   label: string;
// };

// const OutputRegisterFilter = () => {
//   const [selectedCompany, setSelectedCompany] = useState<SelectOption>(dummyData.companies[0]);
//   const [selectedState, setSelectedState] = useState<SelectOption>(dummyData.states[0]);
//   const [selectedFrequency, setSelectedFrequency] = useState<SelectOption>(dummyData.frequencies[0]);
//   const [selectedCity, setSelectedCity] = useState<SelectOption>(dummyData.cities[0]);
//   const [selectedBranch, setSelectedBranch] = useState<SelectOption>(dummyData.branches[0]);
//   const [selectedMonth, setSelectedMonth] = useState<SelectOption | undefined>(dummyData.months[0]);

//   const handleFrequencyChange = (value: SelectOption) => {
//     setSelectedFrequency(value);
//     if (value.value === 'yearly') {
//       setSelectedMonth(undefined);
//     } else {
//       setSelectedMonth(dummyData.months[0]);
//     }
//   };

//   return (
//     <div className="w-full flex items-center gap-3">
//       {/* Company Filter */}
//       <div className="flex-1 min-w-[140px]">
//         <OutlinedSelect
//           label="Company"
//           value={selectedCompany}
//           onChange={setSelectedCompany}
//           options={dummyData.companies}
//         />
//       </div>

//       {/* State Filter */}
//       <div className="flex-1 min-w-[140px]">
//         <OutlinedSelect
//           label="State"
//           value={selectedState}
//           onChange={setSelectedState}
//           options={dummyData.states}
//         />
//       </div>

//       {/* Frequency Filter */}
//       <div className="flex-1 min-w-[140px]">
//         <OutlinedSelect
//           label="Frequency"
//           value={selectedFrequency}
//           onChange={handleFrequencyChange}
//           options={dummyData.frequencies}
//         />
//       </div>

//       {/* Location Filter */}
//       <div className="flex-1 min-w-[140px]">
//         <OutlinedSelect
//           label="Location"
//           value={selectedCity}
//           onChange={setSelectedCity}
//           options={dummyData.cities}
//         />
//       </div>

//       {/* Branch Filter */}
//       <div className="flex-1 min-w-[140px]">
//         <OutlinedSelect
//           label="Branch"
//           value={selectedBranch}
//           onChange={setSelectedBranch}
//           options={dummyData.branches}
//         />
//       </div>

//       {/* Month Filter - Only shown when frequency is monthly */}
//       {selectedFrequency.value === 'monthly' && (
//         <div className="flex-1 min-w-[140px]">
//           <OutlinedSelect
//             label="Month"
//             value={selectedMonth}
//             onChange={setSelectedMonth}
//             options={dummyData.months}
//           />
//         </div>
//       )}

//       {/* Filter Button */}
//       <div className="flex-none">
//         <DashboardFilter />
//       </div>
//     </div>
//   );
// };

// export default OutputRegisterFilter;





import React, { useEffect, useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect';
import { Badge } from '@/components/ui';
import DashboardFilter from '@/views/IHRC/components/Home/components/DashboardFilter';

const dummyData = {
  companies: [
    { value: 'c1', label: 'CEAT' },
    // { value: 'c2', label: 'MRF' },
  ],
  states: [
    { value: 's1', label: 'Maharashtra' },
    // { value: 's2', label: 'West Bengal' },
  ],
  district: [
    { value: 's1', label: 'Pune' },
    // { value: 's2', label: 'West Bengal' },
  ],
  cities: [
    { value: 'city1', label: 'Shivajinagar' },
    // { value: 'city2', label: 'Kolkata' },
  ],
  branches: [
    { value: 'b1', label: 'Shivajinagar Branch' },
    // { value: 'b2', label: 'Branch 2' },
  ],
  frequencies: [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ],
  months: [
    { value: 'march-2024', label: 'March 2024' },
    { value: 'april-2024', label: 'April 2024' },
    { value: 'may-2024', label: 'May 2024' },
    { value: 'june-2024', label: 'June 2024' },
    { value: 'july-2024', label: 'July 2024' },
    { value: 'august-2024', label: 'August 2024' },
    { value: 'september-2024', label: 'September 2024' },
    { value: 'october-2024', label: 'October 2024' },
    { value: 'november-2024', label: 'November 2024' },
    { value: 'december-2024', label: 'December 2024' },
    { value: 'january-2025', label: 'January 2025' },
    { value: 'february-2025', label: 'February 2025' },
  ],
  years: [
    { value: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, label: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}` },
    { value: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`, label: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}` },
    { value: `${new Date().getFullYear() - 2}-${new Date().getFullYear() - 1}`, label: `${new Date().getFullYear() - 2}-${new Date().getFullYear() - 1}` },
    { value: `${new Date().getFullYear() - 3}-${new Date().getFullYear() - 2}`, label: `${new Date().getFullYear() - 3}-${new Date().getFullYear() - 2}` },
    { value: `${new Date().getFullYear() - 4}-${new Date().getFullYear() - 3}`, label: `${new Date().getFullYear() - 4}-${new Date().getFullYear() - 3}` },
  ],
};

type SelectOption = {
  value: string;
  label: string;
};

const OutputRegisterFilter = () => {
  const [selectedCompany, setSelectedCompany] = useState<SelectOption>(dummyData.companies[0]);
  const [selectedState, setSelectedState] = useState<SelectOption>(dummyData.states[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption>(dummyData.district[0]);
  const [selectedFrequency, setSelectedFrequency] = useState<SelectOption>(dummyData.frequencies[0]);
  const [selectedCity, setSelectedCity] = useState<SelectOption>(dummyData.cities[0]);
  const [selectedBranch, setSelectedBranch] = useState<SelectOption>(dummyData.branches[0]);
  const [selectedMonth, setSelectedMonth] = useState<SelectOption | undefined>(dummyData.months[0]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState<SelectOption | null>(null);

  useEffect(() => {
    setSelectedFinancialYear(dummyData.years[0])
  }, [])

  const handleFrequencyChange = (value: SelectOption) => {
    setSelectedFrequency(value);
    if (value.value === 'yearly') {
      setSelectedMonth(undefined);
      setSelectedFinancialYear(dummyData.years[0]);
    } else {
      setSelectedMonth(dummyData.months[0]);
      setSelectedFinancialYear(null);
    }
  };

  const handleFinancialYearChange = (value: SelectOption | null) => {
    setSelectedFinancialYear(value);
    // You can add any additional logic here, such as fetching data for the selected year
  };

  return (
    <div className="w-full flex flex-wrap items-center gap-3">
      {/* Company Filter */}
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Company"
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={dummyData.companies}
        />
      </div>

      {/* State Filter */}
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="State"
          value={selectedState}
          onChange={setSelectedState}
          options={dummyData.states}
        />
      </div>


      {/* District Filter */}
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="District"
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          options={dummyData.district}
        />
      </div>

     

      {/* Location Filter */}
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Location"
          value={selectedCity}
          onChange={setSelectedCity}
          options={dummyData.cities}
        />
      </div>

      {/* Branch Filter */}
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Branch"
          value={selectedBranch}
          onChange={setSelectedBranch}
          options={dummyData.branches}
        />
      </div>

       {/* Frequency Filter */}
       <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Frequency"
          value={selectedFrequency}
          onChange={handleFrequencyChange}
          options={dummyData.frequencies}
        />
      </div>

      {/* Month Filter - Only shown when frequency is monthly */}
      {selectedFrequency.value === 'monthly' && (
        <div className="flex-1 min-w-[140px]">
          <OutlinedSelect
            label="Month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            options={dummyData.months}
          />
        </div>
      )}

      {/* Financial Year Filter - Only shown when frequency is yearly */}
      {selectedFrequency.value === 'yearly' && (
        <div className="flex-1 min-w-[140px]">
          <FinancialYearFilter value={selectedFinancialYear} onChange={handleFinancialYearChange} />
        </div>
      )}

      {/* Filter Button */}
      <div className="flex-none">
        <DashboardFilter />
      </div>
    </div>
  );
};

interface FinancialYearFilterProps {
  value: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
}

const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ value, onChange }) => {
  const handleChange = (selectedOption: SelectOption | null) => {
    onChange(selectedOption);
  };

  return (
    <OutlinedBadgeSelect
      label="Financial Year"
      value={value}
      options={dummyData.years}
      onChange={handleChange}
      optionRenderer={(option, isSelected) => (
        <div className="flex items-center justify-between w-full">
          <span>{option.label}</span>
          {isSelected && <Badge className="w-2 h-2 rounded-full bg-emerald-500" />}
        </div>
      )}
    />
  );
};

export default OutputRegisterFilter;