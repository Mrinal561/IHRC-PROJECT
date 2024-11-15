export type PFData = {
    id: number;
    uuid: string;
    record_id: string;
    group_id: number;
    company_id: number;
    location_id: number;
    pf_code: string;
    register_date: string; // or Date if parsed
    signatory_id: number;
    dsc_document: string;
    e_sign: string;
    register_cerificate: string;
    dsc_validity: string; // or Date if parsed
    e_sign_status: "active" | "inactive";
    suspend: boolean;
    created_by: number;
    created_at: string; // or Date if parsed
    updated_at: string; // or Date if parsed
    CompanyGroup: {
        id: number;
        name: string;
    };
    Company: {
        id: number;
        name: string;
    };
    Location: {
        id: number;
        name: string;
    };
    Signatory: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        mobile: string;
        Role: {
            name: string;
        };
    };
};