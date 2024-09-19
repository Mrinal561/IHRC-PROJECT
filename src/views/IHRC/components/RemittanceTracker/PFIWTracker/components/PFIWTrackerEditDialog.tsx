import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFIWTrackerData } from './PFIWTrackerTable'; // Make sure to import this from your PFIWTrackerTable file

interface PFIWTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PFIWTrackerData) => void;
  data: PFIWTrackerData;
}

const PFIWTrackerEditDialog: React.FC<PFIWTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const [editedData, setEditedData] = useState<PFIWTrackerData>(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (field: keyof PFIWTrackerData, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedData);
    onClose();
    openNotification('success', 'PFIW Tracker edited successfully');
  };
  
  const handleDateChange = (field: 'month' | 'dueDate' | 'submissionDate', date: Date | null) => {
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
      width={600}
    >
      <h5 className="mb-4">Edit PFIW Tracker Detail</h5>
      
      <div className="p-4 space-y-4">

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
            <label>Submission Date</label>
            <DatePicker
              placeholder="Submission Date"
              value={new Date(editedData.submissionDate)}
              onChange={(date) => handleDateChange('submissionDate', date)}
            />
          </div>
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

export default PFIWTrackerEditDialog;