import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Checkbox, toast, Notification, DatePicker } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { AppDispatch } from '@/store';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { createUser } from '@/store/slices/userEntity/UserEntitySlice'
interface UserFormData {
  group_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  username: string;
  joining_date: Date | string;
  role: string;
  aadhar_no: string;
  pan_card: string;
  auth_signatory: boolean;
  suspend: boolean;
  disable: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

const UserAddForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  
  const [formData, setFormData] = useState<UserFormData>({
    group_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    username: '',
    joining_date: new Date(),
    role: '',
    aadhar_no: '',
    pan_card: '',
    auth_signatory: false,
    suspend: false,
    disable: false
  });

  // Update group_id when company group selection changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      group_id: selectedCompanyGroup?.value ? parseInt(selectedCompanyGroup.value) : 0
    }));
  }, [selectedCompanyGroup]);

  const loadCompanyGroups = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true },
      });
      setCompanyGroups(
        data.data.map((v: any) => ({
          label: v.name,
          value: String(v.id),
        }))
      );
    } catch (error) {
      console.error('Failed to load company groups:', error);
      showNotification('danger', 'Failed to load company groups');
    }
  };

  useEffect(() => {
    loadCompanyGroups();
  }, []);

  const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {message}
      </Notification>
    );
  };

  const handleInputChange = (field: keyof UserFormData, value: string | boolean | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.group_id || !formData.first_name || !formData.email || !formData.username) {
      showNotification('danger', 'Please fill in all required fields');
      return;
    }

    try {
      const resultAction = await dispatch(createUser(formData)).unwrap();
      navigate('/user-entity');
      showNotification('success', 'User added successfully');
    } catch (error: any) {
      showNotification('danger', error?.message || 'Failed to add user');
    }
  };

  const handleDateChange = (date: Date) => {
    handleInputChange('joining_date', date);
  };

  return (
    <div className="p-2 bg-white rounded-lg">
      <div className='flex items-center gap-2 mb-3'>
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
          onClick={() => navigate('/user-entity')}
        />
        <h3 className="text-2xl font-semibold">User Form</h3>
      </div>

      <form onSubmit={handleAddUser}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div className='flex flex-col gap-2'>
            <label>Select the company group</label>
            <OutlinedSelect
              label="Select The Company Group"
              options={companyGroups}
              value={selectedCompanyGroup}
              onChange={setSelectedCompanyGroup}
            />
          </div>
          <div>
            <p className="mb-2">First Name</p>
            <OutlinedInput
              label="First Name"
              value={formData.first_name}
              onChange={(value: string) => handleInputChange('first_name', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div>
            <p className="mb-2">Last Name</p>
            <OutlinedInput
              label="Last Name"
              value={formData.last_name}
              onChange={(value) => handleInputChange('last_name', value)}
            />
          </div>
          <div>
            <p className="mb-2">Email</p>
            <OutlinedInput
              label="Email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div>
            <p className="mb-2">Username</p>
            <OutlinedInput
              label="Username"
              value={formData.username}
              onChange={(value) => handleInputChange('username', value)}
            />
          </div>
          <div>
            <p className="mb-2">Job Role</p>
            <OutlinedInput
              label="Job Role"
              value={formData.role}
              onChange={(value) => handleInputChange('role', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div>
            <p className="mb-1">Aadhar No (Optional)</p>
            <OutlinedInput
              label="Aadhar No"
              value={formData.aadhar_no}
              onChange={(value) => handleInputChange('aadhar_no', value)}
            />
          </div>
          <div>
            <p className="mb-1">Date of Joining</p>
            <DatePicker
              size='sm'
              placeholder="Pick a date"
              value={formData.joining_date}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div>
            <p className="mb-1">PAN (Optional)</p>
            <OutlinedInput
              label="PAN"
              value={formData.pan_card}
              onChange={(value) => handleInputChange('pan_card', value)}
            />
          </div>
          <div>
            <p className="mb-1">Mobile No</p>
            <OutlinedInput
              label="Mobile no"
              value={formData.mobile}
              onChange={(value) => handleInputChange('mobile', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div className="flex items-center">
            <Checkbox
              checked={formData.auth_signatory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleInputChange('auth_signatory', e.target.checked)
              }
            >
              User will be assigned as a <b>Authorised Signatory</b>
            </Checkbox>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" variant="solid" size="sm">
              Add User
            </Button>
            <Button
              type="button"
              variant="plain"
              size="sm"
              onClick={() => navigate('/user-entity')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default UserAddForm;