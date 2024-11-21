
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { PFTrackerData } from './PFTrackerTable'; // Import the PFTrackerData interface
import { MdEdit } from 'react-icons/md';
import { FiFile, FiTrash } from 'react-icons/fi';
import ConfigDropdown from './ConfigDropdown';
import { PfChallanData } from '@/@types/pfTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import dayjs from 'dayjs';

const documentPath = "../store/AllMappedCompliancesDetails.xls";



interface UploadedPFDetailsProps {
  onBack: () => void;
}

const UploadedPFDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<PfChallanData[]>([]);
  const [loading, setLoading] = useState(true);




  const fetchPFTrackerData =  useCallback(async () => {
    try {
      setLoading(true);
      const res = await httpClient.get(endpoints.tracker.pfGetALl());
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching PF tracker data:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
    useEffect(() => {
    fetchPFTrackerData();
  }, [fetchPFTrackerData]);
  const columns: ColumnDef<PFTrackerData>[] = useMemo(
    () => [
      {
        header: 'PF Code',
        accessorKey: 'PfSetup.pf_code',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Company Group',
        accessorKey: 'PfSetup.CompanyGroup.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Company',
        accessorKey: 'PfSetup.Company.name',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        accessorKey: 'PfSetup.Location.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'No. of Employees',
        accessorKey: 'no_of_emp',
        cell: (props) => <div className="w-28 truncate  text-center">{props.getValue() as number}</div>,
      },
      {
        header: 'Month',
        accessorKey: 'payroll_month',
        cell: (props) => {
          const date = new Date(props.getValue() as string);
          return (
            <div className="w-28 truncate">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
          );
        }
      },
      {
        header: 'EPF Wage',
        accessorKey: 'epf_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EPS Wage',
        accessorKey: 'eps_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EDLI Wage',
        accessorKey: 'edli_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Challan Amount',
        accessorKey: 'total_challan_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Paid Amount',
        accessorKey: 'total_paid_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference Amount',
        accessorKey: 'difference_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference Reason',
        accessorKey: 'difference_reason',
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payment Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => <div className="w-28 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Payment Date',
        accessorKey: 'payment_date',
        cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Delay in Days',
        accessorKey: 'delay_in_days',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as number || '-'}</div>,
      },
      {
        header: 'Delay Reason',
        accessorKey: 'delay_reason',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string || '-'}</div>,
      },
      {
        header: 'Challan Type',
        accessorKey: 'challan_type',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'TRRN No',
        accessorKey: 'trrn_no',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'CRN No',
        accessorKey: 'crn_no',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Remark',
        accessorKey: 'remark',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Upload Date',
        accessorKey: 'upload_date',
        cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Uploaded By',
        accessorKey: 'UploadBy.name',
        cell: (props) => (
          <div className="w-40 truncate">
            {`${props.row.original.UploadBy?.name}`}
          </div>
        ),
      },
     {
  header: 'Challan',
  accessorKey: 'challan_document',
  cell: (props) => {
    const challanDocument = props.getValue() as string | null;
    
    const handleChallanDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (challanDocument) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${challanDocument}`;
        window.open(fullPath, '_blank');
      }
    };

    return (
      <div className="w-40 flex items-center">
        {challanDocument ? (
          <a 
            href="#" 
            onClick={handleChallanDownload} 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiFile className="w-5 h-5" />
          </a>
        ) : (
          '--'
        )}
      </div>
    );
  },
},
{
  header: 'ECR',
  accessorKey: 'ecr_document',
  cell: (props) => {
    const ecrDocument = props.getValue() as string | null;
    
    const handleEcrDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (ecrDocument) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${ecrDocument}`;
        window.open(fullPath, '_blank');
      }
    };

    return (
      <div className="w-40 flex items-center">
        {ecrDocument ? (
          <a 
            href="#" 
            onClick={handleEcrDownload} 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiFile className="w-5 h-5" />
          </a>
        ) : (
          '--'
        )}
      </div>
    );
  },
},
{
  header: 'Payment Receipt',
  accessorKey: 'receipt_document',
  cell: (props) => {
    const paymentReceiptDocument = props.getValue() as string | null;
    
    const handlePaymentReceiptDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (paymentReceiptDocument) {
        const fullPath = `${import.meta.env.VITE_API_GATEWAY}/${paymentReceiptDocument}`;
        window.open(fullPath, '_blank');
      }
    };

    return (
      <div className="w-40 flex items-center">
        {paymentReceiptDocument ? (
          <a 
            href="#" 
            onClick={handlePaymentReceiptDownload} 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiFile className="w-5 h-5" />
          </a>
        ) : (
          '--'
        )}
      </div>
    );
  },
},
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <ConfigDropdown companyName={row.original.PfSetup.Company.name} companyGroupName={row.original.PfSetup.CompanyGroup.name}
          trackerId={row.original.id}  
            onRefresh={fetchPFTrackerData}/>
        ),
    },
    ],
    []
  );

  const backFunction = () => {
    navigate('/pf-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded PF Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
    </div>
  );
};

export default UploadedPFDetails;