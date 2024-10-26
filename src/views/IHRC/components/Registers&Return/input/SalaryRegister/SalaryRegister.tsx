import { AdaptableCard } from '@/components/shared'
import React from 'react'
import SalaryFilter from './components/SalaryFilter';
import SalaryRegisterTable from './components/SalaryRegisterTable';
import TableFilter from './components/TableFilter';

const SalaryRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col gap-10 mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Salary Register Input</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <div>
            <SalaryFilter/>
            </div>
            </div>
                {/* <SalaryRegisterTable /> */}
                <TableFilter/>
        </AdaptableCard>
  )
}

export default SalaryRegister