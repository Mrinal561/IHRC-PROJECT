const api = (endpoint: string) =>
    `${import.meta.env.VITE_API_GATEWAY}${endpoint}`

export const endpoints = {
    auth: {
        login: () => api('companyadmin/login'),
        refresh: () => api('companyadmin/refresh'),
        signup: () => api('companyadmin/signup'),
        logout: () => api('companyadmin/logout'),
        profile: () => api('companyadmin/profile'),
    },
    companyGroup: {
        getAll: () => api('companyadmin/company-group'),
        getById: (id: string) => api(`companyadmin/company-group/${id}`),
        create: () => api('companyadmin/company-group'),
        update: (id: string) => api(`companyadmin/company-group/${id}`),
        delete: (id: string) => api(`companyadmin/company-group/${id}`),
    },
    company: {
        getAll: (actualCompanyName: any) => api('companyadmin/company'),
        getById: (id: string) => api(`companyadmin/company/${id}`),
        create: () => api('companyadmin/company'),
        update: (id: string) => api(`companyadmin/company/${id}`),
        delete: (id: string) => api(`companyadmin/company/${id}`),
        downloadFormat: () => api(`upload/sample_files/export-template`),
        bulkCreate: () => api(`/companyadmin/company/bulk-upload`),
    },
    common: {
        getAll: () => api('/company-group'),
        state: () => api('/states'),
        district: () => api('/district'),
        location: () => api('/location'),
        getSubCategory: () => api('/subcategory-suggestions'),
        createSubCategory: () => api('/subcategory')
    },
    user: {
        getAll: () => api('companyadmin/user'),
        getById: (id: any) => api(`companyadmin/user/${id}`),
        create: () => api('companyadmin/user'),
        update: (id: string) => api(`companyadmin/user/${id}`),
        delete: (id: string) => api(`companyadmin/user/${id}`),
        updatePermission:(id:any)=> api(`companyadmin/user/permissions/${id}`)
    },
    complianceSuperadmin: {
        getAll: () => api('/companyadmin/compliance/recommend'),
        // getAll: () => api('/companyadmin/compliance/recommend'),
    },
    assign: {
        create: () => api('companyadmin/compliance'),
        getAll: () => api('companyadmin/compliance'),
        // create: () => api('companyadmin/compliance'),
        // getAll: () => api('companyadmin/compliance'),
        update: () => api(`companyadmin/compliance/assign-user`),
    },
    due: {
        getAll: () => api('companyadmin/compliance/data'),
        updateStatus: (id: string) =>
            api(`/companyadmin/compliance/data/update/${id}`),
    },
    branch: {
        getAll: () => api('companyadmin/branch'),
        getById: (id: string) => api(`companyadmin/branch/${id}`),
        create: () => api('companyadmin/branch'),
        update: (id: string) => api(`companyadmin/branch/${id}`),
        // update: (id: string) => api(`companyadmin/branch/${id}`),
        delete: (id: string) => api(`companyadmin/branch/${id}`),
        downloadFormat: () => api(`upload/sample_files/branch.xlsx`),
        bulkCreate: () => api(`/companyadmin/branch/bulk-upload`),
    },
    role: {
        getAll: () => api('companyadmin/role'),
        create:()=> api(`companyadmin/role`),
        update:(id:any)=> api(`companyadmin/role/${id}`),
        getById:(id:any)=> api(`companyadmin/role/${id}`),
        delete:(id:any)=> api(`companyadmin/role/${id}`),
        rolePermission:(id:any) => api(`/companyadmin/role/role-permission/${id}`)
    },
    compliance: {
        getAll: () =>
            api(`/companyadmin/compliance/data?data_status[]=${status}`),
        approveReject: () => api('/companyadmin/compliance/data/record-status'),
        export: () => api('companyadmin/compliance/data/export'),
        upload: () => api('/companyadmin/compliance/data/bulk-update'),
    },
    esiSetup: {
        getAll: () => api('companyadmin/esisetup'),
        getById: (id: string) => api(`companyadmin/esisetup/${id}`), 
        create: () => api('companyadmin/esisetup'),
        // download: () => api(`companyadmin/esisetup/esi-tracker/export`)
         update: (id: any) => api(`/companyadmin/esisetup/${id}`),
         delete: (id:any) => api(`companyadmin/esisetup/${id}`)
    },
    pfSetup: {
        getAll: () => api('companyadmin/pfsetup'),
        create: () => api('companyadmin/pfsetup'),
        getById: (id: any) => api(`companyadmin/pfsetup/${id}`),
        update: (id: any) => api(`/companyadmin/pfsetup/${id}`),
        delete: (id:any) => api(`companyadmin/pfsetup/${id}`)   
    },
    ptSetup: {
        getAll: () => api('companyadmin/ptsetup'),
        create: () => api('companyadmin/ptsetup'),
        getById: (id: any) => api(`companyadmin/ptsetup/${id}`),
        update: (id: any) => api(`companyadmin/ptsetup/${id}`),
        delete: (id:any) => api(`companyadmin/ptsetup/${id}`)
    },
    tracker: {
        downloadFormat: () => api('/companyadmin/pfsetup/pf-tracker/exportdata'),
        pfUpload: () => api('companyadmin/pfsetup/pf-tracker'),
        pfGetALl: () => api(`companyadmin/pfsetup/pf-tracker`),
        uploadDocs: (id: any) =>
            api(`companyadmin/pfsetup/pf-tracker/document/${id}`),
        downloadALl: () => api('/companyadmin/pfsetup/pf-tracker/export'),
        getById: (id: any) => api(`companyadmin/pfsetup/pf-tracker/${id}`),
        delete: (id: string) => api(`companyadmin/pfsetup/pf-delete/${id}`),
        update: (id: any) => api(`/companyadmin/pfsetup/pf-tracker/${id}`),
    },
    esiTracker: {
        getAll: () => api(`companyadmin/esisetup/esi-tracker`),
        bulkUpload: () => api(`companyadmin/esisetup/esi-tracker`),
        download: () => api('/companyadmin/esisetup/esi-tracker/exportdata'),
        uploadDocs: (id: any) =>
            api(`companyadmin/esisetup/esi-tracker/challan/${id}`),
        downloadAll: () => api('/companyadmin/esisetup/esi-tracker/export'),
        getById: (id: any) => api(`companyadmin/esisetup/esi-tracker/${id}`),
        delete: (id: string) => api(`companyadmin/esisetup/esi-delete/${id}`),
        update: (id: any) => api(`/companyadmin/esisetup/esi-tracker/${id}`),
    },
    ptrc: {
        download: () => api('/companyadmin/ptsetup/ptrc-tracker/exportdata'),
        bulkUpload: () => api('companyadmin/ptsetup/ptrc-tracker'),
        getAll: () => api('/companyadmin/ptsetup/ptrc-tracker'),
        uploadDocs: (id: any) =>
            api(`/companyadmin/ptsetup/ptrc-tracker/document/${id}`),
        downloadAll: () => api('/companyadmin/ptsetup/ptrc-tracker/export'),
        delete: (id: any) => api(`companyadmin/ptsetup/ptrc-delete/${id}`),
        getById: (id: any) => api(`companyadmin/ptsetup/ptrc-tracker/${id}`),
         update: (id: any) => api(`/companyadmin/ptsetup/ptrc-tracker/${id}`),
    },
    // ptTracker: {
    //     getAll: () => api(`companyadmin/esisetup/esi-tracker`),
    //     bulkUpload: () => api(`companyadmin/esisetup/esi-tracker`),
    //     download: () => api(`upload/sample_files/esi-tracker.xlsx`)
    //    },
    ptTracker: {
        getAll: () => api(`companyadmin/esisetup/esi-tracker`),
        bulkUpload: () => api(`companyadmin/esisetup/esi-tracker`),
        download: () => api(`upload/sample_files/esi-tracker.xlsx`),
    },
    ptec: {
        download: () => api('/companyadmin/ptsetup/ptec-tracker/exportdata'),
        // download: () => api('upload/sample_files/ptec-tracker.xlsx'),
        bulkUpload: () => api('/companyadmin/ptsetup/ptec-tracker'),
        getAll: () => api('/companyadmin/ptsetup/ptec-tracker'),
        uploadDocs: (id: any) =>
            api(`/companyadmin/ptsetup/ptec-tracker/document/${id}`),
        downloadAll: () => api('/companyadmin/ptsetup/ptec-tracker/export'),
        delete: (id: any) => api(`companyadmin/ptsetup/ptec-delete/${id}`),
        getById: (id: any) => api(`companyadmin/ptsetup/ptec-tracker/${id}`),
        update: (id: any) => api(`/companyadmin/ptsetup/ptec-tracker/${id}`),
    },
    pfiwtracker: {
        download: () => api('companyadmin/pfsetup/pfiw-tracker/exportdata'),
        bulkupload: () => api('/companyadmin/pfsetup/pfiw-tracker'),
        pfiwGetAll: () => api('/companyadmin/pfsetup/pfiw-tracker'),
        challanupload: (id: any) =>
            api(`/companyadmin/pfsetup/pfiw-tracker/document/${id}`),
        downloadALl: () => api('/companyadmin/pfsetup/pfiw-tracker/export'),
        delete: (id: any) => api(`companyadmin/pfsetup/pfiw-delete/${id}`),
        getById: (id: any) => api(`companyadmin/pfsetup/pfiw-tracker/${id}`),
        update: (id: any) => api(`/companyadmin/pfsetup/pfiw-tracker/${id}`),
    },
    lwftracker: {
        downlaodAll: () => api(`/companyadmin/lwfsetup/lwf-tracker/export`),
        download: () => api('companyadmin/lwfsetup/lwf-tracker/exportdata'),
        bulkupload: () => api('/companyadmin/lwfsetup/lwf-tracker'),
        lwfGetAll: () => api('companyadmin/lwfsetup/lwf-tracker'),
        upload: (id: any) =>
            api(`/companyadmin/lwfsetup/lwf-tracker/payment-receipt/${id}`),
        getById: (id: any) => api(`companyadmin/lwfsetup/lwf-tracker/${id}`),
        delete: (id: any) => api(`companyadmin/lwfsetup/lwf-delete/${id}`),
        update: (id: any) => api(`/companyadmin/lwfsetup/lwf-tracker/${id}`),
    },
    lwfSetup: {
        getAll: () => api('/companyadmin/lwfsetup'),
        create: () => api('/companyadmin/lwfsetup'),
        getById: (id: any) => api(`companyadmin/lwfsetup/${id}`),
          update: (id: any) => api(`companyadmin/lwfsetup/${id}`),
          delete: (id:any) => api(`companyadmin/lwfsetup/${id}`)
    },
    request: {
        request: (id: any) => api(`companyadmin/company/edit-request/${id}`),
        getAll:() => api(`companyadmin/company/tracker-edit-permission`)
    },
    certificate:{
        list: ()=> api('/companyadmin/certificate/list'),
        certificateDownload: (id:any)=> api(`/companyadmin/certificate/download/${id}`)
    },
    noticeTracker:{
        create: () => api('/companyadmin/noticetracker'),
        update: (id:any) => api(`/companyadmin/noticetracker/${id}`),
        list:()=> api('companyadmin/noticetracker'),
        detail: (id:any) => api(`/companyadmin/noticetracker/${id}`),
        delete: (id:any) => api(`/companyadmin/noticetracker/${id}`)
    },
    permission:{
        approve:(id:any)=> api(`companyadmin/company/tracker-edit-permission/${id}`)
    },
    branchAgreement: {
        list: () => api('companyadmin/branch/branchagreement/'),
        create: () => api('/companyadmin/branch/branch-agreement/'),
        update: (id: any) => api(`/companyadmin/branch-agreement/${id}`),
        detail: (id: any) => api(`/companyadmin/branch-agreement/${id}`),
        delete: (id: any) => api(`/companyadmin/branch-agreement/${id}`)

    }
}
