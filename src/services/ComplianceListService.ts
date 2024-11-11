import {ComplianceData} from '@/@types/compliance';
import ApiService from './ApiService';

export async function getAllCompliances() {
    return ApiService.fetchData<ComplianceData[]>({
        url: '/recommended-list',
        method: 'get',
    });
}