import React, { useState, useEffect } from 'react';
import { Button, Input, Notification, Select, toast } from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { ActionMeta, MultiValue } from 'react-select';
import { UsersRound } from 'lucide-react';

interface ESISetupPanelProps {
  onClose: () => void;
  addESISetup: (data: any) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SignatoryOption {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
}

interface UserSignatory {
  id: number
  name: string
  esignStatus?: string
}


interface StateOption {
  id: number;
  name: string;
}

interface DistrictOption {
  id: number;
  name: string;
  state_id: number;
}

interface LocationOption {
  id: number;
  name: string;
  district_id: number;
}

const ESISetupPanel = ({ onClose, addESISetup, refreshData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companies, setCompanies] = useState<SelectOption[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
  const [signatories, setSignatories] = useState<SignatoryOption[]>([]);
  const [selectedSignatories, setSelectedSignatories] = useState<
  UserSignatory[]
>([])

  const [fileBase64, setFileBase64] = useState<string>('');

  const [states, setStates] = useState<StateOption[]>([]);
  const [selectedStates, setSelectedStates] = useState<SelectOption | null>(null,)
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [selectedDistrict, setSelectedDistrict] =
  useState<SelectOption | null>(null)
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null)
  const [users, setUsers] = useState<any[]>([])

  const [formData, setFormData] = useState<{
    group_id: number;
    company_id: number;
    code_Type: string;
    code: string;
    district_id: number;
    location: string;
    esi_user: string;
    password: string;
    signatory_data: { signatory_id: number }[]; // Update this line
    certificate: string;
  }>({
    group_id: 0,
    company_id: 0,
    code_Type: '',
    code: '',
    district_id: 0,
    location: '',
    esi_user: '',
    password: '',
    signatory_data: [], // Initialize as an empty array
    certificate: ''
  });
  

  const codeTypeOptions = [
    { value: 'main', label: 'Main' },
    { value: 'subcode', label: 'SubCode' }
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


const handleRegistrationCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
      try {
          const base64String = await convertToBase64(file);
          setFormData(prev => ({
              ...prev,
              register_certificate: base64String
          }));
      } catch (error) {
          console.error('Error converting registration certificate to base64:', error);
          toast.push(
              <Notification title="Error" type="danger">
                  Failed to process registration certificate
              </Notification>
          );
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

  useEffect(() => {
    loadCompanyGroups();
  }, []);

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
        toast.push(
            <Notification title="Error" type="danger">
                Failed to load states
            </Notification>
        );
    } finally {
        setIsLoading(false);
    }
};


const loadDistricts = async (stateId: string) => {
  if (!stateId) return;
  
  try {
      const response = await httpClient.get(endpoints.common.district(), {
          params: { state_id: stateId }
      });

      if (response.data) {
          const formattedDistricts = response.data.map((district: any) => ({
              label: district.name,
              value: String(district.id)
          }));
          setDistricts(formattedDistricts);
      }
  } catch (error) {
      console.error('Failed to load districts:', error);
      toast.push(
          <Notification title="Error" type="danger">
              Failed to load districts
          </Notification>
      );
      setDistricts([]);
  }
};


const loadLocations = async (districtId: string) => {
  if (!districtId) return;
  
  try {
      const response = await httpClient.get(endpoints.common.location(), {
          params: { district_id: districtId }
      });

      if (response.data) {
          const formattedLocations = response.data.map((location: any) => ({
              label: location.name,
              value: String(location.id)
          }));
          setLocations(formattedLocations);
      }
  } catch (error) {
      console.error('Failed to load locations:', error);
      toast.push(
          <Notification title="Error" type="danger">
              Failed to load locations
          </Notification>
      );
      setLocations([]);
  }
};



const handleStateChange = (option: SelectOption | null) => {
  setSelectedStates(option);
  setSelectedDistrict(null); // Reset district selection
  setSelectedLocation(null); // Reset location selection
  setDistricts([]); // Clear districts
  setLocations([]); // Clear locations
  
  if (option) {
      loadDistricts(option.value);
      // setPfSetupData(prev => ({
      //     ...prev,
      //     state_id: parseInt(option.value),
      //     district_id: 0,
      //     location: ''
      // }));
  }
};

const handleDistrictChange = (option: SelectOption | null) => {
  setSelectedDistrict(option);
  setSelectedLocation(null); // Reset location selection
  setLocations([]); // Clear locations
  
  if (option) {
      loadLocations(option.value);
      setFormData(prev => ({
          ...prev,
          district_id: parseInt(option.value),
          location: ''
      }));
  }
};

const handleLocationChange = (option: SelectOption | null) => {
  setSelectedLocation(option);
  if (option) {
      setFormData(prev => ({
          ...prev,
          location: option.label
      }));
  }
};


useEffect(() => {
  loadStates()
}, [])



  // Load Signatories
  const loadUsers = async () => {
    try {
      const response = await httpClient.get(endpoints.user.getAll());
      console.log('Users API Response:', response.data)
      if(response.data){
        const authorizedSignatories = response.data.data.filter(user => user.auth_signatory);
        setUsers(authorizedSignatories)
        console.log(authorizedSignatories);
        
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handle company group change
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

  // Handle company change
  useEffect(() => {
    if (selectedCompany?.value) {
      setFormData(prev => ({
        ...prev,
        company_id: parseInt(selectedCompany.value)
      }));
    }
  }, [selectedCompany]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFileBase64(base64String);
        setFormData(prev => ({
          ...prev,
          certificate: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // const signatoriesWithIds = selectedSignatories.map((s) => ({
      //   signatory_id: parseInt(s.value.split(" ")[0]),
      // }));
  
      const data = {
        ...formData,
        signatory_data: formData.signatory_data,
      };
  

      const response = await httpClient.post(endpoints.esiSetup.create(), data);
      if(response){
      addESISetup(response.data);
      onClose();
      showNotification('success', 'ESI Setup created successfully');
      await refreshData();
      }
    } catch (error: any) {
      console.error('Failed to create ESI Setup:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to create ESI Setup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignatoryChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>,
) => {
  const selectedUserIds = newValue
  .map(option => parseInt(option.value))
  .filter(id => !isNaN(id)); 


    // Update signatory_data array
    const newSignatoryData = selectedUserIds.map((id) => ({
        signatory_id: id,
    }))

    setFormData((prev) => ({
      ...prev,
      signatory_data: newSignatoryData,
  }))

  
    const newSelectedSignatories = selectedUserIds.map((id) => {
      const user = users.find((u) => u.id === id);
      return user ? user : { id, name: '' };
    });
    setSelectedSignatories(newSelectedSignatories);
}

  

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


      <div className='grid grid-cols-2 gap-4 mb-4'>
      <div>
           <p className="mb-2">Code Type</p>
           <OutlinedSelect
             label="Select Code Type"
             options={codeTypeOptions}
             value={codeTypeOptions.find(option => option.value === formData.code_Type)}
             onChange={(option: SelectOption | null) => {
               setFormData(prev => ({
                 ...prev,
                 code_Type: option?.value || ''
               }));
             }}
           />
         </div>
         <div>
           <p className="mb-2">ESI Code</p>
           <OutlinedInput
             label="ESI Code"
             value={formData.code}
             onChange={(value: string) => {
               setFormData(prev => ({
                 ...prev,
                 code: value
               }));
             }}
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
          <p className="mb-2">District</p>
          <OutlinedSelect
            label="Select District"
            options={districts}
            value={selectedDistrict}
            onChange={handleDistrictChange}
          />
        </div>
        <div>
          <p className="mb-2">Location</p>
          <OutlinedSelect
            label="Select Location"
            options={locations}
            value={selectedLocation}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">ESI User</p>
          <OutlinedInput
            label="ESI User"
            value={formData.esi_user}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                esi_user: value
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
        <p className="mb-2">Authorized Signatory</p>

<Select
                            isMulti
                            options={users.map(user => ({
                              value: String(user.id),                           
                              label: `${user.first_name} ${user.last_name}`,
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
          Create ESI Setup
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

export default ESISetupPanel;
