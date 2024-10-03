import React from 'react'
import NotificationContent from './components/NotificationContent'

const NotificationSettings = () => {
  return (
    <div>
      <div className='mb-6 flex justify-between items-center'>
           <h3 className="text-2xl font-bold">Notification Settings</h3>
      </div>

      <NotificationContent />

    </div>
  )
}

export default NotificationSettings