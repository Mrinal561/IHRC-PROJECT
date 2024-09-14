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
