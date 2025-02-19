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

// const SandETrackerFilter: React.FC = () => {
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
//         label="Group Name"
//         options={groupOptions}
//         value={groupOptions.find((option) => option.value === currentGroup)}
//         onChange={handleGroupChange}
//       />
//         </div>
//         <div>
//         <OutlinedSelect
//         label="Company Name"
//         options={nameOptions}
//         value={nameOptions.find((option) => option.value === groupName)}
//         onChange={handleNameChange}
//       />
//         </div>
//     </div>
//   );
// };
// export default SandETrackerFilter;

// import React, { useState, useEffect } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';
// import { Notification, toast } from '@/components/ui';

// type Option = {
//   value: string;
//   label: string;
// };

// interface NoticeProps{
//   onFilterChange:(filters:{
//     groupId:string;
//     groupName:string;
//     companyName:string;
//     companyId:string;
//     status:string;
//   }) => void
// }

// const SandETrackerFilter: React.FC<NoticeProps> = ({onFilterChange}) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
//   const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);

//   const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
//   const [companies, setCompanies] = useState<Option[]>([]);

//   const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
//     toast.push(
//       <Notification
//         title={type.charAt(0).toUpperCase() + type.slice(1)}
//         type={type}
//       >
//         {message}
//       </Notification>
//     );
//   };

//   // Load Company Groups
//   const loadCompanyGroups = async () => {
//     try {
//       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
//         params: { ignorePlatform: true },
//       });
      
//       if (data.data && data.data.length > 0) {
//         const formattedGroups = data.data.map((group: any) => ({
//           value: String(group.id),
//           label: group.name
//         }));
        
//         setCompanyGroups(formattedGroups);
        
//         // Set default selection
//         const defaultGroup = formattedGroups[0];
//         setSelectedCompanyGroup(defaultGroup);
//         loadCompanies(defaultGroup.value);
//       } else {
//         showNotification('warning', 'No company group found');
//       }
//     } catch (error) {
//       console.error('Failed to load company group:', error);
//       showNotification('danger', 'Failed to load company group');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load Companies based on selected Company Group
//   const loadCompanies = async (groupId: string) => {
//     try {
//       const { data } = await httpClient.get(endpoints.company.getAll(), {
//         params: {
//           'group_id[]': [groupId]
//         }
//       });

//       if (data?.data) {
//         const formattedCompanies = data.data.map((company: any) => ({
//           label: company.name,
//           value: String(company.id),
//         }));

//         setCompanies(formattedCompanies);
//         if (formattedCompanies.length === 0) {
//           showNotification('info', 'No companies found for this group');
//         }
//       } else {
//         setCompanies([]);
//       }
//     } catch (error: any) {
//       console.error('Failed to load companies:', error);
//       showNotification('danger', error.response?.data?.message || 'Failed to load companies');
//       setCompanies([]);
//     }
//   };

//   // Initial load of company groups
//   useEffect(() => {
//     loadCompanyGroups();
//   }, []);

//   // Load companies when company group changes
//   useEffect(() => {
//     if (selectedCompanyGroup?.value) {
//       setSelectedCompany(null);
//       loadCompanies(selectedCompanyGroup.value);
//     } else {
//       setCompanies([]);
//     }
//   }, [selectedCompanyGroup]);

//   // Add this useEffect to call onFilterChange when company changes
// useEffect(() => {
//   if (selectedCompany?.value) {
//     onFilterChange({
//       groupId: selectedCompanyGroup?.value || '',
//       groupName: selectedCompanyGroup?.label || '',
//       companyName: selectedCompany.label,
//       companyId: selectedCompany.value
//     });
//   }
// }, [selectedCompany]);

//   const handleGroupChange = (value: Option | null) => {
//     setSelectedCompanyGroup(value);
//     setSelectedCompany(null);
//   };

//   const handleNameChange = (value: Option | null) => {
//     setSelectedCompany(value);
//     if (value) {
//       onFilterChange({
//         groupId: selectedCompanyGroup?.value || '',
//         groupName: selectedCompanyGroup?.label || '',
//         companyName: value.label,
//         companyId: value.value
//       });
//     }
//   };

//   return ( 
//     <div className="w-full flex items-center gap-3">  
//       <div className='flex-1 min-w-[160px]'>
//         <OutlinedSelect
//           label="Group Name"
//           options={companyGroups}
//           value={selectedCompanyGroup}
//           onChange={handleGroupChange}
//           // isLoading={isLoading}
//         />
//       </div>
//       <div className='flex-1 min-w-[160px]'>
//         <OutlinedSelect
//           label="Company Name"
//           options={companies}
//           value={selectedCompany}
//           onChange={handleNameChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default SandETrackerFilter;

import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

type Option = {
  value: string;
  label: string;
};

interface NoticeProps {
  onFilterChange: (filters: {
    groupId: string;
    groupName: string;
    companyName: string;
    companyId: string;
    status: string;
  }) => void;
}

const SandETrackerFilter: React.FC<NoticeProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);

  const statusOptions: Option[] = [
    { value: 'open', label: 'Open' },
    { value: 'close', label: 'Close' }
  ];

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

  // Initial load of company groups
  useEffect(() => {
    loadCompanyGroups();
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

  // Update filters when selections change
  useEffect(() => {
    if (selectedCompany?.value) {
      onFilterChange({
        groupId: selectedCompanyGroup?.value || '',
        groupName: selectedCompanyGroup?.label || '',
        companyName: selectedCompany.label,
        companyId: selectedCompany.value,
        status: selectedStatus?.value || ''
      });
    }
  }, [selectedCompany, selectedStatus]);

  const handleGroupChange = (value: Option | null) => {
    setSelectedCompanyGroup(value);
    setSelectedCompany(null);
  };

  const handleNameChange = (value: Option | null) => {
    setSelectedCompany(value);
  };

  const handleStatusChange = (value: Option | null) => {
    setSelectedStatus(value);
  };

  return ( 
    <div className="w-full flex items-center gap-3">  
      <div className='flex-1 min-w-[160px]'>
        <OutlinedSelect
          label="Group Name"
          options={companyGroups}
          value={selectedCompanyGroup}
          onChange={handleGroupChange}
        />
      </div>
      <div className='flex-1 min-w-[160px]'>
        <OutlinedSelect
          label="Company Name"
          options={companies}
          value={selectedCompany}
          onChange={handleNameChange}
        />
      </div>
      <div className='flex-1 min-w-[160px]'>
        <OutlinedSelect
          label="Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default SandETrackerFilter;