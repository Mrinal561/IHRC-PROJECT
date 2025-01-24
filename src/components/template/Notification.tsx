// import { useEffect, useState, useCallback } from 'react'
// import classNames from 'classnames'
// import withHeaderItem from '@/utils/hoc/withHeaderItem'
// import Avatar from '@/components/ui/Avatar'
// import Dropdown from '@/components/ui/Dropdown'
// import ScrollBar from '@/components/ui/ScrollBar'
// import Spinner from '@/components/ui/Spinner'
// import Badge from '@/components/ui/Badge'
// import Button from '@/components/ui/Button'
// import Tooltip from '@/components/ui/Tooltip'
// import {
//     HiOutlineBell,
//     HiOutlineCalendar,
//     HiOutlineClipboardCheck,
//     HiOutlineBan,
//     HiOutlineMailOpen,
//     HiOutlineExclamation,
//     HiOutlinePlusCircle
// } from 'react-icons/hi'
// import { Link } from 'react-router-dom'
// import isLastChild from '@/utils/isLastChild'
// import useTwColorByName from '@/utils/hooks/useTwColorByName'
// import useThemeClass from '@/utils/hooks/useThemeClass'
// import { useAppSelector } from '@/store'
// import useResponsive from '@/utils/hooks/useResponsive'
// import acronym from '@/utils/acronym'

// type NotificationList = {
//     id: string
//     title: string
//     description: string
//     date: string
//     type: 'approval' | 'rejection' | 'update' | 'reminder' | 'added'
//     readed: boolean
// }

// const notificationHeight = 'h-72'

// const NotificationToggle = ({
//     className,
//     dot,
//     count
// }: {
//     className?: string
//     dot: boolean
//     count: number
// }) => {
//     return (
//         <div className={classNames('text-2xl', className)}>
//             {dot ? (
//                 <Badge badgeStyle={{ top: '3px', right: '6px' }} content={count}>
//                     <HiOutlineBell />
//                 </Badge>
//             ) : (
//                 <HiOutlineBell />
//             )}
//         </div>
//     )
// }

// const notificationTypeAvatar = (type: string) => {
//     switch (type) {
//         case 'approval':
//             return (
//                 <Avatar
//                     shape="circle"
//                     className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
//                     icon={<HiOutlineClipboardCheck />}
//                 />
//             )
//         case 'rejection':
//             return (
//                 <Avatar
//                     shape="circle"
//                     className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
//                     icon={<HiOutlineBan />}
//                 />
//             )
//         case 'update':
//             return (
//                 <Avatar
//                     shape="circle"
//                     className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
//                     icon={<HiOutlineCalendar />}
//                 />
//             )
//         case 'reminder':
//             return (
//                 <Avatar
//                     shape="circle"
//                     className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
//                     icon={<HiOutlineBell />}
//                 />
//             )
//         case 'added':
//             return (
//                 <Avatar
//                     shape="circle"
//                     className="bg-purple-100 text-purple-600 dark:bg-yellow-500/20 dark:text-yellow-100"
//                     icon={<HiOutlinePlusCircle />}
//                 />
//             )
//         default:
//             return <Avatar shape="circle" icon={<HiOutlineBell />} />
//     }
// }

// const _Notification = ({ className, notificationData }: { className?: string, notificationData: any[] }) => {
//     const [notificationList, setNotificationList] = useState<NotificationList[]>([])
//     const [unreadNotification, setUnreadNotification] = useState(false)
//     const [unreadCount, setUnreadCount] = useState(0)
//     const [noResult] = useState(false)
//     // const [loading] = useState(false)
//     const [loading, setLoading] = useState(true)

//     const { bgTheme } = useThemeClass()

//     const { larger } = useResponsive()

//     const direction = useAppSelector((state) => state.theme.direction)

//     useEffect(() => {
//         console.log(notificationData)
//         if (notificationData && notificationData.length > 0) {
//             // Convert API data to notification format
//             const formattedNotifications = notificationData.map(item => ({
//                 id: item.id,
//                 title: item.title,
//                 description: item.description,
//                 date: item.date,
//                 type: item.type || 'update',
//                 readed: false
//             }));
//             setNotificationList(formattedNotifications);
//             updateUnreadStatus(formattedNotifications);
//             setLoading(false);
//         } else {
//             setLoading(false);
//         }
//     }, [notificationData]);

//     const dummyNotifications: NotificationList[] = [
//         {
//             id: '1',
//             title: 'Compliance Approved',
//             description: 'Admin approved Compliance ID: C12345 for Muzaffarpur Branch',
//             date: '1 hour ago',
//             type: 'approval',
//             readed: false
//         },
//         {
//             id: '2',
//             title: 'Compliance Rejected',
//             description: 'Admin rejected Compliance ID: C67890 for samastipur Branch',
//             date: '2 hours ago',
//             type: 'rejection',
//             readed: false
//         },
//         {
//             id: '3',
//             title: 'Compliance Update Required',
//             description: 'You have 170 compliances to be updated by today',
//             date: 'Today',
//             type: 'update',
//             readed: false
//         },
//         {
//             id: '4',
//             title: 'Compliance Deadline Reminder',
//             description: 'Reminder: 50 compliances are due in the next 48 hours',
//             date: 'Yesterday',
//             type: 'reminder',
//             readed: true
//         },
//         {
//             id: '5',
//             title: 'New Compliance Added',
//             description: 'A new compliance (ID: C13579) has been added for Begusarai',
//             date: '3 days ago',
//             type: 'added',
//             readed: true
//         },
//     ]

//     useEffect(() => {
//         setNotificationList(dummyNotifications)
//         updateUnreadStatus(dummyNotifications)
//     }, [])

//     const updateUnreadStatus = (notifications: NotificationList[]) => {
//         const unreadNotifications = notifications.filter(item => !item.readed)
//         setUnreadNotification(unreadNotifications.length > 0)
//         setUnreadCount(unreadNotifications.length)
//     }

//     const onNotificationOpen = async () => {
//         // In a real scenario, you'd fetch notifications here
//         // For now, we'll just use our dummy data
//     }

//     const onMarkAllAsRead = useCallback(() => {
//         const updatedList = notificationList.map((item: NotificationList) => ({
//             ...item,
//             readed: true
//         }))
//         setNotificationList(updatedList)
//         updateUnreadStatus(updatedList)
//     }, [notificationList])

//     const onMarkAsRead = useCallback(
//         (id: string) => {
//             const updatedList = notificationList.map((item) => 
//                 item.id === id ? { ...item, readed: true } : item
//             )
//             setNotificationList(updatedList)
//             updateUnreadStatus(updatedList)
//         },
//         [notificationList]
//     )

//     return (
//         <Dropdown
//             renderTitle={
//                 <NotificationToggle
//                     dot={unreadNotification}
//                     count={unreadCount}
//                     className={className}
//                 />
//             }
//             menuClass="p-0 min-w-[280px] md:min-w-[340px]"
//             placement={larger.md ? 'bottom-end' : 'bottom-center'}
//             onOpen={onNotificationOpen}
//         >
//             <Dropdown.Item variant="header">
//                 <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
//                     <h6>Notifications ({unreadCount})</h6>
//                     <Tooltip title="Mark all as read">
//                         <Button
//                             variant="plain"
//                             shape="circle"
//                             size="sm"
//                             icon={<HiOutlineMailOpen className="text-xl" />}
//                             onClick={onMarkAllAsRead}
//                         />
//                     </Tooltip>
//                 </div>
//             </Dropdown.Item>
//             <div className={classNames('overflow-y-auto', notificationHeight)}>
//                 <ScrollBar direction={direction}>
//                     {notificationList.length > 0 &&
//                         notificationList.map((item, index) => (
//                             <div
//                                 key={item.id}
//                                 className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
//                                     !isLastChild(notificationList, index)
//                                         ? 'border-b border-gray-200 dark:border-gray-600'
//                                         : ''
//                                 }`}
//                                 onClick={() => onMarkAsRead(item.id)}
//                             >
//                                 <div>{notificationTypeAvatar(item.type)}</div>
//                                 <div className="ltr:ml-3 rtl:mr-3 w-full">
//                                     <div>
//                                         <span className="font-semibold heading-text">
//                                             {item.title}
//                                         </span>
//                                     </div>
//                                     <p className="mb-1 text-xs">{item.description}</p>
//                                     <span className="text-xs">{item.date}</span>
//                                 </div>
//                                 <Badge
//                                     className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
//                                     innerClass={`${
//                                         item.readed ? 'bg-gray-300' : bgTheme
//                                     } `}
//                                 />
//                             </div>
//                         ))}
//                     {loading && (
//                         <div
//                             className={classNames(
//                                 'flex items-center justify-center',
//                                 notificationHeight
//                             )}
//                         >
//                             <Spinner size={40} />
//                         </div>
//                     )}
//                     {noResult && (
//                         <div
//                             className={classNames(
//                                 'flex items-center justify-center',
//                                 notificationHeight
//                             )}
//                         >
//                             <div className="text-center">
//                                 <img
//                                     className="mx-auto mb-2 max-w-[150px]"
//                                     src="/img/others/no-notification.png"
//                                     alt="no-notification"
//                                 />
//                                 <h6 className="font-semibold">
//                                     No notifications!
//                                 </h6>
//                                 <p className="mt-1">You're all caught up!</p>
//                             </div>
//                         </div>
//                     )}
//                 </ScrollBar>
//             </div>
//             <Dropdown.Item variant="header">
//                 <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
//                     <Link
//                         to="/app/account/activity-log"
//                         className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
//                     >
//                         View All Notifications
//                     </Link>
//                 </div>
//             </Dropdown.Item>
//         </Dropdown>
//     )
// }

// const Notification = withHeaderItem(_Notification)

// export default Notification

// import { useEffect, useState, useCallback } from 'react'
// import classNames from 'classnames'
// import withHeaderItem from '@/utils/hoc/withHeaderItem'
// import Avatar from '@/components/ui/Avatar'
// import Dropdown from '@/components/ui/Dropdown'
// import ScrollBar from '@/components/ui/ScrollBar'
// import Spinner from '@/components/ui/Spinner'
// import Badge from '@/components/ui/Badge'
// import Button from '@/components/ui/Button'
// import Tooltip from '@/components/ui/Tooltip'
// import {
//     HiOutlineBell,
//     HiOutlineMailOpen,
// } from 'react-icons/hi'
// import { Link } from 'react-router-dom'
// import isLastChild from '@/utils/isLastChild'
// import useThemeClass from '@/utils/hooks/useThemeClass'
// import store, { useAppSelector } from '@/store'
// import useResponsive from '@/utils/hooks/useResponsive'

// type NotificationList = {
//     id: string | number
//     title: string
//     content: string
//     date: string
//     type: 'reminder'
//     is_read: boolean
//     due_date: string
//     module_reference: string    // Added for PF code
//     company_name: string 
// }

// const notificationHeight = 'h-72'

// const NotificationToggle = ({
//     className,
//     dot,
//     count
// }: {
//     className?: string
//     dot: boolean
//     count: number
// }) => {
//     return (
//         <div className={classNames('text-2xl', className)}>
//             {dot ? (
//                 <Badge badgeStyle={{ top: '3px', right: '6px' }} content={count}>
//                     <HiOutlineBell />
//                 </Badge>
//             ) : (
//                 <HiOutlineBell />
//             )}
//         </div>
//     )
// }

// const notificationTypeAvatar = () => {
//     // Since all notifications are reminders
//     return (
//         <Avatar
//             shape="circle"
//             className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
//             icon={<HiOutlineBell />}
//         />
//     )
// }
// const {login} = store.getState();

// const replaceTemplateVariables = (content: string, data: any) => {
//     return content
//         .replace('{{pfCode}}', data.module_reference)
//         .replace('{{companyName}}', data.Company?.name || 'N/A')
//         .replace('{{dueDate}}', new Date(data.due_date).toLocaleDateString())
//         .replace('{{adminName}}', login.user?.user.name || 'Admin')
//         .replace('{{daysLeft}}', calculateDaysLeft(data.due_date));
// }

// // Add this helper function to calculate days remaining
// const calculateDaysLeft = (dueDate: string) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffTime = due.getTime() - today.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays.toString();
// }

// const _Notification = ({ className, notificationData }: { className?: string, notificationData: any[] }) => {
//     const [notificationList, setNotificationList] = useState<NotificationList[]>([])
//     const [unreadNotification, setUnreadNotification] = useState(false)
//     const [unreadCount, setUnreadCount] = useState(0)
//     const [loading, setLoading] = useState(true)

//     const { bgTheme } = useThemeClass()
//     const { larger } = useResponsive()
//     const direction = useAppSelector((state) => state.theme.direction)

//     useEffect(() => {
//         console.log(login);
//         if (notificationData && notificationData.length > 0) {
//             // Convert API data to notification format
//             const formattedNotifications = notificationData.map(item => ({
//                 id: item.id,
//                 title: item.title,
//                 content: replaceTemplateVariables(item.content, item),
//                 date: new Date(item.created_at).toLocaleString(),
//                 type: 'reminder' as const,
//                 is_read: item.is_read,
//                 due_date: new Date(item.due_date).toLocaleDateString(),
//                 module_reference: item.module_reference,  // Added
//     company_name: item.Company?.name || 'N/A'
//             }));
//             setNotificationList(formattedNotifications);
//             updateUnreadStatus(formattedNotifications);
//             setLoading(false);
//         } else {
//             setLoading(false);
//         }
//     }, [notificationData]);

//     const updateUnreadStatus = (notifications: NotificationList[]) => {
//         const unreadNotifications = notifications.filter(item => !item.is_read)
//         setUnreadNotification(unreadNotifications.length > 0)
//         setUnreadCount(unreadNotifications.length)
//     }

//     const onNotificationOpen = async () => {
//         // API call to fetch notifications can be added here
//     }

//     const onMarkAllAsRead = useCallback(() => {
//         const updatedList = notificationList.map((item: NotificationList) => ({
//             ...item,
//             is_read: true
//         }))
//         setNotificationList(updatedList)
//         updateUnreadStatus(updatedList)
//         // need to add API call to update read status in backend
//     }, [notificationList])

//     const onMarkAsRead = useCallback(
//         (id: string | number) => {
//             const updatedList = notificationList.map((item) => 
//                 item.id === id ? { ...item, is_read: true } : item
//             )
//             setNotificationList(updatedList)
//             updateUnreadStatus(updatedList)
//             //need to add API call to update read status in backend
//         },
//         [notificationList]
//     )

//     return (
//         <Dropdown
//             renderTitle={
//                 <NotificationToggle
//                     dot={unreadNotification}
//                     count={unreadCount}
//                     className={className}
//                 />
//             }
//             menuClass="p-0 min-w-[280px] md:min-w-[340px]"
//             placement={larger.md ? 'bottom-end' : 'bottom-center'}
//             onOpen={onNotificationOpen}
//         >
//             <Dropdown.Item variant="header">
//                 <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
//                     <h6>Notifications ({unreadCount})</h6>
//                     <Tooltip title="Mark all as read">
//                         <Button
//                             variant="plain"
//                             shape="circle"
//                             size="sm"
//                             icon={<HiOutlineMailOpen className="text-xl" />}
//                             onClick={onMarkAllAsRead}
//                         />
//                     </Tooltip>
//                 </div>
//             </Dropdown.Item>
//             <div className={classNames('overflow-y-auto', notificationHeight)}>
//                 <ScrollBar direction={direction}>
//                     {notificationList.length > 0 ? (
//                         notificationList.map((item, index) => (
//                             <div
//                                 key={item.id}
//                                 className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
//                                     !isLastChild(notificationList, index)
//                                         ? 'border-b border-gray-200 dark:border-gray-600'
//                                         : ''
//                                 }`}
//                                 onClick={() => onMarkAsRead(item.id)}
//                             >
//                                 <div>{notificationTypeAvatar()}</div>
//                                 <div className="ltr:ml-3 rtl:mr-3 w-full">
//                                     <div>
//                                         <span className="font-semibold heading-text">
//                                             {item.title}
//                                         </span>
//                                     </div>
//                                     <p className="mb-1 text-xs">{item.content}</p>
//                                     <div className="flex flex-wrap gap-2 text-xs">
//                                         <span className="font-medium">PF Code: {item.module_reference}</span>
//                                         <span className="font-medium">Company: {item.company_name}</span>
//                                     </div>
//                                     <div className="mt-1 flex flex-wrap gap-2 text-xs">
//                                         {/* <span>Created: {item.date}</span> */}
//                                         <span className="text-red-500">Due: {item.due_date}</span>
//                                     </div>
//                                 </div>
//                                 <Badge
//                                     className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
//                                     innerClass={`${
//                                         item.is_read ? 'bg-gray-300' : bgTheme
//                                     } `}
//                                 />
//                             </div>
//                         ))
//                     ) : !loading ? (
//                         <div
//                             className={classNames(
//                                 'flex items-center justify-center',
//                                 notificationHeight
//                             )}
//                         >
//                             <div className="text-center">
//                                 <h6 className="font-semibold">
//                                     No notifications!
//                                 </h6>
//                                 <p className="mt-1">You're all caught up!</p>
//                             </div>
//                         </div>
//                     ) : null}
//                     {loading && (
//                         <div
//                             className={classNames(
//                                 'flex items-center justify-center',
//                                 notificationHeight
//                             )}
//                         >
//                             <Spinner size={40} />
//                         </div>
//                     )}
//                 </ScrollBar>
//             </div>
//             <Dropdown.Item variant="header">
//                 <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
//                     <Link
//                         to="/all-notification"
//                         className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
//                     >
//                         View All Notifications
//                     </Link>
//                 </div>
//             </Dropdown.Item>
//         </Dropdown>
//     )
// }

// const Notification = withHeaderItem(_Notification)

// export default Notification


import { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import ScrollBar from '@/components/ui/ScrollBar'
import Spinner from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import {
    HiOutlineBell,
    HiOutlineMailOpen,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import isLastChild from '@/utils/isLastChild'
import useThemeClass from '@/utils/hooks/useThemeClass'
import store, { useAppSelector } from '@/store'
import useResponsive from '@/utils/hooks/useResponsive'
import { useDispatch } from 'react-redux'
import { markNotificationAsRead } from '@/store/slices/notification/notificationSlice'

type NotificationList = {
    id: string | number
    title: string
    content: string
    date: string
    type: 'reminder'
    is_read: boolean
    due_date: string
    module_reference: string
    company_name: string 
}

const notificationHeight = 'h-72'

const NotificationToggle = ({
    className,
    dot,
    count
}: {
    className?: string
    dot: boolean
    count: number
}) => {
    return (
        <div className={classNames('text-2xl', className)}>
            {dot ? (
                <Badge badgeStyle={{ top: '3px', right: '6px' }} content={count}>
                    <HiOutlineBell />
                </Badge>
            ) : (
                <HiOutlineBell />
            )}
        </div>
    )
}

const notificationTypeAvatar = () => {
    return (
        <Avatar
            shape="circle"
            className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
            icon={<HiOutlineBell />}
        />
    )
}

const {login} = store.getState();

const replaceTemplateVariables = (content: string, data: any) => {
    return content
        .replace('{{pfCode}}', data.module_reference)
        .replace('{{companyName}}', data.Company?.name || 'N/A')
        .replace('{{dueDate}}', new Date(data.due_date).toLocaleDateString())
        .replace('{{adminName}}', login.user?.user.name || 'Admin')
        .replace('{{daysLeft}}', calculateDaysLeft(data.due_date));
}

const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
}

const _Notification = ({ className, notificationData }: { className?: string, notificationData: any[] }) => {
    const [notificationList, setNotificationList] = useState<NotificationList[]>([])
    const [unreadNotification, setUnreadNotification] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const { bgTheme } = useThemeClass()
    const { larger } = useResponsive()
    const direction = useAppSelector((state) => state.theme.direction)
    const dispatch = useDispatch()
    const {login} = store.getState();
    const currentUserId = login.user?.user.id;
    useEffect(() => {
        if (notificationData && notificationData.length > 0) {
            // Filter notifications to only include those for the current user
            const userSpecificNotifications = notificationData.filter(item => 
                item.users.some(user => user.id === currentUserId)
            );
    
            const formattedNotifications = userSpecificNotifications.map(item => {
                // Find the read status for the current user
                const userNotification = item.users.find(user => user.id === currentUserId);
                
                return {
                    id: item.id,
                    title: item.title,
                    content: replaceTemplateVariables(item.content, item),
                    date: new Date(item.created_at).toLocaleString(),
                    type: 'reminder' as const,
                    is_read: userNotification ? userNotification.is_read : false,
                    due_date: new Date(item.due_date).toLocaleDateString(),
                    module_reference: item.module_reference,
                    company_name: item.Company?.name || 'N/A'
                };
            });
    
            setNotificationList(formattedNotifications);
            updateUnreadStatus(formattedNotifications);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [notificationData]);

    const updateUnreadStatus = (notifications: NotificationList[]) => {
        const unreadNotifications = notifications.filter(item => !item.is_read)
        setUnreadNotification(unreadNotifications.length > 0)
        setUnreadCount(unreadNotifications.length)
    }

    // const onNotificationOpen = async () => {
    //     // API call to fetch notifications can be added here
    // }

    const onMarkAllAsRead = useCallback(() => {
        const updatedList = notificationList.map((item: NotificationList) => ({
            ...item,
            is_read: true
        }))
        setNotificationList(updatedList)
        updateUnreadStatus(updatedList)
        // need to add API call to update read status in backend
    }, [notificationList])

    const handleNotificationClick = async (notificationId: string | number) => {
        try {
            // Find the notification
            const notification = notificationList.find(n => n.id === notificationId);
            
            // Only mark as read if the notification isn't already read
            if (notification && !notification.is_read) {
                // Dispatch the action to mark as read
                await dispatch(markNotificationAsRead(notificationId));
                
                // Update the local state to reflect the change
                setNotificationList(prevNotifications =>
                    prevNotifications.map(notification =>
                        notification.id === notificationId
                            ? { ...notification, is_read: true }
                            : notification
                    )
                );
                
                // Update the unread status
                updateUnreadStatus(notificationList.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, is_read: true }
                        : notification
                ));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    return (
        <Dropdown
            renderTitle={
                <NotificationToggle
                    dot={unreadNotification}
                    count={unreadCount}
                    className={className}
                />
            }
            menuClass="p-0 min-w-[280px] md:min-w-[340px]"
            placement={larger.md ? 'bottom-end' : 'bottom-center'}
            // onOpen={onNotificationOpen}
        >
            <Dropdown.Item variant="header">
                <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                    <h6>Notifications ({unreadCount})</h6>
                    <Tooltip title="Mark all as read">
                        {/* <Button
                            variant="plain"
                            shape="circle"
                            size="sm"
                            icon={<HiOutlineMailOpen className="text-xl" />}
                            onClick={onMarkAllAsRead}
                        /> */}
                    </Tooltip>
                </div>
            </Dropdown.Item>
            <div className={classNames('overflow-y-auto', notificationHeight)}>
                <ScrollBar direction={direction}>
                    {notificationList.length > 0 ? (
                        notificationList.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
                                    !isLastChild(notificationList, index)
                                        ? 'border-b border-gray-200 dark:border-gray-600'
                                        : ''
                                }`}
                                onClick={() => handleNotificationClick(item.id)}
                            >
                                <div>{notificationTypeAvatar()}</div>
                                <div className="ltr:ml-3 rtl:mr-3 w-full">
                                    <div>
                                        <span className="font-semibold heading-text">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="mb-1 text-xs">{item.content}</p>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="font-medium">PF Code: {item.module_reference}</span>
                                        <span className="font-medium">Company: {item.company_name}</span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                        <span className="text-red-500">Due: {item.due_date}</span>
                                    </div>
                                </div>
                                <Badge
                                    className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
                                    innerClass={`${
                                        item.is_read ? 'bg-gray-300' : bgTheme
                                    } `}
                                />
                            </div>
                        ))
                    ) : !loading ? (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <div className="text-center">
                                <h6 className="font-semibold">
                                    No notifications!
                                </h6>
                                <p className="mt-1">You're all caught up!</p>
                            </div>
                        </div>
                    ) : null}
                    {loading && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <Spinner size={40} />
                        </div>
                    )}
                </ScrollBar>
            </div>
            <Dropdown.Item variant="header">
                <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
                    <Link
                        to="/all-notification"
                        className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                    >
                        View All Notifications
                    </Link>
                </div>
            </Dropdown.Item>
        </Dropdown>
    )
}

const Notification = withHeaderItem(_Notification)

export default Notification