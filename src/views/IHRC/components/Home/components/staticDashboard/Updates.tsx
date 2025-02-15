import React from 'react'
import Timeline from '@/components/ui/Timeline'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import { AlertCircle, FileText, Clock, Upload } from 'lucide-react'

const TimelineAvatar = ({ children, ...rest }) => {
    return (
        <Avatar {...rest} size={25} shape="circle">
            {children}
        </Avatar>
    )
}

const Updateds = () => {
    return (
        <div className="max-w-[700px]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Latest Updateds
                </h2>
                <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                    View All
                </button>
            </div>
            <Timeline>
                <Timeline.Item
                // media={
                //     <TimelineAvatar className="bg-blue-500 text-white">
                //         <Upload size={14} />
                //     </TimelineAvatar>
                // }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            10.02/2025
                        </span>
                        <span className="mx-2">-</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.{' '}
                        </span>
                    </p>
                </Timeline.Item>
                <Timeline.Item
                // media={
                //     <TimelineAvatar className="bg-blue-500 text-white">
                //         <Upload size={14} />
                //     </TimelineAvatar>
                // }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            10.02/2025
                        </span>
                        <span className="mx-2">-</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.{' '}
                        </span>
                    </p>
                </Timeline.Item>
                <Timeline.Item
                // media={
                //     <TimelineAvatar className="bg-blue-500 text-white">
                //         <Upload size={14} />
                //     </TimelineAvatar>
                // }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            10.02/2025
                        </span>
                        <span className="mx-2">-</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.{' '}
                        </span>
                    </p>
                </Timeline.Item>
                <Timeline.Item
                // media={
                //     <TimelineAvatar className="bg-blue-500 text-white">
                //         <Upload size={14} />
                //     </TimelineAvatar>
                // }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            10.02/2025
                        </span>
                        <span className="mx-2">-</span>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.{' '}
                        </span>
                    </p>
                </Timeline.Item>
            </Timeline>
        </div>
    )
}

export default Updateds
