import React, { useEffect, useState } from 'react';
import { Button, Input, Dialog, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { Select, DatePicker } from '@/components/ui';
import {PTSetupData} from './PTSetupTable';
import OutlinedSelect from '@/components/ui/Outlined';

interface PTEditedDataProps {
    initialData: PTSetupData | null;
    onClose: () => void;
    onSubmit: (data: PTSetupData) => void;
  }


const PTEditedData: React.FC<PTEditedDataProps> = ({ initialData, onClose, onSubmit }) => {
    const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);
    const [formData, setFormData] = useState<PTSetupData>({
        Company_Group_Name:'',
    Company_Name:'',
    ptState:'',
    ptLocation:'',
    ptEnrollmentNumber:'',
    ptRegistrationNumber:'',
    ptRegistrationDate:'',
    ptRemmitanceMode:'',
    ptUserId:'',
    ptPassword:'',
    authorizedSignatory:'',
    signatoryDesignation:'',
    signatoryMobile:'',
    signatoryEmail:'',
    ptecPaymentFrequency:'',
    ptrcPaymentFrequency:'',
    })
    useEffect(() => {
        if (initialData) {
          setFormData(initialData);
        }
      }, [initialData]);
    
      const handleChange = (field: keyof PTSetupData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
      };
    
      const handleSubmit = () => {
        onSubmit(formData);
      }

    const handleAddSignatory = () => {
        setShowAddSignatoryDialog(false);
    };

    const handleInputChange = (field: keyof PTSetupData, value: string | Date | null | File | string[]) => {
        setPTSetupData(prev => ({ ...prev, [field]: value }));
      };

    return (
        <div className="py-4 px-2 space-y-4">
            <div className="flex gap-4 items-center">
                <div className="w-full">
                    <OutlinedInput
                        label="Company Group Name"
                        value={formData.Company_Group_Name} onChange={function (value: string): void {
                            throw new Error('Function not implemented.');
                        } }                        
                    />
                </div>
                <div className="w-full">
                    <OutlinedInput
                        label="Company Name"
                        value={formData.Company_Name} onChange={function (value: string): void {
                            throw new Error('Function not implemented.');
                        } }                        
                    />
                </div>
            </div>

            <div className="flex gap-8 items-center">
                <div className="flex flex-col gap-2">
                    <label>Enter the PT State</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="State"
                            value={formData.ptState} onChange={function (value: string): void {
                                throw new Error('Function not implemented.');
                            } }                            
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Enter the PT Location</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Location"
                            value={formData.ptLocation} onChange={function (value: string): void {
                                throw new Error('Function not implemented.');
                            } }                            
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>PT Registration Number</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Registration Number"
                            value={formData.ptRegistrationNumber} onChange={function (value: string): void {
                                throw new Error('Function not implemented.');
                            } }                            
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-8 items-center">
                <div className="flex flex-col gap-2">
                    <label>Enter User ID</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="User ID (Optional)"
                            value={formData.ptUserId || ''} onChange={function (value: string): void {
                                throw new Error('Function not implemented.');
                            } }                            
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Enter User Password</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Password (Optional)"
                            value={formData.ptPassword || ''} onChange={function (value: string): void {
                                throw new Error('Function not implemented.');
                            } }                            
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
          <label>Select Remittance Mode</label>
          <div className='w-full'>
          <OutlinedSelect
            label="Mode"
            options={[
              { value: 'online', label: 'Online' },
              { value: 'offline', label: 'Offline' },
            ]}
            value={formData.ptRemmitanceMode}
            onChange={(value: string) => handleInputChange('ptRemmitanceMode', value)}
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
                            value={new Date(formData.ptRegistrationDate)}
                            // disabled
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label>Choose the Signatories</label>
                    <Input
              value={formData.authorizedSignatory}
              onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
            />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label>Please upload the PT certificate</label>
                <Input
                    id="file-upload"
                    type="file"
                    // disabled
                />
            </div>

            
        </div>
    );
};

export default PTEditedData;
