
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import { Button, Dropdown } from '@/components/ui'
import { HiOutlineSearch, HiOutlineCalendar } from 'react-icons/hi'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { startOfMonth, endOfMonth, subMonths, subYears } from 'date-fns'
import CustomDateRangePicker from './CustomDateRangePicker'
import Company from '../../../Home/components/Company'
const HistoryPageTableSearch = ({ onSearch, onDateRangeChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState([null, null])
  // const [startDate, endDate] = dateRange
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  const handleDateRangeChange = (update) => {
    setDateRange(update)
    onDateRangeChange(update)
  }

  const setLastMonth = () => {
    const end = endOfMonth(subMonths(new Date(), 1))
    const start = startOfMonth(end)
    setDateRange([start, end])
    onDateRangeChange([start, end])
  }

  const setLastQuarter = () => {
    const end = endOfMonth(subMonths(new Date(), 1))
    const start = startOfMonth(subMonths(end, 2))
    setDateRange([start, end])
    onDateRangeChange([start, end])
  }

  const setLastYear = () => {
    const end = endOfMonth(subMonths(new Date(), 1))
    const start = startOfMonth(subYears(end, 1))
    setDateRange([start, end])
    onDateRangeChange([start, end])
  }

  const dateRangeOptions = [
    { key: 'lastMonth', name: 'Last Month', action: setLastMonth },
    { key: 'lastQuarter', name: 'Last Quarter', action: setLastQuarter },
    { key: 'lastYear', name: 'Last Year', action: setLastYear },
  ]

  const onDropdownItemClick = (eventKey) => {
    const selectedOption = dateRangeOptions.find(option => option.key === eventKey)
    if (selectedOption) {
      selectedOption.action()
    }
  }
  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
};

  return (
    <div className="flex items-center space-x-3 flex-wrap">
      {/* <Input
        className="max-w-md md:w-52 md:mb-0"
        size="sm"
        placeholder="Search compliance"
        prefix={<HiOutlineSearch className="text-lg" />}
        value={searchTerm}
        onChange={handleSearch}
      /> */}
      <Company />

      {/* <CustomDateRangePicker onApply={handleDateRangeApply} /> */}
   
    </div>
  )
}

export default HistoryPageTableSearch