export type PfiwChallanData = {
    id: number;
  PfSetup: {
    pf_code: string;
    CompanyGroup: {
      name: string;
    };
    Company: {
      name: string;
    };
    Location: {
      name: string;
    };
  };
  payroll_month: string;
  payment_due_date: string;
  payment_date: string;
  delay_in_days: number;
  delay_reason: string;
  challan_document: string;
  status: string;
  UploadBy: {
    first_name: string;
    last_name: string;
  };
}