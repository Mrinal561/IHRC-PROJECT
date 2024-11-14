export interface AttendanceRecord {
    company_name: string;
    sl_no: number;
    employeeNumber: string;
    employeeName: string;
    jobTitle: string;
    businessUnit: string;
    location: string;
    reportingManager: string;
    dailyStatus: {
        [key: string]: string; // Date: Status (WFH/OD/WO/H/A/P/MS)
    };
    summary: {
        totalDays: number;
        wfh: number;
        pendingWFH: number;
        onDuty: number;
        pendingOnDuty: number;
        woh: number;
        weeklyOffs: number;
        holidays: number;
        absentDays: number;
        presentDays: number;
        missingSwipeDays: number;
        penalizedPaidLeave: number;
        paidLeaveTaken: number;
        pendingPaidLeaveTaken: number;
        totalPaidLeave: number;
        penalizedUnpaidLeave: number;
        unpaidLeaveTaken: number;
        pendingUnpaidLeaveTaken: number;
        totalUnpaidLeave: number;
    };
}

export const attendanceData: AttendanceRecord[] = [
    {   company_name: "Tech Solutions Inc",
        sl_no: 1,
        employeeNumber: "EMP001",
        employeeName: "Pulkit Kumar",
        jobTitle: "Senior Developer",
        businessUnit: "Engineering",
        location: "Bangalore",
        reportingManager: "Mike Johnson",
        dailyStatus: {
            "01-Jul-2024": "P",
            "02-Jul-2024": "P",
            "03-Jul-2024": "WFH",
            "04-Jul-2024": "P",
            "05-Jul-2024": "P",
            "06-Jul-2024": "WO",
            "07-Jul-2024": "WO",
            "08-Jul-2024": "P",
            "09-Jul-2024": "P",
            "10-Jul-2024": "WFH",
            "11-Jul-2024": "P",
            "12-Jul-2024": "P",
            "13-Jul-2024": "WO",
            "14-Jul-2024": "WO",
            "15-Jul-2024": "P",
            "16-Jul-2024": "P",
            "17-Jul-2024": "WFH",
            "18-Jul-2024": "P",
            "19-Jul-2024": "P",
            "20-Jul-2024": "WO",
            "21-Jul-2024": "WO",
            "22-Jul-2024": "P",
            "23-Jul-2024": "PL",
            "24-Jul-2024": "P",
            "25-Jul-2024": "P",
            "26-Jul-2024": "P",
            "27-Jul-2024": "WO",
            "28-Jul-2024": "WO",
            "29-Jul-2024": "P",
            "30-Jul-2024": "P",
            "31-Jul-2024": "P"
        },
        summary: {
            totalDays: 31,
            wfh: 3,
            pendingWFH: 0,
            onDuty: 0,
            pendingOnDuty: 0,
            woh: 0,
            weeklyOffs: 8,
            holidays: 0,
            absentDays: 0,
            presentDays: 19,
            missingSwipeDays: 0,
            penalizedPaidLeave: 0,
            paidLeaveTaken: 1,
            pendingPaidLeaveTaken: 0,
            totalPaidLeave: 1,
            penalizedUnpaidLeave: 0,
            unpaidLeaveTaken: 0,
            pendingUnpaidLeaveTaken: 0,
            totalUnpaidLeave: 0
        }
    },
    {   company_name: "Tech Solutions Inc",
        sl_no: 2,
        employeeNumber: "EMP002",
        employeeName: "Sarah Williams",
        jobTitle: "Marketing Manager",
        businessUnit: "Marketing",
        location: "Mumbai",
        reportingManager: "David Chen",
        dailyStatus: {
            "01-Jul-2024": "P",
            "02-Jul-2024": "WFH",
            "03-Jul-2024": "P",
            "04-Jul-2024": "P",
            "05-Jul-2024": "MS",
            "06-Jul-2024": "WO",
            "07-Jul-2024": "WO",
            "08-Jul-2024": "P",
            "09-Jul-2024": "WFH",
            "10-Jul-2024": "P",
            "11-Jul-2024": "P",
            "12-Jul-2024": "P",
            "13-Jul-2024": "WO",
            "14-Jul-2024": "WO",
            "15-Jul-2024": "PL",
            "16-Jul-2024": "PL",
            "17-Jul-2024": "P",
            "18-Jul-2024": "P",
            "19-Jul-2024": "WFH",
            "20-Jul-2024": "WO",
            "21-Jul-2024": "WO",
            "22-Jul-2024": "OD",
            "23-Jul-2024": "P",
            "24-Jul-2024": "P",
            "25-Jul-2024": "WFH",
            "26-Jul-2024": "P",
            "27-Jul-2024": "WO",
            "28-Jul-2024": "WO",
            "29-Jul-2024": "P",
            "30-Jul-2024": "P",
            "31-Jul-2024": "P"
        },
        summary: {
            totalDays: 31,
            wfh: 4,
            pendingWFH: 0,
            onDuty: 1,
            pendingOnDuty: 0,
            woh: 0,
            weeklyOffs: 8,
            holidays: 0,
            absentDays: 0,
            presentDays: 16,
            missingSwipeDays: 1,
            penalizedPaidLeave: 0,
            paidLeaveTaken: 2,
            pendingPaidLeaveTaken: 0,
            totalPaidLeave: 2,
            penalizedUnpaidLeave: 0,
            unpaidLeaveTaken: 0,
            pendingUnpaidLeaveTaken: 0,
            totalUnpaidLeave: 0
        }
    },
    {   company_name: "Tech Solutions Inc",
        sl_no: 3,
        employeeNumber: "EMP003",
        employeeName: "Rajesh Kumar",
        jobTitle: "Financial Analyst",
        businessUnit: "Finance",
        location: "Chennai",
        reportingManager: "Suresh Menon",
        dailyStatus: {
            "01-Jul-2024": "P",
            "02-Jul-2024": "P",
            "03-Jul-2024": "P",
            "04-Jul-2024": "UL",
            "05-Jul-2024": "P",
            "06-Jul-2024": "WO",
            "07-Jul-2024": "WO",
            "08-Jul-2024": "WFH",
            "09-Jul-2024": "WFH",
            "10-Jul-2024": "P",
            "11-Jul-2024": "P",
            "12-Jul-2024": "P",
            "13-Jul-2024": "WO",
            "14-Jul-2024": "WO",
            "15-Jul-2024": "H",
            "16-Jul-2024": "P",
            "17-Jul-2024": "P",
            "18-Jul-2024": "MS",
            "19-Jul-2024": "P",
            "20-Jul-2024": "WO",
            "21-Jul-2024": "WO",
            "22-Jul-2024": "P",
            "23-Jul-2024": "P",
            "24-Jul-2024": "WFH",
            "25-Jul-2024": "P",
            "26-Jul-2024": "A",
            "27-Jul-2024": "WO",
            "28-Jul-2024": "WO",
            "29-Jul-2024": "P",
            "30-Jul-2024": "P",
            "31-Jul-2024": "P"
        },
        summary: {
            totalDays: 31,
            wfh: 3,
            pendingWFH: 0,
            onDuty: 0,
            pendingOnDuty: 0,
            woh: 0,
            weeklyOffs: 8,
            holidays: 1,
            absentDays: 1,
            presentDays: 16,
            missingSwipeDays: 1,
            penalizedPaidLeave: 0,
            paidLeaveTaken: 0,
            pendingPaidLeaveTaken: 0,
            totalPaidLeave: 0,
            penalizedUnpaidLeave: 0,
            unpaidLeaveTaken: 1,
            pendingUnpaidLeaveTaken: 0,
            totalUnpaidLeave: 1
        }
    },
    {   company_name: "Tech Solutions Inc",
        sl_no: 4,
        employeeNumber: "EMP004",
        employeeName: "Priya Sharma",
        jobTitle: "HR Manager",
        businessUnit: "HR",
        location: "Hyderabad",
        reportingManager: "Rachel Green",
        dailyStatus: {
            "01-Jul-2024": "WFH",
            "02-Jul-2024": "P",
            "03-Jul-2024": "P",
            "04-Jul-2024": "P",
            "05-Jul-2024": "P",
            "06-Jul-2024": "WO",
            "07-Jul-2024": "WO",
            "08-Jul-2024": "PL",
            "09-Jul-2024": "PL",
            "10-Jul-2024": "PL",
            "11-Jul-2024": "P",
            "12-Jul-2024": "P",
            "13-Jul-2024": "WO",
            "14-Jul-2024": "WO",
            "15-Jul-2024": "H",
            "16-Jul-2024": "P",
            "17-Jul-2024": "WFH",
            "18-Jul-2024": "P",
            "19-Jul-2024": "P",
            "20-Jul-2024": "WO",
            "21-Jul-2024": "WO",
            "22-Jul-2024": "P",
            "23-Jul-2024": "WFH",
            "24-Jul-2024": "P",
            "25-Jul-2024": "P",
            "26-Jul-2024": "P",
            "27-Jul-2024": "WO",
            "28-Jul-2024": "WO",
            "29-Jul-2024": "OD",
            "30-Jul-2024": "P",
            "31-Jul-2024": "P"
        },
        summary: {
            totalDays: 31,
            wfh: 3,
            pendingWFH: 0,
            onDuty: 1,
            pendingOnDuty: 0,
            woh: 0,
            weeklyOffs: 8,
            holidays: 1,
            absentDays: 0,
            presentDays: 15,
            missingSwipeDays: 0,
            penalizedPaidLeave: 0,
            paidLeaveTaken: 3,
            pendingPaidLeaveTaken: 0,
            totalPaidLeave: 3,
            penalizedUnpaidLeave: 0,
            unpaidLeaveTaken: 0,
            pendingUnpaidLeaveTaken: 0,
            totalUnpaidLeave: 0
        }
    },
    {   company_name: "Tech Solutions Inc",
        sl_no: 5,
        employeeNumber: "EMP005",
        employeeName: "Michael Chen",
        jobTitle: "Lead Developer",
        businessUnit: "Engineering",
        location: "Bangalore",
        reportingManager: "Mike Johnson",
        dailyStatus: {
            "01-Jul-2024": "P",
            "02-Jul-2024": "P",
            "03-Jul-2024": "MS",
            "04-Jul-2024": "WFH",
            "05-Jul-2024": "P",
            "06-Jul-2024": "WO",
            "07-Jul-2024": "WO",
            "08-Jul-2024": "A",
            "09-Jul-2024": "UL",
            "10-Jul-2024": "UL",
            "11-Jul-2024": "P",
            "12-Jul-2024": "P",
            "13-Jul-2024": "WO",
            "14-Jul-2024": "WO",
            "15-Jul-2024": "H",
            "16-Jul-2024": "WFH",
            "17-Jul-2024": "P",
            "18-Jul-2024": "P",
            "19-Jul-2024": "OD",
            "20-Jul-2024": "WO",
            "21-Jul-2024": "WO",
            "22-Jul-2024": "P",
            "23-Jul-2024": "P",
            "24-Jul-2024": "WFH",
            "25-Jul-2024": "P",
            "26-Jul-2024": "P",
            "27-Jul-2024": "WO",
            "28-Jul-2024": "WO",
            "29-Jul-2024": "P",
            "30-Jul-2024": "P",
            "31-Jul-2024": "PPL"
        },
        summary: {
            totalDays: 31,
            wfh: 3,
            pendingWFH: 0,
            onDuty: 1,
            pendingOnDuty: 0,
            woh: 0,
            weeklyOffs: 8,
            holidays: 1,
            absentDays: 1,
            presentDays: 14,
            missingSwipeDays: 1,
            penalizedPaidLeave: 1,
            paidLeaveTaken: 0,
            pendingPaidLeaveTaken: 0,
            totalPaidLeave: 1,
            penalizedUnpaidLeave: 0,
            unpaidLeaveTaken: 2,
            pendingUnpaidLeaveTaken: 0,
            totalUnpaidLeave: 2
        }
    }
];

export default attendanceData;