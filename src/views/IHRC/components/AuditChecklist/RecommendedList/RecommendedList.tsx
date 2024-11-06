import reducer from './store'
// import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RecommendedTableTool from './components/RecommendedTableTool'
import RecommendedTableContent from './components/RecommendedTable'
import Company from '../../Home/components/Company'
// injectReducer('salesProductList', reducer)

const RecommendedTable = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Recommended Checklist</h3>
                    <p className="text-gray-600">View your company's recommended compliance </p>
            </div>
            <RecommendedTableTool />
            </div>
            <div className='mb-8'>
            <Company />
            </div>
                <RecommendedTableContent />
        </AdaptableCard>
    )
}

export default RecommendedTable
