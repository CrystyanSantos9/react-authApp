import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.110:4000",
})

export const createSession = async (email, password) => {
        return await api.post("/sessions", {email, password})
}

export const getUsers = async() => {
    return api.get('/users')
}