import React, { useState } from 'react';
import { Button, Input, Dialog } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

export interface ESISetupData {
  Company_Group_Name: string;
  Company_Name: string;
  esiCode: string;
  esiCodeType: string;
  esiCodeLocation: string;
  esiUserId?: string;
  esiPassword?: string;
  authorizedSignatory: string;
  signatoryDesignation?: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  esiRegistrationCertificate?: File | null;
}

interface ESISetupSidePanelProps {
  addPFSetup: (newPFSetup: ESISetupData) => void;
  onClose: () => void;
  companyGroupName: string;
  companyName: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

const ESISetupPanel: React.FC<ESISetupSidePanelProps> = ({
  addPFSetup,
  onClose,
  companyGroupName,
  companyName,
}) => {
  const [esiSetupData, setESISetupData] = useState<ESISetupData>({
    Company_Group_Name: companyGroupName,
    Company_Name: companyName,
    esiCodeType: '',
    esiCode: '',
    esiCodeLocation: '',
    authorizedSignatory: '',
  });

  const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
    { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
    { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
    { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
  ]);

  const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);
  const [newSignatory, setNewSignatory] = useState<Signatory>({
    name: '',
    designation: '',
    mobile: '',
    email: '',
  });

  const handleInputChange = (field: keyof ESISetupData, value: string | File | null) => {
    setESISetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      if (selectedOption.value === 'add_new') {
        setShowAddSignatoryDialog(true);
      } else {
        const selectedSignatory = existingSignatories.find(s => s.name === selectedOption.value);
        if (selectedSignatory) {
          setESISetupData(prev => ({
            ...prev,
            authorizedSignatory: selectedSignatory.name,
            signatoryDesignation: selectedSignatory.designation,
            signatoryMobile: selectedSignatory.mobile,
            signatoryEmail: selectedSignatory.email,
          }));
        }
      }
    }
  };

  const handleSubmit = () => {
    if (esiSetupData.esiCode && esiSetupData.esiCodeLocation && esiSetupData.authorizedSignatory) {
      addPFSetup(esiSetupData);
      onClose();
    } else {
      console.error('Please fill in all required fields.');
    }
  };

  const handleAddSignatory = () => {
    setExistingSignatories(prev => [...prev, newSignatory]);
    setESISetupData(prev => ({
      ...prev,
      authorizedSignatory: newSignatory.name,
      signatoryDesignation: newSignatory.designation,
      signatoryMobile: newSignatory.mobile,
      signatoryEmail: newSignatory.email,
    }));
    setShowAddSignatoryDialog(false);
    setNewSignatory({
      name: '',
      designation: '',
      mobile: '',
      email: '',
    });
  };

  const handleNewSignatoryInputChange = (field: keyof Signatory, value: string) => {
    setNewSignatory(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 space-y-4">
      <div className='flex gap-4 items-center'>
        <OutlinedInput
          label="Company Group Name"
          value={esiSetupData.Company_Group_Name}
          onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
        />
        <OutlinedInput
          label="Company Name"
          value={esiSetupData.Company_Name}
          onChange={(value: string) => handleInputChange('Company_Name', value)}
        />
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-4'>
          <label>Enter the ESI Code Type</label>
          <OutlinedInput
            label="ESI Code Type"
            value={esiSetupData.esiCodeType}
            onChange={(value: string) => handleInputChange('esiCodeType', value)}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>Enter the ESI Code</label>
          <OutlinedInput
            label="ESI Code"
            value={esiSetupData.esiCode}
            onChange={(value: string) => handleInputChange('esiCode', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>Enter the ESI Code Location</label>
          <OutlinedInput
            label="ESI Code Location"
            value={esiSetupData.esiCodeLocation || ''}
            onChange={(value: string ) => handleInputChange('esiCodeLocation', value || '')}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>Enter ESI user ID</label>
          <OutlinedInput
            label="ESI User ID (Optional)"
            value={esiSetupData.esiUserId || ''}
            onChange={(value: string) => handleInputChange('esiUserId', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-4'>
          <label>Enter ESI User Password</label>
          <OutlinedInput
            label="ESI Password (Optional)"
            value={esiSetupData.esiPassword || ''}
            onChange={(value: string) => handleInputChange('esiPassword', value)}
          />
        </div>

        <div className='flex flex-col gap-4 w-52'>
          <label>Choose the Signatory</label>
          <OutlinedSelect
            label="Authorized Signatory"
            options={[
              ...existingSignatories.map(s => ({ value: s.name, label: s.name })),
              { value: 'add_new', label: '+ Add New Signatory' }
            ]}
            value={esiSetupData.authorizedSignatory ? { value: esiSetupData.authorizedSignatory, label: esiSetupData.authorizedSignatory } : null}
            onChange={handleSignatoryChange}
          />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <label>Please upload the ESI certificate</label>
        <Input
          id="file-upload"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] || null;
            handleInputChange('esiRegistrationCertificate', file);
          }}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="solid" onClick={handleSubmit}>Confirm</Button>
      </div>

      <Dialog
        isOpen={showAddSignatoryDialog}
        onClose={() => setShowAddSignatoryDialog(false)}
      >
        <h5 className="mb-4">Add New Signatory</h5>
        <div className="space-y-4">
          <OutlinedInput
            label="Name"
            value={newSignatory.name}
            onChange={(value) => handleNewSignatoryInputChange('name', value)}
          />
          <OutlinedInput
            label="Designation"
            value={newSignatory.designation}
            onChange={(value) => handleNewSignatoryInputChange('designation', value)}
          />
          <OutlinedInput
            label="Mobile"
            value={newSignatory.mobile}
            onChange={(value) => handleNewSignatoryInputChange('mobile', value)}
          />
          <OutlinedInput
            label="Email"
            value={newSignatory.email}
            onChange={(value) => handleNewSignatoryInputChange('email', value)}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => setShowAddSignatoryDialog(false)}>Cancel</Button>
          <Button variant="solid" onClick={handleAddSignatory}>Add Signatory</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ESISetupPanel;