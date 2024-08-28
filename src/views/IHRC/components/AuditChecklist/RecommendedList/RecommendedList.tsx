import reducer from './store'
// import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RecommendedTableTool from './components/RecommendedTableTool'
import RecommendedTableContent from './components/RecommendedTable'
// injectReducer('salesProductList', reducer)

const RecommendedTable = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Recommended Checklist</h3>
                <RecommendedTableTool />
            </div>
                <RecommendedTableContent />
        </AdaptableCard>
    )
}

export default RecommendedTable
