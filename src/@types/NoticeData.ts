export interface NoticeData {
    id?: number | string;  // Added for database reference
    group_id: number;
    company_id: number;
    district_id: number;
    location: string;
    notice_type: string;
    notice_date: string;  // ISO string format
    reference_number: string;
    related_act: string;
    notice_document: string;  // Base64 string
    created_at?: string;  // Optional timestamp
    updated_at?: string;  // Optional timestamp
}