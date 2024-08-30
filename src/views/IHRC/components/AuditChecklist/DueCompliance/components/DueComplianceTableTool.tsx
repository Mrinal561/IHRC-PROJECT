import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import DueComplianceFilter from './DueComplianceFilter'
import DueComplianceTableSearch from './DueComplianceTableSearch'
import { Link } from 'react-router-dom'

const UploadComplianceButton = () => {
    const navigate = useNavigate();

    const handleUploadClick = () => {
        navigate('/app/IHRC/compliance-reupload/new');
    };

    return (
        <Button
            block
            size="sm"
            variant='solid'
            icon={<HiPlusCircle />}
            onClick={handleUploadClick}
        >
            Copy from Previous Month Data
        </Button>
    );
};

const DueComplianceTableTool = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
            <DueComplianceTableSearch />
            <DueComplianceFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <div className="block lg:inline-block md:mb-0 mb-4">
                <UploadComplianceButton />
            </div>
        </div>
    )
}

export default DueComplianceTableTool