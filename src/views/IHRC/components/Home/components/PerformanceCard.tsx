import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Chart from '@/components/shared/Chart'
import { COLORS } from '@/constants/chart.constant'

const PerformanceCard = () => {
    // Dummy data for Complied, Not Complied, and Not Applicable
    const data = {
        labels: ['Complied', 'Not Complied', 'NA', 'Complied with Delay'],
        data: [80, 30, 15, 40], // Example numbers for the categories
    }
    const customColors = ['#2F855A', '#F56565', '#F6E05E', '#676bc5'];

    return (
        <Card>
            <h5 className='font-semibold'>Performance Summary</h5>
            <div className="mt-6">
                {data.data.length > 0 && (
                    <>
                        <Chart
                            donutTitle={300}
                            donutText="Compliances"
                            series={data.data}
                            height={282}
                            customOptions={{ labels: data.labels , colors: customColors,}}
                            type="donut"
                        />
                        <div className="mt-6 pb-1 w-full flex gap-10 justify-center items-center ">
                            {data.labels.map((value, index) => (
                                <div
                                    key={value}
                                    className="flex items-center gap-2"
                                >
                                    <Badge
                                        badgeStyle={{
                                            backgroundColor: customColors[index],
                                        }}
                                    />
                                    <span className="font-semibold">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Card>
    )
}

export default PerformanceCard
