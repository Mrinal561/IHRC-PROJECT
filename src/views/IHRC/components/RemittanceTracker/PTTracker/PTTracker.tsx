import React, { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard';
import PTTrackerTable from './components/PTTrackerTable'
import PTTrackerTool from './components/PTTrackerTool'

const PTTracker = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PT Tracker</h3>
        </div>
        <PTTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PTTrackerTable filters={filters} />
    </AdaptableCard>
  );
};

export default PTTracker