
import React, { useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import { Button, Dialog } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { createRole, fetchRoles } from '@/store/slices/role/roleSlice';
import RoleTable from './components/RoleTable';
// import RoleTable from './components/RoleTable';

const Role = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [key, setKey] = useState(0);
  const [formData, setFormData] = useState({
    name: ''
  });

  const refreshData = () => {
    setKey(prev => prev + 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchRoleData = async (page = 1, pageSize = 10) => {
    setIsLoading(true);
    try {
      const data = await dispatch(fetchRoles());
      setRoleData(data.payload);
      console.log('Role Data:', data.payload);
    } catch (error) {
      console.error('Error fetching role data:', error);
      showErrorNotification('Failed to fetch role data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Initial Role Management Rendering");
    fetchRoleData();
  }, [key]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFormData({
      name: ''
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(createRole(formData))
        .unwrap()
        .catch((error: any) => {
          if (error.response?.data?.message) {
            showErrorNotification(error.response.data.message);
          } else if (error.message) {
            showErrorNotification(error.message);
          } else if (Array.isArray(error)) {
            showErrorNotification(error);
          } else {
            showErrorNotification('An unexpected error occurred. Please try again.');
          }
          throw error;
        });

      handleDialogClose();
      refreshData();
    } catch (error) {
      console.error('Error creating role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">Role Management</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => setIsDialogOpen(true)}
          >
            Add Role
          </Button>
        </div>
      </div>

      <RoleTable 
        roleData={roleData}
        isLoading={isLoading}
        onDataChange={fetchRoleData}
      />

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-6">Add Role</h5>
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <label className="text-gray-600 mb-2 block">Role Name <span className="text-red-500">*</span></label>
            <OutlinedInput
              label="Role Name"
              value={formData.name}
              onChange={(value: string) => handleInputChange('name', value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button 
            variant="solid" 
            onClick={handleConfirm}
            loading={isLoading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </AdaptableCard>
  );
};

export default Role;