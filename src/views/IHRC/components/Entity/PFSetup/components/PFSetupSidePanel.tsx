import React, { useState } from 'react';
import { Button, Input, Dialog, toast, Notification, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { MultiValue, ActionMeta } from 'react-select';

export interface PFSetupData {
  Company_Group_Name: string;
  Company_Name: string;
  pfCode: string;
  pfCodeLocation: string;
  registrationDate?: Date | null;
  pfUserId?: string;
  pfPassword?: string;
  authorizedSignatory: string[];
  pfRegistrationCertificate?: File | null;
  
}

interface PFSetupSidePanelProps {
  // addPFSetup: (newPFSetup: PFSetupData) => void;
  onClose: () => void;
  companyGroupName: string;
  companyName: string;
  pfSetupData?: PFSetupData;
  onRefresh?: () => void;
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
  dscFile?: File | null;
  eSignFile?: File | null;
}

const PFSetupSidePanel: React.FC<PFSetupSidePanelProps> = ({
  // addPFSetup,
  onClose,
  companyGroupName,
  companyName,
  onRefresh
}) => {
  const [pfSetupData, setPfSetupData] = useState<PFSetupData>({
    Company_Group_Name: companyGroupName,
    Company_Name: companyName,
    pfCode: '',
    pfCodeLocation: '',
    authorizedSignatory: [],
    registrationDate: null,
  });

  const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
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

    const newSelectedSignatories = existingSignatories.filter(signatory => 
      selectedNames.includes(signatory.name)
    );
    setSelectedSignatories(newSelectedSignatories);
  };

  



  const handleSubmit = () => {
    if (pfSetupData.pfCode && pfSetupData.pfCodeLocation && pfSetupData.authorizedSignatory) {
      // addPFSetup(pfSetupData);
      toast.push(
        <Notification title="Success" type="success">
          <div className="flex items-center">
            <span>PF Setup successfully created</span>
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

  return (
    <div className="p-4 space-y-4">
       <div className='flex gap-4 items-center'>
        <div className='w-full'>
        <OutlinedInput
          label="Company Group Name"
          value={pfSetupData.Company_Group_Name}
          onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
          />
          </div>
          <div className='w-full'>
        <OutlinedInput
          label="Company Name"
          value={pfSetupData.Company_Name}
          onChange={(value: string) => handleInputChange('Company_Name', value)}
          />
          </div>
      </div>

       <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <label>Enter the PF Code</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="PF Code"
            value={pfSetupData.pfCode}
            onChange={(value: string) => handleInputChange('pfCode', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the PF Location</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="Location"
            value={pfSetupData.pfCodeLocation}
            onChange={(value: string) => handleInputChange('pfCodeLocation', value)}
            />
            </div>
        </div>
      </div>


      <div className='flex gap-4 items-center'>
      <div className='flex flex-col gap-2'>
          <label>Enter PF user ID</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="PF User ID (Optional)"
            value={pfSetupData.pfUserId || ''}
            onChange={(value: string) => handleInputChange('pfUserId', value)}
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter PF User Password</label>
          <div className='w-[352px]'>
          <OutlinedInput
            label="PF Password (Optional)"
            value={pfSetupData.pfPassword || ''}
            onChange={(value: string) => handleInputChange('pfPassword', value)}
            />
            </div>
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <label>PF Registration Date</label>
          <div className='w-56'>
          <DatePicker
            placeholder="Select Date"
            value={pfSetupData.registrationDate}
            onChange={(date: Date | null) => handleInputChange('registrationDate', date)}
            />
            </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
        <label>Choose the Signatories</label>
        <div className=''>
          <Select
            isMulti
            options={existingSignatories.map(s => ({ value: s.name, label: s.name }))}
            onChange={handleSignatoryChange}
          />
        </div>
      </div>
      {selectedSignatories.map(signatory => (
        <div key={signatory.name} className="border p-4 rounded-md">
          <h6 className="mb-2">{signatory.name}</h6>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">DSC Upload</label>
              <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0] || null;
                  handleFileUpload(signatory.name, 'dsc', file);
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">E-Sign Upload</label>
              <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0] || null;
                  handleFileUpload(signatory.name, 'eSign', file);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      </div>


      <div className='flex flex-col gap-2'>
        <label>Upload the PF certificate</label>
        <Input
          id="file-upload"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] || null;
            handleInputChange('pfRegistrationCertificate', file);
          }}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="solid" onClick={handleSubmit}>Confirm</Button>
      </div>

     
    </div>
  );
};

export default PFSetupSidePanel;