import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle, HiUpload } from 'react-icons/hi'
import DueComplianceFilter from './DueComplianceFilter'
import DueComplianceTableSearch from './DueComplianceTableSearch'
import { Link } from 'react-router-dom'
import { Dialog, Input, Notification, toast } from '@/components/ui'

// Import or define the DueComplianceDataRow type
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

interface DueComplianceTableToolProps {
  data: DueComplianceDataRow[];
  onUploadAll: (selectedComplianceIds: number[], remark: string) => void;
}

const documentPath = "../store/AllMappedCompliancesDetails.xls";

const BulkUploadButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAssignClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    // Here you would typically handle the file upload and remark submission
    // For this example, we'll just show a success notification
    toast.push(
      <Notification
        title="Success"
        type="success"
      >
        Upload successfully!
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setFile(null);
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // Implement the download functionality here
    // For example, you could use the `fetch` API to download the file
    fetch(documentPath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'AllMappedCompliancesDetails.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => console.error('Download failed'));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <Button 
        variant="solid" 
        size="sm" 
        icon={<HiUpload />} 
        onClick={handleAssignClick}
      >
        Bulk Upload
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={450}
      >
        <h5 className="mb-4">Download/Upload Pending Compliances</h5>
        <div className="my-4 flex gap-2 items-center">
          <p>Download Pending Compliance List</p>
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline ">
            <Button size='xs' icon={<HiDownload />} variant='solid'>Download</Button>
          </a>
        </div>
        <div className='flex flex-col gap-2'>
        <p>Upload Updated Pending Compliance List</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          />
        </div>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Enter remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
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

const DueComplianceTableTool: React.FC<DueComplianceTableToolProps> = ({ data, onUploadAll }) => {
  const navigate = useNavigate();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [remark, setRemark] = useState('');

  const handleUploadClick = () => {
    const eligibleCompliances = data.filter(item => item.Proof_Of_Compliance_Mandatory === 'No');
    setSelectedCount(eligibleCompliances.length);
    setDialogIsOpen(true);
  };

  const handleConfirm = () => {
    const eligibleComplianceIds = data
      .filter(item => item.Proof_Of_Compliance_Mandatory === 'No')
      .map(item => item.Compliance_Instance_ID);
    onUploadAll(eligibleComplianceIds, remark);
    setDialogIsOpen(false);
    setRemark('');

    toast.push(
        <Notification title='Success' type='success'>
            Compliance Uploaded Successfully
        </Notification>
    )
  };

  const handleCopyFromPreviousMonth = () => {
    navigate('/app/IHRC/compliance-reupload/new');
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <DueComplianceTableSearch />
      <DueComplianceFilter />
      <BulkUploadButton />
      
      <div className="block lg:inline-block md:mb-0 mb-4">
        <Button
          size="sm"
          variant='solid'
          icon={<HiPlusCircle />}
          onClick={handleCopyFromPreviousMonth}
        >
          Copy from Previous Month Data
        </Button>
      </div>

      <Dialog isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
        <h5 className="mb-4">Upload Compliances</h5>
        <p>{selectedCount} compliances selected for upload.</p>
        <Input 
          placeholder="Enter remark" 
          textArea 
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={() => setDialogIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default DueComplianceTableTool