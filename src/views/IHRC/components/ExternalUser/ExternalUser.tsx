import React, { useState } from 'react';
import { Button, Dialog } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { AdaptableCard } from '@/components/shared';
import OutlinedInput from '@/components/ui/OutlinedInput';
import ExternalUserTable from './components/ExternalUserTable';

// External User Form Component
const ExternalUserForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNo: '',
    company: '',
    username: ''
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h4 className="mb-4">Add External User</h4>
      <div className="space-y-4">
        <div>
        <label className="block mb-2 font-medium">
            Username
          </label>
          <OutlinedInput
            label="Username"
            value={formData.username}
            onChange={handleInputChange('username')}
          />
        </div>
        <div>
        <label className="block mb-2 font-medium">
        Email
          </label>
          <OutlinedInput
            label="Email"
            value={formData.email}
            onChange={handleInputChange('email')}
          />
        </div>
        <div>
        <label className="block mb-2 font-medium">
        Phone Number
          </label>
          <OutlinedInput
            label="Phone Number"
            value={formData.phoneNo}
            onChange={handleInputChange('phoneNo')}
          />
        </div>
        <div>
        <label className="block mb-2 font-medium">
        Company
          </label>
          <OutlinedInput
            label="Company"
            value={formData.company}
            onChange={handleInputChange('company')}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="plain" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

// Main External User Component
const ExternalUser = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddUser = (userData) => {
    console.log('New user data:', userData);
    // Handle the submission logic here
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">
            External User
          </h3>
        </div>
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add External User
        </Button>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onRequestClose={() => setIsDialogOpen(false)}
        width={500}
        height={480}
      >
        <ExternalUserForm
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleAddUser}
        />
      </Dialog>
      <ExternalUserTable></ExternalUserTable>
    </AdaptableCard>
  );
};

export default ExternalUser;