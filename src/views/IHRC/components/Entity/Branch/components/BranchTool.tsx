
import React from 'react';
import { Button } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import Bu from './Bu';
import Filter from './Filter';

const BranchTool: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBranch = () => {
    navigate(`/add-branch`);
  };

  return (
    <div className='flex gap-3'>
      <Filter></Filter>
      <Bu></Bu>
      <Button variant="solid" onClick={handleAddBranch} icon={<HiPlusCircle />} size="sm">
        Assign Branch
      </Button>
    </div>
  );
};

export default BranchTool;

