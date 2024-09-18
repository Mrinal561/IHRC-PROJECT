import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@/components/ui';
import { HiArrowLeft } from 'react-icons/hi';
import { AdaptableCard, ColumnDef } from '@/components/shared';
import { DataTable } from '@/components/shared';
import { MdEdit } from 'react-icons/md';

    // Column definitions for each table
    type PFData = {
        PFCode: string
        PFCodeLocation: string
        PFRegistrationDate: string
        PFUserID: string
        PFPassword: string
        AuthorizedSignatory: string
        Designation: string
        Mobile: string
        Email: string
        DSCValidity: string
    }
    
    type ESIData = {
        ESICodeType: string
        ESICode: string
        ESICodeLocation: string
        ESIUserID: string
        ESIPassword: string
        AuthorizedSignatory: string
        Designation: string
        Mobile: string
        Email: string
    }
    
    type LWFData = {
        LWFState: string
        LWFLocation: string
        LWFRegistrationNumber: string
        LWFRegistrationDate: string
        LWFRemmitanceMode: string
        LWFRemmitanceFrequency: string
        LWFUserID: string
        LWFPassword: string
        LWFFrequency: string
        LWFPaymentDueDate: string
        LWFApplicableState: string
        AuthorizedSignatory: string
        Designation: string
        Mobile: string
        Email: string
    }
    
    type PTData = {
        PTState: string
        PTLocation: string
        PTEnrollmentNumber: string
        PTRegistrationNumber: string
        PTRegistrationDate: string
        PTRemmitanceMode: string
        PTUserID: string
        PTPassword: string
        PTRCPaymentFrequency: string
        PTECPaymentFrequency: string
        AuthorizedSignatory: string
        Designation: string
        Mobile: string
        Email: string
    }


const CompanyDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { companyName, companyGroupName } = location.state as { companyName: string; companyGroupName: string };

    const handleBack = () => {
        navigate(-1);
    };

    const tableHeight = '400px';

    const tableStyle = {
        height: tableHeight,
        overflowY: 'auto' as const, // TypeScript requires this to be explicitly set
    };


    // Dummy data for PF Setup Details
    const pfData = [
        { PFCode: 'DRET12457893', PFCodeLocation: 'Mumbai', PFRegistrationDate: '2023-01-01', PFUserID: 'User01', PFPassword: 'password01', AuthorizedSignatory: 'Amit', Designation: 'Manager', Mobile: '9145786945', Email: 'amit@gmail.com', DSCValidity: '2026-01-01' },
        { PFCode: 'DRET98765432', PFCodeLocation: 'Delhi', PFRegistrationDate: '2023-02-15', PFUserID: 'User02', PFPassword: 'password02', AuthorizedSignatory: 'Rahul', Designation: 'HR Manager', Mobile: '9876543210', Email: 'rahul@gmail.com', DSCValidity: '2025-12-31' },
        { PFCode: 'DRET45678901', PFCodeLocation: 'Bangalore', PFRegistrationDate: '2023-03-20', PFUserID: 'User03', PFPassword: 'password03', AuthorizedSignatory: 'Priya', Designation: 'Finance Manager', Mobile: '8765432109', Email: 'priya@gmail.com', DSCValidity: '2026-03-31' },
    ];

    // Dummy data for ESI Setup Details
    const esiData = [
        { ESICodeType: 'Main', ESICode: 'DRET12457893', ESICodeLocation: 'Mumbai', ESIUserID: 'User01', ESIPassword: 'password01', AuthorizedSignatory: 'Amit', Designation: 'Manager', Mobile: '9145786945', Email: 'amit@gmail.com' },
        { ESICodeType: 'Branch', ESICode: 'DRET98765432', ESICodeLocation: 'Delhi', ESIUserID: 'User02', ESIPassword: 'password02', AuthorizedSignatory: 'Rahul', Designation: 'HR Manager', Mobile: '9876543210', Email: 'rahul@gmail.com' },
        { ESICodeType: 'Main', ESICode: 'DRET45678901', ESICodeLocation: 'Bangalore', ESIUserID: 'User03', ESIPassword: 'password03', AuthorizedSignatory: 'Priya', Designation: 'Finance Manager', Mobile: '8765432109', Email: 'priya@gmail.com' },
    ];

    // Dummy data for LWF Setup Details
    const lwfData = [
        { LWFState: 'Maharashtra', LWFLocation: 'Mumbai', LWFRegistrationNumber: 'REG98765354879', LWFRegistrationDate: '2023-01-01', LWFRemmitanceMode: 'Online', LWFRemmitanceFrequency: 'Yearly', LWFUserID: 'User01', LWFPassword: 'password01', LWFFrequency: 'Monthly', LWFPaymentDueDate: '2023-10-22', LWFApplicableState: 'Tamil Nadu', AuthorizedSignatory: 'Amit', Designation: 'Manager', Mobile: '9145786945', Email: 'amit@gmail.com' },
        { LWFState: 'Karnataka', LWFLocation: 'Bangalore', LWFRegistrationNumber: 'REG12345678901', LWFRegistrationDate: '2023-02-15', LWFRemmitanceMode: 'Offline', LWFRemmitanceFrequency: 'Quarterly', LWFUserID: 'User02', LWFPassword: 'password02', LWFFrequency: 'Quarterly', LWFPaymentDueDate: '2023-11-15', LWFApplicableState: 'Karnataka', AuthorizedSignatory: 'Rahul', Designation: 'HR Manager', Mobile: '9876543210', Email: 'rahul@gmail.com' },
        { LWFState: 'Gujarat', LWFLocation: 'Ahmedabad', LWFRegistrationNumber: 'REG23456789012', LWFRegistrationDate: '2023-03-20', LWFRemmitanceMode: 'Online', LWFRemmitanceFrequency: 'Monthly', LWFUserID: 'User03', LWFPassword: 'password03', LWFFrequency: 'Monthly', LWFPaymentDueDate: '2023-12-10', LWFApplicableState: 'Gujarat', AuthorizedSignatory: 'Priya', Designation: 'Finance Manager', Mobile: '8765432109', Email: 'priya@gmail.com' },
    ];

    // Dummy data for PT Setup Details
    const ptData = [
        { PTState: 'Maharashtra', PTLocation: 'Mumbai', PTEnrollmentNumber: 'PT1234587954', PTRegistrationNumber: 'REG98765354879', PTRegistrationDate: '2023-01-01', PTRemmitanceMode: 'Online', PTUserID: 'User01', PTPassword: 'password01', PTRCPaymentFrequency: 'Quarterly', PTECPaymentFrequency: 'Monthly', AuthorizedSignatory: 'Amit', Designation: 'Manager', Mobile: '9145786945', Email: 'amit@gmail.com' },
        { PTState: 'Karnataka', PTLocation: 'Bangalore', PTEnrollmentNumber: 'PT9876543210', PTRegistrationNumber: 'REG12345678901', PTRegistrationDate: '2023-02-15', PTRemmitanceMode: 'Offline', PTUserID: 'User02', PTPassword: 'password02', PTRCPaymentFrequency: 'Monthly', PTECPaymentFrequency: 'Quarterly', AuthorizedSignatory: 'Rahul', Designation: 'HR Manager', Mobile: '9876543210', Email: 'rahul@gmail.com' },
        { PTState: 'Gujarat', PTLocation: 'Ahmedabad', PTEnrollmentNumber: 'PT4567890123', PTRegistrationNumber: 'REG23456789012', PTRegistrationDate: '2023-03-20', PTRemmitanceMode: 'Online', PTUserID: 'User03', PTPassword: 'password03', PTRCPaymentFrequency: 'Yearly', PTECPaymentFrequency: 'Monthly', AuthorizedSignatory: 'Priya', Designation: 'Finance Manager', Mobile: '8765432109', Email: 'priya@gmail.com' },
    ];


    
    const pfColumns: ColumnDef<PFData>[] = [
        {
            header: 'PF Code',
            accessorKey: 'PFCode',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PF Code Location',
            accessorKey: 'PFCodeLocation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PF Registration Date',
            accessorKey: 'PFRegistrationDate',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PF User ID',
            accessorKey: 'PFUserID',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PF Password',
            accessorKey: 'PFPassword',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Authorized Signatory',
            accessorKey: 'AuthorizedSignatory',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Designation',
            accessorKey: 'Designation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Mobile',
            accessorKey: 'Mobile',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Email',
            accessorKey: 'Email',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'DSC Validity',
            accessorKey: 'DSCValidity',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
       
    ];
    
    const esiColumns: ColumnDef<ESIData>[] = [
        {
            header: 'ESI Code Type',
            accessorKey: 'ESICodeType',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'ESI Code',
            accessorKey: 'ESICode',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'ESI Code Location',
            accessorKey: 'ESICodeLocation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'ESI User ID',
            accessorKey: 'ESIUserID',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'ESI Password',
            accessorKey: 'ESIPassword',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Authorized Signatory',
            accessorKey: 'AuthorizedSignatory',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Designation',
            accessorKey: 'Designation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Mobile',
            accessorKey: 'Mobile',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Email',
            accessorKey: 'Email',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
       
    ];
    
    const lwfColumns: ColumnDef<LWFData>[] = [
        {
            header: 'LWF State',
            accessorKey: 'LWFState',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Location',
            accessorKey: 'LWFLocation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Registration Number',
            accessorKey: 'LWFRegistrationNumber',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Registration Date',
            accessorKey: 'LWFRegistrationDate',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Remmitance Mode',
            accessorKey: 'LWFRemmitanceMode',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Remmitance Frequency',
            accessorKey: 'LWFRemmitanceFrequency',
            cell: (props) => <div className="w-56 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF User ID',
            accessorKey: 'LWFUserID',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Password',
            accessorKey: 'LWFPassword',
            cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Frequency',
            accessorKey: 'LWFFrequency',
            cell: (props) => <div className="w-32 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Payment Due Date',
            accessorKey: 'LWFPaymentDueDate',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'LWF Applicable State',
            accessorKey: 'LWFApplicableState',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Authorized Signatory',
            accessorKey: 'AuthorizedSignatory',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Designation',
            accessorKey: 'Designation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Mobile',
            accessorKey: 'Mobile',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Email',
            accessorKey: 'Email',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
    ];

    const ptColumns: ColumnDef<PTData>[] = [
        {
            header: 'PT State',
            accessorKey: 'PTState',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT Location',
            accessorKey: 'PTLocation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT Enrollment Number',
            accessorKey: 'PTEnrollmentNumber',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT Registration Number',
            accessorKey: 'PTRegistrationNumber',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT Registration Date',
            accessorKey: 'PTRegistrationDate',
            cell: (props) => <div className="w-44 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT Remmitance Mode',
            accessorKey: 'PTRemmitanceMode',
            cell: (props) => <div className="w-44 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT User ID',
            accessorKey: 'PTUserID',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PT Password',
            accessorKey: 'PTPassword',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PTRC Payment Frequency',
            accessorKey: 'PTRCPaymentFrequency',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'PTEC Payment Frequency',
            accessorKey: 'PTECPaymentFrequency',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Authorized Signatory',
            accessorKey: 'AuthorizedSignatory',
            cell: (props) => <div className="w-52 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Designation',
            accessorKey: 'Designation',
            cell: (props) => <div className="w-40 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Mobile',
            accessorKey: 'Mobile',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
        {
            header: 'Email',
            accessorKey: 'Email',
            cell: (props) => <div className="w-28 truncate">{props.getValue() as string}</div>,
        },
    ];

    return (
        <AdaptableCard className="p-2 max-w-7xl">
            <div className='flex items-center gap-4 mb-8'>
                <Button
                    onClick={handleBack}
                    variant="plain"
                    size="sm"
                    icon={<HiArrowLeft />}
                />
                <div>
                    <h3>Company Details</h3>
                </div>
            </div>

            <div className="space-y-6">
                <div className="border p-4 rounded-lg shadow-sm bg-white w-full">
                    <h3 className="text-xl font-semibold mb-4">{companyGroupName}</h3>
                    <p>{companyName}</p>
                </div>
                <div className="flex gap-6">
                    <div className="border p-4 rounded-lg shadow-sm bg-white flex-1 w-2/5 ">
                        <h3 className="text-xl font-semibold mb-4">PF Setup Details</h3>
                        <DataTable columns={pfColumns} data={pfData} stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true} />
                    </div>

                    <div className="border p-4 rounded-lg shadow-sm bg-white flex-1 w-2/5">
                        <h3 className="text-xl font-semibold mb-4">ESI Setup Details</h3>
                        <DataTable columns={esiColumns} data={esiData} stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true} />
                    </div>
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-white flex-1">
                    <h3 className="text-xl font-semibold mb-4">LWF Setup Details</h3>
                    <DataTable columns={lwfColumns} data={lwfData} stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true} />
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-white flex-1">
                    <h3 className="text-xl font-semibold mb-4">PT Setup Details</h3>
                    <DataTable columns={ptColumns} data={ptData} stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true} />
                </div>
            </div>
           
        </AdaptableCard>
    );
};

export default CompanyDetails;