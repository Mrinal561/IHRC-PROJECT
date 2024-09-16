import React from 'react';
import { Button } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import Bu from './Bu';
// import Filter from './Filter';

const UserTool: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBranch = () => {
    navigate(`/add-user`);
  };

  return (
    <div className='flex gap-3'>
      {/* <Filter></Filter> */}
      <Bu></Bu>
      <Button variant="solid" onClick={handleAddBranch} icon={<HiPlusCircle />} size="sm">
        Add User
      </Button>
    </div>
  );
};

export default UserTool;