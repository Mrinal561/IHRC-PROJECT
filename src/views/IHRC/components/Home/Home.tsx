

import React, { useEffect, useState } from 'react';
import DashboardContent from './components/DashboardContent';
import DashboardCard from './components/DashboardCard';
import IhrcDashboardHeader from './components/IhrcDashboardHeader';
import DashboardBody from './components/DashboardBody';
import { HiOutlineViewGrid } from 'react-icons/hi';
import MessageTicker from './components/staticDashboard/MessageTicker';


interface SelectOption {
  value: string;
  label: string;
}


const Home = () => {
  const [companyId, setCompanyId] = useState('');
  const [stateId, setStateId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      console.log('Company ID updated:', companyId);
  }, [companyId]);

  const handleCompanyChange = (newCompanyId: SelectOption | null) => {
      console.log('Received new company ID:', newCompanyId?.value || '');
      setCompanyId(newCompanyId?.value || '');
      
      if (!newCompanyId) {
          setStateId('');
          setDistrictId('');
          setLocationId('');
          setBranchId('');
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
      }
  };

  const handleStateChange = (newStateId: SelectOption | null) => {
      console.log('Received new state ID:', newStateId?.value || '');
      setStateId(newStateId?.value || '');
      
      if (!newStateId) {
          setDistrictId('');
          setLocationId('');
          setBranchId('');
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
      }
  };
  
  const handleDistrictChange = (newDistrictId: SelectOption | null) => {
      console.log('Received new district ID:', newDistrictId?.value || '');
      setDistrictId(newDistrictId?.value || '');
      
      if (!newDistrictId) {
          setLocationId('');
          setBranchId('');
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
      }
  };
  
  const handleLocationChange = (newLocationId: SelectOption | null) => {
      console.log('Received new location ID:', newLocationId?.value || '');
      setLocationId(newLocationId?.value || '');
      
      if (!newLocationId) {
          setBranchId('');
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
      }
  };
  
  const handleBranchChange = (newBranchId: SelectOption | null) => {
      console.log('Received new branch ID:', newBranchId?.value || '');
      setBranchId(newBranchId?.value || '');
      
      if (newBranchId?.value !== branchId) {
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
      }
  };

  return (
      <div className='flex flex-col gap-1 h-full'>
          <IhrcDashboardHeader 
              onCompanyChange={handleCompanyChange} 
              onStateChange={handleStateChange} 
              onDistrictChange={handleDistrictChange} 
              onLocationChange={handleLocationChange} 
              onBranchChange={handleBranchChange} 
          />
          <DashboardBody  
              companyId={companyId} 
              stateId={stateId} 
              districtId={districtId} 
              locationId={locationId} 
              branchId={branchId} 
              loading={loading} 
          />
      </div>
  );
};

export default Home;