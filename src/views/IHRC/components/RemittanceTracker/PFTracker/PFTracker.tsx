import React from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFTrackerTool from './components/PFTrackerTool';
import PFTrackerTable from './components/PFTrackerTable';



const PFTracker: React.FC = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PF Tracker</h3>
        </div>
        <PFTrackerTool />
      </div>
      <PFTrackerTable />
    </AdaptableCard>
  );
};

export default PFTracker