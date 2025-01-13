import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { BranchAgreementResponseData, BranchAgreementData } from "@/@types/branchAgreement";




export async function getBranchAgreement(data: BranchAgreementData) {
    return ApiService.fetchData<BranchAgreementResponseData>({
      url: '/branch-agreement',
      method: 'get',
      data,
    });
  }


export async function getBranchAgreementById(id: string) {
    return ApiService.fetchData({
        url: endpoints.branchAgreement.detail(id),
        method: 'get',
    })
}

export async function createBranchAgreement(data: any) {
    return ApiService.fetchData({
        url: endpoints.branchAgreement.create(),
        method: 'post',
        data,
    })
}

export async function updateBranchAgreement(id: string, data: any){
    return ApiService.fetchData({
        url: endpoints.branchAgreement.update(id),
        method: 'put',
        data,
    })
}

export async function deleteBranchAgreement(id: string){
    return ApiService.fetchData({
      url: endpoints.branch.delete(id),
      method: 'delete',
    })
  }