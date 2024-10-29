
// import React, { useState, useEffect } from 'react';
// import CompanyGroupTool from './components/CompanyGroupTool';
// import CompanyTable from './components/CompanyTable';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import { useAppDispatch } from '@/store';
// import { fetchCompanyGroups } from '@/store/slices/companyGroup/companyGroupSlice';
// import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

// const CompanyGroup = () => {
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const [companyData, setCompanyData] = useState<CompanyGroupData[]>([]);
//     const [tableLoader, setTableLoader] = useState(false);

//     const fetchCompanyDataTable = async () => {
//         setIsLoading(true);
//         try {
//             const { payload: data }: any = await dispatch(fetchCompanyGroups());
//             if (data && data.data) {
//               setCompanyData(data.data);
//           }
//         } catch (error) {
//             console.error('Failed to fetch company groups:', error);
//         }
//         setIsLoading(false);
//     };

//     // Initial data fetch
//     useEffect(() => {
//         fetchCompanyDataTable();
//     }, []);


//     useEffect(()=>{
//         if(tableLoader){
//             fetchCompanyDataTable()
//             setTableLoader(false)
//         }
//     },[tableLoader])

//     // Handler to refresh data after changes
//     const handleDataChange = () => {
//         console.log("data is changing")
//         fetchCompanyDataTable();
       
//     };

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">Company Group Manager</h3>
//                 </div>
//                 <CompanyGroupTool setLoader={setTableLoader} onDataChange={handleDataChange} />
//             </div>
//             <CompanyTable 
//                 loader={tableLoader}
//                 setLoader={setTableLoader}
//                 companyData={companyData}
//                 isLoading={isLoading}
//                 onDataChange={handleDataChange}
//             />
//         </AdaptableCard>
//     );
// };

// export default CompanyGroup;


// import React, { useState, useEffect } from 'react';
// import CompanyGroupTool from './components/CompanyGroupTool';
// import CompanyTable from './components/CompanyTable';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import { useAppDispatch } from '@/store';
// import { fetchCompanyGroups } from '@/store/slices/companyGroup/companyGroupSlice';
// import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

// const CompanyGroup = () => {
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const [companyData, setCompanyData] = useState<CompanyGroupData[]>([]);
//     const [refreshTrigger, setRefreshTrigger] = useState(0); // Add this line

//     const fetchCompanyDataTable = async (page = 1, pageSize = 1) => {
//         setIsLoading(true);
//         try {
//             const { payload: data }: any = await dispatch(
//                 fetchCompanyGroups({ page, page_size: pageSize })
//             );
//             if (data && data.data) {
//                 setCompanyData(data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch company groups:', error);
//         }
//         setIsLoading(false);
//     };

//     // Initial data fetch
//     useEffect(() => {
//         fetchCompanyDataTable();
//     }, [refreshTrigger]); // Add refreshTrigger to dependency array

//     // Handler to refresh data after changes
//     const handleDataChange = () => {
//         setRefreshTrigger(prev => prev + 1); // Update this line
//     };

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">Company Group Manager</h3>
//                 </div>
//                 <CompanyGroupTool onDataChange={handleDataChange} />
//             </div>
//             <CompanyTable 
//                 companyData={companyData}
//                 isLoading={isLoading}
//                 onDataChange={handleDataChange}
//                 onFetchData={fetchCompanyDataTable}
//             />
//         </AdaptableCard>
//     );
// };

// export default CompanyGroup;


// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import CompanyTable from './components/CompanyTable';
// import { useAppDispatch } from '@/store';
// import { 
//     fetchCompanyGroups, 
//     createCompanyGroup 
// } from '@/store/slices/companyGroup/companyGroupSlice';
// import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

// const CompanyGroup = () => {
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const [dialogLoading, setDialogLoading] = useState(false);
//     const [companyData, setCompanyData] = useState<CompanyGroupData[]>([]);
//     const [tableLoader, setTableLoader] = useState(false);
//     const [dialogIsOpen, setDialogIsOpen] = useState(false);
//     const [newCompanyGroup, setNewCompanyGroup] = useState({
//         name: ''
//     });

//     const fetchCompanyDataTable = async () => {
//         setIsLoading(true);
//         try {
//             const { payload: data }: any = await dispatch(fetchCompanyGroups());
//             if (data && data.data) {
//                 setCompanyData(data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch company groups:', error);
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Failed to fetch company groups
//                 </Notification>
//             );
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchCompanyDataTable();
//     }, []);

//     useEffect(() => {
//         if (tableLoader) {
//             fetchCompanyDataTable();
//             setTableLoader(false);
//         }
//     }, [tableLoader]);

//     const handleDataChange = () => {
//         fetchCompanyDataTable();
//     };

//     const handleConfirm = async () => {
//         if (!newCompanyGroup.name.trim()) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Please enter a valid company group name
//                 </Notification>
//             );
//             return;
//         }

//         setDialogLoading(true);
//         try {
//             await dispatch(createCompanyGroup(newCompanyGroup));
//             onDialogClose();
//             setTableLoader(true);
//             toast.push(
//                 <Notification title="Success" type="success">
//                     Company Group added successfully
//                 </Notification>
//             );
//             handleDataChange();
//         } catch (error) {
//             toast.push(
//                 <Notification title="Failed" type="danger">
//                     Failed to add company group
//                 </Notification>
//             );
//         }
//         setDialogLoading(false);
//     };

//     const onDialogClose = () => {
//         setDialogIsOpen(false);
//         setNewCompanyGroup({ name: '' });
//     };

//     const handleInputChange = (field: keyof CompanyGroupData, value: string) => {
//         setNewCompanyGroup(prev => ({ ...prev, [field]: value }));
//     };

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">Company Group Manager</h3>
//                 </div>
//                 <Button 
//                     variant="solid" 
//                     onClick={() => setDialogIsOpen(true)} 
//                     icon={<HiPlusCircle />} 
//                     size="sm"
//                 >
//                     Add Company Group
//                 </Button>
//             </div>

//             <CompanyTable
//                 companyData={companyData}
//                 isLoading={isLoading}
//                 onDataChange={handleDataChange}
//             />

//             <Dialog
//                 isOpen={dialogIsOpen}
//                 onClose={onDialogClose}
//                 onRequestClose={onDialogClose}
//                 width={500}
//                 height={250}
//             >
//                 <div className="flex flex-col h-full justify-between">
//                     <h5 className="mb-4">Add Company Group</h5>
//                     <div className="flex flex-col gap-2">
//                         <p>Enter Your Company Group</p>
//                         <OutlinedInput 
//                             label="Company Group Name"
//                             value={newCompanyGroup.name}
//                             onChange={(value: string) => handleInputChange('name', value)}
//                         />
//                     </div>
//                     <div className="text-right mt-6">
//                         <Button
//                             className="mr-2"
//                             variant="plain"
//                             onClick={onDialogClose}
//                             disabled={dialogLoading}
//                         >
//                             Cancel
//                         </Button>
//                         <Button 
//                             variant="solid" 
//                             onClick={handleConfirm}
//                             loading={dialogLoading}
//                         >
//                             Confirm
//                         </Button>
//                     </div>
//                 </div>
//             </Dialog>
//         </AdaptableCard>
//     );
// };

// export default CompanyGroup;

// import React, { useState, useEffect } from 'react';
// import { Button, Dialog, Notification, toast } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import CompanyTable from './components/CompanyTable';
// import { useAppDispatch } from '@/store';
// import { 
//     fetchCompanyGroups, 
//     createCompanyGroup 
// } from '@/store/slices/companyGroup/companyGroupSlice';
// import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

// const CompanyGroup = () => {
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const [dialogLoading, setDialogLoading] = useState(false);
//     const [companyData, setCompanyData] = useState<CompanyGroupData[]>([]);
//     const [dialogIsOpen, setDialogIsOpen] = useState(false);
//     const [newCompanyGroup, setNewCompanyGroup] = useState({
//         name: ''
//     });

//     const fetchCompanyDataTable = async () => {
//         setIsLoading(true);
//         try {
//             const { payload: data }: any = await dispatch(fetchCompanyGroups());
//             if (data && data.data) {
//                 setCompanyData(data.data);
//             }
//         } catch (error) {
//             console.error('Failed to fetch company groups:', error);
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Failed to fetch company groups
//                 </Notification>
//             );
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchCompanyDataTable();
//     }, []);

//     const handleConfirm = async () => {
//         if (!newCompanyGroup.name.trim()) {
//             toast.push(
//                 <Notification title="Error" type="danger">
//                     Please enter a valid company group name
//                 </Notification>
//             );
//             return;
//         }

//         setDialogLoading(true);
//         try {
//             const result = await dispatch(createCompanyGroup(newCompanyGroup)).unwrap();
//             if (result) {
//                 onDialogClose();
//                 // Immediately fetch updated data
//                 await fetchCompanyDataTable();
//                 toast.push(
//                     <Notification title="Success" type="success">
//                         Company Group added successfully
//                     </Notification>
//                 );
//             }
//         } catch (error) {
//             toast.push(
//                 <Notification title="Failed" type="danger">
//                     Failed to add company group
//                 </Notification>
//             );
//         } finally {
//             setDialogLoading(false);
//         }
//     };

//     const onDialogClose = () => {
//         setDialogIsOpen(false);
//         setNewCompanyGroup({ name: '' });
//     };

//     const handleInputChange = (field: keyof CompanyGroupData, value: string) => {
//         setNewCompanyGroup(prev => ({ ...prev, [field]: value }));
//     };

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">Company Group Manager</h3>
//                 </div>
//                 <Button 
//                     variant="solid" 
//                     onClick={() => setDialogIsOpen(true)} 
//                     icon={<HiPlusCircle />} 
//                     size="sm"
//                 >
//                     Add Company Group
//                 </Button>
//             </div>

//             <CompanyTable 
//                 companyData={companyData}
//                 isLoading={isLoading}
//                 onDataChange={fetchCompanyDataTable}
//             />

//             <Dialog
//                 isOpen={dialogIsOpen}
//                 onClose={onDialogClose}
//                 onRequestClose={onDialogClose}
//                 width={500}
//                 height={250}
//             >
//                 <div className="flex flex-col h-full justify-between">
//                     <h5 className="mb-4">Add Company Group</h5>
//                     <div className="flex flex-col gap-2">
//                         <p>Enter Your Company Group</p>
//                         <OutlinedInput 
//                             label="Company Group Name"
//                             value={newCompanyGroup.name}
//                             onChange={(value: string) => handleInputChange('name', value)}
//                         />
//                     </div>
//                     <div className="text-right mt-6">
//                         <Button
//                             className="mr-2"
//                             variant="plain"
//                             onClick={onDialogClose}
//                             disabled={dialogLoading}
//                         >
//                             Cancel
//                         </Button>
//                         <Button 
//                             variant="solid" 
//                             onClick={handleConfirm}
//                             loading={dialogLoading}
//                         >
//                             Confirm
//                         </Button>
//                     </div>
//                 </div>
//             </Dialog>
//         </AdaptableCard>
//     );
// };

// export default CompanyGroup;


import React, { useState, useEffect } from 'react';
import { Button, Dialog, Notification, toast } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import AdaptableCard from '@/components/shared/AdaptableCard';
import CompanyTable from './components/CompanyTable';
import { useAppDispatch } from '@/store';
import { 
    fetchCompanyGroups, 
    createCompanyGroup 
} from '@/store/slices/companyGroup/companyGroupSlice';
import { CompanyGroupData } from '@/store/slices/companyGroup/companyGroupSlice';

const CompanyGroup = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyGroupData[]>([]);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [tableKey, setTableKey] = useState(0); // Add this to force table re-render
    const [newCompanyGroup, setNewCompanyGroup] = useState({
        name: ''
    });

    // Updated to include pagination parameters
    const fetchCompanyDataTable = async (page = 1, pageSize = 10) => {
        setIsLoading(true);
        try {
            const { payload: data }: any = await dispatch(
                fetchCompanyGroups({ page, page_size: pageSize })
            );
            if (data && data.data) {
                setCompanyData(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch company groups:', error);
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to fetch company groups
                </Notification>
            );
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCompanyDataTable();
    }, []);

    const handleConfirm = async () => {
        if (!newCompanyGroup.name.trim()) {
            toast.push(
                <Notification title="Error" type="danger">
                    Please enter a valid company group name
                </Notification>
            );
            return;
        }

        setDialogLoading(true);
        try {
            const result = await dispatch(createCompanyGroup(newCompanyGroup)).unwrap();
            if (result) {
                onDialogClose();
                // Force table component to re-render
                setTableKey(prevKey => prevKey + 1);
                // Fetch fresh data
                await fetchCompanyDataTable(1, 10); // Reset to first page after adding new item
                toast.push(
                    <Notification title="Success" type="success">
                        Company Group added successfully
                    </Notification>
                );
            }
        } catch (error) {
            toast.push(
                <Notification title="Failed" type="danger">
                    Failed to add company group
                </Notification>
            );
        } finally {
            setDialogLoading(false);
        }
    };

    const onDialogClose = () => {
        setDialogIsOpen(false);
        setNewCompanyGroup({ name: '' });
    };

    const handleInputChange = (field: keyof CompanyGroupData, value: string) => {
        setNewCompanyGroup(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Company Group Manager</h3>
                </div>
                <Button 
                    variant="solid" 
                    onClick={() => setDialogIsOpen(true)} 
                    icon={<HiPlusCircle />} 
                    size="sm"
                >
                    Add Company Group
                </Button>
            </div>

            <CompanyTable 
                key={tableKey} // Add key to force re-render
                companyData={companyData}
                isLoading={isLoading}
                onDataChange={fetchCompanyDataTable}
            />

            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                width={500}
                height={250}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Add Company Group</h5>
                    <div className="flex flex-col gap-2">
                        <p>Enter Your Company Group</p>
                        <OutlinedInput 
                            label="Company Group Name"
                            value={newCompanyGroup.name}
                            onChange={(value: string) => handleInputChange('name', value)}
                        />
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="mr-2"
                            variant="plain"
                            onClick={onDialogClose}
                            disabled={dialogLoading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="solid" 
                            onClick={handleConfirm}
                            loading={dialogLoading}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Dialog>
        </AdaptableCard>
    );
};

export default CompanyGroup;