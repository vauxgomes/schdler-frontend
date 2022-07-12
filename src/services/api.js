/**
 * AXIOS
 * --------------------------------------
 * axios.request(config)
 * axios.get(url[, config])
 * axios.delete(url[, config])
 * axios.head(url[, config])
 * axios.options(url[, config])
 * axios.post(url[, data[, config]])
 * axios.put(url[, data[, config]])
 * axios.patch(url[, data[, config]])
 */

import axios from 'axios'

class API {
    constructor(token = null) {
        this.api = axios.create({
            baseURL: 'http://localhost:3333' // process.env.REACT_APP_API_URL
        })

        this.config = {
            headers: {
                Authorization: token
            }
        }
    }

    /* GETTERS & SETTERS */

    getToken() {
        return this.config.headers.Authorization
    }

    setToken(token) {
        this.config = {
            headers: {
                Authorization: token
            }
        }
    }

    /* LOGIN */

    async login(username, password) {
        const response = await this.api.post('/login', { username, password })
        return response.data
    }

    /* PROFESSORS */

    async getProfessors() {
        const response = await this.api.get('/professors', this.config)
        return response.data
    }

    async postProfessor(name) {
        const response = await this.api.post(
            '/professors',
            { name },
            this.config
        )
        return response.data
    }

    async putProfessor(id, name) {
        const response = await this.api.put(
            `/professors/${id}`,
            { name },
            this.config
        )
        return response.data
    }

    async deleteProfessor(id) {
        const response = await this.api.delete(`/professors/${id}`, this.config)
        return response.data
    }

    /* MODULES */

    async getModules() {
        const response = await this.api.get('/modules', this.config)
        return response.data
    }

    async postModule(name, credits) {
        const response = await this.api.post(
            '/modules',
            { name, credits },
            this.config
        )
        return response.data
    }

    async putModule(id, name, credits) {
        const response = await this.api.put(
            `/modules/${id}`,
            { name, credits },
            this.config
        )
        return response.data
    }

    async deleteModule(id) {
        const response = await this.api.delete(`/modules/${id}`, this.config)
        return response.data
    }

    /* LOCATIONS */

    async getLocations() {
        const response = await this.api.get('/locations', this.config)
        return response.data
    }

    async postLocation(name) {
        const response = await this.api.post(
            '/locations',
            { name },
            this.config
        )
        return response.data
    }

    async putLocation(id, name) {
        const response = await this.api.put(
            `/locations/${id}`,
            { name },
            this.config
        )
        return response.data
    }

    async deleteLocation(id) {
        const response = await this.api.delete(`/locations/${id}`, this.config)
        return response.data
    }
}

export default new API()
