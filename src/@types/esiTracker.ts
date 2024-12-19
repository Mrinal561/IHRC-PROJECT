export type esiChallanData = {
    id: number;
    uuid: string;
    payroll_month: string; // or Date if parsed
    no_of_emp: number;
    gross_wage: number;
    employee_esi: number;
    employer_esi: number;
    total_esi: number;
    challan_amt: number;
    salary_register_amt: number;
    difference_amt: number;
    difference_reason: string | null;
    total_paid_amt: number;
    payment_due_date: string; // or Date if parsed
    payment_date: string; // or Date if parsed
    delay_in_days: number | null;
    delay_reason: string | null;
    challan_type: string;
    challan_no: number;
    challan_document: string | null;
    remark: string;
    upload_date: string; // or Date if parsed
    status: string;
    uploaded_by: number;
    is_requested?: boolean;
    iseditable?: boolean;
    created_at: string; // or Date if parsed
    updated_at: string; // or Date if parsed
    UploadBy: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        mobile: string | null;
    };
    EsiSetup: {
        code: string;
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
    };
};



