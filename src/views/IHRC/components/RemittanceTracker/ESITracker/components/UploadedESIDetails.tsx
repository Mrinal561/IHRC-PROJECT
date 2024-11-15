import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import EsiConfigDropdown from './ESIConfigDropDown';
import { esiChallanData } from '@/@types/esiTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
const documentPath = "../store/AllMappedCompliancesDetails.xls";


interface UploadedESIDetailsProps {
  onBack: () => void;
}

const UploadedESIDetails: React.FC<UploadedESIDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<esiChallanData[]>([]);


  useEffect(() => {
    fetchEsiTrackerData();
  }, []);

  const fetchEsiTrackerData = async () => {
    try {
      const res = await httpClient.get(endpoints.esiTracker.getAll())
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PF tracker data:', error);
    }
  };

  const columns: ColumnDef<esiChallanData>[] = useMemo(
    () => [
      {
        header: 'Company',
        accessorKey: 'EsiSetup.company.name',
        cell: (props) => (
            <div className="w-52 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'ESI Code',
        accessorKey: 'EsiSetup.code',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    // {
    //     header: 'Code Type',
    //     accessorKey: 'codeType',
    //     cell: (props) => (
    //         <div className="w-40 truncate">
    //             {props.getValue() as string}
    //         </div>
    //     ),
    // },
    {
        header: 'ESI Code Location',
        accessorKey: 'EsiSetup.Location.name',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Month',
        accessorKey: 'payroll_month',
        cell: (props) => (
            <div className="w-28 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'No. of Employees',
        accessorKey: 'no_of_emp',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as number}
            </div>
        ),
    },
    {
        header: 'ESI Gross Wages',
        accessorKey: 'gross_wage',
        cell: (props) => (
            <div className="w-40 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'EE ESI',
        accessorKey: 'employee_esi',
        cell: (props) => (
            <div className="w-28 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'ER ESI',
        accessorKey: 'employer_esi',
        cell: (props) => (
            <div className="w-28 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Total ESI',
        accessorKey: 'total_esi',
        cell: (props) => (
            <div className="w-28 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Total Amount As per Challan',
        accessorKey: 'challan_amt',
        cell: (props) => (
            <div className="w-52 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Difference in Amount',
        accessorKey: 'difference_amt',
        cell: (props) => (
            <div className="w-40 truncate">
                ₹{(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    {
        header: 'Reason For Difference',
        accessorKey: 'difference_reason',
        cell: (props) => (
            <div className="w-40 truncate">
                {(props.getValue() as number).toLocaleString()}
            </div>
        ),
    },
    
   
    {
        header: 'Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => (
            <div className="w-28 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Date of Payment',
        accessorKey: 'payment_date',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
      header: 'Delay',
      accessorKey: 'delay_in_days',
      cell: (props) => (
          <div className="w-40 truncate">
              {props.getValue() as string}
          </div>
      ),
  },
  {
      header: 'Delay Reason',
      accessorKey: 'delay_reason',
      cell: (props) => (
          <div className="w-40 truncate">
              {props.getValue() as string}
          </div>
      ),
  },
    {
        header: 'Challan No',
        accessorKey: 'challan_no',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Challan Type',
        accessorKey: 'challan_type',
        cell: (props) => (
            <div className="w-40 truncate">
                {props.getValue() as string}
            </div>
        ),
    },
    {
        header: 'Challan',
        accessorKey: 'challan_document',
        cell: (props) => 
        <div className="w-40 truncate">
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            {/* <Button size="xs" icon={<HiDownload />}>Download</Button> */}
            {props.getValue() as string}
          </a>
        </div>,
      },
     
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
            <EsiConfigDropdown companyName={undefined} companyGroupName={undefined} />
        ),
      },
    ],
    []
  );

  const backFunction = () => {
    navigate('/esi-tracker');
  };
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Implement the download functionality here
    // For example, you could use the `fetch` API to download the file
    fetch(documentPath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'AllMappedCompliancesDetails.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => console.error('Download failed'));
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-8">
        <Button
          variant="plain"
          size="sm"
          icon={<HiArrowLeft />}
          onClick={backFunction}
          className="mr-4"
        >
        </Button>
        <h2 className="text-2xl font-bold">Uploaded ESI Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
    </div>
  );
};

export default UploadedESIDetails;