
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import PTSetupTable from './components/PTSetupTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { PTSetupData } from '@/@types/PtSetup';
import { fetchptsetup } from '@/store/slices/ptSetup/ptSetupSlice';
import { useDispatch } from 'react-redux';

interface LocationState {
  companyName?: string;
  companyGroupName?: string;
}

const PTSetupPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [ptSetupData, setPTSetupData] = useState<PTSetupData[]>([]);
  const dispatch = useDispatch();
    const locationState = location.state as { 
    companyName?: string; 
    companyGroupName?: string; 
    companyId?: string; 
    groupId?: string;
  };
  const actualCompanyId = locationState?.companyId;
  const actualCompanyName = locationState?.companyName;
  const actualGroupName = locationState?.companyGroupName;
  const actualGroupId = locationState?.groupId;
  const fetchPTSetupData = async () => {
    try {
      const response = await await httpClient.get(endpoints.ptSetup.getAll(), {
        params: {
          'company_id[]' : actualCompanyId,
        }
      });
      console.log('Fetched PT Setup data:', response.data.data);
      setPTSetupData(response.data.data);
    } catch (error) {
      console.error('Error fetching PT Setup data:', error);
      throw error;
    }
  };

       const refreshPTSetupData = () => {
    fetchPTSetupData();
    // showNotification('PF Setup data refreshed successfully');
  };

  useEffect(() => {
    console.log(actualCompanyId,actualCompanyName, actualGroupId, actualGroupName)
    fetchPTSetupData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPTSetup = () => {
    navigate(`/add-pt-setup`, {
      state: {
        companyName: actualCompanyName,
        companyGroupName: actualGroupName,
        companyId: actualCompanyId,
        groupId: actualGroupId
      }
    });
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
          <h1 className="text-2xl font-bold">{actualCompanyName}-PT Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={handleAddPTSetup}
        >
          Add PT Setup
        </Button>
      </div>

      <PTSetupTable data={ptSetupData}  onRefresh={refreshPTSetupData} />
    </div>
  );
};

export default PTSetupPage;