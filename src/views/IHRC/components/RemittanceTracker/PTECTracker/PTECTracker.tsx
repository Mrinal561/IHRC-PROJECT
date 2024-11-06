import React, { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard';
import PTECTrackerTool from './components/PTECTrackerTool';
import PTECTrackerTable from './components/PTECTrackerTable';

const PTECTracker = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PT EC Tracker</h3>
        </div>
        <PTECTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PTECTrackerTable filters={filters} />
    </AdaptableCard>
  );
};

export default PTECTracker