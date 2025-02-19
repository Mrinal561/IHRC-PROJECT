

import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

 const NoticesDashboard = () => {
  const noticesData = [
      { name: 'Total Notices', value: '10' },
      { name: 'Notice Open', value: '2' },
      { name: 'Under Process', value: '10' },
      { name: 'Notice Closed', value: '10' },
  ];

  const columns = useMemo(
      () => [
          {
              header: 'Notice Status',
              accessorKey: 'name',
              cell: (props) => {
                  const value = props.getValue() as string;
                  return (
                      <Tooltip title={value} placement="top">
                          <div className="w-auto truncate">
                              {value.length > 30 ? value.substring(0, 30) + '...' : value}
                          </div>
                      </Tooltip>
                  );
              },
          },
          {
              header: 'Count',
              accessorKey: 'value',
              cell: (props) => {
                  const value = props.getValue() as string;
                  return (
                      <Tooltip title={value} placement="top">
                          <div className="w-auto truncate">
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
      <div className="w-full overflow-x-auto">
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