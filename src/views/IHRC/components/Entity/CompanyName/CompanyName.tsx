import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import CompanyNameTool from './components/CompanyNameTool';
import CompanyNameTable from './components/CompanyNameTable';
import { EntityData } from '@/views/IHRC/store/dummyEntityData'; 

const CompanyName = () => {
  const [companyData, setCompanyData] = useState<EntityData[]>([]);
  const [companyGroups, setCompanyGroups] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Company Manager</h3>
        </div>
        <CompanyNameTool />
      </div>
      <CompanyNameTable />
    </AdaptableCard>
  );
};

export default CompanyName;