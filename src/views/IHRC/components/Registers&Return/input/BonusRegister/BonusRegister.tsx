import { AdaptableCard } from '@/components/shared'
import React from 'react'
import BonusFilter from './components/BonusFilter'
import BonusRegisterTable from './components/BonusRegisterTable';
import TableFilter from './components/TableFilter';

const BonusRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col gap-10 mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Bonus Register Input</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <div>

            <BonusFilter/>
            </div>
            </div>
            {/* <BonusRegisterTable /> */}
            <TableFilter />
        </AdaptableCard>
  )
}

export default BonusRegister