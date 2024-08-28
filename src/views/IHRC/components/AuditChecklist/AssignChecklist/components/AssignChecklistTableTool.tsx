import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ComplianceTableSearch from './ComplianceTableSearch'
import ComplianceFilter from './ComplianceFilter'
import { Link } from 'react-router-dom'

const AssignChecklistTableTool = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
            <ComplianceTableSearch />
            <ComplianceFilter />
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
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to=""
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Compliance
                </Button>
            </Link>
        </div>
    )
}

export default AssignChecklistTableTool
