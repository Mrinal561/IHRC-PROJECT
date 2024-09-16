import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, Notification, toast } from '@/components/ui';
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
    const fetchCompanyData = async () => {
      const data = {
        Company_Group_Name: actualCompanyGroupName,
        Company_Name: actualCompanyName
      };
      console.log("Fetched company data:", data);
      setCompanyData(data);
    };

    fetchCompanyData();
  }, [actualCompanyName, actualCompanyGroupName]);

  useEffect(() => {
    // Set dummy data for PT Setup
    const dummyData: PTSetupData[] = [
      {
        Company_Group_Name: actualCompanyGroupName,
        Company_Name: actualCompanyName,
        ptState: 'Maharashtra',
        ptLocation: 'Mumbai',
        ptEnrollmentNumber: 'PT1234587954',
        ptRegistrationNumber: 'REG98765354879',
        ptRegistrationDate: '2023-01-01',
        ptRemmitanceMode: 'Online',
        ptUserId: 'User01',
        ptPassword: 'password01',
        authorizedSignatory: 'Amit',
        signatoryDesignation: 'Manager',
        signatoryMobile: '9145786945',
        signatoryEmail: 'amit@gmail.com',
        ptecPaymentFrequency: 'Monthly',
        ptrcPaymentFrequency: 'Quarterly'
      },
     
    ];
    setPTSetupData(dummyData);
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

  const handleAddPFSetup = (newPFSetup: PTSetupData) => {
    setPTSetupData([...PTSetupData, newPFSetup]);
    setIsOpen(false);
    showNotification(`PT Setup created for ${actualCompanyName}`);
  };

  const handleDelete = (index: number) => {
    const newData = PTSetupData.filter((_, i) => i !== index);
    setPTSetupData(newData);
    showNotification("PT Setup deleted successfully");
  };

  const handleEdit = (index: number, updatedData: Partial<PTSetupData>) => {
    const newData = [...PTSetupData];
    newData[index] = { ...newData[index], ...updatedData };
    setPTSetupData(newData);
    showNotification("PT Setup updated successfully");
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
        onClose={handleClose}
        onRequestClose={() => setIsOpen(false)}
        width={800}
        height={550}
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