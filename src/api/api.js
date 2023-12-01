import axios from "axios";
import { result } from "lodash";

const API_URL = process.env.REACT_APP_API_URL;

export async function getLocations() {
    try {
        const response = await axios.get(`${API_URL}/products/api/v1/getLocations`)
        if (response.data.success === "1") {
            return response.data;
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export async function getHotels() {
    try {
        const response = await axios.get(`${API_URL}/products/api/v1/getDatas`)

        if (response.data.success === "1") {
            return response.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export async function getHotelData(id) {
    try {
        const response = await axios.post(`${API_URL}/products/api/v1/gerHotelData`, { id: id })
        if (response.data.success === "1") {
            return response.data
        }
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export async function createUser(data) {
    const url = `${API_URL}/users/api/v1/createUser`;
    try {
        const response = await axios.post(url, data)
        return response.data
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export async function loginUser(data) {
    const url = `${API_URL}/users/api/v1/login`;

    try {
        console.log(url);
        const response = await axios.post(url, data)
        return response.data
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export async function userLogout(token, userId) {
    const url = `${API_URL}/users/api/v1/logout`;

    try {
        const response = await axios.post(url, { userId }, {
            headers: {
                'Authorization': token
            }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
        throw error
    }
}