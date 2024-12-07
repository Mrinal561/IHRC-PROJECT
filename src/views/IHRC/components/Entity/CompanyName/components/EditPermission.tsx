// // import React, { useState, useMemo, useEffect } from 'react';
// // import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// // import DataTable from '@/components/shared/DataTable';
// // import { Button, Tooltip, Badge, Dialog, toast, Notification, Checkbox, Input } from '@/components/ui';
// // import { RiCheckLine, RiCloseLine, RiEyeLine } from 'react-icons/ri';
// // import { HiOutlineViewGrid } from 'react-icons/hi';
// // import Lottie from 'lottie-react';
// // import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
// // import OutlinedSelect from '@/components/ui/Outlined';

// // const EditPermission = () => {
// //   // Filter options for the OutlinedSelect
// //   const filterOptions = [
// //     { label: 'PF Tracker', value: 'pf Tracker' },
// //     { label: 'PFIW Tracker', value: 'pfiw Tracker' },
// //     { label: 'ESI Tracker', value: 'esi Tracker' },
// //     { label: 'LWF Tracker', value: 'lwf Tracker' },
// //     { label: 'PTRC Tracker', value: 'ptrc Tracker' },
// //     { label: 'PTEC Tracker', value: 'ptec Tracker' }
// //   ];

// //   const [filter, setFilter] = useState('');
// //   const [data, setData] = useState([
// //     {
// //       companyName: 'ABC Inc.',
// //       editCount: 3,
// //       username: 'johndoe',
// //           status: 'pending',

// //     },
// //     {
// //       companyName: 'XYZ Corp.',
// //       editCount: 1,
// //       username: 'janesmith',
// //       status: 'pending'
// //     },
// //     {
// //       companyName: 'Acme Inc.',
// //       editCount: 5,
// //       username: 'bobsanders',
// //       status: 'pending'
// //     },
// //     {
// //       companyName: 'Globex LLC',
// //       editCount: 2,
// //       username: 'alicejones',
// //       status: 'pending'
// //     }
// //   ]);

// //   const [filteredData, setFilteredData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [tableData, setTableData] = useState({
// //     total: data.length,
// //     pageIndex: 1,
// //     pageSize: 10,
// //     query: '',
// //     sort: { order: '', key: '' },
// //   });

// //   useEffect(() => {
// //     setFilteredData(data.filter((item) => item.status === filter));
// //     setTableData((prev) => ({ ...prev, total: filteredData.length }));
// //   }, [data, filter, filteredData]);

// //   const columns: ColumnDef<typeof data[0]>[] = useMemo(
// //     () => [
// //       {
// //         header: 'Company Name',
// //         accessorKey: 'companyName',
// //         cell: (props) => (
// //           <Tooltip title={props.getValue() as string}>
// //             <div className="w-24 truncate">{props.getValue()}</div>
// //           </Tooltip>
// //         ),
// //       },
// //       {
// //         header: 'Edit Count',
// //         accessorKey: 'editCount',
// //       },
// //       {
// //         header: 'Username',
// //         accessorKey: 'username',
// //         cell: (props) => (
// //           <Tooltip title={props.getValue() as string}>
// //             <div className="w-24 truncate">{props.getValue()}</div>
// //           </Tooltip>
// //         ),
// //       },
// //       {
// //         header: 'Action',
// //         id: 'actions',
// //         cell: ({ row }) => (
// //           <div className="flex gap-2">
// //             <Tooltip title="Approve">
// //               <Button
// //                 size="sm"
// //                 onClick={() => handleApprove(row.index)}
// //                 icon={<RiCheckLine />}
// //               />
// //             </Tooltip>
// //             <Tooltip title="Reject">
// //               <Button
// //                 size="sm"
// //                 onClick={() => handleReject(row.index)}
// //                 icon={<RiCloseLine />}
// //               />
// //             </Tooltip>
// //           </div>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   // Handler for filter selection
// //   const handleFilterChange = (value: string) => {
// //     setFilter(value);
// //   };

// //   const handleApprove = (index) => {
// //     const updatedData = [...data];
// //     updatedData[index].status = 'approved';
// //     setData(updatedData);
// //   };

// //   const handleReject = (index) => {
// //     const updatedData = [...data];
// //     updatedData[index].status = 'rejected';
// //     setData(updatedData);
// //   };

// //   const onPaginationChange = (page: number) => {
// //     setTableData((prev) => ({ ...prev, pageIndex: page }));
// //   };

// //   const onSelectChange = (value: number) => {
// //     setTableData((prev) => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
// //   };

// //   const onSort = (sort: OnSortParam) => {
// //     setTableData((prev) => ({ ...prev, sort }));
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
// //         <div className="w-28 h-28">
// //           <Lottie animationData={loadingAnimation} loop className="w-24 h-24" />
// //         </div>
// //         <p className="text-lg font-semibold">Loading Data...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-8">
// //     <div className="flex justify-between items-center mb-12">
// //   <h1 className="font-semibold text-gray-800">Edit Permission Manager</h1>
// //   <div className="flex items-center gap-4">
// //     <div className="w-52">
// //       <OutlinedSelect
// //         label="Filter"
// //         options={filterOptions}
// //         value={filter}
// //         onChange={handleFilterChange}
// //       />
// //     </div>
// //     <Button
// //       size="sm"
// //       variant='solid'
// //     >
// //       Bulk Approve
// //     </Button>
// //     <Button
// //       size="sm"
// //       variant='solid'
// //     >
// //       Bulk Reject
// //     </Button>
// //   </div>
// // </div>
// //       <DataTable
// //         columns={columns}
// //         data={data}
// //         skeletonAvatarColumns={[0]}
// //         skeletonAvatarProps={{ className: 'rounded-md' }}
// //         loading={isLoading}
// //         pagingData={{
// //           total: tableData.total,
// //           pageIndex: tableData.pageIndex,
// //           pageSize: tableData.pageSize,
// //         }}
// //         onPaginationChange={onPaginationChange}
// //         onSelectChange={onSelectChange}
// //         onSort={onSort}
// //         stickyHeader={true}
// //         stickyFirstColumn={true}
// //         stickyLastColumn={true}
// //       />
// //     </div>
// //   );
// // };

// // export default EditPermission;

// import React, { useState, useMemo, useEffect } from 'react';
// import { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
// import DataTable from '@/components/shared/DataTable';
// import { Button, Tooltip, Badge, Dialog, toast, Notification, Checkbox, Input } from '@/components/ui';
// import { RiCheckLine, RiCloseLine, RiEyeLine } from 'react-icons/ri';
// import { HiOutlineViewGrid } from 'react-icons/hi';
// import Lottie from 'lottie-react';
// import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
// import OutlinedSelect from '@/components/ui/Outlined';

// const EditPermission = () => {
//   const filterOptions = [
//     { label: 'PF Tracker', value: 'pf Tracker' },
//     { label: 'PFIW Tracker', value: 'pfiw Tracker' },
//     { label: 'ESI Tracker', value: 'esi Tracker' },
//     { label: 'LWF Tracker', value: 'lwf Tracker' },
//     { label: 'PTRC Tracker', value: 'ptrc Tracker' },
//     { label: 'PTEC Tracker', value: 'ptec Tracker' }
//   ];

//   const [filter, setFilter] = useState('');
//   const [data, setData] = useState([
//     {
//       companyName: 'ABC Inc.',
//       editCount: 3,
//       username: 'johndoe',
//       status: 'pending',
//       lastUpdatedAt: '2024-12-06T14:30:00Z',
//       trackerType: 'PF Tracker'
//     },
//     {
//       companyName: 'XYZ Corp.',
//       editCount: 1,
//       username: 'janesmith',
//       status: 'pending',
//       lastUpdatedAt: '2024-12-06T12:15:00Z',
//       trackerType: 'PFIW Tracker'
//     },
//     {
//       companyName: 'Acme Inc.',
//       editCount: 5,
//       username: 'bobsanders',
//       status: 'pending',
//       lastUpdatedAt: '2024-12-05T18:45:00Z',
//       trackerType: 'ESI Tracker'
//     },
//     {
//       companyName: 'Globex LLC',
//       editCount: 2,
//       username: 'alicejones',
//       status: 'pending',
//       lastUpdatedAt: '2024-12-05T09:20:00Z',
//       trackerType: 'PTRC Tracker'
//     }
//   ]);

//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [tableData, setTableData] = useState({
//     total: data.length,
//     pageIndex: 1,
//     pageSize: 10,
//     query: '',
//     sort: { order: '', key: '' },
//   });

//   useEffect(() => {
//     setFilteredData(data.filter((item) => item.status === filter));
//     setTableData((prev) => ({ ...prev, total: filteredData.length }));
//   }, [data, filter, filteredData]);

//   const columns: ColumnDef<typeof data[0]>[] = useMemo(
//     () => [
//       {
//         header: 'Company Name',
//         accessorKey: 'companyName',
//         cell: (props) => (
//           <Tooltip title={props.getValue() as string}>
//             <div className="w-24 truncate">{props.getValue()}</div>
//           </Tooltip>
//         ),
//       },
//       {
//         header: 'Edit Count',
//         accessorKey: 'editCount',
//       },
//       {
//         header: 'Requested By',
//         accessorKey: 'username',
//         cell: (props) => (
//           <Tooltip title={props.getValue() as string}>
//             <div className="w-24 truncate">{props.getValue()}</div>
//           </Tooltip>
//         ),
//       },
//       {
//         header: 'Last Updated At',
//         accessorKey: 'lastUpdatedAt',
//         cell: (props) => {
//           const date = new Date(props.getValue() as string);
//           return (
//             <Tooltip title={date.toLocaleString()}>
//               <div className="w-50 truncate">
//                 {date.toLocaleDateString()} {date.toLocaleTimeString()}
//               </div>
//             </Tooltip>
//           );
//         },
//       },
//       {
//         header: 'Tracker Type',
//         accessorKey: 'trackerType',
//         cell: (props) => {
//           const type = props.getValue() as string;
//           return (
//             <Badge
//               className="text-xs"
//               content={type}
//             />
//           );
//         },
//       },
//       {
//         header: 'Action',
//         id: 'actions',
//         cell: ({ row }) => (
//           <div className="flex gap-2">
//             <Tooltip title="Approve">
//               <Button
//                 size="sm"
//                 onClick={() => handleApprove(row.index)}
//                 icon={<RiCheckLine />}
//               />
//             </Tooltip>
//             <Tooltip title="Reject">
//               <Button
//                 size="sm"
//                 onClick={() => handleReject(row.index)}
//                 icon={<RiCloseLine />}
//               />
//             </Tooltip>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const handleFilterChange = (value: string) => {
//     setFilter(value);
//   };

//   const handleApprove = (index) => {
//     const updatedData = [...data];
//     updatedData[index].status = 'approved';
//     setData(updatedData);
//   };

//   const handleReject = (index) => {
//     const updatedData = [...data];
//     updatedData[index].status = 'rejected';
//     setData(updatedData);
//   };

//   const onPaginationChange = (page: number) => {
//     setTableData((prev) => ({ ...prev, pageIndex: page }));
//   };

//   const onSelectChange = (value: number) => {
//     setTableData((prev) => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
//   };

//   const onSort = (sort: OnSortParam) => {
//     setTableData((prev) => ({ ...prev, sort }));
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
//         <div className="w-28 h-28">
//           <Lottie animationData={loadingAnimation} loop className="w-24 h-24" />
//         </div>
//         <p className="text-lg font-semibold">Loading Data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-12">
//         <h1 className="font-semibold text-gray-800">Edit Permission Manager</h1>
//         <div className="flex items-center gap-4">
//           <div className="w-52">
//             <OutlinedSelect
//               label="Filter"
//               options={filterOptions}
//               value={filter}
//               onChange={handleFilterChange}
//             />
//           </div>
//           <Button
//             size="sm"
//             variant="solid"
//           >
//             Bulk Approve
//           </Button>
//           <Button
//             size="sm"
//             variant="solid"
//           >
//             Bulk Reject
//           </Button>
//         </div>
//       </div>
//       <DataTable
//         columns={columns}
//         data={data}
//         skeletonAvatarColumns={[0]}
//         skeletonAvatarProps={{ className: 'rounded-md' }}
//         loading={isLoading}
//         pagingData={{
//           total: tableData.total,
//           pageIndex: tableData.pageIndex,
//           pageSize: tableData.pageSize,
//         }}
//         onPaginationChange={onPaginationChange}
//         onSelectChange={onSelectChange}
//         onSort={onSort}
//         stickyHeader={true}
//         stickyFirstColumn={true}
//         stickyLastColumn={true}
//       />
//     </div>
//   );
// };

// export default EditPermission;

import React, { useState, useMemo, useEffect } from 'react'
import { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import {
    Button,
    Tooltip,
    Badge,
    Dialog,
    toast,
    Notification,
    Checkbox,
    Input,
} from '@/components/ui'
import { RiCheckLine, RiCloseLine, RiEyeLine } from 'react-icons/ri'
import { HiOutlineViewGrid } from 'react-icons/hi'
import Lottie from 'lottie-react'
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import OutlinedSelect from '@/components/ui/Outlined'

const EditPermission = () => {
    const filterOptions = [
        { label: 'PF Tracker', value: 'pf Tracker' },
        { label: 'PFIW Tracker', value: 'pfiw Tracker' },
        { label: 'ESI Tracker', value: 'esi Tracker' },
        { label: 'LWF Tracker', value: 'lwf Tracker' },
        { label: 'PTRC Tracker', value: 'ptrc Tracker' },
        { label: 'PTEC Tracker', value: 'ptec Tracker' },
    ]

    const [filter, setFilter] = useState('')
    const [selectedItems, setSelectedItems] = useState(new Set())
    const [isAllSelected, setIsAllSelected] = useState(false)

    const handleSelectAllChange = () => {
        if (isAllSelected) {
            setSelectedItems(new Set())
        } else {
            const allIds = data.map((item) => item.id)
            setSelectedItems(new Set(allIds))
        }
        setIsAllSelected(!isAllSelected)
    }

    const handleCheckboxChange = (id) => {
        const newSelectedItems = new Set(selectedItems)
        if (selectedItems.has(id)) {
            newSelectedItems.delete(id)
            setIsAllSelected(false)
        } else {
            newSelectedItems.add(id)
            if (newSelectedItems.size === data.length) {
                setIsAllSelected(true)
            }
        }
        setSelectedItems(newSelectedItems)
    }

    const [data, setData] = useState([
        {
            id: '1', // Added ID field
            companyName: 'ABC Inc.',
            editCount: 3,
            username: 'johndoe',
            status: 'pending',
            lastUpdatedAt: '2024-12-06T14:30:00Z',
            trackerType: 'PF Tracker',
        },
        {
            id: '2',
            companyName: 'XYZ Corp.',
            editCount: 1,
            username: 'janesmith',
            status: 'pending',
            lastUpdatedAt: '2024-12-06T12:15:00Z',
            trackerType: 'PFIW Tracker',
        },
        {
            id: '3',
            companyName: 'Acme Inc.',
            editCount: 5,
            username: 'bobsanders',
            status: 'pending',
            lastUpdatedAt: '2024-12-05T18:45:00Z',
            trackerType: 'ESI Tracker',
        },
        {
            id: '4',
            companyName: 'Globex LLC',
            editCount: 2,
            username: 'alicejones',
            status: 'pending',
            lastUpdatedAt: '2024-12-05T09:20:00Z',
            trackerType: 'PTRC Tracker',
        },
    ])

    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, setTableData] = useState({
        total: data.length,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    })

    useEffect(() => {
        setFilteredData(data.filter((item) => item.status === filter))
        setTableData((prev) => ({ ...prev, total: filteredData.length }))
    }, [data, filter, filteredData])

    const columns: ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [
            // {
            //   header: ({ table }) => (
            //     <div className="w-2">
            //       <Checkbox
            //         checked={isAllSelected}
            //         onChange={handleSelectAllChange}
            //       />
            //     </div>
            //   ),
            //   id: 'select',
            //   cell: ({ row }) => (
            //     <div className="w-2">
            //       <Checkbox
            //         checked={selectedItems.has(row.original.id)}
            //         onChange={() => handleCheckboxChange(row.original.id)}
            //       />
            //     </div>
            //   ),
            // },
            {
                header: 'Company Name',
                accessorKey: 'companyName',
                cell: (props) => (
                    <Tooltip title={props.getValue() as string}>
                        <div className="w-24 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Edit Count',
                accessorKey: 'editCount',
            },
            {
                header: 'Requested By',
                accessorKey: 'username',
                cell: (props) => (
                    <Tooltip title={props.getValue() as string}>
                        <div className="w-24 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Last Updated At',
                accessorKey: 'lastUpdatedAt',
                cell: (props) => {
                    const date = new Date(props.getValue() as string)
                    return (
                        <Tooltip title={date.toLocaleString()}>
                            <div className="w-52 truncate">
                                {date.toLocaleDateString()}{' '}
                                {date.toLocaleTimeString()}
                            </div>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Tracker Type',
                accessorKey: 'trackerType',
                cell: (props) => {
                    const type = props.getValue() as string
                    return (
                        <Badge className="text-xs bg-sky-600" content={type} />
                    )
                },
            },
            {
                header: 'Action',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        <Tooltip title="Approve">
                            <Button
                                size="sm"
                                onClick={() => handleApprove(row.index)}
                                icon={<RiCheckLine />}
                            />
                        </Tooltip>
                        {/* <Tooltip title="Reject">
              <Button
                size="sm"
                onClick={() => handleReject(row.index)}
                icon={<RiCloseLine />}
              />
            </Tooltip> */}
                    </div>
                ),
            },
        ],
        [],
    )

    const handleFilterChange = (value: string) => {
        setFilter(value)
    }

    const handleApprove = (index) => {
        const updatedData = [...data]
        updatedData[index].status = 'approved'
        setData(updatedData)
    }

    const handleReject = (index) => {
        const updatedData = [...data]
        updatedData[index].status = 'rejected'
        setData(updatedData)
    }

    const onPaginationChange = (page: number) => {
        setTableData((prev) => ({ ...prev, pageIndex: page }))
    }

    const onSelectChange = (value: number) => {
        setTableData((prev) => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 1,
        }))
    }

    const onSort = (sort: OnSortParam) => {
        setTableData((prev) => ({ ...prev, sort }))
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
                <div className="w-28 h-28">
                    <Lottie
                        animationData={loadingAnimation}
                        loop
                        className="w-24 h-24"
                    />
                </div>
                <p className="text-lg font-semibold">Loading Data...</p>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-12">
                <h1 className="font-semibold text-gray-800">
                    Edit Permission Manager
                </h1>
                <div className="flex items-center gap-4">
                    <div className="w-52">
                        <OutlinedSelect
                            label="Filter"
                            options={filterOptions}
                            value={filter}
                            onChange={handleFilterChange}
                        />
                    </div>
                    {/* <Button
            size="sm"
            variant="solid"
          >
            Bulk Approve
          </Button>
          <Button
            size="sm"
            variant="solid"
          >
            Bulk Reject
          </Button> */}
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={isLoading}
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
            />
        </div>
    )
}

export default EditPermission
