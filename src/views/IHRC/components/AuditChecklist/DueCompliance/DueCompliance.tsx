// import React, { useState, useEffect } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import DueComplianceTableTool from './components/DueComplianceTableTool';
// import DueComplianceTable from './components/DueComplianceTable';
// import Company from '../../Home/components/Company';
// import DueComplianceFilter from './components/DueComplianceFilter';

// // Define the structure of our data
// interface DueComplianceDataRow {
//   Compliance_Instance_ID: number;
//   Compliance_ID: number;
//   Legislation: string;
//   Location: string;
//   Compliance_Categorization: string;
//   Compliance_Header: string;
//   Compliance_Description: string;
//   Penalty_Description: string;
//   Compliance_Applicability: string;
//   Bare_Act_Text: string;
//   Compliance_Clause: string;
//   Compliance_Type: string;
//   Compliance_Frequency: string;
//   Compliance_Statutory_Authority: string;
//   Approval_Required: string;
//   Criticality: string;
//   Penalty_Type: string;
//   Default_Due_Date: string;
//   First_Due_Date: string;
//   Due_Date: Date;
//   Scheduled_Frequency: string;
//   Proof_Of_Compliance_Mandatory: string;
//   Owner_Name: string;
//   Approver_Name: string;
//   Category: string;
//   Status2: 'due' | 'Upcoming';
//   Status:'';
// }

// const DueCompliance: React.FC = () => {
//     const [data, setData] = useState<DueComplianceDataRow[]>([]);
//     const [filteredData, setFilteredData] = useState<DueComplianceDataRow[]>([]);
//     const [currentFilter, setCurrentFilter] = useState('Due');

//     useEffect(() => {
//         // In a real application, you would fetch this data from an API
//         // For now, we'll use some mock data
//         const mockData: DueComplianceDataRow[] = [
//           {
//             Compliance_Instance_ID: 1001,
//             Compliance_ID: 3236,
//             Legislation: "Bihar Shops and Establishments Act 1953 and Bihar Shops Establishments Rules 1955/ Bihar/ IR",
//             Location: "HMVL - Office - Muzaffarpur - sadtpur - HR/ Muzaffarpur/ Bihar/ Office",
//             Compliance_Categorization: "LICENSE / REGISTRATION",
//             Compliance_Header: "Renewal of Registration",
//             Compliance_Description: "Apply for renewal of certificate of registration in Form IA in duplicate not less than thirty days before the date on which the certificate of registration expires to the Inspecting Officer along with the prescribed fees.",
//             Penalty_Description: "Fine which may extend to Rs. 250",
//             Compliance_Applicability: "EVERY EMPLOYER",
//             Bare_Act_Text: "Make an application when registration certificate is lost or destroyed to the Inspecting Officer within seven days of such loss or destruction for a duplicate copy along with a payment of a fee of two rupees either by crossed Indian Postal Order or by d",
//             Compliance_Clause: "Section 6 and Rule 3 A",
//             Compliance_Type: "On Going",
//             Compliance_Frequency: "Half Yearly",
//             Compliance_Statutory_Authority: "CHIEF INSPECTOR OF SHOPS AND COMMERCIAL ESTABLISHMENTS/REGISTERING OFFICER",
//             Approval_Required: "Yes",
//             Criticality: "High",
//             Penalty_Type: "Fine",
//             Default_Due_Date: "20th July 20th Jan",
//             First_Due_Date: "15-Apr-16",
//             Due_Date: new Date('14-Apr-17'),
//             Scheduled_Frequency: "Yearly",
//             Proof_Of_Compliance_Mandatory: "Yes",
//             Owner_Name: 'Admin',
//             Approver_Name: 'Shivesh Verma',
//             Category: 'Legal',
//             Status: '',
//             Status2: 'due'
//           },
//           {
//             Compliance_Instance_ID: 1002,
//             Compliance_ID: 4501,
//             Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
//             Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
//             Compliance_Categorization: "LICENSE / REGISTRATION",
//             Compliance_Header: "Annual Renewal of License",
//             Compliance_Description: "Submit an application for the renewal of the factory license in Form 1A, at least 45 days before the expiry date, to the Factory Inspector along with the required fees.",
//             Penalty_Description: "Penalty may extend up to Rs. 500",
//             Compliance_Applicability: "FACTORY OWNER",
//             Bare_Act_Text: "In case the factory license is lost, notify the Factory Inspector immediately and apply for a duplicate license along with a fee of ten rupees.",
//             Compliance_Clause: "Section 4 and Rule 6",
//             Compliance_Type: "On Going",
//             Compliance_Frequency: "Annually",
//             Compliance_Statutory_Authority: "FACTORY INSPECTOR",
//             Approval_Required: "Yes",
//             Criticality: "Medium",
//             Penalty_Type: "Fine",
//             Default_Due_Date: "1st March 1st September",
//             First_Due_Date: "01-Jan-17",
//             Due_Date: new Date('31-Dec-17'),
//             Scheduled_Frequency: "Yearly",
//             Proof_Of_Compliance_Mandatory: "Yes",
//             Owner_Name: 'HR',
//             Approver_Name: 'Shivesh Verma',
//             Category: 'HR',
//             Status: '',
//             Status2: 'Upcoming'
//           },
//           {
//             Compliance_Instance_ID: 1003,
//             Compliance_ID: 5602,
//             Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
//             Location: "HMVL - Office - Aurangabad - Priyavrat Path - HR/ Aurangabad/ Bihar/ Office",
//             Compliance_Categorization: "REGISTRATION / REPORTING",
//             Compliance_Header: "Monthly Compliance Report",
//             Compliance_Description: "File a monthly compliance report in Form IX with the Labour Department, detailing employee work hours and wages paid, by the 5th of each month.",
//             Penalty_Description: "Penalty up to Rs. 1000 for late submission",
//             Compliance_Applicability: "SHOPS AND ESTABLISHMENTS",
//             Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
//             Compliance_Clause: "Section 12 and Rule 10",
//             Compliance_Type: "Ongoing",
//             Compliance_Frequency: "Monthly",
//             Compliance_Statutory_Authority: "LABOUR COMMISSIONER",
//             Approval_Required: "No",
//             Criticality: "High",
//             Penalty_Type: "Fine",
//             Default_Due_Date: "5th of each month",
//             First_Due_Date: "01-Feb-18",
//             Due_Date: new Date('05-Feb-18'),
//             Scheduled_Frequency: "Monthly",
//             Proof_Of_Compliance_Mandatory: "No",
//             Owner_Name: 'Finance',
//             Approver_Name: 'Shivesh Verma',
//             Category: 'Finance',
//             Status: '',
//             Status2: 'due'
//           },
//           {
//             Compliance_Instance_ID: 1004,
//             Compliance_ID: 6789,
//             Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
//             Location: "HMVL - Office - Begusarai - Kachhari Road - HR/ Begusarai/ Bihar/ Office",
//             Compliance_Categorization: "REPORTING",
//             Compliance_Header: "Quarterly Wage Report",
//             Compliance_Description: "Submit a quarterly wage report in Form XIV to the Labour Commissioner by the 15th of the first month following the end of the quarter.",
//             Penalty_Description: "Fine up to Rs. 500 for late submission",
//             Compliance_Applicability: "EMPLOYERS",
//             Bare_Act_Text: "File any discrepancies in wages with the Labour Commissioner within fifteen days of detection, accompanied by a fee of ten rupees.",
//             Compliance_Clause: "Section 12 and Rule 14",
//             Compliance_Type: "Ongoing",
//             Compliance_Frequency: "Quarterly",
//             Compliance_Statutory_Authority: "LABOUR COMMISSIONER",
//             Approval_Required: "No",
//             Criticality: "Medium",
//             Penalty_Type: "Fine",
//             Default_Due_Date: "15th of January, April, July, October",
//             First_Due_Date: "15-Jan-18",
//             Due_Date: new Date('15-Jan-18'),
//             Scheduled_Frequency: "Quarterly",
//             Proof_Of_Compliance_Mandatory: "No",
//             Owner_Name: 'Ravi Shankar Singh',
//             Approver_Name: 'Shivesh Verma',
//             Category: 'Legal',
//             Status: '',
//             Status2: 'Upcoming'          
//           },
//           {
//             Compliance_Instance_ID: 1005,
//             Compliance_ID: 7890,
//             Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
//             Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
//             Compliance_Categorization: "LICENSE / REGISTRATION",
//             Compliance_Header: "Renewal of Trade License",
//             Compliance_Description: "Apply for the renewal of the trade license in Form VII at least 30 days before the license expiry date to the Municipal Authority along with the necessary fee.",
//             Penalty_Description: "Late fee up to Rs. 300",
//             Compliance_Applicability: "TRADE LICENSE HOLDERS",
//             Bare_Act_Text: "In case of loss of the trade license, report to the Municipal Authority within seven days and apply for a duplicate license with a fee of fifteen rupees.",
//             Compliance_Clause: "Section 5 and Rule 8",
//             Compliance_Type: "On Going",
//             Compliance_Frequency: "Annually",
//             Compliance_Statutory_Authority: "MUNICIPAL AUTHORITY",
//             Approval_Required: "Yes",
//             Criticality: "High",
//             Penalty_Type: "Fine",
//             Default_Due_Date: "1st June 1st December",
//             First_Due_Date: "01-June-17",
//             Due_Date: new Date('01-June-17'),
//             Scheduled_Frequency: "Yearly",
//             Proof_Of_Compliance_Mandatory: "No",
//             Owner_Name: 'HR',
//             Approver_Name: 'Shivesh Verma',
//             Category: 'Legal',
//             Status: '',
//             Status2: 'Upcoming'
//           }
//             // Add more mock data items here...
//         ];

//         setData(mockData);
//     }, []);

//     useEffect(() => {
//       // Filter the data based on the current filter
//       const filtered = data.filter(item => 
//           currentFilter === 'Due' ? item.Status2 === 'due' : item.Status2 === 'Upcoming'
//       );
//       setFilteredData(filtered);
//   }, [data, currentFilter]);

//   const handleFilterChange = (filter: string) => {
//       setCurrentFilter(filter);
//   };

//     const handleUploadAll = (selectedComplianceIds: number[], remark: string) => {
//         // Here you would typically send this data to your backend
//         console.log(`Uploading ${selectedComplianceIds.length} compliances with remark: ${remark}`);
        
//         // Update the local state to reflect the changes
//         setData(prevData => prevData.map(item => 
//             selectedComplianceIds.includes(item.Compliance_Instance_ID) 
//                 ? { ...item, Status: 'Complied' as const } 
//                 : item
//         ));
//     };

//     const handleUploadSingle = (complianceId: number, isProofMandatory: boolean, file?: File, remark?: string) => {
//         // Here you would typically send this data to your backend
//         console.log(`Uploading compliance ${complianceId}. Proof mandatory: ${isProofMandatory}. File: ${file?.name}. Remark: ${remark}`);
        
//         // Update the local state to reflect the changes
//         setData(prevData => prevData.map(item => 
//             item.Compliance_Instance_ID === complianceId 
//                 ? { ...item, Status: 'Complied' as const } 
//                 : item
//         ));
//     };
//     const handleUpdateStatus = (complianceId: number, newStatus: DueComplianceDataRow['Status']) => {
//       // Update the local state to reflect the status change
//       setData(prevData => prevData.map(item => 
//           item.Compliance_Instance_ID === complianceId 
//               ? { ...item, Status: newStatus } 
//               : item
//       ));
//   };

//     return (
//       <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//           <div className="mb-4 lg:mb-0">
//               <h3 className="text-2xl font-bold">Due Compliance</h3>
//               <p className="text-gray-600">View your company's due compliance</p>
//           </div>
//           <div className="flex items-center gap-4">
//               <DueComplianceFilter onFilterChange={handleFilterChange} currentFilter={currentFilter} />
//               <DueComplianceTableTool data={filteredData} onUploadAll={handleUploadAll} />
//           </div>
//       </div>
//       <div className='mb-8'>
//           <Company />
//       </div>
//       <DueComplianceTable data={filteredData} onUploadSingle={handleUploadSingle} onUpdateStatus={handleUpdateStatus} />
//   </AdaptableCard>
//     );
// };

// export default DueCompliance;

import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui';
import { Notification } from '@/components/ui';
import AdaptableCard from '@/components/shared/AdaptableCard';
import DueComplianceTableTool from './components/DueComplianceTableTool';
import DueComplianceTable from './components/DueComplianceTable';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';

const DueCompliance = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchDueComplianceData = async (page = 1, pageSize = 10) => {
        console.log('Fetching due compliance data...');
        
        setIsLoading(true);
        try {
            const response = await httpClient.get(endpoints.due.getAll(), {
                params: {
                    page,
                    pageSize
                }
            });

            if (response?.data?.data) {
                console.log('API Response:', response.data);
                console.log('Due compliance data received:', response.data.data);
                setData(response.data.data);
            } else {
                console.log('No data in API response or unexpected response structure');
            }
        } catch (error) {
            console.error('Error fetching due compliance data:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to fetch due compliance data
                </Notification>
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Initial component mount - Fetching data...');
        fetchDueComplianceData();
    }, []);

    const handleUploadAll = (selectedComplianceIds, remark) => {
        console.log(`Uploading ${selectedComplianceIds.length} compliances with remark: ${remark}`);
        // Implement API call for bulk upload
    };

    const handleUploadSingle = (complianceId, isProofMandatory, file, remark) => {
        console.log(`Uploading compliance ${complianceId}. Proof mandatory: ${isProofMandatory}. File: ${file?.name}. Remark: ${remark}`);
        // Implement API call for single upload
    };

    const handleUpdateStatus = (complianceId, newStatus) => {
        console.log(`Updating status for compliance ${complianceId} to ${newStatus}`);
        // Implement API call for status update
    };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Due Compliance</h3>
                    <p className="text-gray-600">View your company's due compliance</p>
                </div>
                <div className="flex items-center gap-4">
                    <DueComplianceTableTool data={data} onUploadAll={handleUploadAll} />
                </div>
            </div>
            <DueComplianceTable 
                data={data} 
                loading={isLoading}
                onUploadSingle={handleUploadSingle} 
                onUpdateStatus={handleUpdateStatus} 
            />
        </AdaptableCard>
    );
};

export default DueCompliance;