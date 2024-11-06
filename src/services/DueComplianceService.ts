
import { DueComplianceDetailData } from '@/@types/dueCompliance';
import ApiService from './ApiService';

export async function getAllCompliances() {
    return ApiService.fetchData<DueComplianceDetailData[]>({
        url: '/assigned-checklist',
        method: 'get',
    });
}