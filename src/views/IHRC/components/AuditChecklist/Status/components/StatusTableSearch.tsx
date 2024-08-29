import React from 'react';
import { Input } from '@/components/ui';

interface StatusTableSearchProps {
  onSearch: (searchTerm: string) => void;
}

const StatusTableSearch: React.FC<StatusTableSearchProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      size="sm"
      className="min-w-[130px]"
      onChange={handleSearch}
    />
  );
};

export default StatusTableSearch;