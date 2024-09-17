import React, { useState } from 'react';
import { Button, Input, Dialog, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { Select, DatePicker } from '@/components/ui';

const PTEditedData: React.FC = () => {
    const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);

   

    const handleAddSignatory = () => {
        setShowAddSignatoryDialog(false);
    };

    return (
        <div className="py-4 px-2 space-y-4">
            <div className="flex gap-4 items-center">
                <div className="w-full">
                    <OutlinedInput
                        label="Company Group Name"
                        value="Tata Group" onChange={function (value: string): void {
                            throw new Error('Function not implemented.');
                        } }                        
                    />
                </div>
                <div className="w-full">
                    <OutlinedInput
                        label="Company Name"
                        value="Tata Consultancy Services" onChange={function (value: string): void {
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
                            value="Maharashtra" onChange={function (value: string): void {
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
                            value="Mumbai" onChange={function (value: string): void {
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
                            value="PT1234587954" onChange={function (value: string): void {
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
                            value="User01" onChange={function (value: string): void {
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
                            value="password01" onChange={function (value: string): void {
                                throw new Error('Function not implemented.');
                            } }                            
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Enter the Remittance Mode</label>
                    <div className="w-56">
                        <OutlinedInput
                            label="Mode"
                            value="Online" onChange={function (value: string): void {
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

                <div className="flex flex-col gap-2 w-full">
                    <label>Choose the Signatories</label>
                    <Select
                        isMulti
                        options={[
                            { value: 'Amit', label: 'Amit' },
                            { value: 'Krishna Kumar Singh', label: 'Krishna Kumar Singh' },
                            { value: 'Ajay Thakur', label: 'Ajay Thakur' },
                        ]}
                        value={[
                            { value: 'Amit', label: 'Amit' },
                            { value: 'Ajay Thakur', label: 'Ajay Thakur' },
                        ]}
                        isDisabled
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label>Please upload the PT certificate</label>
                <Input
                    id="file-upload"
                    type="file"
                    disabled
                />
            </div>

            
        </div>
    );
};

export default PTEditedData;
