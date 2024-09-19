import React, { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard';
import PTRCTrackerTool from './components/PTRCTrackerTool';
import PTRCTrackerTable from './components/PTRCTrackerTable';

const PTRCTracker = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PT RC Tracker</h3>
        </div>
        <PTRCTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PTRCTrackerTable filters={filters} />
    </AdaptableCard>
  );
};

export default PTRCTracker