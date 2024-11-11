
import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import BranchTool from './components/BranchTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import BranchTable from './components/BranchTable';
import AddBranchForm from './components/BranchForm';
import { fetchBranches } from '@/store/slices/branch/branchSlice';
import { useAppDispatch } from '@/store';
import { BranchData } from '@/@types/branch';
import { toast, Notification } from '@/components/ui';
import Company from '../../Home/components/Company';


const Branch = () => {
 
  return (
          <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col flex-wrap lg:flex-row lg:items-center justify-between gap-8 mb-10">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-2xl font-bold">Branch Manager</h3>
              </div>
              <div>
              <BranchTool />
              {/* <Company></Company> */}
              </div>
            </div>
            <BranchTable 
            />
          </AdaptableCard>
  );
};

export default Branch;