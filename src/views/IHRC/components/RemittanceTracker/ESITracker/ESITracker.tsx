import  AdaptableCard  from '@/components/shared/AdaptableCard'
import ESITrackerTable from './components/ESITrackerTable';
import ESITrackerTool from './components/ESITrackerTool';
import React from 'react'

const ESITracker = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">ESI Tracker</h3>
        </div>
        <ESITrackerTool />
      </div>
      <ESITrackerTable/>
    </AdaptableCard>
  )
}

export default ESITracker