import React, { useState, useEffect } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import DueComplianceTableTool from './components/DueComplianceTableTool';
import DueComplianceTable from './components/DueComplianceTable';

// Define the structure of our data
interface DueComplianceDataRow {
  Compliance_Instance_ID: number;
  Compliance_ID: number;
  Legislation: string;
  Location: string;
  Compliance_Categorization: string;
  Compliance_Header: string;
  Compliance_Description: string;
  Penalty_Description: string;
  Compliance_Applicability: string;
  Bare_Act_Text: string;
  Compliance_Clause: string;
  Compliance_Type: string;
  Compliance_Frequency: string;
  Compliance_Statutory_Authority: string;
  Approval_Required: string;
  Criticality: string;
  Penalty_Type: string;
  Default_Due_Date: string;
  First_Due_Date: string;
  Due_Date: Date;
  Scheduled_Frequency: string;
  Proof_Of_Compliance_Mandatory: string;
  Owner_Name: string;
  Approver_Name: string;
  Category: string;
  Status2: 'Due' | 'Upcoming';
  Status: 'Complied' | 'Not Complied' | 'NA' | 'Complied without Proof';
}

const DueCompliance: React.FC = () => {
    const [data, setData] = useState<DueComplianceDataRow[]>([]);

    useEffect(() => {
        // In a real application, you would fetch this data from an API
        // For now, we'll use some mock data
        const mockData: DueComplianceDataRow[] = [
          {
            Compliance_Instance_ID: 1001,
            Compliance_ID: 3236,
            Legislation: "Bihar Shops and Establishments Act 1953 and Bihar Shops Establishments Rules 1955/ Bihar/ IR",
            Location: "HMVL - Office - Muzaffarpur - sadtpur - HR/ Muzaffarpur/ Bihar/ Office",
            Compliance_Categorization: "LICENSE / REGISTRATION",
            Compliance_Header: "Renewal of Registration",
            Compliance_Description: "Apply for renewal of certificate of registration in Form IA in duplicate not less than thirty days before the date on which the certificate of registration expires to the Inspecting Officer along with the prescribed fees.",
            Penalty_Description: "Fine which may extend to Rs. 250",
            Compliance_Applicability: "EVERY EMPLOYER",
            Bare_Act_Text: "Make an application when registration certificate is lost or destroyed to the Inspecting Officer within seven days of such loss or destruction for a duplicate copy along with a payment of a fee of two rupees either by crossed Indian Postal Order or by d",
            Compliance_Clause: "Section 6 and Rule 3 A",
            Compliance_Type: "On Going",
            Compliance_Frequency: "Half Yearly",
            Compliance_Statutory_Authority: "CHIEF INSPECTOR OF SHOPS AND COMMERCIAL ESTABLISHMENTS/REGISTERING OFFICER",
            Approval_Required: "Yes",
            Criticality: "High",
            Penalty_Type: "Fine",
            Default_Due_Date: "20th July 20th Jan",
            First_Due_Date: "15-Apr-16",
            Due_Date: new Date('14-Apr-17'),
            Scheduled_Frequency: "Yearly",
            Proof_Of_Compliance_Mandatory: "Yes",
            Owner_Name: 'Admin',
            Approver_Name: 'Shivesh Verma',
            Category: 'Legal',
            Status: 'Complied',
            Status2: 'Due'
          },
          {
            Compliance_Instance_ID: 1002,
            Compliance_ID: 4501,
            Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
            Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
            Compliance_Categorization: "LICENSE / REGISTRATION",
            Compliance_Header: "Annual Renewal of License",
            Compliance_Description: "Submit an application for the renewal of the factory license in Form 1A, at least 45 days before the expiry date, to the Factory Inspector along with the required fees.",
            Penalty_Description: "Penalty may extend up to Rs. 500",
            Compliance_Applicability: "FACTORY OWNER",
            Bare_Act_Text: "In case the factory license is lost, notify the Factory Inspector immediately and apply for a duplicate license along with a fee of ten rupees.",
            Compliance_Clause: "Section 4 and Rule 6",
            Compliance_Type: "On Going",
            Compliance_Frequency: "Annually",
            Compliance_Statutory_Authority: "FACTORY INSPECTOR",
            Approval_Required: "Yes",
            Criticality: "Medium",
            Penalty_Type: "Fine",
            Default_Due_Date: "1st March 1st September",
            First_Due_Date: "01-Jan-17",
            Due_Date: new Date('31-Dec-17'),
            Scheduled_Frequency: "Yearly",
            Proof_Of_Compliance_Mandatory: "Yes",
            Owner_Name: 'HR',
            Approver_Name: 'Shivesh Verma',
            Category: 'HR',
            Status: 'Not Complied',
            Status2: 'Upcoming'
          },
          {
            Compliance_Instance_ID: 1003,
            Compliance_ID: 5602,
            Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
            Location: "HMVL - Office - Aurangabad - Priyavrat Path - HR/ Aurangabad/ Bihar/ Office",
            Compliance_Categorization: "REGISTRATION / REPORTING",
            Compliance_Header: "Monthly Compliance Report",
            Compliance_Description: "File a monthly compliance report in Form IX with the Labour Department, detailing employee work hours and wages paid, by the 5th of each month.",
            Penalty_Description: "Penalty up to Rs. 1000 for late submission",
            Compliance_Applicability: "SHOPS AND ESTABLISHMENTS",
            Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
            Compliance_Clause: "Section 12 and Rule 10",
            Compliance_Type: "Ongoing",
            Compliance_Frequency: "Monthly",
            Compliance_Statutory_Authority: "LABOUR COMMISSIONER",
            Approval_Required: "No",
            Criticality: "High",
            Penalty_Type: "Fine",
            Default_Due_Date: "5th of each month",
            First_Due_Date: "01-Feb-18",
            Due_Date: new Date('05-Feb-18'),
            Scheduled_Frequency: "Monthly",
            Proof_Of_Compliance_Mandatory: "No",
            Owner_Name: 'Finance',
            Approver_Name: 'Shivesh Verma',
            Category: 'Finance',
            Status: 'NA',
            Status2: 'Due'
          },
          {
            Compliance_Instance_ID: 1004,
            Compliance_ID: 6789,
            Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
            Location: "HMVL - Office - Begusarai - Kachhari Road - HR/ Begusarai/ Bihar/ Office",
            Compliance_Categorization: "REPORTING",
            Compliance_Header: "Quarterly Wage Report",
            Compliance_Description: "Submit a quarterly wage report in Form XIV to the Labour Commissioner by the 15th of the first month following the end of the quarter.",
            Penalty_Description: "Fine up to Rs. 500 for late submission",
            Compliance_Applicability: "EMPLOYERS",
            Bare_Act_Text: "File any discrepancies in wages with the Labour Commissioner within fifteen days of detection, accompanied by a fee of ten rupees.",
            Compliance_Clause: "Section 12 and Rule 14",
            Compliance_Type: "Ongoing",
            Compliance_Frequency: "Quarterly",
            Compliance_Statutory_Authority: "LABOUR COMMISSIONER",
            Approval_Required: "No",
            Criticality: "Medium",
            Penalty_Type: "Fine",
            Default_Due_Date: "15th of January, April, July, October",
            First_Due_Date: "15-Jan-18",
            Due_Date: new Date('15-Jan-18'),
            Scheduled_Frequency: "Quarterly",
            Proof_Of_Compliance_Mandatory: "No",
            Owner_Name: 'Ravi Shankar Singh',
            Approver_Name: 'Shivesh Verma',
            Category: 'HR',
            Status: 'Complied without Proof',
            Status2: 'Upcoming'          
          },
          {
            Compliance_Instance_ID: 1005,
            Compliance_ID: 7890,
            Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
            Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
            Compliance_Categorization: "LICENSE / REGISTRATION",
            Compliance_Header: "Renewal of Trade License",
            Compliance_Description: "Apply for the renewal of the trade license in Form VII at least 30 days before the license expiry date to the Municipal Authority along with the necessary fee.",
            Penalty_Description: "Late fee up to Rs. 300",
            Compliance_Applicability: "TRADE LICENSE HOLDERS",
            Bare_Act_Text: "In case of loss of the trade license, report to the Municipal Authority within seven days and apply for a duplicate license with a fee of fifteen rupees.",
            Compliance_Clause: "Section 5 and Rule 8",
            Compliance_Type: "On Going",
            Compliance_Frequency: "Annually",
            Compliance_Statutory_Authority: "MUNICIPAL AUTHORITY",
            Approval_Required: "Yes",
            Criticality: "High",
            Penalty_Type: "Fine",
            Default_Due_Date: "1st June 1st December",
            First_Due_Date: "01-June-17",
            Due_Date: new Date('01-June-17'),
            Scheduled_Frequency: "Yearly",
            Proof_Of_Compliance_Mandatory: "No",
            Owner_Name: 'HR',
            Approver_Name: 'Shivesh Verma',
            Category: 'Legal',
            Status: 'Not Complied',
            Status2: 'Due'
          }
            // Add more mock data items here...
        ];

        setData(mockData);
    }, []);

    const handleUploadAll = (selectedComplianceIds: number[], remark: string) => {
        // Here you would typically send this data to your backend
        console.log(`Uploading ${selectedComplianceIds.length} compliances with remark: ${remark}`);
        
        // Update the local state to reflect the changes
        setData(prevData => prevData.map(item => 
            selectedComplianceIds.includes(item.Compliance_Instance_ID) 
                ? { ...item, Status: 'Complied' as const } 
                : item
        ));
    };

    const handleUploadSingle = (complianceId: number, isProofMandatory: boolean, file?: File, remark?: string) => {
        // Here you would typically send this data to your backend
        console.log(`Uploading compliance ${complianceId}. Proof mandatory: ${isProofMandatory}. File: ${file?.name}. Remark: ${remark}`);
        
        // Update the local state to reflect the changes
        setData(prevData => prevData.map(item => 
            item.Compliance_Instance_ID === complianceId 
                ? { ...item, Status: 'Complied' as const } 
                : item
        ));
    };
    const handleUpdateStatus = (complianceId: number, newStatus: DueComplianceDataRow['Status']) => {
      // Update the local state to reflect the status change
      setData(prevData => prevData.map(item => 
          item.Compliance_Instance_ID === complianceId 
              ? { ...item, Status: newStatus } 
              : item
      ));
  };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Due Compliance</h3>
                <DueComplianceTableTool data={data} onUploadAll={handleUploadAll} />
            </div>
            <DueComplianceTable data={data} onUploadSingle={handleUploadSingle} onUpdateStatus={handleUpdateStatus} />
        </AdaptableCard>
    );
};

export default DueCompliance;