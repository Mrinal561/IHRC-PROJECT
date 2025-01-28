import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from '@/constants/chart.constant';
import Card from '@/components/ui/Card';
import OutlinedSelect from '@/components/ui/Outlined';

const ChallanChart = () => {
    const months = [
        { value: 'Apr-24', label: 'April 2024' },
        { value: 'May-24', label: 'May 2024' },
        { value: 'Jun-24', label: 'June 2024' },
        { value: 'Jul-24', label: 'July 2024' },
        { value: 'Aug-24', label: 'August 2024' },
        { value: 'Sep-24', label: 'September 2024' },
        { value: 'Oct-24', label: 'October 2024' },
        { value: 'Nov-24', label: 'November 2024' },
        { value: 'Dec-24', label: 'December 2024' },
        { value: 'Jan-25', label: 'January 2025' },
        { value: 'Feb-25', label: 'February 2025' },
        { value: 'Mar-25', label: 'March 2025' }
    ];
    const defaultMonth = months.find(m => m.value === 'Jan-25');
    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

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
    const handleMonthChange = (value) => {
        setSelectedMonth(value);
        // Here you could add logic to fetch new data based on the selected month
    };

    return (
        <Card>
             <div className="mb-4 w-48">
                <OutlinedSelect
                    label="Select Month"
                    options={months}
                    value={selectedMonth}
                    onChange={handleMonthChange}
                />
            </div>
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