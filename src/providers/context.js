import React, { useState } from 'react'

export const Context = React.createContext()
export default function ContextProvider({ children }) {
    // States
    const [token, setToken__] = useState(localStorage.getItem('token'))
    const [project, setProject__] = useState(
        JSON.parse(localStorage.getItem('project'))
    )

    const [isLoading, setLoading] = useState(true)

    const setToken = (token) => {
        setToken__(token)
        localStorage.setItem('token', token)
    }

    const setProject = (project) => {
        setProject__(project)
        localStorage.setItem('project', JSON.stringify(project))
    }

    // Provider
    return (
        <Context.Provider
            value={{
                token,
                setToken,

                project,
                setProject,

                isLoading,
                setLoading
            }}
        >
            {children}
        </Context.Provider>
    )
}
