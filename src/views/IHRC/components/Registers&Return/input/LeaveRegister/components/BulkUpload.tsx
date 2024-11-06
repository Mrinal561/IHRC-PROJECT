import React, { useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { Company } from '@/views/IHRC/store/dummyCompany';
import { HiDownload } from 'react-icons/hi';

interface BulkUploadProps {
    isOpen: boolean;
    onClose: () => void;
    company: Company;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ isOpen, onClose, company }) => {
    const [file, setFile] = useState<File | null>(null);
    const [remark, setRemark] = useState('');

    const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>
        );
    };

    const handleConfirm = () => {
        if (file) {
            // Handle file upload logic here
            console.log('Uploading file:', file, 'for company:', company.company_name, 'with remark:', remark);
            openNotification('success', 'Salary register uploaded successfully');
        }
        handleCancel();
    };

    const handleCancel = () => {
        setFile(null);
        setRemark('');
        onClose();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <Dialog isOpen={isOpen}>
            <h5 className="mb-4">
                Upload Leave Register
            </h5>
            
            <div className="flex flex-col gap-4">
            <div className="my-4 flex gap-2 items-center">
          <p>Download Leave Register Format</p>
          <a className="text-blue-600 hover:underline">
            <Button size="xs" icon={<HiDownload />} >Download</Button>
          </a>
        </div>
                <div className='flex flex-col gap-2'>
                    <label className="block mb-2">Upload Document</label>
                    <Input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                    />
                    {file && (
                        <div className="text-sm text-gray-600 mt-1">
                            Selected file: {file.name}
                        </div>
                    )}
                </div>

                {/* <div>
                    <label className="block mb-2">Remark:</label>
                    <Input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        placeholder="Enter your remark here"
                    />
                </div> */}
            </div>

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
    );
};

export default BulkUpload;