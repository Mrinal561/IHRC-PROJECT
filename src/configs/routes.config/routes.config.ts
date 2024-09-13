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
        key: 'assignComplianceDetail.complianceItem',
        path:  `${APP_PREFIX_PATH}/IHRC/assign-list-detail/:complianceID`,
        component: lazy(() => import('@/views/IHRC/components/AuditChecklist/AssignChecklist/components/AssignComplianceDetails')),
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
    {
        key: 'groupMenu.collapse.item1',
        path: '/global-certificate',
        component: lazy(() =>
            import('@/views/IHRC/components/GlobalSettings/CertificateTemplate/CertificateTemplate')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/global-notification',
        component: lazy(() =>
            import('@/views/IHRC/components/GlobalSettings/NotificationSettings/NotificationSettings')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item3',
        path: '/global-status',
        component: lazy(() =>
            import('@/views/IHRC/components/GlobalSettings/StatusSettings/StatusSettings')
        ),
        authority: [],
    },
    {
        key: 'entityMenu.collapse.item1',
        path: '/company-group',
        component: lazy(() =>
            import('@/views/IHRC/components/Entity/CompanyGroup/CompanyGroup')
        ),
        authority: [],
    },
    {
        key: 'entityMenu.collapse.item2',
        path: '/company-name',
        component: lazy(() =>
            import('@/views/IHRC/components/Entity/CompanyName/CompanyName')
        ),
        authority: [],
    },
    {
        key: 'entityMenu.collapse.item3',
        path: '/state',
        component: lazy(() =>
            import('@/views/IHRC/components/Entity/State/State')
        ),
        authority: [],
    },
    {
        key: 'entityMenu.collapse.item4',
        path: '/location',
        component: lazy(() =>
            import('@/views/IHRC/components/Entity/Location/Location')
        ),
        authority: [],
    },
    {
        key: 'entityMenu.collapse.item5',
        path: '/branch',
        component: lazy(() =>
            import('@/views/IHRC/components/Entity/Branch/Branch')
        ),
        authority: [],
    },
    {
        key: 'entityMenu.pfSetup',
        path:  `${APP_PREFIX_PATH}/IHRC/pf-setup/:companyName`,
        component: lazy(() => import('@/views/IHRC/components/Entity/PFSetup/CompanyPFSetupPage')),
        authority: [],
      },
    {
        key: 'entityMenu.esiSetup',
        path:  `${APP_PREFIX_PATH}/IHRC/esi-setup/:companyName`,
        component: lazy(() => import('@/views/IHRC/components/Entity/ESICSetup/EsicSetup')),
        authority: [],
      },
    {
        key: 'entityMenu.LWFSetup',
        path:  `${APP_PREFIX_PATH}/IHRC/lwf-setup/:companyName`,
        component: lazy(() => import('@/views/IHRC/components/Entity/LWFSetup/LWFSetup')),
        authority: [],
      },
    {
        key: 'entityMenu.ptSetup',
        path:  `${APP_PREFIX_PATH}/IHRC/pt-setup/:companyName`,
        component: lazy(() => import('@/views/IHRC/components/Entity/CompanyName/components/CompanyPTSetupPage')),
        authority: [],
      },

    
]