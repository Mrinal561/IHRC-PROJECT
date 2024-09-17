import React, { useState } from 'react';
import { Button, Input, Dialog, Notification, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';

const ESIEditedData: React.FC = () => {
  const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);

 
  const handleAddSignatory = () => {
    setShowAddSignatoryDialog(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className='flex gap-4 items-center'>
        <div className='w-full'>
          <OutlinedInput
                      label="Company Group Name"
                      value="Tata Group" onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }               
          />
        </div>
        <div className='w-full'>
          <OutlinedInput
                      label="Company Name"
                      value="Tata Consultancy Services" onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }               
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <label>Enter the ESI Code Type</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="ESI Code Type"
                          value="Main" onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }                 
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the ESI Code</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="ESI Code"
                          value="DRET12457893
" onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }                 
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
                          value="Mumbai" onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }                 
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter ESI User ID</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="ESI User ID (Optional)"
                          value="User01" onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }                 
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
                          value="Password01" onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }                 
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Choose the Signatories</label>
          <div>
            <Select
              isMulti
              options={[
                { value: 'Amit', label: 'Amit' },
                { value: 'Krishna Kumar Singh', label: 'Krishna Kumar Singh' },
                { value: 'Ajay Thakur', label: 'Ajay Thakur' },
              ]}
              value={[
                { value: 'Amit', label: 'Amit' },
                { value: 'Krishna Kumar Singh', label: 'Krishna Kumar Singh' },
              ]}
              isDisabled
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <label>Please upload the ESI certificate</label>
        <Input
          id="file-upload"
          type="file"
             
        />
      </div>

     

   
    </div>
  );
};

export default ESIEditedData;
