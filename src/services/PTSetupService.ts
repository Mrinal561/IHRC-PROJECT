import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { PTSetupData ,PTSetupResponseData } from "@/@types/PtSetup";


export async function getPTSetup(data: PTSetupData){
    return ApiService.fetchData<PTSetupResponseData>({
        url: endpoints.ptSetup.getAll(),
        method: 'get',
        data,
    })
}

export async function getPTSetupById(id: string){
    return ApiService.fetchData({
      url: endpoints.ptSetup.getById(id),
      method: 'get',
    })
}

export async function createPTSetup(data: any){
    return ApiService.fetchData({
      url: endpoints.ptSetup.create(),
      method: 'post',
      data,
    })
  }