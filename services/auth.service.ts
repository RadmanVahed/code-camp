import { FetchApi } from "@/utilities/ApiConfig";
import type {registerType} from '@/models/auth/authTypes'

export async function Register(data:registerType) {
    return await FetchApi('auth/register' , {
        method:'post',
        body:data
    })
}



