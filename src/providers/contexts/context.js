import React, { useState } from 'react'

export const Context = React.createContext()
export default function ContextProvider({ children }) {
    // Token
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Project
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState(
        JSON.parse(localStorage.getItem('project'))
    )

    // Status
    const [isLoading, setLoading] = useState(true)

    const setTokenAndStore = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const setProjectAndStore = (project) => {
        setProject(project)
        localStorage.setItem('project', JSON.stringify(project))
    }

    // Provider
    return (
        <Context.Provider
            value={{
                token,
                setToken: setTokenAndStore,

                project,
                setProject: setProjectAndStore,

                projects,
                setProjects,

                isLoading,
                setLoading
            }}
        >
            {children}
        </Context.Provider>
    )
}
