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
const [pagination, setPagination] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10
  });


  // useEffect(() => {
  //   fetchPFTrackerData();
  // }, []);

  const fetchPFTrackerData = useCallback(async(page: number, pageSize: number)  => {
    setIsLoading(true)
     try {
      const res = await httpClient.get(endpoints.tracker.pfGetALl(), {
        params: {
          page,
          page_size: pageSize
        }
      });
      console.log(res.data.data)
       setData(res.data.data);
       setPagination(prev => ({
        ...prev,
        total: res.data.total || res.data.data.length
      }));
    } catch (error) {
      console.error('Error fetching PF tracker data:', error);
    }
    finally {
      setIsLoading(false)
    }
  }, []);
    useEffect(() => {
    fetchPFTrackerData(pagination.pageIndex, pagination.pageSize);
  }, [fetchPFTrackerData, pagination.pageIndex, pagination.pageSize]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

   const handlePaginationChange = (page: number) => {
    setPagination(prev => ({ ...prev, pageIndex: page }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 1 // Reset to first page when changing page size
    }));
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="">
          <h3 className="text-2xl font-bold">PF Tracker</h3>
        </div>
        <PFTrackerTool onFilterChange={handleFilterChange}  />
      </div>
      <PFTrackerTable
        loading={isLoading}
        dataSent={data}
        onRefresh={() => fetchPFTrackerData(pagination.pageIndex, pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </AdaptableCard>
  );
};

export default PFTracker