export interface SalaryData {
    company_name: string;
    sl_no: number;
    state: string;
    employee_no: string;
    name: string;
    join_date: string;
    gender: string;
    department: string;
    designation: string;
    has_left: boolean;
    leaving_date: string | null;
    email: string;
    personal_email: string;
    pan_no: string;
    uan: string;
    father_name: string;
    phone: string;
    aadhaar_number: string;
    marital_status: string;
    spouse_name: string | null;
    location: string;
    physically_challenged: boolean;
    manager_name: string;
    effective_workdays: number;
    // Earnings
    basic: number;
    hra: number;
    transport_allowance: number;
    medical: number;
    lta: number;
    special_allowance: number;
    leave_encashment: number;
    notice_period: number;
    // Arrears
    basic_arrears: number;
    transport_arrears: number;
    hra_arrears: number;
    special_allowance_arrears: number;
    medical_arrear: number;
    lta_arrear: number;
    // Additional Earnings
    nps_earnings: number;
    nps_earnings_arrear: number;
    children_education_allowance: number;
    weekend_night_support_allowance: number;
    variable_pay_performance: number;
    children_education_arrears: number;
    odexo_meal_coupon: number;
    odexo_meal_coupon_arrear: number;
    professional_development_allowance: number;
    professional_development_arrear: number;
    tech_support_incentive: number;
    gross: number;
    // Deductions
    pf: number;
    esi: number;
    vpf: number;
    income_tax: number;
    professional_tax: number;
    loan: number;
    other_deduction: number;
    labour_welfare_fund: number;
    loan_recovery: number;
    sodexo_meal_coupon_deduction: number;
    nps_deduction: number;
    nps_deduction_arrear: number;
    total_deductions: number;
    net_pay: number;
}


export const salaryDummyData: SalaryData[] = [
    {
        company_name: "Tech Solutions Inc",
        sl_no: 1,
        state: "Karnataka",
        employee_no: "EMP001",
        name: "John Doe",
        join_date: "2023-01-15",
        gender: "Male",
        department: "Engineering",
        designation: "Senior Developer",
        has_left: false,
        leaving_date: null,
        email: "john.doe@techsolutions.com",
        personal_email: "john.doe@gmail.com",
        pan_no: "ABCDE1234F",
        uan: "100123456789",
        father_name: "James Doe",
        phone: "9876543210",
        aadhaar_number: "123456789012",
        marital_status: "Married",
        spouse_name: "Jane Doe",
        location: "Bangalore",
        physically_challenged: false,
        manager_name: "Mike Johnson",
        effective_workdays: 22,
        basic: 50000,
        hra: 25000,
        transport_allowance: 3000,
        medical: 1250,
        lta: 4166,
        special_allowance: 15000,
        leave_encashment: 0,
        notice_period: 0,
        basic_arrears: 0,
        transport_arrears: 0,
        hra_arrears: 0,
        special_allowance_arrears: 0,
        medical_arrear: 0,
        lta_arrear: 0,
        nps_earnings: 5000,
        nps_earnings_arrear: 0,
        children_education_allowance: 200,
        weekend_night_support_allowance: 0,
        variable_pay_performance: 10000,
        children_education_arrears: 0,
        odexo_meal_coupon: 2200,
        odexo_meal_coupon_arrear: 0,
        professional_development_allowance: 3000,
        professional_development_arrear: 0,
        tech_support_incentive: 0,
        gross: 118816,
        pf: 6000,
        esi: 0,
        vpf: 0,
        income_tax: 15000,
        professional_tax: 200,
        loan: 0,
        other_deduction: 0,
        labour_welfare_fund: 20,
        loan_recovery: 0,
        sodexo_meal_coupon_deduction: 2200,
        nps_deduction: 5000,
        nps_deduction_arrear: 0,
        total_deductions: 28420,
        net_pay: 90396
    },
    {
        company_name: "Tech Solutions Inc",
        sl_no: 2,
        state: "Maharashtra",
        employee_no: "EMP002",
        name: "Sarah Williams",
        join_date: "2023-03-20",
        gender: "Female",
        department: "Marketing",
        designation: "Marketing Manager",
        has_left: false,
        leaving_date: null,
        email: "sarah.w@techsolutions.com",
        personal_email: "sarah.williams@gmail.com",
        pan_no: "BCDEA5678G",
        uan: "100123456790",
        father_name: "Robert Williams",
        phone: "9876543211",
        aadhaar_number: "123456789013",
        marital_status: "Single",
        spouse_name: null,
        location: "Mumbai",
        physically_challenged: false,
        manager_name: "David Chen",
        effective_workdays: 21,
        basic: 45000,
        hra: 22500,
        transport_allowance: 3000,
        medical: 1250,
        lta: 3750,
        special_allowance: 13000,
        leave_encashment: 0,
        notice_period: 0,
        basic_arrears: 1500,
        transport_arrears: 0,
        hra_arrears: 750,
        special_allowance_arrears: 400,
        medical_arrear: 0,
        lta_arrear: 0,
        nps_earnings: 4500,
        nps_earnings_arrear: 150,
        children_education_allowance: 0,
        weekend_night_support_allowance: 0,
        variable_pay_performance: 8000,
        children_education_arrears: 0,
        odexo_meal_coupon: 2200,
        odexo_meal_coupon_arrear: 0,
        professional_development_allowance: 2500,
        professional_development_arrear: 0,
        tech_support_incentive: 0,
        gross: 106500,
        pf: 5400,
        esi: 0,
        vpf: 1000,
        income_tax: 12000,
        professional_tax: 200,
        loan: 5000,
        other_deduction: 0,
        labour_welfare_fund: 20,
        loan_recovery: 0,
        sodexo_meal_coupon_deduction: 2200,
        nps_deduction: 4500,
        nps_deduction_arrear: 150,
        total_deductions: 30470,
        net_pay: 76030
    },
    {
        company_name: "Tech Solutions Inc",
        state: "Tamil Nadu",
        sl_no: 3,
        employee_no: "EMP003",
        name: "Rajesh Kumar",
        join_date: "2022-08-10",
        gender: "Male",
        department: "Finance",
        designation: "Financial Analyst",
        has_left: false,
        leaving_date: null,
        email: "rajesh.k@techsolutions.com",
        personal_email: "rajesh.kumar@gmail.com",
        pan_no: "CDEFG7890H",
        uan: "100123456791",
        father_name: "Ramesh Kumar",
        phone: "9876543212",
        aadhaar_number: "123456789014",
        marital_status: "Married",
        spouse_name: "Priya Kumar",
        location: "Chennai",
        physically_challenged: false,
        manager_name: "Suresh Menon",
        effective_workdays: 22,
        basic: 40000,
        hra: 20000,
        transport_allowance: 3000,
        medical: 1250,
        lta: 3333,
        special_allowance: 12000,
        leave_encashment: 0,
        notice_period: 0,
        basic_arrears: 0,
        transport_arrears: 0,
        hra_arrears: 0,
        special_allowance_arrears: 0,
        medical_arrear: 0,
        lta_arrear: 0,
        nps_earnings: 4000,
        nps_earnings_arrear: 0,
        children_education_allowance: 200,
        weekend_night_support_allowance: 0,
        variable_pay_performance: 7000,
        children_education_arrears: 0,
        odexo_meal_coupon: 2200,
        odexo_meal_coupon_arrear: 0,
        professional_development_allowance: 2000,
        professional_development_arrear: 0,
        tech_support_incentive: 0,
        gross: 94983,
        pf: 4800,
        esi: 0,
        vpf: 0,
        income_tax: 8000,
        professional_tax: 200,
        loan: 0,
        other_deduction: 0,
        labour_welfare_fund: 20,
        loan_recovery: 0,
        sodexo_meal_coupon_deduction: 2200,
        nps_deduction: 4000,
        nps_deduction_arrear: 0,
        total_deductions: 19220,
        net_pay: 75763
    },
    {
        company_name: "Tech Solutions Inc",
        state: "Telangana",
        sl_no: 4,
        employee_no: "EMP004",
        name: "Priya Sharma",
        join_date: "2023-05-05",
        gender: "Female",
        department: "HR",
        designation: "HR Manager",
        has_left: false,
        leaving_date: null,
        email: "priya.s@techsolutions.com",
        personal_email: "priya.sharma@gmail.com",
        pan_no: "DEFGH4567I",
        uan: "100123456792",
        father_name: "Anil Sharma",
        phone: "9876543213",
        aadhaar_number: "123456789015",
        marital_status: "Married",
        spouse_name: "Amit Sharma",
        location: "Hyderabad",
        physically_challenged: false,
        manager_name: "Rachel Green",
        effective_workdays: 21,
        basic: 42000,
        hra: 21000,
        transport_allowance: 3000,
        medical: 1250,
        lta: 3500,
        special_allowance: 12500,
        leave_encashment: 0,
        notice_period: 0,
        basic_arrears: 0,
        transport_arrears: 0,
        hra_arrears: 0,
        special_allowance_arrears: 0,
        medical_arrear: 0,
        lta_arrear: 0,
        nps_earnings: 4200,
        nps_earnings_arrear: 0,
        children_education_allowance: 200,
        weekend_night_support_allowance: 0,
        variable_pay_performance: 7500,
        children_education_arrears: 0,
        odexo_meal_coupon: 2200,
        odexo_meal_coupon_arrear: 0,
        professional_development_allowance: 2500,
        professional_development_arrear: 0,
        tech_support_incentive: 0,
        gross: 99850,
        pf: 5040,
        esi: 0,
        vpf: 500,
        income_tax: 9000,
        professional_tax: 200,
        loan: 2000,
        other_deduction: 0,
        labour_welfare_fund: 20,
        loan_recovery: 0,
        sodexo_meal_coupon_deduction: 2200,
        nps_deduction: 4200,
        nps_deduction_arrear: 0,
        total_deductions: 23160,
        net_pay: 76690
    },
    {
        company_name: "Tech Solutions Inc",
        state: "Karnataka",
        sl_no: 5,
        employee_no: "EMP005",
        name: "Michael Chen",
        join_date: "2022-11-15",
        gender: "Male",
        department: "Engineering",
        designation: "Lead Developer",
        has_left: true,
        leaving_date: "2024-02-28",
        email: "michael.c@techsolutions.com",
        personal_email: "michael.chen@gmail.com",
        pan_no: "EFGHI6789J",
        uan: "100123456793",
        father_name: "David Chen",
        phone: "9876543214",
        aadhaar_number: "123456789016",
        marital_status: "Single",
        spouse_name: null,
        location: "Bangalore",
        physically_challenged: false,
        manager_name: "Mike Johnson",
        effective_workdays: 19,
        basic: 48000,
        hra: 24000,
        transport_allowance: 3000,
        medical: 1250,
        lta: 4000,
        special_allowance: 14000,
        leave_encashment: 8000,
        notice_period: 48000,
        basic_arrears: 0,
        transport_arrears: 0,
        hra_arrears: 0,
        special_allowance_arrears: 0,
        medical_arrear: 0,
        lta_arrear: 0,
        nps_earnings: 4800,
        nps_earnings_arrear: 0,
        children_education_allowance: 0,
        weekend_night_support_allowance: 2000,
        variable_pay_performance: 9500,
        children_education_arrears: 0,
        odexo_meal_coupon: 2200,
        odexo_meal_coupon_arrear: 0,
        professional_development_allowance: 3000,
        professional_development_arrear: 0,
        tech_support_incentive: 2000,
        gross: 173750,
        pf: 5760,
        esi: 0,
        vpf: 1000,
        income_tax: 25000,
        professional_tax: 200,
        loan: 0,
        other_deduction: 0,
        labour_welfare_fund: 20,
        loan_recovery: 0,
        sodexo_meal_coupon_deduction: 2200,
        nps_deduction: 4800,
        nps_deduction_arrear: 0,
        total_deductions: 38980,
        net_pay: 134770
    },
];