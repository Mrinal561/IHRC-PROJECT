import { AdaptableCard } from '@/components/shared'
import React from 'react'
import SalaryFilter from './components/SalaryFilter';
import SalaryRegisterTable from './components/SalaryRegisterTable';

const SalaryRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Salary Register Input</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <SalaryFilter/>
            </div>
                <SalaryRegisterTable />
        </AdaptableCard>
  )
}

export default SalaryRegister