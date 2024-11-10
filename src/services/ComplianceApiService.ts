import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";

export type AssignCompliances = {
    branch_id: number;
    compliance_id: number[];
}

export type ComplianceResponse = {
    status: boolean;
    message: string;
    data?: any;
}

export async function assignCompliances(data: AssignCompliances) {
    return ApiService.fetchData<ComplianceResponse>({
        url: endpoints.assign.create(),
        method: 'post',
        data,
    });
}