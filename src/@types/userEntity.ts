export type UserData = {
    id?: number;
    group_id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    username: string;
    joining_date: string;
    role: string;
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