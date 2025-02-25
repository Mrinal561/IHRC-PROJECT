

import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

 const NoticesDashboard = () => {
  const noticesData = [
      { name: 'Open', value: '2'},
      //   { name: 'Under Process', value: '10', badgeColor: 'bg-amber-400 text-white', },
      { name: 'Closed', value: '10'},
      { name: 'Total', value: '12' },
  ];

  const columns = useMemo(
      () => [
          {
              header: 'Status',
              accessorKey: 'name',
              enableSorting: false,
              cell: (props) => {
                  const value = props.getValue() as string;
                  return (
                      <Tooltip title={value} placement="top">
                         <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs">
                              {value.length > 30 ? value.substring(0, 30) + '...' : value}
                          </div>
                      </Tooltip>
                  );
              },
          },
          {
              header: 'Count',
              accessorKey: 'value',
              enableSorting: false,
              cell: (props) => {
                   const row = props.row.original;
                                      const value = props.getValue() as string;
                                      return (
                                          <Tooltip title={value} placement="top">
                                              <div
                                                  className={`inline-flex items-center py-2 rounded-full text-xs font-semibold ${row.badgeColor}`}>
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
    <div className="w-full  overflow-x-auto py-2 bg-white rounded-lg shadow-lg border table-home h-100">
        <h2 className="text-base text-center font-semibold mb-2 mt-0">Notice Status</h2>
          <DataTable
              columns={columns}
              data={noticesData}
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

  export default NoticesDashboard;