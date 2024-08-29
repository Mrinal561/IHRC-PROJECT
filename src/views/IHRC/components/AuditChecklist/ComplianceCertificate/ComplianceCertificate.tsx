import React, { useState } from 'react'
import ComplianceCertificateDetails from './components/ComplianceCertificateDetails'
import { Button, Dialog, toast, Notification } from '@/components/ui'
import { FaDownload } from 'react-icons/fa6';

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
          <Button
              block
              variant="solid"
              size="sm"
              icon={<FaDownload />}
              onClick={handleAssignClick}
          >
              Download Certificates
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

const ComplianceCertificate = () => {
  return (
    <>
    <div className="lg:flex items-center justify-between mb-8">
      <div>
                <h3 className="mb-4 lg:mb-0">Compliance Certificate</h3>
      </div>
      <div>

      <DownloadCertificateButton />
      </div>
    </div>
      <ComplianceCertificateDetails />
    </>
  )
}

export default ComplianceCertificate