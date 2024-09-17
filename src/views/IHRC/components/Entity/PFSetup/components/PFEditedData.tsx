import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, Select, DatePicker } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import {PFSetupData} from './PFSetupTable';

interface PFEditedDataProps {
  initialData: PFSetupData | null;
  onClose: () => void;
  onSubmit: (data: PFSetupData) => void;
}

const PFEditedData: React.FC<PFEditedDataProps> = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PFSetupData>({
    Company_Group_Name: '',
    Company_Name: '',
    pfCode: '',
    pfCodeLocation: '',
    registrationDate: '',
    pfUserId: '',
    pfPassword: '',
    authorizedSignatory: '',
    signatoryDesignation: '',
    signatoryMobile: '',
    signatoryEmail: '',
    dscValidDate: '',
    esign: '',
  });
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof PFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  }
  return (
    <div className="p-4 space-y-4">
      <div className='flex gap-4 items-center'>
        <div className='w-full'>
          <OutlinedInput
                      label="Company Group Name"
                      value={formData.Company_Group_Name} onChange={function (value: string): void {
                          throw new Error('Function not implemented.');
                      } }            
          />
        </div>
        <div className='w-full'>
          <OutlinedInput
                      label="Company Name"
                      value={formData.Company_Name} onChange={function (value: string): void {
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
                          value={formData.pfCode} onChange={function (value: string): void {
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
                          value={formData.pfCodeLocation} onChange={function (value: string): void {
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
                          value={formData.pfUserId} onChange={function (value: string): void {
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
                          value={formData.pfPassword} onChange={function (value: string): void {
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
              value={formData.registrationDate}
              
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Choose the Signatories</label>
          <div className=''>
          <Input
              value={formData.authorizedSignatory}
              onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label>Please upload the PF certificate</label>
        <Input id="file-upload" type="file" />
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
