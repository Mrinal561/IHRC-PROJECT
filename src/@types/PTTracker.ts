export type PTTrackerData = {
    id: number;
    uuid: string;
    state: number;
    pt_ec_location: string;
    pt_rc_location: string;
    pt_ec_number: number;
    dateOfEnrolment: string;
    ptEcEnrolmentAddress: string;
    remittanceMode: string;
    frequency: string;
    period: string;
    totalAmountAsPerChallan: number;
    totalAmountPaid: number;
    dueDate: string;
    dateOfPayment: string;
    delay: string;
    delayReason:string;
    receiptNo: number;
    challan: string;
    payment: string;
    ret:string;
    iseditable?:boolean;
    uploaded_by?:any;
    UploadBy: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        mobile: string | null;
    };
    PtSetup: {
        // pf_code: string;
        CompanyGroup: {
            id: number;
            name: string;
        };
        Company: {
            id: number;
            name: string;
        };
        Location: {
            id: number;
            name: string;
        };
    };


}