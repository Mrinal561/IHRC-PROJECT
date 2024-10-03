import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, toast, Notification, DatePicker } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { entityDataSet, EntityData } from '../../../store/dummyEntityData';

interface SelectOption {
  value: string;
  label: string;
}

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [userName, setUserName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [dscVal, setDscVal] = useState('');
  const [pan, setPan] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const companyGroupOptions = useMemo(() => {
    const uniqueGroups = Array.from(new Set(entityDataSet.map(entity => entity.Company_Group_Name)));
    return uniqueGroups.filter(Boolean).map(group => ({
      value: group as string,
      label: group as string
    }));
  }, []);

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

  const handleAddBranch = () => {
    openNotification('success', 'User added successfully');
    navigate(`/user-entity`);
  };


  return (
    <div className="p-2 bg-white rounded-lg">
      <div className='flex items-center gap-2  mb-3'>
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
          onClick={() => navigate('/user-entity')}
          />
        <h3 className="text-2xl font-semibold">User Form</h3>
      </div>
      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className='flex flex-col gap-2'>
          <label>Select the company group </label>
          <OutlinedSelect
            label="Select The Company Group"
            options={companyGroupOptions}
            value={selectedCompanyGroup}
            onChange={(option: SelectOption | null) => {
              console.log("Company Group selected:", option);
              setSelectedCompanyGroup(option);
            }}
          />
        </div>
          <div>
            <p className="mb-2">First Name</p>
            <OutlinedInput
              label="First Name"
              value={firstName}
              onChange={(value: string) => {
                setFirstName(value);
              }}
            />
          </div>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
            <p className="mb-2">Last Name</p>
            <OutlinedInput
              label="Last Name"
              value={LastName}
              onChange={(value: string) => {
                setLastName(value);
              }}
            />
          </div>
          <div>
            <p className="mb-2">Email</p>
            <OutlinedInput
              label="Email"
              value={email}
              onChange={(value: string) => {
                setemail(value);
              }}
            />
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
            <p className="mb-2">Username</p>
            <OutlinedInput
              label="Username"
              value={userName}
              onChange={(value: string) => {
                setUserName(value);
              }}
            />
          </div>
          <div>
            <p className="mb-2">Job Role</p>
            <OutlinedInput
              label="Job Role"
              value={jobRole}
              onChange={(value: string) => {
                setJobRole(value);
              }}
            />
          </div>
         
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-2">DSC</p>
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
            <p className="mb-2">DSC Validity Date</p>
            <OutlinedInput
              label="DSC Validity Date"
              value={dscVal}
              onChange={(value: string) => {
                setDscVal(value);
              }}
            />
          </div>
        </div> */}

      

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div>
            <p className="mb-1">Aadhar No (Optional)</p>
            <OutlinedInput
              label="Aadhar No"
              value={aadhar}
              onChange={(value: string) => {
                setAadhar(value);
              }}
            />
          </div>
          <div>
            <p className="mb-1">Date of Joining</p>
            <DatePicker size='sm' placeholder="Pick a date" />
          </div>
          {/* <div>
            <p className="mb-2">Mobile No</p>
            <OutlinedInput
              label="Mobile no"
              value={mobile}
              onChange={(value: string) => {
                setMobile(value);
              }}
            />
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* <div>
            <p className="mb-2">eSign</p>
            <OutlinedSelect
              label="eSign"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              value={null}
              onChange={() => {}}
            />
          </div> */}
          <div>
            <p className="mb-1">PAN (Optional)</p>
            <OutlinedInput
              label="PAN"
              value={pan}
              onChange={(value: string) => {
                setPan(value);
              }}
            />
          </div>
          <div>
            <p className="mb-1">Mobile No</p>
            <OutlinedInput
              label="Mobile no"
              value={mobile}
              onChange={(value: string) => {
                setMobile(value);
              }}
            />
          </div>
          
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        <div className="flex items-center">
          <Checkbox >User will be assigned as a <b>Authorised Signatory</b></Checkbox>
          </div>
          <div className="flex justify-end gap-2">
          <Button type="submit" variant="solid" size="sm" onClick={handleAddBranch}>
            Add User
          </Button>
          <Button type="button" variant="plain" size="sm" onClick={() => navigate('/user-entity')}>
            Cancel
          </Button>
        </div>
        </div>

        
      </form>
    </div>
  );
};

export default UserForm;