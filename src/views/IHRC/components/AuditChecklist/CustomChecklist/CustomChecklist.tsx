import React from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomChecklistTool from './components/CustomChecklistTool'
import CustomChecklistTable from './components/CustomChecklistTable';
const CustomChecklist = () => {
  return (
     <AdaptableCard className="h-full" bodyClass="h-full">
     <div className="lg:flex items-center justify-between mb-8">
                <h3 className="x">Custom Checklist</h3>
                <CustomChecklistTool/>
    </div>
    <CustomChecklistTable/>
 </AdaptableCard>
  )
}

export default CustomChecklist