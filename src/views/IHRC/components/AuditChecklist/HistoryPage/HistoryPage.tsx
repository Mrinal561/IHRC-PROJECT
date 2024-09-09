import React from 'react'
import  AdaptableCard from '@/components/shared/AdaptableCard';
import HistoryPageTableTool from './components/HistoryPageTableTool';
import HistoryPageTable from './components/HistoryPageTable';
import Company from '../../Home/components/Company';
const DueCompliance = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            {/* <div className="flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Compliance History</h3>
                <HistoryPageTableTool />
            </div> */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Compliance History</h3>
                    <p className="text-gray-600">View your company's compliance history</p>
                </div>
                <HistoryPageTableTool />
      </div>
      <div className='mb-8'>
        <Company />
      </div>
                <HistoryPageTable />
        </AdaptableCard>
  )
}

export default DueCompliance