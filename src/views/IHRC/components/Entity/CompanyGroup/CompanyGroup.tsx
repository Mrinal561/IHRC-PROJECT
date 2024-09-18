import React, { useState, useEffect } from 'react';
import CompanyGroupTool from './components/CompanyGroupTool';
import CompanyTable from './components/CompanyTable';
import AdaptableCard from '@/components/shared/AdaptableCard';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';  // Adjust import path as needed

const CompanyGroup = () => {
  
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Company Group Manager</h3>
        </div>
        <CompanyGroupTool />
      </div>
      <CompanyTable/>
    </AdaptableCard>
  );
};

export default CompanyGroup;