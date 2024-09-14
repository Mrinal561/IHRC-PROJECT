import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { setPanelExpand, useAppDispatch } from '@/store';
import ESISetupPanel from './components/ESISetupPanel';
import ESISetupTable from './components/EsicSetupTable';

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
  const [esiSetupData, setESISetupData] = useState<ESISetupData[]>([]);
  const [companyData, setCompanyData] = useState<{ Company_Group_Name: string, Company_Name: string } | null>(null);
  const locationState = location.state as LocationState;


  const actualCompanyName = location.state?.companyName || decodeURIComponent(companyName || '').replace(/-/g, ' ');
  const actualCompanyGroupName = locationState?.companyGroupName || '';



  useEffect(() => {
    // Fetch company data based on companyName
    // This is a placeholder. Replace with actual API call or data fetching logic
    const fetchCompanyData = async () => {
      // Simulating API call
      const data = {
        Company_Group_Name: actualCompanyGroupName,
        Company_Name: actualCompanyName
      };
      console.log("Fetched company data:", data);
      setCompanyData(data);
    };

    fetchCompanyData();
  }, [actualCompanyName, actualCompanyGroupName], );

  useEffect(() => {
    // Set dummy data for PT Setup
    const dummyData: ESISetupData[] = [
      {
        Company_Group_Name: actualCompanyGroupName,
        Company_Name: actualCompanyName,
        esiCodeType: 'Main',
        esiCode: 'DRET12457893',
        esiCodeLocation: 'Mumbai',
        esiUserId: 'User01',
        esiPassword: 'password01',
        authorizedSignatory: 'Amit',
        signatoryDesignation: 'Tech Head',
        signatoryMobile: '9145786945',
        signatoryEmail: 'amit@gmail.com',
      },
    
    ];
    setESISetupData(dummyData);
  }, [actualCompanyName, actualCompanyGroupName]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPFSetup = (newPFSetup: ESISetupData) => {
    setESISetupData([...esiSetupData, newPFSetup]);
    setIsOpen(false);
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

  const handleDelete = (index: number) => {
    const newData = esiSetupData.filter((_, i) => i !== index);
    setESISetupData(newData);
    showNotification("ESI Setup deleted successfully");

  };

  const handleEdit = (index: number, updatedData: Partial<ESISetupData>) => {
    const newData = [...esiSetupData];
    newData[index] = { ...newData[index], ...updatedData };
    setESISetupData(newData);
    showNotification("ESI Setup updated successfully");

  };

  const handleClose = () => {
    setIsOpen(false);
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
          <h1 className="text-2xl font-bold">{actualCompanyName} ESI Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add ESI Setup
        </Button>
      </div>

      <ESISetupTable
        data={esiSetupData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={() => setIsOpen(false)}
        width={800}
        height={550}
      >
        <h4 className="mb-4">Add ESI Setup</h4>
        
        <ESISetupPanel
          addPFSetup={handleAddPFSetup}
          onClose={() => setIsOpen(false)}
          companyGroupName={companyData?.Company_Group_Name || ''}
          companyName={companyData?.Company_Name || ''}
        />
      </Dialog>
       
    </div>
  );
};

export default CompanyESISetupPage;