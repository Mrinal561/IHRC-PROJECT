import { CommonCompanyData, CommonStateData } from "@/@types/commonApi";
import ApiService from "./ApiService";

export async function getAllCompanies() {
    return ApiService.fetchData<CommonCompanyData[]>({
        url: '/company-group',
        method: 'get',
    });
}

export async function getAllStates() {
    return ApiService.fetchData<CommonStateData[]>({
        url: '/state',
        method: 'get',
    })
}