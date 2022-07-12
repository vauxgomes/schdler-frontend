import React, { useState } from 'react'

export const Context = React.createContext()
export default function ContextProvider({ children }) {
    // States
    const [token, setToken__] = useState('') //useState(localStorage.getItem('token'))

    // Set Token
    const setToken = (token) => {
        setToken__(token)
        localStorage.setItem('token', token)
    }

    // Provider
    return (
        <Context.Provider value={{ token, setToken }}>
            {children}
        </Context.Provider>
    )
}
