// //   // import React, { useState, useMemo } from 'react';
// //   // import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// //   // import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
// // import classNames from 'classnames';

// //   // // Define the structure of your PFTrackerData (based on your dummy data)
// //   // interface PFTrackerData {
// //   //   companyName: string;
// //   //   pfCode: string;
// //   //   location: string;
// //   //   month: string;
// //   //   noOfEmployees: number;
// //   //   wages: string;
// //   //   epsWage: string;
// //   //   totalChallanAmount: number;
// //   //   dueDate: string;
// //   //   dateOfPayment: string;
// //   //   delay: string;
// //   //   delayReason: string;
// //   //   typeOfChallan: string;
// //   //   trrnNo: string;
// //   //   crnNo: string;
// //   // }

// //   // type Option = {
// //   //   value: string;
// //   //   label: string;
// //   // };

// //   // const getUniqueValues = (data: any[], key: string): string[] => {
// //   //   const values = data.map(item => item[key]);
// //   //   return Array.from(new Set(values)).filter((value): value is string => value !== undefined);
// //   // };

// //   // const createOptions = (values: string[]): Option[] =>
// //   //   values.map(value => ({ value, label: value }));

// //   // interface PFTrackerFilterProps {
// //   //   data: PFTrackerData[];
// //   //   onFilterChange: (filters: { groupName: string; companyName: string; pfCode: string }) => void;
// //   // }

// //   // const PFTrackerFilter: React.FC<PFTrackerFilterProps> = ({ data, onFilterChange }) => {
// //   //   const groupOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Group_Name')), []);
// //   //   const nameOptions = useMemo(() => createOptions(getUniqueValues(entityDataSet, 'Company_Name')), []);
// //   //   const pfCodeOptions = useMemo(() => createOptions(getUniqueValues(data, 'pfCode')), [data]);

// //   //   const [currentGroup, setCurrentGroup] = useState<string>(groupOptions[0]?.value || '');
// //   //   const [groupName, setGroupName] = useState<string>(nameOptions[0]?.value || '');
// //   //   const [currentPfCode, setCurrentPfCode] = useState<string>(pfCodeOptions[0]?.value || '');

// //   //   const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, filterType: string) =>
// //   //     (selectedOption: Option | null) => {
// //   //       if (selectedOption) {
// //   //         setter(selectedOption.value);
// //   //         onFilterChange({
// //   //           groupName: filterType === 'groupName' ? selectedOption.value : currentGroup,
// //   //           companyName: filterType === 'companyName' ? selectedOption.value : groupName,
// //   //           pfCode: filterType === 'pfCode' ? selectedOption.value : currentPfCode,
// //   //         });
// //   //       }
// //   //     };

// //   //   return (
// //   //     <div className="flex gap-3">
      
// //   //       <div className='w-full'>
// //   //         <OutlinedSelect
// //   //           label="Company Group"
// //   //           options={groupOptions}
// //   //           value={groupOptions.find((option) => option.value === currentGroup)}
// //   //           onChange={handleChange(setCurrentGroup, 'groupName')}
// //   //         />
// //   //       </div>
// //   //       <div className='w-full'>
// //   //         <OutlinedSelect
// //   //           label="Company"
// //   //           options={nameOptions}
// //   //           value={nameOptions.find((option) => option.value === groupName)}
// //   //           onChange={handleChange(setGroupName, 'companyName')}
// //   //         />
// //   //       </div>
// //   //       <div className='w-full z-20'>
// //   //         <OutlinedSelect
// //   //           label="PF Code"
// //   //           options={pfCodeOptions}
// //   //           value={pfCodeOptions.find((option) => option.value === currentPfCode)}
// //   //           onChange={handleChange(setCurrentPfCode, 'pfCode')}
// //   //         />
// //   //       </div>
// //   //     </div>
// //   //   );
// //   // };

// //   // export default PFTrackerFilter;
  
// // //   import React, { useState, useEffect, useMemo } from 'react';
// // // import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// // // import OutlinedInput from '@/components/ui/OutlinedInput';
// // // import { endpoints } from '@/api/endpoint';
// // // import httpClient from '@/api/http-client';
// // // import { Notification, toast } from '@/components/ui';
// // // import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// // // // Define the structure of your PFTrackerData
// // // interface PFTrackerData {
// // //   companyName: string;
// // //   pfCode: string;
// // //   location: string;
// // //   month: string;
// // //   noOfEmployees: number;
// // //   wages: string;
// // //   epsWage: string;
// // //   totalChallanAmount: number;
// // //   dueDate: string;
// // //   dateOfPayment: string;
// // //   delay: string;
// // //   delayReason: string;
// // //   typeOfChallan: string;
// // //   trrnNo: string;
// // //   crnNo: string;
// // // }

// // // type Option = {
// // //   value: string;
// // //   label: string;
// // // };

// // // interface PFTrackerFilterProps {
// // //   data: PFTrackerData[];
// // //   onFilterChange: (filters: { groupName: string; companyName: string; pfCode: string }) => void;
// // // }

// // // const PFTrackerFilter: React.FC<PFTrackerFilterProps> = ({ data, onFilterChange }) => {
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [companyGroupName, setCompanyGroupName] = useState('');
// // //   const [companyGroupId, setCompanyGroupId] = useState('');
  
// // //   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
// // //   const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
// // //   const [selectedPfCode, setSelectedPfCode] = useState<Option | null>(null);

// // //   const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
// // //   const [companies, setCompanies] = useState<Option[]>([]);
// // //   const pfCodeOptions = useMemo(() =>
// // //     Array.from(new Set(data.map(item => item.pfCode)))
// // //       .filter(pfCode => pfCode !== undefined)
// // //       .map(pfCode => ({ value: pfCode, label: pfCode })),
// // //     [data]
// // //   );

// // //   const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
// // //     toast.push(
// // //       <Notification
// // //         title={type.charAt(0).toUpperCase() + type.slice(1)}
// // //         type={type}
// // //       >
// // //         {message}
// // //       </Notification>
// // //     );
// // //   };

// // //   // Load Company Groups
// // //   const loadCompanyGroups = async () => {
// // //     try {
// // //       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
// // //         params: { ignorePlatform: true },
// // //       });
      
// // //       if (data.data && data.data.length > 0) {
// // //         const defaultGroup = data.data[0];
// // //         setCompanyGroupName(defaultGroup.name);
// // //         setCompanyGroupId(String(defaultGroup.id));
        
// // //         // Trigger loading companies with the default group
// // //         loadCompanies(String(defaultGroup.id));
// // //       } else {
// // //         showNotification('warning', 'No company group found');
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to load company group:', error);
// // //       showNotification('danger', 'Failed to load company group');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Load Companies based on selected Company Group
// // //   const loadCompanies = async (groupId: string) => {
// // //     try {
// // //       const { data } = await httpClient.get(endpoints.company.getAll(), {
// // //         params: {
// // //           'group_id[]': [groupId]
// // //         }
// // //       });

// // //       if (data?.data) {
// // //         const formattedCompanies = data.data.map((company: any) => ({
// // //           label: company.name,
// // //           value: String(company.id),
// // //         }));

// // //         setCompanies(formattedCompanies);
// // //         if (formattedCompanies.length === 0) {
// // //           showNotification('info', 'No companies found for this group');
// // //         }
// // //       } else {
// // //         setCompanies([]);
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Failed to load companies:', error);
// // //       showNotification('danger', error.response?.data?.message || 'Failed to load companies');
// // //       setCompanies([]);
// // //     }
// // //   };

// // //   // Initial load of company groups
// // //   useEffect(() => {
// // //     loadCompanyGroups();
// // //   }, []);

// // //   // Load companies when company group changes
// // //   useEffect(() => {
// // //     if (selectedCompanyGroup?.value) {
// // //       setSelectedCompany(null);
// // //       loadCompanies(selectedCompanyGroup.value);
// // //     } else {
// // //       setCompanies([]);
// // //     }
// // //   }, [selectedCompanyGroup]);

// // //   const handleCompanyGroupChange = (value: Option | null) => {
// // //     setSelectedCompanyGroup(value);
// // //     // You can add additional logic here if needed
// // //   };

// // //   const handleCompanyChange = (value: Option | null) => {
// // //     setSelectedCompany(value);
// // //     // You can add additional logic here if needed
// // //   };

// // //   const handlePfCodeChange = (value: Option | null) => {
// // //     setSelectedPfCode(value);
// // //     // Trigger filter change
// // //     onFilterChange({
// // //       groupName: selectedCompanyGroup?.value || '',
// // //       companyName: value?.value || '',
// // //       pfCode: value?.value || ''
// // //     });
// // //   };

// // //   return (
// // //     <div className="flex gap-3">
// // //       <div className='w-full'>
// // //         <OutlinedInput
// // //           label="Group"
// // //           value={companyGroupName}
// // //           onChange={() => {}} // Placeholder to satisfy TypeScript
// // //           readOnly
// // //         />
// // //       </div>
      
// // //       <div className='w-full'>
// // //         <OutlinedSelect
// // //           label="Company"
// // //           options={companies}
// // //           value={selectedCompany}
// // //           onChange={handleCompanyChange}
// // //         />
// // //       </div>
      
// // //       <div className='w-full z-20'>
// // //         <OutlinedSelect
// // //           label="PF Code"
// // //           options={pfCodeOptions}
// // //           value={selectedPfCode}
// // //           onChange={handlePfCodeChange}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PFTrackerFilter;


// // import React, { useState, useEffect, useMemo } from 'react';
// // import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// // import OutlinedInput from '@/components/ui/OutlinedInput';
// // import { endpoints } from '@/api/endpoint';
// // import httpClient from '@/api/http-client';
// // import { Notification, toast } from '@/components/ui';
// // import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// // // Define the structure of your PFTrackerData
// // interface PFTrackerData {
// //   companyName: string;
// //   pfCode: string;
// //   location: string;
// //   month: string;
// //   noOfEmployees: number;
// //   wages: string;
// //   epsWage: string;
// //   totalChallanAmount: number;
// //   dueDate: string;
// //   dateOfPayment: string;
// //   delay: string;
// //   delayReason: string;
// //   typeOfChallan: string;
// //   trrnNo: string;
// //   crnNo: string;
// // }

// // type Option = {
// //   value: string;
// //   label: string;
// // };

// // interface PFTrackerFilterProps {
// //   data: PFTrackerData[];
// //   onFilterChange: (filters: {
// //     groupName: string;
// //     groupId: string;
// //     companyName: string;
// //     companyId: string;
// //     pfCode: string
// //   }) => void;
// // }

// // const PFTrackerFilter: React.FC<PFTrackerFilterProps> = ({ data, onFilterChange }) => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [companyGroupName, setCompanyGroupName] = useState('');
// //   const [companyGroupId, setCompanyGroupId] = useState('');
  
// //   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
// //   const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
// //   const [selectedPfCode, setSelectedPfCode] = useState<Option | null>(null);

// //   const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
// //   const [companies, setCompanies] = useState<Option[]>([]);
// //   const pfCodeOptions = useMemo(() =>
// //     Array.from(new Set(data.map(item => item.pfCode)))
// //       .filter(pfCode => pfCode !== undefined)
// //       .map(pfCode => ({ value: pfCode, label: pfCode })),
// //     [data]
// //   );

// //   const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
// //     toast.push(
// //       <Notification
// //         title={type.charAt(0).toUpperCase() + type.slice(1)}
// //         type={type}
// //       >
// //         {message}
// //       </Notification>
// //     );
// //   };

// //   // Load Company Groups
// //   const loadCompanyGroups = async () => {
// //     try {
// //       const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
// //         params: { ignorePlatform: true },
// //       });
      
// //       if (data.data && data.data.length > 0) {
// //         const defaultGroup = data.data[0];
// //         setCompanyGroupName(defaultGroup.name);
// //         setCompanyGroupId(String(defaultGroup.id));
// //         setSelectedCompanyGroup({
// //           value: String(defaultGroup.id),
// //           label: defaultGroup.name
// //         });
        
// //         // Trigger loading companies with the default group
// //         loadCompanies(String(defaultGroup.id));
// //       } else {
// //         showNotification('warning', 'No company group found');
// //       }
// //     } catch (error) {
// //       console.error('Failed to load company group:', error);
// //       showNotification('danger', 'Failed to load company group');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Load Companies based on selected Company Group
// //   const loadCompanies = async (groupId: string) => {
// //     try {
// //       const { data } = await httpClient.get(endpoints.company.getAll(), {
// //         params: {
// //           'group_id[]': [groupId]
// //         }
// //       });

// //       if (data?.data) {
// //         const formattedCompanies = data.data.map((company: any) => ({
// //           label: company.name,
// //           value: String(company.id),
// //         }));

// //         setCompanies(formattedCompanies);
// //         if (formattedCompanies.length === 0) {
// //           showNotification('info', 'No companies found for this group');
// //         }
// //       } else {
// //         setCompanies([]);
// //       }
// //     } catch (error: any) {
// //       console.error('Failed to load companies:', error);
// //       showNotification('danger', error.response?.data?.message || 'Failed to load companies');
// //       setCompanies([]);
// //     }
// //   };

// //   // Initial load of company groups
// //   useEffect(() => {
// //     loadCompanyGroups();
// //   }, []);

// //   // Load companies when company group changes
// //   useEffect(() => {
// //     if (selectedCompanyGroup?.value) {
// //       setSelectedCompany(null);
// //       loadCompanies(selectedCompanyGroup.value);
// //     } else {
// //       setCompanies([]);
// //     }
// //   }, [selectedCompanyGroup]);

// //   const handleCompanyGroupChange = (value: Option | null) => {
// //     setSelectedCompanyGroup(value);
// //     // Reset company and PF code selections
// //     setSelectedCompany(null);
// //     setSelectedPfCode(null);
// //   };

// //   const handleCompanyChange = (value: Option | null) => {
// //     setSelectedCompany(value);
// //     setSelectedPfCode(null);
// //     // Trigger filter change
// //     onFilterChange({
// //       groupName: selectedCompanyGroup?.label || '',
// //       groupId: selectedCompanyGroup?.value || '',
// //       companyName: value?.label || '',
// //       companyId: value?.value || '',
// //       pfCode: ''
// //     });
// //   };

// //   const handlePfCodeChange = (value: Option | null) => {
// //     setSelectedPfCode(value);
// //     // Trigger filter change
// //     onFilterChange({
// //       groupName: selectedCompanyGroup?.label || '',
// //       groupId: selectedCompanyGroup?.value || '',
// //       companyName: selectedCompany?.label || '',
// //       companyId: selectedCompany?.value || '',
// //       pfCode: value?.value || ''
// //     });
// //   };

// //   return (
// //     <div className="flex gap-3">
// //       <div className='w-full'>
// //         <OutlinedSelect
// //           label="Group"
// //           options={companyGroups}
// //           value={selectedCompanyGroup}
// //           onChange={handleCompanyGroupChange}
// //         />
// //       </div>
      
// //       <div className='w-full'>
// //         <OutlinedSelect
// //           label="Company"
// //           options={companies}
// //           value={selectedCompany}
// //           onChange={handleCompanyChange}
// //           // disabled={!selectedCompanyGroup}
// //         />
// //       </div>
      
// //       <div className='w-full z-20'>
// //         <OutlinedSelect
// //           label="PF Code"
// //           options={pfCodeOptions}
// //           value={selectedPfCode}
// //           onChange={handlePfCodeChange}
// //           // disabled={!selectedCompany}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default PFTrackerFilter;


// import React, { useState, useEffect, useMemo } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';
// import { Notification, toast } from '@/components/ui';

// type Option = {
//   value: string;
//   label: string;
// };

// interface PFTrackerFilterProps {
//   onFilterChange: (filters: {
//     groupName: string;
//     groupId: string;
//     companyName: string;
//     companyId: string;
//     pfCode: string
//   }) => void;
// }

// const PFTrackerFilter: React.FC<PFTrackerFilterProps> = ({ onFilterChange }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [companyGroupName, setCompanyGroupName] = useState('');
//   const [companyGroupId, setCompanyGroupId] = useState('');
  
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<Option | null>(null);
//   const [selectedCompany, setSelectedCompany] = useState<Option | null>(null);
//   const [selectedPfCode, setSelectedPfCode] = useState<Option | null>(null);

//   const [companyGroups, setCompanyGroups] = useState<Option[]>([]);
//   const [companies, setCompanies] = useState<Option[]>([]);
//   const [pfCodeOptions, setPfCodeOptions] = useState<Option[]>([]);

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
//         const defaultGroup = data.data[0];
//         setCompanyGroupName(defaultGroup.name);
//         setCompanyGroupId(String(defaultGroup.id));
//         setSelectedCompanyGroup({
//           value: String(defaultGroup.id),
//           label: defaultGroup.name
//         });
        
//         // Trigger loading companies with the default group
//         loadCompanies(String(defaultGroup.id));
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

//   // Load PF Codes based on selected Company
//   const loadPFCodes = async (companyId: string) => {
//     try {
//       const { data } = await httpClient.get(endpoints.pfSetup.getAll(), {
//         params: {
//           'company_id[]': [companyId]
//         }
//       });

//       if (data?.data) {
//         const formattedPFCodes = data.data.map((pfsetup: any) => ({
//           label: pfsetup.pf_code,
//           value: pfsetup.pf_code,
//           // You might want to store additional metadata if needed
//           companyId: String(pfsetup.company_id),
//           groupId: String(pfsetup.group_id)
//         }));

//         setPfCodeOptions(formattedPFCodes);
//         if (formattedPFCodes.length === 0) {
//           showNotification('info', 'No PF Codes found for this company');
//         }
//       } else {
//         setPfCodeOptions([]);
//       }
//     } catch (error: any) {
//       console.error('Failed to load PF Codes:', error);
//       showNotification('danger', error.response?.data?.message || 'Failed to load PF Codes');
//       setPfCodeOptions([]);
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
//       setSelectedPfCode(null);
//       loadCompanies(selectedCompanyGroup.value);
//     } else {
//       setCompanies([]);
//       setPfCodeOptions([]);
//     }
//   }, [selectedCompanyGroup]);

//   // Load PF Codes when company changes
//   useEffect(() => {
//     if (selectedCompany?.value) {
//       setSelectedPfCode(null);
//       loadPFCodes(selectedCompany.value);
//     } else {
//       setPfCodeOptions([]);
//     }
//   }, [selectedCompany]);

//   const handleCompanyGroupChange = (value: Option | null) => {
//     setSelectedCompanyGroup(value);
//     // Reset company and PF code selections
//     setSelectedCompany(null);
//     setSelectedPfCode(null);
//   };

//   const handleCompanyChange = (value: Option | null) => {
//     setSelectedCompany(value);
//     setSelectedPfCode(null);
//   };

//   const handlePfCodeChange = (value: Option | null) => {
//     setSelectedPfCode(value);
//     // Trigger filter change
//     onFilterChange({
//       groupName: selectedCompanyGroup?.label || '',
//       groupId: selectedCompanyGroup?.value || '',
//       companyName: selectedCompany?.label || '',
//       companyId: selectedCompany?.value || '',
//       pfCode: value?.value || ''
//     });
//   };

//   return (
//     <div className="flex gap-3">
//       <div className='w-full'>
//         <OutlinedSelect
//           label="Group"
//           options={companyGroups}
//           value={selectedCompanyGroup}
//           onChange={handleCompanyGroupChange}
//         />
//       </div>
      
//       <div className='w-full'>
//         <OutlinedSelect
//           label="Company"
//           options={companies}
//           value={selectedCompany}
//           onChange={handleCompanyChange}
//           // disabled={!selectedCompanyGroup}
//         />
//       </div>
      
//       <div className='w-full z-20'>
//         <OutlinedSelect
//           label="PF Code"
//           options={pfCodeOptions}
//           value={selectedPfCode}
//           onChange={handlePfCodeChange}
//           // disabled={!selectedCompany}
//         />
//       </div>
//     </div>
//   );
// };

// export default PFTrackerFilter;

import React, { useState, useEffect, useMemo } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

type Option = {
  value: string;
  label: string;
};

interface PFTrackerFilterProps {
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    pfCode: string 
  }) => void;
}

const PFTrackerFilter: React.FC<PFTrackerFilterProps> = ({ onFilterChange }) => {
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
          // disabled={!selectedCompanyGroup}
        />
      </div>
      
      <div className='flex-1 min-w-[140px]'>
        <OutlinedSelect
          label="PF Code"
          options={pfCodeOptions}
          value={selectedPfCode}
          onChange={handlePfCodeChange}
          // disabled={!selectedCompany}
        />
      </div> 
    </div>
  );
};

export default PFTrackerFilter;