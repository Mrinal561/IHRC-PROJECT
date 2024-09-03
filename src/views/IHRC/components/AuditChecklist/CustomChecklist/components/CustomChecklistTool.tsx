import React from 'react'
import CustomTableSearch from './CustomTableSearch'
import CustomTableFilter from './CustomTableFilter'
import { Link } from 'react-router-dom'
import { HiDownload } from 'react-icons/hi'
import CustomChecklistButton from './CustomChecklistButton'
import { Button } from '@/components/ui'
import BulkUpload from './BulkUpload';
const CustomChecklistTool = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
            <CustomTableSearch />
            <CustomTableFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/custom-product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <BulkUpload />
            <div className="block lg:inline-block md:mb-0 mb-4 ml-2">
                <CustomChecklistButton />
            </div>
        </div>
    )
}

export default CustomChecklistTool
