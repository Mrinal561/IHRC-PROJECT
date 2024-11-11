
// import ApiService from "./LoginApiService";
import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { CompanyData , CompanyResponseData} from '../@types/company';

export async function getCompanyGroups(data: CompanyData){
  return ApiService.fetchData<CompanyResponseData>({
    url:'/company',
    method: 'get',
    data,
  })
}

export async function getCompanyById(id: string){
  return ApiService.fetchData({
    url: endpoints.company.getById(id),
    method: 'get',
  })
}
export async function createCompany(data: any){
  return ApiService.fetchData({
    url: endpoints.company.create(),
    method: 'post',
    data,
  })
}
export async function updateCompany(id: string, data: any){
  return ApiService.fetchData({
    url: endpoints.company.update(id),
    method: 'put',
    data,
  })
}
export async function deleteCompany(id: string){
  return ApiService.fetchData({
    url: endpoints.company.delete(id),
    method: 'delete',
  })
}
