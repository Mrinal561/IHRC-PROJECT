export interface EmployeeLeave {
    company_name: string;
    sl_no: number;
    employeeNumber: number;
    employeeName: string;
    jobTitle: string;
    businessUnit: string;
    location: string;
    reportingManager: string;
    leaveType: string;
    fromDate: string;  // Use ISO format: 'YYYY-MM-DD'
    fromSession: string;
    toDate: string;
    toSession: string;
    totalDuration: string;
  }

 export const employeeLeaves: EmployeeLeave[] = [
    {   
        company_name: "Tech Solutions Inc",
        sl_no: 1,
      employeeNumber: 101,
      employeeName: "Alice Johnson",
      jobTitle: "Software Engineer",
      businessUnit: "IT Department",
      location: "New York",
      reportingManager: "Bob Smith",
      leaveType: "Vacation",
      fromDate: "2024-10-01",
      fromSession: "Morning",
      toDate: "2024-10-05",
      toSession: "Afternoon",
      totalDuration: "4.5 Days",
    },
    {company_name: "Tech Solutions Inc",
        sl_no: 2,
      employeeNumber: 102,
      employeeName: "David Lee",
      jobTitle: "HR Manager",
      businessUnit: "HR Department",
      location: "San Francisco",
      reportingManager: "Carol White",
      leaveType: "Sick Leave",
      fromDate: "2024-10-12",
      fromSession: "Morning",
      toDate: "2024-10-13",
      toSession: "Morning",
      totalDuration: "1 Day",
    },
    {company_name: "Tech Solutions Inc",
        sl_no: 3,
      employeeNumber: 103,
      employeeName: "Sarah Kim",
      jobTitle: "Marketing Lead",
      businessUnit: "Marketing",
      location: "Los Angeles",
      reportingManager: "Emily Johnson",
      leaveType: "Parental",
      fromDate: "2024-10-20",
      fromSession: "Morning",
      toDate: "2024-10-24",
      toSession: "Afternoon",
      totalDuration: "5 Days",
    },
    {company_name: "Tech Solutions Inc",
        sl_no: 4,
      employeeNumber: 104,
      employeeName: "John Carter",
      jobTitle: "Business Analyst",
      businessUnit: "Finance",
      location: "Chicago",
      reportingManager: "Mike Brown",
      leaveType: "Vacation",
      fromDate: "2024-10-15",
      fromSession: "Afternoon",
      toDate: "2024-10-20",
      toSession: "Morning",
      totalDuration: "4 Days",
    },
    {   company_name: "Tech Solutions Inc",
        sl_no: 5,
      employeeNumber: 105,
      employeeName: "Emily Davis",
      jobTitle: "Product Manager",
      businessUnit: "IT Department",
      location: "New York",
      reportingManager: "Bob Smith",
      leaveType: "Sick Leave",
      fromDate: "2024-10-22",
      fromSession: "Morning",
      toDate: "2024-10-23",
      toSession: "Morning",
      totalDuration: "1 Day",
    },
  ];
  
  