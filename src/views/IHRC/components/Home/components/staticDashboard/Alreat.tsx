import React, { useEffect, useRef } from 'react'
import Timeline from '@/components/ui/Timeline'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import { AlertCircle, FileText } from 'lucide-react'

const TimelineAvatar = ({ children, ...rest }) => {
    return (
        <Avatar {...rest} size={25} shape="circle">
            {children}
        </Avatar>
    )
}

const Alerts = () => {
    const scrollRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                if (
                    Math.ceil(
                        scrollRef.current.scrollTop +
                            scrollRef.current.clientHeight,
                    ) >= scrollRef.current.scrollHeight
                ) {
                    setTimeout(() => {
                        scrollRef.current.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }, 2000)
                } else {
                    scrollRef.current.scrollBy({ top: 50, behavior: 'smooth' })
                }
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="max-w-[700px] h-[300px] overflow-y-auto"
            ref={scrollRef}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Alerts
                </h2>
                <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                    View All
                </button>
            </div>
            <Timeline>
                {[...Array(5)].map((_, index) => (
                    <Timeline.Item
                        key={index}
                        media={
                            <TimelineAvatar className="bg-amber-500 text-white">
                                <FileText size={14} />
                            </TimelineAvatar>
                        }
                    >
                        <p className="my-1 flex items-center">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                E-Sign Status
                            </span>
                            <span className="mx-2">-</span>
                            <span>E-Sign inactive of Subham on PF portal</span>
                            {index === 0 && (
                                <Tag className="ml-3 rtl:mr-3 bg-red-100 text-red-600">
                                    Urgent
                                </Tag>
                            )}
                        </p>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    )
}

export default Alerts
