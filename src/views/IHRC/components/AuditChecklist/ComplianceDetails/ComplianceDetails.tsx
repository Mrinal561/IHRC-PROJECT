import reducer from './store'
// import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ComplianceTableTools from './components/ComplianceTableTool'
import ComplianceTableContent from './components/ComplianceTable'
// injectReducer('salesProductList', reducer)

const ComplianceTable = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Compliances</h3>
                <ComplianceTableTools />
            </div>
                <ComplianceTableContent />
        </AdaptableCard>
    )
}

export default ComplianceTable
