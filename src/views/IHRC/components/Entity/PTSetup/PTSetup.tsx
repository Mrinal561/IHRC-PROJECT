import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { setPanelExpand, useAppDispatch } from '@/store';
import PTSetupPanel from './components/PTSetupPanel';
import PTSetupTable from './components/PTSetupTable';


export interface PTSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    ptState: string;
    ptLocation: string;
    ptEnrollmentNumber: string;
    ptRegistrationNumber: string;
    ptRegistrationDate: string;
    ptRemmitanceMode: string;
    ptUserId?: string;
    ptPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    ptecPaymentFrequency: string;
    ptrcPaymentFrequency: string;
    lwfRegistrationCertificate?: File | null;
    ptrcUpload?: File | null;
  }

  interface LocationState {
    companyName?: string;
    companyGroupName?: string;
  }

const PTSetup: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [PTSetupData, setPTSetupData] = useState<PTSetupData[]>([]);
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
    // Fetch PF setup data for this company
    // This is a placeholder. Replace with actual API call or data fetching logic
    const fetchPTSetupData = async () => {
      // Simulating API call
      const data: PTSetupData[] = [];
      setPTSetupData(data);
    };

    fetchPTSetupData();
  }, [actualCompanyName]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPFSetup = (newPFSetup: PTSetupData) => {
    setPTSetupData([...PTSetupData, newPFSetup]);
    setIsOpen(false);
  };

  const handleDelete = (index: number) => {
    const newData = PTSetupData.filter((_, i) => i !== index);
    setPTSetupData(newData);
  };

  const handleEdit = (index: number, updatedData: Partial<PTSetupData>) => {
    const newData = [...PTSetupData];
    newData[index] = { ...newData[index], ...updatedData };
    setPTSetupData(newData);
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
          <h1 className="text-2xl font-bold">{actualCompanyName} PT Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add PT Setup
        </Button>
      </div>

      <PTSetupTable
        data={PTSetupData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
      >
        <h4 className="mb-4">Add PT Setup</h4>
        
        <PTSetupPanel
          addPFSetup={handleAddPFSetup}
          onClose={() => setIsOpen(false)}
          companyGroupName={companyData?.Company_Group_Name || ''}
          companyName={companyData?.Company_Name || ''}
        />
      </Dialog>
       
    </div>
  );
};

export default PTSetup;