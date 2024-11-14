// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { Button, Dialog, toast, Notification } from '@/components/ui';
// import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
// import { setPanelExpand, useAppDispatch } from '@/store';
// import ESISetupPanel from './components/ESISetupPanel';
// import ESISetupTable from './components/EsicSetupTable';

// export interface ESISetupData {
//     Company_Group_Name: string;
//     Company_Name: string;
//     esiCodeType: string;
//     esiCode: string;
//     esiCodeLocation: string;
//     esiUserId?: string;
//     esiPassword?: string;
//     authorizedSignatory: string;
//     signatoryDesignation?: string;
//     signatoryMobile?: string;
//     signatoryEmail?: string;
//     esiRegistrationCertificate?: File | null;
//   }

//   interface LocationState {
//     companyName?: string;
//     companyGroupName?: string;
//   }

// const CompanyESISetupPage: React.FC = () => {
//   const { companyName } = useParams<{ companyName: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [esiSetupData, setESISetupData] = useState<ESISetupData[]>([]);
//   const [companyData, setCompanyData] = useState<{ Company_Group_Name: string, Company_Name: string } | null>(null);
//   const locationState = location.state as LocationState;


//   const actualCompanyName = location.state?.companyName || decodeURIComponent(companyName || '').replace(/-/g, ' ');
//   const actualCompanyGroupName = locationState?.companyGroupName || '';



//   useEffect(() => {
//     // Fetch company data based on companyName
//     // This is a placeholder. Replace with actual API call or data fetching logic
//     const fetchCompanyData = async () => {
//       // Simulating API call
//       const data = {
//         Company_Group_Name: actualCompanyGroupName,
//         Company_Name: actualCompanyName
//       };
//       console.log("Fetched company data:", data);
//       setCompanyData(data);
//     };

//     fetchCompanyData();
//   }, [actualCompanyName, actualCompanyGroupName], );

//   useEffect(() => {
//     // Set dummy data for PT Setup
//     const dummyData: ESISetupData[] = [
//       {
//         Company_Group_Name: actualCompanyGroupName,
//         Company_Name: actualCompanyName,
//         esiCodeType: 'Main',
//         esiCode: 'DRET12457893',
//         esiCodeLocation: 'Mumbai',
//         esiUserId: 'User01',
//         esiPassword: 'password01',
//         authorizedSignatory: 'Amit',
//         signatoryDesignation: 'Manager',
//         signatoryMobile: '9145786945',
//         signatoryEmail: 'amit@gmail.com',
//       },
    
//     ];
//     setESISetupData(dummyData);
//   }, [actualCompanyName, actualCompanyGroupName]);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handleAddPFSetup = (newPFSetup: ESISetupData) => {
//     setESISetupData([...esiSetupData, newPFSetup]);
//     setIsOpen(false);
//   };

//   const showNotification = (message: string) => {
//     toast.push(
//       <Notification title="Success" type="success">
//         <div className="flex items-center">
//           <span>{message}</span>
//         </div>
//       </Notification>
//     );
//   };

//   const handleDelete = (index: number) => {
//     const newData = esiSetupData.filter((_, i) => i !== index);
//     setESISetupData(newData);
//     showNotification("ESI Setup deleted successfully");

//   };

//   const handleEdit = (index: number, updatedData: Partial<ESISetupData>) => {
//     const newData = [...esiSetupData];
//     newData[index] = { ...newData[index], ...updatedData };
//     setESISetupData(newData);
//     showNotification("ESI Setup updated successfully");

//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };


//   const handleAddESISetup = (newESISetup: ESISetupData) => {
//     setESISetupData([...esiSetupData, newESISetup]);
//     setIsOpen(false);
//   };

 
//   return (
//     <div className="">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <Button
//             variant="plain"
//             size="sm"
//             icon={<HiArrowLeft />}
//             onClick={handleBack}
//             className="mr-2"
//           >
//           </Button>
//           <h1 className="text-2xl font-bold">{actualCompanyName} ESI Setup</h1>
//         </div>
//         <Button
//           variant="solid"
//           size="sm"
//           icon={<HiPlusCircle />}
//           onClick={() => {
//             setIsOpen(true);
//           }}
//         >
//           Add ESI Setup
//         </Button>
//       </div>

//       <ESISetupTable
//         // data={esiSetupData}
//         // onDelete={handleDelete}
//         // onEdit={handleEdit}
//       />

//       <Dialog
//         isOpen={isOpen}
//         onClose={handleClose}
//         onRequestClose={() => setIsOpen(false)}
//         width={800}
//         height={550}
//       >
//         <h4 className="mb-4">Add ESI Setup</h4>
        
//         <ESISetupPanel
//           onClose={() => setIsOpen(false)}
//           addESISetup={handleAddESISetup}
//         />
//       </Dialog>
       
//     </div>
//   );
// };

// export default CompanyESISetupPage;



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
      showNotification('success', 'ESI Setup created successfully');
      await fetchESISetupData(); // Refresh the list
      setIsOpen(false);
    } catch (error: any) {
      console.error('Error adding ESI setup:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to create ESI setup');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     setIsLoading(true);
  //     await httpClient.delete(endpoints.esiSetup.delete(id));
  //     showNotification('success', 'ESI Setup deleted successfully');
  //     await fetchESISetupData(); // Refresh the list
  //   } catch (error: any) {
  //     console.error('Error deleting ESI setup:', error);
  //     showNotification('danger', error.response?.data?.message || 'Failed to delete ESI setup');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleEdit = async (id: number, updatedData: Partial<ESISetupData>) => {
  //   try {
  //     setIsLoading(true);
  //     await httpClient.put(endpoints.esiSetup.update(id), updatedData);
  //     showNotification('success', 'ESI Setup updated successfully');
  //     await fetchESISetupData(); // Refresh the list
  //   } catch (error: any) {
  //     console.error('Error updating ESI setup:', error);
  //     showNotification('danger', error.response?.data?.message || 'Failed to update ESI setup');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        />
      </Dialog>
    </div>
  );
};

export default CompanyESISetupPage;