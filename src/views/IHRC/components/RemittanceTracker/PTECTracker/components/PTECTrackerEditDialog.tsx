

import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import { PTTrackerData } from './PTECTrackerTable';

interface PTTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PTTrackerData) => void;
  data: PTTrackerData;
}

const PTECTrackerEditDialog: React.FC<PTTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const [editedData, setEditedData] = useState<PTTrackerData>(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (field: keyof PTTrackerData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedData);
    onClose();
    openNotification('success', 'PT EC Tracker edited successfully');
  };
  
  const handleDateChange = (field: 'dueDate' | 'dateOfPayment' | 'month', date: Date | null) => {
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

  const frequencyOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Yearly', label: 'Yearly' },
  ];

  const remittanceModeOptions = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={600}
    >
      <h5 className="mb-4">Edit PT EC Tracker Detail</h5>

      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>No. of Employees</label>
            <OutlinedInput
              label="No. of Employees"
              value={editedData.noOfEmployees.toString()}
              onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Receipt No/Ack no</label>
            <OutlinedInput
              label="Receipt No"
              value={editedData.receiptNo}
              onChange={(value) => handleChange('receiptNo', value)}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Wages</label>
            <OutlinedInput
              label="Wages"
              value={editedData.wages.toString()}
              onChange={(value) => handleChange('wages', parseFloat(value))}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Total Amount Paid</label>
            <OutlinedInput
              label="Total Amount Paid"
              value={editedData.totalAmountPaid.toString()}
              onChange={(value) => handleChange('totalAmountPaid', parseFloat(value))}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Difference in Amount</label>
            <OutlinedInput
              label="Difference in Amount"
              value={editedData.differenceInAmount.toString()}
              onChange={(value) => handleChange('differenceInAmount', parseFloat(value))}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Month</label>
            <DatePicker
              placeholder="Month"
              value={new Date(editedData.month)}
              onChange={(date) => handleDateChange('month', date)}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Due Date</label>
            <DatePicker
              placeholder="Due Date"
              value={new Date(editedData.dueDate)}
              onChange={(date) => handleDateChange('dueDate', date)}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Date of Payment</label>
            <DatePicker
              placeholder="Date of Payment"
              value={new Date(editedData.dateOfPayment)}
              onChange={(date) => handleDateChange('dateOfPayment', date)}
            />
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Frequency</label>
            <OutlinedSelect
              label="Frequency"
              options={frequencyOptions}
              value={frequencyOptions.find(option => option.value === editedData.frequency)}
              onChange={(option) => handleChange('frequency', option?.value || '')}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Remittance Mode</label>
            <OutlinedSelect
              label="Remittance Mode"
              options={remittanceModeOptions}
              value={remittanceModeOptions.find(option => option.value === editedData.remittanceMode)}
              onChange={(option) => handleChange('remittanceMode', option?.value || '')}
            />
          </div>
          {/* <div className='flex flex-col gap-2 w-full'>
            <label>Remarks</label>
            <OutlinedInput
              label="Remarks"
              value={editedData.remarks}
              onChange={(value) => handleChange('remarks', value)}
            />
          </div> */}
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Delay</label>
            <OutlinedInput
              label="Delay"
              value={editedData.delay}
              onChange={(value) => handleChange('delay', value)}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Delay Reason</label>
            <OutlinedInput
              label="Delay Reason"
              value={editedData.delayReason}
              onChange={(value) => handleChange('delayReason', value)}
            />
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

export default PTECTrackerEditDialog;