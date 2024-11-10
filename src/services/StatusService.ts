import { StatusRequest } from "@/@types/status";
import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";


export async function createAssignStatus(id:string , data: any){
    return ApiService.fetchData({
      url: endpoints.due.updateStatus(id),
      method: 'PUT',
      data,
    })
  }
