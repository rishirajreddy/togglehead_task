import axios from "axios"
import { baseUrl } from "../constant/contant"
export const getBanners = async () => {
    try {
        const res = await axios.get(`${baseUrl}/banners`)
        if (res?.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error);
    }
}

export const createBanner = async (data, token) => {
    try {
        const res = await axios.post(`${baseUrl}/banners`,
            data,
            {
                'Content-Type': 'multipart/form-data',
                headers: { Authorization: `Bearer ${token}` }
            })
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error);
    }
}
export const updateBanner = async (id, order, token) => {
    try {
        const res = await axios.put(`${baseUrl}/banners/${id}/re-order`, { order: order },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error);
    }
}