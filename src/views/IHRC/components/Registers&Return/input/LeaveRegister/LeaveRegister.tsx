import { AdaptableCard } from '@/components/shared'
import React from 'react'
import LeaveFilter from './components/LeaveFilter'

const LeaveRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Leave Register Input</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <LeaveFilter/>
            </div>
                {/* <RecommendedTableContent /> */}
        </AdaptableCard>
  )
}

export default LeaveRegister