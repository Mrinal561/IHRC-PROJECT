
import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import BranchTool from './components/BranchTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import BranchTable from './components/BranchTable';
import AddBranchForm from './components/BranchForm';
import { fetchBranches } from '@/store/slices/branch/branchSlice';
import { useAppDispatch } from '@/store';
import { BranchData } from '@/@types/branch';
import { toast, Notification } from '@/components/ui';
import Company from '../../Home/components/Company';

interface SelectOption {
  label: string;
  value: string;
}

const Branch = () => {
  const [selectedBranch, setSelectedBranch] = useState<SelectOption | null>(null);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null);

  const filterValues = {
    branchId: selectedBranch?.value,
    companyGroupId: selectedCompanyGroup?.value,
    companyId: selectedCompany?.value,
    stateId: selectedState?.value,
    districtId: selectedDistrict?.value,
    locationId: selectedLocation?.value
  };

  return (
          <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col justify-between gap-8 mb-10">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-2xl font-bold">Branch Manager</h3>
              </div>
              <div>
              {/* <BranchTool /> */}
              <Company
              onBranchChange={setSelectedBranch}
              onCompanyGroupChange={setSelectedCompanyGroup}
              onCompanyChange={setSelectedCompany}
              onStateChange={setSelectedState}
              onDistrictChange={setSelectedDistrict}
              onLocationChange={setSelectedLocation}
              />
              </div>
            </div>
            <BranchTable  filterValues={filterValues}/>
          </AdaptableCard>
  );
};

export default Branch;