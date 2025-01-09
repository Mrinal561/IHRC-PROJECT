import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import { fetchUsers } from '@/store/slices/userEntity/UserEntitySlice';

const UserTool: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyDetails, setCompanyDetails] = useState<{ id: number; name: string } | null>(null);

  const handleClick = () => {
    navigate('/add-user', {
      state: {
        companyName: companyDetails?.name,
        companyId: companyDetails?.id,
      },
    });
    console.log("hitting");
  };

  const fetchCompanyData = async () => {
    try {
      const { data } = await dispatch(fetchUsers()).unwrap(); 
      console.log(data);
  
      // Check if data exists and has at least one entry
      if (Array.isArray(data) && data.length > 0) {
        const companyDetails = data[0]?.group_details;
        if (companyDetails) {
          setCompanyDetails({ id: companyDetails.id, name: companyDetails.name });
          console.log('Extracted Company Details:', { id: companyDetails.id, name: companyDetails.name });
        } else {
          console.warn('Company details not found in the first entry.');
        }
      } else {
        console.warn('Data is not in the expected array format or is empty.');
      }
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    }
  };
  
  useEffect(() => {
    console.log("Inside user tool now");
    fetchCompanyData();
  }, []);
  

  return (
    <div className='flex gap-3'>
      <Button variant="solid" icon={<HiPlusCircle />} size="sm" onClick={handleClick}>
        Add User
      </Button>
    </div>
  );
};

export default UserTool;
