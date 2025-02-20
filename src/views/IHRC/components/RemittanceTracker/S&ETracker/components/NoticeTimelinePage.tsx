
// import React from 'react';
// import Timeline from '@/components/ui/Timeline';
// import Avatar from '@/components/ui/Avatar';
// import Badge from '@/components/ui/Badge';
// import Card from '@/components/ui/Card';
// import Tag from '@/components/ui/Tag';
// import { FileText, AlertCircle, Mail, CheckCircle, File, Plus } from 'lucide-react';
// import { Button } from '@/components/ui';
// import { IoArrowBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';

// const TimelineAvatar = ({ children, ...rest }) => {
//     return (
//         <Avatar {...rest} size={25} shape="circle">
//             {children}
//         </Avatar>
//     );
// };

// const getStatusColor = (status) => {
//     const colors = {
//         open: 'bg-blue-500 rounded text-white',
//         close: 'bg-gray-500 rounded text-white',
//         reopen: 'bg-amber-500 rounded text-white',
//         general: 'bg-green-500 rounded text-white',
//         other: 'bg-purple-500 rounded text-white'
//     };
//     return colors[status] || 'bg-gray-500';
// };

// const getCriticalityIcon = (criticality) => {
//     switch (criticality) {
//         case 'new notice':
//             return <FileText className="w-4 h-4" />;
//         case 'extension letter':
//             return <Mail className="w-4 h-4" />;
//         case 'response letter':
//             return <Mail className="w-4 h-4" />;
//         case 'further notice':
//             return <AlertCircle className="w-4 h-4" />;
//         case 'closure':
//             return <CheckCircle className="w-4 h-4" />;
//         default:
//             return <FileText className="w-4 h-4" />;
//     }
// };

// const NoticeTimelinePage = () => {
//     const navigate = useNavigate();
//     const noticeData = {
//         noticeType: "Safety Compliance",
//         noticeAct: "Workplace Safety Act 2023",
//         referenceNumber: "REF/2024/SC/001",
//         noticeDetails: "Initial notice regarding workplace safety compliance requirements. The company needs to provide documentation for safety measures implemented in the workplace and ensure compliance with updated regulations.",
//         receivedDate: "2024-02-15",
//         currentStatus: "close",
//         document: {
//             name: "Safety_Notice_Document.pdf",
//             url: "#"
//         },
//         responses: [
//             {
//                 replyDetails: "Acknowledged receipt of notice. Initial assessment underway.",
//                 replyDate: "2024-02-16",
//                 status: "open",
//                 criticality: "new notice",
//                 document: {
//                     name: "Initial_Reply.pdf",
//                     url: "#"
//                 },
//                 respondedBy: "John Doe"
//             },
//             {
//                 replyDetails: "Requesting 2-week extension to gather comprehensive safety documentation",
//                 replyDate: "2024-02-20",
//                 status: "general",
//                 criticality: "extension letter",
//                 document: {
//                     name: "Seconf_Reply.pdf",
//                     url: "#"
//                 },
//                 respondedBy: "Jane Smith"
//             },
//             {
//                 replyDetails: "Submitted complete safety documentation and implementation timeline",
//                 replyDate: "2024-02-28",
//                 status: "close",
//                 criticality: "response letter",
//                 document: {
//                     name: "Safety_Documentation.pdf",
//                     url: "#"
//                 },
//                 respondedBy: "Mike Johnson"
//             }
//         ]
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="p-6">
//             {/* Notice History Header */}
//             <div className="flex items-center gap-2 mb-8">
//                 <Button
//                     size="sm"
//                     className="p-2"
//                     variant="plain"
//           icon={<IoArrowBack className="text-gray-500 hover:text-gray-700" />}
//           onClick={() => navigate(-1)}
//                 >
//                 </Button>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                     Notice History
//                 </h1>
//             </div>
            
//             {/* Notice Details Card */}
//             <Card className="mb-8 p-4">
//                 <div className="space-y-4">
//                     <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notice Details</h3>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <p className="text-sm text-gray-500">Notice Type:</p>
//                             <p className="text-gray-900 dark:text-gray-100">{noticeData.noticeType}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-500">Notice Act:</p>
//                             <p className="text-gray-900 dark:text-gray-100">{noticeData.noticeAct}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-500">Notice Reference Number:</p>
//                             <p className="text-gray-900 dark:text-gray-100">{noticeData.referenceNumber}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-500">Notice Received on:</p>
//                             <p className="text-gray-900 dark:text-gray-100">{formatDate(noticeData.receivedDate)}</p>
//                         </div>
//                     </div>

//                     <div>
//                         <p className="text-sm text-gray-500">Notice Details:</p>
//                         <p className="text-gray-600 dark:text-gray-300 mt-1">
//                             {noticeData.noticeDetails}
//                         </p>
//                     </div>

//                     {noticeData.document && (
//                         <div>
//                             <p className="text-sm text-gray-500 mb-2">Attached Document:</p>
//                             <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors">
//                                 <File className="w-4 h-4" />
//                                 <a href={noticeData.document.url} className="hover:underline">
//                                     {noticeData.document.name}
//                                 </a>
//                             </div>
//                         </div>
//                     )}

//                 </div>
//             </Card>

//             {/* Reply Timeline */}
//             <div className="mb-6">
//                 <h2 className="text-lg font-semibold mb-4">Reply History</h2>
//                 <Timeline>
//                     {noticeData.responses.map((response, index) => (
//                         <Timeline.Item
//                             key={index}
//                             media={
//                                 <TimelineAvatar className={getStatusColor(response.status)}>
//                                     {getCriticalityIcon(response.criticality)}
//                                 </TimelineAvatar>
//                             }
//                         >
//                             <div className="my-1">
//                                 <div className="flex items-center mb-2">
//                                     <span className="font-semibold text-gray-900 dark:text-gray-100">
//                                         {response.respondedBy}
//                                     </span>
//                                     <span className="mx-2">has replied on</span>
//                                     <span className="text-gray-600">
//                                         {formatDate(response.replyDate)}
//                                     </span>
//                                     <span className="mx-2">and has set notice status to</span>
//                                     <div className={`${getStatusColor(response.status)} px-1`}>
//                                         {response.status.toUpperCase()}
//                                     </div>
//                                 </div>

//                                 <Card className="mt-2">
//                                     <div className="space-y-4">
//                                         <div>
//                                             <p className="text-gray-600 dark:text-gray-300">{response.replyDetails}</p>
//                                         </div>
                                        
//                                         {response.document && (
//                         <div className="flex items-center space-x-2 pt-2">
//                             <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors">
//                                 <File className="w-4 h-4" />
//                                 <a href={response.document.url} className="hover:underline">
//                                     {response.document.name}
//                                 </a>
//                             </div>
//                         </div>
//                     )}
//                                     </div>
//                                 </Card>
//                             </div>
//                         </Timeline.Item>
//                     ))}
//                 </Timeline>
//             </div>
//             <div className="flex justify-end mt-6">
//             <Button
//                  variant="solid">
//                     <span>Add Reply</span>
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default NoticeTimelinePage;




import React, { useEffect, useState } from 'react';
import Timeline from '@/components/ui/Timeline';
import Avatar from '@/components/ui/Avatar';
import Card from '@/components/ui/Card';
import { FileText, AlertCircle, Mail, CheckCircle, File } from 'lucide-react';
import { Button } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';

interface TimelineResponse {
    replyDetails: string;
    replyDate: string;
    status: string;
    notice_type: string;
    document: {
        name: string;
        url: string;
    };
    respondedBy: string;
}

interface NoticeDetails {
    noticeType: string;
    noticeAct: string;
    referenceNumber: string;
    receivedDate: string;
    noticeDetails: string;
    document: {
        name: string;
        url: string;
    };
}

const TimelineAvatar = ({ children, ...rest }) => {
    return (
        <Avatar {...rest} size={25} shape="circle">
            {children}
        </Avatar>
    );
};

const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower === 'open') {
        return 'bg-red-500 rounded text-white';
    }
    if (statusLower === 'close') {
        return 'bg-green-500 rounded text-white';
    }
    // Any other status (including reopen, etc) will be amber
    return 'bg-amber-500 rounded text-white';
};

const getCriticalityIcon = (criticality: string) => {
    switch (criticality) {
        case 'new notice':
            return <FileText className="w-4 h-4" />;
        case 'extension letter':
            return <Mail className="w-4 h-4" />;
        case 'response letter':
            return <Mail className="w-4 h-4" />;
        case 'further notice':
            return <AlertCircle className="w-4 h-4" />;
        case 'closure':
            return <CheckCircle className="w-4 h-4" />;
        default:
            return <FileText className="w-4 h-4" />;
    }
};

const NoticeTimelinePage = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const noticeId = location.state?.noticeId;    const [timelineData, setTimelineData] = useState<TimelineResponse[]>([]);
    const [noticeData, setNoticeData] = useState<NoticeDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const baseUrl =  `${import.meta.env.VITE_API_GATEWAY}`

    useEffect(() => {
        if (!noticeId) {
          navigate('/notice-tracker', { replace: true });
          return;
        }
      }, [noticeId, navigate]);


    useEffect(() => {
        const fetchTimelineData = async () => {
            try {
                const response = await httpClient.get(endpoints.noticeTracker.timeline(noticeId));
                const transformedData = transformTimelineData(response.data);
                setTimelineData(transformedData);

                // Extract notice details from the first item in the timeline data
                if (response.data.length > 0 && response.data[0].type === 'NOTICE_CREATED') {
                    const notice = response.data[0];
                    setNoticeData({
                        noticeType: notice.data.notice_type,
                        noticeAct: notice.data.related_act,
                        referenceNumber: notice.data.reference_number,
                        receivedDate: notice.data.notice_date,
                        noticeDetails: notice.data.notice_detail,
                        document: {
                            name: notice.data.document.split('/').pop(),
                           url: `${baseUrl}/${notice.data.document}`
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to fetch timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineData();
    }, [noticeId]);

    const transformTimelineData = (data: any[]): TimelineResponse[] => {
        return data.map((item) => {
          
             if (item.type === 'NOTICE_REPLY') {
                return {
                    replyDetails: item.data.reply_text,
                    replyDate: item.date,
                    status: item.data.status.toLowerCase(),
                    notice_type: item.data.notice_type.toLowerCase(),
                    document: {
                        name: item.data.documents[0].split('/').pop(),
                       url: `${baseUrl}/${item.data.documents[0]}`
                    },
                    respondedBy: item.user.name
                };
            }
            return null;
        }).filter(Boolean) as TimelineResponse[];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            {/* Notice History Header */}
            <div className="flex items-center gap-2 mb-8">
                <Button
                    size="sm"
                    className="p-2"
                    variant="plain"
                    icon={<IoArrowBack className="text-gray-500 hover:text-gray-700" />}
                    onClick={() => navigate(-1)}
                >
                </Button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Notice History
                </h1>
            </div>

            {/* Notice Details Card */}
            {noticeData && (
                <Card className="mb-8 p-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notice Details</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Notice Type:</p>
                                <p className="text-gray-900 dark:text-gray-100">{noticeData.noticeType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Notice Act:</p>
                                <p className="text-gray-900 dark:text-gray-100">{noticeData.noticeAct}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Notice Reference Number:</p>
                                <p className="text-gray-900 dark:text-gray-100">{noticeData.referenceNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Notice Received on:</p>
                                <p className="text-gray-900 dark:text-gray-100">{formatDate(noticeData.receivedDate)}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Notice Details:</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {noticeData.noticeDetails}
                            </p>
                        </div>

                        {noticeData.document && (
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Attached Document:</p>
                                <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors">
                                    <File className="w-4 h-4" />
                                    <a href={noticeData.document.url} target="_blank" className="hover:underline">
                                        {noticeData.document.name}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            )}

            {/* Reply Timeline */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Reply History</h2>
                {timelineData.length > 0 ? (

                <Timeline>
                    {timelineData.map((response, index) => (
                        <Timeline.Item
                            key={index}
                            media={
                                <TimelineAvatar className={getStatusColor(response.status)}>
                                    {getCriticalityIcon(response.notice_type)}
                                </TimelineAvatar>
                            }
                        >
                            <div className="my-1">
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                        {response.respondedBy === "" ? "Admin" : response.respondedBy}
                                        
                                    </span>
                                    <span className="mx-2">has replied on</span>
                                    <span className="text-gray-600">
                                        {formatDate(response.replyDate)}
                                    </span>
                                    <span className="mx-2">and has set notice status to</span>
                                    <div className={`${getStatusColor(response.status)} px-1`}>
                                        {response.status.toUpperCase()}
                                    </div>
                                </div>

                                <Card className="mt-2">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-gray-600 dark:text-gray-300">{response.replyDetails}</p>
                                        </div>
                                        
                                        {response.document && (
                                            <div className="flex items-center space-x-2 pt-2">
                                                <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors">
                                                    <File className="w-4 h-4" />
                                                    <a href={response.document.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                        {response.document.name}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        </Timeline.Item>
                    ))}
                </Timeline>
                ): (
                    <Card className="p-6">
            <div className="flex flex-col items-center justify-center text-center">
                <FileText className="w-12 h-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                    No Replies Yet
                </h3>
                <p className="text-gray-500">
                    This notice hasn't received any replies. Click 'Add Reply' to be the first to respond.
                </p>
            </div>
        </Card>
                )}
            </div>
            <div className="flex justify-end mt-6">
            <Button 
    variant="solid" 
    onClick={() => navigate('/notice-tracker/response', {
        state: { noticeId: noticeId }
    })}
>
                    <span>Add Reply</span>
                </Button>
            </div>
        </div>
    );
};

export default NoticeTimelinePage;