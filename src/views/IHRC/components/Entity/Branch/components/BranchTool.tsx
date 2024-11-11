
import React from 'react';
import { Button } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import Bu from './Bu';
import Filter from './Filter';
import Company from '../../../Home/components/Company';

const BranchTool: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBranch = () => {
    navigate(`/add-branch`);
  };

  return (
    <div className='flex gap-2 items-center w-full'>
      <Company/>
      {/* <div> */}
      {/* <Bu/> */}
      {/* </div> */}
      <Button variant="solid" onClick={handleAddBranch} icon={<HiPlusCircle />} size="sm">
        Add Branch
      </Button>
    </div>
  );
};

export default BranchTool;

