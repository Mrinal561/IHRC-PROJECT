import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { LWFSetupData } from './LWFSetupTable';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

interface LWFEditedDataProps {
  initialData: LWFSetupData | null;
  onClose: () => void;
  onSubmit: (data: LWFSetupData) => void;
}


interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

const LWFEditedData: React.FC<LWFEditedDataProps> = ({ initialData, onClose, onSubmit }) => {
  // Hardcoded LWF Setup Data
  const [formData, setFormData] = useState<LWFSetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    lwfState: '',
    lwfLocation: '',
    lwfRegistrationNumber: '',
    lwfRegistrationDate: '',
    lwfRemmitanceMode: '',
    lwfRemmitanceFrequency: '',
    lwfUserId: '',
    lwfPassword: '',
    authorizedSignatory: '',
    signatoryDesignation: '',
    signatoryMobile: '',
    signatoryEmail: '',
    lwfFrequency: '',
    lwfPaymentDueDate: '',
    lwfApplicableState: '',
  });

  // Hardcoded signatories
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof LWFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  }

  const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
    { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
    { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
    { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
  ]);


  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 items-center">
        <div className="w-full">
          <OutlinedInput
                      label="Company Group"
                      value={formData.Company_Group_Name} onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }            
          />
        </div>
        <div className="w-full">
          <OutlinedInput
                      label="Company"
                      value={formData.Company_Name} onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }            
          />
        </div>
      </div>

      <div className="flex gap-8 items-center">
      <div className='flex flex-col gap-2'>
          <label>Enter the LWF State</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="State"
            value={formData.lwfState}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the LWF Location</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Location"
            value={formData.lwfLocation}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }            
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>LWF Registration Number</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Registration Number"
            value={formData.lwfRegistrationNumber || ''}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }    
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
            value={formData.lwfUserId || ''}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }   
            />
            </div>
        </div>
         <div className='flex flex-col gap-2'>
          <label>Enter User Password</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Password (Optional)"
            value={formData.lwfPassword || ''}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }   
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
            value={formData.lwfRemmitanceMode || ''}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }   
            />
            </div>
        </div>
      </div>


      <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2">
                    <label>PT Registration Date</label>
                    <div className="w-56">
                        <DatePicker
                            placeholder="Select date"
                            value={new Date(formData.lwfRegistrationDate)}
                            // disabled
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

      <div className="flex flex-col gap-4">
        <label>Upload the LWF certificate</label>
        <Input id="file-upload" type="file"  />
      </div>

     
    </div>
  );
};

export default LWFEditedData;
