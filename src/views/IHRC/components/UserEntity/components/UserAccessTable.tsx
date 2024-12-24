
// import React, { useState, useMemo } from 'react';
// import DataTable from '@/components/shared/DataTable';
// import Lottie from 'lottie-react';
// import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
// import { HiOutlineViewGrid } from 'react-icons/hi';
// import { RiShieldKeyholeLine } from 'react-icons/ri';
// import { Button, Tooltip } from '@/components/ui';
// import { fetchUserById } from '@/store/slices/userEntity/UserEntitySlice';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { showErrorNotification } from '@/components/ui/ErrorMessage';

// const colorPalette = [
//     { bg: 'bg-blue-100', text: 'text-blue-700' },
//     { bg: 'bg-green-100', text: 'text-green-700' },
//     { bg: 'bg-purple-100', text: 'text-purple-700' },
//     { bg: 'bg-rose-100', text: 'text-rose-700' },
//     { bg: 'bg-amber-100', text: 'text-amber-700' },
//     { bg: 'bg-teal-100', text: 'text-teal-700' },
//     { bg: 'bg-indigo-100', text: 'text-indigo-700' },
//     { bg: 'bg-pink-100', text: 'text-pink-700' }
// ];

// const getModuleColor = (moduleName, colorMap) => {
//     if (!colorMap.has(moduleName)) {
//         const colorIndex = colorMap.size % colorPalette.length;
//         colorMap.set(moduleName, colorPalette[colorIndex]);
//     }
//     return colorMap.get(moduleName);
// };

// const ModuleBox = ({ module, colors }) => {
//     return (
//         <div className="inline-block mb-2 last:mb-0">
//             <div className={`rounded-md px-3 py-1 ${colors.bg}`}>
//                 <span className={`font-medium whitespace-nowrap ${colors.text}`}>
//                     {module.name}
//                 </span>
//             </div>
//         </div>
//     );
// };

// const getChildColors = (parentBg, parentText) => {
//     const colorMap = {
//         'bg-blue-100': { bg: 'bg-blue-50', text: 'text-blue-600' },
//         'bg-green-100': { bg: 'bg-green-50', text: 'text-green-600' },
//         'bg-purple-100': { bg: 'bg-purple-50', text: 'text-purple-600' },
//         'bg-rose-100': { bg: 'bg-rose-50', text: 'text-rose-600' },
//         'bg-amber-100': { bg: 'bg-amber-50', text: 'text-amber-600' },
//         'bg-teal-100': { bg: 'bg-teal-50', text: 'text-teal-600' },
//         'bg-indigo-100': { bg: 'bg-indigo-50', text: 'text-indigo-600' },
//         'bg-pink-100': { bg: 'bg-pink-50', text: 'text-pink-600' }
//     };
//     return colorMap[parentBg] || { bg: 'bg-gray-50', text: 'text-gray-600' };
// };

// const MenuItemBox = ({ menu, parentColors }) => {
//     return (
//         <div className="flex items-center gap-2">
//             {/* Parent Menu Item */}
//             <div className={`inline-flex items-center rounded-md px-3 py-1 ${parentColors.bg}`}>
//                 <span className={`font-medium whitespace-nowrap ${parentColors.text}`}>
//                     {menu.name}
//                 </span>
//             </div>
            
//             {/* Children Menu Items */}
//             {menu.children && menu.children.length > 0 && (
//                 <div className="flex items-center gap-2">
//                     <div className="text-black text-lg font-medium">→</div>
//                     {menu.children.map((childMenu, idx) => (
//                         <div key={idx} className="flex items-center gap-2">
//                             <div 
//                                 className={`inline-flex items-center rounded-md px-3 py-1 ${getChildColors(parentColors.bg, parentColors.text).bg}`}
//                             >
//                                 <span className={`whitespace-nowrap ${getChildColors(parentColors.bg, parentColors.text).text}`}>
//                                     {childMenu.name}
//                                 </span>
//                             </div>
                            
//                             {/* Recursive rendering for nested children */}
//                             {childMenu.children && childMenu.children.length > 0 && (
//                                 <>
//                                     <div className="text-gray-300">→</div>
//                                     {childMenu.children.map((grandChild, index) => (
//                                         <MenuItemBox 
//                                             key={index} 
//                                             menu={grandChild} 
//                                             parentColors={getChildColors(parentColors.bg, parentColors.text)}
//                                         />
//                                     ))}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// const ModuleMenuGroup = ({ module, colors }) => {
//     return (
//         <div className="flex flex-wrap gap-4 mb-4 last:mb-0">
//             {module.menus.map((menu, idx) => (
//                 <MenuItemBox 
//                     key={idx} 
//                     menu={menu} 
//                     parentColors={colors}
//                 />
//             ))}
//         </div>
//     );
// };

// const UserAccessTable = ({ userData, isLoading, onDataChange }) => {
//     const moduleColorMap = new Map();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [tableData, setTableData] = useState({
//         total: 0,
//         pageIndex: 1,
//         pageSize: 10,
//         query: '',
//         sort: { order: '', key: '' },
//     });

//     const handleModifyPermission = async (userData) => {
//         // Implement your permission modification logic here
//         // console.log(userData.id)
//         try {
//             const response = await dispatch(fetchUserById(userData.user_details.id))
//             console.log("response", response)
//             if (response) {
//                 navigate('/user-permission', { state: { userData: response.payload } });
//                 console.log("nice", response.payload.data)
//             }
//         } catch (error) {
//             showErrorNotification('Failed to fetch role details');
//         }
//         console.log('Modify permission for:', userData);
//     };

//     const columns = useMemo(
//         () => [
//             {
//                 header: 'Name',
//                 accessorKey: 'user_details.name',
//                 cell: (props) => (
//                     <div className="text-gray-700">{props.getValue()}</div>
//                 ),
//             },
//             {
//                 header: 'Role',
//                 accessorKey: 'role_details.name',
//                 cell: (props) => (
//                     <div className="text-gray-700">{props.getValue()}</div>
//                 ),
//             },
//             {
//                 header: 'Module Access',
//                 accessorKey: 'role_details.modules',
//                 cell: ({ getValue }) => {
//                     const modules = getValue() || [];
//                     return (
//                         <div className="flex flex-wrap gap-2">
//                             {modules.map((module, idx) => {
//                                 const colors = getModuleColor(module.name, moduleColorMap);
//                                 return (
//                                     <ModuleBox 
//                                         key={idx} 
//                                         module={module} 
//                                         colors={colors}
//                                     />
//                                 );
//                             })}
//                         </div>
//                     );
//                 },
//             },
//             {
//                 header: 'Menu Access',
//                 accessorKey: 'role_details.modules',
//                 cell: ({ getValue }) => {
//                     const modules = getValue() || [];
//                     return (
//                         <div className="flex flex-col">
//                             {modules.map((module, idx) => {
//                                 const colors = getModuleColor(module.name, moduleColorMap);
//                                 return (
//                                     <ModuleMenuGroup 
//                                         key={idx} 
//                                         module={module} 
//                                         colors={colors}
//                                     />
//                                 );
//                             })}
//                         </div>
//                     );
//                 },
//             },
//             {
//                 header: 'Actions',
//                 id: 'actions',
//                 cell: ({ row }) => (
//                     <div className="flex items-center">
//                         <Tooltip title="Modify Permission">
//                             <Button
//                                 size="sm"
//                                 variant="plain"
//                                 onClick={() => handleModifyPermission(row.original)}
//                                 icon={<RiShieldKeyholeLine className="h-5 w-5" />}
//                                 className="text-gray-600 hover:text-purple-600 transition-colors"
//                             />
//                         </Tooltip>
//                     </div>
//                 ),
//             },
//         ],
//         []
//     );

//     const onPaginationChange = (page) => {
//         setTableData(prev => ({ ...prev, pageIndex: page }));
//         onDataChange?.(page, tableData.pageSize);
//     };

//     const onSelectChange = (value) => {
//         const newPageSize = Number(value);
//         setTableData(prev => ({
//             ...prev,
//             pageSize: newPageSize,
//             pageIndex: 1,
//         }));
//         onDataChange?.(1, newPageSize);
//     };

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
//                 <div className="w-28 h-28">
//                     <Lottie 
//                         animationData={loadingAnimation} 
//                         loop 
//                         className="w-24 h-24"
//                     />
//                 </div>
//                 <p className="text-lg font-semibold">Loading Data...</p>
//             </div>
//         );
//     }

//     const formattedData = Array.isArray(userData) ? userData : [userData];

//     return (
//         <div className="relative">
//             {formattedData.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
//                     <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
//                     <p className="text-center">No Users Available</p>
//                 </div>
//             ) : (
//                 <DataTable
//                     columns={columns}
//                     data={userData}
//                     loading={isLoading}
//                     pagingData={{
//                         total: tableData.total,
//                         pageIndex: tableData.pageIndex,
//                         pageSize: tableData.pageSize,
//                     }}
//                     onPaginationChange={onPaginationChange}
//                     onSelectChange={onSelectChange}
//                     stickyHeader={true}
//                 />
//             )}
//         </div>
//     );
// };

// export default UserAccessTable;

import React, { useState, useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { Button, Tooltip } from '@/components/ui';
import { fetchUserById } from '@/store/slices/userEntity/UserEntitySlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showErrorNotification } from '@/components/ui/ErrorMessage';

const colorPalette = [
    { bg: 'bg-blue-100', text: 'text-blue-700' },
    { bg: 'bg-green-100', text: 'text-green-700' },
    { bg: 'bg-purple-100', text: 'text-purple-700' },
    { bg: 'bg-rose-100', text: 'text-rose-700' },
    { bg: 'bg-amber-100', text: 'text-amber-700' },
    { bg: 'bg-teal-100', text: 'text-teal-700' },
    { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    { bg: 'bg-pink-100', text: 'text-pink-700' }
];

const getModuleColor = (moduleName, colorMap) => {
    if (!colorMap.has(moduleName)) {
        const colorIndex = colorMap.size % colorPalette.length;
        colorMap.set(moduleName, colorPalette[colorIndex]);
    }
    return colorMap.get(moduleName);
};

const ModuleBox = ({ module, colors }) => {
    return (
        <div className="inline-block mb-2 last:mb-0">
            <div className={`rounded-md px-3 py-1 ${colors.bg}`}>
                <span className={`font-medium whitespace-nowrap ${colors.text}`}>
                    {module.name}
                </span>
            </div>
        </div>
    );
};

const getChildColors = (parentBg, parentText) => {
    const colorMap = {
        'bg-blue-100': { bg: 'bg-blue-50', text: 'text-blue-600' },
        'bg-green-100': { bg: 'bg-green-50', text: 'text-green-600' },
        'bg-purple-100': { bg: 'bg-purple-50', text: 'text-purple-600' },
        'bg-rose-100': { bg: 'bg-rose-50', text: 'text-rose-600' },
        'bg-amber-100': { bg: 'bg-amber-50', text: 'text-amber-600' },
        'bg-teal-100': { bg: 'bg-teal-50', text: 'text-teal-600' },
        'bg-indigo-100': { bg: 'bg-indigo-50', text: 'text-indigo-600' },
        'bg-pink-100': { bg: 'bg-pink-50', text: 'text-pink-600' }
    };
    return colorMap[parentBg] || { bg: 'bg-gray-50', text: 'text-gray-600' };
};

const MenuItemBox = ({ menu, parentColors }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`inline-flex items-center rounded-md px-3 py-1 ${parentColors.bg}`}>
                <span className={`font-medium whitespace-nowrap ${parentColors.text}`}>
                    {menu.name}
                </span>
            </div>
            
            {menu.children && menu.children.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="text-gray-400">→</div>
                    {menu.children.map((childMenu, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div 
                                className={`inline-flex items-center rounded-md px-3 py-1 ${getChildColors(parentColors.bg, parentColors.text).bg}`}
                            >
                                <span className={`whitespace-nowrap ${getChildColors(parentColors.bg, parentColors.text).text}`}>
                                    {childMenu.name}
                                </span>
                            </div>
                            {childMenu.children && childMenu.children.length > 0 && (
                                <>
                                    <div className="text-gray-400">→</div>
                                    {childMenu.children.map((grandChild, index) => (
                                        <MenuItemBox 
                                            key={index} 
                                            menu={grandChild} 
                                            parentColors={getChildColors(parentColors.bg, parentColors.text)}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ModuleMenuGroup = ({ module, colors }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-4 last:mb-0">
            {module.menus.map((menu, idx) => (
                <MenuItemBox 
                    key={idx} 
                    menu={menu} 
                    parentColors={colors}
                />
            ))}
        </div>
    );
};

const UserAccessTable = ({ userData, isLoading, onDataChange }) => {
    const moduleColorMap = new Map();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });

    const handleModifyPermission = async (userData) => {
        try {
            const response = await dispatch(fetchUserById(userData.user_details.id));
            if (response) {
                navigate('/user-permission', { state: { userData: response.payload } });
            }
        } catch (error) {
            showErrorNotification('Failed to fetch role details');
        }
    };

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'user_details.name',
                cell: (props) => (
                    <div className="text-gray-700">{props.getValue()}</div>
                ),
            },
            {
                header: 'Role',
                accessorKey: 'role_details.name',
                cell: (props) => (
                    <div className="text-gray-700">{props.getValue()}</div>
                ),
            },
            {
                header: 'Module Access',
                accessorKey: 'moduleAccess',
                cell: ({ getValue }) => {
                    const modules = getValue() || [];
                    return (
                        <div className="flex flex-wrap gap-2">
                            {modules.map((module, idx) => {
                                const colors = getModuleColor(module.name, moduleColorMap);
                                return module.access.can_list && (
                                    <ModuleBox 
                                        key={idx} 
                                        module={module} 
                                        colors={colors}
                                    />
                                );
                            })}
                        </div>
                    );
                },
            },
            {
                header: 'Menu Access',
                accessorKey: 'moduleAccess',
                cell: ({ getValue }) => {
                    const modules = getValue() || [];
                    return (
                        <div className="flex flex-col">
                            {modules.map((module, idx) => {
                                const colors = getModuleColor(module.name, moduleColorMap);
                                const hasAccessibleMenus = module.menus.some(menu => 
                                    menu.access.can_list || 
                                    (menu.children && menu.children.some(child => child.access.can_list))
                                );
                                return hasAccessibleMenus && (
                                    <ModuleMenuGroup 
                                        key={idx} 
                                        module={module} 
                                        colors={colors}
                                    />
                                );
                            })}
                        </div>
                    );
                },
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center">
                        <Tooltip title="Modify Permission">
                            <Button
                                size="sm"
                                variant="plain"
                                onClick={() => handleModifyPermission(row.original)}
                                icon={<RiShieldKeyholeLine className="h-5 w-5" />}
                                className="text-gray-600 hover:text-purple-600 transition-colors"
                            />
                        </Tooltip>
                    </div>
                ),
            },
        ],
        []
    );

    const onPaginationChange = (page) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
        onDataChange?.(page, tableData.pageSize);
    };

    const onSelectChange = (value) => {
        const newPageSize = Number(value);
        setTableData(prev => ({
            ...prev,
            pageSize: newPageSize,
            pageIndex: 1,
        }));
        onDataChange?.(1, newPageSize);
    };

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
        );
    }

    return (
        <div className="relative">
            {!userData || userData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
                    <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-center">No Users Available</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={userData}
                    loading={isLoading}
                    pagingData={{
                        total: tableData.total,
                        pageIndex: tableData.pageIndex,
                        pageSize: tableData.pageSize,
                    }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
                    stickyHeader={true}
                />
            )}
        </div>
    );
};

export default UserAccessTable;