import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { EsiSetupData, EsiSetupResponseData } from "@/@types/esiSetup";


export async function getEsiSetup(data: EsiSetupData){
    return ApiService.fetchData<EsiSetupResponseData>({
        url: '/esisetup',
        method: 'get',
        data,
    })
}

export async function getEsiSetupById(id: string){
    return ApiService.fetchData({
      url: endpoints.esiSetup.getById(id),
      method: 'get',
    })
}

export async function createEsiSetup(data: any){
    return ApiService.fetchData({
      url: endpoints.esiSetup.create(),
      method: 'post',
      data,
    })
  }

