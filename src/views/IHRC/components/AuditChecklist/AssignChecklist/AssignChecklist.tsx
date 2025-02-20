import React, { useState, useEffect, useCallback } from 'react'
import { useAppDispatch } from '@/store'
import reducer from './store'
import { Notification, toast } from '@/components/ui'
import AdaptableCard from '@/components/shared/AdaptableCard'
import AssignChecklistTable from './components/AssignChecklistTable'
import AssignChecklistTableTool from './components/AssignChecklistTableTool'
import Company from '../../Home/components/Company'
import { endpoints } from '@/api/endpoint'
import httpClient from '@/api/http-client'
import { fetchUsers } from '@/store/slices/userEntity/UserEntitySlice'
import { AppDispatch } from '@/store'
import { showErrorNotification } from '@/components/ui/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { fetchAuthUser } from '@/store/slices/login'
import { Loading } from '@/components/shared'
import { useDispatch } from 'react-redux'

interface SelectOption {
    label: string
    value: string
}

interface BranchOption {
    label: string
    value: string
}

interface Permissions {
    canList: boolean
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
}

const getPermissions = (menuItem: any): Permissions => {
    const permissionsObject = menuItem?.permissions || menuItem?.access || {}
    return {
        canList: !!permissionsObject.can_list,
        canCreate: !!permissionsObject.can_create,
        canEdit: !!permissionsObject.can_edit,
        canDelete: !!permissionsObject.can_delete,
    }
}

const AssignChecklist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [assignedData, setAssignedData] = useState([])
    const [tableKey, setTableKey] = useState(0)
    const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(
        null,
    )
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [selectedCompanyGroup, setSelectedCompanyGroup] =
        useState<SelectOption | null>(null)
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
        null,
    )
    const [selectedState, setSelectedState] = useState<SelectOption | null>(
        null,
    )
    const [selectedDistrict, setSelectedDistrict] =
        useState<SelectOption | null>(null)
    const [selectedLocation, setSelectedLocation] =
        useState<SelectOption | null>(null)

    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    })

    const [permissions, setPermissions] = useState<Permissions>({
        canList: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
    })
    const [isInitialized, setIsInitialized] = useState(false)
    const [permissionCheckComplete, setPermissionCheckComplete] =
        useState(false)

    //permission check section
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await dispatch(fetchAuthUser())

                // Check if moduleAccess exists in response
                if (!response.payload?.moduleAccess) {
                    toast.push(
                        <Notification title="Permission" type="danger">
                            You don't have access to any modules
                        </Notification>,
                    )
                    navigate('/home')
                    setPermissionCheckComplete(true)
                    setIsInitialized(true)
                    return
                }

                // Find Remittance Tracker module
                const remittanceModule = response.payload.moduleAccess?.find(
                    (module: any) => module.id === 2,
                )

                if (!remittanceModule) {
                    toast.push(
                        <Notification title="Permission" type="danger">
                            You don't have access to this module
                        </Notification>,
                    )
                    navigate('/home')
                    setPermissionCheckComplete(true)
                    setIsInitialized(true)
                    return
                }

                // Find PF Tracker menu item
                const recommendedMenu = remittanceModule.menus?.find(
                    (menu: any) => menu.id === 10,
                )

                if (!recommendedMenu) {
                    toast.push(
                        <Notification title="Permission" type="danger">
                            You don't have access to this menu
                        </Notification>,
                    )
                    navigate('/home')
                    setPermissionCheckComplete(true)
                    setIsInitialized(true)
                    return
                }

                // Get and set permissions only once
                const newPermissions = getPermissions(recommendedMenu)
                setPermissions(newPermissions)
                setIsInitialized(true)

                // If no list permission, show notification and redirect
                if (!newPermissions.canList) {
                    toast.push(
                        <Notification title="Permission" type="danger">
                            You don't have permission to view the Assigned List
                        </Notification>,
                    )
                    navigate('/home')
                }
                setPermissionCheckComplete(true)
            } catch (error) {
                console.error('Error fetching auth user:', error)
                toast.push(
                    <Notification title="Error" type="danger">
                        Failed to check permissions. Please try again later.
                    </Notification>,
                )
                navigate('/home')
                setIsInitialized(true)
                setPermissionCheckComplete(true)
            }
        }

        if (!isInitialized) {
            initializeAuth()
        }
    }, [dispatch, isInitialized, navigate])

    const fetchAssignedData = useCallback(
        async (page: number = 1, pageSize: number = 10) => {
            setIsLoading(true)

            try {
                const params: any = {
                    page,
                    page_size: pageSize,
                    'branch_id[]': selectedBranch?.value,
                    'group_id[]': selectedCompanyGroup?.value,
                    'company_id[]': selectedCompany?.value,
                    'tate_id[]': selectedState?.value,
                    'district_id[]': selectedDistrict?.value,
                    'location_id[]': selectedLocation?.value,
                }

                Object.keys(params).forEach((key) => {
                    if (!params[key]) {
                        delete params[key]
                    }
                })

                const response = await httpClient.get(
                    endpoints.assign.getAll(),
                    {
                        params,
                    },
                )

                if (response?.data?.data) {
                    setAssignedData(response.data.data)
                    setPagination((prev) => ({
                        ...prev,
                        total: response.data.paginate_data.totalResults,
                    }))
                } else {
                    console.log(
                        'No data in API response or unexpected response structure',
                    )
                }
            } catch (error) {
                console.error('Error fetching assigned data:', error)
                toast.push(
                    <Notification title="Error" closable={true} type="danger">
                        Failed to fetch assigned checklist data
                    </Notification>,
                )
            } finally {
                setIsLoading(false)
            }
        },
        [
            selectedBranch,
            selectedCompanyGroup,
            selectedCompany,
            selectedState,
            selectedDistrict,
            selectedLocation,
        ],
    )

    useEffect(() => {
        fetchAssignedData(pagination.pageIndex, pagination.pageSize)
    }, [fetchAssignedData, pagination.pageIndex, pagination.pageSize])

    const handleSelectedIdsChange = (ids: number[]) => {
        console.log('Selected IDs:', ids)
        setSelectedIds(ids)
    }

    const refreshTableAndReset = () => {
        fetchAssignedData()
        setSelectedIds([])
        setTableKey((prevKey) => prevKey + 1)
    }

    const handleBranchChange = (branch: BranchOption | null) => {
        console.log('Branch value received:', branch?.value)
        setSelectedBranch(branch)
    }

    const handlePaginationChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageIndex: page }))
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: newPageSize,
            pageIndex: 1,
        }))
    }

    console.log('Rendering AssignChecklist component', {
        isLoading,
        tableKey,
        dataLength: assignedData.length,
    })

    if (!isInitialized || !permissionCheckComplete) {
        return (
            <Loading loading={true} type="default">
                <div className="h-full" />
            </Loading>
        )
    }

    // Only render if we have list permission
    if (!permissions.canList) {
        return null
    }

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">
                <div className="">
                    <h3 className="text-2xl font-bold">Assigned Checklist</h3>
                    <p className="text-gray-600">
                        View your company's assigned compliance
                    </p>
                </div>
                <AssignChecklistTableTool
                    selectedIds={selectedIds}
                    refreshTable={refreshTableAndReset}
                    canCreate={permissions.canCreate}
                />
            </div>
            <div className="mb-8">
                <Company
                    onBranchChange={(branch) => handleBranchChange(branch)}
                    onCompanyGroupChange={setSelectedCompanyGroup}
                    onCompanyChange={setSelectedCompany}
                    onStateChange={setSelectedState}
                    onDistrictChange={setSelectedDistrict}
                    onLocationChange={setSelectedLocation}
                />
            </div>
            <AssignChecklistTable
                data={assignedData}
                loading={isLoading}
                tableKey={tableKey}
                refreshTable={refreshTableAndReset}
                onSelectedIdsChange={handleSelectedIdsChange}
                selectedId={selectedIds}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
                canCreate={permissions.canCreate}
            />
        </AdaptableCard>
    )
}

export default AssignChecklist
