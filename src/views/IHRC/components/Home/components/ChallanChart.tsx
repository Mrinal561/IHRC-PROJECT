import React from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from '@/constants/chart.constant';
import Card from '@/components/ui/Card';

const ChallanChart = () => {
    const data = [
        {
            name: 'Main',
            data: [110000]
        },
        {
            name: 'Arear',
            data: [60000]
        },
        {
            name: 'Damage',
            data: [42000]
        }
    ];

    return (
        <Card>
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '70px',
                        borderRadius: 4,
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toLocaleString();
                    }
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: ['Jan-25'],
                    // title: {
                    //     text: 'Month - Jan-25'
                    // }
                },
                yaxis: {
                    title: {
                        text: 'Challan Amount'
                    },
                    labels: {
                        formatter: function (val) {
                            return val.toLocaleString();
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return '₹' + val.toLocaleString();
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                        horizontalAlign: 'center',
                        floating: false,
                        offsetY: 8,
                        offsetX:15
                },
                title: {
                    text: 'January 2025 Challan Analysis',
                    align: 'center',
                    style: {
                        fontSize: '16px'
                    }
                }
            }}
            series={data}
            height={400}
            type="bar"
        />
        </Card>
    );
};

export default ChallanChart;