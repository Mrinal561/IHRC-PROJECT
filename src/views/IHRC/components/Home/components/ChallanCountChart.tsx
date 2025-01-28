// import { Card } from '@/components/ui';
import Card from '@/components/ui/Card'
import React from 'react';
import Chart from 'react-apexcharts';

const ChallanCountChart = () => {
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
            name: 'Challan Upload Counts',
            data: [2, 3, 3, 3, 5, 1, 2, 3, 1, 3],
        },
    ];
    const handleMonthChange = (value) => {
        setSelectedMonth(value);
        // Here you could add logic to fetch new data based on the selected month
    };


    return (
        <Card>
             {/* <div className="mb-4 w-48">
                <OutlinedSelect
                    label="Select Month"
                    options={months}
                    value={selectedMonth}
                    onChange={handleMonthChange}
                />
            </div> */}
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
            height={452}
            type="bar"
        />
        </Card>
    );
};

export default ChallanCountChart;