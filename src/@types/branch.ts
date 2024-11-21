export type BranchData = {
    group_id: number;
    company_id: number;
    state_id: number;
    district: string;
    location: string;
    name: string;
    opening_date: string;
    head_count: string;
    address: string;
    type: string;
    office_type: string;
    other_office: string;
    custom_data: {
      remark: string;
      status: string;
      email?: string;
      mobile?: string;
    };
    register_number: string;
    status: string;
    se_validity: string;
    lease_validity: string;
    document_validity_type: string;
    se_document: string;
    lease_document: string;
}


export type BranchResponseData = {
    branch: BranchData[];
    Loading: boolean;
    error: string | null;
}