import React from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'

const CustomTableSearch: React.FC = () => {
    return (
        <Input
            className="w-44"
            size="sm"
            placeholder="Search Compliances"
            prefix={<HiOutlineSearch className="text-lg" />}
        />
    )
}

export default CustomTableSearch
