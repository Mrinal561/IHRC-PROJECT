import React, { useEffect, useState } from 'react'
import {
    Button,
    Input,
    toast,
    Notification,
    DatePicker,
    Select,
} from '@/components/ui'
import OutlinedInput from '@/components/ui/OutlinedInput'
import { MultiValue, ActionMeta } from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import OutlinedSelect from '@/components/ui/Outlined'
import DistrictAutosuggest from '../../Branch/components/DistrictAutoSuggest'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
interface PFSetupData {
    group_id: number
    company_id: number
    state_id: number
    district: string // Changed from district_id: number
    location: string // Added to store location ID
    pf_code: string
    register_date: string
    register_certificate: string
    signatory_data: SignatoryData[]
}

interface PFSetupPageProps {
    onClose: () => void
    companyGroupName: string
    companyName: string
}

interface SignatoryData {
    signatory_id: number
    dsc_validity: string
    e_sign: string
    e_sign_status: string
    dsc_document: string
}

interface Signatory {
    name: string
    designation: string
    mobile: string
    email: string
    dscFile?: File | null
    eSignFile?: File | null
    esignStatus?: string
}
interface SelectOption {
    value: string
    label: string
}
interface UserSignatory {
    id: number
    name: string
    esignStatus?: string
}

interface Location {
    id: number
    name: string
    district_id: number
}

const PFSetupPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const companyData = location.state?.companyData
    const [fileBase64, setFileBase64] = useState<string>('');

    const [selectedSignatories, setSelectedSignatories] = useState<
        UserSignatory[]
    >([])

    const [states, setStates] = useState<SelectOption[]>([])
    const [selectedStates, setSelectedStates] = useState<SelectOption | null>(
        null,
    )
    const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([])
    const [selectedCompanyGroup, setSelectedCompanyGroup] =
        useState<SelectOption | null>(null)
    const [companies, setCompanies] = useState<SelectOption[]>([])
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
        null,
    )
    const [districts, setDistricts] = useState<SelectOption[]>([])
    const [selectedDistrict, setSelectedDistrict] =
        useState<SelectOption | null>(null)
        const [locations, setLocations] = useState<SelectOption[]>([])
    const [users, setUsers] = useState<any[]>([])

    const [selectedStateId, setSelectedStateId] = useState('')
    const [selectedDistrictId, setSelectedDistrictId] = useState('')
    const [selectedLocationId, setSelectedLocationId] = useState('')

    const [pfSetupData, setPfSetupData] = useState<PFSetupData>({
        group_id: 0,
        company_id: 0,
        state_id: 0,
        district: '', // Changed from district_id
        location: '', // Added location
        pf_code: '',
        register_date: '',
        register_certificate: '',
        signatory_data: [],
    })

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

    // Handle registration certificate upload
    const handleRegistrationCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64String = await convertToBase64(file);
                setPfSetupData(prev => ({
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

    // Handle signatory document uploads (DSC and E-Sign)
    const handleSignatoryFileUpload = async (
        signatoryId: number,
        fileType: 'dsc_document' | 'e_sign',
        file: File | null
    ) => {
        if (!file) return;

        try {
            const base64String = await convertToBase64(file);
            
            setPfSetupData(prev => ({
                ...prev,
                signatory_data: prev.signatory_data.map(sig => {
                    if (sig.signatory_id === signatoryId) {
                        return {
                            ...sig,
                            [fileType]: base64String
                        };
                    }
                    return sig;
                })
            }));
        } catch (error) {
            console.error(`Error converting ${fileType} to base64:`, error);
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to process {fileType === 'dsc_document' ? 'DSC' : 'E-Sign'} document
                </Notification>
            );
        }
    };

    // Handle submit with base64 files
    // const handleSubmit = async () => {
    //     // Validate required fields
    //     if (!pfSetupData.pf_code || !pfSetupData.location || pfSetupData.signatory_data.length === 0) {
    //         toast.push(
    //             <Notification title="Error" type="danger">
    //                 Please fill in all required fields
    //             </Notification>
    //         );
    //         return;
    //     }

    //     const formData = {
    //         ...pfSetupData,
    //         register_date: pfSetupData.register_date?.toISOString() || '',
    //     };

    //     try {
    //         // Here you would send the formData to your API
    //         console.log('Submitting PF Setup with base64 files:', formData);
            
    //         // Example API call (uncomment and modify as needed)
    //         // const response = await httpClient.post(endpoints.pfSetup.create(), formData);
            
    //         toast.push(
    //             <Notification title="Success" type="success">
    //                 <div className="flex items-center">
    //                     <span>PF Setup successfully created</span>
    //                 </div>
    //             </Notification>
    //         );
    //         // navigate(-1);
    //     } catch (error) {
    //         console.error('Error submitting PF setup:', error);
    //         toast.push(
    //             <Notification title="Error" type="danger">
    //                 Failed to create PF Setup
    //             </Notification>
    //         );
    //     }
    // };

    const handleSubmit = async () => {
        // Validate required fields
        if (!pfSetupData.pf_code || !pfSetupData.location || pfSetupData.signatory_data.length === 0) {
            toast.push(
                <Notification title="Error" type="danger">
                    Please fill in all required fields
                </Notification>
            );
            return;
        }

        // Create submission data without Company_Name and Company_Group_Name
        const submissionData = {
            group_id: pfSetupData.group_id,
            company_id: pfSetupData.company_id,
            state_id: pfSetupData.state_id,
            district: pfSetupData.district,
            location: pfSetupData.location,
            pf_code: pfSetupData.pf_code,
            register_date: pfSetupData.register_date,
            register_certificate: pfSetupData.register_certificate,
            signatory_data: pfSetupData.signatory_data
        };

        try {
            console.log('Submitting PF Setup:', submissionData);
            const response = await httpClient.post(endpoints.pfSetup.create(), submissionData);
            console.log(response)
            
            toast.push(
                <Notification title="Success" type="success">
                    <div className="flex items-center">
                        <span>PF Setup successfully created</span>
                    </div>
                </Notification>
            );
            // navigate(-1);
        } catch (error) {
            console.error('Error submitting PF setup:', error);
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to create PF Setup
                </Notification>
            );
        }
    };


    // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         const base64String = (reader.result as string).split(',')[1];
    //         setFileBase64(base64String);
    //         setPfSetupData(prev => ({
    //           ...prev,
    //           register_cerificate: base64String,
    //           e_sign:,
    //           dsc_document:

    //         }));
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };


    const loadCompanyGroups = async () => {
        try {
            const { data } = await httpClient.get(
                endpoints.companyGroup.getAll(),
                {
                    params: { ignorePlatform: true },
                },
            )
            const formattedGroups = data.data.map((v: any) => ({
                label: v.name,
                value: String(v.id),
            }))
            setCompanyGroups(formattedGroups)
        } catch (error) {
            console.error('Failed to load company groups:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to load company groups
                </Notification>,
            )
        }
    }

    // Load Companies based on selected group
    const loadCompanies = async (groupId: string) => {
        try {
            const { data } = await httpClient.get(endpoints.company.getAll(), {
                params: {
                    'group_id[]': [groupId],
                },
            })

            if (data?.data) {
                const formattedCompanies = data.data.map((company: any) => ({
                    label: company.name,
                    value: String(company.id),
                }))

                setCompanies(formattedCompanies)
                if (formattedCompanies.length === 0) {
                    toast.push(
                        <Notification title="Info" type="info">
                            No companies found for this group
                        </Notification>,
                    )
                }
            }
        } catch (error: any) {
            console.error('Failed to load companies:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    {error.response?.data?.message ||
                        'Failed to load companies'}
                </Notification>,
            )
            setCompanies([])
        }
    }

    // Initial load of company groups
    useEffect(() => {
        loadCompanyGroups()
    }, [])

    // Load companies when company group is selected
    useEffect(() => {
        if (selectedCompanyGroup?.value) {
            setPfSetupData((prev) => ({
                ...prev,
                group_id: parseInt(selectedCompanyGroup.value),
                Company_Group_Name: selectedCompanyGroup.label,
                Company_Name: '', // Reset company when group changes
                company_id: 0,
            }))

            setSelectedCompany(null)
            loadCompanies(selectedCompanyGroup.value)
        } else {
            setCompanies([])
        }
    }, [selectedCompanyGroup])

    // Add this function after loadStates
   

    const loadUsers = async () => {
        try {
            const response = await httpClient.get(endpoints.user.getAll())
            console.log('Users API Response:', response.data)

            if (response.data) {
                // Format the users data to only include name and id
                const formattedUsers = response.data.data.map((user: any) => ({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                }))

                setUsers(formattedUsers)
                console.log('Formatted Users:', formattedUsers)
            }
        } catch (error) {
            console.error('Failed to load users:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to load users
                </Notification>,
            )
        }
    }

    // Add a useEffect to call loadUsers when component mounts
    useEffect(() => {
        loadUsers()
    }, []) // Empty dependency array means this runs once when component mounts

    // ... rest of your component code ...
    // const handleDistrictChange = (option: SelectOption | null) => {
    //   setSelectedDistrict(option);
    //   // You can add additional logic here if needed when district changes
    // };

    // // Modify your handleStateChange function to load districts
    // const handleStateChange = (option: SelectOption | null) => {
    //   setSelectedStates(option);
    //   if (option) {
    //     // Load districts when state is selected
    //     loadDistricts(option.value);
    //   }
    // };
  
    // Update PF setup data when company is selected
    useEffect(() => {
        if (selectedCompany?.value) {
            setPfSetupData((prev) => ({
                ...prev,
                company_id: parseInt(selectedCompany.value),
                Company_Name: selectedCompany.label,
            }))
        }
    }, [selectedCompany])

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
        setSelectedDistrict(null);
        setSelectedLocation(null);
        setDistricts([]);
        setLocations([]);
        
        if (option) {
            loadDistricts(option.value);
            setPfSetupData(prev => ({
                ...prev,
                state_id: parseInt(option.value),
                district: '', // Reset district
                location: '' // Reset location
            }));
        }
    };

    // Add handleDistrictChange
    const handleDistrictChange = (option: SelectOption | null) => {
        setSelectedDistrict(option);
        setSelectedLocation(null);
        setLocations([]);
        
        if (option) {
            loadLocations(option.value);
            setPfSetupData(prev => ({
                ...prev,
                district: option.value, // Store district value as string
                location: '' // Reset location
            }));
        }
    };


    const handleLocationChange = (option: SelectOption | null) => {
        setSelectedLocation(option);
        if (option) {
            setPfSetupData(prev => ({
                ...prev,
                location: option.value // Store location ID instead of name
            }));
        }
    };


    useEffect(() => {
        loadStates()
    }, [])



    const handleInputChange = (
        field: keyof PFSetupData,
        value: string | Date | null | File | string[],
    ) => {
        if (field === 'register_date' && value instanceof Date) {
            // Convert Date to string in the desired format
            value = value.toISOString().split('T')[0];
        }
        setPfSetupData((prev) => ({ ...prev, [field]: value }))
    }
    //   const handleSignatoryChange = (
    //     newValue: MultiValue<{ value: string; label: string }>,
    //     actionMeta: ActionMeta<{ value: string; label: string }>
    // ) => {
    //     const selectedUserIds = newValue.map(option => option.value);
    //     handleInputChange('authorizedSignatory', selectedUserIds);

    //     const newSelectedSignatories = selectedUserIds.map(id => {
    //         return users.find(user => String(user.id) === id) || { id: parseInt(id), name: '' };
    //     });
    //     setSelectedSignatories(newSelectedSignatories);
    // };

    const handleSignatoryChange = (
        newValue: MultiValue<{ value: string; label: string }>,
        actionMeta: ActionMeta<{ value: string; label: string }>,
    ) => {
        const selectedUserIds = newValue.map((option) => parseInt(option.value))

        // Update signatory_data array
        const newSignatoryData = selectedUserIds.map((id) => ({
            signatory_id: id,
            dsc_validity: '',
            e_sign: '',
            e_sign_status: 'active',
            dsc_document: '',
        }))

        setPfSetupData((prev) => ({
            ...prev,
            signatory_data: newSignatoryData,
        }))

        const newSelectedSignatories = selectedUserIds.map((id) => {
            return users.find((user) => user.id === id) || { id, name: '' }
        })
        setSelectedSignatories(newSelectedSignatories)
    }

    const handleESignStatusChange = (signatoryName: string, status: string) => {
        setSelectedSignatories((prev) =>
            prev.map((signatory) => {
                if (signatory.name === signatoryName) {
                    return { ...signatory, esignStatus: status }
                }
                return signatory
            }),
        )
    }

    // const handleFileUpload = (
    //     signatoryId: number,
    //     fileType: 'dsc' | 'e_sign',
    //     file: File | null,
    // ) => {
    //     setPfSetupData((prev) => ({
    //         ...prev,
    //         signatory_data: prev.signatory_data.map((sig) => {
    //             if (sig.signatory_id === signatoryId) {
    //                 return {
    //                     ...sig,
    //                     [fileType === 'dsc' ? 'dsc_document' : 'e_sign']: file
    //                         ? file.name
    //                         : '',
    //                 }
    //             }
    //             return sig
    //         }),
    //     }))
    // }

    const handleDscValidityChange = (signatoryId: number, date: string) => {
        setPfSetupData((prev) => ({
            ...prev,
            signatory_data: prev.signatory_data.map((sig) => {
                if (sig.signatory_id === signatoryId) {
                    return {
                        ...sig,
                        dsc_validity: date,
                    }
                }
                return sig
            }),
        }))
    }


    // const handleSubmit = () => {
    //     const formData = {
    //         ...pfSetupData,
    //         register_date: pfSetupData.register_date || '',
    //         location: pfSetupData.location || '',
    //         pf_code: pfSetupData.pf_code || '',
    //         register_certificate: pfSetupData.register_certificate || '',
    //     }

    //     console.log('Submitting PF Setup:', formData)

    //     // Your existing submit logic...
    //     toast.push(
    //         <Notification title="Success" type="success">
    //             <div className="flex items-center">
    //                 <span>PF Setup successfully created</span>
    //             </div>
    //         </Notification>,
    //     )
    //     // navigate(-1);
    // }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex gap-3 items-center mb-6">
                <Button
                    variant="plain"
                    size="sm"
                    icon={<HiArrowLeft />}
                    onClick={() => navigate(-1)}
                    className="mb-4"
                ></Button>
                <h2 className="text-2xl font-bold mb-6">Add PF Setup</h2>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <OutlinedSelect
                        label="Select Company Group"
                        options={companyGroups}
                        value={selectedCompanyGroup}
                        onChange={setSelectedCompanyGroup}
                    />
                    <OutlinedSelect
                        label="Select Company"
                        options={companies}
                        value={selectedCompany}
                        onChange={(option: SelectOption | null) => {
                            setSelectedCompany(option)
                        }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <OutlinedInput
                        label="PF Code"
                        value={pfSetupData.pf_code}
                        onChange={(value: string) =>
                            handleInputChange('pf_code', value)
                        }
                    />
                     </div>
                     <div>
                        <OutlinedSelect
                            label="Select State"
                            options={states}
                            value={selectedStates}
                            onChange={handleStateChange}
                        />
                    </div>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                   
                    <div>
                        <OutlinedSelect
                            label="Select District"
                            options={districts}
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        />
                    </div>
                    <div>

                    <OutlinedSelect
                        label="PF Location"
                        options={locations}
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            PF Registration Date
                        </label>
                        <DatePicker
                    placeholder="Pick a Date"
                    value={pfSetupData.register_date ? new Date(pfSetupData.register_date) : null}
                    onChange={(date: Date | null) =>
                        handleInputChange('register_date', date)
                    }
                />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Choose the Signatories
                        </label>
                        <Select
                            isMulti
                            options={users.map((user) => ({
                                value: String(user.id), // Use ID as value
                                label: user.name,
                            }))}
                            onChange={handleSignatoryChange}
                        />
                    </div>
                </div>
                {selectedSignatories.length > 0 && (
                    <div className="space-y-4 border rounded-lg p-4">
                        <h6 className="font-semibold">Selected Signatories</h6>
                        {selectedSignatories.map((signatory) => (
                            <div
                                key={signatory.id}
                                className="border p-4 rounded-lg"
                            >
                                <h4 className="text-sm mb-4">
                                    {signatory.name} (ID: {signatory.id})
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            DSC Upload
                                        </label>
                                        <Input
                                        type="file"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = e.target.files?.[0] || null;
                                            handleSignatoryFileUpload(signatory.id, 'dsc_document', file);
                                        }}
                                    />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            E-Sign Upload
                                        </label>
                                        <Input
                                        type="file"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = e.target.files?.[0] || null;
                                            handleSignatoryFileUpload(signatory.id, 'e_sign', file);
                                        }}
                                    />
                                    </div>
                                    <div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                                {' '}
                                                DSC Valid Upto{' '}
                                            </label>
                                            <DatePicker
                                    placeholder="Pick a Date"
                                    onChange={(date: Date | null) => {
                                        handleDscValidityChange(
                                            signatory.id, 
                                            date ? date.toISOString() : ''
                                        );
                                    }}
                                />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                                E-Sign Status
                                            </label>
                                            <div>
                                                <OutlinedSelect
                                                    label="Status"
                                                    options={[
                                                        {
                                                            value: 'active',
                                                            label: 'Active',
                                                        },
                                                        {
                                                            value: 'inactive',
                                                            label: 'Inactive',
                                                        },
                                                    ]}
                                                    value={
                                                        signatory.esignStatus ||
                                                        ''
                                                    }
                                                    onChange={(value: string) =>
                                                        handleESignStatusChange(
                                                            signatory.name,
                                                            value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        PF Registration Certificate
                    </label>
                    <Input
                    type="file"
                    onChange={handleRegistrationCertificateUpload}
                />
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="solid"
                        onClick={handleSubmit}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PFSetupPage






// Company_Group_Name: "Mobotics"
// Company_Name: "Mobotics Tech"
// company_id: 39
// district_id: 110
// group_id: 77
// location: "Billaspur Town"
// pf_code: "1234"
// register_certificate: "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9DcmVhdG9yIChNb"
// register_date: "2024-11-14T12:25:10.312Z"
// signatory_data: [{…}]
// state_id: 5