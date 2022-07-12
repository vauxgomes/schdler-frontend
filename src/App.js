import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MenuBar from './components/MenuBar'

import LoginPage from './pages/LoginPage'
import ProfessorsPage from './pages/ProfessorsPage'
import ModulesPage from './pages/ModulesPage'
import LocationsPage from './pages/LocationsPage'

import ContextProvider, { Context } from './providers/context'

// Dummy
const DummyComponent = () => {
    return <h3>Not implemented Yet</h3>
}

// Main Component
function MainComponent() {
    const { token } = useContext(Context)

    if (!token) {
        return <LoginPage />
    }

    return (
        <div className="vh-100">
            <MenuBar />
            <div className="container py-3 h-100">
                <Routes>
                    <Route
                        exact
                        path="/professors"
                        element={<ProfessorsPage />}
                    />
                    <Route exact path="/modules" element={<ModulesPage />} />
                    <Route
                        exact
                        path="/locations"
                        element={<LocationsPage />}
                    />
                    <Route path="*" element={<DummyComponent />} />
                </Routes>
            </div>
        </div>
    )
}

// App
function App() {
    return (
        <ContextProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="*" element={<MainComponent />} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App
