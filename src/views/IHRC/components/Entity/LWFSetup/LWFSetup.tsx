import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { setPanelExpand, useAppDispatch } from '@/store';
import LWFSetupPanel from './components/LWFSetupPanel';
import LWFSetupTable from './components/LWFSetupTable';




export interface LWFSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    lwfState: string;
    lwfLocation: string;
    lwfRegistrationNumber: string;
    lwfRegistrationDate: string;
    lwfRemmitanceMode: string;
    lwfRemmitanceFrequency: string;
    lwfUserId?: string;
    lwfPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    lwfFrequency: string;
    lwfPaymentDueDate: string;
    lwfApplicableState: string;
    lwfRegistrationCertificate?: File | null;
  }

  interface LocationState {
    companyName?: string;
    companyGroupName?: string;
  }

const LWFSetup: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [LWFSetupData, setLWFSetupData] = useState<LWFSetupData[]>([]);
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
    const fetchLWFSetupData = async () => {
      // Simulating API call
      const data: LWFSetupData[] = [];
      setLWFSetupData(data);
    };

    fetchLWFSetupData();
  }, [actualCompanyName]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddPFSetup = (newPFSetup: LWFSetupData) => {
    setLWFSetupData([...LWFSetupData, newPFSetup]);
    setIsOpen(false);
  };

  const handleDelete = (index: number) => {
    const newData = LWFSetupData.filter((_, i) => i !== index);
    setLWFSetupData(newData);
  };

  const handleEdit = (index: number, updatedData: Partial<LWFSetupData>) => {
    const newData = [...LWFSetupData];
    newData[index] = { ...newData[index], ...updatedData };
    setLWFSetupData(newData);
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
          <h1 className="text-2xl font-bold">{actualCompanyName} LWF Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add LWF Setup
        </Button>
      </div>

      <LWFSetupTable
        data={LWFSetupData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
      >
        <h4 className="mb-4">Add LWF Setup</h4>
        
        <LWFSetupPanel
          addPFSetup={handleAddPFSetup}
          onClose={() => setIsOpen(false)}
          companyGroupName={companyData?.Company_Group_Name || ''}
          companyName={companyData?.Company_Name || ''}
        />
      </Dialog>
       
    </div>
  );
};

export default LWFSetup;