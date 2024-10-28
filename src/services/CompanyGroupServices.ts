
// import ApiService from "./LoginApiService";
import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { CompanyGroupData , CompanyResponseGroupData} from '../@types/companyGroup';

export async function getCompanyGroups(data: CompanyGroupData){
  return ApiService.fetchData<CompanyResponseGroupData>({
    url:'/state',
    method: 'get',
    data,
  })
}

export async function getCompanyGroupBayId(id: string){
  return ApiService.fetchData({
    url: endpoints.companyGroup.getById(id),
    method: 'get',
  })
}
export async function createCompanyGroup(data: any){
  return ApiService.fetchData({
    url: endpoints.companyGroup.create(),
    method: 'post',
    data,
  })
}
export async function updateCompanyGroup(id: string, data: any){
  return ApiService.fetchData({
    url: endpoints.companyGroup.update(id),
    method: 'put',
    data,
  })
}
export async function deleteCompanyGroup(id: string){
  return ApiService.fetchData({
    url: endpoints.companyGroup.delete(id),
    method: 'delete',
  })
}
