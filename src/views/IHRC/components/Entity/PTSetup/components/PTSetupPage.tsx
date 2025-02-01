
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
import * as yup from 'yup';
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput'

const ptSetupSchema = yup.object().shape({
    state_id: yup
        .number()
        .required('State is required')
        .positive('Please select a valid state'),
    
    district: yup
        .string()
        .required('District is required'),
    
    location: yup
        .string()
        .required('Location is required'),
    
    register_number: yup
        .string()
        .required('Registration number is required')
        .matches(/^[A-Za-z0-9]+$/, 'Registration number must contain only letters and numbers'),
    
    enroll_number: yup
        .string()
        .required('Enrollment number is required')
        .matches(/^[A-Za-z0-9]+$/, 'Enrollment number must contain only letters and numbers'),
    
 register_date: yup.date().required('Registration date is required')
    .max(new Date(), 'Registration date cannot be in the future'),
    
    remmit_mode: yup
        .string()
        .required('Remittance mode is required')
        .oneOf(['online', 'offline'], 'Invalid remittance mode'),
    
    // username: yup
    //     .string()
    //     .required('Username is required')
    //     .min(4, 'Username must be at least 4 characters')
    //     .matches(/^[A-Za-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    
    // password: yup
    //     .string()
    //     .required('Password is required')
    //     .min(8, 'Password must be at least 8 characters')
    //     .matches(
    //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //        'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
    //     ),
    
    //     email: yup
    //     .string()
    //     .matches(
    //         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/,
    //         'Invalid email address. Please use a valid email with a.com,.in,.org,.net,.edu, or.gov domain.',
    //     ),
    
    mobile: yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    // ec_certificate: yup
    //     .string()
    //     .required('EC Certificate is required'),
    
    // rc_certificate: yup
    //     .string()
    //     .required('RC Certificate is required'),
    
    ptec_frequency: yup
        .string()
        .required('PTEC frequency is required'),
    
    ptrc_frequency: yup
        .string()
        .required('PTRC frequency is required')
});

interface ValidationErrors {
    [key: string]: string;
  }

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
    ptec_frequency: string
   ptrc_frequency: string
}

interface SelectOption {
    value: string
    label: string
    ptec_frequency?: string
    ptrc_frequency?: string
}


interface LocationState {
    companyName?: string;
    companyGroupName?: string;
    companyId?: string;
    groupId?: string;
  }

const PTSetupPage = () => {

  const [errors, setErrors] = useState<ValidationErrors>({});
    const navigate = useNavigate()
    const location = useLocation()
  const locationState = location.state as LocationState;
  
  const companyName = locationState?.companyName;
  const companyGroupName = locationState?.companyGroupName;
  const companyId = locationState?.companyId;
  const groupId = locationState?.groupId;
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
        rc_certificate: '',
         ptec_frequency: '',
        ptrc_frequency: ''
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


    const validateField = async (fieldName: string, value: any) => {
        try {
            // Create a validation schema for just this field
            const fieldSchema = yup.reach(ptSetupSchema, fieldName);
            await fieldSchema.validate(value);
            
            // Clear error for this field if validation passes
            setErrors(prev => ({
                ...prev,
                [fieldName]: undefined
            }));
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Set error message for this field
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: error.message
                }));
            }
        }
    };


    const handleInputChange = async (fieldName: string, value: any) => {
        setPtSetupData(prev => ({
            ...prev,
            [fieldName]: value
        }));
        
        // Validate the field immediately after value change
        await validateField(fieldName, value);
    };


    const handleStateChange = async (option: SelectOption | null) => {
        setSelectedState(option);
        setSelectedDistrict({ id: null, name: '' });
        setSelectedLocation('');
        
        if (option) {
            const selectedStateDetails = states.find(
                state => state.value === option.value
            );

            const newStateId = parseInt(option.value);
            
            setPtSetupData(prev => ({
                ...prev,
                state_id: newStateId,
                district: '',
                location: '',
                ptec_frequency: selectedStateDetails?.ptec_frequency || '',
                ptrc_frequency: selectedStateDetails?.ptrc_frequency || ''
            }));

            // Validate state_id field
            await validateField('state_id', newStateId);
        }
    };


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
const loadStates = async () => {
    try {
        const response = await httpClient.get(endpoints.common.state())
        if (response.data) {
            const formattedStates = response.data
                .filter((state: any) => state.ptrc_active && state.ptec_active)
                .map((state: any) => ({
                    label: state.name,
                    value: String(state.id),
                    // Preserve additional state details
                    ptec_frequency: state.ptec_frequency,
                    ptrc_frequency: state.ptrc_frequency
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

//     const handleStateChange = (option: SelectOption | null) => {
//     setSelectedState(option);
//     setSelectedDistrict({ id: null, name: '' }); // Reset district selection
//     setSelectedLocation(''); // Reset location selection
    
//     if (option) {
//         // Find the state details from the existing states array
//         const selectedStateDetails = states.find(
//             state => state.value === option.value
//         );

//         setPtSetupData(prev => ({
//             ...prev,
//             state_id: parseInt(option.value),
//             district: '', 
//             location: '',
//             ptec_frequency: selectedStateDetails?.ptec_frequency || '',
//             ptrc_frequency: selectedStateDetails?.ptrc_frequency || ''
//         }));
//     }
// };
    
    
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
    // const handleCertificateUpload = async (type: 'ec' | 'rc', file: File) => {
    //     try {
    //         const base64String = await convertToBase64(file)
    //         setPtSetupData(prev => ({
    //             ...prev,
    //             [`${type}_certificate`]: base64String
    //         }))
    //     } catch (error) {
    //         console.error(`Error converting ${type} certificate to base64:`, error)
    //         toast.push(
    //             <Notification title="Error" type="danger">
    //                 Failed to process certificate
    //             </Notification>
    //         )
    //     }
    // }



    const validateForm = async () => {
        try {
          await ptSetupSchema.validate(ptSetupData, { abortEarly: false });
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
    //   const validateFileType = (file: File) => {
    //     const acceptedTypes = ['application/pdf'];
    //     if (!acceptedTypes.includes(file.type)) {
    //         return 'Only PDF files are allowed';
    //     }
    //     return null;
    // };
    
    const validateFileSize = (file: File) => {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            return 'File size should not exceed 5MB';
        }
        return null;
    };
    
    // Update the certificate upload handlers
    const handleCertificateUpload = async (type: 'ec' | 'rc', file: File) => {
        try {
            // Validate file type
            // const typeError = validateFileType(file);
            // if (typeError) {
            //     setErrors(prev => ({
            //         ...prev,
            //         [`${type}_certificate`]: typeError
            //     }));
            //     return;
            // }
    
            // Validate file size
            const sizeError = validateFileSize(file);
            if (sizeError) {
                setErrors(prev => ({
                    ...prev,
                    [`${type}_certificate`]: sizeError
                }));
                return;
            }
    
            // If validations pass, convert to base64
            const base64String = await convertToBase64(file);
            setPtSetupData(prev => ({
                ...prev,
                [`${type}_certificate`]: base64String
            }));
    
            // Clear any previous errors
            setErrors(prev => ({
                ...prev,
                [`${type}_certificate`]: undefined
            }));
    
            // Validate the field using Yup schema
            await validateField(`${type}_certificate`, base64String);
    
        } catch (error) {
            console.error(`Error processing ${type} certificate:`, error);
            setErrors(prev => ({
                ...prev,
                [`${type}_certificate`]: 'Failed to process certificate'
            }));
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to process certificate
                </Notification>
            );
        }
    };


    // Submit handler
    const handleSubmit = async () => {
        try {
          const formData = {
                ...ptSetupData,
                register_date: ptSetupData.register_date?.toISOString() || '',
                // Ensure all number fields are converted to strings
                group_id: groupId,
                company_id: companyId,
                state_id: ptSetupData.state_id,
                // district is already a string
                // register_number is already a string
                // enroll_number is already a string
                // mobile is already a string
            }
          console.log(formData);
          const isValid = await validateForm();
            if (!isValid) {
            toast.push(
                <Notification title="Error" type="danger">
                Please fix the validation errors
                </Notification>
            );
            return;
            }
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
            showErrorNotification(error);
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
            // showErrorNotification(error.message || 'Failed to create PT Setup')
            console.log(error)
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
                        {/* <OutlinedSelect
                            label="Select Company Group"
                            options={companyGroups}
                            value={selectedCompanyGroup}
                            onChange={setSelectedCompanyGroup}
                        /> */}
                         <OutlinedInput
                            label="Company Group"
                            value={companyGroupName}
                            disabled
                            />
                    </div>
                    <div>
                        <p className="mb-2">Company</p>
                        {/* <OutlinedSelect
                            label="Select Company"
                            options={companies}
                            value={selectedCompany}
                            onChange={setSelectedCompany}
                        /> */}
                         <OutlinedInput
                            label="Company"
                            value={companyName}
                            disabled
                            />
                    </div>
                </div>

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">State <span className="text-red-500">*</span></p>
                         <OutlinedSelect
                            label="Select State"
                            options={states}
                            value={selectedState}
                            onChange={handleStateChange}
                        />
                         {errors.state_id && (
            <p className="text-red-500 text-xs mt-1">{errors.state_id}</p>
          )}
                    </div>
                    <div>
                       <DistrictAutosuggest 
                        value={selectedDistrict}
                        onChange={async (district) => {
                            setSelectedDistrict(district);
                            const districtValue = district.id ? district.id.toString() : '';
                            setPtSetupData(prev => ({
                                ...prev,
                                district: districtValue
                            }));
                            await validateField('district', districtValue);
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
                     {errors.district && (
            <p className="text-red-500 text-xs mt-1">{errors.district}</p>
          )}
                    </div>
                    <div>
                        <LocationAutosuggest
                            value={selectedLocation}
                            onChange={async (location: string) => {
                                setSelectedLocation(location);
                                setPtSetupData(prev => ({
                                    ...prev,
                                    location: location
                                }));
                                await validateField('location', location);
                            }}
                            districtId={selectedDistrictId}
                        />
                         {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
                    </div>
                </div>

                {/* Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">PT RC Registration Number <span className="text-red-500">*</span></p>
                       <OutlinedInput
                        label="Enter Registration Number"
                        value={ptSetupData.register_number}
                        onChange={(value) => handleInputChange('register_number', value)}
                    />
                     {errors.register_number && (
            <p className="text-red-500 text-xs mt-1">{errors.register_number}</p>
          )}
                    </div>
                    <div>
                        <p className="mb-2">PT EC Enrollment Number <span className="text-red-500">*</span></p>
                        <OutlinedInput
                        label="Enter Enrollment Number"
                        value={ptSetupData.enroll_number}
                        onChange={(value) => handleInputChange('enroll_number', value)}
                    />
                    {errors.enroll_number && (
            <p className="text-red-500 text-xs mt-1">{errors.enroll_number}</p>
          )}
                    </div>
                    <div>
                        <p className="mb-2">Registration Date <span className="text-red-500">*</span></p>
                        <DatePicker
                            size='sm'
                            placeholder="Select Date"
                            value={ptSetupData.register_date}
                            onChange={async (date) => {
                                setPtSetupData(prev => ({
                                    ...prev,
                                    register_date: date
                                }));
                                await validateField('register_date', date);
                            }}
                        />
                         {errors.register_date && (
            <p className="text-red-500 text-xs mt-1">{errors.register_date}</p>
          )}
                    </div>
                </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        <p className="mb-2">PT EC Frequency</p>
        <OutlinedInput
            label="PTEC Frequency"
            value={ptSetupData.ptec_frequency || '--'}
             onChange={function (value: string): void {
                                    throw new Error('Function not implemented.')
                                } }  
        />
    </div>
    <div>
        <p className="mb-2">PT RC Frequency</p>
        <OutlinedInput
            label="PTRC Frequency"
            value={ptSetupData.ptrc_frequency || '--'}
             onChange={function (value: string): void {
                                    throw new Error('Function not implemented.')
                                } }  
        />
    </div>
</div>
                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="mb-2">PT User</p>
                        <OutlinedInput
                            label="Enter Username"
                            value={ptSetupData.username}
                            onChange={(value) => handleInputChange('username', value)}
                        />
                        {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
                        
                    </div>
                    <div>
                        <p className="mb-2">Password</p>
                        <OutlinedPasswordInput
                            label="Enter Password"
                            // type="password"
                            value={ptSetupData.password}
                            onChange={(value) => handleInputChange('password', value)}
                        />
                         {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
                    </div>
                    <div>
                        <p className="mb-2">Email</p>
                        <OutlinedInput
                            label="Enter Email"
                            value={ptSetupData.email}
                            onChange={(value) => handleInputChange('email', value)}
                        />
                          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
                    </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="mb-2">Mobile Number  <span className="text-red-500">*</span></p>
                        <OutlinedInput
                        label="Enter Mobile Number"
                        value={ptSetupData.mobile}
                        onChange={(value) => handleInputChange('mobile', value)}
              />
                 {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
            </div>
                    <div>
                        <p className="mb-2">Remittance Mode <span className="text-red-500">*</span></p>
                        <OutlinedSelect
                label="Select Mode"
                options={[
                  { value: 'online', label: 'Online' },
                  { value: 'offline', label: 'Offline' }
                ]}
                onChange={async (option) => {
                    if (option) {
                        setPtSetupData(prev => ({
                            ...prev,
                            remmit_mode: option.value
                        }));
                        // Validate the remittance mode immediately after selection
                        await validateField('remmit_mode', option.value);
                    }
                }}
                value={undefined}/>
                   {errors.remmit_mode && (
            <p className="text-red-500 text-xs mt-1">{errors.remmit_mode}</p>
          )}
                    </div>
            </div>

                {/* Certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        <p className="mb-2">RC Certificate(Accepted : Pdf/Zip/Image(Max Size: 20mb)) <span className="text-red-500">*</span></p>
        <div className="space-y-2">
            <Input
                type="file"
                accept=".pdf , .zip , .jpg"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCertificateUpload('rc', file);
                }}
            />
            
            {errors.rc_certificate && (
                <p className="text-red-500 text-xs">{errors.rc_certificate}</p>
            )}
        </div>
    </div>

    <div>
        <p className="mb-2">EC Certificate(Accepted : Pdf/Zip/Image(Max Size: 20mb)) <span className="text-red-500">*</span></p>
        <div className="space-y-2">
            <Input
                type="file"
                 accept=".pdf , .zip , .jpg"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCertificateUpload('ec', file);
                }}
            />
           
            {errors.ec_certificate && (
                <p className="text-red-500 text-xs">{errors.ec_certificate}</p>
            )}
        </div>
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