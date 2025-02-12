



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import PFSetupTable from './components/PFSetupTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { PFData } from '@/@types/pfData';
import CompanyName from '../CompanyName/CompanyName';

interface LocationState {
  companyName?: string;
  companyGroupName?: string;
}

const CompanyPFSetupPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [pfSetupData, setPfSetupData] = useState<PFData[]>([]);
  // const actualCompanyName = location.state?.companyName || decodeURIComponent(companyName || '').replace(/-/g, ' ');
  // const actualCompanyGroupName = locationState?.companyGroupName || '';
  const locationState = location.state as { 
    companyName?: string; 
    companyGroupName?: string; 
    companyId?: string; // Add companyId to the type
    groupId?: string;
  };
  const actualCompanyId = locationState?.companyId;
  const actualCompanyName = locationState?.companyName;
  const actualGroupName = locationState?.companyGroupName;
  const actualGroupId = locationState?.groupId;
  const [pagination, setPagination] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
});

  const fetchPFSetupData = async () => {
    setIsLoading(true);
    try {
      console.log(actualCompanyId)
      const response = await httpClient.get(endpoints.pfSetup.getAll(), {
        params: {
          'company_id[]': actualCompanyId,
          page: pagination.pageIndex,
          page_size: pagination.pageSize
      }
      });
      if (response?.data.data) {
        setPfSetupData(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.paginate_data.totalResults
      }));
      }

      console.log('Fetched PF Setup data:', response.data.data);
    } catch (error) {
      console.error('Error fetching PF Setup data:', error);
      throw error;
    } finally{
      setIsLoading(false)
    }
  };
  const handlePaginationChange = (page: number) => {
    setPagination(prev => ({ ...prev, pageIndex: page }));
};

const handlePageSizeChange = (newPageSize: number) => {
    setPagination(prev => ({
        ...prev,
        pageSize: newPageSize,
        pageIndex: 1, // Reset to first page when changing page size
    }));
};

   const refreshPFSetupData = () => {
    fetchPFSetupData();
    // showNotification('PF Setup data refreshed successfully');
  };

  useEffect(() => {
    if(actualCompanyName){
      fetchPFSetupData();
    }
  }, [actualCompanyName, pagination.pageIndex, pagination.pageSize]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPFSetup = () => {
    console.log(actualCompanyName,actualGroupName)
    navigate(`/add-pf-setup`, {
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
          <h1 className="text-2xl font-bold"> {actualCompanyName} - PF Setup</h1>
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

      <PFSetupTable data={pfSetupData}  onRefresh={refreshPFSetupData}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      onPageSizeChange={handlePageSizeChange}
      isLoading={isLoading}
      companyName={actualCompanyName}
      companyId={actualCompanyId}
      groupId={actualGroupId}
      groupName={actualGroupName}
      />
    </div>
  );
};

export default CompanyPFSetupPage;