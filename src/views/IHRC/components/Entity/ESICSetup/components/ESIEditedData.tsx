import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, Notification, DatePicker, Select } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { ESISetupData } from './EsicSetupTable';



interface ESIEditedDataProps {
  initialData: ESISetupData | null;
  onClose: () => void;
  onSubmit: (data: ESISetupData) => void;
}


const ESIEditedData: React.FC<ESIEditedDataProps> = ({ initialData, onClose, onSubmit }) => {

  const [formData, setFormData] = useState<ESISetupData>({
    Company_Group_Name:'',
    Company_Name:'',
    esiCode:'',
    esiCodeType:'',
    esiCodeLocation:'',
    esiUserId:'',
    esiPassword:'',
    authorizedSignatory:'',
    signatoryDesignation:'',
    signatoryMobile:'',
    signatoryEmail:'',
  })
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof PFSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


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
          <label>Enter the ESI Code Type</label>
          <div className='w-[352px]'>
            <OutlinedInput
                          label="ESI Code Type"
                          value={formData.esiCodeType} onChange={function (value: string): void {
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
                          value={formData.esiCode} onChange={function (value: string): void {
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
                          value={formData.esiCodeLocation} onChange={function (value: string): void {
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
                          value={formData.esiUserId} onChange={function (value: string): void {
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
                          value={formData.esiPassword} onChange={function (value: string): void {
                              throw new Error('Function not implemented.');
                          } }                 
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label>Choose the Signatories</label>
          <div>
          <Input
              value={formData.authorizedSignatory}
              onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
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
