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
        getAll: () => api('companyadmin/company'),
        getById: (id: string) => api(`companyadmin/company/${id}`),
        create: () => api('companyadmin/company'),
        update: (id: string) => api(`companyadmin/company/${id}`),
        delete: (id: string) => api(`companyadmin/company/${id}`),
    },
    common:{
            getAll: ()=> api('/company-group')
    },
    user: {
        getAll: () => api('companyadmin/user'),
        getById: (id: string) => api(`companyadmin/user/${id}`),
        create: () => api('companyadmin/user'),
        update: (id: string) => api(`companyadmin/user/${id}`),
        delete: (id: string) => api(`companyadmin/user/${id}`),
    }

    

}
