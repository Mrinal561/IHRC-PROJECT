
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Tooltip, Dialog, Input, toast, Notification } from '@/components/ui';
import { HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface ConfigDropdownProps {
  companyName?: string;
  companyGroupName?: string;
  trackerId: any; // Added to track specific document upload
  onRefresh?: () => void; // Optional callback after successful upload
}

const ConfigDropdown: React.FC<ConfigDropdownProps> = ({ 
  companyName, 
  companyGroupName, 
  trackerId,
  onRefresh
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDialogOpen(true);
    setIsOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.push(
        <Notification title="Error" type="danger">
          Please select a file to upload
        </Notification>
      );
      return;
    }

    try {
      setLoading(true)
      // Create FormData to send both file and tracker ID
      const formData = new FormData();
      formData.append('document', selectedFile);
      // formData.append('type', "payment");

      // Example API call - replace with your actual API endpoint
      await httpClient.put(
        endpoints.lwftracker.upload(trackerId), 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Success notification
      toast.push(
        <Notification title="Success" type="success">
          {selectedOption} document uploaded successfully
        </Notification>
      );
      
      // Optional refresh callback
      if (onRefresh) {
        onRefresh();
      }

      // Reset states
      setIsDialogOpen(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    } catch (error) {
      // Error notification
      toast.push(
        <Notification title="Error" type="danger">
           {error.response.data.message}
        </Notification>
      );
      console.error('Upload error:', error);
    } finally {
      setLoading(false)
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input
    }
  };

  const options = [
    { key: 'Payment', label: 'Payment Receipt Upload' },
  ];

  const updateDropdownPosition = () => {
    if (buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      dropdownRef.current.style.position = 'fixed';
      dropdownRef.current.style.top = `${rect.bottom + window.scrollY}px`;
      dropdownRef.current.style.left = `${rect.left + window.scrollX - dropdownWidth + rect.width}px`;
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isOpen]);

  return (
    <>
      <Tooltip title="Click to upload LWF documents">
        <Button
          ref={buttonRef}
          size='sm'
          icon={<HiUpload />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Tooltip>
      {isOpen && ReactDOM.createPortal(
        <div ref={dropdownRef} className="py-2 w-52 bg-white rounded-md shadow-xl mt-2 border border-gray-200 z-50">
          {options.map((option) => (
            <button
              key={option.key}
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleOptionClick(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>,
        document.body
      )}
      <Dialog isOpen={isDialogOpen}>
        <div className='mb-4'>Upload {selectedOption} document</div>
        <div className="flex flex-col gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="mb-4"
             accept='.pdf, .zip, .jpg'
          />
        </div>
        <div className="mt-6 text-right flex gap-2 justify-end items-center">
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
            onClick={handleFileUpload}
            disabled={!selectedFile}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default ConfigDropdown;