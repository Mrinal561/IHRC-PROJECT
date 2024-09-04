import { lazy } from 'react'
import authRoute from './authRoute'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/IHRC/components/Home/Home')),
        authority: [],
    },

    {
        key: 'recommendedList.item1',
        path: '/recommended-checklist',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/RecommendedList/RecommendedList')),
        authority: [],
    },
    
    {
        key: 'complianceDetail.statusItem',
        path:  `${APP_PREFIX_PATH}/IHRC/compliance-reupload/:complianceID`,
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/ReuploadDocument/ReuploadDocument')),
        authority: [],
    },
    {
        key: 'complianceDetail.complianceItem',
        path:  `${APP_PREFIX_PATH}/IHRC/compliance-list-detail/:complianceID`,
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/ComplianceRowDetails/ComplianceRowDetails')),
        authority: [],
    },
    {
        key: 'historyDetail.complianceItem',
        path:  `${APP_PREFIX_PATH}/IHRC/history-list-detail/:complianceID`,
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/HistoryPage/components/ViewDetails')),
        authority: [],
    },
    {
      key: 'complianceStatusDetail.complianceItem',
      path:  `${APP_PREFIX_PATH}/IHRC/compliance-status-list-detail/:complianceID`,
      component: lazy(() => import('@/views/IHRC/components/AuditChecklist/Status/components/ViewDetails')),
      authority: [],
    },
    {
        key: 'assignChecklist.item3',
        path: '/assigned-checklist',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/AssignChecklist/AssignChecklist')),
        authority: [],
    },
    {
        key: 'customChecklist.item4',
        path: '/custom-checklist',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/CustomChecklist/CustomChecklist')),
        authority: [],
    },
    {
        key: 'dueCompliance.item5',
        path: '/due-compliance',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/DueCompliance/DueCompliance')),
        authority: [],
    },
    {
        key: 'status.item6',
        path: '/status',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/Status/Status')),
        authority: [],
    },
    {
        key: 'complianceCertificate.item7',
        path: '/compliance-certificate',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/ComplianceCertificate/ComplianceCertificate')),
        authority: [],
    },
    {
        key: 'history.item8',
        path: '/history',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/HistoryPage/HistoryPage')),
        authority: [],
    },
    {
        key: 'customChecklist.customChecklistForm',
        path: '/assign-custom-form',
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/CustomChecklist/components/AssignCustomFormPage')),
        authority: [],
    },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: lazy(() =>
    //         import('@/views/IHRC/components/demo/GroupSingleMenuItemView')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: lazy(() =>
    //         import('@/views/IHRC/components/demo/GroupCollapseMenuItemView1')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: lazy(() =>
    //         import('@/views/IHRC/components/demo/GroupCollapseMenuItemView2')
    //     ),
    //     authority: [],
    // },
]