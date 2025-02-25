
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { COLOR_1, COLOR_2, COLOR_5 } from '@/constants/chart.constant';
import OutlinedSelect from '@/components/ui/Outlined/Outlined'

const ComplinceStatus = ({ year = '2024-25', mainTotal = 500000, arrearTotal = 180000, damageTotal = 90000 }) => {
    const totalAmount = mainTotal + arrearTotal + damageTotal;

    const groupOptions = [
                { value: 'jan', label: 'January' },
                { value: 'feb', label: 'February' },
                { value: 'mar', label: 'March' },
                { value: 'apr', label: 'April' },
                { value: 'may', label: 'May' },
                { value: 'jun', label: 'June' },
                { value: 'jul', label: 'July' },
                { value: 'aug', label: 'August' },
                { value: 'sep', label: 'September' },
                { value: 'oct', label: 'October' },
                { value: 'nov', label: 'November' },
                { value: 'dec', label: 'December' }
              ];
            
              // State for selected month
              const [currentGroup, setCurrentGroup] = useState(groupOptions[1].value);
            
              // Handler for dropdown changes
              const handleChange = (setter: Function, field: string) => (option: any) => {
                setter(option.value);
              };

    // Data series and labels
    const series = [mainTotal, arrearTotal, damageTotal];
    const labels = ['Main', 'Arrear', 'Damage'];

    // State for filters
    const [selectedCodeType, setSelectedCodeType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    // Options for the filters
    const codeTypeOptions = [
        { value: 'esi', label: 'ESI' },
        { value: 'pf', label: 'PF' },
        { value: 'pt', label: 'PT' },
        { value: 'lwf', label: 'LWF' },
    ];

    const monthOptions = [
        { value: 'january', label: 'January' },
        { value: 'february', label: 'February' },
        { value: 'march', label: 'March' },
        { value: 'april', label: 'April' },
        { value: 'may', label: 'May' },
        { value: 'june', label: 'June' },
        { value: 'july', label: 'July' },
        { value: 'august', label: 'August' },
        { value: 'september', label: 'September' },
        { value: 'october', label: 'October' },
        { value: 'november', label: 'November' },
        { value: 'december', label: 'December' },
    ];

    // Handlers for filter changes
    const handleCodeTypeChange = (value) => {
        setSelectedCodeType(value);
        // Add logic to filter data based on code type
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
        // Add logic to filter data based on month
    };

    return (
        <div className="flex flex-col items-center">
            {/* <h2 className="text-lg font-semibold mb-2">PF Revenue Breakdown for {year}</h2> */}

            <div className="w-full">
  <div className="flex justify-between items-center">
    <h4 className="text-lg font-bold flex-1 text-center">
    PF Remittance Breakdown for {year}
    </h4>
    <div className="w-40">
      <OutlinedSelect
        label="Month"
        options={groupOptions}
        value={groupOptions.find(
          (option) => option.value === currentGroup
        )}
        onChange={handleChange(
          setCurrentGroup,
          'groupName'
        )}
      />
    </div>
  </div>
</div>
            <Chart
                options={{
                    colors: ['#002D62', '#0066b2', '#318CE7'], 
                    labels: labels,
                    legend: {
                        position: 'bottom',
                        formatter: function(val, opts) {
                            const percent = opts.w.globals.series[opts.seriesIndex] / totalAmount * 100;
                            return `${val}: ${percent.toFixed(1)}%`;
                        }
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function(val) {
                            return val.toFixed(1) + "%";
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return val.toLocaleString();
                            }
                        }
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
    );
};

export default ComplinceStatus;
