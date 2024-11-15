export type PfChallanData = {
    id: number;
    uuid: string;
    pf_setup_id: number;
    no_of_emp: number;
    payroll_month: string; // or Date if parsed
    epf_wage: number;
    eps_wage: number;
    edli_wage: number;
    total_challan_amt: number;
    total_paid_amt: number;
    difference_amt: number;
    difference_reason: string | null;
    payment_due_date: string; // or Date if parsed
    payment_date: string; // or Date if parsed
    delay_in_days: number | null;
    delay_reason: string | null;
    challan_type: string;
    trrn_no: string;
    crn_no: string;
    ecr_document: string | null;
    challan_document: string | null;
    receipt_document: string | null;
    remark: string;
    upload_date: string; // or Date if parsed
    status: string;
    uploaded_by: number;
    created_at: string; // or Date if parsed
    updated_at: string; // or Date if parsed
    UploadBy: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        mobile: string | null;
    };
    PfSetup: {
        pf_code: string;
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

