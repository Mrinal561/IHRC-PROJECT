import React, { useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard';
import PTECTrackerTool from './components/PTECTrackerTool';
import PTECTrackerTable from './components/PTECTrackerTable';
import { PTTrackerData } from '@/@types/PTTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const PTECTracker = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });
  const [data, setData] = useState<PTTrackerData[]>([]);
  const [isLoading, setIsLoading] = useState(false)



  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };


  useEffect(() => {
    fetchPTTrackerData();
  }, []);

  const fetchPTTrackerData = async () => {
    setIsLoading(true)

    try {
      const res = await httpClient.get(endpoints.ptec.getAll())
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PT tracker data:', error);
    } finally {
      setIsLoading(false)
  }
  };


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PT EC Tracker</h3>
        </div>
        <PTECTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PTECTrackerTable dataSent={data}  loading={isLoading}/>
    </AdaptableCard>
  );
};

export default PTECTracker