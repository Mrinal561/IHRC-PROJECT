import React, { useCallback, useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFTrackerTool from './components/PFTrackerTool';
import PFTrackerTable from './components/PFTrackerTable';
import { PfChallanData } from '@/@types/pfTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import Loading from '@/components/shared/Loading';



const PFTracker: React.FC = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });
  const [data, setData] = useState<PfChallanData[]>([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    fetchPFTrackerData();
  }, []);

  const fetchPFTrackerData = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await httpClient.get(endpoints.tracker.pfGetALl())
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PF tracker data:', error);
    }
    finally {
      setIsLoading(false)
    }
  }, []);
    useEffect(() => {
    fetchPFTrackerData();
  }, [fetchPFTrackerData]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="">
          <h3 className="text-2xl font-bold">PF Tracker</h3>
        </div>
        <PFTrackerTool onFilterChange={handleFilterChange}  />
      </div>
      <PFTrackerTable loading={isLoading} dataSent={data} onRefresh={ fetchPFTrackerData} />
    </AdaptableCard>
  );
};

export default PFTracker