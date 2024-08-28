import React from 'react'
import DashboardContent from './components/DashboardContent'
import DashboardCard from './components/DashboardCard'


const Home = () => {
  return (
    <div className='w-full flex flex-col gap-10'>
    <div>
    <DashboardCard />
    </div>
    <div>
    <DashboardContent />
    </div>
  </div>
  )
}

export default Home