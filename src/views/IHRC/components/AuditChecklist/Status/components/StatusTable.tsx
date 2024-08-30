import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Badge, Dialog, toast, Notification, Input } from '@/components/ui';
import { RiCheckLine, RiCloseLine, RiUploadLine } from 'react-icons/ri';
import StatusTableFilter from './StatusTableFilter';
import StatusTableSearch from './StatusTableSearch';
import { useNavigate } from 'react-router-dom';

interface StatusDataRow {
  Compliance_Id: number;
  Compliance_Header: string;
  Compliance_Status: string;
}

interface StatusTableProps {
  onFilterChange: (filter: string) => void;
  onSearch: (searchTerm: string) => void;
  onClearAll: () => void;
  currentFilter: string;
}

const initialData: StatusDataRow[] = [
  { Compliance_Id: 3236, Compliance_Header: 'Renewal of Registration', Compliance_Status: 'Active' },
  { Compliance_Id: 4501, Compliance_Header: 'Annual Renewal of License', Compliance_Status: 'Pending' },
  { Compliance_Id: 5602, Compliance_Header: 'Monthly Compliance Report', Compliance_Status: 'Pending' },
  { Compliance_Id: 6789, Compliance_Header: 'Quarterly Wage Report', Compliance_Status: 'Pending' },
  { Compliance_Id: 7890, Compliance_Header: 'Renewal of Trade License', Compliance_Status: 'Rejected' },
  { Compliance_Id: 9012, Compliance_Header: 'Bi-Annual Compliance Audit', Compliance_Status: 'Active' },
  { Compliance_Id: 1111, Compliance_Header: 'Annual Financial Report', Compliance_Status: 'Active' },
  { Compliance_Id: 6666, Compliance_Header: 'Monthly Inventory Report', Compliance_Status: 'Active' },
  { Compliance_Id: 1234, Compliance_Header: 'Annual IT Security Audit', Compliance_Status: 'Pending' },
  { Compliance_Id: 5678, Compliance_Header: 'Renewal of Professional License', Compliance_Status: 'Rejected' },
  { Compliance_Id: 9010, Compliance_Header: 'Renewal of Business Permit', Compliance_Status: 'Rejected' },
];

const statusColor: Record<string, string> = {
  Active: 'bg-emerald-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

const ReuploadDialog = ({ isOpen, onClose, onConfirm }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      width={400}
    >
      {/* <h5 className="mb-4">Confirm Reupload</h5>
      <p>Are you sure you want to reupload the file?</p>
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
      </div> */}
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
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={onConfirm}>
            Submit
          </Button>
        </div>
    </Dialog>
  );
};

const ViewReuploadButton = ({ compliance }: { compliance: StatusDataRow }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReuploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmReupload = () => {
    setIsDialogOpen(false);
    // Implement the reupload logic here
    console.log('Reuploading file for compliance:', compliance.Compliance_Id);
    
    // Show toast notification
    toast.push(
      <Notification
        title="Success"
        type="success"
      >
        File reuploaded successfully!
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  };

  return (
    <>
      <Button
        size="sm"
        variant="solid"
        color="blue"
        onClick={handleReuploadClick}
        icon={<RiUploadLine />}
      >
        Reupload
      </Button>
      <ReuploadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmReupload}
      />
    </>
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

  const columns: ColumnDef<StatusDataRow>[] = useMemo(
    () => [
      {
        header: 'Compliance ID',
        accessorKey: 'Compliance_Id',
        cell: (props) => (
          <div className="w-24 text-start">{props.getValue()}</div>
        ),
      },
      {
        header: 'Compliance Header',
        accessorKey: 'Compliance_Header',
        cell: (props) => {
          const value = props.getValue() as string;
          return (
            <Tooltip title={value} placement="top">
              <div className="w-46 truncate">{value}</div>
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
          if (status === 'pending') {
            return (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="solid"
                  color="emerald"
                  onClick={() => handleStatusChange(row.original.Compliance_Id, 'Active')}
                  icon={<RiCheckLine />}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  color="red"
                  onClick={() => handleStatusChange(row.original.Compliance_Id, 'Rejected')}
                  icon={<RiCloseLine />}
                >
                  Reject
                </Button>
              </div>
            );
          } else if (status === 'rejected') {
            return (
              <ViewReuploadButton compliance={row.original} />
            );
          } else {
            return null;
          }
        },
      },
    ],
    [handleStatusChange]
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
        <div>
          <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button>
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
    </div>
  );
};

export default StatusTable;