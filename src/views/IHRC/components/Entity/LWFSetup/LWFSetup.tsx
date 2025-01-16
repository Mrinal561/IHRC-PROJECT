

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import LWFSetupPanel from './components/LWFSetupPanel';
import LWFSetupTable from './components/LWFSetupTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { LWFSetupData } from '@/@types/lwfData';

interface LocationState {
  companyName?: string;
  companyGroupName?: string;
}

const LWFSetupPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [lwfSetupData, setLWFSetupData] = useState<LWFSetupData[]>([]);
  const locationState = location.state as { 
    companyName?: string; 
    companyGroupName?: string; 
    companyId?: string; // Add companyId to the type
    groupId?:string;
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

  const fetchLWFSetupData = async () => {
    try {
      const response = await httpClient.get(endpoints.lwfSetup.getAll(), {
        params: {
         'company_id[]': actualCompanyId,
                page: pagination.pageIndex,
                page_size: pagination.pageSize
        }
      });
      if (response?.data.data) {
        setLWFSetupData(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.paginate_data.totalResults
      }));
      }
    } catch (error) {
      console.error('Error fetching LWF Setup data:', error);
      showNotification('Failed to fetch LWF Setup data');
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

     const refreshLWFSetupData = () => {
    fetchLWFSetupData();
    // showNotification('PF Setup data refreshed successfully');
  };

  useEffect(() => {
    if(actualCompanyName){
      fetchLWFSetupData();

    }
  }, [actualCompanyName, pagination.pageIndex, pagination.pageSize]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddLWFSetup = (newLWFSetup: LWFSetupData) => {
    try {
      // Implement create logic here
      console.log("New LWF Setup:", newLWFSetup);
      setIsOpen(false);
      fetchLWFSetupData(); // Refresh data
      showNotification('LWF Setup created successfully', 'success');
    } catch (error) {
      console.error('Error adding LWF setup:', error);
      showNotification('Failed to create LWF setup');
    }
  };

  const showNotification = (message: string, type: 'success' | 'danger' = 'danger') => {
    toast.push(
      <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
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
          <h1 className="text-2xl font-bold">{actualCompanyName}-LWF Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => setIsOpen(true)}
        >
          Add LWF Setup
        </Button>
      </div>

      <LWFSetupTable data={lwfSetupData}  onRefresh={refreshLWFSetupData}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      onPageSizeChange={handlePageSizeChange}
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
        width={800}
        height={650}
        shouldCloseOnOverlayClick={false} 
      >
        <h4 className="mb-2">Add LWF Setup</h4>
        <LWFSetupPanel
          onClose={() => setIsOpen(false)}
          addLWFSetup={handleAddLWFSetup}
          companyId={actualCompanyId}
          groupId={actualGroupId}
          companyName={actualCompanyName}
          groupName={actualGroupName}
        />
      </Dialog>
    </div>
  );
};

export default LWFSetupPage;