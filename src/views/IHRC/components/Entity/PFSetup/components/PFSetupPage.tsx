import React, { useEffect, useState } from 'react';
import { Button, Input, toast, Notification, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { MultiValue, ActionMeta } from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import OutlinedSelect from '@/components/ui/Outlined';

export interface PFSetupData {
  Company_Group_Name: string;
  Company_Name: string;
  pfCode: string;
  pfCodeLocation: string;
  registrationDate?: Date | null;
  dscDate?: Date | null;
  esignStatus: string;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string[];
  pfRegistrationCertificate?: File | null;
}

interface PFSetupPageProps {
  onClose: () => void;
  companyGroupName: string;
  companyName: string;
}

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
  dscFile?: File | null;
  eSignFile?: File | null;
  esignStatus?: string;
}

const PFSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const companyData = location.state?.companyData;
  
    const [pfSetupData, setPfSetupData] = useState<PFSetupData>({
      Company_Group_Name: companyData?.Company_Group_Name || '',
      Company_Name: companyData?.Company_Name || '',
      pfCode: '',
      pfCodeLocation: '',
      authorizedSignatory: [],
      registrationDate: null,
      esignStatus: '',
    });
  
    const [existingSignatories] = useState<Signatory[]>([
      { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com' },
      { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com' },
      { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com' },
    ]);
  
    const [selectedSignatories, setSelectedSignatories] = useState<Signatory[]>([]);
  
    const handleInputChange = (field: keyof PFSetupData, value: string | Date | null | File | string[]) => {
      setPfSetupData(prev => ({ ...prev, [field]: value }));
    };
  
    const handleSignatoryChange = (
      newValue: MultiValue<{ value: string; label: string }>,
      actionMeta: ActionMeta<{ value: string; label: string }>
    ) => {
      const selectedNames = newValue.map(option => option.value);
      handleInputChange('authorizedSignatory', selectedNames);
    
      const newSelectedSignatories = selectedNames.map(name => {
        const existingSignatory = selectedSignatories.find(s => s.name === name);
        if (existingSignatory) {
          return existingSignatory;
        }
        return existingSignatories.find(s => s.name === name) || { name, designation: '', mobile: '', email: '' };
      });
      setSelectedSignatories(newSelectedSignatories);
    };

    const handleESignStatusChange = (signatoryName: string, status: string) => {
      setSelectedSignatories(prev => prev.map(signatory => {
        if (signatory.name === signatoryName) {
          return { ...signatory, esignStatus: status };
        }
        return signatory;
      }));
    };
  
    const handleFileUpload = (signatoryName: string, fileType: 'dsc' | 'eSign', file: File | null) => {
      setSelectedSignatories(prev => prev.map(signatory => {
        if (signatory.name === signatoryName) {
          return {
            ...signatory,
            [fileType === 'dsc' ? 'dscFile' : 'eSignFile']: file
          };
        }
        return signatory;
      }));
    };
  
    const handleSubmit = () => {
      if (pfSetupData.pfCode && pfSetupData.pfCodeLocation && pfSetupData.authorizedSignatory.length > 0) {
        // Here you would typically send the data to your backend
        console.log('Submitting PF Setup:', pfSetupData);
        toast.push(
          <Notification title="Success" type="success">
            <div className="flex items-center">
              <span>PF Setup successfully created</span>
            </div>
          </Notification>
        );
        navigate(-1); // Go back to the previous page
      } else {
        toast.push(
          <Notification title="Error" type="danger">
            <div className="flex items-center">
              <span>Please fill in all required fields</span>
            </div>
          </Notification>
        );
      }
    };

    const handleCancel = () => {
        navigate(-1);
      };
  
    return (
      <div className="container mx-auto py-8">
        <div className='flex gap-3 items-center mb-6'>
        <Button
          variant="plain"
          size="sm"
          icon={<HiArrowLeft />}
          onClick={() => navigate(-1)}
          className="mb-4"
          >
        </Button>
        <h2 className="text-2xl font-bold mb-6">Add PF Setup</h2>
            </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <OutlinedInput
              label="Company Group Name"
              value={pfSetupData.Company_Group_Name}
              onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
            />
            <OutlinedInput
              label="Company Name"
              value={pfSetupData.Company_Name}
              onChange={(value: string) => handleInputChange('Company_Name', value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <OutlinedInput
              label="PF Code"
              value={pfSetupData.pfCode}
              onChange={(value: string) => handleInputChange('pfCode', value)}
            />
            <OutlinedInput
              label="PF Location"
              value={pfSetupData.pfCodeLocation}
              onChange={(value: string) => handleInputChange('pfCodeLocation', value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PF Registration Date</label>
              <DatePicker
                placeholder="Pick a Date"
                value={pfSetupData.registrationDate}
                onChange={(date: Date | null) => handleInputChange('registrationDate', date)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose the Signatories</label>
              <Select
                isMulti
                options={existingSignatories.map(s => ({ value: s.name, label: s.name }))}
                onChange={handleSignatoryChange}
              />
            </div>
          </div>
          {selectedSignatories.length > 0 && (
            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="text-sm font-semibold">Signatory Documents</h3>
              {selectedSignatories.map(signatory => (
                <div key={signatory.name} className="border p-4 rounded-lg">
                  <h4 className="text-sm mb-4">{signatory.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">DSC Upload</label>
                      <Input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0] || null;
                          handleFileUpload(signatory.name, 'dsc', file);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">E-Sign Upload</label>
                      <Input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0] || null;
                          handleFileUpload(signatory.name, 'eSign', file);
                        }}
                      />
                    </div>
                    <div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-4'> DSC Valid Upto </label>
                        <DatePicker
                          placeholder="Pick a Date"
                          value={pfSetupData.dscDate}
                          onChange={(date: Date | null) => handleInputChange('dscDate', date)}
                          size='sm'
                        />          
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-4'>E-Sign Status</label>
                        <div>
                        <OutlinedSelect
                          label="Status"
                          options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                          ]}
                          value={signatory.esignStatus || ''}
                          onChange={(value: string) => handleESignStatusChange(signatory.name, value)}
                          
                          />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PF Registration Certificate</label>
            <Input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0] || null;
                handleInputChange('pfRegistrationCertificate', file);
              }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" variant="solid" onClick={handleSubmit}>Confirm</Button>
          </div>
        </div>
      </div>
  );
};

export default PFSetupPage;