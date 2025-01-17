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
import { Formik, Field, Form, ErrorMessage } from 'formik'
import OutlinedPasswordInput from '@/components/ui/OutlinedInput/OutlinedPasswordInput'
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
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
            'Invalid email address.'
        )
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Must include A-Z, a-z, 0-9, @$!%*?& (Weak Password)',
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

const UserAddForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    const locationState = location.state as LocationState
    const companyName = locationState?.companyName
    const companyId = locationState?.companyId
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

    const loadCompanyGroups = async () => {
        try {
            const { data } = await httpClient.get(
                endpoints.companyGroup.getAll(),
                { params: { ignorePlatform: true } },
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

    const loadCompanies = async (groupId: string[] | number[]) => {
        try {
            console.log('Loading companies for group:', groupId)
            const { data } = await httpClient.get(endpoints.company.getAll(), {
                params: {
                    'group_id[]': groupId,
                },
            })
            const formattedCompanies = data?.data?.map((company: any) => ({
                label: company.name,
                value: String(company.id),
            }))
            setCompanies(formattedCompanies || [])
        } catch (error: any) {
            console.error('Failed to load companies:', error)
            showNotification('danger', 'Failed to load companies')
        }
    }

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
        loadCompanyGroups()
        loadUserRoles()
        if (companyId) {
            loadCompanies(companyId)
        }
    }, [])

    const handleAddUser = async (values: UserFormData) => {
        const data = {
            ...values,
            group_id: companyId,
            Company_Group_Name: companyName,
            company_id: Number(values.company_id),
            role_id: Number(values.role_id),
        }
        try {
            const resultAction = await dispatch(createUser(data)).unwrap()
            if (resultAction) {
                navigate('/user-entity')
                showNotification('success', 'User added successfully')
            }
        } catch (error: any) {
            const errorMessage = error || 'Failed to add user'
            showNotification('danger', errorMessage) // Show the API error message
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

            <Formik
                initialValues={{
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
                }}
                validationSchema={userValidationSchema}
                onSubmit={handleAddUser}
            >
                {({ setFieldValue, values, errors, touched }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
                            {/* Company Group (Read-only) */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    company group{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <input
                                    type="text"
                                    value={companyName}
                                    disabled
                                    className="p-2 border rounded"
                                />
                            </div>

                            {/* Select Company */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Select the company{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field name="company_id">
                                    {({ field }: any) => (
                                        <OutlinedSelect
                                            label="Select Company"
                                            options={companies} // Assuming `companies` is an array of options
                                            value={companies.find(
                                                (company) =>
                                                    Number(company.value) ===
                                                    values.company_id,
                                            )} // Find selected company
                                            onChange={(
                                                selectedOption: SelectOption | null,
                                            ) => {
                                                setFieldValue(
                                                    'company_id',
                                                    selectedOption
                                                        ? selectedOption.value
                                                        : null,
                                                )
                                            }}
                                            isMulti={false} // Single select
                                            isDisabled={false}
                                        />
                                    )}
                                </Field>
                                {/* Show error message if any */}
                                {touched.company_id && errors.company_id && (
                                    <span className="text-red-500 text-sm">
                                        {errors.company_id}
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Enter Name{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field
                                    name="name"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            {...field}
                                            label="Name"
                                            value={values.name}
                                            onChange={(value: string) =>
                                                setFieldValue('name', value)
                                            }
                                            error={touched.name && errors.name}
                                        />
                                    )}
                                />
                                {touched.name && errors.name && (
                                    <span className="text-red-500 text-sm">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Enter Email{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field
                                    name="email"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            {...field}
                                            label="Email"
                                            value={values.email}
                                            onChange={(value: string) =>
                                                setFieldValue('email', value)
                                            }
                                            error={
                                                touched.email && errors.email
                                            }
                                        />
                                    )}
                                />
                                {touched.email && errors.email && (
                                    <span className="text-red-500 text-sm">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Password{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field
                                    name="password"
                                    render={({ field }) => (
                                        <OutlinedPasswordInput
                                            {...field}
                                            label="Password"
                                            type="password"
                                            value={values.password}
                                            onChange={(value: string) =>
                                                setFieldValue('password', value)
                                            }
                                            error={
                                                touched.password &&
                                                errors.password
                                            }
                                        />
                                    )}
                                />
                                {touched.password && errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Mobile{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field
                                    name="mobile"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            {...field}
                                            label="Mobile"
                                            value={values.mobile}
                                            onChange={(value: string) =>
                                                setFieldValue('mobile', value)
                                            }
                                            error={
                                                touched.mobile && errors.mobile
                                            }
                                        />
                                    )}
                                />
                                {touched.mobile && errors.mobile && (
                                    <span className="text-red-500 text-sm">
                                        {errors.mobile}
                                    </span>
                                )}
                            </div>

                            {/* Joining Date */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Joining Date{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field
                                    name="joining_date"
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            selected={values.joining_date}
                                            onChange={(date) =>
                                                setFieldValue(
                                                    'joining_date',
                                                    date,
                                                )
                                            }
                                            placeholder="Select Joining Date"
                                            error={
                                                touched.joining_date &&
                                                errors.joining_date
                                            }
                                        />
                                    )}
                                />
                                {touched.joining_date &&
                                    errors.joining_date && (
                                        <span className="text-red-500 text-sm">
                                            {errors.joining_date}
                                        </span>
                                    )}
                            </div>

                            {/* Role field with validation */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">
                                    Select Role{' '}
                                    <span className="text-red-500">*</span>
                                </p>
                                <Field name="role_id">
                                    {({ field }: any) => (
                                        <OutlinedSelect
                                            label="Select Role"
                                            options={userRole} // assuming `userRole` is available
                                            value={userRole.find(
                                                (role) =>
                                                    Number(role.value) ==
                                                    values.role_id,
                                            )} // Find the selected option by role_id
                                            onChange={(
                                                selectedOption: SelectOption | null,
                                            ) => {
                                                setFieldValue(
                                                    'role_id',
                                                    selectedOption
                                                        ? selectedOption.value
                                                        : null,
                                                )
                                            }}
                                            isMulti={false} // Single select
                                            isDisabled={false}
                                        />
                                    )}
                                </Field>
                                {touched.role_id && errors.role_id && (
                                    <span className="text-red-500 text-sm">
                                        {errors.role_id}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">Aadhar </p>
                                <Field
                                    name="aadhar"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            {...field}
                                            label="Aadhar No"
                                            value={values.aadhar_no}
                                            onChange={(value: string) =>
                                                setFieldValue(
                                                    'aadhar_no',
                                                    value,
                                                )
                                            }
                                            error={
                                                touched.aadhar_no &&
                                                errors.aadhar_no
                                            }
                                        />
                                    )}
                                />
                                {touched.aadhar_no && errors.aadhar_no && (
                                    <span className="text-red-500 text-sm">
                                        {errors.aadhar_no}
                                    </span>
                                )}
                            </div>

                            {/* PAN Field */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-2">PAN</p>
                                <Field
                                    name="pan"
                                    render={({ field }) => (
                                        <OutlinedInput
                                            {...field}
                                            label="PAN"
                                            value={values.pan_card}
                                            onChange={(value: string) =>
                                                setFieldValue('pan', value)
                                            }
                                            error={
                                                touched.pan_card &&
                                                errors.pan_card
                                            }
                                        />
                                    )}
                                />
                                {touched.pan_card && errors.pan_card && (
                                    <span className="text-red-500 text-sm">
                                        {errors.pan_card}
                                    </span>
                                )}
                            </div>

                            {/* Checkbox (Auth Signatory) */}
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={values.auth_signatory}
                                        onChange={() =>
                                            setFieldValue(
                                                'auth_signatory',
                                                !values.auth_signatory,
                                            )
                                        }
                                    />
                                    <span className="ml-2">
                                        Authorized Signatory
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="col-span-2 flex justify-end gap-2 mt-4">
                                    <Button
                                        variant="plain"
                                        onClick={() => navigate(-1)}
                                        type='button'
                                    >
                                        Cancel
                                    </Button>
                                <Button type="submit" variant='solid'>Save User</Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserAddForm
