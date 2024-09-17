import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import PFSetupSidePanel from './components/PFSetupSidePanel';
import PFSetupTable from './components/PFSetupTable';
import { setPanelExpand, useAppDispatch } from '@/store';

export interface PFSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    pfCode: string;
    pfCodeLocation: string;
    registrationDate?: string;
    pfUserId?: string;
    pfPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    dscValidDate?: string;
    esign?: string;
    pfRegistrationCertificate?: File | null;
  }

  interface LocationState {
    companyName?: string;
    companyGroupName?: string;
  }

const CompanyPFSetupPage: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pfSetupData, setPfSetupData] = useState<PFSetupData[]>([]);
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
    const dummyData: PFSetupData[] = [
      {
        Company_Group_Name: actualCompanyGroupName,
        Company_Name: actualCompanyName,
        pfCode: 'DRET12457893',
        pfCodeLocation: 'Mumbai',
        registrationDate: '2023-01-01',
        pfUserId: 'User01',
        pfPassword: 'password01',
        authorizedSignatory: 'Amit',
        signatoryDesignation: 'Manager',
        signatoryMobile: '9145786945',
        signatoryEmail: 'amit@gmail.com',
        dscValidDate: '2026-01-01',
        esign: 'ACTIVE'
      },
    
    ];
    setPfSetupData(dummyData);
  }, [actualCompanyName, actualCompanyGroupName]);

  const handleBack = () => {
    navigate(-1);
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

  const handleAddPFSetup = (newPFSetup: PFSetupData) => {
    setPfSetupData([...pfSetupData, newPFSetup]);
    setIsOpen(false);
  };

  const handleDelete = (index: number) => {
    const newData = pfSetupData.filter((_, i) => i !== index);
    setPfSetupData(newData);
    showNotification("PF Setup deleted successfully");
  };

  const handleEdit = (index: number, updatedData: Partial<PFSetupData>) => {
    const newData = [...pfSetupData];
    newData[index] = { ...newData[index], ...updatedData };
    setPfSetupData(newData);
    showNotification("PF Setup updated successfully");
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
          <h1 className="text-2xl font-bold">{actualCompanyName} PF Setup</h1>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add PF Setup
        </Button>
      </div>

      <PFSetupTable
        // data={pfSetupData}
        // onDelete={handleDelete}
        // onEdit={handleEdit}
      />

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={() => setIsOpen(false)}
        width={800}
        height={550}
      >
        <h4 className="mb-4">Add PF Setup</h4>
        
        <PFSetupSidePanel
          addPFSetup={handleAddPFSetup}
          onClose={() => setIsOpen(false)}
          companyGroupName={companyData?.Company_Group_Name || ''}
          companyName={companyData?.Company_Name || ''}
        />
      </Dialog>
       
    </div>
  );
};

export default CompanyPFSetupPage;