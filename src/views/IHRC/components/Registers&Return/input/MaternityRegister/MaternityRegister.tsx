import { AdaptableCard } from '@/components/shared'
import React from 'react'
import MaternityFilter from './components/MaternityFilter'
import MaternityTable from './components/MaternityTable';
import TableFilter from './components/TableFilter';

const MaternityRegister = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col gap-10 mb-10">

            <div className="">
                    <h3 className="text-2xl font-bold">Maternity Register Input</h3>
                    {/* <p className="text-gray-600">View your company's recommended compliance </p> */}
            </div>
            <div>

            <MaternityFilter/>
            </div>
            </div>
            {/* <MaternityTable /> */}
            <TableFilter/>
        </AdaptableCard>
  )
}

export default MaternityRegister