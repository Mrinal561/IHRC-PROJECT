import { CommonCompanyData } from "@/@types/commonApi";
import ApiService from "./ApiService";

export async function getAllCompanies() {
    return ApiService.fetchData<CommonCompanyData[]>({
        url: '/company-group',
        method: 'get',
    });
}