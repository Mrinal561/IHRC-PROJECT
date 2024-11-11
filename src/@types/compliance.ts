
export type ComplianceData = {
    id: number;
    uuid: string;
    legislation: string;
    category: string;
    penalty_type: string;
    default_due_date: {
        first_date: string; // in "YYYY-MM-DD" format
        last_date: string;  // in "YYYY-MM-DD" format
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
    assign:boolean;
}

export type AssignCompliances = {
    branch_id:number,
    compliance_id:number[]
}