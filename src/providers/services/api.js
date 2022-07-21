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

    /* PROJECTS */

    async getProjects() {
        const response = await this.api.get('/projects', this.config)
        return response.data
    }

    async postProject(name) {
        const response = await this.api.post('/projects', { name }, this.config)
        return response.data
    }

    async putProject(id, name) {
        const response = await this.api.put(
            `/projects/${id}`,
            { name },
            this.config
        )
        return response.data
    }

    async deleteProject(id) {
        const response = await this.api.delete(`/projects/${id}`, this.config)
        return response.data
    }

    /* PROFESSORS */

    async getProfessors(project_id) {
        const response = await this.api.get(
            `/projects/${project_id}/professors`,
            this.config
        )
        return response.data
    }

    async postProfessor(project_id, name, short, code, color) {
        const response = await this.api.post(
            `/projects/${project_id}/professors`,
            { name, short, code, color },
            this.config
        )
        return response.data
    }

    async putProfessor(project_id, id, name, short, code, color) {
        const response = await this.api.put(
            `/projects/${project_id}/professors/${id}`,
            { name, short, code, color },
            this.config
        )
        return response.data
    }

    async deleteProfessor(project_id, id) {
        const response = await this.api.delete(
            `/projects/${project_id}/professors/${id}`,
            this.config
        )
        return response.data
    }

    /* MODULES */

    async getModules(project_id) {
        const response = await this.api.get(
            `/projects/${project_id}/modules`,
            this.config
        )
        return response.data
    }

    async postModule(project_id, name, short, code, credits) {
        const response = await this.api.post(
            `/projects/${project_id}/modules`,
            { name, short, code, credits },
            this.config
        )
        return response.data
    }

    async putModule(project_id, id, name, short, code, credits) {
        const response = await this.api.put(
            `/projects/${project_id}/modules/${id}`,
            { name, short, code, credits },
            this.config
        )
        return response.data
    }

    async deleteModule(project_id, id) {
        const response = await this.api.delete(
            `/projects/${project_id}/modules/${id}`,
            this.config
        )
        return response.data
    }

    /* LOCATIONS */

    async getLocations(project_id) {
        const response = await this.api.get(
            `/projects/${project_id}/locations`,
            this.config
        )
        return response.data
    }

    async postLocation(project_id, name, short, code, color, capacity) {
        const response = await this.api.post(
            `/projects/${project_id}/locations`,
            { name, short, code, color, capacity },
            this.config
        )
        return response.data
    }

    async putLocation(project_id, id, name, short, code, color, capacity) {
        const response = await this.api.put(
            `/projects/${project_id}/locations/${id}`,
            { name, short, code, color, capacity },
            this.config
        )
        return response.data
    }

    async deleteLocation(project_id, id) {
        const response = await this.api.delete(
            `/projects/${project_id}/locations/${id}`,
            this.config
        )
        return response.data
    }

    /* TIMETABLES */

    async getTimetables(project_id) {
        const response = await this.api.get(
            `/projects/${project_id}/timetables`,
            this.config
        )
        return response.data
    }

    async postTimetable(project_id, start, end, shift) {
        const response = await this.api.post(
            `/projects/${project_id}/timetables`,
            { start, end, shift },
            this.config
        )
        return response.data
    }

    async putTimetable(project_id, id, start, end, shift) {
        const response = await this.api.put(
            `/projects/${project_id}/timetables/${id}`,
            { start, end, shift },
            this.config
        )
        return response.data
    }

    async deleteTimetable(project_id, id) {
        const response = await this.api.delete(
            `/projects/${project_id}/timetables/${id}`,
            this.config
        )
        return response.data
    }

    /* BLOCKS */

    async getBlocks(project_id) {
        const response = await this.api.get(
            `/projects/${project_id}/blocks`,
            this.config
        )
        return response.data
    }

    async postBlock(project_id, professor_id, module_id) {
        const response = await this.api.post(
            `/projects/${project_id}/blocks`,
            { professor_id, module_id },
            this.config
        )
        return response.data
    }

    async deleteBlock(project_id, block_id) {
        const response = await this.api.delete(
            `/projects/${project_id}/blocks/${block_id}`,
            this.config
        )
        return response.data
    }

    /* BOARDS */

    async getBoards(project_id) {
        const response = await this.api.get(
            `/projects/${project_id}/boards`,
            this.config
        )
        return response.data
    }

    async postBoard(project_id, name, shift) {
        const response = await this.api.post(
            `/projects/${project_id}/boards`,
            { name, shift },
            this.config
        )
        return response.data
    }

    async putBoard(project_id, id, name, shift) {
        const response = await this.api.put(
            `/projects/${project_id}/boards/${id}`,
            { name, shift },
            this.config
        )
        return response.data
    }

    async deleteBoard(project_id, block_id) {
        const response = await this.api.delete(
            `/projects/${project_id}/boards/${block_id}`,
            this.config
        )
        return response.data
    }
}

export default new API()
