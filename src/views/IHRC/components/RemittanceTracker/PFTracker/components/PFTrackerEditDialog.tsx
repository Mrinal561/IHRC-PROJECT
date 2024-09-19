import React, { useState, useEffect } from 'react';
import { Dialog, Button, DatePicker, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { PFTrackerData } from './PFTrackerTable';
import OutlinedSelect from '@/components/ui/Outlined';



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


const challanTypeOptions = [
  { value: 'Main Challan', label: 'Main Challan' },
  { value: 'Arrear Challan', label: 'Arrear Challan' },
];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      width={800}
      height={600}
    >
      <h5 className="mb-4">Edit PF Tracker Detail</h5>

      
      <div className="p-4 space-y-4">
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label>Enter TRR NO.</label>
            <div className='w-full'>
            <OutlinedInput
                label="TRRN No"
                value={editedData.trrnNo}
                onChange={(value) => handleChange('trrnNo', value)}
                />
          </div>
                </div>

          <div className='flex flex-col gap-2 w-full'>
            <label>Enter CRN NO.</label>
            <div className='w-full'>
            <OutlinedInput
                label="CRN No"
                value={editedData.crnNo}
                onChange={(value) => handleChange('crnNo', value)}
                />
                </div>
          </div>
        </div>

        <div className="flex gap-8 items-center">
      <div className='flex flex-col gap-2'>
          <label>Enter the Wages</label>
          <div className='w-[219px]'>
          <OutlinedInput
          label="Wages"
          value={editedData.wages}
          onChange={(value) => handleChange('wages', value)}
        />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter EPS Wage</label>
          <div className='w-[219px]'>
          <OutlinedInput
          label="EPS Wage"
          value={editedData.epsWage}
          onChange={(value) => handleChange('epsWage', value)}
        />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Enter Total Challan Amount</label>
          <div className='w-[219px]'>
          <OutlinedInput
          label="Total Challan Amount"
          value={editedData.totalChallanAmount.toString()}
          onChange={(value) => handleChange('totalChallanAmount', parseFloat(value))}
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
          placeholder="Date of Payment"
          value={new Date(editedData.dateOfPayment)}
          onChange={(date) => handleDateChange('dateOfPayment', date)}
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
            <label>Enter Number of Employees</label>
            <div className='w-full'>
            <OutlinedInput
          label="No. of Employees"
          value={editedData.noOfEmployees.toString()}
          onChange={(value) => handleChange('noOfEmployees', parseInt(value, 10))}
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

export default PFTrackerEditDialog;