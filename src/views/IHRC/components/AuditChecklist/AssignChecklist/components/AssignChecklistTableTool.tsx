
import React, { useState, useEffect } from 'react';
import { Button, Dialog, Notification, Input, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import AssignChecklistTableSearch from './AssignChecklistTableSearch';
import BulkAlertButton from './BulkAlertButton';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useDispatch } from 'react-redux';
import { updateApproverOwner } from '@/store/slices/AssignedCompliance/assignedComplianceSlice';
 
interface SelectOption {
  value: number;
  label: string;
}
interface SelectOptionOwner {
  value: string;
  label: string;
}
 
interface BulkSetOwnerApproverButtonProps {
  selectedIds: number[];
  refreshTable: () => void;
}
 
export const BulkSetOwnerApproverButton: React.FC<BulkSetOwnerApproverButtonProps> = ({
  selectedIds,
  refreshTable
}) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
  const [selectedOwnerOption, setSelectedOwnerOption] = useState<SelectOption | null>(null);
  const [selectedApproverOption, setSelectedApproverOption] = useState<SelectOption | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedScheduledFrequency, setSelectedScheduledFrequency] = useState<any>(null)

  const scheduledOptions: SelectOptionOwner[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
]
 
  useEffect(() => {
    fetchUsersData();
  }, []);
 
  const fetchUsersData = async () => {
    try {
      const response = await httpClient.get(endpoints.user.getAll());
     
      if (response?.data?.data && Array.isArray(response.data.data)) {
        const mappedOptions = response.data.data.map((user: any) => ({
          label: user.name,
          value: user.id // Ensure value is string
        }));
       
        setUserOptions(mappedOptions);
      } else {
        toast.push(
          <Notification title="Error" type="danger">
            Invalid data format received
          </Notification>
        );
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to fetch users
        </Notification>
      );
    }
  };
 
  const handleOwnerChange = (value: SelectOption | null) => {
    setSelectedOwnerOption(value);
  };
 
  const handleApproverChange = (value: SelectOption | null) => {
    setSelectedApproverOption(value);
  };
 
 
 
  const handleConfirm = async () => {
    if (!selectedOwnerOption && !selectedApproverOption) {
      toast.push(
        <Notification title="Warning" type="warning">
          Please select at least an owner or approver
        </Notification>
      );
      return;
    }
 
    setIsUpdating(true);
    try {
      const updateData = {
        owner_id: selectedOwnerOption?.value || null,
        approver_id: selectedApproverOption?.value || null,
        assigned_compliance_id: selectedIds,
        scheduled_frequency: selectedScheduledFrequency?.value || '',

      };

      const response = await httpClient.put(endpoints.assign.update(), updateData);
 
      if (response) {
        toast.push(
          <Notification title="Success" type="success">
            Owner and Approver updated successfully
          </Notification>
        );
        handleCancel();
        refreshTable();
        // This will refresh the table and reset selections
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating owner/approver:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to update owner and approver
        </Notification>
      );
    } finally {
      setIsUpdating(false);
    }
  };
 
  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setSelectedOwnerOption(null);
    setSelectedApproverOption(null);
  };
 
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
        onClick={() =>{
          if (selectedIds.length === 0) {
            toast.push(
              <Notification title="Warning" type="warning">
                Please select compliances to update
              </Notification>
            );
            return;
          }
          setIsDialogOpen(true)}}
      >
        Bulk Owner/Approver
      </Button>
 
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={500}
      >
        <h5 className="mb-4">Set Owner/Approver for Selected Compliances</h5>
       
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Set Owner</label>
            <OutlinedSelect
              label="Set Owner"
              options={userOptions}
              value={selectedOwnerOption}
              onChange={handleOwnerChange}
            />
          </div>
 
          <div>
            <label className="block mb-2">Set Approver</label>
            <OutlinedSelect
              label="Set Approver"
              options={userOptions}
              value={selectedApproverOption}
              onChange={handleApproverChange}
            />
          </div>

          <div>
                        <label className="block mb-2">Scheduled Frequency</label>
                        <OutlinedSelect
                            label="Select Scheduled Frequency"
                            options={scheduledOptions}
                            value={selectedScheduledFrequency}
                            onChange={(selectedOption: SelectOption | null) => {
                                setSelectedScheduledFrequency(selectedOption)
                            }}
                        />
                    </div>
 
          {/* <div>
            <label className="block mb-2">Remark</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div> */}
        </div>
 
        <div className="mt-6 text-right space-x-2">
          <Button
            size="sm"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={handleConfirm}
            loading={isUpdating}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Confirm'}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
 
interface AssignChecklistTableToolProps {
  selectedIds: number[];
  refreshTable: () => void;
}
 
const AssignChecklistTableTool: React.FC<AssignChecklistTableToolProps> = ({
  selectedIds,
  refreshTable
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div>
        <AssignChecklistTableSearch />
      </div>
      <div className="flex items-center gap-3">
        <BulkAlertButton />
        <BulkSetOwnerApproverButton
          selectedIds={selectedIds}
          refreshTable={refreshTable}
        />
      </div>
    </div>
  );
};
 
export default AssignChecklistTableTool;