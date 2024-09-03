import React, { useState } from 'react'
import { DatePicker } from '@/components/ui'
import Select from '@/components/ui/Select'
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { ActionMeta, SingleValue } from 'react-select'

interface OptionType {
    value: string;
    label: string;
}

const dateFormat = 'MMM DD, YYYY'

const IhrcDashboardHeader = () => {
    const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null)
    const [company, setCompany] = useState<OptionType | null>(null)
    const [state, setState] = useState<OptionType | null>(null)
    const [branch, setBranch] = useState<OptionType | null>(null)
    const [periodOption, setPeriodOption] = useState<OptionType>({ value: 'Last Month', label: 'Last Month' })
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

    const handlePeriodChange = (
        newValue: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => {
        if (newValue) {
            setPeriodOption(newValue)
            if (newValue.value === 'Last Month') {
                setStartDate(startOfMonth(subMonths(new Date(), 1)))
                setEndDate(endOfMonth(subMonths(new Date(), 1)))
            } else if (newValue.value === 'Last 6 Months') {
                setStartDate(startOfMonth(subMonths(new Date(), 6)))
                setEndDate(new Date())
            } else {
                setStartDate(null)
                setEndDate(null)
            }
        }
    }

    const periodOptions: OptionType[] = [
        { value: 'Last Month', label: 'Last Month' },
        { value: 'Last 6 Months', label: 'Last 6 Months' },
        { value: 'Period', label: 'Period' }
    ]

    return (
        <div className="">
             <div className="mb-4 lg:mb-0">
                <h3 className="text-2xl font-bold">DASHBOARD</h3>
                <p className="text-gray-600">View your company's compliance statistics</p>
            </div>
            <div className='flex flex-col lg:flex-row lg:items-center gap-3 justify-center mt-6'>
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

                <Select<OptionType>
                    value={periodOption}
                    onChange={handlePeriodChange}
                    options={periodOptions}
                    placeholder="Period"
                    className="w-[180px]"
                />

                <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    inputFormat={dateFormat}
                    placeholder="From"
                    className="w-[180px]"
                />

                <DatePicker
                    value={endDate}
                    onChange={setEndDate}
                    inputFormat={dateFormat}
                    placeholder="To"
                    className="w-[180px]"
                />
            </div>
        </div>
    )
}

export default IhrcDashboardHeader