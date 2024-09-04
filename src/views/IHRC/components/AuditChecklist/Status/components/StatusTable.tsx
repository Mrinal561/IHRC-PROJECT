

import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Badge, Dialog, toast, Notification, Checkbox, Input } from '@/components/ui';
import { RiCheckLine, RiCloseLine, RiUploadLine, RiDownloadLine, RiEyeLine } from 'react-icons/ri';
import StatusTableFilter from './StatusTableFilter';
import StatusTableSearch from './StatusTableSearch';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { startOfMonth, endOfMonth, subMonths, subYears } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { HiDownload } from 'react-icons/hi';
export interface StatusDataRow {
  Compliance_Id: number;
  Compliance_Header: string;
  Compliance_Instance_ID: number;
  Compliance_Status: string;
  Location: string;
  Legislation: string;
  Compliance_Categorization: string;
  Compliance_Description: string;
  Compliance_Applicability: string;
  Compliance_Clause: string;
  Compliance_Type: string;
  Compliance_Frequency: string;
  Criticality: string;
  Owner:string;
  Approver:string;
  Compliance_Month_Date:string;
  Uploaded_Date:string;
  Proof:string;
  Remark:string;
  Bare_Act_Text:string;
}

interface StatusTableProps {
  onFilterChange: (filter: string) => void;
  onSearch: (searchTerm: string) => void;
  onClearAll: () => void;
  currentFilter: string;
}

const initialData: StatusDataRow[] = [
  {
    Compliance_Id: 3237,
    Compliance_Header: "Annual License Renewal",
    Compliance_Status: "Pending",
    Location: "HMVL - Office - Aurangabad - Priyavrat Path - HR/ Aurangabad/ Bihar/ Office",    Compliance_Instance_ID: 1002,
    Legislation: "Maharashtra Shops and Establishments Act 1948",
    Compliance_Categorization: "Licensing",
    Compliance_Description: "This compliance involves renewing the annual license required for operating a shop or establishment under the Maharashtra Shops and Establishments Act.",
    Compliance_Applicability: "All registered shops and establishments operating in Maharashtra.",
    Compliance_Clause: "Section 15 of the Maharashtra Shops and Establishments Act, 1948",
    Compliance_Type: "Renewal",
    Compliance_Frequency: "Annual",
    Criticality: "High",
    Owner: "Amit Kumar",
    Approver: "Sonia Mehta",
    Uploaded_Date: "2024-08-01",
    Compliance_Month_Date: "2024-08-30",
    Proof: "Renewal receipt number 456789",
    Remark: "Renewal completed on time without any issues.",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3238,
    Compliance_Header: "Health and Safety Inspection",
    Compliance_Status: "Pending",
    Location: "HMVL - Office - Muzaffarpur - sadtpur - HR/ Muzaffarpur/ Bihar/ Office",
    Compliance_Instance_ID: 1003,
    Legislation: "Tamil Nadu Factories Act 1948",
    Compliance_Categorization: "Inspection",
    Compliance_Description: "Arrange for a health and safety inspection to be conducted within the stipulated time frame.",
    Compliance_Applicability: "Factories and industrial units in Tamil Nadu.",
    Compliance_Clause: "Section 25 of the Tamil Nadu Factories Act, 1948",
    Compliance_Type: "Inspection",
    Compliance_Frequency: "Annual",
    Criticality: "Medium",
    Owner: "Amit Kumar",
    Approver: "Nisha Sharma",
    Uploaded_Date: "2024-07-15",
    Proof: "Inspection appointment letter",
    Remark: "Inspection schedule is pending.",
    Compliance_Month_Date: "2024-07-30",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3239,
    Compliance_Header: "Employee Welfare Fund Contribution",
    Compliance_Status: "Pending",
    Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
    Compliance_Instance_ID: 1004,
    Legislation: "Karnataka Shops and Establishments Act 1961",
    Compliance_Categorization: "Fund Contribution",
    Compliance_Description: "Monthly contribution to the employee welfare fund.",
    Compliance_Applicability: "Shops and establishments in Karnataka.",
    Compliance_Clause: "Section 12 of the Karnataka Shops and Establishments Act, 1961",
    Compliance_Type: "Contribution",
    Compliance_Frequency: "Monthly",
    Criticality: "High",
    Owner: "Ravi Patel",
    Approver: "Sonia Mehta",
    Uploaded_Date: "2024-08-05",
    Proof: "Bank deposit slip",
    Remark: "Contribution for the current month is in progress.",
    Compliance_Month_Date: "2024-08-07",
    
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3240,
    Compliance_Header: "Payment of Professional Tax",
    Compliance_Status: "Pending",
    Location: "HMVL - Office - Begusarai - Kachhari Road - HR/ Begusarai/ Bihar/ Office",
    Compliance_Instance_ID: 1005,
    Legislation: "West Bengal Professional Tax Act 1976",
    Compliance_Categorization: "Tax Payment",
    Compliance_Description: "Monthly payment of professional tax for employees.",
    Compliance_Applicability: "Employers in West Bengal.",
    Compliance_Clause: "Section 5 of the West Bengal Professional Tax Act, 1976",
    Compliance_Type: "Tax Payment",
    Compliance_Frequency: "Monthly",
    Criticality: "Medium",
    Owner: "Anita Roy",
    Approver: "Rajesh Kumar",
    Uploaded_Date: "2024-08-10",
    Proof: "Tax payment receipt",
    Remark: "Payment for the current month has been completed.",
    Compliance_Month_Date: "2024-08-15",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3241,
    Compliance_Header: "Annual Return Filing",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
    Compliance_Instance_ID: 1006,
    Legislation: "Delhi Shops and Establishments Act 1954",
    Compliance_Categorization: "Annual Filing",
    Compliance_Description: "Submission of annual business return.",
    Compliance_Applicability: "Shops and establishments in Delhi.",
    Compliance_Clause: "Section 24 of the Delhi Shops and Establishments Act, 1954",
    Compliance_Type: "Filing",
    Compliance_Frequency: "Annual",
    Criticality: "High",
    Owner: "Deepak Singh",
    Approver: "Rita Sharma",
    Uploaded_Date: "2024-08-12",
    Proof: "Submission acknowledgment",
    Remark: "Filing is pending and due soon.",
    Compliance_Month_Date: "2024-09-30",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3242,
    Compliance_Header: "Labour Welfare Contributions",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Darbhanga - Laximnagar - HR/ Darbhanga/ Bihar/ Office",
    Compliance_Instance_ID: 1007,
    Legislation: "Gujarat Labour Welfare Fund Act 1961",
    Compliance_Categorization: "Fund Contribution",
    Compliance_Description: "Quarterly contribution to the labour welfare fund.",
    Compliance_Applicability: "Establishments in Gujarat.",
    Compliance_Clause: "Section 8 of the Gujarat Labour Welfare Fund Act, 1961",
    Compliance_Type: "Contribution",
    Compliance_Frequency: "Quarterly",
    Criticality: "Medium",
    Owner: "Pooja Patel",
    Approver: "Amit Desai",
    Uploaded_Date: "2024-08-20",
    Proof: "Contribution statement",
    Remark: "Contribution for the current quarter is in progress.",
    Compliance_Month_Date: "2024-09-30",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3243,
    Compliance_Header: "Occupational Health Report",
    Compliance_Status: "Rejected",
    Location: "HMVL - Office - Bhagalpur - Barari Road - HR/ Bhagalpur/ Bihar/ Office",
    Compliance_Instance_ID: 1008,
    Legislation: "Uttar Pradesh Factories Act 1948",
    Compliance_Categorization: "Health Report",
    Compliance_Description: "Bi-annual submission of occupational health report.",
    Compliance_Applicability: "Factories in Uttar Pradesh.",
    Compliance_Clause: "Section 22 of the Uttar Pradesh Factories Act, 1948",
    Compliance_Type: "Report",
    Compliance_Frequency: "Bi-annual",
    Criticality: "High",
    Owner: "Suresh Yadav",
    Approver: "Meena Gupta",
    Uploaded_Date: "2024-08-25",
    Proof: "Report submission receipt",
    Remark: "Report submission was rejected; needs resubmission.",
    Compliance_Month_Date: "2024-09-30",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3244,
    Compliance_Header: "Wage Payment Records",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Patna - Boring Road - HR/ Patna/ Bihar/ Office",
    Compliance_Instance_ID: 1009,
    Legislation: "Andhra Pradesh Shops and Establishments Act 1988",
    Compliance_Categorization: "Record Keeping",
    Compliance_Description: "Maintenance and availability of wage payment records.",
    Compliance_Applicability: "Shops and establishments in Andhra Pradesh.",
    Compliance_Clause: "Section 15 of the Andhra Pradesh Shops and Establishments Act, 1988",
    Compliance_Type: "Record Keeping",
    Compliance_Frequency: "Ongoing",
    Criticality: "Medium",
    Owner: "Vijay Rao",
    Approver: "Lakshmi Reddy",
    Uploaded_Date: "2024-08-30",
    Proof: "Inspection report",
    Remark: "Records are up-to-date and available for inspection.",
    Compliance_Month_Date: "2024-08-31",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3245,
    Compliance_Header: "Registration of New Establishment",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Gaya - Raj Nagar - HR/ Gaya/ Bihar/ Office",
    Compliance_Instance_ID: 1010,
    Legislation: "Kerala Shops and Establishments Act 1960",
    Compliance_Categorization: "Registration",
    Compliance_Description: "Registration of a new business establishment.",
    Compliance_Applicability: "New establishments in Kerala.",
    Compliance_Clause: "Section 5 of the Kerala Shops and Establishments Act, 1960",
    Compliance_Type: "Registration",
    Compliance_Frequency: "One-time",
    Criticality: "High",
    Owner: "Ranjith Nair",
    Approver: "Sreeja Menon",
    Uploaded_Date: "2024-08-12",
    Proof: "Registration application receipt",
    Remark: "Registration process is ongoing.",
    Compliance_Month_Date: "2024-08-15",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3246,
    Compliance_Header: "Quarterly Tax Returns",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Muzaffarpur - sadtpur - HR/ Muzaffarpur/ Bihar/ Office",
    Compliance_Instance_ID: 1011,
    Legislation: "Rajasthan Sales Tax Act 1994",
    Compliance_Categorization: "Tax Filing",
    Compliance_Description: "Quarterly tax return filing for sales tax.",
    Compliance_Applicability: "Businesses in Rajasthan.",
    Compliance_Clause: "Section 10 of the Rajasthan Sales Tax Act, 1994",
    Compliance_Type: "Filing",
    Compliance_Frequency: "Quarterly",
    Criticality: "High",
    Owner: "Karan Singh",
    Approver: "Neha Sharma",
    Uploaded_Date: "2024-08-15",
    Proof: "Quarterly return draft",
    Remark: "Tax returns are pending submission.",
    Compliance_Month_Date: "2024-09-30",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3247,
    Compliance_Header: "Fire Safety Certification",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Patna - Boring Road - HR/ Patna/ Bihar/ Office",
    Compliance_Instance_ID: 1012,
    Legislation: "Haryana Fire Services Act 2009",
    Compliance_Categorization: "Certification",
    Compliance_Description: "Annual fire safety certification.",
    Compliance_Applicability: "All establishments in Haryana.",
    Compliance_Clause: "Section 7 of the Haryana Fire Services Act, 2009",
    Compliance_Type: "Certification",
    Compliance_Frequency: "Annual",
    Criticality: "High",
    Owner: "Rajeev Kumar",
    Approver: "Sunita Rani",
    Uploaded_Date: "2024-08-20",
    Proof: "Certification document",
    Remark: "Certification obtained and compliance achieved.",
    Compliance_Month_Date: "2024-08-30",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3248,
    Compliance_Header: "Environmental Audit",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
    Compliance_Instance_ID: 1013,
    Legislation: "Environment Protection Act 1986",
    Compliance_Categorization: "Audit",
    Compliance_Description: "Annual environmental audit to ensure compliance with environmental standards.",
    Compliance_Applicability: "All industrial units in India.",
    Compliance_Clause: "Section 9 of the Environment Protection Act, 1986",
    Compliance_Type: "Audit",
    Compliance_Frequency: "Annual",
    Criticality: "High",
    Owner: "Prakash Mehra",
    Approver: "Sanjay Patel",
    Uploaded_Date: "2024-08-18",
    Proof: "Audit report submission receipt",
    Remark: "Audit completed and report submitted.",
    Compliance_Month_Date: "2024-09-15",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3249,
    Compliance_Header: "Employee Provident Fund Contribution",
    Compliance_Status: "Rejected",
    Location: "HMVL - Office - Bhagalpur - Barari Road - HR/ Bhagalpur/ Bihar/ Office",
    Compliance_Instance_ID: 1014,
    Legislation: "Employee Provident Fund and Miscellaneous Provisions Act 1952",
    Compliance_Categorization: "Fund Contribution",
    Compliance_Description: "Monthly contribution to the employee provident fund.",
    Compliance_Applicability: "Employers with more than 20 employees.",
    Compliance_Clause: "Section 6 of the Employee Provident Fund and Miscellaneous Provisions Act, 1952",
    Compliance_Type: "Contribution",
    Compliance_Frequency: "Monthly",
    Criticality: "High",
    Owner: "Anil Verma",
    Approver: "Seema Rao",
    Uploaded_Date: "2024-08-22",
    Proof: "Bank deposit slip",
    Remark: "Contribution was rejected due to incorrect details.",
    Compliance_Month_Date: "2024-09-10",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3250,
    Compliance_Header: "Water Usage Reporting",
    Compliance_Status: "Approved",
    Location: "HMVL - Office - Darbhanga - Laximnagar - HR/ Darbhanga/ Bihar/ Office",
    Compliance_Instance_ID: 1015,
    Legislation: "Water (Prevention and Control of Pollution) Act 1974",
    Compliance_Categorization: "Report",
    Compliance_Description: "Monthly reporting of water usage for industrial purposes.",
    Compliance_Applicability: "Industries consuming more than 50,000 liters of water daily.",
    Compliance_Clause: "Section 5 of the Water (Prevention and Control of Pollution) Act, 1974",
    Compliance_Type: "Report",
    Compliance_Frequency: "Monthly",
    Criticality: "Medium",
    Owner: "Pankaj Deshmukh",
    Approver: "Rekha Gupta",
    Uploaded_Date: "2024-08-27",
    Proof: "Report submission acknowledgment",
    Remark: "Water usage report submitted and approved.",
    Compliance_Month_Date: "2024-09-05",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Id: 3251,
    Compliance_Header: "Solid Waste Management Plan",
    Compliance_Status: "Rejected",
    Location: "HMVL - Office - Gaya - Raj Nagar - HR/ Gaya/ Bihar/ Office",
    Compliance_Instance_ID: 1016,
    Legislation: "Solid Waste Management Rules 2016",
    Compliance_Categorization: "Plan Submission",
    Compliance_Description: "Annual submission of a solid waste management plan.",
    Compliance_Applicability: "Municipalities and large housing societies.",
    Compliance_Clause: "Rule 12 of the Solid Waste Management Rules, 2016",
    Compliance_Type: "Plan",
    Compliance_Frequency: "Annual",
    Criticality: "High",
    Owner: "Sunil Kapoor",
    Approver: "Aruna Sharma",
    Uploaded_Date: "2024-08-29",
    Proof: "Plan submission receipt",
    Remark: "Plan was rejected; requires revision.",
    Compliance_Month_Date: "2024-09-25",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  }
];

const statusColor: Record<string, string> = {
  Approved: 'bg-emerald-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

// const { DatePickerRange } = DatePicker;

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      <h5 className="mb-4">{title}</h5>
      <p>{message}</p>
      <div className="mt-6 text-right">
        <Button
          size="sm"
          className="mr-2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

const RejectDialog = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      <h5 className="mb-4">Reject Compliance</h5>
      <Input
        textArea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Remark"
      />
      <div className="mt-6 text-right">
        <Button
          size="sm"
          className="mr-2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={() => {
            onConfirm(reason);
            setReason('');
          }}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

const StatusTable: React.FC<StatusTableProps> = ({
  onSearch,
  onClearAll,
  onFilterChange,
  currentFilter,
}) => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState([
    startOfMonth(subMonths(new Date(), 5)),
    endOfMonth(new Date()),
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = currentFilter === 'ALL'
      ? data
      : data.filter(item => item.Compliance_Status === currentFilter);
    setFilteredData(filtered);
  }, [data, currentFilter]);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedData = data.map((item) =>
      item.Compliance_Id === id
        ? { ...item, Compliance_Status: newStatus }
        : item
    );
    setData(updatedData);

    toast.push(
      <Notification
        title="Status Updated"
        type="success"
      >
        Compliance status updated to {newStatus}
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  };

  const handleBulkApprove = () => {
    const updatedData = data.map((item) =>
      selectedItems.has(item.Compliance_Id)
        ? { ...item, Compliance_Status: 'Approved' }
        : item
    );
    setData(updatedData);
    setSelectedItems(new Set());

    toast.push(
      <Notification
        title="Bulk Action Completed"
        type="success"
      >
        {selectedItems.size} items approved
      </Notification>,
      {
        placement: 'top-end',
      }
    );
    setIsConfirmDialogOpen(false);
  };

  const handleBulkReject = (reason: string) => {
    if (reason.trim()) {
      const updatedData = data.map((item) =>
        selectedItems.has(item.Compliance_Id)
          ? { ...item, Compliance_Status: 'Rejected' }
          : item
      );
      setData(updatedData);
      setSelectedItems(new Set());

      toast.push(
        <Notification
          title="Bulk Action Completed"
          type="success"
        >
          {selectedItems.size} items rejected
          <p>Reason: {reason}</p>
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    } else {
      toast.push(
        <Notification
          title="Bulk Reject Cancelled"
          type="warning"
        >
          Rejection cancelled. No reason provided.
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    }
    setIsRejectDialogOpen(false);
  };

  const BulkDownload = () => {
    toast.push(
      <Notification
        title="Downloaded Successfully"
        type="success"
      >
        <p>All Compliances Downloaded Successfully</p>
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  }

  const handleReject = (id: number) => {
    setCurrentRejectId(id);
    setIsRejectDialogOpen(true);
  };

  const handleConfirmReject = (reason: string) => {
    if (currentRejectId !== null) {
      handleStatusChange(currentRejectId, 'Rejected');
      toast.push(
        <Notification
          title="Compliance Rejected"
          type="warning"
        >
          Compliance ID: {currentRejectId}
          <p>Reason: {reason}</p>
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    }
    setIsRejectDialogOpen(false);
    setCurrentRejectId(null);
  };

  const columns: ColumnDef<StatusDataRow>[] = useMemo(
    () => [
      {
        header: ({ table }) => (
          <Checkbox
            checked={selectedItems.size === filteredData.length}
            onChange={() => {
              if (selectedItems.size === filteredData.length) {
                setSelectedItems(new Set());
              } else {
                setSelectedItems(new Set(filteredData.map(item => item.Compliance_Id)));
              }
            }}
          />
        ),
        id: 'select',
        cell: ({ row }) => (
          <Checkbox
            checked={selectedItems.has(row.original.Compliance_Id)}
            onChange={() => {
              setSelectedItems(prev => {
                const newSet = new Set(prev);
                if (newSet.has(row.original.Compliance_Id)) {
                  newSet.delete(row.original.Compliance_Id);
                } else {
                  newSet.add(row.original.Compliance_Id);
                }
                return newSet;
              });
            }}
          />
        ),
      },
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_Id',
        cell: (props) => (
          <div className="w-24 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Compliance Instance ID',
        accessorKey: 'Compliance_Instance_ID',
        cell: (props) => (
          <div className="w-20 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Location',
        accessorKey: 'Location',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-24 truncate">{value}</div>
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
              <div className="w-24 truncate">{value}</div>
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
              <div className="w-24 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'Compliance_Status',
        cell: ({ getValue }) => {
          const status = getValue<string>();
          return (
            <div className="flex items-center">
              <Badge className={statusColor[status]} />
              <span className="ml-2 rtl:mr-2 capitalize">{status}</span>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => {
          const status = row.original.Compliance_Status.toLowerCase();
          return (
            <div className="flex gap-2">
              {status === 'pending' && (
                <>
                  <Tooltip title="Approve">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(row.original.Compliance_Id, 'Approved')}
                      icon={<RiCheckLine />}
                    />
                  </Tooltip>
                  <Tooltip title="Reject">
                    <Button
                      size="sm"
                      onClick={() => handleReject(row.original.Compliance_Id)}
                      icon={<RiCloseLine />}
                    />
                  </Tooltip>
                </>
              )}
              {(status === 'pending' || status === 'rejected') && (
                <Tooltip title="View Details">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/IHRC/compliance-status-list-detail/${row.original.Compliance_Id}`, { state: row.original })}
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
              )}
              {(status === 'pending' || status === 'rejected') && (
                <Tooltip title="Download">
                  <Button
                    size="sm"
                    onClick={() => console.log('Download', row.original.Compliance_Id)}
                    icon={<RiDownloadLine />}
                  />
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ],
    [selectedItems, filteredData, handleStatusChange, handleReject, navigate]
  );

  const [tableData, setTableData] = useState({
    total: initialData.length,
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

  const onSort = (sort: OnSortParam) => {
    setTableData(prev => ({ ...prev, sort }));
  };

  useEffect(() => {
    setTableData(prev => ({ ...prev, total: filteredData.length }));
  }, [filteredData]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between my-8">
        <div className="flex flex-row items-center gap-4">
          <StatusTableSearch onSearch={onSearch} />
          <StatusTableFilter onFilterChange={onFilterChange} currentFilter={currentFilter} />
        </div>
        <div className="flex gap-2">
        <DatePicker
            selectsRange
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => setDateRange(update)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dateFormat="MMM d, yyyy"
            placeholderText="Select date range"
            portalId="datepicker-portal"
            shouldCloseOnSelect={false}
          />
          <Button
            size="sm"
            onClick={() => setIsConfirmDialogOpen(true)}
            disabled={selectedItems.size === 0}
            variant='solid'
            color='emerald-600'
            className={`text-white ${selectedItems.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Bulk Approve
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRejectDialogOpen(true)}
            disabled={selectedItems.size === 0}
            variant='solid'
            color='red-600'
            className={`text-white ${selectedItems.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Bulk Reject
          </Button>
          <Button size='sm' icon={<HiDownload />} variant='solid' onClick={BulkDownload}>Download</Button>
          {/* <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button> */}
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
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
        onSort={onSort}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleBulkApprove}
        title="Confirm Bulk Approval"
        message={`Are you sure you want to approve ${selectedItems.size} selected items?`}
      />
      <RejectDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
};

export default StatusTable;
