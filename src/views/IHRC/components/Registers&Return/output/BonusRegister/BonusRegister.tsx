import { AdaptableCard } from '@/components/shared'
import React from 'react'
import BonusFilter from './components/BonusFilter'
import BonusRegisterTable from './components/BonusRegisterTable'

const BonusRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Bonus Register Output</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <BonusFilter/>
            </div>
                <BonusRegisterTable />
        </AdaptableCard>
  )
}

export default BonusRegister