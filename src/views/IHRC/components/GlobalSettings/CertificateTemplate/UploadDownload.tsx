import React, { useState } from 'react';
import { Button, Dialog, Input, toast, Notification, Card } from '@/components/ui';
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
      <div className="grid grid-cols-3 gap-8">
          <Card bordered className='shadow-lg'>   
              <div className='flex flex-col gap-4 py-6 px-2'>
                  <h4>Global Compliance Certificate Template</h4>

                  <div className="flex space-x-4 justify-center">
                      <Button
                          size="sm"
                          variant="solid"
                          onClick={handleUploadClick}
                          icon={<RiUploadLine />}
                      >
                          Upload
                      </Button>
                      <Button
                          size="sm"
                          variant="solid"
                          onClick={handleDownload}
                          icon={<RiDownloadLine />}
                      >
                          Download
                      </Button>
                  </div>
              </div>
          </Card>
          <Dialog
              isOpen={isUploadDialogOpen}
              onClose={() => setIsUploadDialogOpen(false)}
          >
              <h5 className="mb-4">Upload Certificate Template</h5>
              <p className="mb-2">Please upload the certificate template</p>
              <div>
                  <Input
                      type="file"
                      onChange={handleFileChange}
                      className="mb-4"
                  />
              </div>
              <div className="text-right">
                  <Button
                      variant="solid"
                      onClick={handleUpload}
                      disabled={!selectedFile}
                  >
                      Upload
                  </Button>
              </div>
          </Dialog>
      </div>
  )
};

export default UploadDownload;