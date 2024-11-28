// import React, { useState, useMemo } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// // Define the structure of your PFIWTrackerData
// interface PFIWTrackerData {
//   entityName: string;
//   companyName: string;
//   pfCode: string;
//   location: string;
//   month: string;
//   dueDate: string;
//   submissionDate: string;
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

// interface PFIWTrackerFilterProps {
//   data: PFIWTrackerData[];
//   onFilterChange: (filters: { entityName: string; companyName: string; pfCode: string; location: string }) => void;
// }

// const PFIWTrackerFilter: React.FC<PFIWTrackerFilterProps> = ({ data, onFilterChange }) => {
//   const entityOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
//   const companyOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
//   const pfCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'pfCode')), [data]);
//   const locationOptions = useMemo(() => createOptions(getUniqueValues(data, 'location')), [data]);

//   const [currentEntity, setCurrentEntity] = useState<string>(entityOptions[0]?.value || '');
//   const [currentCompany, setCurrentCompany] = useState<string>(companyOptions[0]?.value || '');
//   const [currentPfCode, setCurrentPfCode] = useState<string>(pfCodeOptions[0]?.value || '');
//   const [currentLocation, setCurrentLocation] = useState<string>(locationOptions[0]?.value || '');

//   const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) => 
//     (selectedOption: Option | null) => {
//       if (selectedOption) {
//         setter(selectedOption.value);
//         onFilterChange({
//           entityName: filterType === 'entityName' ? selectedOption.value : currentEntity,
//           companyName: filterType === 'companyName' ? selectedOption.value : currentCompany,
//           pfCode: filterType === 'pfCode' ? selectedOption.value : currentPfCode,
//           location: filterType === 'location' ? selectedOption.value : currentLocation,
//         });
//       }
//     };

//   return ( 
//     <div className="flex gap-3">  
//     <div className='w-full'>
//         <OutlinedSelect
//           label="Company Group"
//           options={companyOptions}
//           value={companyOptions.find((option) => option.value === currentCompany)}
//           onChange={handleChange(setCurrentCompany, 'companyName')}
//         />
//       </div>
//       <div className='w-full'>
//         <OutlinedSelect
//           label="Company"
//           options={entityOptions}
//           value={entityOptions.find((option) => option.value === currentEntity)}
//           onChange={handleChange(setCurrentEntity, 'entityName')}
//         />
//       </div>
//       <div className='w-full z-20'>
//         <OutlinedSelect
//           label="PF Code"
//           options={pfCodeOptions}
//           value={pfCodeOptions.find((option) => option.value === currentPfCode)}
//           onChange={handleChange(setCurrentPfCode, 'pfCode')}
//         />
//       </div>
//     </div>
//   );
// };

// export default PFIWTrackerFilter;

import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

type Option = {
  value: string;
  label: string;
};

interface PFIWTrackerFilterProps {
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    pfCode: string 
  }) => void;
}

const PFIWTrackerFilter: React.FC<PFIWTrackerFilterProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyGroupName, setCompanyGroupName] = useState('');
  const [companyGroupId, setCompanyGroupId] = useState('');
  
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedPfCode, setSelectedPfCode] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [pfCodeOptions, setPfCodeOptions] = useState<Option[]>([]);

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

  // Load PF Codes based on selected Company
  const loadPFCodes = async (companyId: string) => {
    try {
      const { data } = await httpClient.get(endpoints.pfSetup.getAll(), {
        params: {
          'company_id[]': [companyId]
        }
      });

      if (data?.data) {
        const formattedPFCodes = data.data.map((pfsetup: any) => ({
          label: pfsetup.pf_code,
          value: pfsetup.pf_code,
          companyId: String(pfsetup.company_id),
          groupId: String(pfsetup.group_id)
        }));

        setPfCodeOptions(formattedPFCodes);
        if (formattedPFCodes.length === 0) {
          showNotification('info', 'No PF Codes found for this company');
        }
      } else {
        setPfCodeOptions([]);
      }
    } catch (error: any) {
      console.error('Failed to load PF Codes:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load PF Codes');
      setPfCodeOptions([]);
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
      setSelectedPfCode(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
      setPfCodeOptions([]);
    }
  }, [selectedCompanyGroup]);

  // Load PF Codes when company changes
  useEffect(() => {
    if (selectedCompany?.value) {
      setSelectedPfCode(null);
      loadPFCodes(selectedCompany.value);
      
      // Trigger filter change when company is selected
      onFilterChange({
        groupName: selectedCompanyGroup?.label || '',
        groupId: selectedCompanyGroup?.value || '',
        companyName: selectedCompany.label,
        companyId: selectedCompany.value,
        pfCode: ''
      });
    } else {
      setPfCodeOptions([]);
    }
  }, [selectedCompany]);

  const handleCompanyGroupChange = (value: Option | null) => {
    setSelectedCompanyGroup(value);
    // Reset company and PF code selections
    setSelectedCompany(null);
    setSelectedPfCode(null);
  };

  const handleCompanyChange = (value: Option | null) => {
    setSelectedCompany(value);
    setSelectedPfCode(null);
  };

  const handlePfCodeChange = (value: Option | null) => {
    setSelectedPfCode(value);
    // Trigger filter change with both company and PF code
    onFilterChange({
      groupName: selectedCompanyGroup?.label || '',
      groupId: selectedCompanyGroup?.value || '',
      companyName: selectedCompany?.label || '',
      companyId: selectedCompany?.value || '',
      pfCode: value?.value || ''
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
          label="PF Code"
          options={pfCodeOptions}
          value={selectedPfCode}
          onChange={handlePfCodeChange}
        />
      </div> 
    </div>
  );
};

export default PFIWTrackerFilter;