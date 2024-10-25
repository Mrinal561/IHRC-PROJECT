import { AdaptableCard } from '@/components/shared'
import React from 'react'
import LeaveFilter from './components/LeaveFilter'
import LeaveRegisterTable from './components/LeaveRegisterTable';

const LeaveRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col gap-10 mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Leave Register Output</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <div>
            <LeaveFilter/>
            </div>
            </div>
            <LeaveRegisterTable />
        </AdaptableCard>
  )
}

export default LeaveRegister