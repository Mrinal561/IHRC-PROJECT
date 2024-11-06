import React, { useState, useEffect, useCallback } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import LocationTool from './components/LocationTool';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import LocationTable from './components/LocationTable';


const Location = () => {
  const [locationData, setLocationData] = useState<EntityData[]>([]);
  const [entityData, setEntityData] = useState<EntityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Location Manager</h3>
        </div>
        <LocationTool />
      </div>
      <LocationTable />
    </AdaptableCard>
  );
};

export default Location;