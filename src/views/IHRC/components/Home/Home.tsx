import React, { useEffect, useState } from 'react'
import DashboardContent from './components/DashboardContent'
import DashboardCard from './components/DashboardCard'
import IhrcDashboardHeader from './components/IhrcDashboardHeader'
import DashboardBody from './components/DashboardBody'
import { HiOutlineViewGrid } from 'react-icons/hi'
import MessageTicker from './components/staticDashboard/MessageTicker'


const Home = () => {
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    console.log('Company ID updated:', companyId);
  }, [companyId]);

  const handleCompanyChange = (newCompanyId: string) => {
    console.log('Received new company ID:', newCompanyId);
    setCompanyId(newCompanyId);
  };

  return (
    <div className='flex flex-col gap-4 h-full'>
      <IhrcDashboardHeader onCompanyChange={handleCompanyChange} />
      <DashboardBody  companyId={companyId}  />
       {/* <div className="flex flex-col items-center justify-center h-full text-gray-500 border rounded-xl">
                <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-center">
        Still in Development Phase
                </p>
      </div> */}
   
    </div>
   
  )
}

export default Home