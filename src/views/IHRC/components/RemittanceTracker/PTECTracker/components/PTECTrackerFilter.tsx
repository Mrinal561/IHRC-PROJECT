// import React, { useState, useMemo } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// // Define the structure of your PTTrackerData (based on your dummy data)
// interface PTTrackerData {
//   companyName: string;
//   ptCode: string;
//   location: string;
//   month: string;
//   noOfEmployees: number;
//   wages: string;
//   totalChallanAmount: number;
//   dueDate: string;
//   dateOfPayment: string;
//   delay: string;
//   delayReason: string;
//   typeOfChallan: string;
//   trrnNo: string;
//   crnNo: string;
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

// interface PTTrackerFilterProps {
//   data: PTTrackerData[];
//   onFilterChange: (filters: { groupName: string; companyName: string; ptCode: string }) => void;
// }

// const PTECTrackerFilter: React.FC<PTTrackerFilterProps> = ({ data, onFilterChange }) => {
//   const groupOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
//   const nameOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
//   const ptCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'ptRC')), [data]);

//   const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value || '');
//   const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value || '');
//   const [currentPtCode, setCurrentPtCode] = useState<string>(ptCodeOptions[0]?.value || '');

//   const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) =>
//     (selectedOption: Option | null) => {
//       if (selectedOption) {
//         setter(selectedOption.value);
//         onFilterChange({
//           groupName: filterType === 'groupName' ? selectedOption.value : currentGroup,
//           companyName: filterType === 'companyName' ? selectedOption.value : groupName,
//           ptCode: filterType === 'ptCode' ? selectedOption.value : currentPtCode,
//         });
//       }
//     };

//   return (
//     <div className="flex gap-3">
//       <div className='w-40'>
//         <OutlinedSelect
//           label="Company Group"
//           options={groupOptions}
//           value={groupOptions.find((option) => option.value === currentGroup)}
//           onChange={handleChange(setCurrentGroup, 'groupName')}
//         />
//       </div>
//       <div className='w-40'>
//         <OutlinedSelect
//           label="Company Name"
//           options={nameOptions}
//           value={nameOptions.find((option) => option.value === groupName)}
//           onChange={handleChange(setGroupName, 'companyName')}
//         />
//       </div>
//       <div className='w-40 z-20'>
//         <OutlinedSelect
//           label="PT Code"
//           options={ptCodeOptions}
//           value={ptCodeOptions.find((option) => option.value === currentPtCode)}
//           onChange={handleChange(setCurrentPtCode, 'ptCode')}
//         />
//       </div>
//     </div>
//   );
// };

// export default PTECTrackerFilter;

import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

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
    ptCode: string 
  }) => void;
}

const PTECTrackerFilter: React.FC<PTECTrackerFilterProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedPtCode, setSelectedPtCode] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [ptCodeOptions, setPtCodeOptions] = useState<Option[]>([]);

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
      const { data } = await httpClient.get(endpoints.ptSetup.getAll(), {
        params: {
          'company_id[]': [companyId]
        }
      });

      if (data?.data) {
        const formattedPTCodes = data.data.map((ptsetup: any) => ({
          label: ptsetup.enroll_number,
          value: ptsetup.enroll_number,
          companyId: String(ptsetup.company_id),
          groupId: String(ptsetup.group_id)
        }));

        setPtCodeOptions(formattedPTCodes);
        if (formattedPTCodes.length === 0) {
          showNotification('info', 'No PT Codes found for this company');
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
        ptCode: ''
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
      ptCode: value?.value || ''
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
          label="PTEC Code"
          options={ptCodeOptions}
          value={selectedPtCode}
          onChange={handlePtCodeChange}
        />
      </div> 
    </div>
  );
};

export default PTECTrackerFilter;