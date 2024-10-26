import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { Button } from '@/components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
// import DashboardFilter from './DashboardFilter';
// import CustomDateRangePicker from './CustomDateRangePicker';

const dummyData = {
  companyGroups: [
    { value: 'cg1', label: 'Company Group 1' },
    { value: 'cg2', label: 'Company Group 2' },
  ],
  companies: [
    { value: 'c1', label: 'CEAT' },
    { value: 'c2', label: 'MRF' },
  ],
  states: [
    { value: 's1', label: 'Maharashtra' },
    { value: 's2', label: 'West Bengal' },
  ],
  cities: [
    { value: 'city1', label: 'Mumbai' },
    { value: 'city2', label: 'Kolkata' },
  ],
  branches: [
    { value: 'b1', label: 'Branch 1' },
    { value: 'b2', label: 'Branch 2' },
  ],
  registerStatus: [
    { value: 'march 2024', label: 'March 2024' },
    { value: 'april 2024', label: 'April 2024' },
    { value: 'may 2024', label: 'May 2024' },
    { value: 'june 2024', label: 'June 2024' },
    { value: 'july 2024', label: 'July 2024' },
    { value: 'august 2024', label: 'August 2024' },
    { value: 'september 2024', label: 'September 2024' },
    { value: 'october 2024', label: 'October 2024' },
    { value: 'november 2024', label: 'November 2024' },
    { value: 'december 2024', label: 'December 2024' },
    { value: 'january 2025', label: 'January 2025' },
    { value: 'february 2025', label: 'February 2025' },
  ],
  types: [
    { value: 'Uploaded', label: 'Uploaded' },
    { value: 'Not Uploaded', label: 'Not Uploaded' }
  ]
};

const MaternityFilter = () => {
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState(dummyData.companyGroups[0]);
  const [selectedCompany, setSelectedCompany] = useState(dummyData.companies[0]);
  const [selectedState, setSelectedState] = useState(dummyData.states[0]);
  const [selectedCity, setSelectedCity] = useState(dummyData.cities[0]);
  const [selectedBranch, setSelectedBranch] = useState(dummyData.branches[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(dummyData.types[0]);
  const [selectedRegisterStatus, setSelectedRegisterStatus] = useState(dummyData.registerStatus[0]);

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-center gap-3 auto-cols-fr">
      <div>
        <OutlinedSelect
          label="Company"
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={dummyData.companies}
        />
      </div>

      <div>
        <OutlinedSelect
          label="State"
          value={selectedState}
          onChange={setSelectedState}
          options={dummyData.states}
        />
      </div>


      <div>
        <OutlinedSelect
          label="Location"
          value={selectedCity}
          onChange={setSelectedCity}
          options={dummyData.cities}
        />
      </div>

      <div>
        <OutlinedSelect
          label="Branch"
          value={selectedBranch}
          onChange={setSelectedBranch}
          options={dummyData.branches}
        />
      </div>

      <div>
        <OutlinedSelect
          label="Month"
          value={selectedRegisterStatus}
          onChange={setSelectedRegisterStatus}
          options={dummyData.registerStatus}
        />
      </div>

      <div className="flex justify-start">
        <Button
          size="sm"
          className="h-[38px] whitespace-nowrap"
          icon={<HiOutlineFilter />}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default MaternityFilter;