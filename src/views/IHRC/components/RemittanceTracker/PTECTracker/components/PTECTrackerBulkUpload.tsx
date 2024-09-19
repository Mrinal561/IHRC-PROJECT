import React, { useState } from 'react';
import { Button, Dialog, Input } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

interface PTTrackerBulkUploadProps {
  onUploadConfirm: () => void;
}

const PTECTrackerBulkUpload: React.FC<PTTrackerBulkUploadProps> = ({ onUploadConfirm }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    navigate('/uploadedptecdetail')
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setFile(null);
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
        onClick={handleUploadClick}
      >
        Upload PT EC
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={450}
      >
        <h5 className="mb-4">Upload PT EC</h5>
        <div className="my-4 flex gap-2 items-center">
          <p>Download PT EC Upload Format</p>
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            <Button size="xs" icon={<HiDownload />}>Download</Button>
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <p>Upload PT EC File:</p>
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <p>Please Enter the Remark:</p>
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

export default PTECTrackerBulkUpload;