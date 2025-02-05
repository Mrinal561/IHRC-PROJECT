

import { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import ScrollBar from '@/components/ui/ScrollBar'
import Spinner from '@/components/ui/Spinner'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import {
    HiOutlineBell,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import isLastChild from '@/utils/isLastChild'
import useThemeClass from '@/utils/hooks/useThemeClass'
import store, { useAppSelector } from '@/store'
import useResponsive from '@/utils/hooks/useResponsive'
import { useDispatch } from 'react-redux'
import { markNotificationAsRead } from '@/store/slices/notification/notificationSlice'

type NotificationList = {
    id: number
    title: string
    content: string
    date: string
    type: string
    is_read: boolean
    due_date: string
    module_reference: string
    company_name: string
    module_type: string
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

const notificationTypeAvatar = (type: string) => {
    let className = 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100';
    
    if (type === 'ESI') {
        className = 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100';
    } else if (type === 'PF') {
        className = 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-100';
    }

    return (
        <Avatar
            shape="circle"
            className={className}
            icon={<HiOutlineBell />}
        />
    )
}

const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const _Notification = ({ className, notificationData }: { className?: string, notificationData: any[] }) => {
    const [notificationList, setNotificationList] = useState<NotificationList[]>([])
    const [unreadNotification, setUnreadNotification] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const { bgTheme } = useThemeClass()
    const { larger } = useResponsive()
    const direction = useAppSelector((state) => state.theme.direction)
    const dispatch = useDispatch()

    useEffect(() => {
        if (notificationData && notificationData.length > 0) {
            const formattedNotifications = notificationData.map(item => ({
                id: item.id,
                title: item.title,
                content: item.content,
                date: new Date(item.created_at).toLocaleString(),
                type: item.module_type,
                is_read: false, // Default to unread since new API doesn't provide read status
                due_date: formatDate(item.due_date),
                module_reference: item.module_reference,
                company_name: item.company_name,
                module_type: item.module_type
            }));
    
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

    const onMarkAllAsRead = useCallback(() => {
        const updatedList = notificationList.map((item: NotificationList) => ({
            ...item,
            is_read: true
        }))
        setNotificationList(updatedList)
        updateUnreadStatus(updatedList)
    }, [notificationList])

    const handleNotificationClick = async (notificationId: number) => {
        try {
            const notification = notificationList.find(n => n.id === notificationId);
            
            if (notification && !notification.is_read) {
                await dispatch(markNotificationAsRead(notificationId));
                
                setNotificationList(prevNotifications =>
                    prevNotifications.map(notification =>
                        notification.id === notificationId
                            ? { ...notification, is_read: true }
                            : notification
                    )
                );
                
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
        >
            <Dropdown.Item variant="header">
                <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                    <h6>Notifications ({unreadCount})</h6>
                    <Tooltip title="Mark all as read">
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
                                <div>{notificationTypeAvatar(item.module_type)}</div>
                                <div className="ltr:ml-3 rtl:mr-3 w-full">
                                    <div>
                                        <span className="font-semibold heading-text">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="mb-1 text-xs">{item.content}</p>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="font-medium">{item.module_type} Code: {item.module_reference}</span>
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