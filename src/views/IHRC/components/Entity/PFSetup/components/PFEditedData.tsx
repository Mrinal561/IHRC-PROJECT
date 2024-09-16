import React from 'react';
import { Button, Input, Dialog, Select, DatePicker } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';

const PFEditedData: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className='flex gap-4 items-center'>
        <div className='w-full'>
          <OutlinedInput
                      label="Company Group Name"
                      value={'Tata Group'} onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }            
          />
        </div>
        <div className='w-full'>
          <OutlinedInput
                      label="Company Name"
                      value={'Tata Consultancy Services'} onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }            
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <label>Enter the PF Code</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="PF Code"
                          value={'DRET12457893'} onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }              
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter the PF Location</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="Location"
                          value={'Mumbai'} onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }              
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
                          value={'User01'} onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }              
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter PF User Password</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="PF Password (Optional)"
                          value={'password01'} onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }              
            />
          </div>
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2'>
          <label>PF Registration Date</label>
          <div className='w-56'>
            <DatePicker
              placeholder="Select date"
              value={new Date('2023-01-01')}
              
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Choose the Signatories</label>
          <div className=''>
            <Select
              isMulti
              options={[
                { value: 'Amit', label: 'Amit' },
                { value: 'Krishna Kumar Singh', label: 'Krishna Kumar Singh' },
                { value: 'Ajay Thakur', label: 'Ajay Thakur' },
              ]}
              value={[
                { value: 'Amit', label: 'Amit' },
                { value: 'Krishna Kumar Singh', label: 'Krishna Kumar Singh' }
              ]}
              isDisabled
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label>Please upload the PF certificate</label>
        <Input id="file-upload" type="file" disabled />
      </div>

      {/* <div className="flex justify-end space-x-2">
        <Button onClick={() => { }}>Cancel</Button>
        <Button variant="solid" onClick={() => { }}>Confirm</Button>
      </div> */}

      {/* <Dialog isOpen={false} onClose={() => { }}>
        <h5 className="mb-4">Add New Signatory</h5>
        <div className="space-y-4">
          <OutlinedInput label="Name" value={''} onChange={function (value: string): void {
                      throw new Error('Function not implemented.');
                  } }  />
          <OutlinedInput label="Designation" value={''}  />
          <OutlinedInput label="Mobile" value={''}  />
          <OutlinedInput label="Email" value={''}  />
          <OutlinedInput label="DSC Valid Date" value={''}  />
          <OutlinedInput label="E-Sign" value={''}  />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={() => { }}>Cancel</Button>
          <Button variant="solid" onClick={() => { }}>Add Signatory</Button>
        </div>
      </Dialog> */}
    </div>
  );
};

export default PFEditedData;
