import React, { useState } from 'react';
import { Button, Input, Dialog } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

export interface PTSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    ptState: string;
    ptLocation: string;
    ptEnrollmentNumber: string;
    ptRegistrationNumber: string;
    ptRegistrationDate: string;
    ptRemmitanceMode: string;
    ptUserId?: string;
    ptPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    ptecPaymentFrequency: string;
    ptrcPaymentFrequency: string;
    lwfRegistrationCertificate?: File | null;
    ptrcUpload?: File | null;
}

interface ESISetupSidePanelProps {
  addPFSetup: (newPFSetup: PTSetupData) => void;
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

const PTSetupPanel: React.FC<ESISetupSidePanelProps> = ({
  addPFSetup,
  onClose,
  companyGroupName,
  companyName,
}) => {
  const [PTSetupData, setPTSetupData] = useState<PTSetupData>({
    Company_Group_Name: companyGroupName,
    Company_Name: companyName,
    authorizedSignatory: '',
    ptState: '',
    ptLocation: '',
    ptRegistrationNumber: '',
    ptEnrollmentNumber: '',
    ptRegistrationDate: '',
    ptRemmitanceMode: '',
    ptecPaymentFrequency: '',
    ptrcPaymentFrequency: ''
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

  const handleInputChange = (field: keyof PTSetupData, value: string | File | null) => {
    setPTSetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      if (selectedOption.value === 'add_new') {
        setShowAddSignatoryDialog(true);
      } else {
        const selectedSignatory = existingSignatories.find(s => s.name === selectedOption.value);
        if (selectedSignatory) {
          setPTSetupData(prev => ({
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
    if (PTSetupData.ptState && PTSetupData.ptLocation && PTSetupData.authorizedSignatory) {
      addPFSetup(PTSetupData);
      onClose();
    } else {
      console.error('Please fill in all required fields.');
    }
  };

  const handleAddSignatory = () => {
    setExistingSignatories(prev => [...prev, newSignatory]);
    setPTSetupData(prev => ({
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
          value={PTSetupData.Company_Group_Name}
          onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
        />
        <OutlinedInput
          label="Company Name"
          value={PTSetupData.Company_Name}
          onChange={(value: string) => handleInputChange('Company_Name', value)}
        />
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-4'>
          <label>Enter the PT State</label>
          <OutlinedInput
            label="State"
            value={PTSetupData.ptState}
            onChange={(value: string) => handleInputChange('ptState', value)}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>Enter the PT Location</label>
          <OutlinedInput
            label="Location"
            value={PTSetupData.ptLocation}
            onChange={(value: string) => handleInputChange('ptLocation', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>PT Registration Number</label>
          <OutlinedInput
            label="Registration Number"
            value={PTSetupData.ptRegistrationNumber || ''}
            onChange={(value: string ) => handleInputChange('ptRegistrationNumber', value || '')}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>PT Registration Date</label>
          <OutlinedInput
            label="PT Date"
            value={PTSetupData.ptRegistrationDate || ''}
            onChange={(value: string) => handleInputChange('ptRegistrationDate', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>Enter the Remmitance Mode</label>
          <OutlinedInput
            label="Mode"
            value={PTSetupData.ptRemmitanceMode || ''}
            onChange={(value: string ) => handleInputChange('ptRemmitanceMode', value || '')}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>Enter User ID</label>
          <OutlinedInput
            label="User ID (Optional)"
            value={PTSetupData.ptUserId || ''}
            onChange={(value: string) => handleInputChange('ptUserId', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-4'>
          <label>Enter User Password</label>
          <OutlinedInput
            label="Password (Optional)"
            value={PTSetupData.ptPassword || ''}
            onChange={(value: string) => handleInputChange('ptPassword', value)}
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
            value={PTSetupData.authorizedSignatory ? { value: PTSetupData.authorizedSignatory, label: PTSetupData.authorizedSignatory } : null}
            onChange={handleSignatoryChange}
          />
        </div>
      </div>

     





      <div className='flex flex-col gap-4'>
        <label>Please upload the PT certificate</label>
        <Input
          id="file-upload"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] || null;
            handleInputChange('lwfRegistrationCertificate', file);
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

export default PTSetupPanel;