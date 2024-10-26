export interface Company {
    company_name: string;
    sl_no: number;
    state: string;
    branch: string;
    location: string;
}

export const companies: Company[] = [
  {
    company_name: "Tata Consultancy Services",
    sl_no: 1,
    state: "Maharashtra",
    branch: "Western Branch",
    location: "Mumbai",
  },
  {
    company_name: "Infosys Ltd.",
    sl_no: 2,
    state: "Karnataka",
    branch: "Southern Branch",
    location: "Bengaluru",
  },
  {
    company_name: "Wipro Ltd.",
    sl_no: 3,
    state: "Telangana",
    branch: "Central Branch",
    location: "Hyderabad",
  },
  {
    company_name: "Reliance Industries",
    sl_no: 4,
    state: "Gujarat",
    branch: "Western Branch",
    location: "Ahmedabad",
  },
  {
    company_name: "HCL Technologies",
    sl_no: 5,
    state: "Uttar Pradesh",
    branch: "Northern Branch",
    location: "Noida",
  },
];



