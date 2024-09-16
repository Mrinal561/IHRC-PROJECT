
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdaptableCard from '@/components/shared/AdaptableCard';
import BranchTool from './components/BranchTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import BranchTable from './components/BranchTable';
import AddBranchForm from './components/BranchForm';

interface BranchData extends EntityData {
  Branch: string;
  BranchAddress: string;
  BranchOpeningDate: string;
  BranchHeadCount: string;
  AuthorityName: string;
  AuthorityAddress: string;
}

const Branch = () => {
  const [branchData, setBranchData] = useState<BranchData[]>([]);
  const [locationData, setLocationData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-2xl font-bold">Branch Manager</h3>
              </div>
              <BranchTool />
            </div>
            <BranchTable />
          </AdaptableCard>
        }
      />
      <Route
        path="/add-branch"
        element={
          <AddBranchForm/>
        }
      />
    </Routes>
  );
};

export default Branch;