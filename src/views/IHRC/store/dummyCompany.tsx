export interface Company {
    company_name: string;
    sl_no: number;
    status: string;
    date: string;
    uploaded_Date: string;
    financial_year: string;
}

export const companies: Company[] = [
  {
    company_name: "CEAT",
    sl_no: 1,
    date: 'Oct-2024',
    financial_year: '2024-2025',
    // branch: "Western Branch",
    // location: "Mumbai",
    uploaded_Date: '2024-10-01',
    status: "Uploaded",
  },
  // {
  //   company_name: "Infosys Ltd.",
  //   sl_no: 2,
  //   state: "Karnataka",
  //   branch: "Southern Branch",
  //   location: "Bengaluru",
  // },
  // {
  //   company_name: "Wipro Ltd.",
  //   sl_no: 3,
  //   state: "Telangana",
  //   branch: "Central Branch",
  //   location: "Hyderabad",
  // },
  // {
  //   company_name: "Reliance Industries",
  //   sl_no: 4,
  //   state: "Gujarat",
  //   branch: "Western Branch",
  //   location: "Ahmedabad",
  // },
  // {
  //   company_name: "HCL Technologies",
  //   sl_no: 5,
  //   state: "Uttar Pradesh",
  //   branch: "Northern Branch",
  //   location: "Noida",
  // },
];



