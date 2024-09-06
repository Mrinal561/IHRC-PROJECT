
import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui';
import DashboardFilter from './DashboardFilter';
import CustomDateRangePicker from './CustomDateRangePicker';





const dummyData = {
  companyGroups: [
    { value: 'cg1', label: 'Company Group 1' },
    { value: 'cg2', label: 'Company Group 2' },
  ],
  companies: {
    cg1: [
      { value: 'c1', label: 'CEAT' },
      { value: 'c2', label: 'MRF' },
    ],
    cg2: [
      { value: 'c3', label: 'Axis Bank' },
      { value: 'c4', label: 'SBI' },
    ],
  },
  states: {
    c1: [
      { value: 's1', label: 'Bihar' },
      { value: 's2', label: 'West Bengal' },
    ],
    c2: [
      { value: 's3', label: 'Jharkhand' },
      { value: 's4', label: 'UP' },
    ],
  },
  cities: {
    s1: [
      { value: 'city1', label: 'Muzaffarpur', branches: ['Branch 1', 'Branch 2'] },
      { value: 'city2', label: 'Patna', branches: ['Branch 3', 'Branch 4'] },
    ],
    s2: [
      { value: 'city3', label: 'Howrah', branches: ['Branch 5', 'Branch 6'] },
      { value: 'city4', label: 'Durgapur', branches: ['Branch 7', 'Branch 8'] },
    ],
  },
};

const CustomOption = ({ innerProps, label, data, selectProps }) => {
  const handleClick = () => {
    if (data.isCity) {
      selectProps.onCityClick(data.value);
    } else {
      selectProps.onBranchSelect(data.city, data.branch);
    }
  };


  const CustomControl = ({ children, ...props }) => {
    return (
      <div {...props} className="flex items-center truncate">
        {children}
      </div>
    );
  };

  return (
    <div
      {...innerProps}
      onClick={handleClick}
      className={`p-2 cursor-pointer ${data.isCity ? '' : 'pl-4 bg-gray-50'} hover:bg-gray-100`}
    >
      {label}
    </div>
  );
};
const customStyles = {
    control: (provided: any) => ({
        ...provided,
        minHeight: '36px',
        height: '36px',
        borderRadius: '0.375rem',
        border: '1px solid #e2e8f0',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #718096',
        },
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        height: '36px',
        padding: '0 6px',
    }),
    input: (provided: any) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        height: '36px',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        maxWidth: 'calc(100% - 8px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    menu: (provided: any) => ({
        ...provided,
        width: 'auto',
        minWidth: '100%',
    }),
    menuList: (provided: any) => ({
        ...provided,
        width: '100%',
        minWidth: '100%',
    }),
    option: (provided: any) => ({
        ...provided,
        whiteSpace: 'nowrap',
    }),
}

const Company = () => {
  const [companyGroups, setCompanyGroups] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [openCityDropdown, setOpenCityDropdown] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  useEffect(() => {
    setCompanyGroups(dummyData.companyGroups);
  }, []);

  useEffect(() => {
    if (selectedCompanyGroup) {
      setCompanies(dummyData.companies[selectedCompanyGroup.value] || []);
    }
  }, [selectedCompanyGroup]);

  useEffect(() => {
    if (selectedCompany) {
      setStates(dummyData.states[selectedCompany.value] || []);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedState) {
      setCities(dummyData.cities[selectedState.value] || []);
    }
  }, [selectedState]);

  const handleCompanyGroupChange = (option) => {
    setSelectedCompanyGroup(option);
    setSelectedCompany(null);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedBranch('');
    setOpenCityDropdown(null);
  };

  const handleCompanyChange = (option) => {
    setSelectedCompany(option);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedBranch('');
    setOpenCityDropdown(null);
  };

  const handleStateChange = (option) => {
    setSelectedState(option);
    setSelectedCity(null);
    setSelectedBranch('');
    setOpenCityDropdown(null);
  };

  const handleCityClick = (cityValue) => {
    setOpenCityDropdown(openCityDropdown === cityValue ? null : cityValue);
  };

  const handleBranchSelect = (city, branch) => {
    setSelectedCity(city);
    setSelectedBranch(branch);
    setOpenCityDropdown(null);
  };

  const cityBranchOptions = cities.flatMap(city => [
    { value: city.value, label: city.label, isCity: true },
    ...(openCityDropdown === city.value
      ? city.branches.map(branch => ({
          value: `${city.value}-${branch}`,
          label: branch,
          isCity: false,
          city: city,
          branch: branch
        }))
      : [])
  ]);

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '2.5rem', // Adjust this value to match your desired height
    }),
    valueContainer: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
  };

  
  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
};
  return (
    <div className="flex gap-3">
      <Select
        value={selectedCompanyGroup}
        onChange={handleCompanyGroupChange}
        options={companyGroups}
        placeholder="Company Group"
        styles={customStyles}
        className="w-[168px]"
      />

      <Select
        value={selectedCompany}
        onChange={handleCompanyChange}
        options={companies}
        placeholder="Company"
        className="w-[120px]"
        styles={customStyles}
        isDisabled={!selectedCompanyGroup}
      />

      <Select
        value={selectedState}
        onChange={handleStateChange}
        options={states}
        placeholder="State"
        className="w-[100px]"
        styles={customStyles}
        isDisabled={!selectedCompany}
      />

      <Select
        value={selectedBranch ? { value: `${selectedCity.value}-${selectedBranch}`, label: `${selectedCity.label} - ${selectedBranch}` } : null}
        onChange={() => {}}
        options={cityBranchOptions}
        placeholder="Branch"
        className="w-[120px]"
        styles={customStyles}
        isDisabled={!selectedState}
        components={{ Option: CustomOption }}
        onCityClick={handleCityClick}
        onBranchSelect={handleBranchSelect}
        isSearchable={false}
      />
      <CustomDateRangePicker onApply={handleDateRangeApply} />
      <DashboardFilter />
    </div>
  );
};

export default Company;