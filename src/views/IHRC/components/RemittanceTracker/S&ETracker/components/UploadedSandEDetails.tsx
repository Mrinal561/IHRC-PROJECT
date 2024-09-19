import React, { useMemo } from 'react';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { SandETrackerData } from './SandETrackerTable';
import ConfigDropDown from './ConfigDropDown';

const documentPath = "../store/AllMappedCompliancesDetails.xls";


const dummyData: SandETrackerData[] = [
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Uttar Pradesh',
        location: 'Agra',
        address: 'Shop No.6, Upper Ground Floor, C.R. Mall, Church Road, Ram Nagar Colony, Agra 282002',
        branchOpeningDate: '6-Jan-18',
        sandeNumber: "UPSA16707715",
        userId: "241186951268",
        password: "Pass@1234",
        dueDate: '31-Jan-23',
        aggreedDueDate: '31-Jan-23',
        actualDate: '',
        delay: '',
        delayReason: '',
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Gujarat',
        location: 'Ahmedabad',
        address: '302, Ratna Business Square, Old Nataraj Cinema, 3rd Floor, Ellish Bridge, Ashram Road, Ahemdabad - 380009 (Gujrat)',
        branchOpeningDate: '2-May-14',
        sandeNumber: 'PII/LG/2900020/0163488',
        userId: "241186951268",
        password: "Pass@1234",
        dueDate: '31-Jan-23',
        aggreedDueDate: '31-Jan-23',
        actualDate: '',
        delay: '',
        delayReason: '',
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Maharashtra',
        location: 'Ahmednagar',
        address: 'Office No. 220, Sai Midas Touch, Commercial Complex, Second Floor, Nagar -  Manmad Road Savedi, Ahmednagar - 414003',
        branchOpeningDate: '21-Sep-17',
        sandeNumber: '',
        userId: "241186951268",
        password: "Pass@1234",
        dueDate: '30-Apr-23',
        aggreedDueDate: '30-Apr-23',
        actualDate: '26-Apr-23',
        delay: '',
        delayReason: '',
        payment: "Payment Receipt",
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Rajasthan',
        location: 'Ajmer',
        address: 'Marwad House, 2nd Floor, Jaipur Road, Suchana Kendra Chouraha,Ajmer - 305001',
        branchOpeningDate: '1-Aug-10',
        sandeNumber: 'SCA/2021/1/132630',
        userId: "241186951268",
        password: "Pass@1234",
        dueDate: '',
        aggreedDueDate: '',
        actualDate: '',
        delay: '',
        delayReason: '',
        payment: "",
    },
    {
        companyName: 'India shelter PVT Ltd',
        state: 'Maharashtra',
        location: 'Akola',
        address: 'Office No. 18 & 19, 2nd Floor, Yamuna Tarang Complex, National Highway No. 6, Vidya Nagar, Akola - 444001',
        branchOpeningDate: '1-May-16',
        sandeNumber: '',
        userId: "241186951268",
        password: "Pass@1234",
        dueDate: '30-Apr-23',
        aggreedDueDate: '30-Apr-23',
        actualDate: '26-Apr-23',
        delay: '',
        delayReason: '',
        payment: "Payment Receipt",
    },
];

interface UploadedPFDetailsProps {
  onBack: () => void;
}

const UploadedSandEDetails: React.FC<UploadedPFDetailsProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const columns: ColumnDef<SandETrackerData>[] = useMemo(
    () => [
        {
            header: 'Address',
            accessorKey: 'address',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Opening Date',
            accessorKey: 'branchOpeningDate',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as number}</div>,
        },
        {
            header: 'S&E Number',
            accessorKey: 'sandeNumber',
            cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
        },
        {
            header: 'User ID',
            accessorKey: 'userId',
            cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
        },
        {
            header: 'Password',
            accessorKey: 'password',
            cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
        },
        {
            header: 'Due Date',
            accessorKey: 'dueDate',
            cell: (props) => <div className="w-28 truncate">{(props.getValue() as number).toLocaleString()}</div>,
        },
        {
          header: 'Agreed Due Date',
          accessorKey: 'aggreedDueDate',
          cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
        {
          header: 'Actual Date',
          accessorKey: 'actualDate',
          cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
        {
          header: 'Delay',
          accessorKey: 'delay',
          cell: (props) => <div className="w-28 truncate">{props.getValue() as number}</div>,
      },
      {
          header: 'Delay Reason',
          accessorKey: 'delayReason',
          cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
      },
      {
        header: 'Payment Receipt',
        accessorKey: 'payment',
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
            <ConfigDropDown companyName={undefined} companyGroupName={undefined}            />
        ),
    },
    ],
    []
  );

  const backFunction = () => {
    navigate('/s&e-tracker');
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
        <h2 className="text-2xl font-bold">Uploaded S&E Tracker Details</h2>
      </div>
      <DataTable
        columns={columns}
        data={dummyData}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
      />
    </div>
  );
};

export default UploadedSandEDetails;