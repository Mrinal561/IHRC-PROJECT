import React from 'react';
import { Input } from '@/components/ui';
import { HiOutlineSearch } from 'react-icons/hi';

interface StatusTableSearchProps {
  onSearch: (searchTerm: string) => void;
}

const OutputTableSearch: React.FC<StatusTableSearchProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
            className="w-44"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
        />
  );
};

export default OutputTableSearch;