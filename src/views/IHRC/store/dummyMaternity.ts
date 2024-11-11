export interface MaternityBenefitRecord {
    srNo: number;
    company_name: string;
    empID: string;
    nameOfWoman: string;
    dateOfJoining: string; // Format: YYYY-MM-DD
    fatherOrHusbandName: string;
    department: string;
    natureOfWork: string;
    dateOfBirth: string; // Format: YYYY-MM-DD
    laidOffDates: string[]; // List of laid-off dates in 'YYYY-MM' format
    totalDaysEmployed: number;
    noticeDate: string; // Notice under section 6
    daysLaidOff: number;
    childBirthDate: string | null; // Null if not applicable
    daysNotEmployed: number;
    noticeUnderSection6: string;
    proofOfDeliveryDate: string | null; // Can be null
    dischargeOrDismissalDate: string | null; // Can be null
    maternityBenefitAdvance: {
      date: string;
      amount: number;
    } | null;
    subsequentMaternityBenefit: {
      date: string;
      amount: number;
    } | null;
    medicalBonus: {
      date: string;
      amount: number;
    } | null;
    leaveWages: {
      date: string;
      amount: number;
    } | null;
    proofOfIllnessDate: string | null; // Can be null
    nomineeName: string;
    deathDetails: {
      womanDeathDate: string | null;
      beneficiaryName: string;
      amount: number;
      paymentDate: string;
    } | null;
    childSurvivorDetails: {
      beneficiaryName: string;
      periodPaid: string;
    } | null;
    leaveUnderSection9: {
      date: string;
      amount: number;
    } | null;
    leaveUnderSection10: {
      date: string;
      amount: number;
      periodGranted: string;
    } | null;
    state: string;
    district: string;
    location: string;
    branch: string;
  }

 export const maternityRecords: MaternityBenefitRecord[] = [
    {   company_name: "Tech Solutions Inc",
      srNo: 1,
      empID: "E101",
      nameOfWoman: "Alice Johnson",
      dateOfJoining: "2020-05-15",
      fatherOrHusbandName: "John Johnson",
      department: "IT",
      natureOfWork: "Software Engineer",
      dateOfBirth: "1990-02-10",
      laidOffDates: ["2024-08", "2024-09"],
      totalDaysEmployed: 1200,
      noticeDate: "2024-09-01",
      daysLaidOff: 10,
      childBirthDate: "2024-10-05",
      daysNotEmployed: 30,
      noticeUnderSection6: "2024-09-20",
      proofOfDeliveryDate: "2024-10-06",
      dischargeOrDismissalDate: null,
      maternityBenefitAdvance: { date: "2024-09-25", amount: 5000 },
      subsequentMaternityBenefit: { date: "2024-10-20", amount: 10000 },
      medicalBonus: { date: "2024-10-25", amount: 3000 },
      leaveWages: { date: "2024-11-10", amount: 2000 },
      proofOfIllnessDate: null,
      nomineeName: "David Johnson",
      deathDetails: null,
      childSurvivorDetails: null,
      leaveUnderSection9: { date: "2024-11-15", amount: 1500 },
      leaveUnderSection10: {
        date: "2024-12-01",
        amount: 1800,
        periodGranted: "15 days",
      },
      state: "New York",
      district: "Manhattan",
      location: "Head Office",
      branch: "Main Branch",
    },
    {company_name: "Tech Solutions Inc",
      srNo: 2,
      empID: "E102",
      nameOfWoman: "Emma Watson",
      dateOfJoining: "2018-03-10",
      fatherOrHusbandName: "Robert Watson",
      department: "HR",
      natureOfWork: "HR Manager",
      dateOfBirth: "1988-06-15",
      laidOffDates: [],
      totalDaysEmployed: 2000,
      noticeDate: "2024-08-01",
      daysLaidOff: 5,
      childBirthDate: null,
      daysNotEmployed: 20,
      noticeUnderSection6: "2024-08-15",
      proofOfDeliveryDate: null,
      dischargeOrDismissalDate: "2024-09-30",
      maternityBenefitAdvance: null,
      subsequentMaternityBenefit: null,
      medicalBonus: null,
      leaveWages: null,
      proofOfIllnessDate: "2024-08-20",
      nomineeName: "Oliver Watson",
      deathDetails: {
        womanDeathDate: "2024-09-28",
        beneficiaryName: "Oliver Watson",
        amount: 12000,
        paymentDate: "2024-10-01",
      },
      childSurvivorDetails: null,
      leaveUnderSection9: null,
      leaveUnderSection10: null,
      state: "California",
      district: "Los Angeles",
      location: "Regional Office",
      branch: "West Branch",
    },
  ];
  