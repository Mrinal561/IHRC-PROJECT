// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
// import { setPanelExpand, useAppDispatch } from '@/store';
// import LWFSetupPanel from './components/LWFSetupPanel';
// import LWFSetupTable, { LWFSetupData } from './components/LWFSetupTable';




// export interface LWFSetupData {
//     Company_Group_Name: string;
//     Company_Name: string;
//     lwfState: string;
//     lwfLocation: string;
//     lwfRegistrationNumber: string;
//     lwfRegistrationDate: string;
//     lwfRemmitanceMode: string;
//     lwfRemmitanceFrequency: string;
//     lwfUserId?: string;
//     lwfPassword?: string;
//     authorizedSignatory: string;
//     signatoryDesignation?: string;
//     signatoryMobile?: string;
//     signatoryEmail?: string;
//     lwfFrequency: string;
//     lwfPaymentDueDate: string;
//     lwfApplicableState: string;
//     lwfRegistrationCertificate?: File | null;
//   }

//   interface LocationState {
//     companyName?: string;
//     companyGroupName?: string;
//   }

// const LWFSetup: React.FC = () => {
//   const { companyName } = useParams<{ companyName: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [LWFSetupData, setLWFSetupData] = useState<LWFSetupData[]>([]);
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

//   // 

//   const handleBack = () => {
//     navigate(-1);
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


//   const handleAddPFSetup = (newPFSetup: LWFSetupData) => {
//     setLWFSetupData([...LWFSetupData, newPFSetup]);
//     setIsOpen(false);
//   };

//   const handleDelete = (index: number) => {
//     const newData = LWFSetupData.filter((_, i) => i !== index);
//     setLWFSetupData(newData);
//     showNotification("LWF Setup deleted successfully");

//   };

//   const handleEdit = (index: number, updatedData: Partial<LWFSetupData>) => {
//     const newData = [...LWFSetupData];
//     newData[index] = { ...newData[index], ...updatedData };
//     setLWFSetupData(newData);
//     showNotification(`LWF Setup created for ${actualCompanyName}`);

//   };

//   const handleClose = () => {
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
//           <h1 className="text-2xl font-bold">{actualCompanyName} LWF Setup</h1>
//         </div>
//         <Button
//           variant="solid"
//           size="sm"
//           icon={<HiPlusCircle />}
//           onClick={() => {
//             setIsOpen(true);
//           }}
//         >
//           Add LWF Setup
//         </Button>
//       </div>

//       <LWFSetupTable />

//       <Dialog
//         isOpen={isOpen}
//         onClose={handleClose}
//         onRequestClose={() => setIsOpen(false)}
//         width={800}
//         height={550}
//       >
//         <h4 className="mb-4">Add LWF Setup</h4>
        
//         <LWFSetupPanel
//           addPFSetup={handleAddPFSetup}
//           onClose={() => setIsOpen(false)}
//           companyGroupName={companyData?.Company_Group_Name || ''}
//           companyName={companyData?.Company_Name || ''}
//         />
//       </Dialog>
       
//     </div>
//   );
// };

// export default LWFSetup;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { Button, Dialog, toast, Notification } from '@/components/ui';
// import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
// import { setPanelExpand, useAppDispatch } from '@/store';
// import LWFSetupPanel from './components/LWFSetupPanel';
// import LWFSetupTable from './components/LWFSetupTable';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';

// export interface LWFSetupData {
  // Company_Group_Name: string;
  // Company_Name: string;
  // lwfState: string;
  // lwfLocation: string;
  // lwfRegistrationNumber: string;
  // lwfRegistrationDate: string;
  // lwfRemmitanceMode: string;
  // lwfRemmitanceFrequency: string;
  // lwfUserId?: string;
  // lwfPassword?: string;
  // authorizedSignatory: string;
  // signatoryDesignation?: string;
  // signatoryMobile?: string;
  // signatoryEmail?: string;
  // lwfFrequency: string;
  // lwfPaymentDueDate: string;
  // lwfApplicableState: string;
  // lwfRegistrationCertificate?: File | null;
  // id?: number;
// }

// interface LocationState {
//   companyName?: string;
//   companyGroupName?: string;
// }

// const LWFSetupPage: React.FC = () => {
//   const { companyName } = useParams<{ companyName: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [lwfSetupData, setLWFSetupData] = useState<LWFSetupData[]>([]);
//   const [companyData, setCompanyData] = useState<{ Company_Group_Name: string, Company_Name: string } | null>(null);
//   const locationState = location.state as LocationState;

//   const actualCompanyName = location.state?.companyName || decodeURIComponent(companyName || '').replace(/-/g, ' ');
//   const actualCompanyGroupName = locationState?.companyGroupName || '';

//   const showNotification = (type: 'success' | 'danger', message: string) => {
//     toast.push(
//       <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
//         <div className="flex items-center">
//           <span>{message}</span>
//         </div>
//       </Notification>
//     );
//   };

//   // Fetch company data
//   const fetchCompanyData = async () => {
//     try {
//       const response = await httpClient.get(endpoints.company.getAll(actualCompanyName));
//       setCompanyData(response.data);
//     } catch (error: any) {
//       console.error('Error fetching company data:', error);
//       showNotification('danger', error.response?.data?.message || 'Failed to fetch company data');
//     }
//   };

//   // Fetch LWF setup data
//   const fetchLWFSetupData = async () => {
//     // try {
//     //   setIsLoading(true);
//     //   const response = await httpClient.get(endpoints.lwfSetup.getAll(), {
//     //     params: {
//     //       company_name: actualCompanyName
//     //     }
//     //   });
//     //   if (response?.data.data) {
//     //     setLWFSetupData(response.data.data);
//     //   }
//     // } catch (error: any) {
//     //   console.error('Error fetching LWF setup data:', error);
//     //   showNotification('danger', error.response?.data?.message || 'Failed to fetch LWF setup data');
//     // } finally {
//     //   setIsLoading(false);
//     // }
//   };

//   useEffect(() => {
//     if (actualCompanyName) {
//       fetchCompanyData();
//       fetchLWFSetupData();
//     }
//   }, [actualCompanyName]);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handleAddLWFSetup = async (newLWFSetup: LWFSetupData) => {
//     // try {
//     //   setIsLoading(true);
//     //   const response = await httpClient.post(endpoints.lwfSetup.create(), newLWFSetup);
//     //   if (response) {
//     //     setIsOpen(false);
//     //     toast.push(
//     //       <Notification title="Success" type="success">
//     //         LWF Setup created successfully
//     //       </Notification>
//     //     );
//     //     await fetchLWFSetupData(); // Refresh the list
//     //   }
//     // } catch (error: any) {
//     //   console.error('Error adding LWF setup:', error);
//     //   showNotification('danger', error.response?.data?.message || 'Failed to create LWF setup');
//     // } finally {
//     //   setIsLoading(false);
//     // }
//     console.log("LWF data:",newLWFSetup)
//   };

//   const handleClose = () => {
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
//           <h1 className="text-2xl font-bold">{actualCompanyName} LWF Setup</h1>
//         </div>
//         <Button
//           variant="solid"
//           size="sm"
//           icon={<HiPlusCircle />}
//           onClick={() => setIsOpen(true)}
//           disabled={isLoading}
//         >
//           Add LWF Setup
//         </Button>
//       </div>

//       <LWFSetupTable
//         // data={lwfSetupData}
//         // isLoading={isLoading}
//         // refreshData={fetchLWFSetupData}
//       />

//       <Dialog
//         isOpen={isOpen}
//         onClose={handleClose}
//         onRequestClose={() => setIsOpen(false)}
//         width={800}
//         height={650}
//       >
//         <h4 className="mb-4">Add LWF Setup</h4>
//         <LWFSetupPanel
//           onClose={handleClose}
//           addLWFSetup={handleAddLWFSetup}
//         />
//       </Dialog>
//     </div>
//   );
// };

// export default LWFSetupPage;


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

  const fetchLWFSetupData = async () => {
    try {
      const response = await httpClient.get(endpoints.lwfSetup.getAll());
      console.log('Fetched LWF Setup data:', response.data.data);
      setLWFSetupData(response.data.data);
    } catch (error) {
      console.error('Error fetching LWF Setup data:', error);
      showNotification('Failed to fetch LWF Setup data');
    }
  };

  useEffect(() => {
    fetchLWFSetupData();
  }, []);

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
          <h1 className="text-2xl font-bold">LWF Setup</h1>
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

      <LWFSetupTable data={lwfSetupData} />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRequestClose={() => setIsOpen(false)}
        width={800}
        height={650}
      >
        <h4 className="mb-4">Add LWF Setup</h4>
        <LWFSetupPanel
          onClose={() => setIsOpen(false)}
          addLWFSetup={handleAddLWFSetup}
        />
      </Dialog>
    </div>
  );
};

export default LWFSetupPage;