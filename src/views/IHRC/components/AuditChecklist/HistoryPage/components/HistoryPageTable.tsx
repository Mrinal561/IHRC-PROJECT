
import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification, Badge } from '@/components/ui';
import { FaDownload } from 'react-icons/fa6';
import { HiDownload, HiOutlineEye } from 'react-icons/hi';
import { RiEyeLine } from 'react-icons/ri';
import { Navigate, useNavigate } from 'react-router-dom';

// Define the structure of our data
export interface HistoryComplianceDataRow {
  Compliance_Instance_ID: number;
  Compliance_ID: number;
  Compliance_Header: string;
  Due_Date: string;
  Owner_Name: string;
  Approver_Name: string;
  Category: string;
  Status: string;
  Legislation:string;
  Location:string;
  Compliance_Categorization: string;
  Compliance_Description: string;
  Compliance_Applicability: string;
  Compliance_Clause: string;
  Compliance_Type: string;
  Compliance_Frequency: string;
  Criticality: string;
  Proof:string;
  Remark:string;
  Bare_Act_Text:string;
}

// Sample data for the table
const initialData: HistoryComplianceDataRow[] = [
  {
    Compliance_Instance_ID: 1001,
    Compliance_ID: 3236,
    Compliance_Header: 'Renewal of Registration',
    Due_Date: '09-10-2024',
    Owner_Name: 'Admin',
    Approver_Name: 'Shivesh Verma',
    Legislation: "Bihar Shops and Establishments Act 1953 and Bihar Shops Establishments Rules 1955/ Bihar/ IR",
    Location: "HMVL - Office - Muzaffarpur - sadtpur - HR/ Muzaffarpur/ Bihar/ Office",
    Category: 'Legal',
    Status: 'Complied',
    Compliance_Description: "This compliance involves renewing the annual license required for operating a shop or establishment under the Maharashtra Shops and Establishments Act.",
    Compliance_Applicability: "All registered shops and establishments operating in Maharashtra.",
    Compliance_Clause: "Section 15 of the Maharashtra Shops and Establishments Act, 1948",
    Compliance_Type: "Renewal",
    Compliance_Frequency: "Annual",
    Compliance_Categorization: "Licensing",
    Criticality:"High",
    Proof: "Renewal receipt number 456789",
    Remark: "Renewal completed on time without any issues.",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
  },
  {
    Compliance_Instance_ID: 1002,
    Compliance_ID: 4501,
    Compliance_Header: 'Annual Renewal of License',
    Due_Date: '01-10-2024',
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma',
    Category: 'HR',
    Status: 'Complied',
    Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
    Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
    Compliance_Description: "This compliance involves renewing the annual license required for operating a shop or establishment under the Maharashtra Shops and Establishments Act.",
    Compliance_Applicability: "All registered shops and establishments operating in Maharashtra.",
    Compliance_Clause: "Section 15 of the Maharashtra Shops and Establishments Act, 1948",
    Compliance_Type: "Renewal",
    Compliance_Frequency: "Annual",
    Compliance_Categorization: "Licensing",
    Proof: "Renewal receipt number 456789",
    Remark: "Renewal completed on time without any issues.",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
    Criticality:"High"
  },
  {
    Compliance_Instance_ID: 1003,
    Compliance_ID: 5602,
    Compliance_Header: 'Monthly Compliance Report',
    Due_Date: '09-05-2024',
    Owner_Name: 'Finance',
    Approver_Name: 'Shivesh Verma',
    Category: 'Finance',
    Status: 'Complied',
    Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
        Location: "HMVL - Office - Aurangabad - Priyavrat Path - HR/ Aurangabad/ Bihar/ Office",

    Compliance_Description: "This compliance involves renewing the annual license required for operating a shop or establishment under the Maharashtra Shops and Establishments Act.",
    Compliance_Applicability: "All registered shops and establishments operating in Maharashtra.",
    Compliance_Clause: "Section 15 of the Maharashtra Shops and Establishments Act, 1948",
    Compliance_Type: "Renewal",
    Compliance_Frequency: "Annual",
    Compliance_Categorization: "Licensing",
    Proof: "Renewal receipt number 456789",
    Remark: "Renewal completed on time without any issues.",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
    Criticality:"High"
  },
  {
    Compliance_Instance_ID: 1004,
    Compliance_ID: 6789,
    Compliance_Header: 'Quarterly Wage Report',
    Due_Date: '10-05-2024',
    Owner_Name: 'Ravi Shankar Singh',
    Approver_Name: 'Shivesh Verma',
    Category: 'HR',
    Status: 'Complied',
    Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
        Location: "HMVL - Office - Begusarai - Kachhari Road - HR/ Begusarai/ Bihar/ Office",
    Compliance_Description: "This compliance involves renewing the annual license required for operating a shop or establishment under the Maharashtra Shops and Establishments Act.",
    Compliance_Applicability: "All registered shops and establishments operating in Maharashtra.",
    Compliance_Clause: "Section 15 of the Maharashtra Shops and Establishments Act, 1948",
    Compliance_Type: "Renewal",
    Compliance_Frequency: "Annual",
    Compliance_Categorization: "Licensing",
    Proof: "Renewal receipt number 456789",
    Remark: "Renewal completed on time without any issues.",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
    Criticality:"High"
  },
  {
    Compliance_Instance_ID: 1005,
    Compliance_ID: 7890,
    Compliance_Header: 'Renewal of Trade License',
    Due_Date: '08-01-2024',
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma',
    Category: 'Legal',
    Status: 'Complied',
    Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
    Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
    Compliance_Description: "This compliance involves renewing the annual license required for operating a shop or establishment under the Maharashtra Shops and Establishments Act.",
    Compliance_Applicability: "All registered shops and establishments operating in Maharashtra.",
    Compliance_Clause: "Section 15 of the Maharashtra Shops and Establishments Act, 1948",
    Compliance_Type: "Renewal",
    Compliance_Frequency: "Annual",
    Compliance_Categorization: "Licensing",
    Proof: "Renewal receipt number 456789",
    Remark: "Renewal completed on time without any issues.",
    Bare_Act_Text: "Report any changes in employment status or wages to the Labour Department within seven days of occurrence, along with a fee of five rupees for each report.",
    Criticality:"High"
  }
];

const DownloadHistoryButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
    const handleAssignClick = () => {
        setIsDialogOpen(true);
    };
  
    const handleConfirm = () => {
        setIsDialogOpen(false);
        toast.push(
          <Notification
            title="Success"
            type="success"
          >
            Compliance Report downloaded successfully!
          </Notification>,
          {
            placement: 'top-end',
          }
        );
      };
  
    const handleCancel = () => {
        setIsDialogOpen(false);
    };
    const value="Download"
  
    return (
        <>
         <Tooltip title="View Details">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/IHRC/compliance-status-list-detail/${row.original.Compliance_Id}`, { state: row.original })}
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
        </>
    );
  };

const HistoryPageTable: React.FC = () => {
  const navigate = useNavigate();
  // State for the table data
  const [data] = useState<HistoryComplianceDataRow[]>(initialData);
 
  const columns: ColumnDef<HistoryComplianceDataRow>[] = useMemo(
    () => [
      {
        header: 'Instance ID',
        accessorKey: 'Compliance_Instance_ID',
        cell: (props) => (
          <div className="w-16 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_ID',
        cell: (props) => (
          <div className="w-24 text-start">{props.getValue()}</div>
        ),
      },
     
      {
        header: 'Legislation',
        accessorKey: 'Legislation',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-28 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Location',
        accessorKey: 'Location',
        cell: (props) => (
          <div className="w-24 text-start truncate">{props.getValue()}</div>
        ),
      },
      {
        header: 'Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-40 truncate">{value}</div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Completion Date',
        accessorKey: 'Due_Date',
        cell: ({ getValue }) => {
          return <div className="w-26 flex items-center justify-center">{getValue<string>()}</div>;
        },
      },
      {
        header: 'Compliance Status',
        accessorKey: 'Status',
        cell: (props) => {
          // const status = getValue<'Completed'>();
          // let statusColor = 'bg-green-500';
          // let textColor = 'text-green-500';
          // return (
          //   <div className="w-30 flex items-center">
          //     <Badge className= 'mr-2 bg-green-500'/>
          //     <div className={`font-semibold ${textColor}`}>{status}</div>
          //   </div>
          const criticality = props.getValue(); // Get the value once
            
                    return (
                        <div className="w-24 font-semibold truncate">
                            {criticality === 'Complied' ? (
                                <span className="text-green-500">{criticality}</span>
                            ) : criticality === 'NA' ? (
                                <span className="text-yellow-500">{criticality}</span>
                            ) : criticality === 'Not Complied' ? ( 
                                <span className="text-red-500">{criticality}</span>
                            ): (
                                <span></span>
                            )}
                        </div>
                    );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({row}) => (
          <Tooltip title="View Compliance Detail">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/app/IHRC/history-list-detail/$  {row.original.Compliance_ID}`, { state: row.original })}
                    icon={<RiEyeLine />}
                  />
                </Tooltip>
        ),
      },
    ],
    []
  );

  // State for table pagination and sorting
  const [tableData, setTableData] = useState({
    total: initialData.length,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  // Function to handle pagination changes
  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
  };

  // Function to handle page size changes
  const onSelectChange = (value: number) => {
    setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
  };

  return (
    <div className="relative">
      {/* Render the DataTable component */}
      <DataTable
        columns={columns}
        data={data}
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

      
    </div>
  );
};

export default HistoryPageTable;