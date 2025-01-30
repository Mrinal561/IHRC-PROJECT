
import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';

type Option = {
  value: string;
  label: string;
};

interface ESIWTrackerFilterProps {
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    esiCode: string ;
    search: string;
  }) => void;
}

const ESIWTrackerFilter: React.FC<ESIWTrackerFilterProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyGroupName, setCompanyGroupName] = useState('');
  const [companyGroupId, setCompanyGroupId] = useState('');
  const [financialYear, setFinancialYear] = useState<string | null>(
    sessionStorage.getItem(FINANCIAL_YEAR_KEY)
  );
  
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedEsiCode, setSelectedEsiCode] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [esiCodeOptions, setEsiCodeOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    
    // Trigger filter change with updated search value
    onFilterChange({
      groupName: selectedCompanyGroup?.label || '',
      groupId: selectedCompanyGroup?.value || '',
      companyName: selectedCompany?.label || '',
      companyId: selectedCompany?.value || '',
      esiCode: selectedEsiCode?.value || '',
      search: value
    });
  };

  // Listen for financial year changes
  useEffect(() => {
    const handleFinancialYearChange = (event: CustomEvent) => {
      const newFinancialYear = event.detail;
      setFinancialYear(newFinancialYear);
      
      // Only reset company and ESI code selections
      setSelectedCompany(null);
      setSelectedEsiCode(null);
      setCompanies([]);
      setEsiCodeOptions([]);
      
      // If there's a selected company group, reload its companies
      if (selectedCompanyGroup?.value) {
        loadCompanies(selectedCompanyGroup.value);
      }
      
      // Update filters while preserving group
      onFilterChange({
        groupName: selectedCompanyGroup?.label || '',
        groupId: selectedCompanyGroup?.value || '',
        companyName: '',
        companyId: '',
        esiCode: '',
        search:''
      });
    };

    window.addEventListener(
      FINANCIAL_YEAR_CHANGE_EVENT,
      handleFinancialYearChange as EventListener
    );

    return () => {
      window.removeEventListener(
        FINANCIAL_YEAR_CHANGE_EVENT,
        handleFinancialYearChange as EventListener
      );
    };
  }, [selectedCompanyGroup, onFilterChange]);

  
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
      
      if (data.data && data.data.length > 0) {
        const defaultGroup = data.data[0];
        setCompanyGroupName(defaultGroup.name);
        setCompanyGroupId(String(defaultGroup.id));
        setSelectedCompanyGroup({
          value: String(defaultGroup.id),
          label: defaultGroup.name
        });
        
        // Trigger loading companies with the default group
        loadCompanies(String(defaultGroup.id));
      } else {
        showNotification('warning', 'No company group found');
      }
    } catch (error) {
      console.error('Failed to load company group:', error);
      showNotification('danger', 'Failed to load company group');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Companies based on selected Company Group
  const loadCompanies = async (groupId: string) => {
    try {
      const { data } = await httpClient.get(endpoints.company.getAll(), {
        params: {
          'group_id[]': [groupId]
        }
      });

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

  // Load ESI Codes based on selected Company
  const loadESICodes = async (companyId: string) => {
    try {
      const { data } = await httpClient.get(endpoints.esiSetup.getAllCodes(), {
        params: {
          'company_id[]': [companyId]
        }
      });
  
      if (data) {
        const formattedESICodes = data.map((esisetup: any) => ({
          label: esisetup.code,
          value: esisetup.code,
          companyId: String(esisetup.Company.id),
          groupId: String(esisetup.CompanyGroup.id),
          location: esisetup.Location.name
        }));
  
        setEsiCodeOptions(formattedESICodes);
        if (formattedESICodes.length === 0) {
          // showNotification('info', 'No ESI Codes found for this company');
        }
      } else {
        setEsiCodeOptions([]);
      }
    } catch (error: any) {
      console.error('Failed to load ESI Codes:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load ESI Codes');
      setEsiCodeOptions([]);
    }
  };

  // Initial load of company groups
  useEffect(() => {
    loadCompanyGroups();
  }, []);

  // Load companies when company group changes
  useEffect(() => {
    if (selectedCompanyGroup?.value) {
      setSelectedCompany(null);
      setSelectedEsiCode(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
      setEsiCodeOptions([]);
    }
  }, [selectedCompanyGroup]);

  // Load ESI Codes when company changes
  useEffect(() => {
    if (selectedCompany?.value) {
      setSelectedEsiCode(null);
      loadESICodes(selectedCompany.value);
      
      // Trigger filter change when company is selected
      onFilterChange({
        groupName: selectedCompanyGroup?.label || '',
        groupId: selectedCompanyGroup?.value || '',
        companyName: selectedCompany.label,
        companyId: selectedCompany.value,
        esiCode: '',
        search:''
      });
    } else {
      setEsiCodeOptions([]);
    }
  }, [selectedCompany]);

  const handleCompanyGroupChange = (value: Option | null) => {
    setSelectedCompanyGroup(value);
    // Reset company and ESI code selections
    setSelectedCompany(null);
    setSelectedEsiCode(null);
  };

  const handleCompanyChange = (value: Option | null) => {
    setSelectedCompany(value);
    setSelectedEsiCode(null);
  };

  const handleEsiCodeChange = (value: Option | null) => {
    setSelectedEsiCode(value);
    // Trigger filter change with both company and ESI code
    onFilterChange({
      groupName: selectedCompanyGroup?.label || '',
      groupId: selectedCompanyGroup?.value || '',
      companyName: selectedCompany?.label || '',
      companyId: selectedCompany?.value || '',
      esiCode: value?.value || '',
      search: searchValue
    });
  };

  return ( 
    <div className="w-full flex items-center gap-3">  
      <div className='flex-1 min-w-[140px]'>
        <OutlinedSelect
          label="Group"
          options={companyGroups}
          value={selectedCompanyGroup}
          onChange={handleCompanyGroupChange}
        />
      </div>
      
      <div className='flex-1 min-w-[140px]'>
        <OutlinedSelect
          label="Company"
          options={companies}
          value={selectedCompany}
          onChange={handleCompanyChange}
        />
      </div>
      
      <div className='flex-1 min-w-[140px]'>
        <OutlinedSelect
          label="ESI Code"
          options={esiCodeOptions}
          value={selectedEsiCode}
          onChange={handleEsiCodeChange}
        />
      </div> 
      <div className='flex-1 min-w-[140px]'>
        <OutlinedInput
          label="Search"
          value={searchValue}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
    </div>
  );
};

export default ESIWTrackerFilter;