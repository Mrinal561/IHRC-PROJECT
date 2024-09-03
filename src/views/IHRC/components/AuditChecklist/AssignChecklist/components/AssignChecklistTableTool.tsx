import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
// import ComplianceTableSearch from './ComplianceTableSearch'
// import ComplianceTableSearch from '../../ComplianceDetails/components/ComplianceTableSearch'
// import ComplianceFilter from './ComplianceFilter'
// import ComplianceFilter from '../../ComplianceDetails/components/ComplianceFilter'
import { Link } from 'react-router-dom'

import { FaUser , FaCheckCircle } from 'react-icons/fa';
const AssignChecklistTableTool = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <Button block variant="solid" size="sm" icon={<FaUser />}>
                Set Owners
            </Button>
            <Button block variant="solid" size="sm" icon={<FaCheckCircle />}>
                Set Approvers
            </Button>
        </div>
    )
}

export default AssignChecklistTableTool
