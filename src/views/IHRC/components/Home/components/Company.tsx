
// import React, { useState, useEffect } from 'react';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import DashboardFilter from './DashboardFilter';
// import CustomDateRangePicker from './CustomDateRangePicker';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';
// import { Notification, toast } from '@/components/ui';

// const dummyData = {
//   companyGroups: [
//     { value: 'cg1', label: 'Company Group 1' },
//     { value: 'cg2', label: 'Company Group 2' },
//   ],
//   companies: [
//     { value: 'c1', label: 'CEAT' },
//     { value: 'c2', label: 'MRF' },
//   ],
//   states: [
//     { value: 's1', label: 'Bihar' },
//     { value: 's2', label: 'West Bengal' },
//   ],
//   cities: [
//     { value: 'city1', label: 'Muzaffarpur' },
//     { value: 'city2', label: 'Patna' },
//   ],
// };

// const Company = () => {
//   const [selectedCompanyGroup, setSelectedCompanyGroup] = useState(dummyData.companyGroups[0]);
//   const [selectedCompany, setSelectedCompany] = useState(dummyData.companies[0]);
//   const [selectedState, setSelectedState] = useState(dummyData.states[0]);
//   const [selectedCity, setSelectedCity] = useState(dummyData.cities[0]);
//   const [selectedBranch, setSelectedBranch] = useState(null);
//   const [branches, setBranches] = useState([]);
//   const [isLoadingBranches, setIsLoadingBranches] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Load branches
//   const loadBranches = async () => {
//     setIsLoadingBranches(true);
//     try {
//       const { data } = await httpClient.get(endpoints.branch.getAll());
      
//       const formattedBranches = data.data.map((branch: any) => ({
//         label: branch.name,
//         value: String(branch.id),
//       }));
      
//       setBranches(formattedBranches);
      
//       // Reset selected branch if current selection is not in new branch list
//       if (selectedBranch && !formattedBranches.find(b => b.value === selectedBranch.value)) {
//         setSelectedBranch(formattedBranches[0] || null);
//       }
//     } catch (error) {
//       console.error('Failed to load branches:', error);
//       toast.push(
//         <Notification title="Error" type="danger">
//           Failed to load branches
//         </Notification>
//       );
//       setBranches([]);
//       setSelectedBranch(null);
//     } finally {
//       setIsLoadingBranches(false);
//     }
//   };

//   // Fetch branches when company, state, or city changes
//   useEffect(() => {
//     if (selectedCompany?.value && selectedState?.value && selectedCity?.value) {
//       loadBranches();
//     }
//   }, [selectedCompany, selectedState, selectedCity]);

//   const handleDateRangeApply = (start: Date, end: Date) => {
//     setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//     <div className="flex gap-3 items-center">
//       <div className="w-48 z-auto">
//         <OutlinedSelect
//           label="Company Group"
//           value={selectedCompanyGroup}
//           onChange={setSelectedCompanyGroup}
//           options={dummyData.companyGroups}
//         />
//       </div>

//       <div className="w-44 z-auto">
//         <OutlinedSelect
//           label="Company"
//           value={selectedCompany}
//           onChange={setSelectedCompany}
//           options={dummyData.companies}
//         />
//       </div>

//       <div className="w-44 z-auto">
//         <OutlinedSelect
//           label="State"
//           value={selectedState}
//           onChange={setSelectedState}
//           options={dummyData.states}
//         />
//       </div>

//       <div className="w-44 z-auto">
//         <OutlinedSelect
//           label="Location"
//           value={selectedCity}
//           onChange={setSelectedCity}
//           options={dummyData.cities}
//         />
//       </div>

//       <div className="w-44 z-auto">
//       <OutlinedSelect
//     label="Branch"
//     value={selectedBranch}
//     onChange={(selected) => {
//       console.log('Selected Branch:', {
//         label: selected?.label,
//         value: selected?.value
//       });
//       setSelectedBranch(selected);
//     }}
//     options={branches}
//   />
//       </div>

//       <CustomDateRangePicker onApply={handleDateRangeApply} />
//       <DashboardFilter />
//     </div>
//   );
// };

// export default Company;

import React, { useState, useEffect } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import DashboardFilter from './DashboardFilter';
import CustomDateRangePicker from './CustomDateRangePicker';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { Notification, toast } from '@/components/ui';

interface BranchOption {
  label: string;
  value: string;
}

interface CompanyProps {
  onBranchChange?: (branch: BranchOption | null) => void;
}

const dummyData = {
  companyGroups: [
    { value: 'cg1', label: 'Company Group 1' },
    { value: 'cg2', label: 'Company Group 2' },
  ],
  companies: [
    { value: 'c1', label: 'CEAT' },
    { value: 'c2', label: 'MRF' },
  ],
  states: [
    { value: 's1', label: 'Bihar' },
    { value: 's2', label: 'West Bengal' },
  ],
  cities: [
    { value: 'city1', label: 'Muzaffarpur' },
    { value: 'city2', label: 'Patna' },
  ],
};

const Company: React.FC<CompanyProps> = ({ onBranchChange }) => {
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState(dummyData.companyGroups[0]);
  const [selectedCompany, setSelectedCompany] = useState(dummyData.companies[0]);
  const [selectedState, setSelectedState] = useState(dummyData.states[0]);
  const [selectedCity, setSelectedCity] = useState(dummyData.cities[0]);
  const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
  const [branches, setBranches] = useState<BranchOption[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const loadBranches = async () => {
    setIsLoadingBranches(true);
    try {
      const { data } = await httpClient.get(endpoints.branch.getAll());
      
      const formattedBranches = data.data.map((branch: any) => ({
        label: branch.name,
        value: String(branch.id),
      }));
      
      setBranches(formattedBranches);
      
      if (selectedBranch && !formattedBranches.find(b => b.value === selectedBranch.value)) {
        const newBranch = formattedBranches[0] || null;
        setSelectedBranch(newBranch);
        onBranchChange?.(newBranch);
      }
    } catch (error) {
      console.error('Failed to load branches:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to load branches
        </Notification>
      );
      setBranches([]);
      const newBranch = null;
      setSelectedBranch(newBranch);
      onBranchChange?.(newBranch);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  useEffect(() => {
    if (selectedCompany?.value && selectedState?.value && selectedCity?.value) {
      loadBranches();
    }
  }, [selectedCompany, selectedState, selectedCity]);

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleBranchChange = (selected: BranchOption | null) => {
    setSelectedBranch(selected);
    onBranchChange?.(selected);
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="w-48 z-auto">
        <OutlinedSelect
          label="Company Group"
          value={selectedCompanyGroup}
          onChange={setSelectedCompanyGroup}
          options={dummyData.companyGroups}
        />
      </div>

      <div className="w-44 z-auto">
        <OutlinedSelect
          label="Company"
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={dummyData.companies}
        />
      </div>

      <div className="w-44 z-auto">
        <OutlinedSelect
          label="State"
          value={selectedState}
          onChange={setSelectedState}
          options={dummyData.states}
        />
      </div>

      <div className="w-44 z-auto">
        <OutlinedSelect
          label="Location"
          value={selectedCity}
          onChange={setSelectedCity}
          options={dummyData.cities}
        />
      </div>

      <div className="w-44 z-auto">
        <OutlinedSelect
          label="Branch"
          value={selectedBranch}
          onChange={handleBranchChange}
          options={branches}
        />
      </div>

      <CustomDateRangePicker onApply={handleDateRangeApply} />
      <DashboardFilter />
    </div>
  );
};

export default Company;