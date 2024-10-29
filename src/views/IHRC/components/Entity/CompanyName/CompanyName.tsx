// import React, { useState, useEffect, useCallback } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import CompanyNameTool from './components/CompanyNameTool';
// import CompanyNameTable from './components/CompanyNameTable';
// import { EntityData } from '@/views/IHRC/store/dummyEntityData'; 
// import { useAppDispatch } from '@/store';
// import { CompanyGroupData } from '@/@types/companyGroup';
// import { fetchCompanies } from '@/store/slices/company/companySlice';
// import { CompanyData } from '@/@types/company';

// const CompanyName = () => {
//   const dispatch = useAppDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [companyData, setCompanyData] = useState<CompanyData[]>([]);

//   const fetchCompanyDataTable = async () => {
//       setIsLoading(true);
//       try {
//           const { payload: data }: any = await dispatch(fetchCompanies());
//           if (data && data.data) {
//             setCompanyData(data.data);
//             console.log("The data is:",companyData)
//         }
//       } catch (error) {
//           console.error('Failed to fetch company groups:', error);
//       }
//       setIsLoading(false);
//   };

//   // Initial data fetch
//   useEffect(() => {
//       fetchCompanyDataTable();
//   }, []);

//   // Handler to refresh data after changes
//   const handleDataChange = () => {
//       fetchCompanyDataTable();
//   };


//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//         <div className="mb-4 lg:mb-0">
//           <h3 className="text-2xl font-bold">Company Manager</h3>
//         </div>
//         <CompanyNameTool onDataChange={handleDataChange} />
//       </div>
//       <CompanyNameTable />
//     </AdaptableCard>
//   );
// };

// export default CompanyName;

// CompanyName.tsx
import React, { useState, useEffect } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import CompanyNameTool from './components/CompanyNameTool';
import CompanyNameTable from './components/CompanyNameTable';
import { useAppDispatch } from '@/store';
import { fetchCompanies } from '@/store/slices/company/companySlice';
import { CompanyData } from '@/@types/company';

const CompanyName = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);

  const fetchCompanyDataTable = async () => {
    setIsLoading(true);
    try {
      const { payload: data }: any = await dispatch(fetchCompanies());
      console.log("**********",data.data);
     
      if (data && data.data) {
        setCompanyData(data?.data?.map((v: any) => ({     ...v,    company_group_name: v?.CompanyGroup?.name })) || []);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanyDataTable();
  }, []);

  const handleDataChange = () => {
    fetchCompanyDataTable();
    console.log(companyData)
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Company Manager</h3>
        </div>
        <CompanyNameTool onDataChange={handleDataChange} />
      </div>
      <CompanyNameTable 
        onDataChange={handleDataChange}
        companyData={companyData}
        isLoading={isLoading}
      />
    </AdaptableCard>
  );
};

export default CompanyName;
