import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import DashboardFilter from './DashboardFilter';
import CustomDateRangePicker from './CustomDateRangePicker';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

interface SelectOption {
  value: string;
  label: string;
}

interface BranchOption {
  label: string;
  value: string;
}

interface CompanyProps {
  onBranchChange?: (branch: BranchOption | null) => void;
}

const Company: React.FC<CompanyProps> = ({ onBranchChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
  
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [companies, setCompanies] = useState<SelectOption[]>([]);
  const [states, setStates] = useState<SelectOption[]>([]);
  const [districts, setDistricts] = useState<SelectOption[]>([]);
  const [location, setLocation] = useState<SelectOption[]>([]);
  const [branches, setBranches] = useState<BranchOption[]>([]);
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);

  const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {message}
      </Notification>
    );
  };

  // Load Company Groups
  const loadCompanyGroups = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true },
      });
      setCompanyGroups(
        data.data.map((v: any) => ({
          label: v.name,
          value: String(v.id),
        }))
      );
      console.log(data.data);
      
    } catch (error) {
      console.error('Failed to load company groups:', error);
      showNotification('danger', 'Failed to load company groups');
    }
  };

  // Load Companies based on selected Company Group
  const loadCompanies = async (groupId: string) => {
    try {
      const groupIdParam = [groupId];
      const { data } = await httpClient.get(endpoints.company.getAll(), {
        params: {
          'group_id[]': groupIdParam
        }
      });
      console.log(data.data);

      if (data?.data) {
        const formattedCompanies = data.data.map((company: any) => ({
          label: company.name,
          value: String(company.id),
        }));

        setCompanies(formattedCompanies);
        if (formattedCompanies.length === 0) {
          showNotification('info', 'No companies found for this group');
        }

      } else {
        setCompanies([]);
      }
    } catch (error: any) {
      console.error('Failed to load companies:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load companies');
      setCompanies([]);
    }
  };

  // Load States
  const loadStates = async () => {
    try {
      const response = await httpClient.get(endpoints.common.state());
      if (response.data) {
        const formattedStates = response.data.map((state: any) => ({
          label: state.name,
          value: String(state.id)
        }));
        setStates(formattedStates);
      }
      console.log(response.data);

    } catch (error) {
      console.error('Failed to load states:', error);
      showNotification('danger', 'Failed to load states');
    }
  };

  // Load Districts based on selected State
  const loadDistricts = async (stateId: string) => {
    try {
      const response = await httpClient.get(endpoints.common.district(), {
        params: { state_id: stateId }
      });
      
      if (response.data) {
        const formattedDistricts = response.data.map((district: any) => ({
          label: district.name,
          value: String(district.id)
        }));
        setDistricts(formattedDistricts);
      }
      console.log(response.data);

    } catch (error) {
      console.error('Failed to load districts:', error);
      showNotification('danger', 'Failed to load districts');
      setDistricts([]);
    }
  };

  const loadLocation = async (districtId: string) => {
    setIsLoadingBranches(true);

    try{
      const response = await httpClient.get(endpoints.common.location(), {
        params: { district_id: districtId}
      })

      if (response.data) {
        const formattedLocation = response.data.map((location: any) => ({
          label: location.name,
          value: String(location.id)
        }));
        console.log("location data" + response.data);
        
        setLocation(formattedLocation);
      }
      // console.log(response.data);
    }
    catch (error) {
      console.error('Failed to load location:', error);
    }
  }

  // Load Branches based on selected District
  const loadBranches = async (locationId: string, locationName: string)  => {
    setIsLoadingBranches(true);
    try {
     
      const { data } = await httpClient.get(endpoints.branch.getAll());

      console.log('Selected location:', { id: locationId, name: locationName });
      console.log('Available Branches:', data.data);



      // Filter branches where district_id matches the selected district
      const filteredBranches = data.data.filter((branch: any) => {
        const branchLocationId = String(branch.location_id);
        const branchLocationName = branch.Location?.name?.toLowerCase();
        const selectedLocationName = locationName.toLowerCase();
        
        const matchById = branchLocationId === locationId;
        const matchByName = branchLocationName === selectedLocationName;
        
        console.log('Branch District:', {
          branchId: branch.id,
          branchName: branch.name,
          branchLocationId,
          branchLocationName,
          selectedLocationId: locationId,
          selectedLocationName,
          matchById,
          matchByName
        });
        
        return matchById || matchByName;
      });
    console.log('Filtered Branches:', filteredBranches); 

    const formattedBranches = filteredBranches.map((branch: any) => ({
      label: `${branch.name}`,
      value: String(branch.id),
    }));
    
    console.log('Formatted Branches:', formattedBranches);
    setBranches(formattedBranches);
    
    if (selectedBranch && !formattedBranches.find(b => b.value === selectedBranch.value)) {
      setSelectedBranch(null);
      onBranchChange?.(null);
    }
    console.log(data.data);
     
    } catch (error) {
      console.error('Failed to load branches:', error);
      showNotification('danger', 'Failed to load branches');
      setBranches([]);
      setSelectedBranch(null);
      onBranchChange?.(null);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  // Initial load of company groups and states
  useEffect(() => {
    loadCompanyGroups();
    loadStates();
  }, []);

  // Load companies when company group changes
  useEffect(() => {
    if (selectedCompanyGroup?.value) {
      setSelectedCompany(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
    }
  }, [selectedCompanyGroup]);

  // Load districts when state changes
  useEffect(() => {
    if (selectedState?.value) {
      setSelectedDistrict(null);
      setSelectedLocation(null);
      setSelectedBranch(null);
      setLocation([]);
      setBranches([]);
      loadDistricts(selectedState.value);
    } else {
      setDistricts([]);
      setLocation([]);
      setBranches([]);
    }
  }, [selectedState]);


  useEffect(() => {
    if (selectedDistrict?.value) {
      setSelectedLocation(null);
      setSelectedBranch(null);
      setBranches([]);
      loadLocation(selectedDistrict.value);
    } else {
      setLocation([]);
      setBranches([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedLocation?.value) {
      setSelectedBranch(null);
      loadBranches(selectedLocation.value, selectedLocation.label);
    } else {
      setBranches([]);
    }
  }, [selectedLocation]);

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Company Group"
          options={companyGroups}
          value={selectedCompanyGroup}
          onChange={setSelectedCompanyGroup}
        />
      </div>

      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Company"
          options={companies}
          value={selectedCompany}
          onChange={setSelectedCompany}
        />
      </div>

      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="State"
          options={states}
          value={selectedState}
          onChange={setSelectedState}
        />
      </div>

      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="District"
          options={districts}
          value={selectedDistrict}
          onChange={setSelectedDistrict}
        />
      </div>
      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Location"
          options={location}
          value={selectedLocation}
          onChange={setSelectedLocation}
        />
      </div>

      <div className="flex-1 min-w-[140px]">
        <OutlinedSelect
          label="Branch"
          value={selectedBranch}
          onChange={(selected) => {
            console.log('Selected Branch:', selected);
            setSelectedBranch(selected);
            onBranchChange?.(selected);
          }}
          options={branches}
        
        />
      </div>

      <div className="flex-none">
        <CustomDateRangePicker onApply={handleDateRangeApply} />
      </div>

      <div className="flex-none">
        <DashboardFilter />
      </div>
    </div>
  );
};

export default Company;