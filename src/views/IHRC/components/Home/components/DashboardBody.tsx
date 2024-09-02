import React from 'react'
import Statistic from './Statistic'
import MonthlyCard from './MonthlyCard'
import PerformanceCard from './PerformanceCard'
import StatutesCard from './StatutesCard'
import AbstractCard from './AbstractCard'
import Schedule from './Schedule'
import DailyUpdates from './DailyUpdates'
import RiskCard from './RiskCard'

const complianceDeadlines = [
    { date: '2024-08-01', description: 'Monthly Financial Report Due' },
    { date: '2024-08-15', description: 'Quarterly Report Due' },
    { date: '2024-08-20', description: 'Annual Safety Review Submission' },
    { date: '2024-08-30', description: 'Tax Filing Deadline' },
    { date: '2024-09-01', description: 'Quarterly Tax Payments Due' },
    { date: '2024-09-15', description: 'Quarterly Report Due' },
    { date: '2024-09-30', description: 'Tax Filing Deadline' },
    { date: '2024-09-20', description: 'Annual Employee Benefits Enrollment' },
    { date: '2024-09-25', description: 'Quarterly Report Due' },
    { date: '2024-10-31', description: 'End of Fiscal Year Review' },
    { date: '2024-11-01', description: 'Monthly Financial Report Due' },
    { date: '2024-11-15', description: 'Quarterly Report Due' },
    { date: '2024-11-30', description: 'Annual Tax Planning Deadline' },
    { date: '2024-12-01', description: 'Year-End Compliance Review' },
    { date: '2024-12-15', description: 'Quarterly Report Due' },
    { date: '2024-12-31', description: 'End of Year Tax Filing Deadline' },
]

const DashboardBody = () => {
  return (
    <div className='flex flex-col gap-6'>
    <Statistic />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {/* MonthlyCard spans across 2 columns */}
    <div className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-1"><MonthlyCard /></div>

    {/* Schedule card next to MonthlyCard */}
    <div className="col-span-1 lg:col-span-1 row-span-1 lg:row-span-2"><Schedule data={complianceDeadlines} /></div>

    
    {/* StatutesCard on the right side below Schedule */}
    <div className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-1"><PerformanceCard /></div>

    {/* Div with text "6" below div "5" */}
    <div className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-1"><StatutesCard /></div>

    {/* Div with text "5" below MonthlyCard */}
    <div className="col-span-1 lg:col-span-1 row-span-1 lg:row-span-1"><DailyUpdates /></div>
</div>
    </div>

  )
}

export default DashboardBody