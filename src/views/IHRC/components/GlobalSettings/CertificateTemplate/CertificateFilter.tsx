import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
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
};

const CertificateFilter = () => {
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  return (
    <div className="flex gap-3 items-center">
      <div className="w-48"> {/* 192px */}
        <OutlinedSelect
          label="Company Group"
          value={selectedCompanyGroup}
          onChange={setSelectedCompanyGroup}
          options={dummyData.companyGroups}
        />
      </div>

      <div className="w-44"> {/* 176px */}
        <OutlinedSelect
          label="Company"
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={dummyData.companies}
        />
      </div>


      {/* <CustomDateRangePicker onApply={handleDateRangeApply} /> */}
      {/* <DashboardFilter /> */}
    </div>
  );
};

export default CertificateFilter;