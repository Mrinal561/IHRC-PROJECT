// // // import { Card } from '@/components/ui';
// // import React from 'react';
// // import Chart from 'react-apexcharts';
// // import Card from '@/components/ui/Card';

// // interface ChallanCountChartProps {
// //   companyId: string;
// // }

// // const ChallanVisualization: React.FC<ChallanCountChartProps> = ({ companyId }) => {
// //   const months = [
// //     'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24',
// //     'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25'
// //   ];

// //   const series = [
// //     // Main Challan Amount Series
// //     {
// //       name: 'Apr-24',
// //       data: [1000000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'May-24',
// //       data: [1020000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Jun-24',
// //       data: [1040000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Jul-24',
// //       data: [1060000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Aug-24',
// //       data: [1080000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Sep-24',
// //       data: [1030000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Oct-24',
// //       data: [1120000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Nov-24',
// //       data: [1140000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Dec-24',
// //       data: [1160000, 0, 0, 0, 0]
// //     },
// //     {
// //       name: 'Jan-25',
// //       data: [1180000, 0, 0, 0, 0]
// //     }
// //   ];

// //   const options = {
// //     chart: {
// //       type: 'bar',
// //       height: 350,
// //       stacked: false,
// //     },
// //     plotOptions: {
// //       bar: {
// //         horizontal: false,
// //         columnWidth: '55%',

// //         borderRadius: 1,
// //       },
// //     },
// //     dataLabels: {
// //       enabled: false,
// //     },
// //     stroke: {
// //       show: true,
// //       width: 2,
// //       colors: ['transparent'],
// //     },
// //     xaxis: {
// //       categories: [
// //         'Main Challan Amount',
// //         'Head Count',
// //         'Arear Challan Amount',
// //         'Head Count',
// //         'Damage Challan Amount'
// //       ],
// //     },
// //     yaxis: {
// //       labels: {
// //         formatter: (value) => value.toLocaleString()
// //       }
// //     },
// //     title: {
// //       text: 'Challan Upload',
// //       align: 'center',
// //       style: {
// //         fontSize: '20px'
// //       }
// //     },
// //     legend: {
// //       position: 'bottom'
// //     },
// //     colors: [
// //       '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
// //       '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C', '#F86624'
// //     ],
// //     tooltip: {
// //       y: {
// //         formatter: (value) => value.toLocaleString()
// //       }
// //     }
// //   };

// //   // Add data for each category
// //   months.forEach((month, index) => {
// //     series[index].data = [
// //       // Main Challan Amount
// //       [1000000, 1020000, 1040000, 1060000, 1080000, 1030000, 1120000, 1140000, 1160000, 1180000][index],
// //       // Head Count
// //       [4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800][index],
// //       // Arear Challan
// //       [200000, 203000, 206000, 209000, 212000, 201000, 218000, 221000, 224000, 227000][index],
// //       // Head Count.1
// //       [52, 49, 46, 43, 40, 37, 34, 31, 28, 25][index],
// //       // Damage Challan Amount
// //       [27000, 0, 0, 12000, 0, 0, 0, 0, 0, 0][index]
// //     ];
// //   });

// //   return (
// //     <Card>
// //     <div className="w-full max-w-6xl mx-auto p-4">
// //       <Chart
// //         options={options}
// //         series={series}
// //         type="bar"
// //         height={500}
// //       />
// //     </div>
// //     </Card>
// //   );
// // };

// // export default ChallanVisualization;
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { Card } from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined'
import { endpoints } from '@/api/endpoint'
import httpClient from '@/api/http-client'
import Lottie from 'lottie-react'
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear'
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged'

interface ChallanVisualizationProps {
    companyId: string
}

type CodeType = 'PF' | 'ESI' | 'LWF' | 'PTEC' | 'PTRC'

interface SelectOption {
    value: string
    label: string
}

interface ApiResponse {
    success: boolean
    data: {
        labels: string[]
        series: {
            name: string
            data: number[]
        }[]
    }
}

const ChallanVisualization: React.FC<ChallanVisualizationProps> = ({
    companyId,
}) => {
    const [financialYear, setFinancialYear] = useState<string | null>(
        sessionStorage.getItem(FINANCIAL_YEAR_KEY),
    )
    const [selectedType, setSelectedType] = useState<SelectOption | null>(null)
    const [selectedCode, setSelectedCode] = useState<SelectOption | null>(null)
    const [codes, setCodes] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState<any>({
        chart: {
            type: 'bar',
            height: 350,
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 1,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            labels: {
                formatter: (value: number) => value.toLocaleString(),
            },
        },
        title: {
            text: 'Challan Upload',
            align: 'center',
            style: {
                fontSize: '20px',
            },
        },
        legend: {
            position: 'bottom',
        },
        colors: [
            '#008FFB',
            '#00E396',
            '#FEB019',
            '#FF4560',
            '#775DD0',
            '#3F51B5',
            '#546E7A',
            '#D4526E',
            '#8D5B4C',
            '#F86624',
        ],
        tooltip: {
            y: {
                formatter: (value: number) => value.toLocaleString(),
            },
        },
    })
    const [chartData, setChartData] = useState<{
        labels: string[]
        series: { name: string; data: number[] }[]
    }>({
        labels: [],
        series: [],
    })

    const typeOptions = [
        { value: 'PF', label: 'PF' },
        { value: 'ESI', label: 'ESI' },
        { value: 'LWF', label: 'LWF' },
        { value: 'PTEC', label: 'PTEC' },
        { value: 'PTRC', label: 'PTRC' },
    ]

    // Initialize type on component mount
    useEffect(() => {
        if (typeOptions.length > 0) {
            const defaultType = typeOptions[0]
            setSelectedType(defaultType)
        }
    }, [])

    useEffect(() => {
        const handleFinancialYearChange = (event: CustomEvent) => {
            const newFinancialYear = event.detail
            setFinancialYear(newFinancialYear)
        }

        window.addEventListener(
            FINANCIAL_YEAR_CHANGE_EVENT,
            handleFinancialYearChange as EventListener,
        )

        return () => {
            window.removeEventListener(
                FINANCIAL_YEAR_CHANGE_EVENT,
                handleFinancialYearChange as EventListener,
            )
        }
    }, [])

    useEffect(() => {
        if (selectedType?.value) {
            fetchCodes(selectedType.value as any)
        }
    }, [selectedType, companyId])

    useEffect(() => {
        if (selectedType?.value && selectedCode?.value && financialYear) {
            fetchGraphData()
        }
    }, [selectedType, selectedCode, financialYear])

    // const transformChartData = (data: any['data']) => {
    //     const categories = [
    //         'Apr-24',
    //         'May-24',
    //         'Jun-24',
    //         'Jul-24',
    //         'Aug-24',
    //         'Sep-24',
    //         'Oct-24',
    //         'Nov-24',
    //         'Dec-24',
    //         'Jan-25',
    //     ]

    //     // Transform the data into the desired format
    //     const transformedSeries = categories.map((category) => {
    //         const matchingSeries = data.series.find((s) => s.name === category)

    //         return {
    //             name: category,
    //             data: data.labels.map((_, monthIndex: any) =>
    //                 matchingSeries ? matchingSeries.data[monthIndex] : 0,
    //             ),
    //         }
    //     })

    //     return transformedSeries
    // }

    const fetchGraphData = async () => {
        if (!selectedType?.value || !selectedCode?.value || !financialYear)
            return

        setIsLoading(true)
        try {
            const { data } = await httpClient.get<any>(
                endpoints.graph.analytics(
                    selectedType.value,
                    selectedCode.label,
                    financialYear,
                ),
            )

            if (data) {
                setOptions({
                    ...options,
                    xaxis: { categories: data.labels },
                })
                setChartData({
                    labels: data.labels,
                    series: data.series,
                })
            }
        } catch (error) {
            console.error('Error fetching graph data:', error)
            setChartData({
                labels: [],
                series: [],
            })
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCodes = async (type: CodeType) => {
        setIsLoading(true)
        try {
            const endpoint = getEndpointForType(type)
            const { data } = await httpClient.get(endpoint, {
                params: { 'company_id[]': companyId },
            })

            setCodes(data)

            if (data && data.length > 0) {
                const defaultCode = {
                    value: String(data[0].id),
                    label:
                        data[0].pf_code ||
                        data[0].code ||
                        data[0].register_number ||
                        data[0].enroll_number,
                }
                setSelectedCode(defaultCode)
            } else {
                setSelectedCode(null)
            }
        } catch (error) {
            console.error('Error fetching codes:', error)
            setCodes([])
            setSelectedCode(null)
        } finally {
            setIsLoading(false)
        }
    }

    const getEndpointForType = (type: CodeType) => {
        switch (type) {
            case 'PF':
                return `${endpoints.pfSetup.getAllCodes()}`
            case 'ESI':
                return `${endpoints.esiSetup.getAllCodes()}`
            case 'LWF':
                return `${endpoints.lwfSetup.getAllCodes()}`
            case 'PTEC':
                return `${endpoints.ptSetup.getAllCodes()}`
            case 'PTRC':
                return `${endpoints.ptSetup.rcCodes()}`
            default:
                return `${endpoints.pfSetup.getAllCodes()}`
        }
    }

    // const options = {
    //     chart: {
    //         type: 'bar',
    //         height: 350,
    //         stacked: false,
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             columnWidth: '55%',
    //             borderRadius: 1,
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     stroke: {
    //         show: true,
    //         width: 2,
    //         colors: ['transparent'],
    //     },
    //     xaxis: {
    //         categories: [
    //             'Apr-24',
    //             'May-24',
    //             'Jun-24',
    //             'Jul-24',
    //             'Aug-24',
    //             'Sep-24',
    //             'Oct-24',
    //             'Nov-24',
    //             'Dec-24',
    //             'Jan-25',
    //         ],
    //     },
    //     yaxis: {
    //         labels: {
    //             formatter: (value: number) => value.toLocaleString(),
    //         },
    //     },
    //     title: {
    //         text: 'Challan Upload',
    //         align: 'center',
    //         style: {
    //             fontSize: '20px',
    //         },
    //     },
    //     legend: {
    //         position: 'bottom',
    //     },
    //     colors: [
    //         '#008FFB',
    //         '#00E396',
    //         '#FEB019',
    //         '#FF4560',
    //         '#775DD0',
    //         '#3F51B5',
    //         '#546E7A',
    //         '#D4526E',
    //         '#8D5B4C',
    //         '#F86624',
    //     ],
    //     tooltip: {
    //         y: {
    //             formatter: (value: number) => value.toLocaleString(),
    //         },
    //     },
    // }

    const handleTypeChange = (value: SelectOption | null) => {
        setSelectedType(value)
    }

    const handleCodeChange = (value: SelectOption | null) => {
        setSelectedCode(value)
    }

    const codeOptions = codes.map((code) => ({
        value: String(code.id),
        label:
            code.pf_code ||
            code.code ||
            code.register_number ||
            code.enroll_number,
    }))

    return (
        <Card>
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex gap-4">
                    <div className="w-48">
                        <OutlinedSelect
                            label="Select Type"
                            options={typeOptions}
                            value={selectedType}
                            onChange={handleTypeChange}
                        />
                    </div>
                    <div className="w-48">
                        <OutlinedSelect
                            label="Select Code"
                            options={codeOptions}
                            value={selectedCode}
                            onChange={handleCodeChange}
                        />
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className="h-[350px] flex items-center justify-center">
                    <Lottie
                        animationData={loadingAnimation}
                        loop
                        className="w-24 h-24"
                    />
                </div>
            ) : (
                <div className="w-full max-w-6xl mx-auto p-4">
                    <Chart
                        options={options}
                        series={chartData.series}
                        type="bar"
                        height={500}
                    />
                </div>
            )}
        </Card>
    )
}

export default ChallanVisualization
