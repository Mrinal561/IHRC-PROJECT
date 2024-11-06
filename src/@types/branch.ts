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
    custom_data: {
      remark: string;
      status: string;
      email?: string;
      mobile?: string;
    };
    register_number: string;
    status: string;
    validity: string;
    document?: string;
}


export type BranchResponseData = {
    branch: BranchData[];
    Loading: boolean;
    error: string | null;
}