import React from 'react'
import  AdaptableCard from '@/components/shared/AdaptableCard';
import HistoryPageTableTool from './components/HistoryPageTableTool';
import HistoryPageTable from './components/HistoryPageTable';
const DueCompliance = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Compliance History</h3>
                <HistoryPageTableTool />
            </div>
                <HistoryPageTable />
        </AdaptableCard>
  )
}

export default DueCompliance