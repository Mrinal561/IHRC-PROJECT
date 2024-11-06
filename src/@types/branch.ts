// export type AssignedComplianceData = {
//     branch_id: number;
//     compliance_id: number[];
// }

// export type AssignedComplianceResponseData = {

// }

export type BranchData = {
    id: number
    group_id: number
    company_id: number
    state_id: number
    district_id: number
    location_id: number
    name: string
    opening_date: string // ISO date format string
    head_count: string
    address: string
    type: string
    office_type: string
    register_number: string
    status: string
    validity: string // ISO date format string
    document: string
    custom_data: {
        remark: string
        status: string
    }
    created_by: number
    created_at: string // ISO date format string
    updated_at: string // ISO date format string
}
