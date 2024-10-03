import React, { useState, ChangeEvent, useEffect } from 'react';
import { Switcher, Checkbox, Button, Avatar } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import {
    HiOutlineBell,
    HiOutlineCalendar,
    HiOutlineClipboardCheck,
    HiOutlineBan,
    HiOutlinePlusCircle,
    HiOutlineDocumentText,
    HiOutlineClipboardList,
    HiOutlineExclamationCircle,
    HiOutlineBadgeCheck
} from 'react-icons/hi'

const NotificationContent: React.FC = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [notificationTypes, setNotificationTypes] = useState({
    ComplianceApproved: false,
    ComplianceRejected: false,
    ComplianceUpdateRequired: false,
    ComplianceDeadlineReminder: false,
    NewComplianceAdded: false,
    PolicyUpdate: false,
    AuditNotification: false,
    ViolationsNotification: false,
    CertificationExpirationsNotification: false,

  });
  const [deadlineReminder, setDeadlineReminder] = useState('');

  useEffect(() => {
    const allChecked = Object.values(notificationTypes).every(value => value === true);
    setSelectAll(allChecked);
  }, [notificationTypes]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setNotificationTypes(prevTypes => 
      Object.keys(prevTypes).reduce((acc, key) => {
        acc[key] = newSelectAll;
        return acc;
      }, {...prevTypes})
    );
  };

  
  

  const onNotificationTypeChange = (type: string) => {
    setNotificationTypes(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
}

  const onDeadlineReminderChange = (value: string) => {
    setDeadlineReminder(value);
  };

  const onSaveChanges = () => {
    console.log('Saving changes:', {
      notificationTypes,
      deadlineReminder,
    });
  };


    const getIcon = (type: string) => {
        switch (type) {
          case 'ComplianceApproved':
            return (
                <Avatar
                    shape="circle"
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={<HiOutlineClipboardCheck />}
                />
            )
          case 'ComplianceRejected':
            return (
                <Avatar
                    shape="circle"
                    className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
                    icon={<HiOutlineBan />}
                />
            )
          case 'ComplianceUpdateRequired':
            return (
                <Avatar
                    shape="circle"
                    className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
                    icon={<HiOutlineCalendar />}
                />
            )
          case 'ComplianceDeadlineReminder':
            return (
                <Avatar
                    shape="circle"
                    className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
                    icon={<HiOutlineBell />}
                />
            )
          case 'NewComplianceAdded':
            return (
                <Avatar
                    shape="circle"
                    className="bg-purple-100 text-purple-600 dark:bg-yellow-500/20 dark:text-yellow-100"
                    icon={<HiOutlinePlusCircle />}
                />
            )
            case 'PolicyUpdate':
                return (
                  <Avatar
                    shape="circle"
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiOutlineDocumentText />}
                  />
                )
              case 'AuditNotification':
                return (
                  <Avatar
                    shape="circle"
                    className="bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-100"
                    icon={<HiOutlineClipboardList />}
                  />
                )
              case 'ViolationsNotification':
                return (
                  <Avatar
                    shape="circle"
                    className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-100"
                    icon={<HiOutlineExclamationCircle />}
                  />
                )
              case 'CertificationExpirationsNotification':
                return (
                  <Avatar
                    shape="circle"
                    className="bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-100"
                    icon={<HiOutlineBadgeCheck />}
                  />
            )
          default:
            return null;
        }
      };


      const NotificationPreview = ({ type, isChecked }) => {
        if (!isChecked) return null;
    
        const getMessage = () => {
          switch (type) {
            case 'ComplianceApproved':
              return 'Admin approved Compliance ID: C12345 for Branch XYZ';
            case 'ComplianceRejected':
              return 'Admin rejected Compliance ID: C67890 for Branch ABC';
            case 'ComplianceUpdateRequired':
              return 'You have 5 compliances to be updated by today';
            case 'ComplianceDeadlineReminder':
              return 'Compliance ID: C54321 deadline is approaching';
            case 'NewComplianceAdded':
              return 'New compliance added: Annual Review 2024';
            case 'PolicyUpdate':
              return 'Policy update: New data protection guidelines effective from next month';
            case 'AuditNotification':
              return 'Upcoming compliance audit scheduled for next week';
            case 'ViolationsNotification':
              return 'Alert: Potential compliance violation detected in Department X';
            case 'CertificationExpirationsNotification':
              return 'Your ISO 27001 certification expires in 30 days. Renewal required.';
            default:
              return '';
          }
        };

   

    return (
      <div className="flex items-start space-x-3 p-3 border-b border-gray-200 dark:border-gray-600 mb-2">
        <div className="flex-shrink-0">{getIcon(type)}</div>
        <div>
          <h4 className="text-sm font-semibold">{type.split(/(?=[A-Z])/).join(' ')}</h4>
          <p className="text-xs text-gray-600">{getMessage()}</p>
          <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
        </div>
      </div>
    );
  };


  const EmptyPreviewMessage = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <HiOutlineBell className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-center">
            To see previews of notifications,<br />select one or more notification types.
        </p>
    </div>
);


  return (
   <div className='space-y-8'>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <div className="space-y-8">
            <div className="flex items-center mb-6">
              <Checkbox 
                checked={selectAll} 
                onChange={handleSelectAll}
              />
          <h3 className="text-lg font-semibold text-gray-700">Notification Types:</h3>
             
            </div>
            {Object.entries(notificationTypes).map(([key, value]) => (
              <div key={key} className="flex items-center ml-4">
                <Checkbox 
                  checked={value} 
                  onChange={() => onNotificationTypeChange(key)}
                />
                <label htmlFor={key} className="ml-2 text-gray-600">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Notification Previews:</h3>
          <div className="space-y-2 overflow-y-auto border p-4 rounded-md h-[410px]">
                        {Object.values(notificationTypes).some(value => value) ? (
                            Object.entries(notificationTypes).map(([key, value]) => (
                                <NotificationPreview key={key} type={key} isChecked={value} />
                            ))
                        ) : (
                            <EmptyPreviewMessage />
                        )}
                    </div>
        </div>
      </div>

      <div className='pt-4'>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Compliance Deadline Reminder</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Notify me</span>
          <div>
            <OutlinedInput 
              label={'Enter Days'} 
              value={deadlineReminder} 
              onChange={onDeadlineReminderChange}
            />
          </div>
          <span className="text-gray-600">days before deadline</span>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button variant='solid' className="" onClick={onSaveChanges}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default NotificationContent;