import { AdaptableCard } from '@/components/shared'
import React from 'react'
import AttendanceFilter from './components/AttendanceFilter'
import AttendanceRegisterTable from './components/AttendanceRegisterTable';
import TableFilter from './components/TableFilter';

const AttendanceRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
 <div className="flex flex-row justify-between gap-10 mb-10">
            <div className="">
                    <h3 className="text-2xl font-bold">Attendance Register Input</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <div>

            <AttendanceFilter/>
            </div>
            </div>
            {/* <AttendanceRegisterTable /> */}
            <TableFilter />
        </AdaptableCard>
  )
}

export default AttendanceRegister