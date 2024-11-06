import React from 'react'
import DashboardContent from './components/DashboardContent'
import DashboardCard from './components/DashboardCard'
import IhrcDashboardHeader from './components/IhrcDashboardHeader'
import DashboardBody from './components/DashboardBody'


const Home = () => {
  return (
    <div className='flex flex-col gap-4 h-full'>
      <IhrcDashboardHeader />
      <DashboardBody />
   
    </div>
   
  )
}

export default Home