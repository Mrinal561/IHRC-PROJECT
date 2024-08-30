import React from 'react'
import DueComplianceTableTool from './components/DueComplianceTableTool';
import  AdaptableCard from '@/components/shared/AdaptableCard';
import DueComplianceTable from './components/DueComplianceTable';
const DueCompliance = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-8">
                <h3 className="mb-4 lg:mb-0">Due & Upcoming Compliance</h3>
                <DueComplianceTableTool />
            </div>
                <DueComplianceTable />
        </AdaptableCard>
  )
}

export default DueCompliance