export const dummyData: PFTrackerData[] = [
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Apr-23',
        noOfEmployees: 2842,
        wages: "43,355,212",
        epsWage: "33,792,208",
        totalChallanAmount: 11000569,
        totalAmountPaid: 11000569 ,
        difference: '',
        reasonForDifference: '',
        dueDate: '15-May-23',
        dateOfPayment: '20-May-23',
        delay: "5 Days",
        delayReason: 'Gov. Portal server down',
        typeOfChallan: 'Main',
        trrnNo: '2032305004230',
        crnNo: '229100523000279',
        challan: 'Challan_IndiaShelter_Apr2023.pdf',
        payment: 'Payment_IndiaShelter_Apr2023.pdf',
        ecr: 'ECR_IndiaShelter_Apr2023.pdf'
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'May-23',
        noOfEmployees: 2934,
        wages: "46,326,266",
        epsWage: "35,492,350",
        totalChallanAmount: 11715531,
        totalAmountPaid: 11715531 ,
        difference: '',
        reasonForDifference: '',
        dueDate: '15-Jun-23',
        dateOfPayment: '13-Jun-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Main',
        trrnNo: '2032306009449',
        crnNo: '229130623009410',
        challan: 'Challan_IndiaShelter_May2023.pdf',
        payment: 'Payment_IndiaShelter_May2023.pdf',
        ecr: 'ECR_IndiaShelter_May2023.pdf'
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Jun-23',
        noOfEmployees: 551,
        wages: "947,447",
        epsWage: "599,602",
        totalChallanAmount: 235132,
        totalAmountPaid: 235132 ,
        difference: '',
        reasonForDifference: '',
        dueDate: '15-Jun-23',
        dateOfPayment: '13-Jul-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Arrear',
        trrnNo: '2032307004954',
        crnNo: '229130723000561',
        challan: 'Challan_IndiaShelter_Jun2023.pdf',
        payment: '',
        ecr: 'ECR_IndiaShelter_Jun2023.pdf'
    },
    {
        companyName: 'India shelter PVT Ltd',
        pfCode: 'GNGGN2789109000',
        location: 'Gurgaon',
        month: 'Jun-23',
        noOfEmployees: 551,
        wages: "947,447",
        epsWage: "599,602",
        totalChallanAmount: 235132,
        totalAmountPaid: 235132 ,
        difference: '',
        reasonForDifference: '',
        dueDate: '15-Jun-23',
        dateOfPayment: '12-Jul-23',
        delay: "",
        delayReason: '',
        typeOfChallan: 'Main',
        trrnNo: '2032307004894',
        crnNo: '229130723000523',
        challan: '',
        payment: 'Payment_IndiaShelter_Jun2023.pdf',
        ecr: 'ECR_IndiaShelter_Jun2023.pdf'
    },
];


import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { FiEdit, FiFile, FiTrash } from 'react-icons/fi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { MdEdit } from 'react-icons/md';
import PFTrackerEditDialog from './PFTrackerEditDialog';
import ConfigDropdown from './ConfigDropdown';
import { PfChallanData } from '@/@types/pfTracker';
import dayjs from 'dayjs';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

interface PfTrackerTableProps {
  dataSent: PfChallanData[];
  loading: boolean;
  onRefresh?: () => void;
   pagination: {
    total: number;
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PFTrackerTable: React.FC<PfTrackerTableProps> =({ 
  dataSent, 
  loading, 
  onRefresh,
  pagination,
  onPaginationChange,
  onPageSizeChange
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<PfChallanData | null>(null);
  const [pfTrackerData, setPfTrackerData] = useState<PfChallanData[]>([]);


  // useEffect(() => {
  //   if (dataSent) {
  //     const startIndex = (tableData.pageIndex - 1) * tableData.pageSize;
  //     const endIndex = startIndex + tableData.pageSize;
  //     const paginatedData = dataSent.slice(startIndex, endIndex);
      
  //     setPfTrackerData(paginatedData);
  //     setTableData(prev => ({
  //       ...prev,
  //       total: dataSent.length
  //     }));
  //   }
  // }, [dataSent, tableData.pageIndex, tableData.pageSize]);


  const handleEdit = (row: PfChallanData) => {
    setEditingData(row);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (editedData: PfChallanData) => {
    // Update the dataSent array with the edited data (if needed)
    // For now, just closing the dialog
    setEditDialogOpen(false);
    setEditingData(null);
     if (onRefresh) {
      onRefresh();
    }
  };
// const onPaginationChange = (page: number) => {
//     setTableData(prev => ({ ...prev, pageIndex: page }));
//   };

  // const onSelectChange = (value: number) => {
  //   setTableData(prev => ({
  //     ...prev,
  //     pageSize: Number(value),
  //     pageIndex: 1,
  //   }));
  // };

  const columns: ColumnDef<PfChallanData>[] = useMemo(
    () => [
        
      {
        header: 'Company',
        accessorKey: 'PfSetup.Company.name', // Access nested property
        cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'PF Code',
        accessorKey: 'PfSetup.pf_code',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Location',
        accessorKey: 'PfSetup.Location.name',
        cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
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
        header: 'No. of Employees',
        accessorKey: 'no_of_emp',
        cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
      },
      {
        header: 'EPF Wages',
        accessorKey: 'epf_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'EPS Wage',
        accessorKey: 'eps_wage',
        cell: (props) => <div className="w-28 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Challan Amount',
        accessorKey: 'total_challan_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Total Amount Paid',
        accessorKey: 'total_paid_amt',
        cell: (props) => <div className="w-52 truncate">₹{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Difference',
        accessorKey: 'difference_amt',
        cell: (props) => <div className="w-52 truncate">{(props.getValue() as number).toLocaleString()}</div>,
      },
      {
        header: 'Due Date',
        accessorKey: 'payment_due_date',
        cell: (props) => <div className="w-28 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
      },
      {
        header: 'Date of Payment',
        accessorKey: 'payment_date',
        cell: (props) => <div className="w-40 truncate">{dayjs(props.getValue() as string).format('DD-MM-YYYY')}</div>,
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
        header: 'Upload Status',
        id: 'uploadStatus',
        cell: ({ row }) => {
          const { ecr_document, challan_document, receipt_document } = row.original;
          const uploadedCount = [ecr_document, challan_document, receipt_document].filter(Boolean).length;
          return <div className="w-32 truncate">{`${uploadedCount}/3`}</div>;
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Tooltip title="Edit">
              <Button
                size="sm"
                onClick={() => handleEdit(row.original)}
                icon={<MdEdit />}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                size="sm"
                onClick={() => console.log('Delete', row.original)}
                icon={<FiTrash />}
                className="text-red-500"
              />
            </Tooltip>
            <ConfigDropdown 
              companyName={row.original.PfSetup.Company.name} 
              companyGroupName={row.original.PfSetup.CompanyGroup.name} 
              trackerId={row.original.id} 
              onRefresh={onRefresh}
            />
          </div>
        ),
      },
    ],
    [onRefresh]
  );

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
    <div className="relative">
      <DataTable
        columns={columns}
        data={dataSent} // Use the dataSent prop directly
        loading={loading}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
          pagingData={{
          total: pagination.total,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        }}
        // Pass the pagination handlers
        onPaginationChange={onPaginationChange}
        onSelectChange={onPageSizeChange}
      />
      {editingData && (
        <PFTrackerEditDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          data={editingData}
        />
      )}
    </div>
  );
};

export default PFTrackerTable;