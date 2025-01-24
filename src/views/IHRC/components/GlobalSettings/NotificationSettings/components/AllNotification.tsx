
// // import React, { useEffect, useState } from 'react';
// // import { Card } from '@/components/ui';
// // import Avatar from '@/components/ui/Avatar';
// // import Badge from '@/components/ui/Badge';
// // import Spinner from '@/components/ui/Spinner';
// // import { HiOutlineBell } from 'react-icons/hi';
// // import useThemeClass from '@/utils/hooks/useThemeClass';
// // import { useDispatch } from 'react-redux';
// // import { 
// //     fetchAllNotifications,
// //     markNotificationAsRead 
// // } from '@/store/slices/notification/notificationSlice';
// // import store from '@/store';
// // import OutlinedSelect from '@/components/ui/Outlined';

// // // Utility function to calculate days remaining
// // const calculateDaysLeft = (dueDate) => {
// //     const today = new Date();
// //     const due = new Date(dueDate);
// //     const diffTime = due.getTime() - today.getTime();
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// //     return diffDays.toString();
// // };

// // // Utility function to replace template variables
// // const replaceTemplateVariables = (content, data) => {
// //     const { login } = store.getState();
// //     return content
// //         .replace('{{pfCode}}', data.module_reference)
// //         .replace('{{companyName}}', data.Company?.name || 'N/A')
// //         .replace('{{dueDate}}',formatDate(data.due_date))
// //         .replace('{{adminName}}', login.user?.user.name || 'Admin')
// //         .replace('{{daysLeft}}', calculateDaysLeft(data.due_date));
// // };

// // const formatDate = (date) => {
// //     const d = new Date(date);
// //     const day = d.getDate().toString().padStart(2, '0');
// //     const month = (d.getMonth() + 1).toString().padStart(2, '0');
// //     const year = d.getFullYear();
// //     return `${day}/${month}/${year}`;
// // };

// // // Utility function for datetime formatting
// // const formatDateTime = (date) => {
// //     const d = new Date(date);
// //     const day = d.getDate().toString().padStart(2, '0');
// //     const month = (d.getMonth() + 1).toString().padStart(2, '0');
// //     const year = d.getFullYear();
// //     return `${day}/${month}/${year}`;
// // };
// // const {login} = store.getState();

// // const AllNotifications = () => {
// //     const [notifications, setNotifications] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const { bgTheme } = useThemeClass();
// //     const dispatch = useDispatch();
// //     const [filterRead, setFilterRead] = useState(null);
// //     const filterOptions = [
// //         { value: null, label: 'All Notifications' },
// //         { value: true, label: 'Unread' },
// //         { value: false, label: 'Read' }
// //     ];
// //     const id = login?.user.user.id;
// //     useEffect(() => {
// //         fetchNotificationsList();
// //         console.log(id)
// //     }, [filterRead]);

// //     const fetchNotificationsList = async () => {
// //         try {
// //             const response = await dispatch(fetchAllNotifications({
// //                 unmarked: filterRead === true ? 'true' : filterRead === false ? 'false' : undefined
// //             }));
// //             if (response.payload) {
// //                 // Process notifications with template variables
// //                 const processedNotifications = response.payload.map(notification => ({
// //                     ...notification,
// //                     content: replaceTemplateVariables(notification.content, notification),
// //                     company_name: notification.Company?.name || 'N/A',
// //                     days_left: calculateDaysLeft(notification.due_date)
// //                 }));
// //                 setNotifications(processedNotifications);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching notifications:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleNotificationClick = async (notificationId) => {
// //         try {
// //             // Only mark as read if the notification isn't already read
// //             const notification = notifications.find(n => n.id === notificationId);
// //             if (notification && !notification.is_read) {
// //                 await dispatch(markNotificationAsRead(notificationId));
// //                 // Update the local state to reflect the change
// //                 setNotifications(prevNotifications =>
// //                     prevNotifications.map(notification =>
// //                         notification.id === notificationId
// //                             ? { ...notification, is_read: true }
// //                             : notification
// //                     )
// //                 );
// //             }
// //         } catch (error) {
// //             console.error('Error marking notification as read:', error);
// //         }
// //     };

// //     const notificationTypeAvatar = () => {
// //         return (
// //             <Avatar
// //                 shape="circle"
// //                 className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
// //                 icon={<HiOutlineBell />}
// //             />
// //         );
// //     };
// //     const handleFilterChange = (option) => {
// //         setFilterRead(option ? option.value : null);
// //     };

// //     if (loading) {
// //         return (
// //             <div className="flex items-center justify-center min-h-[300px]">
// //                 <Spinner size={40} />
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="container mx-auto px-4 py-8">
// //             <Card>
// //             <div className="mb-6 flex justify-between items-center">
// //                     <h4 className="text-lg font-semibold">All Notifications</h4>
// //                     <div className="w-[200px]">
// //                         <OutlinedSelect
// //                             label="Filter Notifications"
// //                             options={filterOptions}
// //                             value={filterOptions.find(option => option.value === filterRead)}
// //                             onChange={handleFilterChange}
// //                         />
// //                     </div>
// //                 </div>

// //                 <div className="divide-y divide-gray-200 dark:divide-gray-600">
// //                     {notifications.length > 0 ? (
// //                         notifications.map((item) => (
// //                             <div
// //                                 key={item.id}
// //                                 className="relative flex px-4 py-4 hover:bg-gray-50 dark:hover:bg-black dark:hover:bg-opacity-20 cursor-pointer"
// //                                 onClick={() => handleNotificationClick(item.id)}
// //                             >
// //                                 <div>{notificationTypeAvatar()}</div>
// //                                 <div className="ltr:ml-3 rtl:mr-3 w-full">
// //                                     <div>
// //                                         <span className="font-semibold heading-text">
// //                                             {item.title}
// //                                         </span>
// //                                     </div>
// //                                     <p className="mb-1 text-sm">{item.content}</p>
// //                                     {/* <div className="flex flex-wrap gap-2 text-xs">
// //                                         <span className="font-medium">
// //                                             PF Code: {item.module_reference}
// //                                         </span>
// //                                         <span className="font-medium">
// //                                             Company: {item.company_name}
// //                                         </span>
// //                                     </div> */}
// //                                     <div className="mt-1 flex flex-wrap gap-2 text-xs">
// //                                         {/* <span>Created: {new Date(item.created_at).toLocaleString()}</span> */}
// //                                         <span className="text-red-500">
// //                                             Due: {new Date(item.due_date).toLocaleDateString()}
// //                                         </span>
// //                                     </div>
// //                                 </div>
// //                                 <Badge
// //                                     className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
// //                                     innerClass={`${
// //                                         item.is_read ? 'bg-gray-300' : bgTheme
// //                                     }`}
// //                                 />
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <div className="py-8 text-center">
// //                             <h6 className="font-semibold">No notifications!</h6>
// //                             <p className="mt-1">You're all caught up!</p>
// //                         </div>
// //                     )}
// //                 </div>
// //             </Card>
// //         </div>
// //     );
// // };

// // export default AllNotifications;


// import React, { useEffect, useState } from 'react';
// import { Card } from '@/components/ui';
// import Avatar from '@/components/ui/Avatar';
// import Badge from '@/components/ui/Badge';
// import Spinner from '@/components/ui/Spinner';
// import { HiOutlineBell } from 'react-icons/hi';
// import useThemeClass from '@/utils/hooks/useThemeClass';
// import { useDispatch } from 'react-redux';
// import { 
//     fetchAllNotifications,
//     markNotificationAsRead 
// } from '@/store/slices/notification/notificationSlice';
// import store from '@/store';
// import OutlinedSelect from '@/components/ui/Outlined';

// // Utility function to calculate days remaining
// const calculateDaysLeft = (dueDate) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffTime = due.getTime() - today.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays.toString();
// };

// // Utility function to replace template variables
// const replaceTemplateVariables = (content, data) => {
//     const { login } = store.getState();
//     return content
//         .replace('{{pfCode}}', data.module_reference)
//         .replace('{{companyName}}', data.Company?.name || 'N/A')
//         .replace('{{dueDate}}', formatDate(data.due_date))
//         .replace('{{adminName}}', login.user?.user.name || 'Admin')
//         .replace('{{daysLeft}}', calculateDaysLeft(data.due_date));
// };

// const formatDate = (date) => {
//     const d = new Date(date);
//     const day = d.getDate().toString().padStart(2, '0');
//     const month = (d.getMonth() + 1).toString().padStart(2, '0');
//     const year = d.getFullYear();
//     return `${day}/${month}/${year}`;
// };

// const AllNotifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { bgTheme } = useThemeClass();
//     const dispatch = useDispatch();
//     const [filterRead, setFilterRead] = useState(null);
    
//     const { login } = store.getState();
//     const currentUserId = login?.user.user.id;

//     const filterOptions = [
//         { value: null, label: 'All Notifications' },
//         { value: true, label: 'Unread' },
//         { value: false, label: 'Read' }
//     ];

//     useEffect(() => {
//         fetchNotificationsList();
//     }, [filterRead]);

//     const fetchNotificationsList = async () => {
//         try {
//             const response = await dispatch(fetchAllNotifications({
//                 unmarked: filterRead === true ? 'true' : filterRead === false ? 'false' : undefined
//             }));

//             if (response.payload) {
//                 // Process notifications with user-specific read status
//                 const processedNotifications = response.payload
//                     .filter(notification => 
//                         notification.users.some(user => user.id === currentUserId)
//                     )
//                     .map(notification => {
//                         // Find the read status for the current user
//                         const userNotification = notification.users.find(user => user.id === currentUserId);
                        
//                         return {
//                             ...notification,
//                             content: replaceTemplateVariables(notification.content, notification),
//                             company_name: notification.Company?.name || 'N/A',
//                             days_left: calculateDaysLeft(notification.due_date),
//                             is_read: userNotification ? userNotification.is_read : false
//                         };
//                     });

//                 setNotifications(processedNotifications);
//             }
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleNotificationClick = async (notificationId) => {
//         try {
//             // Only mark as read if the notification isn't already read
//             const notification = notifications.find(n => n.id === notificationId);
//             if (notification && !notification.is_read) {
//                 await dispatch(markNotificationAsRead({
//                     notificationId: notificationId,
//                     userId: currentUserId
//                 }));
                
//                 // Update the local state to reflect the change
//                 setNotifications(prevNotifications =>
//                     prevNotifications.map(notification =>
//                         notification.id === notificationId
//                             ? { ...notification, is_read: true }
//                             : notification
//                     )
//                 );
//             }
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//         }
//     };

//     const notificationTypeAvatar = () => (
//         <Avatar
//             shape="circle"
//             className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
//             icon={<HiOutlineBell />}
//         />
//     );

//     const handleFilterChange = (option) => {
//         setFilterRead(option ? option.value : null);
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-[300px]">
//                 <Spinner size={40} />
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <Card>
//                 <div className="mb-6 flex justify-between items-center">
//                     <h4 className="text-lg font-semibold">All Notifications</h4>
//                     <div className="w-[200px]">
//                         <OutlinedSelect
//                             label="Filter Notifications"
//                             options={filterOptions}
//                             value={filterOptions.find(option => option.value === filterRead)}
//                             onChange={handleFilterChange}
//                         />
//                     </div>
//                 </div>

//                 <div className="divide-y divide-gray-200 dark:divide-gray-600">
//                     {notifications.length > 0 ? (
//                         notifications.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="relative flex px-4 py-4 hover:bg-gray-50 dark:hover:bg-black dark:hover:bg-opacity-20 cursor-pointer"
//                                 onClick={() => handleNotificationClick(item.id)}
//                             >
//                                 <div>{notificationTypeAvatar()}</div>
//                                 <div className="ltr:ml-3 rtl:mr-3 w-full">
//                                     <div>
//                                         <span className="font-semibold heading-text">
//                                             {item.title}
//                                         </span>
//                                     </div>
//                                     <p className="mb-1 text-sm">{item.content}</p>
//                                     <div className="mt-1 flex flex-wrap gap-2 text-xs">
//                                         <span className="text-red-500">
//                                             Due: {new Date(item.due_date).toLocaleDateString()}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <Badge
//                                     className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
//                                     innerClass={`${
//                                         item.is_read ? 'bg-gray-300' : bgTheme
//                                     }`}
//                                 />
//                             </div>
//                         ))
//                     ) : (
//                         <div className="py-8 text-center">
//                             <h6 className="font-semibold">No notifications!</h6>
//                             <p className="mt-1">You're all caught up!</p>
//                         </div>
//                     )}
//                 </div>
//             </Card>
//         </div>
//     );
// };

// export default AllNotifications;


import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { HiOutlineBell } from 'react-icons/hi';
import useThemeClass from '@/utils/hooks/useThemeClass';
import { useDispatch } from 'react-redux';
import { 
    fetchAllNotifications,
    markNotificationAsRead 
} from '@/store/slices/notification/notificationSlice';
import store from '@/store';
import OutlinedSelect from '@/components/ui/Outlined';

// Utility function to calculate days remaining
const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
};

// Utility function to replace template variables
const replaceTemplateVariables = (content, data) => {
    const { login } = store.getState();
    return content
        .replace('{{pfCode}}', data.module_reference)
        .replace('{{companyName}}', data.Company?.name || 'N/A')
        .replace('{{dueDate}}', formatDate(data.due_date))
        .replace('{{adminName}}', login.user?.user.name || 'Admin')
        .replace('{{daysLeft}}', calculateDaysLeft(data.due_date));
};

const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const AllNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { bgTheme } = useThemeClass();
    const dispatch = useDispatch();
    const [filterRead, setFilterRead] = useState(null);
    
    const { login } = store.getState();
    const currentUserId = login?.user.user.id;

    const filterOptions = [
        { value: null, label: 'All Notifications' },
        { value: true, label: 'Unread' },
        { value: false, label: 'Read' }
    ];

    useEffect(() => {
        fetchNotificationsList();
    }, [filterRead]);

    const fetchNotificationsList = async () => {
        try {
            const response = await dispatch(fetchAllNotifications({
                unmarked: filterRead === true ? 'true' : filterRead === false ? 'false' : undefined
            }));

            if (response.payload) {
                // Process notifications with user-specific read status
                const processedNotifications = response.payload
                    .filter(notification => 
                        notification.users.some(user => user.id === currentUserId)
                    )
                    .map(notification => {
                        // Find the read status for the current user
                        const userNotification = notification.users.find(user => user.id === currentUserId);
                        
                        return {
                            ...notification,
                            content: replaceTemplateVariables(notification.content, notification),
                            company_name: notification.Company?.name || 'N/A',
                            days_left: calculateDaysLeft(notification.due_date),
                            is_read: userNotification ? userNotification.is_read : false
                        };
                    })
                    // Additional filtering based on read status when 'Unread' or 'Read' is selected
                    .filter(notification => 
                        filterRead === null || 
                        (filterRead === true && !notification.is_read) || 
                        (filterRead === false && notification.is_read)
                    );

                setNotifications(processedNotifications);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationClick = async (notificationId) => {
        try {
            // Only mark as read if the notification isn't already read
            const notification = notifications.find(n => n.id === notificationId);
            if (notification && !notification.is_read) {
                await dispatch(markNotificationAsRead(notificationId));
                
                // Update the local state to reflect the change
                setNotifications(prevNotifications =>
                    prevNotifications.filter(notification =>
                        !(notification.id === notificationId && filterRead === true)
                    )
                );
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const notificationTypeAvatar = () => (
        <Avatar
            shape="circle"
            className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100"
            icon={<HiOutlineBell />}
        />
    );

    const handleFilterChange = (option) => {
        setFilterRead(option ? option.value : null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <Spinner size={40} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <div className="mb-6 flex justify-between items-center">
                    <h4 className="text-lg font-semibold">All Notifications</h4>
                    <div className="w-[200px]">
                        <OutlinedSelect
                            label="Filter Notifications"
                            options={filterOptions}
                            value={filterOptions.find(option => option.value === filterRead)}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-600">
                    {notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div
                                key={item.id}
                                className="relative flex px-4 py-4 hover:bg-gray-50 dark:hover:bg-black dark:hover:bg-opacity-20 cursor-pointer"
                                onClick={() => handleNotificationClick(item.id)}
                            >
                                <div>{notificationTypeAvatar()}</div>
                                <div className="ltr:ml-3 rtl:mr-3 w-full">
                                    <div>
                                        <span className="font-semibold heading-text">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="mb-1 text-sm">{item.content}</p>
                                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                        <span className="text-red-500">
                                            Due: {new Date(item.due_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <Badge
                                    className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
                                    innerClass={`${
                                        item.is_read ? 'bg-gray-300' : bgTheme
                                    }`}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <h6 className="font-semibold">No notifications!</h6>
                            <p className="mt-1">You're all caught up!</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AllNotifications;