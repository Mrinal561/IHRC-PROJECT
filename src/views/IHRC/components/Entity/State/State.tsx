
import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import StateTool from './components/StateTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import StateTable from './components/StateTable';

const State = () => {
  const [stateData, setStateData] = useState<EntityData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">State Manager</h3>
        </div>
        <StateTool />
      </div>
      <StateTable/>
    </AdaptableCard>
  );
};

export default State;