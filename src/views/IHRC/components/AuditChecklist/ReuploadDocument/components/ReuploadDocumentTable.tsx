import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Dialog, toast, Notification, Tooltip } from '@/components/ui';
import { HiOutlineEye, HiOutlineUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import dummyPdf from '../../../../../../../public/dummy.pdf';

// Define types
type ComplianceRow = {
  Compliance_Id: number;
  Legislation: string;
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
  Due_Date: string;
  Scheduled_Frequency: string;
  Proof_Of_Compliance_Mandatory: string;
}

const SimplePDFViewer = ({ pdfUrl }) => {
  return (
    <div className="pdf-viewer" style={{ width: '100%', height: '500px' }}>
      <object
        data={pdfUrl}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>It appears you don't have a PDF plugin for this browser. 
        No worries, you can <a href={pdfUrl}>click here to download the PDF file.</a></p>
      </object>
    </div>
  );
};

const complianceData: ComplianceRow[] = [
    {
        Compliance_Id: 3236,
        Legislation: "Bihar Shops and Establishments Act 1953 and Bihar Shops Establishments Rules 1955/ Bihar/ IR",
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
        Due_Date: "14-Apr-17",
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 4501,
        Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
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
        Due_Date: "31-Dec-17",
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 5602,
        Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
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
        Due_Date: "05-Feb-18",
        Scheduled_Frequency: "Monthly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 6789,
        Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
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
        Due_Date: "15-Jan-18",
        Scheduled_Frequency: "Quarterly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 7890,
        Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
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
        Due_Date: "01-June-17",
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 8912,
        Legislation: "Uttar Pradesh Shops and Establishments Act 1962 and Uttar Pradesh Shops Rules 1964/ Uttar Pradesh/ IR",
        Compliance_Categorization: "REGISTRATION / REPORTING",
        Compliance_Header: "Annual Health and Safety Report",
        Compliance_Description: "Submit an annual health and safety report in Form V to the Labour Department by the end of the financial year.",
        Penalty_Description: "Penalty up to Rs. 1000 for non-submission",
        Compliance_Applicability: "EMPLOYERS",
        Bare_Act_Text: "Notify any health and safety incidents to the Labour Department within seven days, with a fee of twenty rupees for each incident report.",
        Compliance_Clause: "Section 9 and Rule 7",
        Compliance_Type: "Ongoing",
        Compliance_Frequency: "Annually",
        Compliance_Statutory_Authority: "LABOUR DEPARTMENT",
        Approval_Required: "No",
        Criticality: "High",
        Penalty_Type: "Fine",
        Default_Due_Date: "31st March",
        First_Due_Date: "31-Mar-18",
        Due_Date: "31-Mar-18",
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },


];

const ReuploadDocumentTable: React.FC = () => {
  const [uploadDialog, setUploadDialog] = useState<{ open: boolean; compliance: ComplianceRow | null }>({ open: false, compliance: null });
  const navigate = useNavigate();

  const handleUploadDocument = (compliance: ComplianceRow) => {
    setUploadDialog({ open: true, compliance });
  };

  const handleConfirmUpload = () => {
    setUploadDialog({ open: false, compliance: null });
    toast.push(
      <Notification title="Success" type="success">
        Document uploaded successfully
      </Notification>
    );
  };

  const handleViewDetails = (compliance: ComplianceRow) => {
    navigate(`/app/IHRC/compliance-list-detail/${compliance.Compliance_Id}`, {
      state: compliance,
    });
  };

  const columns: ColumnDef<ComplianceRow>[] = useMemo(
    () => [
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_Id',
        cell: (props) => (
          <Tooltip title={`Compliance ID: ${props.getValue()}`} placement="top">
            <div className="w-14 truncate">{props.getValue()}</div>
          </Tooltip>
        ),
      },
      {
        header: 'Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-38 truncate">{value.length > 25 ? value.substring(0, 25) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Legislation',
        accessorKey: 'Legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-32 truncate">{value.length > 25 ? value.substring(0, 25) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
    //   {
    //     header: 'Category',
    //     accessorKey: 'Compliance_Categorization',
    //     cell: (props) => (
    //       <Tooltip title={props.getValue() as string} placement="top">
    //         <div className="w-40 truncate">{props.getValue()}</div>
    //       </Tooltip>
    //     ),
    //   },
      {
        header: 'Description',
        accessorKey: 'Compliance_Description',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="left">
              <div className="w-52 truncate">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="solid"
                // icon={<HiOutlineEye />}
                onClick={() => handleViewDetails(row.original)}
              >
                View Details
              </Button>
              <Button
                size="sm"
                variant="solid"
                // icon={<HiOutlineUpload />}
                onClick={() => handleUploadDocument(row.original)}
              >
                Uploaded Document
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const [tableData, setTableData] = useState({
    total: complianceData.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
  };

  const onSelectChange = (value: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
  };

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={complianceData}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={false}
        pagingData={{
          total: tableData.total,
          pageIndex: tableData.pageIndex,
          pageSize: tableData.pageSize,
        }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />

      <Dialog
        isOpen={uploadDialog.open}
        onClose={() => setUploadDialog({ open: false, compliance: null })}
      >
        <h5 className="mb-4">Uploaded Document (Dummy PDF)</h5>
        <div style={{ height: '500px', overflow: 'auto' }}>
          <SimplePDFViewer pdfUrl={dummyPdf} />
        </div>
        <div className="text-right mt-6">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => setUploadDialog({ open: false, compliance: null })}
          >
            Close
          </Button>
          <Button variant="solid" onClick={handleConfirmUpload}>
            Submit
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ReuploadDocumentTable;