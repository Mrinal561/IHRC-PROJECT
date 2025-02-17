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
        downloadFormat: () => api(`/companyadmin/company/export-template`),
        bulkCreate: () => api(`/companyadmin/company/bulk-upload`),
    },
    common: {
        getAll: () => api('/company-group'),
        state: () => api('/states'),
        district: () => api('/district'),
        location: () => api('/location'),
        getSubCategory: () => api('/subcategory-suggestions'),
        createSubCategory: () => api('/subcategory'),
        agreementTypeSuggestions: () => api('/agreement-type-suggestions'),
        createAgreementType: () => api('/agreement-type'),
        createNoticeType:()=> api(`/notice-type`),
        noticeTypeSuggestions:() => api(`/notice-type`),
        createNoticeActType:() => api(`/notice-act`),
        noticeActSuggestions:() => api(`//notice-act`),

    },
    user: {
        getAll: () => api('companyadmin/user'),
        getById: (id: any) => api(`companyadmin/user/${id}`),
        create: () => api('companyadmin/user'),
        update: (id: string) => api(`companyadmin/user/${id}`),
        delete: (id: string) => api(`companyadmin/user/${id}`),
        updatePermission:(id:any)=> api(`companyadmin/user/permissions/${id}`),
        bulkCreate:()=> api(`companyadmin/user/user-bulkUpload`),
        downloadFormat:()=> api(`companyadmin/user/user-template`)

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
        downloadFormat: () => api(`companyadmin/branch/download-template`),
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
         delete: (id:any) => api(`companyadmin/esisetup/${id}`),
         getAllCodes:()=> api('esi-code')
    },
    pfSetup: {
        getAll: () => api('companyadmin/pfsetup'),
        create: () => api('companyadmin/pfsetup'),
        getById: (id: any) => api(`companyadmin/pfsetup/${id}`),
        update: (id: any) => api(`/companyadmin/pfsetup/${id}`),
        delete: (id:any) => api(`companyadmin/pfsetup/${id}`),
        getAllCodes:()=> api('pf-code')
    },
    ptSetup: {
        getAll: () => api('companyadmin/ptsetup'),
        create: () => api('companyadmin/ptsetup'),
        getById: (id: any) => api(`companyadmin/ptsetup/${id}`),
        update: (id: any) => api(`companyadmin/ptsetup/${id}`),
        delete: (id:any) => api(`companyadmin/ptsetup/${id}`),
        getAllCodes:()=> api('ptec-code'),
        rcCodes:()=>  api('ptrc-code'),
        downloadFormat:(id:any)=> api(`companyadmin/ptsetup/template/download?company_id=${id}`),
        bulkCreate:()=> api('companyadmin/ptsetup/bulk-create')
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
          delete: (id:any) => api(`companyadmin/lwfsetup/${id}`),
          getAllCodes:()=> api('lwf-code'),
          downloadFormat:(id:any)=> api(`companyadmin/lwfsetup/template/download?company_id=${id}`),
          bulkCreate:()=> api('companyadmin/lwfsetup/bulk-create')
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
        list: () => api('companyadmin/agreement/agreement'),
        create: () => api('companyadmin/agreement/agreement'),
        update: (id: any) => api(`/companyadmin/agreement/agreement/${id}`),
        detail: (id: any) => api(`/companyadmin/agreement/agreement/${id}`),
        delete: (id: any) => api(`/companyadmin/agreement/agreement/${id}`)

    },
        notification:{
            notification:() => api('notifications/settings'),
            unmarkedlist:()=> api('/notifications?unmarked=true'),
            allList:()=> api(`/notifications`),
            markRead:(id:any)=> api(`notification/read/${id}`)
        },
        forgotpassword:{
            forgot:()=> api('forgot-password'),
            reset:() => api(`reset-password`)
        },
        graph:{
            dueDate:(type:any,code:any,financialYear:any)=> api(`companyadmin/graph/graph-data?type=${type}&code=${code}&financial_year=${financialYear}`),
            challanamount:(type:any,code:any,financialYear:any)=> api(`companyadmin/graph/challan-amount?type=${type}&code=${code}&financialYear=${financialYear}`),
            challancounts:(type:any,code:any,financialYear:any)=> api(`companyadmin/graph/challan-counts?type=${type}&code=${code}&financial_year=${financialYear}`),
            analytics:(type:any,code:any,financialYear:any)=> api(`companyadmin/graph/challan-analytics?type=${type}&code=${code}&financialYear=${financialYear}`),

        },
        
}
