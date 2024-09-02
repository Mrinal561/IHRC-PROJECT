import React, { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Calendar from '@/components/ui/Calendar'

type ComplianceDeadline = {
    date: string
    description: string
}

type ScheduleProps = {
    data?: ComplianceDeadline[]
}

const isToday = (someDate: Date) => {
    const today = new Date()
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    )
}

const Schedule = ({ data = [] }: ScheduleProps) => {
    const [currentMonthData, setCurrentMonthData] = useState<ComplianceDeadline[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    useEffect(() => {
        const today = new Date()
        const currentMonth = today.getMonth() + 1
        const currentYear = today.getFullYear()

        const filteredData = data.filter((deadline) => {
            const deadlineDate = new Date(deadline.date)
            return (
                deadlineDate.getMonth() + 1 === currentMonth &&
                deadlineDate.getFullYear() === currentYear
            )
        })

        setCurrentMonthData(filteredData)
    }, [data])

    const isDeadlineDate = (date: Date) => {
        return currentMonthData.some((deadline) => {
            const deadlineDate = new Date(deadline.date)
            return (
                deadlineDate.getDate() === date.getDate() &&
                deadlineDate.getMonth() === date.getMonth() &&
                deadlineDate.getFullYear() === date.getFullYear()
            )
        })
    }

    return (
        <Card className="">
            <div className="mx-auto max-w-[420px]">
                <Calendar
                    value={selectedDate}
                    dayClassName={(date, { selected }) => {
                        const defaultClass = 'text-base'

                        if (isToday(date) && !selected) {
                            return 'text-red-500' // Customize the color for today's date
                        }

                        if (isDeadlineDate(date)) {
                            return 'font-bold' // Customize the color for deadline dates
                        }

                        if (selected) {
                            return 'text-white'
                        }

                        return defaultClass
                    }}
                    dayStyle={() => ({ height: 48 })}
                    renderDay={(date) => {
                        const day = date.getDate()
                        const hasDeadline = isDeadlineDate(date)

                        return (
                            <span className="relative flex justify-center items-center w-full h-full">
                                {day}
                                {hasDeadline && (
                                    <div className="absolute bottom-1 h-2 w-2 bg-red-600 rounded-full" />
                                )}
                            </span>
                        )
                    }}
                    onChange={(val) => setSelectedDate(val)}
                />
            </div>
            <hr className="my-6" />
            <h6 className="mb-4">Compliance Deadlines for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h6>
            <div className='h-72 overflow-y-auto'>
                {currentMonthData.length > 0 ? (
                    currentMonthData.map((event, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-md mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600/40 cursor-pointer user-select"
                        >
                            <div>
                                <h6 className="text-sm font-semibold">
                                    {new Date(event.date).toLocaleDateString()}
                                </h6>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No compliance deadlines for this month.</p>
                )}
            </div>
        </Card>
    )
}

export default Schedule
