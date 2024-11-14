import {BranchData} from '@/@types/branch';
import ApiService from './ApiService';

export async function getAllCompliances() {
    return ApiService.fetchData<BranchData[]>({
        url: '/recommended-list',
        method: 'get',
    });
}