import React from "react";
import PerformanceCard from './PerformanceCard'
import RiskCard from './RiskCard'
import MonthlyCard from './MonthlyCard'
import StatutesCard from './StatutesCard'
import ComplianceCalendar from './ComplianceCalendar'
import AbstractCard from './AbstractCard'
import UpdateCard from './UpdateCard'

const DashboardContent = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1 rounded-lg"><PerformanceCard /></div>
      <div className="col-span-1 rounded-lg"><RiskCard /></div>
      <div className="col-span-1 rounded-lg"><MonthlyCard /></div>
      <div className="col-span-1 rounded-lg"><StatutesCard /></div>
      <div className="col-span-2 rounded-lg"><ComplianceCalendar /></div>
      <div className="grid grid-cols-3 col-span-2 gap-4">
      <div className="col-span-1 rounded-lg"><AbstractCard /></div>
      <div className="col-span-2 rounded-lg"><UpdateCard /></div>
      </div>
    </div> 
  )
}

export default DashboardContent;