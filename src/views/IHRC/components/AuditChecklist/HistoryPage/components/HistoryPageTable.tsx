
import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification, Badge } from '@/components/ui';
import { FaDownload } from 'react-icons/fa6';
import { HiDownload } from 'react-icons/hi';



// Define the structure of our data
interface HistoryComplianceDataRow {
  Compliance_Instance_ID: number;
  Compliance_ID: number;
  Compliance_Header: string;
  Due_Date: string;
  Owner_Name: string;
  Approver_Name: string;
  Category: string;
  Status: 'Completed';
  Legislation:string;
  Location:string;
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
    Status: 'Completed'
  },
  {
    Compliance_Instance_ID: 1002,
    Compliance_ID: 4501,
    Compliance_Header: 'Annual Renewal of License',
    Due_Date: '01-10-2024',
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma',
    Category: 'HR',
    Status: 'Completed',
    Legislation: "Delhi Factories Act 1948 and Delhi Factories Rules 1950/ Delhi/ IR",
    Location: "HMVL - Office - Arrah - Ramana Pakri Road - HR/ Arrah/ Bihar/ Office",
  },
  {
    Compliance_Instance_ID: 1003,
    Compliance_ID: 5602,
    Compliance_Header: 'Monthly Compliance Report',
    Due_Date: '09-05-2024',
    Owner_Name: 'Finance',
    Approver_Name: 'Shivesh Verma',
    Category: 'Finance',
    Status: 'Completed',
    Legislation: "Karnataka Shops and Commercial Establishments Act 1961 and Karnataka Shops Rules 1963/ Karnataka/ IR",
        Location: "HMVL - Office - Aurangabad - Priyavrat Path - HR/ Aurangabad/ Bihar/ Office",
  },
  {
    Compliance_Instance_ID: 1004,
    Compliance_ID: 6789,
    Compliance_Header: 'Quarterly Wage Report',
    Due_Date: '10-05-2024',
    Owner_Name: 'Ravi Shankar Singh',
    Approver_Name: 'Shivesh Verma',
    Category: 'HR',
    Status: 'Completed',
    Legislation: "Maharashtra Shops and Establishments Act 1948 and Maharashtra Shops Rules 1954/ Maharashtra/ IR",
        Location: "HMVL - Office - Begusarai - Kachhari Road - HR/ Begusarai/ Bihar/ Office",
  },
  {
    Compliance_Instance_ID: 1005,
    Compliance_ID: 7890,
    Compliance_Header: 'Renewal of Trade License',
    Due_Date: '08-01-2024',
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma',
    Category: 'Legal',
    Status: 'Completed',
    Legislation: "Tamil Nadu Shops and Establishments Act 1947 and Tamil Nadu Shops Rules 1959/ Tamil Nadu/ IR",
    Location: "HMVL - Office - Samastipur - ShivSagar Plazza -HR / Samastipur/ Bihar/ Office",
  }
];

const DownloadHistoryButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
  
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
         <Tooltip title="Download" placement="top">
                <Button size="sm" icon={<HiDownload />} onClick={handleAssignClick}>
                </Button>
              </Tooltip>
  
            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCancel}
                width={400}
            >
                <h5 className="mb-4">Confirm Download</h5>
                <p>Are you sure you want to download compliance report?</p>
                <div className="mt-6 text-right">
                    <Button
                        size="sm"
                        className="mr-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </>
    );
  };

const HistoryPageTable: React.FC = () => {
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
        header: 'Compliance Header',
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
        header: 'Status',
        accessorKey: 'Status',
        cell: ({ getValue }) => {
          const status = getValue<'Completed'>();
          let statusColor = 'bg-green-500';
          let textColor = 'text-green-500';
          return (
            <div className="w-24 flex items-center">
              <Badge className= 'mr-2 bg-green-500'/>
              <div className={`font-semibold ${textColor}`}>{status}</div>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({row}) => (
          <DownloadHistoryButton />
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