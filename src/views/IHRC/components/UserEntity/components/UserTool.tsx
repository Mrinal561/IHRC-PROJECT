import React from 'react';
import { Button } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import Bu from './Bu';
// import Filter from './Filter';

const UserTool: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-user');
    console.log("hitting")
  };

  return (
    <div className='flex gap-3'>
      {/* <Filter></Filter> */}
      {/* <Bu></Bu> */}
      <Button variant="solid" icon={<HiPlusCircle />} size="sm"  onClick={handleClick}>
        Add User
      </Button>
    </div>
  );
};

export default UserTool;