
import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { ESITrackerData } from './ESITrackerTable';
import OutlinedSelect from '@/components/ui/Outlined';

interface ESITrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: ESITrackerData) => void;
  data: ESITrackerData;
}

const ESITrackerEditDialog: React.FC<ESITrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const [editedData, setEditedData] = useState<ESITrackerData>(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (field: keyof ESITrackerData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedData);
    onClose();
    openNotification('success', 'ESI Tracker edited successfully');
  };
  
  const handleDateChange = (field: 'dueDate' | 'amountPaidOn' | 'month', date: Date | null) => {
    if (date) {
      handleChange(field, date.toISOString().split('T')[0]);
    }
  };

  const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {message}
      </Notification>
    )
  }

  const challanTypeOptions = [
    { value: 'Main Challan', label: 'Main Challan' },
    { value: 'Supplementary Challan', label: 'Supplementary Challan' },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={600}
    >
      <h5 className="mb-4">Edit ESI Tracker</h5>
      
      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
        <div className='flex flex-col gap-2 w-full'>
            <label>Enter Number of Employees</label>
            <div className='w-full'>
              <OutlinedInput
                label="No. of Employees"
                value={editedData.noOfEmployees.toString()}
                onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Challan No .</label>
            <div className='w-full'>
              <OutlinedInput
                label="Challan No"
                value={editedData.challanNo}
                onChange={(value) => handleChange('challanNo', value)}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-8 items-center'>
          <div className='flex flex-col gap-2'>
            <label>Select Month</label>
            <div className='w-[219px]'>
              <DatePicker
                placeholder="Month"
                value={new Date(editedData.month)}
                onChange={(date) => handleDateChange('month', date)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Select Due Date</label>
            <div className='w-[219px]'>
              <DatePicker
                placeholder="Due Date"
                value={new Date(editedData.dueDate)}
                onChange={(date) => handleDateChange('dueDate', date)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Select Date of Payment</label>
            <div className='w-[219px]'>
              <DatePicker
                placeholder="Amount Paid On"
                value={new Date(editedData.amountPaidOn)}
                onChange={(date) => handleDateChange('amountPaidOn', date)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className='flex flex-col gap-2'>
            <label>Enter ESI Gross Wages</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="ESI Gross Wages"
                value={editedData.esiGrossWages.toString()}
                onChange={(value) => handleChange('esiGrossWages', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Enter EE ESI</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="EE ESI"
                value={editedData.eeESI.toString()}
                onChange={(value) => handleChange('eeESI', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>ER ESI</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Amount As per Challan"
                value={editedData.erESI.toString()}
                onChange={(value) => handleChange('erESI', parseFloat(value))}
              />
            </div>
          </div>
        </div>

        

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Select Type of Challan</label>
            <div className='w-full'>
              <OutlinedSelect
                label="Type of Challan"
                options={challanTypeOptions}
                value={challanTypeOptions.find(option => option.value === editedData.typeOfChallan)}
                onChange={(option) => handleChange('typeOfChallan', option?.value || '')}
              />
            </div>
           
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Difference In Amount</label>
            <div className='w-full'>
              <OutlinedInput
                label="Difference In Amount"
                value={editedData.differenceInAmount.toString()}
                onChange={(value) => handleChange('differenceInAmount', parseFloat(value))}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
          <label>Enter Total Amount</label>
            <div className='w-[219px]'>
              <OutlinedInput
                label="Total Amount As per Challan"
                value={editedData.totalAmountAsPerChallan.toString()}
                onChange={(value) => handleChange('totalAmountAsPerChallan', parseFloat(value))}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Delay</label>
            <div className='w-full'>
              <OutlinedInput
                label="Delay"
                value={editedData.delay}
                onChange={(value) => handleChange('delay', value)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Delay Reason</label>
            <div className='w-full'>
              <OutlinedInput
                label="Delay Reason"
                value={editedData.delayReason}
                onChange={(value) => handleChange('delayReason', value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="plain" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button variant="solid" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Dialog>
  );
};

export default ESITrackerEditDialog;