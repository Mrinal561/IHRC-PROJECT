import React, { useState } from 'react';
import { Button, Dialog, Tooltip, toast, Notification, Select } from '@/components/ui';
import { HiDownload, HiPlusCircle } from 'react-icons/hi';
import { FaDownload } from 'react-icons/fa';
import AssignChecklistTableFilter from './AssignChecklistTableFilter';
import AssignChecklistTableSearch from './AssignChecklistTableSearch';
import BulkAlertButton from './BulkAlertButton';
import { ActionMeta, components, SingleValue } from 'react-select'
import { FaChevronDown } from 'react-icons/fa'
import DashboardFilter from '../../../Home/components/DashboardFilter'
import Company from './Company';
// Instead of importing the file directly, we'll use a string path
const documentPath = "../store/AllMappedCompliancesDetails.xls";

const BulkSetOwnerApproverButton = () => {
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
        Owner/Approver set successfully!
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
    <div className='flex items-center justify-center gap-3'>
    <BulkAlertButton/>
      <Button 
        block 
        variant="solid" 
        size="sm" 
        icon={<HiPlusCircle />} 
        onClick={handleAssignClick}
      >
        Bulk Owner/Approver
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={450}
      >
        <h5 className="mb-4">Set Owner/Approver</h5>
        <div className="my-4 flex items-center gap-2">
        <p>Download Assigned Compliance</p>
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            <Button size='xs' icon={<HiDownload />} variant='solid'>Download</Button>
          </a>
        </div>
        <div className='flex flex-col gap-2'>
        <p>Upload Assigned Compliance</p>
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
    </div>
  );
};
const AssignChecklistTableTool = () => {

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div>
      {/* <AssignChecklistTableSearch /> */}
        </div>
        <Company />
      <div>
        <BulkSetOwnerApproverButton />
      </div>
    </div>
  );
};

export default AssignChecklistTableTool;