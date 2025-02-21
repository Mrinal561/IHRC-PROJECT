

// import React, { useState, useEffect } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';
// import { Notification, toast } from '@/components/ui';

// type Option = {
//   value: string;
//   label: string;
// };

// interface NoticeProps {
//   onFilterChange: (filters: {
//     groupId: string;
//     groupName: string;
//     companyName: string;
//     companyId: string;
//     status: string;
//     noticeType: string;
//   }) => void;
// }

// const SandETrackerFilter: React.FC<NoticeProps> = ({ onFilterChange }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
//   const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
//   const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
//   const [selectedNoticeType, setSelectedNoticeType] = useState<Option | null>(null);

//   const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
//   const [companies, setCompanies] = useState<Option[]>([]);

//   const statusOptions: Option[] = [
//     { value: 'open', label: 'Open' },
//     { value: 'close', label: 'Close' }
//   ];

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

//   // Update filters when selections change
//   useEffect(() => {
//     if (selectedCompany?.value) {
//       onFilterChange({
//         groupId: selectedCompanyGroup?.value || '',
//         groupName: selectedCompanyGroup?.label || '',
//         companyName: selectedCompany.label,
//         companyId: selectedCompany.value,
//         status: selectedStatus?.value || ''
//       });
//     }
//   }, [selectedCompany, selectedStatus]);

//   const handleGroupChange = (value: Option | null) => {
//     setSelectedCompanyGroup(value);
//     setSelectedCompany(null);
//   };

//   const handleNameChange = (value: Option | null) => {
//     setSelectedCompany(value);
//   };

//   const handleStatusChange = (value: Option | null) => {
//     setSelectedStatus(value);
//   };

//   return ( 
//     <div className="w-full flex items-center gap-3">  
//       <div className='flex-1 min-w-[160px]'>
//         <OutlinedSelect
//           label="Group Name"
//           options={companyGroups}
//           value={selectedCompanyGroup}
//           onChange={handleGroupChange}
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
//       <div className='flex-1 min-w-[160px]'>
//         <OutlinedSelect
//           label="Status"
//           options={statusOptions}
//           value={selectedStatus}
//           onChange={handleStatusChange}
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
    noticeType: string;
  
  }) => void;
}

const SandETrackerFilter: React.FC<NoticeProps> = ({ onFilterChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [selectedNoticeType, setSelectedNoticeType] = useState<Option | null>(null);

  const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
  const [companies, setCompanies] = useState<Option[]>([]);
  const [statusOptions, setStatusOptions] = useState<Option[]>([]);
  const [noticeTypeOptions, setNoticeTypeOptions] = useState<Option[]>([]);

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

  // Load Status Options
  const loadStatusOptions = async () => {
    try {
      const { data } = await httpClient.get(endpoints.noticeTracker.noticeStatusSuggestions());
      const statusesData = Array.isArray(data) ? data : [data];
      const formattedStatus = statusesData.map((status) => ({
        value: status.status.toLowerCase(),
        label: status.status
      }));
      setStatusOptions(formattedStatus);
    } catch (error) {
      console.error('Failed to load status options:', error);
      showNotification('danger', 'Failed to load status options');
    }
  };

  // Load Notice Type Options
  const loadNoticeTypeOptions = async () => {
    try {
      const { data } = await httpClient.get(endpoints.noticeTracker.noticeTypeSuggestions());
      const noticeTypesData = Array.isArray(data) ? data : [data];
      const formattedTypes = noticeTypesData.map((type) => ({
        value: type.notice_type.toLowerCase(),
        label: type.notice_type
      }));
      setNoticeTypeOptions(formattedTypes);
    } catch (error) {
      console.error('Failed to load notice types:', error);
      showNotification('danger', 'Failed to load notice types');
    }
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

  // Initial load of all data
  useEffect(() => {
    loadCompanyGroups();
    loadStatusOptions();
    loadNoticeTypeOptions();
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
        status: selectedStatus?.value || '',
        noticeType: selectedNoticeType?.value || '',
      });
    }
  }, [selectedCompany, selectedStatus, selectedNoticeType]);

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

  const handleNoticeTypeChange = (value: Option | null) => {
    setSelectedNoticeType(value);
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
      <div className='flex-1 min-w-[160px]'>
        <OutlinedSelect
          label="Notice Type"
          options={noticeTypeOptions}
          value={selectedNoticeType}
          onChange={handleNoticeTypeChange}
        />
      </div>
    </div>
  );
};

export default SandETrackerFilter;