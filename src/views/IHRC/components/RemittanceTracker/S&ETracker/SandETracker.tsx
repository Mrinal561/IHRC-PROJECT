import React from 'react'
import { AdaptableCard } from '@/components/shared'
import SandETrackerTable from './components/SandETrackerTable'
import SandETrackerTool from './components/SandETrackerTool'
import NoticeTrackerTable from './components/SandETrackerTable'



const SandETracker = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
    <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-2xl font-bold">Notice Tracker</h3>
      </div>
      <SandETrackerTool />
    </div>
    <NoticeTrackerTable  />
  </AdaptableCard>
  )
}

export default SandETracker