import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import { LWFTrackerData } from './LWFTrackerTable';


interface PFTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: LWFTrackerData) => void;
  data: LWFTrackerData;
}

const LWFTrackerEditDialog: React.FC<PFTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const [editedData, setEditedData] = useState<LWFTrackerData>(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (field: keyof LWFTrackerData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedData);
    onClose();
    openNotification('success', 'LWF Tracker edited successfully');

  };
  
  const handleDateChange = (field: 'dueDate' | 'submittedOn', date: Date | null) => {
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

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={450}
    >
      <h5 className="mb-4">Edit LWF Tracker</h5>

      
      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Receipt Number</label>
            <div className='w-full'>
            <OutlinedInput
                label="Receipt Number"
                value={editedData.receiptNo}
                onChange={(value) => handleChange('receiptNo', value)}
                />
          </div>
                </div>

          <div className='flex flex-col gap-2 w-full'>
            <label>Enter Total Amount</label>
            <div className='w-full'>
            <OutlinedInput
                label="Total Amount"
                value={editedData.lwfAmount}
                onChange={(value) => handleChange('lwfAmount', value)}
                />
                </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
      <div className='flex flex-col gap-2 w-full'>
          <label>Delay</label>
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

      <div className='flex gap-8 items-center'>
         <div className='flex flex-col gap-2 w-full'>
          <label>Select Due Date</label>
          <div className='w-full'>
          <DatePicker
          placeholder="Due Date"
          value={new Date(editedData.dueDate)}
          onChange={(date) => handleDateChange('dueDate', date)}
        />
            </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label>Select Date of Payment</label>
          <div className='w-full'>
          <DatePicker
          placeholder="Date of Payment"
          value={new Date(editedData.submittedOn)}
          onChange={(date) => handleDateChange('submittedOn', date)}
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

export default LWFTrackerEditDialog;