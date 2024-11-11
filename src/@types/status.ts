// Request Type
export type StatusRequest = {
    document: File      // for handling file upload
    status: string
    remark: string
}

// Response Type
export type StatusResponse = {
    id: string;
    uuid: string;
    ac_compliance_id: number;
    proof_document: string;
    status: string;
    compliance_detail: {
        id: number;
        uuid: string;
        legislation: string;
        category: string;
        penalty_type: string;
        default_due_date: {
            first_date: string;  // date format: "YYYY-MM-DD"
            last_date: string;   // date format: "YYYY-MM-DD"
        };
        scheduled_frequency: string;
        proof_mandatory: boolean;
        header: string;
        description: string;
        penalty_description: string;
        applicablility: string;
        bare_act_text: string;
        type: string;
        caluse: string;
        frequency: string;
        statutory_auth: string;
        approval_required: boolean;
        criticality: string;
        created_type: string;
        created_at: string;    // ISO date format
        updated_at: string;    // ISO date format
    };
    upload_date: string | null;
    first_due_date: string | null;
    due_date: string | null;
    data_status: string;
    uploaded_by: number;
    approved_by: number | null;
    created_by: number;
    created_at: string;        // ISO date format
    updated_at: string;        // ISO date format
}