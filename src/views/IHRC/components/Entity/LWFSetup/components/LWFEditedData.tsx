import React, { useState } from 'react';
import { Button, Input, Dialog, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';

const LWFEditedData: React.FC = ({ onClose }) => {
  // Hardcoded LWF Setup Data
  const LWFSetupData = {
    Company_Group_Name: 'Tata Group',
    Company_Name: 'Tata Consultancy Services',
    lwfState: 'Maharashtra',
    lwfLocation: 'Mumbai',
    lwfRegistrationNumber: 'REG98765354879',
    lwfRegistrationDate: new Date('2023-01-01'),
    lwfRemmitanceMode: 'Online',
    lwfUserId: 'User01',
    lwfPassword: 'password01',
    authorizedSignatory: ['Amit', 'Krishna Kumar Singh'],
  };

  // Hardcoded signatories
  const existingSignatories = [
    { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com' },
    { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com' },
  ];

  // Static handlers for demo purposes
  const handleSubmit = () => {
    alert('LWF Setup successfully created');
    onClose();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 items-center">
        <div className="w-full">
          <OutlinedInput
                      label="Company Group Name"
                      value={LWFSetupData.Company_Group_Name} onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }            
          />
        </div>
        <div className="w-full">
          <OutlinedInput
                      label="Company Name"
                      value={LWFSetupData.Company_Name} onChange={function (value: string): void {
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
            value={LWFSetupData.lwfState}
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
            value={LWFSetupData.lwfLocation}
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
            value={LWFSetupData.lwfRegistrationNumber || ''}
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
            value={LWFSetupData.lwfUserId || ''}
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
            value={LWFSetupData.lwfPassword || ''}
            onChange={function (value: string): void {
                throw new Error('Function not implemented.');
            } }   
            />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the Remmitance Mode</label>
          <div className='w-[219px]'>
          <OutlinedInput
            label="Mode"
            value={LWFSetupData.lwfRemmitanceMode || ''}
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
                            value={new Date("2023-01-01")}
                            disabled
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4 w-full'>
          <label>Choose the Signatory</label>
          <div>
          <Select
            isMulti
            options={existingSignatories.map((s) => ({ value: s.name, label: s.name }))}
            value={LWFSetupData.authorizedSignatory.map((name) => ({ value: name, label: name }))}
            isDisabled
          />
        </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label>Please upload the LWF certificate</label>
        <Input id="file-upload" type="file" disabled />
      </div>

     
    </div>
  );
};

export default LWFEditedData;
