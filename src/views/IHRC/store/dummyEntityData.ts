export interface EntityData {
    Company_Group_Name?:string,
    Company_Name?:string,
    State?:string,
    Location?:string,
    Branch?:string,
    PF_Setup?: string,
    District?:string
}

export const entityDataSet: EntityData[] = [
    {
        Company_Group_Name: "IND MONEY",
        Company_Name: "India shelter Pvt Ltd",
        State: "Haryana",
        Location: "Gurgaon",
        Branch: "Gurgaon",
        PF_Setup: "Yes",
        District: "Gurgaon District"
    },
    {
        Company_Group_Name: "Tata Group",
        Company_Name: "Tata Consultancy Services",
        State: "Maharashtra",
        Location: "Mumbai",
        Branch: "Andheri East",
        PF_Setup: "Yes",
        District: "Mumbai Suburban"
    },
    {
        Company_Group_Name: "Reliance Industries",
        Company_Name: "Reliance Jio Infocomm",
        State: "Maharashtra",
        Location: "Navi Mumbai",
        Branch: "Ghansoli",
        PF_Setup: "Yes",
        District: "Thane"
    },
    {
        Company_Group_Name: "Infosys",
        Company_Name: "Infosys Technologies",
        State: "Karnataka",
        Location: "Bengaluru",
        Branch: "Electronic City",
        PF_Setup: "Yes",
        District: "Bengaluru Urban"
    },
    {
        Company_Group_Name: "Wipro",
        Company_Name: "Wipro Limited",
        State: "Karnataka",
        Location: "Bengaluru",
        Branch: "Sarjapur",
        PF_Setup: "Yes",
        District: "Bengaluru Urban"
    },
    {
        Company_Group_Name: "HCL Technologies",
        Company_Name: "HCL Technologies Ltd",
        State: "Uttar Pradesh",
        Location: "Noida",
        Branch: "Sector 126",
        PF_Setup: "Yes",
        District: "Gautam Buddh Nagar"
    },
    {
        Company_Group_Name: "Tech Mahindra",
        Company_Name: "Tech Mahindra Ltd",
        State: "Maharashtra",
        Location: "Pune",
        Branch: "Hinjewadi",
        PF_Setup: "Yes",
        District: "Pune"
    },
    {
        Company_Group_Name: "Larsen & Toubro",
        Company_Name: "L&T Infotech",
        State: "Maharashtra",
        Location: "Mumbai",
        Branch: "Powai",
        PF_Setup: "Yes",
        District: "Mumbai Suburban"
    },
    {
        Company_Group_Name: "Mindtree",
        Company_Name: "Mindtree Ltd",
        State: "Karnataka",
        Location: "Bengaluru",
        Branch: "Whitefield",
        PF_Setup: "Yes",
        District: "Bengaluru Urban"
    },
    {
        Company_Group_Name: "Cognizant",
        Company_Name: "Cognizant Technology Solutions",
        State: "Tamil Nadu",
        Location: "Chennai",
        Branch: "Thoraipakkam",
        PF_Setup: "Yes",
        District: "Chennai"
    },
    {
        Company_Group_Name: "Capgemini",
        Company_Name: "Capgemini India",
        State: "Maharashtra",
        Location: "Mumbai",
        Branch: "Airoli",
        PF_Setup: "Yes",
        District: "Thane"
    }
];

export interface UserData {
    FirstName?:string,
    LastName?:string,
    Email?:string,
    UserName?:string,
    MobileNum?:string,
    JobRole?: string,
    Dsc?:string,
    DscValidity?:string,
    Pan?:string,
    Aadhar?:string,
    DateOfJoin?:string,
}
export const userDataSet: UserData[] = [
    {
      FirstName: "Amit",
      LastName: "Sharma",
      Email: "amit@example.com",
      UserName: "amitsharma",
      MobileNum: "+919876543210",
      JobRole: "Manager",
      Dsc: "Active",
      DscValidity: "2025-12-31",
      Pan: "ABCDE1234F",
      Aadhar: "1234-5678-9123",
      DateOfJoin: "2021-01-15",
    },
    {
      FirstName: "Krishna Kumar",
      LastName: "Singh",
      Email: "Krishna@example.com",
      UserName: "KrishnaKumar",
      MobileNum: "+919812345678",
      JobRole: "Director",
      Dsc: "Active",
      DscValidity: "2024-10-20",
      Pan: "FGHIJ5678K",
      Aadhar: "2345-6789-1234",
      DateOfJoin: "2019-07-10",
    },
    {
      FirstName: "Ajay",
      LastName: "Thakur",
      Email: "Ajay@example.com",
      UserName: "AjayThakur",
      MobileNum: "+918765432109",
      JobRole: "CFO",
      Dsc: "Expired",
      DscValidity: "2023-06-15",
      Pan: "KLMNO2345P",
      Aadhar: "3456-7890-2345",
      DateOfJoin: "2020-03-25",
    },
    {
      FirstName: "Sneha",
      LastName: "Reddy",
      Email: "sneha.reddy@example.com",
      UserName: "snehareddy",
      MobileNum: "+917654321098",
      JobRole: "HR Manager",
      Dsc: "Active",
      DscValidity: "2026-09-10",
      Pan: "PQRST3456R",
      Aadhar: "4567-8901-3456",
      DateOfJoin: "2018-11-05",
    },
    {
      FirstName: "Vikram",
      LastName: "Mehta",
      Email: "vikram.mehta@example.com",
      UserName: "vikrammehta",
      MobileNum: "+919123456789",
      JobRole: "Business Analyst",
      Dsc: "Active",
      DscValidity: "2024-02-28",
      Pan: "UVWXY6789S",
      Aadhar: "5678-9012-4567",
      DateOfJoin: "2022-08-19",
    }
  ];
  