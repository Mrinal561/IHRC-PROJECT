export type BranchAgreementData = {
    branch_id?: number;
    agreement_type?: string;
    sub_category?: string;
    owner_name?: string;
    partner_name?: string;
    partner_number?: string;
    start_date?: string;
    end_date?: string;
    applicable_for_all?: boolean;
    agreement_document?: File;
  }

export  type BranchAgreementResponseData = {
    id: number;
    branch_id: number;
    agreement_type: string;
    sub_category?: string;
    owner_name?: string;
    partner_name?: string;
    partner_number?: string;
    start_date: string;
    end_date: string;
    agreement_document?: string;
    applicable_for_all: boolean;
    created_at: string;
    updated_at: string;
    Branch: {
      id: number;
      name: string;
      Company: {
        id: number;
        name: string;
      };
    };
  }
  
export  type BranchAgreementQueryParams = {
    company_id?: number;
    branch_id?: number;
    sub_category?: string;
    search?: string;
    page?: number;
    page_size?: string;
    sort?: string;
    sort_by?: string;
  }