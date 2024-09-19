import React from 'react'
import { AdaptableCard } from '@/components/shared'
import SandETrackerTable from './components/SandETrackerTable'
import SandETrackerTool from './components/SandETrackerTool'



const SandETracker = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-2xl font-bold">S&E Tracker</h3>
      </div>
      <SandETrackerTool />
    </div>
    <SandETrackerTable  />
  </AdaptableCard>
  )
}

export default SandETracker