
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card } from '@/components/ui/card';
import OutlinedSelect from '@/components/ui/Outlined';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { COLORS } from '@/constants/chart.constant';
import { Loading } from '@/components/shared';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';

interface ChallanChartProps {
  companyId: string;
}

type CodeType = 'PF' | 'ESI' | 'LWF' | 'PTEC' | 'PTRC';

interface SelectOption {
  value: string;
  label: string;
}

interface GraphData {
  main: number[];
  arrear: number[];
  damage: number[];
  categories: string[];
}

const ChallanChart: React.FC<ChallanChartProps> = ({ companyId }) => {
  const [financialYear, setFinancialYear] = useState<string | null>(
    sessionStorage.getItem(FINANCIAL_YEAR_KEY)
  );

  const typeOptions = [
    { value: 'PF', label: 'PF' },
    { value: 'ESI', label: 'ESI' },
    { value: 'LWF', label: 'LWF' },
    { value: 'PTEC', label: 'PTEC' },
    { value: 'PTRC', label: 'PTRC' },
  ];

  const [selectedType, setSelectedType] = useState<SelectOption | null>(null);
  const [selectedCode, setSelectedCode] = useState<SelectOption | null>(null);
  const [codes, setCodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  // Initialize type on component mount
  useEffect(() => {
    if (typeOptions.length > 0) {
      const defaultType = typeOptions[0];
      setSelectedType(defaultType);
    }
  }, []);

  useEffect(() => {
    const handleFinancialYearChange = (event: CustomEvent) => {
      const newFinancialYear = event.detail;
      setFinancialYear(newFinancialYear);
    };

    window.addEventListener(
      FINANCIAL_YEAR_CHANGE_EVENT,
      handleFinancialYearChange as EventListener
    );

    return () => {
      window.removeEventListener(
        FINANCIAL_YEAR_CHANGE_EVENT,
        handleFinancialYearChange as EventListener
      );
    };
  }, []);

  // Fetch codes when type changes
  useEffect(() => {
    if (selectedType?.value) {
      fetchCodes(selectedType.value as any);
    }
  }, [selectedType, companyId]);

  // Fetch graph data when type, code, or financial year changes
  useEffect(() => {
    if (selectedType?.value && selectedCode?.value && financialYear) {
      fetchGraphData();
    }
  }, [selectedType, selectedCode, financialYear]);

  const fetchGraphData = async () => {
    if (!selectedType?.value || !selectedCode?.value || !financialYear) return;

    setIsLoading(true);
    try {
      const { data } = await httpClient.get(
        endpoints.graph.challanamount(selectedType.value, selectedCode.label, financialYear)
      );
      console.log('Graph API Response:', data);

      // Transform the API response to match the expected format
      const main: number[] = [];
      const arrear: number[] = [];
      const damage: number[] = [];
      const categories: string[] = data.categories || [];

      data.graphData.forEach((item: any) => {
        if (item.name === 'main') {
          main.push(...item.data);
        } else if (item.name === 'arrear') {
          arrear.push(...item.data);
        } else if (item.name === 'damage') {
          damage.push(...item.data);
        }
      });

      setGraphData({
        main,
        arrear,
        damage,
        categories,
      });
    } catch (error) {
      console.error('Error fetching graph data:', error);
      setGraphData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCodes = async (type: any) => {
    setIsLoading(true);
    try {
      const endpoint = getEndpointForType(type);
      const { data } = await httpClient.get(endpoint, {
        params: { "company_id[]": companyId }
      });

      setCodes(data);

      // Set first code as default if available
      if (data && data.length > 0) {
        const defaultCode = {
          value: String(data[0].id),
          label: data[0].pf_code || data[0].code || data[0].register_number || data[0].enroll_number
        };
        setSelectedCode(defaultCode);
      } else {
        setSelectedCode(null);
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
      setCodes([]);
      setSelectedCode(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getEndpointForType = (type: CodeType) => {
    switch (type) {
      case 'PF':
        return `${endpoints.pfSetup.getAllCodes()}`;
      case 'ESI':
        return `${endpoints.esiSetup.getAllCodes()}`;
      case 'LWF':
        return `${endpoints.lwfSetup.getAllCodes()}`;
      case 'PTEC':
        return `${endpoints.ptSetup.getAllCodes()}`;
      case 'PTRC':
        return `${endpoints.ptSetup.rcCodes()}`;
      default:
        return `${endpoints.pfSetup.getAllCodes()}`;
    }
  };

  const handleTypeChange = (value: SelectOption | null) => {
    setSelectedType(value);
  };

  const handleCodeChange = (value: SelectOption | null) => {
    setSelectedCode(value);
  };

  // Create code options from fetched data
  const codeOptions = codes.map(code => ({
    value: String(code.id),
    label: code.pf_code || code.code || code.register_number || code.enroll_number
  }));

  const chartData = [
    {
      name: 'Main',
      data: graphData?.main || []
    },
    {
      name: 'Arrear',
      data: graphData?.arrear || []
    },
    {
      name: 'Damage',
      data: graphData?.damage || []
    }
  ];

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
              categories: graphData?.categories || [],
            },
            yaxis: {
              title: {
                text: 'Challan Amount'
              },
              labels: {
                formatter: function (val) {
                  return val.toLocaleString();
                }
              },
            //   max:500
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
              offsetX: 15
            },
            title: {
              text: 'Challan Analysis',
              align: 'center',
              style: {
                fontSize: '16px'
              }
            }
          }}
          series={chartData}
          height={400}
          type="bar"
        />
        </Card>
      )}
    </Card>
  );
};

export default ChallanChart;