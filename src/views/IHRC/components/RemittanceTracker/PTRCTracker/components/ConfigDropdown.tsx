
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Tooltip, Dialog, Input, toast, Notification } from '@/components/ui';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { HiUpload } from 'react-icons/hi';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface ConfigDropdownProps {
  companyName?: string;
  companyGroupName?: string;
  trackerId: any;
  onRefresh?: () => void;
}

type DocumentType = 'ptrc_document' | 'ptrc_return';

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

  const getDocumentType = (option: string): DocumentType => {
    switch(option) {
      case 'PT RC Receipt':
        return 'ptrc_document';
      case 'PT RC Return':
        return 'ptrc_return';
      default:
        return 'ptrc_document';
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
      const formData = new FormData();
      formData.append('document', selectedFile);
      
      const documentType = getDocumentType(selectedOption || '');
      formData.append('type', documentType);

      await httpClient.put(
        endpoints.ptrc.uploadDocs(trackerId), 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.push(
        <Notification title="Success" type="success">
          {selectedOption} uploaded successfully
        </Notification>
      );

      if (onRefresh) {
        onRefresh();
      }

      setIsDialogOpen(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
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
      fileInputRef.current.value = '';
    }
  };

  const options = [
    { key: 'PT RC Receipt', label: 'PT Payment Receipt Upload' },
    { key: 'PT RC Return', label: 'PT Return Upload' },
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
      <Tooltip title="Click to upload PT RC documents">
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
            loading={loading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default ConfigDropdown;