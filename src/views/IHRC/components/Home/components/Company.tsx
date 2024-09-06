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
  control: (provided) => ({
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
  valueContainer: (provided) => ({
    ...provided,
    height: '36px',
    padding: '0 6px',
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '36px',
  }),
  singleValue: (provided) => ({
    ...provided,
    maxWidth: 'calc(100% - 8px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  menu: (provided) => ({
    ...provided,
    width: 'auto',
    minWidth: '100%',
  }),
  menuList: (provided) => ({
    ...provided,
    width: '100%',
    minWidth: '100%',
  }),
  option: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
  }),
};

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setCompanyGroups(dummyData.companyGroups);
    // Set the first company group by default
    if (dummyData.companyGroups.length > 0) {
      setSelectedCompanyGroup(dummyData.companyGroups[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedCompanyGroup) {
      const companies = dummyData.companies[selectedCompanyGroup.value] || [];
      setCompanies(companies);
      // Set the first company by default
      if (companies.length > 0) {
        setSelectedCompany(companies[0]);
      }
    }
  }, [selectedCompanyGroup]);

  useEffect(() => {
    if (selectedCompany) {
      const states = dummyData.states[selectedCompany.value] || [];
      setStates(states);
      // Set the first state by default
      if (states.length > 0) {
        setSelectedState(states[0]);
      }
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedState) {
      const cities = dummyData.cities[selectedState.value] || [];
      setCities(cities);
      // Automatically set the first city if present
      if (cities.length > 0) {
        setSelectedCity(cities[0]);
      }
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
