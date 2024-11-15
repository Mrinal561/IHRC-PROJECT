import  AdaptableCard  from '@/components/shared/AdaptableCard'
import ESITrackerTable from './components/ESITrackerTable';
import ESITrackerTool from './components/ESITrackerTool';
import React, { useEffect, useState } from 'react'
import { esiChallanData } from '@/@types/esiTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const ESITracker = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

  const [data, setData] = useState<esiChallanData[]>([]);


  useEffect(() => {
    fetchEsiTrackerData();
  }, []);

  const fetchEsiTrackerData = async () => {
    try {
      const res = await httpClient.get(endpoints.esiTracker.getAll())
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PF tracker data:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">ESI Tracker</h3>
        </div>
        <ESITrackerTool onFilterChange={handleFilterChange} />
      </div>
      <ESITrackerTable dataSent={data}/>
    </AdaptableCard>
  )
}

export default ESITracker