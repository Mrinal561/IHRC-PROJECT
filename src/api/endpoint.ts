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
        downloadFormat: () => api(`upload/sample_files/company.xlsx`),
        bulkCreate: () => api(`/companyadmin/company/bulk-upload`)
    },
    common:{
            getAll: ()=> api('/company-group'),
            state: ()=> api('/states'),
            district: ()=> api('/district'),
            location: ()=> api('/location'),
            
    },
    user: {
        getAll: () => api('companyadmin/user'),
        getById: (id: string) => api(`companyadmin/user/${id}`),
        create: () => api('companyadmin/user'),
        update: (id: string) => api(`companyadmin/user/${id}`),
        delete: (id: string) => api(`companyadmin/user/${id}`),
    },
    complianceSuperadmin: {
        getAll: ()=> api('/companyadmin/compliance/recommend'),
    },
    assign: {
        create:()=> api('companyadmin/compliance'),
        getAll:()=> api('companyadmin/compliance'),
        update: () => api(`companyadmin/compliance/assign-user`),
    },
    due: {
        getAll:()=> api('companyadmin/compliance/data'),
        updateStatus:(id:string)=> api(`/companyadmin/compliance/data/update/${id}`)
    },
    branch: {
        getAll: () => api('companyadmin/branch'),
        getById: (id: string) => api(`companyadmin/branch/${id}`),
        create: () => api('companyadmin/branch'),
        update: (id: string) =>  api(`companyadmin/branch/${id}`),
        delete: (id: string) => api(`companyadmin/branch/${id}`),
        downloadFormat: () => api(`upload/sample_files/branch.xlsx`),
        bulkCreate: () => api(`/companyadmin/branch/bulk-upload`)
    },
    role: {
        getAll: () => api('companyadmin/role'),
    },
    compliance: {
        getAll: () => api(`/companyadmin/compliance/data?data_status[]=${status}`),
        approveReject: () => api('/companyadmin/compliance/data/record-status'),
        export: ()=> api('companyadmin/compliance/data/export'),
        upload:()=> api('/companyadmin/compliance/data/bulk-update')
    },
   esiSetup: {
    getAll: () => api('companyadmin/esisetup'),
    getById: (id: string) => api(`companyadmin/esisetup/${id}`),
    create: () => api('companyadmin/esisetup'),
    // download: () => api(`companyadmin/esisetup/esi-tracker/export`)
    
},
pfSetup:{
    getAll:()=> api('companyadmin/pfsetup'),
    create: () => api('companyadmin/pfsetup'),
},
ptSetup: {
    getAll: () => api('companyadmin/ptsetup'),
    create: () => api('companyadmin/ptsetup'),
    getById: (id: any) => api(`companyadmin/ptsetup/${id}`)
},
tracker:{ 
    downloadFormat:() => api('upload/sample_files/pf-tracker.xlsx'),
    pfUpload:() => api('companyadmin/pfsetup/pf-tracker'),
    pfGetALl: () => api(`companyadmin/pfsetup/pf-tracker`),
    uploadDocs: (id: any) => api(`companyadmin/pfsetup/pf-tracker/document/${id}`),
    downloadALl: () => api('/companyadmin/pfsetup/pf-tracker/export'),
    getById: (id: any) => api(`companyadmin/pfsetup/pf-tracker/${id}`),
    delete: (id: string) => api(`companyadmin/pfsetup/pf-delete/${id}`),
    update:(id:any)=> api(`/companyadmin/pfsetup/pf-tracker/${id}`)
},
esiTracker: {
    getAll: () => api(`companyadmin/esisetup/esi-tracker`),
    bulkUpload: () => api(`companyadmin/esisetup/esi-tracker`),
    download: () => api(`upload/sample_files/esi-tracker.xlsx`),
    uploadDocs: (id: any) => api(`companyadmin/esisetup/esi-tracker/challan/${id}`),
     downloadAll:()=> api('/companyadmin/esisetup/esi-tracker/export'),
     getById: (id: any) => api(`companyadmin/esisetup/esi-tracker/${id}`),
    delete: (id: string) => api(`companyadmin/esisetup/esi-delete/${id}`),
     update:(id:any)=> api(`/companyadmin/esisetup/esi-tracker/${id}`)


    },
    ptrc: {
        download: () => api('upload/sample_files/ptrc-tracker.xlsx'),
        bulkUpload: () => api('/companyadmin/ptsetup/ptrc-tracker'),
        getAll: () => api('/companyadmin/ptsetup/ptrc-tracker'),
        uploadDocs: (id: any) => api(`/companyadmin/ptsetup/ptrc-tracker/document/${id}`),
         downloadAll:()=> api('/companyadmin/ptsetup/ptrc-tracker/export'),
         delete: (id: any) => api(`companyadmin/ptsetup/ptrc-delete/${id}`),
         getById: (id: any) => api(`companyadmin/ptsetup/ptrc-tracker/${id}`)
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
         download: () => api('upload/sample_files/ptec-tracker.xlsx'),
        bulkUpload: () => api('/companyadmin/ptsetup/ptec-tracker'),
        getAll: () => api('/companyadmin/ptsetup/ptec-tracker'),
        uploadDocs: (id: any) => api(`/companyadmin/ptsetup/ptec-tracker/document/${id}`),
        downloadAll: () => api('/companyadmin/ptsetup/ptec-tracker/export'),
          delete: (id: any) => api(`companyadmin/ptsetup/ptec-delete/${id}`),
    getById: (id: any) => api(`companyadmin/ptsetup/ptec-tracker/${id}`)
       
   },
   pfiwtracker:{
    download:()=> api('upload/sample_files/pfiw-tracker.xlsx'),
    bulkupload:()=> api('/companyadmin/pfsetup/pfiw-tracker'),
       pfiwGetAll: () => api('/companyadmin/pfsetup/pfiw-tracker'),
    challanupload:(id:any)=> api(`/companyadmin/pfsetup/pfiw-tracker/document/${id}`),
       downloadALl: () => api('/companyadmin/pfsetup/pfiw-tracker/export'),
    delete: (id: any) => api(`companyadmin/pfsetup/pfiw-delete/${id}`),
       getById: (id: any) => api(`companyadmin/pfsetup/pfiw-tracker/${id}`),
    update:(id:any)=> api(`/companyadmin/pfsetup/pfiw-tracker/${id}`)
    },
    lwftracker: {
        downlaodAll:()=> api(`/companyadmin/lwfsetup/lwf-tracker/export`),
       download:()=> api('upload/sample_files/lwf-tracker.xlsx'),
    bulkupload:()=> api('/companyadmin/lwfsetup/lwf-tracker'),
        lwfGetAll: () => api('companyadmin/lwfsetup/lwf-tracker'),
        upload: (id: any) => api(`/companyadmin/lwfsetup/lwf-tracker/payment-receipt/${id}`),
        getById: (id: any) => api(`companyadmin/lwfsetup/lwf-tracker/${id}`),
    delete: (id: any) => api(`companyadmin/lwfsetup/lwf-delete/${id}`),
   },
   lwfSetup:{
    getAll:()=> api('/companyadmin/lwfsetup'),
    create: () => api('/companyadmin/lwfsetup'),
   }
}
