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
    },
    common: {
        getAll: () => api('/company-group'),
        state: () => api('/states'),
        district: () => api('/district'),
        location: () => api('/location'),
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
        update: (id: string) => api(`companyadmin/branch/${id}`),
        delete: (id: string) => api(`companyadmin/branch/${id}`),
    },
    compliance: {
        getAll: () => api('superadmin/compliance'),
    },
    assign: {
        create: () => api('companyadmin/compliance'),
        getAll: () => api('companyadmin/compliance'),
        update: (id: string) =>
            api(`companyadmin/compliance/assign-user/${id}`),
    },
    due: {
        getAll: () => api('companyadmin/compliance/data'),
    },
}
