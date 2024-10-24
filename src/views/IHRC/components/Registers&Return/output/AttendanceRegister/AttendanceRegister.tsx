import { AdaptableCard } from '@/components/shared'
import React from 'react'
import AttendanceFilter from './components/AttendanceFilter'
import AttendanceRegisterTable from './components/AttendanceRegisterTable';

const AttendanceRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Attendance Register Output</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <AttendanceFilter/>
            </div>
            <AttendanceRegisterTable />
        </AdaptableCard>
  )
}

export default AttendanceRegister