// import React, { useState } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import PFIWTrackerTable from './components/PFIWTrackerTable';
// import PFIWTrackerTool from './components/PFIWTrackerTool';



// const PFIWTracker: React.FC = () => {
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };


//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//         <div className="mb-4 lg:mb-0">
//           <h3 className="text-2xl font-bold">PF IW Tracker</h3>
//         </div>
//         <PFIWTrackerTool onFilterChange={handleFilterChange} />
//       </div>
//       <PFIWTrackerTable filters={filters} />
//     </AdaptableCard>
//   );
// };

// export default PFIWTracker

import React, { useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFIWTrackerTable from './components/PFIWTrackerTable';
import PFIWTrackerTool from './components/PFIWTrackerTool';
import { PfiwChallanData } from '@/@types/PfiwChallanData'; // Make sure to create this type
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import Loading from '@/components/shared/Loading';

const PFIWTracker: React.FC = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });
  const [data, setData] = useState<PfiwChallanData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPFIWTrackerData();
  }, []);

  const fetchPFIWTrackerData = async () => {
    setIsLoading(true);
    try {
      const res = await httpClient.get(endpoints.tracker.pfiwGetAll());
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PFIW tracker data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="">
          <h3 className="text-2xl font-bold">PF IW Tracker</h3>
        </div>
        <PFIWTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PFIWTrackerTable loading={isLoading} dataSent={data} />
    </AdaptableCard>
  );
};

export default PFIWTracker;