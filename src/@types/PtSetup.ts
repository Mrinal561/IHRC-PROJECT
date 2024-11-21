export type PTSetupData = {
    id: number;
    uuid: string;
    record_id: string;
    group_id: number;
    company_id: number;
    state: number;
    location: number;
    registration_number: number;
    enrollment_number: number;
    registration_date: string;
    remittance_mode: string;
    pt_user: string;
    password: string;
    email: string;
    mobile_no: number;
    ec_frequency: string;
    rc_frequency: string;
    ec_certificate: string;
    rc_certificate: string;
}


export type PTSetupResponseData = {
    ptsetup: PTSetupData[];
    Loading: boolean;
    error: string | null;
}