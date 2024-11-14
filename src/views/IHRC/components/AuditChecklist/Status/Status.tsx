import React, { useEffect, useState } from 'react';
import StatusTable from './components/StatusTable';
import StatusCard from './components/StatusCard';
import Company from '../../Home/components/Company';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';


interface SelectOption {
  label: string;
  value: string;
}


const Status: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<SelectOption | null>(null);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null);
  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearAll = () => {
    setCurrentFilter('Pending');
    setSearchTerm('');
    // Clear all company filters
    setSelectedBranch(null);
    setSelectedCompanyGroup(null);
    setSelectedCompany(null);
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedLocation(null);
  };

  const filterValues = {
    branchId: selectedBranch?.value,
    companyGroupId: selectedCompanyGroup?.value,
    companyId: selectedCompany?.value,
    stateId: selectedState?.value,
    districtId: selectedDistrict?.value,
    locationId: selectedLocation?.value
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Status</h3>
                    <p className="text-gray-600">View your company's compliance status</p>
                </div>
      </div>
      <div className='mb-4'>
      <Company 
      onBranchChange={setSelectedBranch}
      onCompanyGroupChange={setSelectedCompanyGroup}
      onCompanyChange={setSelectedCompany}
      onStateChange={setSelectedState}
      onDistrictChange={setSelectedDistrict}
      onLocationChange={setSelectedLocation}/>
      </div>
      <div>
        <StatusCard />
      </div>
      <div>
        <StatusTable
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClearAll={handleClearAll}
          currentFilter={currentFilter}
          filterValues={filterValues}
        />
      </div>
    </div>
  );
};

export default Status;