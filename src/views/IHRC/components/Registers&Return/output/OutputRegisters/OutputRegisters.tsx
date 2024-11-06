import { AdaptableCard } from '@/components/shared'
import React from 'react'
import OutputRegisterFilter from './components/OutputRegisterFilter'
import OutputRegisterTable from './components/OutputRegisterTable'
// import SalaryFilter from './components/SalaryFilter';
// import SalaryRegisterTable from './components/SalaryRegisterTable';

const OutputRegisters = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col gap-10 mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Output Registers</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <div>
            <OutputRegisterFilter/>
            </div>
            </div>
                <OutputRegisterTable />
        </AdaptableCard>
  )
}

export default OutputRegisters