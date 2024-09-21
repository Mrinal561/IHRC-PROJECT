import React, { useState } from 'react';
import { Button, Input, Dialog, toast, Notification, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { MultiValue, ActionMeta } from 'react-select';

export interface ESISetupData {
  Company_Group_Name: string;
  Company_Name: string;
  esiCode: string;
  esiCodeType: string;
  esiCodeLocation: string;
  esiUserId?: string;
  esiPassword?: string;
  authorizedSignatory: string[];
  signatoryDesignation?: string;
  signatoryMobile?: string;
  signatoryEmail?: string;
  esiRegistrationCertificate?: File | null;
}

interface ESISetupSidePanelProps {
  // addPFSetup: (newPFSetup: ESISetupData) => void;
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
  // addPFSetup,
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
    authorizedSignatory: [],
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

  const handleInputChange = (field: keyof ESISetupData, value: string | Date | null | File | string[]) => {
    setESISetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    const selectedSignatories = newValue.map(option => option.value);
    handleInputChange('authorizedSignatory', selectedSignatories);

    if (actionMeta.action === 'select-option' && actionMeta.option?.value === 'add_new') {
      setShowAddSignatoryDialog(true);
      handleInputChange('authorizedSignatory', selectedSignatories.filter(name => name !== 'add_new'));
    }
  };


  const handleSubmit = () => {
    if (esiSetupData.esiCode && esiSetupData.esiCodeLocation && esiSetupData.authorizedSignatory) {
      toast.push(
        <Notification title="Success" type="success">
          <div className="flex items-center">
            <span>ESI Setup successfully created</span>
          </div>
        </Notification>
      );
      onClose();
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

  const handleAddSignatory = () => {
    setExistingSignatories(prev => [...prev, newSignatory]);
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

  const challanTypeOptions = [
    { value: 'Main Challan', label: 'Main Challan' },
    { value: 'Arrear Challan', label: 'Arrear Challan' },
  ];

  return (
    <div className="p-4 space-y-4">
       <div className='flex gap-4 items-center'>
        <div className='w-full'>
        <OutlinedInput
          label="Company Group Name"
          value={esiSetupData.Company_Group_Name}
          onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
          />
          </div>
          <div className='w-full'>
        <OutlinedInput
          label="Company Name"
          value={esiSetupData.Company_Name}
          onChange={(value: string) => handleInputChange('Company_Name', value)}
          />
          </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <label>Enter the ESI Code Type</label>
          <div className='w-[352px]'>
          <OutlinedSelect
            label="ESI Code Type"
            options={[
              { value: 'main', label: 'Main' },
              { value: 'subCode', label: 'Sub Code' },
            ]}
            value={esiSetupData.esiCodeType}
            onChange={(value: string) => handleInputChange('esiCodeType', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the ESI Code</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="ESI Code"
            value={esiSetupData.esiCode}
            onChange={(value: string) => handleInputChange('esiCode', value)}
            />
            </div>
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-2'>
          <label>Enter the ESI Code Location</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="ESI Code Location"
            value={esiSetupData.esiCodeLocation || ''}
            onChange={(value: string) => handleInputChange('esiCodeLocation', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter ESI user ID</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="ESI User ID (Optional)"
            value={esiSetupData.esiUserId || ''}
            onChange={(value: string) => handleInputChange('esiUserId', value)}
            />
            </div>
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>Enter ESI User Password</label>
          <div className='w-56'>
          <OutlinedInput
            label="ESI Password (Optional)"
            value={esiSetupData.esiPassword || ''}
            onChange={(value: string) => handleInputChange('esiPassword', value)}
            />
            </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Choose the Signatories</label>
          <div>
          <Select
            isMulti
            options={[
              ...existingSignatories.map(s => ({ value: s.name, label: s.name })),
              // { value: 'add_new'}
            ]}
            // value={esiSetupData.authorizedSignatory.map(name => ({ value: name, label: name }))}
            // onChange={handleSignatoryChange}
            />
            </div>
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