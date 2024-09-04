import React, { useState } from 'react'
import Select from '@/components/ui/Select'
import { ActionMeta, SingleValue } from 'react-select'
import CustomDateRangePicker from './CustomDateRangePicker'

interface OptionType {
    value: string;
    label: string;
}

const IhrcDashboardHeader = () => {
    const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null)
    const [company, setCompany] = useState<OptionType | null>(null)
    const [state, setState] = useState<OptionType | null>(null)
    const [branch, setBranch] = useState<OptionType | null>(null)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const handleSelectChange = (
        setValue: React.Dispatch<React.SetStateAction<OptionType | null>>
    ) => (
        newValue: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => {
        setValue(newValue)
    }

    const handleDateRangeApply = (start: Date, end: Date) => {
        setStartDate(start)
        setEndDate(end)
    }

    return (
        <div className="">
            <div className='flex flex-col lg:flex-row lg:items-center gap-3 justify-between'>
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">DASHBOARD</h3>
                    <p className="text-gray-600">View your company's compliance statistics</p>
                </div>
                <div className='flex flex-col lg:flex-row lg:items-center gap-3 justify-center'>
                    <CustomDateRangePicker onApply={handleDateRangeApply} />
                </div>
            </div>
            {/* Commented out select inputs as per the original code */}
            {/* <div className='flex flex-col lg:flex-row lg:items-center gap-3 justify-center mt-6'>
                <Select<OptionType>
                    value={companyGroup}
                    onChange={handleSelectChange(setCompanyGroup)}
                    options={[{ value: 'Company Group', label: 'Company Group' }]}
                    placeholder="Company Group"
                    className="w-[220px]"
                />
                <Select<OptionType>
                    value={company}
                    onChange={handleSelectChange(setCompany)}
                    options={[{ value: 'Company', label: 'Company' }]}
                    placeholder="Company"
                    className="w-[180px]"
                />
                <Select<OptionType>
                    value={state}
                    onChange={handleSelectChange(setState)}
                    options={[{ value: 'State', label: 'State' }]}
                    placeholder="State"
                    className="w-[180px]"
                />
                <Select<OptionType>
                    value={branch}
                    onChange={handleSelectChange(setBranch)}
                    options={[{ value: 'Branch', label: 'Branch' }]}
                    placeholder="Branch"
                    className="w-[180px]"
                />
            </div> */}
        </div>
    )
}

export default IhrcDashboardHeader