import React, { useState } from 'react';
import { Button, Dialog, Input, toast, Notification } from '@/components/ui';
import {RiUploadLine, RiDownloadLine} from 'react-icons/ri';

const UploadDownload: React.FC = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setTimeout(() => {
        toast.push(
          <Notification title="Success" type="success">
            Document uploaded successfully
          </Notification>,
        );
        setIsUploadDialogOpen(false);
        setSelectedFile(null);
      }, 1000);
    }
  };

  const handleDownload = () => {
    // Simulated download logic
    toast.push(
      <Notification title="Success" type="success">
        Document downloaded successfully
      </Notification>,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-270px)] mt-8">
      <div className="flex space-x-4">
        <Button variant="solid" onClick={handleUploadClick} icon={<RiUploadLine/>}
        >
          Upload
        </Button>
        <Button variant="solid" onClick={handleDownload} icon={<RiDownloadLine/>}>
          Download
        </Button>
      </div>

      <Dialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
      >
        <h5 className="mb-4">Upload Certificate Template</h5>
        <div>
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <div className="text-right">
          <Button variant="solid" onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default UploadDownload;