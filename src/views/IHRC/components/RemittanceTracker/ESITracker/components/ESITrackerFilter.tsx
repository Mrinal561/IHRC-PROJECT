// import React, { useState, useMemo } from 'react';
// import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';

// // Define the structure of your ESITrackerData
// interface ESITrackerData {
//   companyName: string;
//   esiCode: string;
//   location: string;
//   month: string;
//   noOfEmployees: number;
//   wages: string;
//   esiContribution: string;
//   totalChallanAmount: number;
//   dueDate: string;
//   dateOfPayment: string;
//   delay: string;
//   delayReason: string;
//   typeOfChallan: string;
//   challanNo: string;
// }

// type Option = {
//   value: string;
//   label: string;
// };

// const getUniqueValues = (data: any[], key: string): string[] => {
//   const values = data.map(item => item[key]);
//   return Array.from(new Set(values)).filter((value): value is string => value !== undefined);
// };

// const createOptions = (values: string[]): Option[] =>
//   values.map(value => ({ value, label: value }));

// interface ESITrackerFilterProps {
//   data: ESITrackerData[];
//   onFilterChange: (filters: { groupName: string; companyName: string; esiCode: string }) => void;
// }

// const ESITrackerFilter: React.FC<ESITrackerFilterProps> = ({ data, onFilterChange }) => {
//   const groupOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
//   const nameOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
//   const esiCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'esiCode')), [data]);

//   const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value || '');
//   const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value || '');
//   const [currentEsiCode, setCurrentEsiCode] = useState<string>(esiCodeOptions[0]?.value || '');

//   const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) =>
//     (selectedOption: Option | null) => {
//       if (selectedOption) {
//         setter(selectedOption.value);
//         onFilterChange({
//           groupName: filterType === 'groupName' ? selectedOption.value : currentGroup,
//           companyName: filterType === 'companyName' ? selectedOption.value : groupName,
//           esiCode: filterType === 'esiCode' ? selectedOption.value : currentEsiCode,
//         });
//       }
//     };

//   return (
//     <div className="flex gap-3">
//       <div className='w-full'>
//         <OutlinedSelect
//           label="Company Group"
//           options={groupOptions}
//           value={groupOptions.find((option) => option.value === currentGroup)}
//           onChange={handleChange(setCurrentGroup, 'groupName')}
//         />
//       </div>
//       <div className='w-full'>
//         <OutlinedSelect
//           label="Company"
//           options={nameOptions}
//           value={nameOptions.find((option) => option.value === groupName)}
//           onChange={handleChange(setGroupName, 'companyName')}
//         />
//       </div>
//       <div className='w-full z-20'>
//         <OutlinedSelect
//           label="ESI Code"
//           options={esiCodeOptions}
//           value={esiCodeOptions.find((option) => option.value === currentEsiCode)}
//           onChange={handleChange(setCurrentEsiCode, 'esiCode')}
//         />
//       </div>
//     </div>
//   );
// };

// export default ESITrackerFilter;



import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

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
    esiCode: string 
  }) => void;
}

const ESIWTrackerFilter: React.FC<ESIWTrackerFilterProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyGroupName, setCompanyGroupName] = useState('');
  const [companyGroupId, setCompanyGroupId] = useState('');
  
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedEsiCode, setSelectedEsiCode] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [esiCodeOptions, setEsiCodeOptions] = useState<Option[]>([]);

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
      const { data } = await httpClient.get(endpoints.esiSetup.getAll(), {
        params: {
          'company_id[]': [companyId]
        }
      });

      if (data?.data) {
        const formattedESICodes = data.data.map((esisetup: any) => ({
          label: esisetup.code,
          value: esisetup.code,
          companyId: String(esisetup.company_id),
          groupId: String(esisetup.group_id)
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
        esiCode: ''
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
      esiCode: value?.value || ''
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
    </div>
  );
};

export default ESIWTrackerFilter;