
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from '@/components/ui/card';

const PaymentDatesChart = () => {
    const data = [
        {
            name: 'Due Date',
            data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
        },
        {
            name: 'Actual Payment Date',
            data: [2, 10, 24, 15, 15, 15, 12, 31, 15, 14]
        }
    ];

    const categories = [
        'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 
        'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25'
    ];

    return (
        <Card className="p-6">
            <div className="mb-4">
                <h4 className="font-bold text-lg">Payment Dates Comparison</h4>
            </div>
            <Chart
                options={{
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: true
                        }
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    colors: ['#2563eb', '#dc2626'],
                    xaxis: {
                        categories: categories,
                        labels: {
                            rotate: -45,
                            style: {
                                fontSize: '12px'
                            }
                        }
                    },
                    yaxis: {
                        min: 0,
                        max: 31,
                        tickAmount: 5,
                        labels: {
                            formatter: (value) => Math.round(value)
                        }
                    },
                    legend: {
                        position: 'bottom',
                        horizontalAlign: 'center',
                        floating: false,
                        offsetY: 8
                    },
                    grid: {
                        borderColor: '#f3f4f6',
                        row: {
                            colors: ['transparent', 'transparent'],
                            opacity: 0.5
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (value) => `Day ${Math.round(value)}`
                        }
                    }
                }}
                series={data}
                height={350}
                type="line"
            />
        </Card>
    );
};

export default PaymentDatesChart;