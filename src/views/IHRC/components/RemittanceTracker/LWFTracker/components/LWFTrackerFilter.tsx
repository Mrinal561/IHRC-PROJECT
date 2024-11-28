// import React, { useState } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// type Option = {
//   value: string;
//   label: string;
// };


// const getUniqueGroup = (data: EntityData[]): string[] => {
//     const companyGroupName = data.map(item => item.Company_Group_Name);
//     return Array.from(new Set(companyGroupName)).filter((companyGroupName): companyGroupName is string => companyGroupName !== undefined);
//   };
  
//   const groupOptions: Option[] = getUniqueGroup(entityDataSet).map(companyGroupName => ({
//     value: companyGroupName,
//     label: companyGroupName,
//   }));

//   const getUniqueName = (data: EntityData[]): string[] => {
//     const companyName = data.map(item => item.Company_Name);
//     return Array.from(new Set(companyName)).filter((companyName): companyName is string => companyName !== undefined);
//   };
  
//   const nameOptions: Option[] = getUniqueName(entityDataSet).map(companyName => ({
//     value: companyName,
//     label: companyName,
//   }));
// const getUniqueDistricts = (data: EntityData[]): string[] => {
//   const state = data.map(item => item.State);
//   return Array.from(new Set(state)).filter((state): state is string => state !== undefined);
// };

// const options: Option[] = getUniqueDistricts(entityDataSet).map(state => ({
//   value: state,
//   label: state,
// }));

// const LWFTrackerFilter: React.FC = () => {
//   const [currentFilter, setCurrentFilter] = useState<string>(options[0]?.value ||'');
//   const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value||'');
//   const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value||'');

//   const handleFilterChange = (selectedOption: Option | null) => {
//     if (selectedOption) {
//       setCurrentFilter(selectedOption.value);
      
//       // You can add any additional logic here that needs to happen when the filter changes
//     }
//   };
//   const handleGroupChange = (selectedOption: Option | null) => {
//     if (selectedOption) {
//         setCurrentGroup(selectedOption.value)
      
//       // You can add any additional logic here that needs to happen when the filter changes
//     }
//   };
//   const handleNameChange = (selectedOption: Option | null) => {
//     if (selectedOption) {
//         setGroupName(selectedOption.value)
      
//       // You can add any additional logic here that needs to happen when the filter changes
//     }
//   };

//   return (
//     <div className=" flex gap-3">
//         <div>
//         <OutlinedSelect
//         label="Company Group"
//         options={groupOptions}
//         value={groupOptions.find((option) => option.value === currentGroup)}
//         onChange={handleGroupChange}
//       />
//         </div>
//         <div>
//         <OutlinedSelect
//         label="Company"
//         options={nameOptions}
//         value={nameOptions.find((option) => option.value === groupName)}
//         onChange={handleNameChange}
//       />
//         </div>
//     </div>
//   );
// };
// export default LWFTrackerFilter;


import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

type Option = {
  value: string;
  label: string;
};

interface LWFTrackerFilterProps {
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    lwfCode: string 
  }) => void;
}

const LWFTrackerFilter: React.FC<LWFTrackerFilterProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyGroupName, setCompanyGroupName] = useState('');
  const [companyGroupId, setCompanyGroupId] = useState('');
  
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedLwfCode, setSelectedLwfCode] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [lwfCodeOptions, setLwfCodeOptions] = useState<Option[]>([]);

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

  // Load LWF Codes based on selected Company
  const loadLWFCodes = async (companyId: string) => {
    try {
      const { data } = await httpClient.get(endpoints.lwfSetup.getAll(), {
        params: {
          'company_id[]': [companyId]
        }
      });

      if (data?.data) {
        const formattedLWFCodes = data.data.map((lwfSetup: any) => ({
          label: lwfSetup.register_number,
          value: lwfSetup.register_number,
          companyId: String(lwfSetup.company_id),
          groupId: String(lwfSetup.group_id)
        }));

        setLwfCodeOptions(formattedLWFCodes);
        if (formattedLWFCodes.length === 0) {
          showNotification('info', 'No LWF Codes found for this company');
        }
      } else {
        setLwfCodeOptions([]);
      }
    } catch (error: any) {
      console.error('Failed to load LWF Codes:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load LWF Codes');
      setLwfCodeOptions([]);
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
      setSelectedLwfCode(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
      setLwfCodeOptions([]);
    }
  }, [selectedCompanyGroup]);

  // Load LWF Codes when company changes
  useEffect(() => {
    if (selectedCompany?.value) {
      setSelectedLwfCode(null);
      loadLWFCodes(selectedCompany.value);
      
      // Trigger filter change when company is selected
      onFilterChange({
        groupName: selectedCompanyGroup?.label || '',
        groupId: selectedCompanyGroup?.value || '',
        companyName: selectedCompany.label,
        companyId: selectedCompany.value,
        lwfCode: ''
      });
    } else {
      setLwfCodeOptions([]);
    }
  }, [selectedCompany]);

  const handleCompanyGroupChange = (value: Option | null) => {
    setSelectedCompanyGroup(value);
    // Reset company and LWF code selections
    setSelectedCompany(null);
    setSelectedLwfCode(null);
  };

  const handleCompanyChange = (value: Option | null) => {
    setSelectedCompany(value);
    setSelectedLwfCode(null);
  };

  const handleLwfCodeChange = (value: Option | null) => {
    setSelectedLwfCode(value);
    // Trigger filter change with both company and LWF code
    onFilterChange({
      groupName: selectedCompanyGroup?.label || '',
      groupId: selectedCompanyGroup?.value || '',
      companyName: selectedCompany?.label || '',
      companyId: selectedCompany?.value || '',
      lwfCode: value?.value || ''
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
          label="LWF Code"
          options={lwfCodeOptions}
          value={selectedLwfCode}
          onChange={handleLwfCodeChange}
        />
      </div> 
    </div>
  );
};

export default LWFTrackerFilter;