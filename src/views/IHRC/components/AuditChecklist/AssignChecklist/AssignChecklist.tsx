import reducer from './store'
// import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import AssignChecklistTableTool from './components/AssignChecklistTableTool'
// injectReducer('salesProductList', reducer)
import AssignChecklistTable from './components/AssignChecklistTable';
import Company from '../../Home/components/Company';
const AssignChecklist = () => {
    
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
             <div className="flex flex-row items-center justify-between mb-10">

<div className="">
        <h3 className="text-2xl font-bold">Assigned Checklist</h3>
        <p className="text-gray-600">View your company's assigned compliance </p>
</div>
<AssignChecklistTableTool />
</div>
<div className='mb-8'>
<Company />
</div>
                <AssignChecklistTable />
        </AdaptableCard>
    )
}

export default AssignChecklist
