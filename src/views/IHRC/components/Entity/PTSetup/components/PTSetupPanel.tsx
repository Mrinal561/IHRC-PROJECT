import React, { useState } from 'react';
import { Button, Input, Dialog, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { Select, DatePicker } from '@/components/ui';
import { MultiValue, ActionMeta } from 'react-select';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

export interface PTSetupData {
    Company_Group_Name: string;
    Company_Name: string;
    ptState: string;
    ptLocation: string;
    ptEnrollmentNumber: string;
    ptRegistrationNumber: string;
    ptRegistrationDate: Date | null;
    ptRemmitanceMode: string;
    ptUserId: string;
    ptPassword: string;
    authorizedSignatories: string[];
    signatoryDesignation?: string;
    signatoryMobile: string;
    signatoryEmail: string;
    ptecPaymentFrequency: string;
    ptrcPaymentFrequency: string;
    lwfRegistrationCertificate?: File | null;
    ptrcUpload?: File | null;
}

interface PTSetupSidePanelProps {
  // addPFSetup: (newPFSetup: PTSetupData) => void;
  onClose: () => void;
  companyGroupName: string;
  companyName: string;
}

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

const PTSetupPanel: React.FC<PTSetupSidePanelProps> = ({
  // addPFSetup,
  onClose,
  companyGroupName,
  companyName,
}) => {
  const [PTSetupData, setPTSetupData] = useState<PTSetupData>({
    Company_Group_Name: companyGroupName,
    Company_Name: companyName,
    authorizedSignatories: [],
    ptState: '',
    ptLocation: '',
    ptRegistrationNumber: '',
    ptEnrollmentNumber: '',
    ptRegistrationDate: null,
    ptRemmitanceMode: '',
    ptecPaymentFrequency: '',
    ptrcPaymentFrequency: '',
    signatoryEmail: '',
    signatoryMobile: '',
    ptUserId: '',
    ptPassword: '',
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

  const handleInputChange = (field: keyof PTSetupData, value: string | Date | null | File | string[]) => {
    setPTSetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    const selectedSignatories = newValue.map(option => option.value);
    handleInputChange('authorizedSignatories', selectedSignatories);

    if (actionMeta.action === 'select-option' && actionMeta.option?.value === 'add_new') {
      setShowAddSignatoryDialog(true);
      handleInputChange('authorizedSignatories', selectedSignatories.filter(name => name !== 'add_new'));
    }
  };

  const handleSubmit = () => {
    if (PTSetupData.ptState && PTSetupData.ptLocation && PTSetupData.authorizedSignatories.length > 0) {
      // addPFSetup(PTSetupData);
      toast.push(
        <Notification title="Success" type="success">
          <div className="flex items-center">
            <span>PT Setup successfully created</span>
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
    <div className="py-4 px-2 space-y-4">


<div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2 w-full'>
            <label>Enter Company Group</label>
            <div className=' w-full'>
              <OutlinedInput
                label="State"
                value={PTSetupData.Company_Group_Name}
                onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
                />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Company Name</label>
            <div className=' w-full'>
              <OutlinedInput
                label="Company Name"
                value={PTSetupData.Company_Name}
                onChange={(value: string) => handleInputChange('Company_Name', value)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter State</label>
            <div className='w-full'>
              <OutlinedInput
                label="State"
                value={PTSetupData.ptState}
            onChange={(value: string) => handleInputChange('ptState', value)}
              />
            </div>
          </div>
        </div>

      <div className='flex gap-8 items-center'>
       
        <div className='flex flex-col gap-2'>
          <label>Enter the PT Location</label>
          <div className='w-full'>
          <OutlinedInput
            label="Location"
            value={PTSetupData.ptLocation}
            onChange={(value: string) => handleInputChange('ptLocation', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>PT Registration Number</label>
          <div className='w-full'>
          <OutlinedInput
            label="Registration Number"
            value={PTSetupData.ptRegistrationNumber || ''}
            onChange={(value: string ) => handleInputChange('ptRegistrationNumber', value || '')}
            />
            </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label>PT Enrollment Number</label>
          <div className='w-full'>
          <OutlinedInput
            label="Enrollment Number"
            value={PTSetupData.ptEnrollmentNumber || ''}
            onChange={(value: string ) => handleInputChange('ptEnrollmentNumber', value || '')}
            />
            </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label>PT Registration Date</label>
          <div className='w-full'>
          <DatePicker
            placeholder="Select Date"
            value={PTSetupData.ptRegistrationDate}
            onChange={(date: Date | null) => handleInputChange('ptRegistrationDate', date)}
            size='sm'
            />
            </div>
        </div>

       

       
      </div>

      <div className='flex gap-8 items-center'>
        
        

        <div className='flex flex-col gap-2 w-full'>
          <label>Select Remittance Mode</label>
          <div className='w-full'>
          <OutlinedSelect
            label="Mode"
            options={[
              { value: 'online', label: 'Online' },
              { value: 'offline', label: 'Offline' },
            ]}
            value={PTSetupData.ptRemmitanceMode}
            onChange={(value: string) => handleInputChange('ptRemmitanceMode', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label>Enter User ID</label>
          <div className='w-full'>
          <OutlinedInput
            label="User ID (Optional)"
            value={PTSetupData.ptUserId || ''}
            onChange={(value: string) => handleInputChange('ptUserId', value)}
            />
            </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Enter User Password</label>
          <div className='w-full'>
          <OutlinedInput
            label="Password (Optional)"
            value={PTSetupData.ptPassword || ''}
            onChange={(value: string) => handleInputChange('ptPassword', value)}
            />
            </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Enter Email</label>
          <div className='w-full'>
          <OutlinedInput
            label="Email"
            value={PTSetupData.signatoryEmail || ''}
            onChange={(value: string) => handleInputChange('signatoryEmail', value)}
            />
            </div>
        </div>
        
      </div>

      

      <div className='flex gap-4 items-center'>

      <div className='flex flex-col gap-2 w-full'>
          <label>Enter Mobile Number</label>
          <div className='w-full'>
          <OutlinedInput
            label="Mobile"
            value={PTSetupData.signatoryMobile || ''}
            onChange={(value: string) => handleInputChange('signatoryMobile', value)}
            />
            </div>
        </div>


        <div className='w-full flex flex-col gap-2'>
          <label>PT EC Frequency</label>
        <OutlinedInput
          label="PT EC Frequency"
          value={PTSetupData.ptecPaymentFrequency}
          onChange={(value: string) => handleInputChange('ptecPaymentFrequency', value)}
          />
          </div>
          <div className='w-full flex flex-col gap-2'>
          <label>PT RC Frequency</label>

        <OutlinedInput
          label="PT RC Frequency"
          value={PTSetupData.ptrcPaymentFrequency}
          onChange={(value: string) => handleInputChange('ptrcPaymentFrequency', value)}
          />
          </div>
      </div>
      <div className='flex gap-4 items-center'>

      <div className='flex flex-col gap-2 w-full'>
        <label>Upload the PT EC certificate</label>
        <Input
          id="file-upload"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] || null;
            handleInputChange('lwfRegistrationCertificate', file);
          }}
        />
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <label>Upload the PT RC certificate</label>
        <Input
          id="file-upload"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] || null;
            handleInputChange('lwfRegistrationCertificate', file);
          }}
        />
      </div>
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