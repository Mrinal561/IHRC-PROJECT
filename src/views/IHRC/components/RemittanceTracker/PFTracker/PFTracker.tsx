import React, { useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFTrackerTool from './components/PFTrackerTool';
import PFTrackerTable from './components/PFTrackerTable';



const PFTracker: React.FC = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PF Tracker</h3>
        </div>
        <PFTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PFTrackerTable filters={filters} />
    </AdaptableCard>
  );
};

export default PFTracker