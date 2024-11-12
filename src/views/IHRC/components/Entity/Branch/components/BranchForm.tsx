import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Input, Notification, toast } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import { EntityData, entityDataSet, LocationData } from '../../../../store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
import LocationAutosuggest from './LocationAutosuggest';
import { AppDispatch } from '@/store';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useDispatch } from 'react-redux';
import DistrictAutosuggest from './DistrictAutoSuggest';
import { createBranch } from '@/store/slices/branch/branchSlice';
import { format } from 'date-fns';
import { MdLabel } from 'react-icons/md';
interface BranchFormData {
  group_id: number;
  company_id: number;
  state_id: number;
  district: string;
  location: string;
  name: string;
  opening_date: string;
  head_count: string;
  address: string;
  type: string;
  office_type: string;
  custom_data: {
    remark: string;
    status: string;
    email?: string;
    mobile?: string;
  };
  register_number: string;
  status: string;
  validity: string;
  document?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface District {
    id: number;
    name: string;
  }



const AddBranchForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
//   const [locationData, setLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companies, setCompanies] = useState<SelectOption[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
const [states, setStates] = useState<SelectOption[]>([]);
const [selectedStates, setSelectedStates] = useState<SelectOption | null>(null);
const [selectedDistrict, setSelectedDistrict] = useState('');
const [districtsData, setDistrictsData] = useState<District[]>([]);
const [selectedDistrictId, setSelectedDistrictId] = useState<number | undefined>();
const [selectedLocation, setSelectedLocation] = useState('');
const [fileBase64, setFileBase64] = useState<string>('');



  const [formData, setFormData] = useState<BranchFormData>({
    group_id: 0,
    company_id: selectedCompany?.value ? parseInt(selectedCompany.value) : 0,
    state_id: selectedCompany?.value ? parseInt(selectedCompany.value) : 0,
    district: selectedDistrict,
    location: selectedLocation,
    name: '',
    opening_date: '',
    head_count: '',
    address: '',
    type: '',
    office_type: '',
    custom_data: {
      remark: '',
      status: 'active',
      email: '',
      mobile: ''
    },
    register_number: '',
    status: 'active',
    validity: '',
    document: ''
  });

  const statusTypeOptions= [
    {value: "active", label: 'Active'},
    {value: "inactive", label: 'Inactive'},
  ]
  const branchTypeOptions = [
    { value: 'rented', label: 'Rented' },
    { value: 'owned', label: 'Owned' },
  ];

  const officeTypeOption = [
    { value: 'register_office', label: 'Register Office' },
    { value: 'coorporate_office', label: 'Coorporate Office' },
    { value: 'regional_office', label: 'Regional Office' },
    { value: 'branch', label: 'Branch Office' },
    // { value: 'others', label: 'Others' },
    // { value: 'branch', label: 'Branch' },
  ]


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

  const loadStates = async () => {
    try {
      setIsLoading(true);
      const response = await httpClient.get(endpoints.common.state());
      
      if (response.data) {
        const formattedStates = response.data.map((state: any) => ({
          label: state.name,
          value: String(state.id)
        }));
        
        console.log('Formatted States:', formattedStates); // Debug log
        setStates(formattedStates);
      } else {
        console.error('Invalid state data structure:', response.data);
        showNotification('danger', 'Invalid state data received');
      }
    } catch (error) {
      console.error('Failed to load states:', error);
      showNotification('danger', 'Failed to load states');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  // Handle state selection
  const handleStateChange = (option: SelectOption | null) => {
    setSelectedStates(option);
    if (option) {
      setFormData(prev => ({
        ...prev,
        state_id: parseInt(option.value),
        // State: option.label,
        // District: '' // Reset district when state changes
      }));
    }
  };
  




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
    }
    catch (error) {
        console.error('Failed to load company groups:', error);
        showNotification('danger', 'Failed to load company groups');
      }
}


useEffect(() => {
    loadCompanyGroups();
  }, []);



const loadCompanies = async (groupId: string[] | number[]) => {
    try {
        // setIsLoading(true);

        const groupIdParam = [`${groupId}`];
        // Modify the API call to include the group ID as a query parameter
        const { data } = await httpClient.get(endpoints.company.getAll(), {
            params: {
                'group_id[]': groupIdParam // Add group_id as a query parameter
            }
        });

        if (data?.data) {
            // Filter companies based on group_id
            const formattedCompanies = data.data.map((company: any) => ({
                label: company.name,
                value: String(company.id),
            }));

            if (formattedCompanies.length > 0) {
                setCompanies(formattedCompanies);
            } else {
                showNotification('info', 'No companies found for this group');
                setCompanies([]);
            }
        } else {
            setCompanies([]);
        }
    } catch (error: any) {
        console.error('Failed to load companies:', error);
        showNotification(
            'danger', 
            error.response?.data?.message || 'Failed to load companies'
        );
        setCompanies([]);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect (() => {
    if (selectedCompanyGroup?.value) {
        setFormData(prev => ({
            ...prev,
            // Company_Group_Name: selectedCompanyGroup.label,
            // Company_Name: '', // Reset company name when group changes
            group_id: parseInt(selectedCompanyGroup.value),
            // Company_Group_Name: selectedCompanyGroup.label
          }));
          
          // Reset selected company
          setSelectedCompany(null);
          
          // Load companies for the selected group
          loadCompanies(selectedCompanyGroup.value);
    }  else {
        setCompanies([]); // Reset companies when no group is selected
      }
  }, [selectedCompanyGroup])


  useEffect(() => {
    if (selectedCompany?.value) {
      setFormData(prev => ({
        ...prev,
        company_id: parseInt(selectedCompany.value),
        // Company_Name: selectedCompany.label
      }));
    }
  }, [selectedCompany]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFileBase64(base64String);
        setFormData(prev => ({
          ...prev,
          document: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      district: selectedDistrict
    }));
  }, [selectedDistrict]);

  // Update formData when location changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      location: selectedLocation
    }));
  }, [selectedLocation]);

  const handleAddBranch = async () => {
    console.log(formData);

    try {
        const response = await dispatch(createBranch(formData)).unwrap();
        // Only navigate and show success if we actually succeed
        navigate('/branch');
        openNotification('success', 'Branch added successfully');
      } catch (error: any) {
        console.error('Branch creation error:', error);
        // Handle different types of errors
        if (error.status === 400) {
          openNotification('danger', error.data?.message || 'Invalid form data. Please check your inputs.');
        } else if (error.status === 401) {
          openNotification('danger', 'Unauthorized. Please login again.');
        } else if (error.status === 500) {
          openNotification('danger', 'Server error. Please try again later.');
        } else {
          openNotification('danger', error.message || 'Failed to create branch. Please try again.');
        }
        // Don't navigate on error
      }
  };

  if (isLoading) return <div>Loading location data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
//   if (!locationData || locationData.length === 0) {
//     return <div>No location data available. Please check your data source.</div>;
//   }


  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    // Find the district ID from the districtsData
    const district = districtsData.find(d => d.name === districtName);
    setSelectedDistrictId(district?.id);
    setSelectedLocation(''); // Reset location when district changes
  };

//   useEffect(() => {
//     setFormData(prev => ({
//       ...prev,
//       district: selectedDistrict,
//       location: selectedLocation
//     }));
//   }, [selectedDistrict, selectedLocation]);
  
  
  return (
      <div className="p-2 bg-white rounded-lg">
          <div className="flex gap-2 items-center mb-3">
              <Button
                  size="sm"
                  variant="plain"
                  icon={
                      <IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />
                  }
                  onClick={() => navigate('/branch')}
              />
              <h3 className="text-2xl font-semibold mb-2">Add New Branch</h3>
          </div>
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                      <p className="mb-2">Company Name</p>
                      <OutlinedSelect
                          label="Select Company"
                          options={companies}
                          value={selectedCompany}
                          onChange={(option: SelectOption | null) => {
                            setSelectedCompany(option);
                          }}
                          />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                      onChange={setSelectedDistrict}
                      stateId={selectedStates?.value ? parseInt(selectedStates.value) : undefined}       
                      onDistrictSelect={setSelectedDistrictId}

                      />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <LocationAutosuggest
                value={selectedLocation}
                // onChange={setSelectedLocation} 
                onChange={(value: string) => {
                    setSelectedLocation(value);
                  }}
                districtId={selectedDistrictId}
                // districtId={selectedDistrict ? parseInt(selectedDistrict) : undefined}
                />
                  <div>
                      <p className="mb-2">Branch Name</p>
                      <OutlinedInput
                          label="Branch Name"
                          value={formData.name}
                          onChange={(value: string) => {
                              setFormData((prev) => ({
                                  ...prev,
                                  name: value,
                              }))
                          }}
                      />
                  </div>
              </div>

              <div>
                  <p className="mb-2">Branch Address</p>
                  <OutlinedInput
                      label="Branch Address"
                      value={formData.address}
                      onChange={(value: string) => {
                          setFormData((prev) => ({
                              ...prev,
                              address: value,
                          }))
                      }}
                      textarea={true}
                  />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                      <p className="mb-2">Branch Opening Date</p>
                      <DatePicker
                          size="sm"
                          placeholder="Pick a Date"
                          onChange={(date) => {
                              setFormData((prev) => ({
                                  ...prev,
                                  opening_date: date ? format(date, 'yyyy-MM-dd') : '',
                              }))
                          }}
                      />
                  </div>
                  <div>
                      <p className="mb-2">Branch Head Count</p>
                      <OutlinedInput
                          label="Branch Head Count"
                          value={formData.head_count}
                          onChange={(value: string) => {
                              setFormData((prev) => ({
                                  ...prev,
                                  head_count: value,
                              }))
                          }}
                      />
                  </div>

                  <div>
                      <p className="mb-2">Office Type</p>
                      <OutlinedSelect
                          label="Select Office Type"
                          options={officeTypeOption}
                          value={officeTypeOption.find(
                              (option) => option.value === formData.office_type,
                          )}
                          onChange={(selectedOption: SelectOption | null) => {
                              setFormData((prev) => ({
                                  ...prev,
                                  office_type: selectedOption?.value || '',
                              }))
                          }}
                      />
                  </div>
                  <div>
                      <p className="mb-2">Branch Type</p>
                      <OutlinedSelect
                          label="Select Branch Type"
                          options={branchTypeOptions}
                          value={branchTypeOptions.find(
                              (option) => option.value === formData.type,
                          )}
                          onChange={(selectedOption: SelectOption | null) => {
                              setFormData((prev) => ({
                                  ...prev,
                                  type: selectedOption?.value || '',
                              }))
                          }}
                      />
                  </div>
              </div>

            

              {formData.type === 'owned' && (
                  <div className="border rounded-md py-4 p-2 mt-4">
                      <div className="flex flex-col gap-8">
                          <h4>S&E Setup</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                  <p className="mb-2">
                                      S&E Registration Number
                                  </p>
                                  <OutlinedInput
                                      label="S&E Registration Number"
                                      value={formData.register_number}
                                      onChange={(value: string) => {
                                          setFormData((prev) => ({
                                              ...prev,
                                              register_number: value,
                                          }))
                                      }}
                                  />
                              </div>
                              <div>
                                  <p className="mb-2">S&E Validity</p>
                                  <DatePicker
                                      size="sm"
                                      placeholder="Pick a Date"
                                      onChange={(date) => {
                                          setFormData((prev) => ({
                                              ...prev,
                                              validity: date ? format(date, 'yyyy-MM-dd') : '',
                                          }))
                                      }}
                                  />
                              </div>
                              <div>
                                  <div className="flex flex-col gap-4">
                                      <label>
                                          Please upload the S&E Registration
                                          certificate
                                      </label>
                                      <Input
                                          id="file-upload"
                                          type="file"
                                          onChange={handleFileUpload}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {formData.type === 'rented' && (
                  <div className="border rounded-md py-4 p-2 mt-4">
                      <div className="flex flex-col gap-8">
                          <h4>Lease / Rent Setup</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                  <p className="mb-2">
                                      Lease / Rent Agreement Status
                                  </p>
                                  <OutlinedSelect
                                      label="Status"
                                      options={statusTypeOptions}
                                    //   value={formData.status}
                                    value={statusTypeOptions.find(
                                        (option) => option.value === formData.status,
                                    )}
                                    //   onChange={(value: string) => {
                                    //       setFormData((prev) => ({
                                    //           ...prev,
                                    //           status: value,
                                    //       }))
                                    //   }}
                                    onChange={(selectedOption: SelectOption | null) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            status: selectedOption?.value || '',
                                        }))
                                    }}
                                  />
                              </div>
                              <div>
                                  <p className="mb-2">
                                      Lease deed / Rent Agreement valid up to
                                  </p>
                                  <DatePicker
                                      size="sm"
                                      placeholder="Pick a Date"
                                      onChange={(date) => {
                                          setFormData((prev) => ({
                                              ...prev,
                                              validity: date ? format(date, 'yyyy-MM-dd') : '',
                                          }))
                                      }}
                                  />
                              </div>
                              <div>
                                  <div className="flex flex-col gap-4">
                                      <label>
                                          Please upload Leaase deed copy
                                      </label>
                                      <Input
                                          id="file-upload"
                                          type="file"
                                          onChange={handleFileUpload}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

<div className="border rounded-md py-4 p-2 mt-4">
                  <div className="flex flex-col gap-4">
                      <h6>Custom Fields</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="w-full">
                              <OutlinedInput
                                  label="Remark"
                                  value={formData.custom_data.remark}
                                  onChange={(value: string) => {
                                      setFormData((prev) => ({
                                          ...prev,
                                          remark: value,
                                      }))
                                  }}
                              />
                          </div>
                          <div className="w-full">
                              <OutlinedInput
                                  label="Email"
                                  value={formData.custom_data.email}
                                  onChange={(value: string) => {
                                      setFormData((prev) => ({
                                          ...prev,
                                          email: value,
                                      }))
                                  }}
                              />
                          </div>
                          <div className="w-full">
                              <OutlinedInput
                                  label="Mobile"
                                  value={formData.custom_data.mobile}
                                  onChange={(value: string) => {
                                      setFormData((prev) => ({
                                          ...prev,
                                          mobile: value,
                                      }))
                                  }}
                              />
                          </div>
                      </div>
                  </div>
              </div>

              <div className="flex justify-end gap-2">
                  <Button
                      type="button"
                      variant="solid"
                      size="sm"
                      onClick={handleAddBranch}
                  >
                      Add Branch
                  </Button>
                  <Button
                      type="button"
                      variant="plain"
                      size="sm"
                      onClick={() => navigate(-1)}
                  >
                      Cancel
                  </Button>
              </div>
          </div>
      </div>
  )
};

export default AddBranchForm;

