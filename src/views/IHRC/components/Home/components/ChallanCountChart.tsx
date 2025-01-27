import { Card } from '@/components/ui';
import React from 'react';
import Chart from 'react-apexcharts';

const ChallanCountChart = () => {
    const data = [
        {
            name: 'Challan Upload Counts',
            data: [2, 3, 3, 3, 5, 1, 2, 3, 1, 3],
        },
    ];

    return (
        <Card>
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 4,
                    },
                },
                colors: ['#2563eb'], 
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        'Apr-24',
                        'May-24',
                        'Jun-24',
                        'Jul-24',
                        'Aug-24',
                        'Sep-24',
                        'Oct-24',
                        'Nov-24',
                        'Dec-24',
                        'Jan-25'
                    ],
                },
                yaxis: {
                    decimalsInFloat: 0,  // This will remove decimal points
                    min: 0,  // Start from 0
                    forceNiceScale: true,  // This ensures nice round numbers
                    labels: {
                        formatter: (value) => Math.floor(value)  // This ensures whole numbers
                    }
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${Math.floor(val)} uploads`, 
                    },
                },
                title: {
                    text: 'Monthly Challan Upload Counts',
                    align: 'center',
                    style: {
                        fontSize: '16px',
                    },
                },
                grid: {
                    borderColor: '#f3f4f6',
                },
            }}
            series={data}
            height={400}
            type="bar"
        />
        </Card>
    );
};

export default ChallanCountChart;