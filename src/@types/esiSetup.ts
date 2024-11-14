export type EsiSetupData = {
    group_id: number;
    company_id: number;
    code_Type: string;
    code: string;
    district: number;
    location: string;
    esi_user: string;
    password: string;
    signatory_data: [
       {
           signatory_id: number;
       }
    ],
    certificate?: string;
}


export type EsiSetupResponseData = {
    esisetup: EsiSetupData[];
    Loading: boolean;
    error: string | null;
    
}