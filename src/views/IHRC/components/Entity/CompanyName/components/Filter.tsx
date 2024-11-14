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

// const Filter: React.FC = () => {
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
//     <div className=" flex gap-3 z-20">    
//         <div className='w-52'>
//         <OutlinedSelect
//         label="Company Group"
//         options={groupOptions}
//         value={groupOptions.find((option) => option.value === currentGroup)}
//         onChange={handleGroupChange}
//       />
//         </div>
//     </div>
//   );
// };

// export default Filter;

import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

type Option = {
  value: string;
  label: string;
};

const Filter: React.FC = () => {
  const [groupOptions, setGroupOptions] = useState<Option[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Option | null>(null);

  useEffect(() => {
    const fetchCompanyGroups = async () => {
      try {
        const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
          params: { ignorePlatform: true },
        });
        const formattedGroupOptions = data.data.map((group: any) => ({
          value: String(group.id),
          label: group.name,
        }));
        setGroupOptions(formattedGroupOptions);
      } catch (error) {
        console.error('Failed to load company groups:', error);
      }
    };
    fetchCompanyGroups();
  }, []);

  const handleGroupChange = (selectedOption: Option | null) => {
    setSelectedGroup(selectedOption);
    // You can add any additional logic here that needs to happen when the group changes
  };

  return (
    <div className=" flex gap-3 z-20">
      <div className="w-52">
        <OutlinedSelect
          label="Company Group"
          options={groupOptions}
          value={selectedGroup}
          onChange={handleGroupChange}
        />
      </div>
    </div>
  );
};

export default Filter;