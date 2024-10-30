import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, toast, Notification, DatePicker } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { entityDataSet, EntityData } from '../../../store/dummyEntityData';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { selectCommonData } from '@/store/slices/common/commonSlice';
import { createUser } from '@/services/UserEntityService';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';



interface FormData {
  group_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  username: string;
  joining_date: string;
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

interface NewUser {
    name: string;
    group_id: number;
    first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  username: string;
  joining_date: string;
  role: string;
  aadhar_no: string;
  pan_card: string;
  auth_signatory: boolean;
  suspend: boolean;
  disable: boolean;
  }

const UserAddForm = () => {
    const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
//   const companyGroups = useSelector();
const [companyGroups, setCompanyGroups] = useState([]);
const [user, setUser] = useState('');
const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
const [newCompany, setNewCompany] = useState<NewUser>({
    name: '',
    group_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    username: '',
    joining_date: '',
    role: '',
    aadhar_no: '',
    pan_card: '',
    auth_signatory: false,
    suspend: false,
    disable: false,
  });

  // Update newCompany when inputs change
  useEffect(() => {
    setNewCompany(prev => ({
      ...prev,
      name: user,
      group_id: selectedCompanyGroup?.value ? parseInt(selectedCompanyGroup.value) : 0
    }));
  }, [user, selectedCompanyGroup]);

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
      toast.push(
        <Notification title="Error" type="danger">
          Failed to load company groups
        </Notification>
      );
    }
  };

  useEffect(() => {
    loadCompanyGroups();
  }, []);

    
  const [formData, setFormData] = useState({
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
      disable: false,
      group_id: 0
  });

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

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }));
};

const handleAddUser = async () => {
    // e.preventDefault();
    console.log(newCompany.name);
    try {
        await dispatch(createUser(formData)).unwrap();
        toast.push(
            <Notification title="Success" type="success">
                User added successfully
            </Notification>
        );
        setUser('')
        navigate('/user-entity');
    } catch (error) {
        toast.push(
            <Notification title="Error" type="danger">
                Failed to add user
            </Notification>
        );
    }
};

// const selectedGroupOption: SelectOption | null = formData.group_id 
// ? {
//     value: formData.group_id.toString(),
//     label: companyGroups.find(g => g.id === formData.group_id)?.name || ''
// }
// : null;


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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
        <div className='flex flex-col gap-2'>
          <label>Select the company group </label>
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
              onChange={(value: string) => {
                handleInputChange('first_name', value)
              }}
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
            <DatePicker size='sm' placeholder="Pick a date"  value={formData.joining_date}/>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
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
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('auth_signatory', e.target.checked)}
                        >
                            User will be assigned as a <b>Authorised Signatory</b>
                        </Checkbox>
          </div>
          <div className="flex justify-end gap-2">
          <Button type="submit" variant="solid" size="sm" onClick={handleAddUser}>
            Add User
          </Button>
          <Button type="button" variant="plain" size="sm" onClick={() => navigate('/user-entity')}>
            Cancel
          </Button>
        </div>
        </div>

        
    </div>
  );
}
export default UserAddForm;
