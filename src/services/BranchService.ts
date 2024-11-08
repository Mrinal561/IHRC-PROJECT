
// import ApiService from "./LoginApiService";
import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { BranchData, BranchResponseData } from "@/@types/branch";

export async function getBranch(data: BranchData){
    return ApiService.fetchData<BranchResponseData>({
      url:'/branch',
      method: 'get',
      data,
    })
  }

export async function getBranchById(id: string){
  return ApiService.fetchData({
    url: endpoints.branch.getById(id),
    method: 'get',
  })
}
export async function createCompanyBranch(data: any){
  return ApiService.fetchData({
    url: endpoints.branch.create(),
    method: 'post',
    data,
  })
}
export async function updateBranch(id: string, data: any){
  return ApiService.fetchData({
    url: endpoints.branch.update(id),
    method: 'put',
    data,
  })
}
export async function deleteBranch(id: string){
  return ApiService.fetchData({
    url: endpoints.branch.delete(id),
    method: 'delete',
  })
}
