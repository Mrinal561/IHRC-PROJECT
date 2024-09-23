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

  
interface Signatory {
    name: string;
    designation: string;
    mobile: string;
    email: string;
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

      const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
        { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
        { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
        { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
      ]);

    return (
        <div className="py-4 px-2 space-y-4">
            <div className="flex gap-4 items-center">
                <div className="w-full">
                    <OutlinedInput
                        label="Company Group Name"
                        value={formData.Company_Group_Name}
                        onChange={function (value: string): void {
                            throw new Error('Function not implemented.')
                        }}
                    />
                </div>
                <div className="w-full">
                    <OutlinedInput
                        label="Company Name"
                        value={formData.Company_Name}
                        onChange={function (value: string): void {
                            throw new Error('Function not implemented.')
                        }}
                    />
                </div>
            </div>

            <div className="flex gap-8 items-center">
                <div className="flex flex-col gap-2">
                    <label>Enter the PT State</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="State"
                            value={formData.ptState}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Enter the PT Location</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Location"
                            value={formData.ptLocation}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>PT Registration Number</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Registration Number"
                            value={formData.ptRegistrationNumber}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>PT Enrollment Number</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Enrollment Number"
                            value={formData.ptEnrollmentNumber}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
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
                            value={formData.ptUserId || ''}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Enter User Password</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Password (Optional)"
                            value={formData.ptPassword || ''}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Select Remittance Mode</label>
                    <div className="w-full">
                        <OutlinedSelect
                            label="Mode"
                            options={[
                                { value: 'online', label: 'Online' },
                                { value: 'offline', label: 'Offline' },
                            ]}
                            value={formData.ptRemmitanceMode}
                            onChange={(value: string) =>
                                handleInputChange('ptRemmitanceMode', value)
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Enter Email</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Email"
                            value={formData.signatoryEmail}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-8 items-center">
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
                <div className="flex flex-col gap-2">
                    <label>Enter Mobile Number</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Mobile"
                            value={formData.signatoryMobile}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>PT EC Frequency</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="PT EC Frequency"
                            value={formData.ptecPaymentFrequency}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>PT RC Frequency</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="PT RC Frequency"
                            value={formData.ptrcPaymentFrequency}
                            onChange={function (value: string): void {
                                throw new Error('Function not implemented.')
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2 w-full">
                    <label>Upload the PT EC certificate</label>
                    <Input
                        id="file-upload"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0] || null
                            handleInputChange(
                                'lwfRegistrationCertificate',
                                file,
                            )
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label>Upload the PT RC certificate</label>
                    <Input
                        id="file-upload"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0] || null
                            handleInputChange(
                                'lwfRegistrationCertificate',
                                file,
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default PTEditedData;
