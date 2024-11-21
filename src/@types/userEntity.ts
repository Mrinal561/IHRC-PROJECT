export type UserData = {
    id?: number;
    group_id: number;
    name: string;
    // last_name: string;
    email: string;
    password: string;
    mobile: string;
    joining_date: string;
    role_id: number;
    aadhar_no?: string;
    pan_card?: string;
    auth_signatory: boolean;
    suspend: boolean;
    disable: boolean;
}

export type UserResponseData = {
    user: UserData[];
    loading: boolean;
    error: string | null;
    currentUser: UserData | null;
}