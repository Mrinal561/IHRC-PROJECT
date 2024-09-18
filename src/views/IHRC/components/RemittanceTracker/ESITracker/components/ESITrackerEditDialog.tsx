
import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { ESITrackerData } from './ESITrackerTable';

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

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
    >
      <h5 className="mb-4">Edit ESI Tracker</h5>
      <div className="grid grid-cols-2 gap-4">
        <OutlinedInput
          label="No. of Employees"
          value={editedData.noOfEmployees.toString()}
          onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
        />
        <OutlinedInput
          label="ESI Gross Wages"
          value={editedData.esiGrossWages.toString()}
          onChange={(value) => handleChange('esiGrossWages', parseFloat(value))}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="flex flex-col ">
          <label>Please select the Month</label>
          <DatePicker
            placeholder="Month"
            value={new Date(editedData.month)}
            onChange={(date) => handleDateChange('month', date)}
          />
        </div>
        <div className="flex flex-col ">
          <label>Due Date</label>
          <DatePicker
            placeholder="Due Date"
            value={new Date(editedData.dueDate)}
            onChange={(date) => handleDateChange('dueDate', date)}
          />
        </div>
        <div className="flex flex-col">
          <label>Amount Paid On</label>
          <DatePicker
            placeholder="Amount Paid On"
            value={new Date(editedData.amountPaidOn)}
            onChange={(date) => handleDateChange('amountPaidOn', date)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <OutlinedInput
          label="EE ESI"
          value={editedData.eeESI.toString()}
          onChange={(value) => handleChange('eeESI', parseFloat(value))}
        />
        <OutlinedInput
          label="ER ESI"
          value={editedData.erESI.toString()}
          onChange={(value) => handleChange('erESI', parseFloat(value))}
        />
        <OutlinedInput
          label="Total ESI"
          value={editedData.totalESI.toString()}
          onChange={(value) => handleChange('totalESI', parseFloat(value))}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <OutlinedInput
          label="Total Amount As per Challan"
          value={editedData.totalAmountAsPerChallan.toString()}
          onChange={(value) => handleChange('totalAmountAsPerChallan', parseFloat(value))}
        />
        <OutlinedInput
          label="Difference in Amount"
          value={editedData.differenceInAmount.toString()}
          onChange={(value) => handleChange('differenceInAmount', parseFloat(value))}
        />
        <OutlinedInput
          label="Delay"
          value={editedData.delay}
          onChange={(value) => handleChange('delay', value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <OutlinedInput
          label="Delay Reason"
          value={editedData.delayReason}
          onChange={(value) => handleChange('delayReason', value)}
        />
        <OutlinedInput
          label="Challan No"
          value={editedData.challanNo}
          onChange={(value) => handleChange('challanNo', value)}
        />
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