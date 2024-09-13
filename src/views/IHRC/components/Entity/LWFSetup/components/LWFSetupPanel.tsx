import React, { useState } from 'react';
import { Button, Input, Dialog } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

export interface LWFSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    lwfState: string;
    lwfLocation: string;
    lwfRegistrationNumber: string;
    lwfRegistrationDate: string;
    lwfRemmitanceMode: string;
    lwfRemmitanceFrequency: string;
    lwfUserId?: string;
    lwfPassword?: string;
    authorizedSignatory: string;
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    lwfFrequency: string;
    lwfPaymentDueDate: string;
    lwfApplicableState: string;
    lwfRegistrationCertificate?: File | null;
}

interface ESISetupSidePanelProps {
  addPFSetup: (newPFSetup: LWFSetupData) => void;
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

const LWFSetupPanel: React.FC<ESISetupSidePanelProps> = ({
  addPFSetup,
  onClose,
  companyGroupName,
  companyName,
}) => {
  const [LWFSetupData, setLWFSetupData] = useState<LWFSetupData>({
    Company_Group_Name: companyGroupName,
    Company_Name: companyName,
    authorizedSignatory: '',
    lwfState: '',
    lwfLocation: '',
    lwfRegistrationNumber: '',
    lwfRegistrationDate: '',
    lwfRemmitanceMode: '',
    lwfRemmitanceFrequency: '',
    lwfFrequency: '',
    lwfPaymentDueDate: '',
    lwfApplicableState: '',
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

  const handleInputChange = (field: keyof LWFSetupData, value: string | File | null) => {
    setLWFSetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      if (selectedOption.value === 'add_new') {
        setShowAddSignatoryDialog(true);
      } else {
        const selectedSignatory = existingSignatories.find(s => s.name === selectedOption.value);
        if (selectedSignatory) {
          setLWFSetupData(prev => ({
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
    if (LWFSetupData.lwfState && LWFSetupData.lwfLocation && LWFSetupData.authorizedSignatory) {
      addPFSetup(LWFSetupData);
      onClose();
    } else {
      console.error('Please fill in all required fields.');
    }
  };

  const handleAddSignatory = () => {
    setExistingSignatories(prev => [...prev, newSignatory]);
    setLWFSetupData(prev => ({
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
          value={LWFSetupData.Company_Group_Name}
          onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
        />
        <OutlinedInput
          label="Company Name"
          value={LWFSetupData.Company_Name}
          onChange={(value: string) => handleInputChange('Company_Name', value)}
        />
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-4'>
          <label>Enter the LWF State</label>
          <OutlinedInput
            label="State"
            value={LWFSetupData.lwfState}
            onChange={(value: string) => handleInputChange('lwfState', value)}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>Enter the LWF Location</label>
          <OutlinedInput
            label="Location"
            value={LWFSetupData.lwfLocation}
            onChange={(value: string) => handleInputChange('lwfLocation', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>LWF Registration Number</label>
          <OutlinedInput
            label="Registration Number"
            value={LWFSetupData.lwfRegistrationNumber || ''}
            onChange={(value: string ) => handleInputChange('lwfRegistrationNumber', value || '')}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>LWF Registration Date</label>
          <OutlinedInput
            label="LWF Date"
            value={LWFSetupData.lwfRegistrationDate || ''}
            onChange={(value: string) => handleInputChange('lwfRegistrationDate', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>Enter the Remmitance Mode</label>
          <OutlinedInput
            label="Mode"
            value={LWFSetupData.lwfRemmitanceMode || ''}
            onChange={(value: string ) => handleInputChange('lwfRemmitanceMode', value || '')}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label>Enter User ID</label>
          <OutlinedInput
            label="User ID (Optional)"
            value={LWFSetupData.lwfUserId || ''}
            onChange={(value: string) => handleInputChange('lwfUserId', value)}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-4'>
          <label>Enter User Password</label>
          <OutlinedInput
            label="Password (Optional)"
            value={LWFSetupData.lwfPassword || ''}
            onChange={(value: string) => handleInputChange('lwfPassword', value)}
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
            value={LWFSetupData.authorizedSignatory ? { value: LWFSetupData.authorizedSignatory, label: LWFSetupData.authorizedSignatory } : null}
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

export default LWFSetupPanel;