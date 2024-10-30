import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { Button } from '@/components/ui';
import { HiOutlineFilter } from 'react-icons/hi';

const dummyData = {
  companies: [
    { value: 'c1', label: 'CEAT' },
    { value: 'c2', label: 'MRF' },
  ],
  states: [
    { value: 's1', label: 'Maharashtra' },
    { value: 's2', label: 'West Bengal' },
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
  ]
};

const AttendanceFilter = () => {
  const [selectedCompany, setSelectedCompany] = useState(dummyData.companies[0]);
  const [selectedState, setSelectedState] = useState(dummyData.states[0]);
  const [selectedRegisterStatus, setSelectedRegisterStatus] = useState(dummyData.registerStatus[0]);

  return (
    <div className="w-full flex flex-nowrap items-center gap-4">
      <div className="w-48">
        <OutlinedSelect
          label="Company"
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={dummyData.companies}
        />
      </div>

      <div className="w-48">
        <OutlinedSelect
          label="State"
          value={selectedState}
          onChange={setSelectedState}
          options={dummyData.states}
        />
      </div>

      <div className="w-48">
        <OutlinedSelect
          label="Month"
          value={selectedRegisterStatus}
          onChange={setSelectedRegisterStatus}
          options={dummyData.registerStatus}
        />
      </div>

      <div>
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

export default AttendanceFilter;