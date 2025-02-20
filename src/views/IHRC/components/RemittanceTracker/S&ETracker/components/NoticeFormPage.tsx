import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from '@/components/ui'
import OutlinedInput from '@/components/ui/OutlinedInput'
import DistrictAutosuggest from '../../../Entity/ESICSetup/components/DistrictAutoSuggest'
import LocationAutosuggest from '../../../Entity/Branch/components/LocationAutosuggest'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
import { toast, Notification } from '@/components/ui'
import OutlinedSelect from '@/components/ui/Outlined/Outlined'
import { showErrorNotification } from '@/components/ui/ErrorMessage'
import { useDispatch } from 'react-redux'
import { createNotice } from '@/store/slices/noticeTracker/noticeTrackerSlice'
import store from '@/store'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import NoticeTypeAutosuggest from './NoticeTypeAutosuggest'
import NoticeActAutosuggest from './NoticeActAutosuggest'

interface SelectOption {
    value: string
    label: string
}

const NoticeFormPage = ({ onSuccess }) => {
    const dispatch = useDispatch()
    const [companyGroups, setCompanyGroups] = useState<string>('')
    const [companies, setCompanies] = useState<SelectOption[]>([])
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
        null,
    )
    const [isLoading, setIsLoading] = useState(false)
    const [states, setStates] = useState<SelectOption[]>([])
    const [selectedStates, setSelectedStates] = useState<SelectOption | null>(
        null,
    )
    const [selectedDistrict, setSelectedDistrict] = useState<{
        id: number | null
        name: string
    }>({
        id: null,
        name: '',
    })
    const [fileBase64, setFileBase64] = useState<string>('')
    const [selectedDistrictId, setSelectedDistrictId] = useState<
        number | undefined
    >()
    const [selectedLocation, setSelectedLocation] = useState('')
    const navigate = useNavigate()
    const initialFormData = {
        group_id: 0,
        company_id: 0,
        companyGroupName: '',
        entityName: '',
        state_id: '',
        district_id: 0,
        location: '',
        notice_type: '',
        notice_date: null,
        reference_number: '',
        related_act: '',
        notice_document: null,
        notice_detail: '',
    }

    const [formData, setFormData] = useState(initialFormData)

    const noticeTypeOptions = [
        { value: 'inspection', label: 'Inspection' },
        { value: 'show_cause', label: 'Show Cause' },
        { value: 'demand', label: 'Demand' },
        { value: 'other', label: 'Other' },
    ]

    const loadCompanyGroups = async () => {
        try {
            const { data } = await httpClient.get(
                endpoints.companyGroup.getAll(),
                {
                    params: { ignorePlatform: true },
                },
            )
            if (data.data && data.data.length > 0) {
                const defaultGroup = data.data[0]
                setCompanyGroups(defaultGroup.name)
                setFormData((prev) => ({
                    ...prev,
                    group_id: defaultGroup.id,
                }))
                loadCompanies(defaultGroup.id)
            }
        } catch (error) {
            console.error('Failed to load company groups:', error)
            toast.push(
                <Notification title="Error" closable={true} type="danger">
                    Failed to load company groups
                </Notification>,
            )
        }
    }

    const loadCompanies = async (groupId: string) => {
        try {
            const { data } = await httpClient.get(endpoints.company.getAll(), {
                params: { 'group_id[]': groupId },
            })
            const formattedCompanies = data?.data?.map((company: any) => ({
                label: company.name,
                value: String(company.id),
            }))
            setCompanies(formattedCompanies || [])
        } catch (error) {
            console.error('Failed to load companies:', error)
            toast.push(
                <Notification title="Error" closable={true} type="danger">
                    Failed to load companies
                </Notification>,
            )
        }
    }

    const loadStates = async () => {
        try {
            setIsLoading(true)
            const response = await httpClient.get(endpoints.common.state())
            if (response.data) {
                const formattedStates = response.data.map((state: any) => ({
                    label: state.name,
                    value: String(state.id),
                }))
                setStates(formattedStates)
            }
        } catch (error) {
            console.error('Failed to load states:', error)
            toast.push(
                <Notification title="Error" closable={true} type="danger">
                    Failed to load states
                </Notification>,
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadCompanyGroups()
        loadStates()
    }, [])

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            company_id: selectedCompany?.value
                ? parseInt(selectedCompany.value)
                : 0,
        }))
    }, [selectedCompany])

    const handleStateChange = (option: SelectOption | null) => {
        setSelectedStates(option)
        setSelectedDistrict({ id: null, name: '' })
        setSelectedLocation('')

        if (option) {
            setFormData((prev) => ({
                ...prev,
                state_id: option.value,
                district_id: 0,
                location: '',
            }))
        }
    }

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1]
                setFileBase64(base64String)
                setFormData((prev) => ({
                    ...prev,
                    notice_document: base64String,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async () => {
        try {
            const resultAction = await dispatch(createNotice(formData))
                .unwrap()
                .catch((error: any) => {
                    throw error
                })

            if (resultAction) {
                navigate(-1)
                toast.push(
                    <Notification title="Success" type="success">
                        Uploaded Successfully
                    </Notification>,
                )
                onSuccess?.()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full mx-auto p-2 bg-white rounded-lg">
            <div className="flex gap-2 items-center mb-3">
                <Button
                    size="sm"
                    variant="plain"
                    icon={
                        <IoArrowBack className="text-gray-500 hover:text-gray-700" />
                    }
                    onClick={() => navigate(-1)}
                />
                <h3 className="text-2xl font-semibold">Add Notice Details</h3>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Company Group
                        </label>
                        <OutlinedInput
                            label="Company Group"
                            value={companyGroups}
                            onChange={() => {}}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Company <span className="text-red-500">*</span>
                        </label>
                        <OutlinedSelect
                            label="Select Company"
                            options={companies}
                            value={selectedCompany}
                            onChange={(option: SelectOption | null) => {
                                setSelectedCompany(option)
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            State <span className="text-red-500">*</span>
                        </label>
                        <OutlinedSelect
                            label="Select State"
                            options={states}
                            value={selectedStates}
                            onChange={handleStateChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <DistrictAutosuggest
                            value={selectedDistrict}
                            onChange={(district) => {
                                setSelectedDistrict(district)
                                setFormData((prev) => ({
                                    ...prev,
                                    district_id: district.id || 0,
                                }))
                            }}
                            stateId={
                                selectedStates?.value
                                    ? parseInt(selectedStates.value)
                                    : undefined
                            }
                            onDistrictSelect={(id) => setSelectedDistrictId(id)}
                        />
                    </div>
                    <div className="space-y-2">
                        <LocationAutosuggest
                            value={selectedLocation}
                            onChange={(location: string) => {
                                setSelectedLocation(location)
                                setFormData((prev) => ({
                                    ...prev,
                                    location: location,
                                }))
                            }}
                            districtId={selectedDistrictId}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <NoticeTypeAutosuggest
                            value={formData.notice_type}
                            onChange={(value) =>
                                handleChange('notice_type', value)
                            }
                            onNoticeTypeSelect={(id) => {
                                // If you need to store the ID separately
                                setFormData((prev) => ({
                                    ...prev,
                                    notice_type_id: id,
                                }))
                            }}
                            isDisabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Notice Received on{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                            clearable
                            size="sm"
                            placeholder="Select Date"
                            value={formData.notice_date}
                            onChange={(date) =>
                                handleChange('notice_date', date)
                            }
                            inputFormat="DD-MM-YYYY" // Changed to uppercase format tokens
                            yearLabelFormat="YYYY"
                            monthLabelFormat="MMMM YYYY"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Letter/ Notice reference number{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <OutlinedInput
                            label="Reference Number"
                            value={formData.reference_number}
                            onChange={(value) =>
                                handleChange('reference_number', value)
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <NoticeActAutosuggest
                            value={formData.related_act}
                            onChange={(value) =>
                                handleChange('related_act', value)
                            }
                            onNoticeActSelect={(id) => {
                                // If you need to store the ID separately
                                setFormData((prev) => ({
                                    ...prev,
                                    notice_act_id: id,
                                }))
                            }}
                            isDisabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Notice Copy (PDF/Zip/Image, Max 20MB){' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full"
                            accept=".pdf,.jpg,.zip,.jpeg,.png"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Details of Notice
                    </label>
                    <textarea
                        className="w-full p-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.notice_detail}
                        onChange={(e) =>
                            handleChange('notice_detail', e.target.value)
                        }
                        placeholder="Enter notice details..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="plain"
                    // size="sm"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    onClick={handleSubmit}
                    loading={isLoading}
                >
                    Confirm
                </Button>
            </div>
        </div>
    )
}

export default NoticeFormPage
