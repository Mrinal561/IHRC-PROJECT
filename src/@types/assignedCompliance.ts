export type ComplianceAssignmentData = {
    id: number;
    branch_id: number;
    mst_compliance_id: number;
    owner_id: number | null;
    approver_id: number | null;
    status: boolean;
    created_by: number;
    created_at: string; // ISO date format string
    updated_at: string; // ISO date format string
    MasterCompliance: {
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
        clause: string;
        frequency: string;
        statutory_auth: string;
        approval_required: boolean;
        criticality: string;
        created_type: string;
        created_at: string; // ISO date format string
        updated_at: string; // ISO date format string
    };
    Owner: {
        id: number;
        name: string;
    } | null;
    Approver: {
        id: number;
        name: string;
    } | null;
};
