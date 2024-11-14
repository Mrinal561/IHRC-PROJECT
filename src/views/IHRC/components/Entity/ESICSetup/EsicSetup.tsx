import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { setPanelExpand, useAppDispatch } from '@/store';
import ESISetupPanel from './components/ESISetupPanel';
import ESISetupTable from './components/EsicSetupTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

export interface ESISetupData {
    Company_Group_Name: string;
    Company_Name: string;
    esiCodeType: string;
    esiCode: string;
    esiCodeLocation: string;
    esiUserId?: string;
    esiPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    esiRegistrationCertificate?: File | null;
    id?: number;
}

interface LocationState {
    companyName?: string;
    companyGroupName?: string;
}

const CompanyESISetupPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [esiSetupData, setESISetupData] = useState<ESISetupData[]>([]);
  const [companyData, setCompanyData] = useState<{ Company_Group_Name: string, Company_Name: string } | null>(null);
  const locationState = location.state as LocationState;
  const [esiSetups, setEsiSetups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch ESI setups and refresh table data
  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get(endpoints.esiSetup.getAll());
      setEsiSetups(response.data); // Update with fetched data
    } catch (error) {
      console.error('Failed to fetch ESI setups:', error);
    } finally {
      setLoading(false);
    }
  };




  const actualCompanyName = location.state?.companyName || decodeURIComponent(companyName || '').replace(/-/g, ' ');
  const actualCompanyGroupName = locationState?.companyGroupName || '';

  const showNotification = (type: 'success' | 'danger', message: string) => {
    toast.push(
      <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
        <div className="flex items-center">
          <span>{message}</span>
        </div>
      </Notification>
    );
  };

  // Fetch company data
  const fetchCompanyData = async () => {
    try {
      const response = await httpClient.get(endpoints.company.getAll(actualCompanyName));
      setCompanyData(response.data);
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to fetch company data');
    }
  };

  // Fetch ESI setup data
  const fetchESISetupData = async () => {
    try {
      setIsLoading(true);
      const response = await httpClient.get(endpoints.esiSetup.getAll(), {
        params: {
          company_name: actualCompanyName
        }
      });
      setESISetupData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching ESI setup data:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to fetch ESI setup data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (actualCompanyName) {
      fetchCompanyData();
      fetchESISetupData();
    }
  }, [actualCompanyName]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddESISetup = async (newESISetup: ESISetupData) => {
    try {
      setIsLoading(true);
      const response = await httpClient.post(endpoints.esiSetup.create(), newESISetup);
      // showNotification('success', 'ESI Setup created successfully');
      await fetchESISetupData(); // Refresh the list
      setIsOpen(false);
      // refreshData();
    } catch (error: any) {
      console.error('Error adding ESI setup:', error);
      // showNotification('danger', error.response?.data?.message || 'Failed to create ESI setup');
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // const [key, setKey] = useState(0);
  // const refreshData = () => {
  //   setKey(prev => prev + 1);
  // };

  useEffect(() => {
    refreshData();
  }, [handleAddESISetup]);


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
          <h1 className="text-2xl font-bold">{actualCompanyName} ESI Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => setIsOpen(true)}
          disabled={isLoading}
        >
          Add ESI Setup
        </Button>
      </div>

      <ESISetupTable
        // data={esiSetupData}
        // onDelete={handleDelete}
        // onEdit={handleEdit}
        // isLoading={isLoading}
      />

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={() => setIsOpen(false)}
        width={800}
        height={650}
      >
        <h4 className="mb-4">Add ESI Setup</h4>
        <ESISetupPanel
          onClose={handleClose}
          addESISetup={handleAddESISetup}
          refreshData={refreshData}
        />
      </Dialog>
    </div>
  );
};

export default CompanyESISetupPage;