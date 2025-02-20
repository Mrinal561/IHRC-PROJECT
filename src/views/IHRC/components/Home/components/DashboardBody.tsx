// // // import React from 'react'
// // // import Statistic from './Statistic'
// // // import MonthlyCard from './MonthlyCard'
// // // import PerformanceCard from './PerformanceCard'
// // // import StatutesCard from './StatutesCard'
// // // import AbstractCard from './AbstractCard'
// // // import Schedule from './Schedule'
// // // import DailyUpdates from './DailyUpdates'
// // // import RiskCard from './RiskCard'
// // // import PaymentDatesChart from './PaymentDatesChart'
// // // import ChallanChart from './ChallanChart'
// // // import ChallanCountChart from './ChallanCountChart'

// // // const complianceDeadlines = [
// // //     { date: '2024-08-01', description: 'Monthly Financial Report Due' },
// // //     { date: '2024-08-15', description: 'Quarterly Report Due' },
// // //     { date: '2024-08-20', description: 'Annual Safety Review Submission' },
// // //     { date: '2024-08-30', description: 'Tax Filing Deadline' },
// // //     { date: '2024-09-01', description: 'Quarterly Tax Payments Due' },
// // //     { date: '2024-09-15', description: 'Quarterly Report Due' },
// // //     { date: '2024-09-30', description: 'Tax Filing Deadline' },
// // //     { date: '2024-09-20', description: 'Annual Employee Benefits Enrollment' },
// // //     { date: '2024-09-25', description: 'Quarterly Report Due' },
// // //     { date: '2024-10-31', description: 'End of Fiscal Year Review' },
// // //     { date: '2024-11-01', description: 'Monthly Financial Report Due' },
// // //     { date: '2024-11-15', description: 'Quarterly Report Due' },
// // //     { date: '2024-11-30', description: 'Annual Tax Planning Deadline' },
// // //     { date: '2024-12-01', description: 'Year-End Compliance Review' },
// // //     { date: '2024-12-15', description: 'Quarterly Report Due' },
// // //     { date: '2024-12-31', description: 'End of Year Tax Filing Deadline' },
// // // ]

// // // const DashboardBody = () => {
// // //   return (
// // //     <div className='flex flex-col gap-6 mt-6'>
// // //     <Statistic />
// // //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
// // //     {/* MonthlyCard spans across 2 columns */}
// // //     <div className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-1">
// // //       {/* <MonthlyCard /> */}
// // //       <PaymentDatesChart></PaymentDatesChart>
// // //     </div>

// // //     {/* Schedule card next to MonthlyCard */}
// // //     {/* <div className="col-span-1 lg:col-span-1 row-span-1 lg:row-span-2"><Schedule data={complianceDeadlines} /></div> */}

// // //     {/* StatutesCard on the right side below Schedule */}
// // //     <div className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-1">
// // //       {/* <PerformanceCard /> */}
// // //       <ChallanChart></ChallanChart>
// // //     </div>

// // //     {/* Div with text "6" below div "5" */}
// // //     <div className="col-span-1 lg:col-span-2 row-span-1 lg:row-span-1">
// // //       {/* <StatutesCard /> */}
// // //       <ChallanCountChart></ChallanCountChart>
// // //     </div>

// // //     {/* Div with text "5" below MonthlyCard */}
// // //     {/* <div className="col-span-1 lg:col-span-1 row-span-1 lg:row-span-1"><DailyUpdates /></div> */}
// // //     {/* <div className="col-span-3"><StatutesCard /></div> */}
// // // </div>

// // //     </div>

// // //   )
// // // }

// // // export default DashboardBody

// import React from 'react'
// import Statistic from './Statistic'
// import MonthlyCard from './MonthlyCard'
// import PerformanceCard from './PerformanceCard'
// import StatutesCard from './StatutesCard'
// import AbstractCard from './AbstractCard'
// import Schedule from './Schedule'
// import DailyUpdates from './DailyUpdates'
// import RiskCard from './RiskCard'
// import PaymentDatesChart from './PaymentDatesChart'
// import ChallanChart from './ChallanChart'
// import ChallanCountChart from './ChallanCountChart'
// import ChallanVisualization from './ChallanVisualisation'

// interface DashboardBodyProps {
//   companyId: string;
// }

// const complianceDeadlines = [
//     { date: '2024-08-01', description: 'Monthly Financial Report Due' },
//     { date: '2024-08-15', description: 'Quarterly Report Due' },
//     { date: '2024-08-20', description: 'Annual Safety Review Submission' },
//     { date: '2024-08-30', description: 'Tax Filing Deadline' },
//     { date: '2024-09-01', description: 'Quarterly Tax Payments Due' },
//     { date: '2024-09-15', description: 'Quarterly Report Due' },
//     { date: '2024-09-30', description: 'Tax Filing Deadline' },
//     { date: '2024-09-20', description: 'Annual Employee Benefits Enrollment' },
//     { date: '2024-09-25', description: 'Quarterly Report Due' },
//     { date: '2024-10-31', description: 'End of Fiscal Year Review' },
//     { date: '2024-11-01', description: 'Monthly Financial Report Due' },
//     { date: '2024-11-15', description: 'Quarterly Report Due' },
//     { date: '2024-11-30', description: 'Annual Tax Planning Deadline' },
//     { date: '2024-12-01', description: 'Year-End Compliance Review' },
//     { date: '2024-12-15', description: 'Quarterly Report Due' },
//     { date: '2024-12-31', description: 'End of Year Tax Filing Deadline' },
// ]

// const DashboardBody: React.FC<DashboardBodyProps> = ({ companyId }) => {
//   return (
//     <div className='flex flex-col gap-6 mt-6'>
//       <Statistic />
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div className="col-span-1 lg:col-span-2">
//           <PaymentDatesChart companyId={companyId} />
//         </div>

//         <div className="col-span-1">
//           <ChallanChart companyId={companyId} />
//         </div>
//         <div className="col-span-1">
//           <ChallanCountChart  companyId={companyId} />
//         </div>
//         <div className="col-span-1 lg:col-span-2">
//           <ChallanVisualization  companyId={companyId} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardBody

// import React from 'react';
// import BranchesDashboardCount from './staticDashboard/BranchesDashboardCount';
// import SEDashboardCount from './staticDashboard/SEDashboardCount';
// import AgreementsDashboardCount from './staticDashboard/AgreementsDashboardCount';
// import RentalDepositsDashboard from './staticDashboard/RentalDepositsDashboard';
// import NoticesDashboard from './staticDashboard/NoticesDasboard';
// import Notices from './staticDashboard/Notices';
// import ComplianceCalendar from './staticDashboard/ComplianceCalender';
// import RevenueStackedColumn from './staticDashboard/RevenueStackedColumn';
// import AnnualRevenueDonut from './staticDashboard/AnnualRevenueDonut';
// import PaymentDateComparison from './staticDashboard/PaymentDateComparison';
// import ChallanUploadCounts from './staticDashboard/ChallanUploadCounts';

// interface DashboardBodyProps {
//   companyId: string | number;
// }

// const DashboardBody: React.FC<DashboardBodyProps> = ({ companyId }) => {
//   return (
//     <div className="flex flex-col lg:flex-row gap-6 mt-6">
//       {/* Main content area */}
//       <div className="flex-1">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-4 rounded-lg border shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Branch Statistics</h2>
//             <BranchesDashboardCount />
//           </div>

//           <div className="bg-white p-4 rounded-lg border shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">S&E Registration Status</h2>
//             <SEDashboardCount />
//           </div>

//           <div className="bg-white p-4 rounded-lg border shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Rent Agreements</h2>
//             <AgreementsDashboardCount />
//           </div>

//           <div className="bg-white p-4 rounded-lg border shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Agreements</h2>
//             <RentalDepositsDashboard />
//           </div>

//           <div className="bg-white p-4 rounded-lg border shadow-sm col-span-2">
//             <h2 className="text-xl font-semibold mb-4">Notice Board</h2>
//             <NoticesDashboard />
//           </div>

//           <div className="bg-white p-4 rounded-lg border shadow-sm col-span-2">
//             <RevenueStackedColumn />
//           </div>
//         </div>

//         {/* Payment Date Comparison - Full Width */}
//         <div className="bg-white p-4 rounded-lg border shadow-sm mt-6">
//           <h2 className="text-xl font-semibold mb-4">Payment Date Analysis</h2>
//           <PaymentDateComparison />
//         </div>
//       </div>

//       {/* Right sidebar for Notices timeline */}
//       <div className="lg:w-[380px] flex-shrink-0">
//         <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
//           <ComplianceCalendar />
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
//           <Notices />
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
//           <AnnualRevenueDonut />
//         </div>
//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <ChallanUploadCounts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardBody;

import React, { useEffect, useState } from 'react'
import BranchesDashboardCount from './staticDashboard/BranchesDashboardCount'
import SEDashboardCount from './staticDashboard/SEDashboardCount'
import AgreementsDashboardCount from './staticDashboard/AgreementsDashboardCount'
import RentalDepositsDashboard from './staticDashboard/RentalDepositsDashboard'
import NoticesDashboard from './staticDashboard/NoticesDasboard'
import Notices from './staticDashboard/Notices'
import ComplianceCalendar from './staticDashboard/ComplianceCalender'
import RevenueStackedColumn from './staticDashboard/RevenueStackedColumn'
import AnnualRevenueDonut from './staticDashboard/AnnualRevenueDonut'
import PaymentDateComparison from './staticDashboard/PaymentDateComparison'
import ChallanUploadCounts from './staticDashboard/ChallanUploadCounts'
import { useSelector } from 'react-redux'
import { useAppSelector } from '@/store'
import ComplinceStatus from './staticDashboard/CompliceStatus'
import ComplinceTool from './staticDashboard/ComplinceTool'
import Alerts from './staticDashboard/Alreat'
import TableFilter from '../../Registers&Return/input/SalaryRegister/components/TableFilter'
import RemittanceStatus from './staticDashboard/RemittenceStatus'
import Updateds from './staticDashboard/Updates'
import VirtualAgreement from './staticDashboard/VirtualAgreement'
import BranchOwnership from './staticDashboard/BranchOwnership'
import BranchTypes from './staticDashboard/BranchTypes'
import ComplianceStatusPie from './staticDashboard/ComplianceStatusPie'
import ComplianceStatus from './staticDashboard/ComplianceStatus'
import NoticeStatusPie from './staticDashboard/NoticeStatusPie'
import RemittanceBreakup from './staticDashboard/RemittanceBreakup'
import RegistrationsBreakup from './staticDashboard/RegistrationBreakup'
import RegistrationBreakup from './staticDashboard/RegistrationBreakup'
import LWF from './staticDashboard/LWF'

interface DashboardBodyProps {
    companyId: string | number
}

const DashboardBody: React.FC<DashboardBodyProps> = ({ companyId }) => {
    // Add state to track the sideCollapsed value
    const [sideCollapsed, setSideCollapsed] = useState<boolean>(() => {
        // Initialize from localStorage if available
        const storedValue = localStorage.getItem('sideCollapsed')
        return storedValue ? JSON.parse(storedValue) : false
    })

    // Set up an effect to watch for changes in localStorage
    useEffect(() => {
        // Function to handle storage events
        const handleStorageChange = () => {
            const newValue = JSON.parse(
                localStorage.getItem('sideCollapsed') || 'false',
            )
            if (newValue !== sideCollapsed) {
                setSideCollapsed(newValue)
                console.log('sideCollapsed changed in DashboardBody:', newValue)
            }
        }

        // Set up event listener for storage changes
        window.addEventListener('storage', handleStorageChange)

        // Also check for changes on a regular interval as a backup
        const intervalId = setInterval(() => {
            const currentValue = JSON.parse(
                localStorage.getItem('sideCollapsed') || 'false',
            )
            if (currentValue !== sideCollapsed) {
                setSideCollapsed(currentValue)
                console.log(
                    'sideCollapsed changed (interval check):',
                    currentValue,
                )
            }
        }, 1000)

        // Clean up listeners and interval on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            clearInterval(intervalId)
        }
    }, [sideCollapsed])

    // Initial log
    useEffect(() => {
        console.log(
            'Initial sideCollapsed value in DashboardBody:',
            sideCollapsed,
        )
    }, [])

    if (!sideCollapsed) {
        // When sidebar is not collapsed, render everything in a vertical layout
        return (
            <div className="flex flex-col gap-6 mt-6">
                {/* Branch Statistics and S&E Registration Status - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">
                            Branch Status
                        </h2> */}
                         <BranchOwnership />
                        <BranchesDashboardCount />
                    {/* </div> */}

                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4"> */}
                            {/* S&E Registration Status */}
                        {/* </h2> */}
                       
                    {/* </div> */}
                </div>

                {/* Rent Agreements and Agreements - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">
                            Rent Agreement Status
                        </h2> */}
                         <BranchOwnership />
                    {/* </div> */}

                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">
                            Physical Branch Agreement Status
                        </h2> */}
                         <RentalDepositsDashboard />
                    {/* </div> */}
                </div>

                {/* Notice Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Notice Status</h2> */}
                    <VirtualAgreement />
                    <SEDashboardCount />
                {/* </div> */}
                {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Virtual Agreement Status</h2> */}
                {/* </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4"> Branch Ownership Type</h2> */}
                   
                {/* </div> */}
                {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4"> Branch Types</h2> */}
                    <AgreementsDashboardCount />
                    <NoticesDashboard />
                {/* </div> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <ComplianceStatusPie />
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <ComplianceStatus />
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <NoticeStatusPie />
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <RemittanceBreakup />
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm col-span-2">
                    <RegistrationBreakup />
                </div>
                </div>

                {/* Revenue Stacked Column and Compliance Calendar - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <RegistrationBreakup />
                    </div> */}
                     <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ComplinceTool />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <AnnualRevenueDonut />
                    </div>
                   
                </div>

                {/* Payment Date Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <PaymentDateComparison />
                    </div> */}
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <LWF />
                    </div>
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <Alerts />
                        </div> */}
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ComplinceStatus />
                    </div>
                </div>
                {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">
                        Payment Date Analysis
                    </h2>
                    <PaymentDateComparison />
                </div> */}

                {/* Notices */}

                {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <Notices />
                </div> */}

                {/* Challan Upload Counts and Annual Revenue Donut - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ChallanUploadCounts />
                    </div> */}

                    
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ComplianceCalendar />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <Updateds />
                    </div>
                </div>
            </div>
        )
    } else {
        // Original layout when sidebar is collapsed
        return (
            <div className="flex flex-col gap-6 mt-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Branch Status</h2> */}
                    <BranchTypes />
                        <BranchesDashboardCount />
                    {/* </div> */}
            
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                    <BranchOwnership />
                    {/* </div> */}
            
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Rent Agreement Status</h2> */}
                    {/* </div> */}
            
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Physical Branch Agreement Status</h2> */}
                        <RentalDepositsDashboard />
                    {/* </div> */}
                </div>
            
                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Virtual Branch Agreement Status</h2> */}
                        <VirtualAgreement />
                    {/* </div> */}
            
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Notice Status</h2> */}
                    {/* </div> */}
            
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Branch Ownership Type</h2> */}
                        <SEDashboardCount />
                        <AgreementsDashboardCount />
                        <NoticesDashboard />
                        {/* <BranchOwnership /> */}
                    {/* </div> */}
            
                    {/* <div className="bg-white p-4 rounded-lg border shadow-sm"> */}
                        {/* <h2 className="text-xl font-semibold mb-4">Branch Types</h2> */}
                        {/* <BranchTypes /> */}
                    {/* </div> */}
                </div>
            
                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="overflow-x-auto py-2 p-1 bg-white rounded-lg shadow-lg border">
                        <ComplianceStatusPie />
                    </div>
                    <div className="overflow-x-auto py-2 p-1 bg-white rounded-lg shadow-lg border">
                        <ComplianceStatus />
                    </div>
                    <div className="overflow-x-auto py-2 p-1 bg-white rounded-lg shadow-lg border">
                        <NoticeStatusPie />
                    </div>
                    
                </div>
            
                {/* Fourth Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm col-span-2">
                        <RemittanceBreakup />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm col-span-2">
                        <RegistrationBreakup />
                    </div>
                   
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ComplinceTool />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <AnnualRevenueDonut />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <LWF />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ComplinceStatus />
                    </div>
                </div>
            
                {/* Fifth Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <ComplianceCalendar />
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <Updateds />
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardBody
