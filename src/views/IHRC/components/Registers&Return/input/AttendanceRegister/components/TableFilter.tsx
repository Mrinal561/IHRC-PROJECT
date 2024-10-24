import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { Company, companies } from '@/views/IHRC/store/dummyCompany';
import { RiEyeLine, RiUploadLine } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';

const TableFilter = () => {
    const columns: ColumnDef<Company>[] = useMemo(
        () => [
            // {
            //     header: 'Sl No',
            //     accessorKey: 'sl_no',
            //     cell: (props) => (
            //         <div className="w-16 truncate">{props.getValue()}</div>
            //     ),
            // },
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
                header: 'State',
                accessorKey: 'state',
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
                header: 'Branch',
                accessorKey: 'branch',
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
                header: 'Location',
                accessorKey: 'location',
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
                  const compliance = row.original;
                  return (
                    <div className='flex gap-2'>
                      <Tooltip title="View Uploaded Attendance Register" placement="top">
                                <Button
                                  size="sm"
                                //   onClick={() => navigate(`/app/IHRC/assign-list-detail/${row.original.Compliance_ID}`, { state: row.original })}
                                  icon={<RiEyeLine />}
                                  className='hover:bg-transparent'
                                />
                                
                    </Tooltip>
                      <Tooltip title="Upload Attendance Register" placement="top">
                        <Button
                          size="sm"
                        //   onClick={() => openDialog(compliance)}
                        >
                         {<RiUploadLine />}
                        </Button>
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