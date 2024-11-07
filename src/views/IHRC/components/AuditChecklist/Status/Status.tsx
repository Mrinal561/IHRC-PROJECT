import React, { useEffect, useState } from 'react';
import StatusTable from './components/StatusTable';
import StatusCard from './components/StatusCard';
import Company from '../../Home/components/Company';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';

const Status: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchStatusData = async () => {
  //   console.log('Fetching status data...');
    
  //   setIsLoading(true);
  //   try {
  //     const response = await httpClient.get(endpoints.due.getAll(), {
  //       params: {
  //         data_status: ['pending']
  //       }
  //     });
  //     console.log('API Response:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching status data:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log('Initial component mount - Fetching data...');
  //   fetchStatusData();
  // }, []);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearAll = () => {
    setCurrentFilter('Pending');
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Status</h3>
                    <p className="text-gray-600">View your company's compliance status</p>
                </div>
      </div>
      <div className='mb-4'>
      <Company />
      </div>
      <div>
        <StatusCard />
      </div>
      <div>
        <StatusTable
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClearAll={handleClearAll}
          currentFilter={currentFilter}
        />
      </div>
    </div>
  );
};

export default Status;