import axios from "axios"
import { baseUrl } from "../constant/contant"

export const register = async (payload) => {
    try {
        const res = await axios.post(`${baseUrl}/users/register`, payload)
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error)
    }
}
export const login = async (payload) => {
    try {
        const res = await axios.post(`${baseUrl}/users/login`, payload)
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error)
    }
}