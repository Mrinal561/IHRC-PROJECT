import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

// Virtual Agreement Table Component
const VirtualAgreement = () => {
    const agreementData = [
        { name: 'Total Agreement', value: '200', badgeColor: 'bg-blue-400 text-white',  },
        { name: 'Valid Agreement', value: '80', badgeColor: 'bg-amber-400 text-white',  },
        { name: 'Expired Agreement', value: '120', badgeColor: 'bg-red-400 text-white',  },
    ];

    const columns = useMemo(
        () => [
            {
                header: 'Agreement Status',
                enableSorting: false,
                accessorKey: 'name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                           <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Count',
                enableSorting: false,
                accessorKey: 'value',
                cell: (props) => {
                   const row = props.row.original;
                                       const value = props.getValue() as string;
                                       return (
                                           <Tooltip title={value} placement="top">
                                               <div
                                                   className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${row.badgeColor}`}>
                                {value.length > 18 ? value.substring(0, 18) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
        ],
        []
    );

    return (
        <div className="w-full overflow-x-auto py-2 p-1 bg-white rounded-lg shadow-lg border">
              <h2 className="text-base text-center font-semibold mb-6 mt-2">Virtual Branch Agreement Status</h2>
            <DataTable
                columns={columns}
                data={agreementData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                stickyHeader={true}
                selectable={false}
                showPageSizeSelector={false} 
            />
        </div>
    );
};

export default VirtualAgreement;