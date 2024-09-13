import React from 'react';
import { Button, Checkbox } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';

const UserForm: React.FC = () => {
  return (
    <div className="p-2 bg-white rounded-lg shadow-md">
      <div className='flex gap-2 items-center mb-3'>
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
          onClick={() => {/* Navigation logic here */}}
        />
        <h3 className="text-2xl font-semibold">User Form</h3>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">First Name</p>
            <OutlinedInput
              label="First Name"
              value=""
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="mb-1">Last Name</p>
            <OutlinedInput
              label="Last Name"
              value=""
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">Email</p>
            <OutlinedInput
              label="Email"
              value=""
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="mb-1">Username</p>
            <OutlinedInput
              label="Username"
              value=""
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">Job Role</p>
            <OutlinedInput
              label="Job Role"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="flex items-center mt-4">
          <Checkbox >Authorised Signatory</Checkbox>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">DSC</p>
            <OutlinedSelect
              label="DSC"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              value={null}
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="mb-1">DSC Validity Date</p>
            <OutlinedInput
              label="DSC Validity Date"
              value=""
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">eSign</p>
            <OutlinedSelect
              label="eSign"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              value={null}
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="mb-1">PAN (Optional)</p>
            <OutlinedInput
              label="PAN"
              value=""
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">Aadhar No (Optional)</p>
            <OutlinedInput
              label="Aadhar No"
              value=""
              onChange={() => {}}
            />
          </div>
          <div>
            <p className="mb-1">Date of Joining</p>
            <OutlinedInput
              label="Date of Joining"
              value=""
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="solid" size="sm">
            Add User
          </Button>
          <Button type="button" variant="plain" size="sm" onClick={() => {/* Navigation logic here */}}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;