
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

interface PTECTrackerFilterProps {
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    ptCode: string ;
    search:string;
  }) => void;
}

const PTECTrackerFilter: React.FC<PTECTrackerFilterProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedPtCode, setSelectedPtCode] = useState<Option | null>(null);
  const [financialYear, setFinancialYear] = useState<string | null>(
    sessionStorage.getItem(FINANCIAL_YEAR_KEY)
  );

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [ptCodeOptions, setPtCodeOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    
    // Trigger filter change with updated search value
    onFilterChange({
      groupName: selectedCompanyGroup?.label || '',
      groupId: selectedCompanyGroup?.value || '',
      companyName: selectedCompany?.label || '',
      companyId: selectedCompany?.value || '',
      ptCode: selectedPtCode?.value || '',
      search: value
    });
  };

  useEffect(() => {
    const handleFinancialYearChange = (event: CustomEvent) => {
      const newFinancialYear = event.detail;
      setFinancialYear(newFinancialYear);
      
      // Only reset company and ESI code selections
      setSelectedCompany(null);
      setSelectedPtCode(null);
      setCompanies([]);
      setPtCodeOptions([]);
      
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
        ptCode: '',
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
        const formattedGroups = data.data.map((group: any) => ({
          value: String(group.id),
          label: group.name
        }));
        
        setCompanyGroups(formattedGroups);
        
        // Set default selection
        const defaultGroup = formattedGroups[0];
        setSelectedCompanyGroup(defaultGroup);
        loadCompanies(defaultGroup.value);
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

  // Load PT Codes based on selected Company
  const loadPTCodes = async (companyId: string) => {
    try {
      const { data } = await httpClient.get(endpoints.ptSetup.getAllCodes(), {
        params: {
          'company_id[]': [companyId]
        }
      });

      if (data) {
        const formattedPTCodes = data.map((ptsetup: any) => ({
          label: ptsetup.enroll_number,
          value: ptsetup.enroll_number,
          companyId: String(ptsetup.company_id),
          groupId: String(ptsetup.group_id)
        }));

        setPtCodeOptions(formattedPTCodes);
        if (formattedPTCodes.length === 0) {
          // showNotification('info', 'No PT Codes found for this company');
        }
      } else {
        setPtCodeOptions([]);
      }
    } catch (error: any) {
      console.error('Failed to load PT Codes:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load PT Codes');
      setPtCodeOptions([]);
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
      setSelectedPtCode(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
      setPtCodeOptions([]);
    }
  }, [selectedCompanyGroup]);

  // Load PT Codes when company changes
  useEffect(() => {
    if (selectedCompany?.value) {
      setSelectedPtCode(null);
      loadPTCodes(selectedCompany.value);
      
      onFilterChange({
        groupName: selectedCompanyGroup?.label || '',
        groupId: selectedCompanyGroup?.value || '',
        companyName: selectedCompany.label,
        companyId: selectedCompany.value,
        ptCode: '',
        search:''
      });
    } else {
      setPtCodeOptions([]);
    }
  }, [selectedCompany]);

  const handleCompanyGroupChange = (value: Option | null) => {
    setSelectedCompanyGroup(value);
    setSelectedCompany(null);
    setSelectedPtCode(null);
  };

  const handleCompanyChange = (value: Option | null) => {
    setSelectedCompany(value);
    setSelectedPtCode(null);
  };

  const handlePtCodeChange = (value: Option | null) => {
    setSelectedPtCode(value);
    onFilterChange({
      groupName: selectedCompanyGroup?.label || '',
      groupId: selectedCompanyGroup?.value || '',
      companyName: selectedCompany?.label || '',
      companyId: selectedCompany?.value || '',
      ptCode: value?.value || '',
      search:''
    });
  };

  return ( 
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"> 
      <div className="min-w-0">
        <OutlinedSelect
          label="Group"
          options={companyGroups}
          value={selectedCompanyGroup}
          onChange={handleCompanyGroupChange}
          showClearButton={false}
        />
      </div>
      
      <div className="min-w-0">
        <OutlinedSelect
          label="Company"
          options={companies}
          value={selectedCompany}
          onChange={handleCompanyChange}
        />
      </div>
      
      <div className="min-w-0">
        <OutlinedSelect
          label="PT EC Code"
          options={ptCodeOptions}
          value={selectedPtCode}
          onChange={handlePtCodeChange}
        />
      </div> 
      <div className="min-w-0">
        <OutlinedInput
          label="Search By Location"
          value={searchValue}
          onChange={(e) => handleSearchChange(e)}
          maxLabelWidth='95%'
        />
      </div>
    </div>
  );
};

export default PTECTrackerFilter;