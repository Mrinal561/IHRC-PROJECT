import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFTrackerData } from './PFTrackerTable';



interface PFTrackerEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedData: PFTrackerData) => void;
  data: PFTrackerData;
}

const PFTrackerEditDialog: React.FC<PFTrackerEditDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
}) => {
  const [editedData, setEditedData] = useState<PFTrackerData>(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleChange = (field: keyof PFTrackerData, value: string | number) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedData);
    onClose();
    openNotification('success', 'PF Tracker edited successfully');

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


  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={520}
    >
      <h5 className="mb-4">Edit PF Tracker</h5>
      <div className="grid grid-cols-2 gap-4">
        <div className='flex flex-col gap-3'>
            <label>Please select the Month</label>
        <DatePicker
          placeholder="Month"
          value={new Date(editedData.month)}
          onChange={(date) => handleDateChange('month', date)}
          />
          </div>
          <div className='flex flex-col gap-4'>
            <label>Please enter the number of employee</label>
        <OutlinedInput
          label="No. of Employees"
          value={editedData.noOfEmployees.toString()}
          onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
          />
          </div>
        <OutlinedInput
          label="Wages"
          value={editedData.wages}
          onChange={(value) => handleChange('wages', value)}
        />
        <OutlinedInput
          label="EPS Wage"
          value={editedData.epsWage}
          onChange={(value) => handleChange('epsWage', value)}
        />
        <OutlinedInput
          label="Total Challan Amount"
          value={editedData.totalChallanAmount.toString()}
          onChange={(value) => handleChange('totalChallanAmount', parseFloat(value))}
        />
        <DatePicker
          placeholder="Due Date"
          value={new Date(editedData.dueDate)}
          onChange={(date) => handleDateChange('dueDate', date)}
        />
        <DatePicker
          placeholder="Date of Payment"
          value={new Date(editedData.dateOfPayment)}
          onChange={(date) => handleDateChange('dateOfPayment', date)}
        />
        <OutlinedInput
          label="Delay"
          value={editedData.delay}
          onChange={(value) => handleChange('delay', value)}
        />
        <OutlinedInput
          label="Delay Reason"
          value={editedData.delayReason}
          onChange={(value) => handleChange('delayReason', value)}
        />
        <OutlinedInput
          label="Type of Challan"
          value={editedData.typeOfChallan}
          onChange={(value) => handleChange('typeOfChallan', value)}
        />
        <OutlinedInput
          label="TRRN No"
          value={editedData.trrnNo}
          onChange={(value) => handleChange('trrnNo', value)}
        />
        <OutlinedInput
          label="CRN No"
          value={editedData.crnNo}
          onChange={(value) => handleChange('crnNo', value)}
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

export default PFTrackerEditDialog;