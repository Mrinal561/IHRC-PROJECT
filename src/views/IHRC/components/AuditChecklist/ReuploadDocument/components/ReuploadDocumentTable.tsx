import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Dialog, toast, Notification, Tooltip, Input } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { BsCloudUpload } from 'react-icons/bs';
import { HiOutlineEye, HiUpload } from 'react-icons/hi';


// Define types
type ComplianceRow = {
  Compliance_Id: number;
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
  Due_Date: string;
  Scheduled_Frequency: string;
  Proof_Of_Compliance_Mandatory: string;
}


const complianceData: ComplianceRow[] = [
    {
        Compliance_Id: 3236,
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
        Due_Date: "14-Apr-17",
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 4501,
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
        Due_Date: "31-Dec-17",
        Scheduled_Frequency: "Yearly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 5602,
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
        Due_Date: "05-Feb-18",
        Scheduled_Frequency: "Monthly",
        Proof_Of_Compliance_Mandatory: "Yes"
    },
    {
        Compliance_Id: 6789,
        Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
        Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
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
    

];

const ReuploadDocumentTable: React.FC = () => {
  const [uploadDialog, setUploadDialog] = useState<{ open: boolean; compliance: ComplianceRow | null }>({ open: false, compliance: null });
  const [remark, setRemark] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleUploadDocument = (compliance: ComplianceRow) => {
    setUploadDialog({ open: true, compliance });
  };

  const handleConfirmUpload = () => {
    if (!remark || !selectedFile) {
      toast.push(
        <Notification title="Error" type="danger">
          Please provide both a remark and a file.
        </Notification>
      );
      return;
    }

    setUploadDialog({ open: false, compliance: null });
    setRemark('');
    setSelectedFile(null);
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
            <div className="w-10 truncate">{props.getValue()}</div>
          </Tooltip>
        ),
      },
      {
        header: 'Legislation',
        accessorKey: 'Legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-32 truncate">{value.length > 18 ? value.substring(0, 18) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Location',
        accessorKey: 'Location',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-20 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Compliance Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-36 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Description',
        accessorKey: 'Compliance_Description',
        cell: (props) => {
            const value = props.getValue() as string;
            return (
                <Tooltip title={value} placement="left">
                    <div className="w-40 truncate">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
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
              <Tooltip title="View Details" placement="top">
                <Button
                  size="sm"
                  className='text-[#737171]'
                  icon={<HiOutlineEye />}
                  onClick={() => handleViewDetails(row.original)}
                />
              </Tooltip>
              <Tooltip title="Upload" placement="top">
              <Button
                size="sm"
                onClick={() => handleUploadDocument(row.original)}
              >
                <HiUpload />
              </Button>
            </Tooltip>
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
        onClose={() => {
          setUploadDialog({ open: false, compliance: null });
          setRemark('');
          setSelectedFile(null);
        }}
      >
        <h5 className="mb-4">Upload Document</h5>
        <Input
          textArea
          placeholder="Enter remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="mb-4"
        />
        <Input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <div className="text-right mt-6">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => {
              setUploadDialog({ open: false, compliance: null });
              setRemark('');
              setSelectedFile(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleConfirmUpload}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ReuploadDocumentTable;