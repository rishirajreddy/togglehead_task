import axios from "axios"
import { baseUrl } from "../constant/contant"

export const getFaqs = async () => {
    try {
        const res = await axios.get(`${baseUrl}/faqs`)
        console.log(res)
      
        if (res?.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error)
    }

}
export const createFaqs = async (data, token) => {
    try {
        const res = await axios.post(`${baseUrl}/faqs`, data, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error)
    }

}
export const updatedFaq = async (id, order, token) => {
    try {
        const res = await axios.put(`${baseUrl}/faqs/${id}/re-order`, { order: order }, { headers: { Authorization: `Bearer ${token}` } })
        console.log(res.data)
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error)
    }

}