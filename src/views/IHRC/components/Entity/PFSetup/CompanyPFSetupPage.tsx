



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import PFSetupTable from './components/PFSetupTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { PFData } from '@/@types/pfData';

interface LocationState {
  companyName?: string;
  companyGroupName?: string;
}

const CompanyPFSetupPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [pfSetupData, setPfSetupData] = useState<PFData[]>([]);
  // const actualCompanyName = location.state?.companyName || decodeURIComponent(companyName || '').replace(/-/g, ' ');
  // const actualCompanyGroupName = locationState?.companyGroupName || '';
  const locationState = location.state as { 
    companyName?: string; 
    companyGroupName?: string; 
    companyId?: string; // Add companyId to the type
  };
  const actualCompanyId = locationState?.companyId;

  const fetchPFSetupData = async () => {
    try {
      console.log(actualCompanyId)
      const response = await httpClient.get(endpoints.pfSetup.getAll(), {
        params: {
          'company_id[]' : actualCompanyId,
        }
      });
      console.log('Fetched PF Setup data:', response.data.data);
      setPfSetupData(response.data.data);
    } catch (error) {
      console.error('Error fetching PF Setup data:', error);
      throw error;
    }
  };
  
   const refreshPFSetupData = () => {
    fetchPFSetupData();
    // showNotification('PF Setup data refreshed successfully');
  };

  useEffect(() => {
    fetchPFSetupData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPFSetup = () => {
    navigate(`/add-pf-setup`);
  };

  const showNotification = (message: string) => {
    toast.push(
      <Notification title="Success" type="success">
        <div className="flex items-center">
          <span>{message}</span>
        </div>
      </Notification>
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button
            variant="plain"
            size="sm"
            icon={<HiArrowLeft />}
            onClick={handleBack}
            className="mr-2"
          >
          </Button>
          <h1 className="text-2xl font-bold">PF Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={handleAddPFSetup}
        >
          Add PF Setup
        </Button>
      </div>

      <PFSetupTable data={pfSetupData}  onRefresh={refreshPFSetupData}/>
    </div>
  );
};

export default CompanyPFSetupPage;