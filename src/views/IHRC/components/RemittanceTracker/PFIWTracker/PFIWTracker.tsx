import React, { useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFIWTrackerTable from './components/PFIWTrackerTable';
import PFIWTrackerTool from './components/PFIWTrackerTool';



const PFIWTracker: React.FC = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PF IW Tracker</h3>
        </div>
        <PFIWTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PFIWTrackerTable filters={filters} />
    </AdaptableCard>
  );
};

export default PFIWTracker