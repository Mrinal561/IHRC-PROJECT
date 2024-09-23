import React, { useState } from 'react';
import { Button, Input, Dialog, toast, Notification, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { MultiValue, ActionMeta } from 'react-select';

export interface LWFSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    lwfState: string;
    lwfLocation: string;
    lwfRegistrationNumber: string;
    lwfRegistrationDate?: Date | null;
    lwfRemmitanceMode: string;
    lwfRemmitanceFrequency: string;
    lwfUserId?: string;
    lwfPassword?: string;
    authorizedSignatory: string[];
    signatoryDesignation?: string;
    signatoryMobile?: string;
    signatoryEmail?: string;
    lwfFrequency: string;
    lwfPaymentDueDate: string;
    lwfApplicableState: string;
    lwfRegistrationCertificate?: File | null;
}

interface LWFSetupSidePanelProps {
  // addPFSetup: (newPFSetup: LWFSetupData) => void;
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

const LWFSetupPanel: React.FC<LWFSetupSidePanelProps> = ({
  // addPFSetup,
  onClose,
  companyGroupName,
  companyName,
}) => {
  const [LWFSetupData, setLWFSetupData] = useState<LWFSetupData>({
    Company_Group_Name: companyGroupName,
    Company_Name: companyName,
    authorizedSignatory: [],
    lwfState: '',
    lwfLocation: '',
    lwfRegistrationNumber: '',
    lwfRegistrationDate: null,
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

  const handleInputChange = (field: keyof LWFSetupData, value: string | Date | null | File | string[]) => {
    setLWFSetupData(prev => ({ ...prev, [field]: value }));
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
    if (LWFSetupData.lwfState && LWFSetupData.lwfLocation && LWFSetupData.authorizedSignatory) {
      toast.push(
        <Notification title="Success" type="success">
          <div className="flex items-center">
            <span>LWF Setup successfully created</span>
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

  return (
    <div className="p-4 space-y-4">
      <div className='flex gap-4 items-center'>
        <div className='w-full'>
        <OutlinedInput
          label="Company Group Name"
          value={LWFSetupData.Company_Group_Name}
          onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
          />
          </div>
          <div className='w-full'>
        <OutlinedInput
          label="Company Name"
          value={LWFSetupData.Company_Name}
          onChange={(value: string) => handleInputChange('Company_Name', value)}
          />
          </div>
      </div>

      <div className='flex gap-8 items-center'>
        <div className='flex flex-col gap-2'>
          <label>Enter the LWF State</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="State"
            value={LWFSetupData.lwfState}
            onChange={(value: string) => handleInputChange('lwfState', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the LWF Location</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Location"
            value={LWFSetupData.lwfLocation}
            onChange={(value: string) => handleInputChange('lwfLocation', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>LWF Registration Number</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Registration Number"
            value={LWFSetupData.lwfRegistrationNumber || ''}
            onChange={(value: string ) => handleInputChange('lwfRegistrationNumber', value || '')}
            />
            </div>
        </div>
      </div>

      <div className='flex gap-8 items-center'>
        <div className='flex flex-col gap-2'>
          <label>Enter User ID</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="User ID (Optional)"
            value={LWFSetupData.lwfUserId || ''}
            onChange={(value: string) => handleInputChange('lwfUserId', value)}
            />
            </div>
        </div>
         <div className='flex flex-col gap-2'>
          <label>Enter User Password</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Password (Optional)"
            value={LWFSetupData.lwfPassword || ''}
            onChange={(value: string) => handleInputChange('lwfPassword', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the Remmitance Mode</label>
          <div className='w-[219px]'>
          <OutlinedSelect
              label="Mode"
              options={[
                { value: 'online', label: 'Online' },
                { value: 'offline', label: 'Offline' },
              ]}
              onChange={(value: string) => handleInputChange('lwfRemmitanceMode', value || '')} value={undefined}            />
            </div>
        </div>
      </div>

      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-4'>
          <label>LWF Registration Date</label>
          <div className='w-[219px]'>
          <DatePicker
            placeholder="LWF Date"
            value={LWFSetupData.lwfRegistrationDate}
            onChange={(date: Date | null ) => handleInputChange('lwfRegistrationDate', date)}
            />
            </div>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <label>Choose the Signatory</label>
          <div>
          <Select
            isMulti
            options={[
              ...existingSignatories.map(s => ({ value: s.name, label: s.name })),
              // { value: 'add_new', label: '+ Add New Signatory' }
            ]}
            // value={LWFSetupData.authorizedSignatory.map(name => ({ value: name, label: name }))}
            // onChange={handleSignatoryChange}
            />
            </div>
        </div>
      </div>

    
      <div className='flex flex-col gap-4'>
        <label>Upload the LWF certificate</label>
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