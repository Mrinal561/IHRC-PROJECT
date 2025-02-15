import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS, COLORS_LIGHT } from '@/constants/chart.constant'

const ComplinceStatus = ({
    year = '2024',
    Complied = 2150,
    Not_Complied = 40,
    CompliedwithDelay = 80,
    Not_Applicable = 500,
}) => {
    const totalAmount =
        Complied + Not_Complied + CompliedwithDelay + Not_Applicable

    // Data series and labels
    const series = [Complied, Not_Complied, CompliedwithDelay, Not_Applicable]
    const labels = [
        'Complied',
        'Not Complied',
        'Complied with Delay',
        'Not Applicable',
    ]

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">
                Compliance Status {year}
            </h2>
            <Chart
                options={{
                    colors: COLORS,
                    labels: labels,
                    legend: {
                        position: 'bottom',
                        formatter: function (val, opts) {
                            const percent =
                                (opts.w.globals.series[opts.seriesIndex] /
                                    totalAmount) *
                                100
                            return `${val}: ${percent.toFixed(1)}%`
                        },
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                },
                            },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val.toFixed(1) + '%'
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val.toLocaleString()
                            },
                        },
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 380,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={series}
                height={350}
                type="donut"
            />
            <div className="grid grid-cols-3 gap-6 mt-4 text-center">
                {labels.map((label, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className="font-semibold text-lg">
                            {series[index].toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ComplinceStatus
