import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RecommendedTableSearch from './RecommendedTableSearch'
import RecommendedFilter from './RecommendedFilter'
import { Link } from 'react-router-dom'

const RecommendedTableTool = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
            <RecommendedTableSearch />
            <RecommendedFilter />
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
                   Assign Checklist
                </Button>
            </Link>
        </div>
    )
}

export default RecommendedTableTool
