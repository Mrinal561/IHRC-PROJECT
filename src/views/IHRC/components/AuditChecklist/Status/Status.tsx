import React, { useState } from 'react';
import StatusTable from './components/StatusTable';
import StatusCard from './components/StatusCard';

const Status: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');

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
      <h3 className="mb-4 lg:mb-0">Status</h3>
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