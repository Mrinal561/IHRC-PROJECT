// import React, { useMemo, useState } from 'react';
// import DataTable from '@/components/shared/DataTable';
// import { Button, Tooltip, Dialog, Input, Notification, toast } from '@/components/ui';
// import cloneDeep from 'lodash/cloneDeep';
// import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
// import { Company, companies } from '@/views/IHRC/store/dummyCompany';
// import { RiEyeLine, RiUploadLine } from 'react-icons/ri';
// import { MdEdit } from 'react-icons/md';
// import BulkUpload from './BulkUpload';

// const TableFilter = () => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

//     const openDialog = (company: Company) => {
//         setSelectedCompany(company);
//         setIsDialogOpen(true);
//     };

//     const handleDialogClose = () => {
//         setIsDialogOpen(false);
//         setSelectedCompany(null);
//     };

//     const columns: ColumnDef<Company>[] = useMemo(
//         () => [
//             {
//                 header: 'Company Name',
//                 accessorKey: 'company_name',
//                 cell: (props) => {
//                     const value = props.getValue() as string;
//                     return (
//                         <Tooltip title={value} placement="top">
//                             <div className="w-48 truncate">
//                                 {value.length > 30 ? value.substring(0, 30) + '...' : value}
//                             </div>
//                         </Tooltip>
//                     );
//                 },
//             },
//             {
//                 header: 'State',
//                 accessorKey: 'state',
//                 cell: (props) => {
//                     const value = props.getValue() as string;
//                     return (
//                         <Tooltip title={value} placement="top">
//                             <div className="w-32 truncate">
//                                 {value.length > 18 ? value.substring(0, 18) + '...' : value}
//                             </div>
//                         </Tooltip>
//                     );
//                 },
//             },
//             {
//                 header: 'Status',
//                 accessorKey: 'status',
//                 cell: (props) => {
//                     const value = props.getValue() as string;
//                     return (
//                         <Tooltip title={value} placement="top">
//                             <div className="w-32 truncate">
//                                 {value.length > 18 ? value.substring(0, 18) + '...' : value}
//                             </div>
//                         </Tooltip>
//                     );
//                 },
//             },
//             {
//                 header: 'Actions',
//                 id: 'actions',
//                 cell: ({ row }) => {
//                     const company = row.original;
//                     return (
//                         <div className='flex gap-2'>
//                             <Tooltip title="View Uploaded Salary Register" placement="top">
//                                 <Button
//                                     size="sm"
//                                     icon={<RiEyeLine />}
//                                     className='hover:bg-transparent'
//                                 />
//                             </Tooltip>
//                             <Tooltip title="Upload Salary Register" placement="top">
//                                 <Button
//                                     size="sm"
//                                     onClick={() => openDialog(company)}
//                                     icon={<RiUploadLine />}
//                                 />
//                             </Tooltip>
//                         </div>
//                     );
//                 },
//             },
//         ],
//         []
//     );

//     const [tableData, setTableData] = useState({
//         total: companies.length,
//         pageIndex: 1,
//         pageSize: 10,
//         query: '',
//         sort: { order: '', key: '' },
//     });

//     const onPaginationChange = (page: number) => {
//         const newTableData = cloneDeep(tableData);
//         newTableData.pageIndex = page;
//         setTableData(newTableData);
//     };

//     const onSelectChange = (value: number) => {
//         const newTableData = cloneDeep(tableData);
//         newTableData.pageSize = Number(value);
//         newTableData.pageIndex = 1;
//         setTableData(newTableData);
//     };

//     const onSort = (sort: OnSortParam) => {
//         const newTableData = cloneDeep(tableData);
//         newTableData.sort = sort;
//         setTableData(newTableData);
//     };

//     return (
//         <div className="w-full overflow-x-auto">
//             <DataTable
//                 columns={columns}
//                 data={companies}
//                 skeletonAvatarColumns={[0]}
//                 skeletonAvatarProps={{ className: 'rounded-md' }}
//                 loading={false}
//                 pagingData={{
//                     total: tableData.total,
//                     pageIndex: tableData.pageIndex,
//                     pageSize: tableData.pageSize,
//                 }}
//                 onPaginationChange={onPaginationChange}
//                 onSelectChange={onSelectChange}
//                 onSort={onSort}
//                 stickyHeader={true}
//                 stickyFirstColumn={true}
//                 stickyLastColumn={true}
//                 selectable={true}
//             />
            
//             {isDialogOpen && selectedCompany && (
//                 <BulkUpload 
//                     isOpen={isDialogOpen}
//                     onClose={handleDialogClose}
//                     company={selectedCompany}
//                 />
//             )}
//         </div>
//     );
// };

// export default TableFilter;




import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Button, toast, Tooltip, Notification } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { Company, companies } from '@/views/IHRC/store/dummyCompany';
import { RiEyeLine } from 'react-icons/ri';
import { HiDownload } from 'react-icons/hi';

const TableFilter = () => {

    const DownloadNotification = () => {
        
            toast.push(
                <Notification title="success" type="success">
                  Register Downloaded Successfully
                </Notification>,
                { placement: 'top-end' }
              );
    }
    const columns: ColumnDef<Company>[] = useMemo(
        () => [
            {
                header: 'Company Name',
                accessorKey: 'company_name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-48 truncate">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Month',
                accessorKey: 'date',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">
                                {value.length > 18 ? value.substring(0, 18) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Uploaded Date',
                accessorKey: 'uploaded_Date',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">
                                {value.length > 18 ? value.substring(0, 18) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">
                                {value.length > 18 ? value.substring(0, 18) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => {
                    return (
                        <div className='flex gap-2'>
                            <Tooltip title="View Uploaded Attendance Register" placement="top">
                                <Button
                                    size="sm"
                                    icon={<RiEyeLine />}
                                    className='hover:bg-transparent'
                                />
                            </Tooltip>
                            <Tooltip title="Download Uploaded Attendance Register" placement="top">
                                <Button
                                    size="sm"
                                    icon={<HiDownload />}
                                    onClick={DownloadNotification}
                                    className='hover:bg-transparent'
                                />
                            </Tooltip>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const [tableData, setTableData] = useState({
        total: companies.length,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        setTableData(newTableData);
    };

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        setTableData(newTableData);
    };

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData);
        newTableData.sort = sort;
        setTableData(newTableData);
    };

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={companies}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
                selectable={true}
            />
        </div>
    );
};

export default TableFilter;