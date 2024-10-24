export interface EmployeeBonusRecord {
    
    company_name: string;
    slNo: number;
    empCode: string;
    employeeName: string;
    fatherName: string;
    dateOfJoining: string; // Format: YYYY-MM-DD
    isAbove15Years: boolean;
    designation: string;
    daysWorkedInYear: number;
    totalSalaryOrWage: number;
    bonusPayable: number;
    pujaOrCustomBonus: number;
    interimBonus: number;
    incomeTaxDeducted: number;
    misconductLossDeduction: number;
    totalDeductions: number;
    state: string;
    district: string;
    location: string;
    branch: string;
  }
 export const employeeBonusRecords: EmployeeBonusRecord[] = [
    { company_name: "Tech Solutions Inc",
      slNo: 1,
      empCode: "E123",
      employeeName: "John Doe",
      fatherName: "Michael Doe",
      dateOfJoining: "2015-06-10",
      isAbove15Years: true,
      designation: "Software Engineer",
      daysWorkedInYear: 300,
      totalSalaryOrWage: 60000,
      bonusPayable: 5000,
      pujaOrCustomBonus: 2000,
      interimBonus: 1500,
      incomeTaxDeducted: 1000,
      misconductLossDeduction: 0,
      totalDeductions: 4500,
      state: "California",
      district: "San Francisco",
      location: "Head Office",
      branch: "Main Branch",
    },
    { company_name: "Tech Solutions Inc",
      slNo: 2,
      empCode: "E124",
      employeeName: "Jane Smith",
      fatherName: "Robert Smith",
      dateOfJoining: "2020-03-15",
      isAbove15Years: true,
      designation: "HR Manager",
      daysWorkedInYear: 280,
      totalSalaryOrWage: 50000,
      bonusPayable: 4000,
      pujaOrCustomBonus: 1500,
      interimBonus: 1000,
      incomeTaxDeducted: 800,
      misconductLossDeduction: 500,
      totalDeductions: 3800,
      state: "New York",
      district: "Manhattan",
      location: "Regional Office",
      branch: "East Branch",
    },
    { company_name: "Tech Solutions Inc",
      slNo: 3,
      empCode: "E125",
      employeeName: "Alice Johnson",
      fatherName: "David Johnson",
      dateOfJoining: "2018-07-25",
      isAbove15Years: true,
      designation: "Accountant",
      daysWorkedInYear: 290,
      totalSalaryOrWage: 45000,
      bonusPayable: 3500,
      pujaOrCustomBonus: 1200,
      interimBonus: 800,
      incomeTaxDeducted: 500,
      misconductLossDeduction: 0,
      totalDeductions: 2500,
      state: "Texas",
      district: "Austin",
      location: "Finance Office",
      branch: "West Branch",
    },
    { company_name: "Tech Solutions Inc",
      slNo: 4,
      empCode: "E126",
      employeeName: "Bob Martin",
      fatherName: "Henry Martin",
      dateOfJoining: "2012-05-14",
      isAbove15Years: true,
      designation: "Operations Manager",
      daysWorkedInYear: 310,
      totalSalaryOrWage: 70000,
      bonusPayable: 6000,
      pujaOrCustomBonus: 2500,
      interimBonus: 1000,
      incomeTaxDeducted: 1200,
      misconductLossDeduction: 300,
      totalDeductions: 5000,
      state: "Florida",
      district: "Miami",
      location: "Operations HQ",
      branch: "South Branch",
    },
    { company_name: "Tech Solutions Inc",
      slNo: 5,
      empCode: "E127",
      employeeName: "Emily Davis",
      fatherName: "George Davis",
      dateOfJoining: "2021-11-10",
      isAbove15Years: true,
      designation: "Sales Executive",
      daysWorkedInYear: 270,
      totalSalaryOrWage: 40000,
      bonusPayable: 3200,
      pujaOrCustomBonus: 1000,
      interimBonus: 500,
      incomeTaxDeducted: 300,
      misconductLossDeduction: 0,
      totalDeductions: 1800,
      state: "Illinois",
      district: "Chicago",
      location: "Sales Office",
      branch: "North Branch",
    },
  ];
  
  