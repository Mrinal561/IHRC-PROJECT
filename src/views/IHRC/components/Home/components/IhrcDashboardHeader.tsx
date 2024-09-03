import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'

import { useAppDispatch, useAppSelector } from '@/store'
import { HiOutlineFilter } from 'react-icons/hi'

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const IhrcDashboardHeader = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Overview</h3>
                <p>View your company's compliance statistics</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePickerRange
                   
                    inputFormat={dateFormat}
                    size="sm"
                />
                <Button size="sm" icon={<HiOutlineFilter />} >
                    Filter
                </Button>
            </div>
        </div>
    )
}

export default IhrcDashboardHeader
