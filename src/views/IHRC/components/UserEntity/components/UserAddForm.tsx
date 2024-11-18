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
import { format } from 'date-fns';

interface UserFormData {
  group_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile: string;
  joining_date: string;
  role_id: number;
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

  const [ userRole, setUserRole ] = useState<SelectOption[]>([]);
  const [ selectedUserRole, setSelectedUserRole ] = useState<SelectOption | null>(null);
  const [isAuthorizedSignatory, setIsAuthorizedSignatory] = useState(false);

  
  const [formData, setFormData] = useState<UserFormData>({
    group_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    joining_date: '',
    role_id: 0,
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


  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      role_id: selectedUserRole?.value ? parseInt(selectedUserRole.value) : 0 
    }))
  }, [selectedUserRole])


  const loadUserRoles = async () => {
    try{
      const { data } = await httpClient.get(endpoints.role.getAll());
      setUserRole(
        data.map((v: any) => ({ 
          label: v.name, 
          value: String(v.id)
        }))
      );      
    }
    catch(error){
      console.error('Failed to load user roles:', error);
      showNotification('danger', 'Failed to load user roles');
    }
  }

  useEffect(() => {
    loadUserRoles()
  }, [])

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

  // const handleAuthSignatoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = e.target.checked;
  //   console.log('Auth Signatory Changed:', isChecked); // Debug log
  //   setFormData(prev => ({
  //     ...prev,
  //     auth_signatory: isChecked
  //   }));
  // };


  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      auth_signatory: isAuthorizedSignatory
    }));
  }, [isAuthorizedSignatory]);

  const handleAuthSignatoryChange = (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Auth Signatory Changed:', checked);
    setIsAuthorizedSignatory(checked);
  };

  const handleInputChange = (field: keyof UserFormData, value: string | boolean | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  
  const formatErrorMessages = (errors: any): string => {
    // If errors is an array, join them with line breaks
    if (Array.isArray(errors)) {
        return errors.join('\n');
    }
    // If errors is an object, extract all error messages
    else if (typeof errors === 'object' && errors !== null) {
        const messages: string[] = [];
        Object.entries(errors).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                messages.push(...value);
            } else if (typeof value === 'string') {
                messages.push(value);
            }
        });
        return messages.join('\n');
    }
    // If it's a single string error
    return String(errors);
};


  const showErrorNotification = (errors: any) => {
    const formattedMessage = formatErrorMessages(errors);
    
    // Split the formatted message into individual error messages
    const errorMessages = formattedMessage.split('\n').filter(Boolean); // Filter out empty strings
    
    toast.push(
      <Notification title="Error" type="danger">
        <div style={{ whiteSpace: 'pre-line' }}>
          {errorMessages.length > 1? ( // Check if there are multiple error messages
            <ul style={{ padding: 0, margin: 0, listStyle: 'disc inside' }}>
              {errorMessages.map((message, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{message}</li>
              ))}
            </ul>
          ) : (
            <span>{formattedMessage}</span> // If only one error message, display as before
          )}
        </div>
      </Notification>
    );
  };



  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    // if (!formData.group_id || !formData.first_name || !formData.email || !formData.last_name ||!formData.joining_date || !formData.mobile || !formData.password || !formData.role_id) {
    //   showNotification('danger', 'Please fill in all required fields');
    //   return;
    // }

    try {
      const resultAction = await dispatch(createUser(formData))
      .unwrap()
      .catch((error: any) => {
        // Handle different error formats
        if (error.response?.data?.message) {
            // API error response
            showErrorNotification(error.response.data.message);
        } else if (error.message) {
            // Regular error object
            showErrorNotification(error.message);
        } else if (Array.isArray(error)) {
            // Array of error messages
            showErrorNotification(error);
        } else {
            // Fallback error message
            showErrorNotification('An unexpected error occurred. Please try again.');
        }
        throw error; // Re-throw to prevent navigation
    });

if (resultAction) {
    navigate('/user-entity');
    showNotification('success', 'User added successfully');
}


      
    } catch (error: any) {
      // showNotification('danger', error?.message || 'Failed to add user');
      console.error('User creation error:', error);

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
            <p className='mb-2'>Select the company group <span className="text-red-500">*</span></p>
            <OutlinedSelect
              label="Select The Company Group"
              options={companyGroups}
              value={selectedCompanyGroup}
              onChange={setSelectedCompanyGroup}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p className="mb-2">Name <span className="text-red-500">*</span></p>
            <OutlinedInput
              label="Name"
              value={formData.first_name}
              onChange={(value: string) => handleInputChange('first_name', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          {/* <div className='flex flex-col gap-1'>
            <p className="mb-2">Last Name <span className="text-red-500">*</span></p>
            <OutlinedInput
              label="Last Name"
              value={formData.last_name}
              onChange={(value) => handleInputChange('last_name', value)}
            />
          </div> */}
          <div className='flex flex-col gap-1'>
            <p className="mb-2">Email <span className="text-red-500">*</span></p>
            <OutlinedInput
              label="Email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <p className="mb-2">Password <span className="text-red-500">*</span></p>
            <OutlinedInput
              label="Password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
         
        <div className='flex flex-col gap-1'>
            <p className="mb-1">Mobile No <span className="text-red-500">*</span></p>
            <OutlinedInput
              label="Mobile no"
              value={formData.mobile}
              onChange={(value) => handleInputChange('mobile', value)}
            />
          </div>


          <div className='flex flex-col gap-1'>
            <p className="mb-2">Designation <span className="text-red-500">*</span></p>
            <OutlinedSelect
              label="Designation"
              options={userRole}
              value={selectedUserRole}
              onChange={setSelectedUserRole}
            />
          </div>

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          
        <div className='flex flex-col gap-1'>
            <p className="mb-1">Aadhar No (Optional)</p>
            <OutlinedInput
              label="Aadhar No"
              value={formData.aadhar_no}
              onChange={(value) => handleInputChange('aadhar_no', value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <p className="mb-1">PAN (Optional)</p>
            <OutlinedInput
              label="PAN"
              value={formData.pan_card}
              onChange={(value) => handleInputChange('pan_card', value)}
            />
          </div>


         

         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">

        <div className='flex flex-col gap-1'>
            <p className="mb-1">Date of Joining <span className="text-red-500">*</span></p>
            <DatePicker
              size='sm'
              placeholder="Pick a date"
              // value={formData.joining_date}
              onChange={(date) => {
                setFormData((prev) => ({
                  ...prev,
                  joining_date: date ? format(date, 'yyyy-MM-dd') : '',
                }))
              }}
            />
          </div>
          
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
          <div className="flex items-center">
            <Checkbox
              checked={formData.auth_signatory}
              onChange={handleAuthSignatoryChange}
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