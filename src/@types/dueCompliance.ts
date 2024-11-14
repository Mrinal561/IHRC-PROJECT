export type DueComplianceDetailData = {
    id: number;
    uuid: string;
    ac_compliance_id: number;
    proof_document: string | null;
    status: "pending" | "completed" | "due" | "overdue"; // Enum for status
    compliance_detail: {
        id: number;
        uuid: string;
        legislation: string;
        category: string;
        penalty_type: string;
        default_due_date: {
            first_date: string; // ISO date format string
            last_date: string;  // ISO date format string
        };
        scheduled_frequency: string;
        proof_mandatory: boolean;
        header: string;
        description: string;
        penalty_description: string;
        applicability: string;
        bare_act_text: string;
        type: string;
        clause: string; // Corrected from "caluse" in JSON to "clause"
        frequency: string;
        statutory_auth: string;
        approval_required: boolean;
        criticality: string;
        created_type: string;
        created_at: string; // ISO date format string
        updated_at: string; // ISO date format string
    };
    upload_date: string | null; // ISO date format string
    first_due_date: string | null; // ISO date format string
    due_date: string; // ISO date format string
    data_status: string;
    uploaded_by: number | null;
    approved_by: number | null;
    created_by: number;
    created_at: string; // ISO date format string
    updated_at: string; // ISO date format string
    UploadBy: {
        id: number;
        name: string;
    } | null;
    ApprovedBy: {
        id: number;
        name: string;
    } | null;
    AssignedComplianceRemark: Array<{
        id: number;
        remark: string;
        created_by: number;
        created_at: string; // ISO date format string
        updated_at: string; // ISO date format string
    }>;
};
