// import {BranchData} from '@/@types/branch';
import { ComplianceAssignmentData } from '@/@types/assignedCompliance';
import ApiService from './ApiService';
import { endpoints } from '@/api/endpoint';

export async function getAllCompliances() {
    return ApiService.fetchData<ComplianceAssignmentData[]>({
        url: '/recommended-list',
        method: 'get',
    });
}
export async function updateAssigned(id: string, data: ApproverOwnerAssignedCompliances) {
    return ApiService.fetchData<ComplianceAssignmentData>({
        url: endpoints.assign.update(id),
        method: 'put',
        data,
    });
}