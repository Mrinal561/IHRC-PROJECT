import React, { useState, useEffect } from 'react';
import { ActionMeta, MultiValue } from 'react-select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
// import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui';
// import { Input } from '@/components/ui/input';
import {Input} from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
// import { DatePicker } from '@/components/ui/date-picker';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { Dialog } from '@/components/ui/dialog';
// import { Select } from '@/components/ui/select';
import {Select} from '@/components/ui';
// import { toast } from '@/components/ui/toast';
// import { Notification } from '@/components/ui/notification';
import {toast, Notification} from '@/components/ui';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
// import DistrictAutosuggest from '../../Branch/components/DistrictAutoSuggest';
import DistrictAutosuggest from '../../ESICSetup/components/DistrictAutoSuggest';
import LocationAutosuggest from '../../Branch/components/LocationAutosuggest';
import * as yup from 'yup';
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput';

const validationSchema = yup.object().shape({
  state_id: yup
  .number()
  .required('State is required')
  .positive('Please select a valid state'),
  district_id: yup
  .number()
  .required('District is required')
  .positive('Please select a valid district'),
  location: yup.string().required('Location is required'),
  register_number: yup.string().required('Registration number is required')
    .matches(/^[A-Za-z0-9-]+$/, 'Registration number can only contain letters, numbers, and hyphens'),
  register_date: yup.date().required('Registration date is required')
    .max(new Date(), 'Registration date cannot be in the future'),
  remmit_mode: yup.string().required('Remittance mode is required')
    .oneOf(['online', 'offline'], 'Invalid remittance mode'),
  username: yup.string().required('User ID is required')
    .min(4, 'User ID must be at least 4 characters'),
  password: yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
  ),
  signatory_data: yup.array().min(1, 'At least one signatory is required'),
  certificate: yup.string().required('Certificate is required'),
});


interface ValidationErrors {
  [key: string]: string;
}

interface LWFSetupPanelProps {
  onClose: () => void;
  addLWFSetup: (data: any) => void;
  companyId:string;
  groupId:string;
  companyName:string;
  groupName:string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface DistrictValue {
  id: number | null;
  name: string;
}

interface StateOption extends SelectOption {}
interface DistrictOption extends SelectOption {}
interface LocationOption extends SelectOption {}
interface UserSignatory {
  id: number;
  name: string;
}

const LWFSetupPanel: React.FC<LWFSetupPanelProps> = ({
  onClose,
  addLWFSetup,
  companyId,
  companyName,
  groupId,
   groupName
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] =  useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companies, setCompanies] = useState<SelectOption[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedSignatories, setSelectedSignatories] = useState<UserSignatory[]>([]);

  const [states, setStates] = useState<StateOption[]>([]);
  const [selectedStates, setSelectedStates] = useState<SelectOption | null>(null);
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictValue>({
    id: null,
    name: ''
  });
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fileBase64, setFileBase64] = useState<string>('');

  const [formData, setFormData] = useState<{
    group_id: number;
    company_id: number;
    state_id: number;
    district_id: number;
    location: string;
    register_number: string;
    register_date: Date | null;
    remmit_mode: string;
    username: string;
    password: string;
    signatory_data: { signatory_id: number }[];
    certificate: string;
  }>({
    group_id: 0,
    company_id: 0,
    state_id: 0,
    district_id: 0,
    location: '',
    register_number: '',
    register_date: null,
    remmit_mode: '',
    username: '',
    password: '',
    signatory_data: [],
    certificate: ''
  });

  const remittanceModeOptions = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' }
  ];

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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Load Company Groups
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

  // Load Companies based on selected group
  const loadCompanies = async (groupId: string[] | number[]) => {
    try {
      const groupIdParam = [`${groupId}`];
      const { data } = await httpClient.get(endpoints.company.getAll(), {
        params: {
          'group_id[]': groupIdParam
        }
      });

      if (data?.data) {
        const formattedCompanies = data.data.map((company: any) => ({
          label: company.name,
          value: String(company.id),
        }));
        setCompanies(formattedCompanies);
      } else {
        setCompanies([]);
        showNotification('info', 'No companies found for this group');
      }
    } catch (error: any) {
      console.error('Failed to load companies:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load companies');
      setCompanies([]);
    }
  };

  // Load States
  const loadStates = async () => {
    try {
      setIsLoading(true);
      const response = await httpClient.get(endpoints.common.state());
      
      if (response.data) {
        const formattedStates = response.data .filter((state: any) => state.lwf_active)
                .map((state: any) => ({
                    label: state.name,
                    value: String(state.id),
                    // Preserve additional state details
                    lwf_active: state.lwf_active
                }))
        setStates(formattedStates);
      }
    } catch (error) {
      console.error('Failed to load states:', error);
      showNotification('danger', 'Failed to load states');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Users/Signatories
  const loadUsers = async () => {
    try {
      const response = await httpClient.get(endpoints.user.getAll());
      if(response.data){
        const authorizedSignatories = response.data.data;
        setUsers(authorizedSignatories);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showNotification('danger', 'Failed to load users');
    }
  };

  useEffect(() => {
    loadCompanyGroups();
    loadStates();
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedCompanyGroup?.value) {
      setFormData(prev => ({
        ...prev,
        group_id: parseInt(selectedCompanyGroup.value)
      }));
      setSelectedCompany(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
    }
  }, [selectedCompanyGroup]);

  useEffect(() => {
    if (selectedCompany?.value) {
      setFormData(prev => ({
        ...prev,
        company_id: parseInt(selectedCompany.value)
      }));
    }
  }, [selectedCompany]);





  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (yupError) {
      if (yupError instanceof yup.ValidationError) {
        const newErrors: ValidationErrors = {};
        yupError.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      setIsLoading(true);
      const isValid = await validateForm();
      if (!isValid) {
        toast.push(
          <Notification title="Error" type="danger">
          Please fix the validation errors
          </Notification>
      );
        return;
      }
      const data = {
        ...formData,
        company_id:companyId,
        group_id: groupId,
      }
      const response = await httpClient.post(endpoints.lwfSetup.create(), data);
      if(response){
        addLWFSetup(response.data);
        onClose();
        showNotification('success', 'LWF Setup created successfully');
      }
    } catch (error: any) {
      console.error('Failed to create LWF Setup:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to create LWF Setup');
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = async (fieldName: string, value: any) => {
    try {
      await validationSchema.validateAt(fieldName, { ...formData, [fieldName]: value });
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [fieldName]: error.message }));
      }
    }
  };

  // Modify state change handlers to include validation
  const handleStateChange = (option: SelectOption | null) => {
    setSelectedStates(option);
    setSelectedDistrict({ id: null, name: '' });
    setSelectedLocation('');
    setDistricts([]);
    setLocations([]);
    
    const stateId = option ? parseInt(option.value) : 0;
    setFormData(prev => ({
      ...prev,
      state_id: stateId
    }));
    validateField('state_id', stateId);
  };

  const handleDistrictChange = (district: DistrictValue) => {
    setSelectedDistrict(district);
    const districtId = district.id || 0;
    setFormData(prev => ({
      ...prev,
      district_id: districtId
    }));
    validateField('district_id', districtId);
    setSelectedDistrictId(districtId);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setFormData(prev => ({
      ...prev,
      location: value
    }));
    validateField('location', value);
  };

  const handleRegisterNumberChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      register_number: value
    }));
    validateField('register_number', value);
  };

  const handleRegisterDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      register_date: date
    }));
    validateField('register_date', date);
  };

  const handleRemitModeChange = (option: SelectOption | null) => {
    const value = option?.value || '';
    setFormData(prev => ({
      ...prev,
      remmit_mode: value
    }));
    validateField('remmit_mode', value);
  };

  const handleUsernameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      username: value
    }));
    validateField('username', value);
  };

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      password: value
    }));
    validateField('password', value);
  };

  const handleSignatoryChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>,
  ) => {
    const selectedUserIds = newValue
      .map(option => parseInt(option.value))
      .filter(id => !isNaN(id));

    const newSignatoryData = selectedUserIds.map((id) => ({
      signatory_id: id,
    }));

    setFormData(prev => ({
      ...prev,
      signatory_data: newSignatoryData,
    }));
    validateField('signatory_data', newSignatoryData);

    const newSelectedSignatories = selectedUserIds.map((id) => {
      const user = users.find((u) => u.id === id);
      return user ? user : { id, name: '' };
    });
    setSelectedSignatories(newSelectedSignatories);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        setFormData(prev => ({
          ...prev,
          certificate: base64String
        }));
        validateField('certificate', base64String);
      } catch (error) {
        console.error('Error converting file to base64:', error);
        showNotification('danger', 'Failed to process file');
      }
    }
  };


  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">Company Group</p>
           <OutlinedInput
            label="Company Group"
            value={groupName}
            disabled
            />
        </div>
        <div>
          <p className="mb-2">Company</p>
         
          <OutlinedInput
                            label="Company"
                            value={companyName}
                            disabled
                            />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="mb-2">State</p>
          <OutlinedSelect
            label="Select State"
            options={states}
            value={selectedStates}
            onChange={handleStateChange}
          />
           <div className="min-h-[20px]">
            {errors.state_id && (
              <p className="text-red-500 text-xs mt-1">{errors.state_id}</p>
            )}
          </div>
          
        </div>
        <div>
        <DistrictAutosuggest 
        value={selectedDistrict}
        onChange={handleDistrictChange}
        stateId={selectedStates?.value ? parseInt(selectedStates.value) : undefined}
        onDistrictSelect={(id) => setSelectedDistrictId(id)}  // Add this prop
      />
      <div className="min-h-[20px]">
            {errors.district_id && (
              <p className="text-red-500 text-xs mt-1">{errors.district_id}</p>
            )}
          </div>
        </div>
        <div>
          <LocationAutosuggest
            value={selectedLocation}
            onChange={handleLocationChange}
            districtId={selectedDistrictId}
          />
           <div className="min-h-[20px]">
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-2">
        <div>
          <p className="mb-2">LWF   Registration Number</p>
          <OutlinedInput
            label="Registration Number"
            value={formData.register_number}
            onChange={handleRegisterNumberChange}
          />
           <div className="min-h-[20px]">
            {errors.register_number && (
              <p className="text-red-500 text-xs mt-1">{errors.register_number}</p>
            )}
          </div>
        </div>
        <div>
          <p className="mb-2">LWF Registration Date</p>
          <DatePicker
          size='sm'
        placeholder="Registration Date"
        value={formData.register_date}
        onChange={handleRegisterDateChange}
      />
       <div className="min-h-[20px]">
            {errors.register_date && (
              <p className="text-red-500 text-xs mt-1">{errors.register_date}</p>
            )}
          </div>
      
        </div>
        <div>
          <p className="mb-2">Remittance Mode</p>
          <OutlinedSelect
            label="Select Mode"
            options={remittanceModeOptions}
            value={remittanceModeOptions.find(option => option.value === formData.remmit_mode)}
            onChange={handleRemitModeChange}
          />
           <div className="min-h-[20px]">
            {errors.remmit_mode && (
              <p className="text-red-500 text-xs mt-1">{errors.remmit_mode}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <p className="mb-2">User ID</p>
          <OutlinedInput
            label="User ID"
            value={formData.username}
            onChange={handleUsernameChange}
          />
          <div className="min-h-[20px]">
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
        </div>
        <div>
          <p className="mb-2">Password</p>
          <OutlinedPasswordInput
            label="Password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          <div className="min-h-[20px]">
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>
      </div>

<div className='grid grid-cols-2 gap-4 mb-2'>
      <div className="mb-4">
        <p className="mb-2">Signatory</p>
        <Select
          isMulti
          options={users.map(user => ({
            value: String(user.user_details.id),                           
            label: `${user.user_details.name}`,
          }))}
          onChange={handleSignatoryChange}
        />
        <div className="min-h-[20px]">
            {errors.signatory_data && (
              <p className="text-red-500 text-xs mt-1">{errors.signatory_data}</p>
            )}
          </div>
      </div>

      <div className="mb-2">
        <p className="mb-2">Upload Certificate(PDF Only)</p>
        <Input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf"
        />
         <div className="min-h-[20px]">
            {errors.certificate && (
              <p className="text-red-500 text-xs mt-1">{errors.certificate}</p>
            )}
          </div>
      </div>
  </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="solid"
          size="sm"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Create LWF Setup
        </Button>
        <Button
          variant="plain"
          size="sm"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LWFSetupPanel;