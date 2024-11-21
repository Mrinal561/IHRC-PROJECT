// import React, { useState } from 'react';
// import { Button, Input, Dialog, toast, Notification, DatePicker, Select } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { MultiValue, ActionMeta } from 'react-select';

// export interface LWFSetupData {
//     Company_Group_Name: string;
//     Company_Name: string;
//     lwfState: string;
//     lwfLocation: string;
//     lwfRegistrationNumber: string;
//     lwfRegistrationDate?: Date | null;
//     lwfRemmitanceMode: string;
//     lwfRemmitanceFrequency: string;
//     lwfUserId?: string;
//     lwfPassword?: string;
//     authorizedSignatory: string[];
//     signatoryDesignation?: string;
//     signatoryMobile?: string;
//     signatoryEmail?: string;
//     lwfFrequency: string;
//     lwfPaymentDueDate: string;
//     lwfApplicableState: string;
//     lwfRegistrationCertificate?: File | null;
// }

// interface LWFSetupSidePanelProps {
//   onClose: () => void;
//   addLWFSetup:(data:any) => void;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }

// const LWFSetupPanel: React.FC<LWFSetupSidePanelProps> = ({
//   // addPFSetup,
//   onClose,
//   companyGroupName,
//   companyName,
// }) => {
//   const [LWFSetupData, setLWFSetupData] = useState<LWFSetupData>({
//     Company_Group_Name: companyGroupName,
//     Company_Name: companyName,
//     authorizedSignatory: [],
//     lwfState: '',
//     lwfLocation: '',
//     lwfRegistrationNumber: '',
//     lwfRegistrationDate: null,
//     lwfRemmitanceMode: '',
//     lwfRemmitanceFrequency: '',
//     lwfFrequency: '',
//     lwfPaymentDueDate: '',
//     lwfApplicableState: '',
//   });

//   const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
//     { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
//     { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
//     { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
//   ]);

//   const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);
//   const [newSignatory, setNewSignatory] = useState<Signatory>({
//     name: '',
//     designation: '',
//     mobile: '',
//     email: '',
//   });

//   const handleInputChange = (field: keyof LWFSetupData, value: string | Date | null | File | string[]) => {
//     setLWFSetupData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSignatoryChange = (
//     newValue: MultiValue<{ value: string; label: string }>,
//     actionMeta: ActionMeta<{ value: string; label: string }>
//   ) => {
//     const selectedSignatories = newValue.map(option => option.value);
//     handleInputChange('authorizedSignatory', selectedSignatories);

//     if (actionMeta.action === 'select-option' && actionMeta.option?.value === 'add_new') {
//       setShowAddSignatoryDialog(true);
//       handleInputChange('authorizedSignatory', selectedSignatories.filter(name => name !== 'add_new'));
//     }
//   };


//   const handleSubmit = () => {
//     if (LWFSetupData.lwfState && LWFSetupData.lwfLocation && LWFSetupData.authorizedSignatory) {
//       toast.push(
//         <Notification title="Success" type="success">
//           <div className="flex items-center">
//             <span>LWF Setup successfully created</span>
//           </div>
//         </Notification>
//       );
//       onClose();
//     } else {
//       toast.push(
//         <Notification title="Error" type="danger">
//           <div className="flex items-center">
//             <span>Please fill in all required fields</span>
//           </div>
//         </Notification>
//       );
//     }
//   };

//   const handleAddSignatory = () => {
//     setExistingSignatories(prev => [...prev, newSignatory]);
//     setShowAddSignatoryDialog(false);
//     setNewSignatory({
//       name: '',
//       designation: '',
//       mobile: '',
//       email: '',
//     });
//   };

//   const handleNewSignatoryInputChange = (field: keyof Signatory, value: string) => {
//     setNewSignatory(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <div className='flex gap-4 items-center'>
//         <div className='w-full'>
//         <OutlinedInput
//           label="Company Group"
//           value={LWFSetupData.Company_Group_Name}
//           onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
//           />
//           </div>
//           <div className='w-full'>
//         <OutlinedInput
//           label="Company"
//           value={LWFSetupData.Company_Name}
//           onChange={(value: string) => handleInputChange('Company_Name', value)}
//           />
//           </div>
//       </div>

//       <div className='flex gap-8 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the LWF State</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="State"
//             value={LWFSetupData.lwfState}
//             onChange={(value: string) => handleInputChange('lwfState', value)}
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the LWF Location</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="Location"
//             value={LWFSetupData.lwfLocation}
//             onChange={(value: string) => handleInputChange('lwfLocation', value)}
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>LWF Registration Number</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="Registration Number"
//             value={LWFSetupData.lwfRegistrationNumber || ''}
//             onChange={(value: string ) => handleInputChange('lwfRegistrationNumber', value || '')}
//             />
//             </div>
//         </div>
//       </div>

//       <div className='flex gap-8 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter User ID</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="User ID (Optional)"
//             value={LWFSetupData.lwfUserId || ''}
//             onChange={(value: string) => handleInputChange('lwfUserId', value)}
//             />
//             </div>
//         </div>
//          <div className='flex flex-col gap-2'>
//           <label>Enter User Password</label>
//           <div className='w-[219px]'>
//           <OutlinedInput
//             label="Password (Optional)"
//             value={LWFSetupData.lwfPassword || ''}
//             onChange={(value: string) => handleInputChange('lwfPassword', value)}
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the Remmitance Mode</label>
//           <div className='w-[219px]'>
//           <OutlinedSelect
//               label="Mode"
//               options={[
//                 { value: 'online', label: 'Online' },
//                 { value: 'offline', label: 'Offline' },
//               ]}
//               onChange={(value: string) => handleInputChange('lwfRemmitanceMode', value || '')} value={undefined}            />
//             </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//       <div className='flex flex-col gap-4'>
//           <label>LWF Registration Date</label>
//           <div className='w-[219px]'>
//           <DatePicker
//             placeholder="LWF Date"
//             value={LWFSetupData.lwfRegistrationDate}
//             onChange={(date: Date | null ) => handleInputChange('lwfRegistrationDate', date)}
//             />
//             </div>
//         </div>

//         <div className='flex flex-col gap-4 w-full'>
//           <label>Choose the Signatory</label>
//           <div>
//           <Select
//             isMulti
//             options={[
//               ...existingSignatories.map(s => ({ value: s.name, label: s.name })),
//               // { value: 'add_new', label: '+ Add New Signatory' }
//             ]}
//             // value={LWFSetupData.authorizedSignatory.map(name => ({ value: name, label: name }))}
//             // onChange={handleSignatoryChange}
//             />
//             </div>
//         </div>
//       </div>

    
//       <div className='flex flex-col gap-4'>
//         <label>Upload the LWF certificate</label>
//         <Input
//           id="file-upload"
//           type="file"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0] || null;
//             handleInputChange('lwfRegistrationCertificate', file);
//           }}
//         />
//       </div>

//       <div className="flex justify-end space-x-2">
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="solid" onClick={handleSubmit}>Confirm</Button>
//       </div>

//       <Dialog
//         isOpen={showAddSignatoryDialog}
//         onClose={() => setShowAddSignatoryDialog(false)}
//       >
//         <h5 className="mb-4">Add New Signatory</h5>
//         <div className="space-y-4">
//           <OutlinedInput
//             label="Name"
//             value={newSignatory.name}
//             onChange={(value) => handleNewSignatoryInputChange('name', value)}
//           />
//           <OutlinedInput
//             label="Designation"
//             value={newSignatory.designation}
//             onChange={(value) => handleNewSignatoryInputChange('designation', value)}
//           />
//           <OutlinedInput
//             label="Mobile"
//             value={newSignatory.mobile}
//             onChange={(value) => handleNewSignatoryInputChange('mobile', value)}
//           />
//           <OutlinedInput
//             label="Email"
//             value={newSignatory.email}
//             onChange={(value) => handleNewSignatoryInputChange('email', value)}
//           />
//         </div>
//         <div className="flex justify-end space-x-2 mt-4">
//           <Button onClick={() => setShowAddSignatoryDialog(false)}>Cancel</Button>
//           <Button variant="solid" onClick={handleAddSignatory}>Add Signatory</Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default LWFSetupPanel;

import React, { useState, useEffect } from 'react';
import { ActionMeta, MultiValue } from 'react-select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
// import { Button } from '@/components/ui/button';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
// import { DatePicker } from '@/components/ui/date-picker';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { Dialog } from '@/components/ui/dialog';
import { Select } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { Notification } from '@/components/ui/notification';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
// import DistrictAutosuggest from '../../Branch/components/DistrictAutoSuggest';
import DistrictAutosuggest from '../../ESICSetup/components/DistrictAutoSuggest';
import LocationAutosuggest from '../../Branch/components/LocationAutosuggest';

interface LWFSetupPanelProps {
  onClose: () => void;
  addLWFSetup: (data: any) => void;
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
  addLWFSetup
}) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64String = await convertToBase64(file);
        setFormData(prev => ({
          ...prev,
          certificate: base64String
        }));
      } catch (error) {
        console.error('Error converting file to base64:', error);
        showNotification('danger', 'Failed to process file');
      }
    }
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
        const formattedStates = response.data.map((state: any) => ({
          label: state.name,
          value: String(state.id)
        }));
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

  const handleStateChange = (option: SelectOption | null) => {
    setSelectedStates(option);
    setSelectedDistrict({ id: null, name: '' });
    setSelectedLocation('');
    setDistricts([]);
    setLocations([]);
    
    if (option) {
      setFormData(prev => ({
        ...prev,
        state_id: parseInt(option.value)
      }));
    }
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

    const newSelectedSignatories = selectedUserIds.map((id) => {
      const user = users.find((u) => u.id === id);
      return user ? user : { id, name: '' };
    });
    setSelectedSignatories(newSelectedSignatories);
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      setIsLoading(true);
      const response = await httpClient.post(endpoints.lwfSetup.create(), formData);
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

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">Company Group</p>
          <OutlinedSelect
            label="Select Company Group"
            options={companyGroups}
            value={selectedCompanyGroup}
            onChange={setSelectedCompanyGroup}
          />
        </div>
        <div>
          <p className="mb-2">Company</p>
          <OutlinedSelect
            label="Select Company"
            options={companies}
            value={selectedCompany}
            onChange={setSelectedCompany}
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
        </div>
        <div>
        <DistrictAutosuggest 
        value={selectedDistrict}
        onChange={(district) => {
          setSelectedDistrict(district);
          setFormData(prev => ({
            ...prev,
            district_id: district.id || 0
          }));
        }}
        stateId={selectedStates?.value ? parseInt(selectedStates.value) : undefined}
        onDistrictSelect={(id) => setSelectedDistrictId(id)}  // Add this prop
      />
        </div>
        <div>
          <LocationAutosuggest
            value={selectedLocation}
            onChange={(value: string) => {
              setSelectedLocation(value);
              setFormData(prev => ({
                ...prev,
                location: value
              }));
            }}
            districtId={selectedDistrictId}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="mb-2">LWF   Registration Number</p>
          <OutlinedInput
            label="Registration Number"
            value={formData.register_number}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                register_number: value
              }));
            }}
          />
        </div>
        <div>
          <p className="mb-2">LWF Registration Date</p>
          <DatePicker
          size='sm'
        placeholder="Registration Date"
        value={formData.register_date}
        onChange={(date: Date | null) => {
          setFormData(prev => ({
            ...prev,
            register_date: date
          }));
        }}
      />
        </div>
        <div>
          <p className="mb-2">Remittance Mode</p>
          <OutlinedSelect
            label="Select Mode"
            options={remittanceModeOptions}
            value={remittanceModeOptions.find(option => option.value === formData.remmit_mode)}
            onChange={(option: SelectOption | null) => {
              setFormData(prev => ({
                ...prev,
                remmit_mode: option?.value || ''
              }));
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">User ID</p>
          <OutlinedInput
            label="User ID"
            value={formData.username}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                username: value
              }));
            }}
          />
        </div>
        <div>
          <p className="mb-2">Password</p>
          <OutlinedInput
            label="Password"
            value={formData.password}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                password: value
              }));
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2">Signatory</p>
        <Select
          isMulti
          options={users.map(user => ({
            value: String(user.id),                           
            label: `${user.name}`,
          }))}
          onChange={handleSignatoryChange}
        />
      </div>

      <div className="mb-4">
        <p className="mb-2">Upload Certificate</p>
        <Input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.jpg,.jpeg,.png"
        />
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