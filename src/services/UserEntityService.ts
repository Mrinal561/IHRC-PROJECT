import ApiService from "./ApiService";
import { endpoints } from "@/api/endpoint";
import { UserData } from "@/@types/userEntity";


export async function getUsers() {
    return ApiService.fetchData<UserData[]>({
        url: endpoints.user.getAll(),
        method: 'get',
    });
}

export async function getUserById(id: string) {
    return ApiService.fetchData({
        url: endpoints.user.getById(id),
        method: 'get',
    });
}

export async function createUser(data: any ) {
    return ApiService.fetchData({
        url: endpoints.user.create(),
        method: 'post',
        data,
    });
}

export async function updateUser(id: string, data: any) {
    return ApiService.fetchData({
        url: endpoints.user.update(id),
        method: 'put',
        data,
    });
}

export async function deleteUser(id: string) {
    return ApiService.fetchData({
        url: endpoints.user.delete(id),
        method: 'delete',
    });
}