
import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Dialog, Input, toast, Notification, Badge } from '@/components/ui';
import { BsCloudUpload } from "react-icons/bs";



// Define the structure of our data
interface DueComplianceDataRow {
  Compliance_Instance_ID: number;
  Compliance_ID: number;
  Compliance_Header: string;
  Due_Date: Date;
  Owner_Name: string;
  Approver_Name: string;
  Category: string;
  Status: 'due' | 'upcoming' | 'active';
}

// Sample data for the table
const initialData: DueComplianceDataRow[] = [
  {
    Compliance_Instance_ID: 1001,
    Compliance_ID: 3236,
    Compliance_Header: 'Renewal of Registration',
    Due_Date: new Date('2024-09-15'),
    Owner_Name: 'Admin',
    Approver_Name: 'Shivesh Verma',
    Category: 'Legal',
    Status: 'upcoming'
  },
  {
    Compliance_Instance_ID: 1002,
    Compliance_ID: 4501,
    Compliance_Header: 'Annual Renewal of License',
    Due_Date: new Date('2024-10-01'),
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma',
    Category: 'HR',
    Status: 'due'
  },
  {
    Compliance_Instance_ID: 1003,
    Compliance_ID: 5602,
    Compliance_Header: 'Monthly Compliance Report',
    Due_Date: new Date('2024-09-05'),
    Owner_Name: 'Finance',
    Approver_Name: 'Shivesh Verma',
    Category: 'Finance',
    Status: 'active'
  },
  {
    Compliance_Instance_ID: 1004,
    Compliance_ID: 6789,
    Compliance_Header: 'Quarterly Wage Report',
    Due_Date: new Date('2024-10-15'),
    Owner_Name: 'Ravi Shankar Singh',
    Approver_Name: 'Shivesh Verma',
    Category: 'HR',
    Status: 'upcoming'
  },
  {
    Compliance_Instance_ID: 1005,
    Compliance_ID: 7890,
    Compliance_Header: 'Renewal of Trade License',
    Due_Date: new Date('2024-11-01'),
    Owner_Name: 'HR',
    Approver_Name: 'Shivesh Verma',
    Category: 'Legal',
    Status: 'due'
  }
];

const DueComplianceTable: React.FC = () => {
  // State for the table data
  const [data] = useState<DueComplianceDataRow[]>(initialData);
  // State for controlling the dialog
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  // State for the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Function to open the dialog
  const openDialog = () => {
    setDialogIsOpen(true);
  };

  // Function to close the dialog
  const onDialogClose = () => {
    setDialogIsOpen(false);
    setSelectedFile(null);  // Clear the selected file when closing the dialog
  };

  // Function to handle file selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Function to handle form submission
  const onSubmit = () => {
    if (selectedFile) {
      // Here you would typically handle the file upload
      console.log('File selected:', selectedFile.name);
      // Show success toast
      toast.push(
        <Notification title="Success" type="success">
          File uploaded successfully
        </Notification>
      );
      onDialogClose();
    } else {
      // Show error toast if no file is selected
      toast.push(
        <Notification title="Error" type="danger">
          Please select a file first
        </Notification>
      );
    }
  };

  // Define the columns for the table
  const columns: ColumnDef<DueComplianceDataRow>[] = useMemo(
    () => [
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_ID',
        cell: (props) => (
          <div className="w-32 text-start">{props.getValue()}</div>
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
        header: 'Due Date',
        accessorKey: 'Due_Date',
        cell: (props) => (
          <div className="w-32">
            {new Date(props.getValue() as Date).toLocaleDateString()}
          </div>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'Category',
        cell: ({ getValue }) => {
          return <div className="w-28">{getValue<string>()}</div>;
        },
      },
      {
        header: 'Status',
        accessorKey: 'Status',
        cell: ({ getValue }) => {
          const status = getValue<'due' | 'upcoming' | 'active'>();
          let statusColor = 'bg-yellow-500';
          let textColor = 'text-yellow-500';
          if (status === 'due') {
            statusColor = 'bg-red-500';
            textColor = 'text-red-500';
          }
          if (status === 'active') {
            statusColor = 'bg-green-500';
            textColor = 'text-green-500';
          }
          return (
            <div className="flex items-center">
              <Badge className={`mr-2 ${statusColor}`} />
              <div className={`font-semibold ${textColor}`}>{status}</div>
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: () => {
          const value= "Upload";
          return(
            <Tooltip title={value} placement="top">
            <Button
            size="sm"
            onClick={openDialog}
            >
            <BsCloudUpload />
          </Button>
          </Tooltip>
          )
        },
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

     
      <Dialog isOpen={dialogIsOpen} onClose={onDialogClose}>
        <h5 className="mb-4">Upload Confirmation File</h5>
        <p className="mb-6">
          Please upload the file for confirmation.
        </p>
        <Input placeholder="" textArea />
        <Input
          type="file"
          onChange={onFileChange}
          className="mb-4"
        />
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DueComplianceTable;