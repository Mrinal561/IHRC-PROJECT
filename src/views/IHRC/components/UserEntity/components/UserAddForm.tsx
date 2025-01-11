
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    Button,
    Checkbox,
    toast,
    Notification,
    DatePicker,
} from '@/components/ui'
import { IoArrowBack } from 'react-icons/io5'
import OutlinedSelect from '@/components/ui/Outlined'
import OutlinedInput from '@/components/ui/OutlinedInput'
import { AppDispatch } from '@/store'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
import { createUser } from '@/store/slices/userEntity/UserEntitySlice'
import { format } from 'date-fns'
import * as yup from 'yup'
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput'

const userValidationSchema = yup.object().shape({
    company_id: yup
        .number()
        .required('Company is required')
        .min(1, 'Please select a company'),
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .matches(
            /^\S.*\S$|^\S$/,
            'The input must not have leading or trailing spaces',
        ),
    email: yup
        .string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/,
            'Invalid email address. Please use a valid email with a.com,.in,.org,.net,.edu, or.gov domain.',
        )
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)'
                  ),
    mobile: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    joining_date: yup.string().required('Joining date is required'),
    role_id: yup
        .number()
        .required('Designation is required')
        .min(1, 'Please select a designation'),
    aadhar_no: yup
        .string()
        .nullable()
        .transform((value) => (value === '' ? null : value))
        .notRequired()
        .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits'),
    pan_card: yup
        .string()
        .nullable()
        .transform((value) => (value === '' ? null : value))
        .notRequired()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
    auth_signatory: yup.boolean(),
    suspend: yup.boolean(),
    disable: yup.boolean(),
})

interface LocationState {
    companyName?: string
    companyId?: string
}

interface UserFormData {
    group_id: number
    company_id: number
    name: string
    email: string
    password: string
    mobile: string
    joining_date: string
    role_id: number
    aadhar_no: string
    pan_card: string
    auth_signatory: boolean
    suspend: boolean
    disable: boolean
}

interface SelectOption {
    value: string
    label: string
}

interface ValidationErrors {
    [key: string]: string
}

const UserAddForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    const locationState = location.state as LocationState
    const companyName = locationState?.companyName
    const companyId = locationState?.companyId
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([])
    const [selectedCompanyGroup, setSelectedCompanyGroup] =
        useState<SelectOption | null>(null)
    const [companies, setCompanies] = useState<SelectOption[]>([])
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
        null,
    )
    const [userRole, setUserRole] = useState<SelectOption[]>([])
    const [selectedUserRole, setSelectedUserRole] =
        useState<SelectOption | null>(null)
    const [isAuthorizedSignatory, setIsAuthorizedSignatory] = useState(false)
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    )

    const [formData, setFormData] = useState<UserFormData>({
        group_id: 0,
        company_id: 0,
        name: '',
        email: '',
        password: '',
        mobile: '',
        joining_date: '',
        role_id: 0,
        aadhar_no: '',
        pan_card: '',
        auth_signatory: false,
        suspend: false,
        disable: false,
    })

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            group_id: selectedCompanyGroup?.value
                ? parseInt(selectedCompanyGroup.value)
                : 0,
        }))
    }, [selectedCompanyGroup])

    const loadCompanyGroups = async () => {
        try {
            const { data } = await httpClient.get(
                endpoints.companyGroup.getAll(),
                {
                    params: { ignorePlatform: true },
                },
            )
            setCompanyGroups(
                data.data.map((v: any) => ({
                    label: v.name,
                    value: String(v.id),
                })),
            )
        } catch (error) {
            console.error('Failed to load company groups:', error)
            showNotification('danger', 'Failed to load company groups')
        }
    }

    useEffect(() => {
        loadCompanyGroups()
    }, [])

    const loadCompanies = async (groupId: string[] | number[]) => {
        try {
            const { data } = await httpClient.get(endpoints.company.getAll(), {
                params: {
                    'group_id[]': companyId,
                },
            })
            if (data?.data) {
                const formattedCompanies = data.data.map((company: any) => ({
                    label: company.name,
                    value: String(company.id),
                }))

                if (formattedCompanies.length > 0) {
                    setCompanies(formattedCompanies)
                } else {
                    showNotification(
                        'info',
                        'No companies found for this group',
                    )
                    setCompanies([])
                }
            } else {
                setCompanies([])
            }
        } catch (error: any) {
            console.error('Failed to load companies:', error)
            showNotification(
                'danger',
                error.response?.data?.message || 'Failed to load companies',
            )
            setCompanies([])
        }
    }

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            company_id: selectedCompany?.value
                ? parseInt(selectedCompany.value)
                : 0,
        }))
        if (selectedCompany) {
            validateField('company_id', parseInt(selectedCompany.value))
        }
    }, [selectedCompany])

    useEffect(() => {
        if (companyId) {
            loadCompanies(companyId)
        } else {
            setCompanies([])
        }
    }, [])

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            role_id: selectedUserRole?.value
                ? parseInt(selectedUserRole.value)
                : 0,
        }))
        if (selectedUserRole) {
            validateField('role_id', parseInt(selectedUserRole.value))
        }
    }, [selectedUserRole])

    const loadUserRoles = async () => {
        try {
            const { data } = await httpClient.get(endpoints.role.getAll())
            setUserRole(
                data.data.map((item: any) => ({
                    label: item.role_details.name,
                    value: String(item.role_details.id),
                })),
            )
        } catch (error) {
            console.error('Failed to load user roles:', error)
            showNotification('danger', 'Failed to load user roles')
        }
    }

    useEffect(() => {
        loadUserRoles()
    }, [])

    const showNotification = (
        type: 'success' | 'info' | 'danger' | 'warning',
        message: string,
    ) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>,
        )
    }

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            auth_signatory: isAuthorizedSignatory,
        }))
    }, [isAuthorizedSignatory])

    const handleAuthSignatoryChange = (
        checked: boolean,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setIsAuthorizedSignatory(checked)
    }

    const validateField = async (field: keyof UserFormData, value: any) => {
        try {
            // Don't validate empty fields unless form is submitted
            if (!isFormSubmitted && !value) {
                return
            }

            await yup.reach(userValidationSchema, field).validate(value)
            setValidationErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                setValidationErrors((prev) => ({
                    ...prev,
                    [field]: error.message,
                }))
            }
        }
    }

    const handleInputChange = async (
        field: keyof UserFormData,
        value: string | boolean | number | Date,
    ) => {
        const newFormData = {
            ...formData,
            [field]: value,
        }
        setFormData(newFormData)
        await validateField(field, value)
    }

    const formatErrorMessages = (errors: any): string => {
        if (Array.isArray(errors)) {
            return errors.join('\n')
        } else if (typeof errors === 'object' && errors !== null) {
            const messages: string[] = []
            Object.entries(errors).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    messages.push(...value)
                } else if (typeof value === 'string') {
                    messages.push(value)
                }
            })
            return messages.join('\n')
        }
        return String(errors)
    }

    const showErrorNotification = (errors: any) => {
        const formattedMessage = formatErrorMessages(errors)
        const errorMessages = formattedMessage.split('\n').filter(Boolean)

        toast.push(
            <Notification title="Error" type="danger">
                <div style={{ whiteSpace: 'pre-line' }}>
                    {errorMessages.length > 1 ? (
                        <ul
                            style={{
                                padding: 0,
                                margin: 0,
                                listStyle: 'disc inside',
                            }}
                        >
                            {errorMessages.map((message, index) => (
                                <li
                                    key={index}
                                    style={{ marginBottom: '0.5rem' }}
                                >
                                    {message}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span>{formattedMessage}</span>
                    )}
                </div>
            </Notification>,
        )
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsFormSubmitted(true)

        try {
            await userValidationSchema.validate(formData, { abortEarly: false })

            const data = {
                ...formData,
                group_id: companyId,
                Company_Group_Name: companyName,
            }

            const resultAction = await dispatch(createUser(data))
                .unwrap()
                .catch((error: any) => {
                    if (error.response?.data?.message) {
                        showErrorNotification(error.response.data.message)
                    } else if (error.message) {
                        showErrorNotification(error.message)
                    } else if (Array.isArray(error)) {
                        showErrorNotification(error)
                    } else {
                        showErrorNotification(
                            'An unexpected error occurred. Please try again.',
                        )
                    }
                    throw error
                })

            if (resultAction) {
                navigate('/user-entity')
                showNotification('success', 'User added successfully')
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors: ValidationErrors = {}
                error.inner.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path] = err.message
                    }
                })
                setValidationErrors(newErrors)
                showErrorNotification('Please fix the validation errors')
            } else {
                console.error('User creation error:', error)
            }
        }
    }

    return (
        <div className="p-2 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-3">
                <Button
                    size="sm"
                    variant="plain"
                    icon={
                        <IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />
                    }
                    onClick={() => navigate('/user-entity')}
                />
                <h3 className="text-2xl font-semibold">User Form</h3>
            </div>

            <form onSubmit={handleAddUser}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
                    <div className="flex flex-col gap-2">
                        <p className="mb-2">
                            Select the company group{' '}
                            <span className="text-red-500">*</span>
                        </p>
                        <OutlinedInput
                            label="Company Group"
                            value={companyName}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="mb-2">
                            Select the company
                            <span className="text-red-500">*</span>
                        </p>
                        <OutlinedSelect
    label="Select Company"
    options={companies}
    value={selectedCompany}
    onChange={(option: SelectOption | null) => {
        setSelectedCompany(option)
    }}
/>
{(isFormSubmitted || selectedCompany !== null) && validationErrors.company_id && (
    <span className="text-red-500 text-sm">
        {validationErrors.company_id}
    </span>
)}
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
    <div className="flex flex-col gap-1">
        <p className="mb-2">
            Name <span className="text-red-500">*</span>
        </p>
        <OutlinedInput
            label="Name"
            value={formData.name}
            onChange={(value: string) =>
                handleInputChange('name', value)
            }
        />
        {(isFormSubmitted || formData.name !== '') && validationErrors.name && (
            <span className="text-red-500 text-sm">
                {validationErrors.name}
            </span>
        )}
    </div>
    <div className="flex flex-col gap-1">
        <p className="mb-2">
            Date of Joining <span className="text-red-500">*</span>
        </p>
        <DatePicker
            size="sm"
            placeholder="Pick a date"
            onChange={(date) => {
                const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
                setFormData((prev) => ({
                    ...prev,
                    joining_date: formattedDate,
                }));
                validateField('joining_date', formattedDate);
            }}
        />
        {(isFormSubmitted || formData.joining_date !== '') && validationErrors.joining_date && (
            <span className="text-red-500 text-sm">
                {validationErrors.joining_date}
            </span>
        )}
    </div>

    <div className="flex flex-col gap-1">
        <p className="mb-2">
            Email (Used For Login) <span className="text-red-500">*</span>
        </p>
        <OutlinedInput
            label="Email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
        />
        {(isFormSubmitted || formData.email !== '') && validationErrors.email && (
            <span className="text-red-500 text-sm">
                {validationErrors.email}
            </span>
        )}
    </div>

    <div className="flex flex-col gap-1">
        <p className="mb-2">
            Password (Used For Login) <span className="text-red-500">*</span>
        </p>
        <OutlinedPasswordInput
            label="Password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
        />
        {(isFormSubmitted || formData.password !== '') && validationErrors.password && (
            <span className="text-red-500 text-sm">
                {validationErrors.password}
            </span>
        )}
    </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
    <div className="flex flex-col gap-1">
        <p className="mb-1">
            Mobile No <span className="text-red-500">*</span>
        </p>
        <OutlinedInput
            label="Mobile no"
            value={formData.mobile}
            onChange={(value) => handleInputChange('mobile', value)}
        />
        {(isFormSubmitted || formData.mobile !== '') && validationErrors.mobile && (
            <span className="text-red-500 text-sm">
                {validationErrors.mobile}
            </span>
        )}
    </div>

    <div className="flex flex-col gap-1">
        <p className="mb-2">
            Designation <span className="text-red-500">*</span>
        </p>
        <OutlinedSelect
            label="Designation"
            options={userRole}
            value={selectedUserRole}
            onChange={setSelectedUserRole}
        />
        {(isFormSubmitted || selectedUserRole !== null) && validationErrors.role_id && (
            <span className="text-red-500 text-sm">
                {validationErrors.role_id}
            </span>
        )}
    </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
    <div className="flex flex-col gap-1">
        <p className="mb-1">Aadhaar No (Optional)</p>
        <OutlinedInput
            label="Aadhaar No"
            value={formData.aadhar_no}
            onChange={(value) =>
                handleInputChange('aadhar_no', value)
            }
        />
        {(isFormSubmitted || formData.aadhar_no !== '') && validationErrors.aadhar_no && (
            <span className="text-red-500 text-sm">
                {validationErrors.aadhar_no}
            </span>
        )}
    </div>

    <div className="flex flex-col gap-1">
        <p className="mb-1">PAN (Optional)</p>
        <OutlinedInput
            label="PAN"
            value={formData.pan_card}
            onChange={(value) =>
                handleInputChange('pan_card', value)
            }
        />
        {(isFormSubmitted || formData.pan_card !== '') && validationErrors.pan_card && (
            <span className="text-red-500 text-sm">
                {validationErrors.pan_card}
            </span>
        )}
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
  )
}
export default UserAddForm