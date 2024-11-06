import React from 'react'
import LWFTrackerTool from './components/LWFTrackerTool'
import LWFTrackerTable from './components/LWFTrackerTable'
import { AdaptableCard } from '@/components/shared'

const LWFTracker = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
    <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-2xl font-bold">LWF Tracker</h3>
      </div>
      <LWFTrackerTool />
    </div>
    <LWFTrackerTable  />
  </AdaptableCard>
  )
}

export default LWFTracker