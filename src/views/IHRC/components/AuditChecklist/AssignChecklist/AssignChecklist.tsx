import reducer from './store'
// import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
// injectReducer('salesProductList', reducer)
import AssignChecklistTable from './components/AssignChecklistTable'
const AssignChecklist = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Assigned Checklist</h3>
                {/* <RecommendedTableTool /> */}
            </div>
                <AssignChecklistTable />
        </AdaptableCard>
    )
}

export default AssignChecklist
