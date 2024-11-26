// import React, { useState } from 'react';
// import { Button, Input, Dialog, toast, Notification } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { Select, DatePicker } from '@/components/ui';
// import { MultiValue, ActionMeta } from 'react-select';
// import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
// import { HiArrowLeft } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';
// import { PTSetupData } from '@/@types/PtSetup';


// interface PTSetupPageProps {
//   // addPFSetup: (newPFSetup: PTSetupData) => void;
//   onClose: () => void;
//   companyGroupName: string;
//   companyName: string;
// }

// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }

// interface SelectOption {
//     value: string
//     label: string
// }

// interface Location {
//     id: number
//     name: string
//     district_id: number
// }

// const PTSetupPage = () => {



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

//   const navigate = useNavigate()
//   const [fileBase64, setFileBase64] = useState<string>('');
//   const [states, setStates] = useState<SelectOption[]>([])
//   const [selectedStates, setSelectedStates] = useState<SelectOption | null>(
//       null,
//   )
//   const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([])
//   const [selectedCompanyGroup, setSelectedCompanyGroup] =
//       useState<SelectOption | null>(null)
//   const [companies, setCompanies] = useState<SelectOption[]>([])
//   const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
//       null,
//   )
//   const [districts, setDistricts] = useState<SelectOption[]>([])
//   const [selectedDistrict, setSelectedDistrict] =
//       useState<SelectOption | null>(null)
//       const [locations, setLocations] = useState<SelectOption[]>([])



//   const handleInputChange = (field: keyof PTSetupData, value: string | Date | null | File | string[]) => {
//     // setPTSetupData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSignatoryChange = (
//     newValue: MultiValue<{ value: string; label: string }>,
//     actionMeta: ActionMeta<{ value: string; label: string }>
//   ) => {
//     const selectedSignatories = newValue.map(option => option.value);
//     // handleInputChange('authorizedSignatories', selectedSignatories);

//     if (actionMeta.action === 'select-option' && actionMeta.option?.value === 'add_new') {
//       setShowAddSignatoryDialog(true);
//     //   handleInputChange('authorizedSignatories', selectedSignatories.filter(name => name !== 'add_new'));
//     }
//   };

//   const handleSubmit = () => {
//     // if (PTSetupData.ptState && PTSetupData.ptLocation && PTSetupData.authorizedSignatories.length > 0) {
//       // addPFSetup(PTSetupData);
//       navigate(-1);
//       toast.push(
//         <Notification title="Success" type="success">
//           <div className="flex items-center">
//             <span>PT Setup successfully created</span>
//           </div>
//         </Notification>
//       );
//     //   onClose();
//     // } else {
//     //   toast.push(
//     //     <Notification title="Error" type="danger">
//     //       <div className="flex items-center">
//     //         <span>Please fill in all required fields</span>
//     //       </div>
//     //     </Notification>
//     //   );
//     // }
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

// return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-8">
//         <Button
//           variant="plain"
//           size="sm"
//           className="p-2"
//           onClick={() => navigate(-1)}
//         >
//           <HiArrowLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-2xl font-semibold text-gray-800">*Add PT Setup</h1>
//       </div>

//       <div className="space-y-6">
//         {/* Row 1: Company Group and Company Name */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             {/* <label className="text-sm font-medium text-gray-600">Enter Company Group</label> */}
//             <OutlinedInput
//                         label="Company Group" value={''} onChange={function (value: string): void {
//                             throw new Error('Function not implemented.');
//                         } }                // value={PTSetupData.Company_Group_Name}
//                 // onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
//                 />
//           </div>
//           <div className="space-y-2">
//             {/* <label className="text-sm font-medium text-gray-600">Enter Company Name</label> */}
//              <OutlinedInput
//                         label="Company" value={''} onChange={function (value: string): void {
//                             throw new Error('Function not implemented.');
//                         } }                // value={PTSetupData.Company_Name}
//                 // onChange={(value: string) => handleInputChange('Company_Name', value)}
//               />
//           </div>
//         </div>

//         {/* Row 2: State, District, Location */}
//         <div className="grid grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter State</label>
//             <OutlinedInput
//               label="State"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter District</label>
//             <OutlinedInput
//               label="District"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter Location</label>
//             <OutlinedInput
//               label="Location"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//         </div>

//         {/* Row 3: Registration Number, Enrollment Number, Registration Date */}
//         <div className="grid grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">PT Registration Number</label>
//             <OutlinedInput
//               label="Registration Number"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">PT Enrollment Number</label>
//             <OutlinedInput
//               label="Enrollment Number"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">PT Registration Date</label>
//             <DatePicker
//               placeholder="Select Date"
//               className="w-full"
//               size="sm"
//             />
//           </div>
//         </div>

//         {/* Row 4: User ID, Email, Password */}
//         <div className="grid grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter User ID</label>
//             <OutlinedInput
//               label="User ID (Optional)"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter Email</label>
//             <OutlinedInput
//               label="Email"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter Password</label>
//             <OutlinedInput
//               label="Password (Optional)"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//         </div>

//         {/* Row 5: Mobile Number and Remittance Mode */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Enter Mobile Number</label>
//             <OutlinedInput
//               label="Mobile"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Select Remittance Mode</label>
//             <OutlinedSelect
//                         label="Mode"
//                         options={[
//                             { value: 'online', label: 'Online' },
//                             { value: 'offline', label: 'Offline' },
//                         ]} value={undefined} onChange={undefined}            />
//           </div>
//         </div>

//         {/* Row 6: PT RC and EC Frequency */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">PT RC Frequency</label>
//             <OutlinedInput
//               label="PT RC Frequency"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">PT EC Frequency</label>
//             <OutlinedInput
//               label="PT EC Frequency"
//               value=""
//               onChange={(value) => {}}
//             />
//           </div>
//         </div>

//         {/* Row 7: Document Uploads */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Upload PT EC Certificate</label>
//             <Input
//               type="file"
//               className="w-full"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-600">Upload PT RC Certificate</label>
//             <Input
//               type="file"
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Footer Actions */}
//       <div className="flex justify-end gap-4 pt-4">
//       <Button onClick={() => navigate(-1)}>Cancel</Button>

//         <Button
//           variant="solid"
//           className="px-6 bg-blue-600 text-white hover:bg-blue-700"
//           onClick={handleSubmit}
//         >
//           Confirm
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PTSetupPage;


import React, { useEffect, useState } from 'react'
import { Button, Input, toast, Notification, DatePicker } from '@/components/ui'
import OutlinedInput from '@/components/ui/OutlinedInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import OutlinedSelect from '@/components/ui/Outlined'
import DistrictAutosuggest from '../../ESICSetup/components/DistrictAutoSuggest'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
import LocationAutosuggest from '../../Branch/components/LocationAutosuggest'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { showErrorNotification } from '@/components/ui/ErrorMessage'
import { createptsetup } from '@/store/slices/ptSetup/ptSetupSlice'

interface PTSetupData {
   group_id: number
    company_id: number
    state_id: number
    district: string  // Changed to string
    location: string
    register_number: string  // Changed to string
    enroll_number: string   // Changed to string
    register_date: Date | null
    remmit_mode: string
    username: string
    password: string
    email: string
    mobile: string    // Changed from mobile_no to mobile and type to string
    ec_certificate: string
    rc_certificate: string
}

interface SelectOption {
    value: string
    label: string
}

const PTSetupPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(true)

    // State management for form data
    const [ptSetupData, setPtSetupData] = useState<PTSetupData>({
        group_id: 0,
        company_id: 0,
        state_id: 0,
        district: '',
        location: '',
        register_number: '',
        enroll_number: '',
        register_date: null,
        remmit_mode: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
        ec_certificate: '',
        rc_certificate: ''
    })

    // State for select options
    const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([])
    const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null)
    const [companies, setCompanies] = useState<SelectOption[]>([])
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null)
    const [states, setStates] = useState<SelectOption[]>([])
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null)
    const [selectedDistrict, setSelectedDistrict] = useState<{ id: number | null; name: string }>({
        id: null,
        name: ''
    });
    const [selectedLocation, setSelectedLocation] = useState('')
    const [selectedDistrictId, setSelectedDistrictId] = useState<number>()

    // File conversion helper
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1]
                resolve(base64String)
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    // Load company groups
    const loadCompanyGroups = async () => {
        try {
            const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
                params: { ignorePlatform: true }
            })
            const formattedGroups = data.data.map((v: any) => ({
                label: v.name,
                value: String(v.id)
            }))
            setCompanyGroups(formattedGroups)
        } catch (error) {
            console.error('Failed to load company groups:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to load company groups
                </Notification>
            )
        }
    }

    // Load companies based on selected group
    const loadCompanies = async (groupId: string) => {
        try {
            const { data } = await httpClient.get(endpoints.company.getAll(), {
                params: {
                    'group_id[]': [groupId]
                }
            })
            if (data?.data) {
                const formattedCompanies = data.data.map((company: any) => ({
                    label: company.name,
                    value: String(company.id)
                }))
                setCompanies(formattedCompanies)
            }
        } catch (error) {
            console.error('Failed to load companies:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to load companies
                </Notification>
            )
        }
    }

    // Load states
    const loadStates = async () => {
        try {
            const response = await httpClient.get(endpoints.common.state())
            if (response.data) {
                const formattedStates = response.data.map((state: any) => ({
                    label: state.name,
                    value: String(state.id)
                }))
                setStates(formattedStates)
            }
        } catch (error) {
            console.error('Failed to load states:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to load states
                </Notification>
            )
        }
  }
  const handleStateChange = (option: SelectOption | null) => {
        setSelectedState(option);
        setSelectedDistrict({ id: null, name: '' }); // Reset district selection
        setSelectedLocation(''); // Reset location selection
        
        if (option) {
            setPtSetupData(prev => ({
                ...prev,
                state_id: parseInt(option.value),
                district: '', // Reset district in form data
                location: ''
            }));
        }
    };
  
      const handleDistrictSelect = (district: { id: number | null; name: string }) => {
        setSelectedDistrict(district);
        setPtSetupData(prev => ({
            ...prev,
            district: district.id ? district.id.toString() : '' // Convert to string
        }));
        if (district.id) {
            setSelectedDistrictId(district.id);
        }
    };



    // Handle certificate uploads
    const handleCertificateUpload = async (type: 'ec' | 'rc', file: File) => {
        try {
            const base64String = await convertToBase64(file)
            setPtSetupData(prev => ({
                ...prev,
                [`${type}_certificate`]: base64String
            }))
        } catch (error) {
            console.error(`Error converting ${type} certificate to base64:`, error)
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to process certificate
                </Notification>
            )
        }
    }

    // Submit handler
    const handleSubmit = async () => {
        try {
          const formData = {
                ...ptSetupData,
                register_date: ptSetupData.register_date?.toISOString() || '',
                // Ensure all number fields are converted to strings
                group_id: ptSetupData.group_id,
                company_id: ptSetupData.company_id,
                state_id: ptSetupData.state_id,
                // district is already a string
                // register_number is already a string
                // enroll_number is already a string
                // mobile is already a string
            }
          console.log(formData);
           const response = await dispatch(createptsetup(formData))
      .unwrap()
      .catch((error: any) => {
        // Handle different error formats
        if (error.response?.data?.message) {
            // API error response
            console.log('inside error')
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
            // Here you would dispatch your createPT action
            // const response = await dispatch(createPT(formData)).unwrap()
            
            toast.push(
                <Notification title="Success" type="success">
                    PT Setup successfully created
                </Notification>
            )
            navigate(-1)
        } catch (error: any) {
            showErrorNotification(error.message || 'Failed to create PT Setup')
        }
    }

    // Effect hooks
    useEffect(() => {
        loadCompanyGroups()
        loadStates()
    }, [])

    useEffect(() => {
        if (selectedCompanyGroup?.value) {
            setPtSetupData(prev => ({
                ...prev,
                group_id: parseInt(selectedCompanyGroup.value)
            }))
            loadCompanies(selectedCompanyGroup.value)
        }
    }, [selectedCompanyGroup])

    useEffect(() => {
        if (selectedCompany?.value) {
            setPtSetupData(prev => ({
                ...prev,
                company_id: parseInt(selectedCompany.value)
            }))
        }
    }, [selectedCompany])

    return (
        <div className="container mx-auto py-8">
            <div className="flex gap-3 items-center mb-6">
                <Button
                    variant="plain"
                    size="sm"
                    icon={<HiArrowLeft />}
                    onClick={() => navigate(-1)}
                    className="mb-4"
                />
                <h2 className="text-2xl font-bold mb-6">Add PT Setup</h2>
            </div>

            <div className="space-y-6">
                {/* Company Selection */}
                <div className="grid grid-cols-2 gap-4">
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

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">State</p>
                         <OutlinedSelect
                            label="Select State"
                            options={states}
                            value={selectedState}
                            onChange={handleStateChange}
                        />
                    </div>
                    <div>
                       <DistrictAutosuggest 
                        value={selectedDistrict}
                        onChange={(district) => {
                            setSelectedDistrict(district);
                            // Convert district id to string when setting in form data
                            setPtSetupData(prev => ({
                                ...prev,
                                district: district.id ? district.id.toString() : ''
                            }));
                            if (district.id) {
                                setSelectedDistrictId(district.id);
                            }
                        }}
                        stateId={selectedState?.value ? parseInt(selectedState.value) : undefined}
                        onDistrictSelect={(id) => {
                            setSelectedDistrictId(id);
                            // Also update the form data when district is selected
                            setPtSetupData(prev => ({
                                ...prev,
                                district: id ? id.toString() : ''
                            }));
                        }}
                    />
                    </div>
                    <div>
                        <LocationAutosuggest
                            value={selectedLocation}
                            onChange={(location: string) => {
                                setSelectedLocation(location);
                                setPtSetupData(prev => ({
                                    ...prev,
                                    location: location
                                }));
                            }}
                            districtId={selectedDistrictId}
                        />
                    </div>
                </div>

                {/* Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">PT RC Registration Number</p>
                       <OutlinedInput
                        label="Registration Number"
                        value={ptSetupData.register_number}
                        onChange={(value) => setPtSetupData(prev => ({
                            ...prev,
                            register_number: value
                        }))}
                    />
                    </div>
                    <div>
                        <p className="mb-2">PT EC Enrollment Number</p>
                        <OutlinedInput
                        label="Enrollment Number"
                        value={ptSetupData.enroll_number}
                        onChange={(value) => setPtSetupData(prev => ({
                            ...prev,
                            enroll_number: value
                        }))}
                    />
                    </div>
                    <div>
                        <p className="mb-2">Registration Date</p>
                        <DatePicker
                            size='sm'
                            placeholder="Select Date"
                            value={ptSetupData.register_date}
                            onChange={(date) => setPtSetupData(prev => ({
                                ...prev,
                                register_date: date
                            }))}
                        />
                    </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">Username</p>
                        <OutlinedInput
                            label="Username"
                            value={ptSetupData.username}
                            onChange={(value) => setPtSetupData(prev => ({
                                ...prev,
                                username: value
                            }))}
                        />
                    </div>
                    <div>
                        <p className="mb-2">Password</p>
                        <OutlinedInput
                            label="Password"
                            // type="password"
                            value={ptSetupData.password}
                            onChange={(value) => setPtSetupData(prev => ({
                                ...prev,
                                password: value
                            }))}
                        />
                    </div>
                    <div>
                        <p className="mb-2">Email</p>
                        <OutlinedInput
                            label="Email"
                            value={ptSetupData.email}
                            onChange={(value) => setPtSetupData(prev => ({
                                ...prev,
                                email: value
                            }))}
                        />
                    </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="mb-2">Mobile Number</p>
                        <OutlinedInput
                        label="Mobile Number"
                        value={ptSetupData.mobile}
                        onChange={(value) => setPtSetupData(prev => ({
                            ...prev,
                            mobile: value
                        }))}
              />
            </div>
                    <div>
                        <p className="mb-2">Remittance Mode</p>
                        <OutlinedSelect
                label="Select Mode"
                options={[
                  { value: 'online', label: 'Online' },
                  { value: 'offline', label: 'Offline' }
                ]}
                onChange={(option) => {
                  if (option) {
                    setPtSetupData(prev => ({
                      ...prev,
                      remmit_mode: option.value
                    }))
                  }
                } } value={undefined}/>
                    </div>
            </div>

                {/* Certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="mb-2">RC Certificate</p>
                        <Input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleCertificateUpload('rc', file)
                            }}
                        />
                    </div>
                     <div>
                        <p className="mb-2">EC Certificate</p>
                        <Input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleCertificateUpload('ec', file)
                            }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button variant="solid" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PTSetupPage