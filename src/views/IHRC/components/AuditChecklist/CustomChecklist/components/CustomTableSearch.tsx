import React from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'

const CustomTableSearch: React.FC = () => {
    return (
        <Input
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search items"
            prefix={<HiOutlineSearch className="text-lg" />}
        />
    )
}

export default CustomTableSearch
