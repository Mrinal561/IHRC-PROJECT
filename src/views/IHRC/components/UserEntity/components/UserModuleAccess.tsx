import React, { useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { fetchUsers } from '@/store/slices/userEntity/UserEntitySlice';
import UserAccessTable from './UserAccessTable';
// import UserTable from './components/UserTable';

const UserModuleAccess = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [key, setKey] = useState(0);

  const refreshData = () => {
    setKey(prev => prev + 1);
  };

  const fetchUserData = async (page = 1, pageSize = 10) => {
    setIsLoading(true);
    try {
      // Replace this with your actual user fetch action
      const data = await dispatch(fetchUsers());
      setUserData(data.payload.data);
      console.log('User Data:', data.payload.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      showErrorNotification('Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Initial User Management Rendering");
    fetchUserData();
  }, [key]);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">User Management</h3>
        </div>
      </div>

      <UserAccessTable 
        userData={userData}
        isLoading={isLoading}
        onDataChange={fetchUserData}
      />
    </AdaptableCard>
  );
};

export default UserModuleAccess;