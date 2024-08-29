import React, { useState } from 'react';
import { Badge, Button, Dialog, Notification, toast } from '@/components/ui';
import DataTable from '@/components/shared/DataTable';
import { ColumnDef } from '@/components/shared/DataTable';
import { RiDownloadLine } from 'react-icons/ri';
import { FaDownload } from 'react-icons/fa6';

interface CertificateData {
  complianceId: number;
  complianceHeader: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}

const statusColor: Record<string, string> = {
  Active: 'bg-emerald-500',
  Pending: 'bg-yellow-500',
  Rejected: 'bg-red-500',
};

const initialData: CertificateData[] = [
  { complianceId: 3236, complianceHeader: 'Renewal of Registration', issueDate: '2024-01-15', expiryDate: '2025-01-14', status: 'Active' },
  { complianceId: 4501, complianceHeader: 'Annual Renewal of License', issueDate: '2024-03-01', expiryDate: '2024-03-31', status: 'Active' },
  { complianceId: 5602, complianceHeader: 'Monthly Compliance Report',  issueDate: '2024-04-01', expiryDate: '2024-06-30', status: 'Active' },
  { complianceId: 6789, complianceHeader: 'Quarterly Wage Report',   issueDate: '2024-04-01', expiryDate: '2024-06-30', status: 'Active' },
  { complianceId: 7890, complianceHeader: 'Renewal of Trade License',   issueDate: '2024-04-01', expiryDate: '2024-06-30', status: 'Active' },
];

const DownloadCertificateButton = () => {
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
          Certificate downloaded successfully!
        </Notification>,
        {
          placement: 'top-end',
        }
      );
    };

  const handleCancel = () => {
      setIsDialogOpen(false);
  };

  return (
      <>
          <Button className='border-none h-8'
              onClick={handleAssignClick}
          >
            <FaDownload />
          </Button>

          <Dialog
              isOpen={isDialogOpen}
              onClose={handleCancel}
              width={400}
          >
              <h5 className="mb-4">Confirm Download</h5>
              <p>Are you sure you want to download certificate?</p>
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
const ComplianceCertificateDetails = () => {
  const [data] = useState(initialData);

  const handleDownload = (id: number) => {
    // Implement the download logic here
    console.log(`Downloading certificate for compliance ID: ${id}`);
    // You would typically make an API call here to fetch the certificate
    // and then use the browser's download capabilities to save the file
  };

  const columns: ColumnDef<CertificateData>[] = [
    {
      header: 'Compliance ID',
      accessorKey: 'complianceId',
    },
    {
      header: 'Compliance Header',
      accessorKey: 'complianceHeader',
    },
    {
      header: 'Issue Date',
      accessorKey: 'issueDate',
    },
    {
      header: 'Expiry Date',
      accessorKey: 'expiryDate',
    },
    {
      header: 'Status',
      accessorKey: 'status',
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
      header: 'Action',
      id: 'action',
      cell: ({ row }) => (
        <DownloadCertificateButton />
      ),
    },
  ];

  return (
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={false}
      />
  );
};

export default ComplianceCertificateDetails;