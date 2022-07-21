import React, { useContext } from 'react'
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation
} from 'react-router-dom'

import MenuBar from './components/MenuBar'

import LoginPage from './pages/LoginPage'
import ProjectsPage from './pages/ProjectsPage'

import ProfessorsPage from './pages/ProfessorsPage'
import ModulesPage from './pages/ModulesPage'
import LocationsPage from './pages/LocationsPage'
import TimetablesPage from './pages/TimetablesPage'

import BlocksPage from './pages/BlocksPage'
import BoardsPage from './pages/BoardsPage'

import ContextProvider, { Context } from './providers/contexts/context'

// Dummy
const DummyComponent = () => {
    return <h3>Not implemented Yet</h3>
}

// Main Component
function MainComponent() {
    const location = useLocation()
    const { token, project } = useContext(Context)

    if (!token) {
        return <LoginPage />
    }

    if (location.pathname !== '/' && !project) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <MenuBar />

            <div className="container-xl pt-3">
                <Routes>
                    <Route exact path="/" element={<ProjectsPage />} />
                    <Route exact path="/boards" element={<BoardsPage />} />
                    <Route exact path="/blocks" element={<BlocksPage />} />
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
                    <Route
                        exact
                        path="/timetables"
                        element={<TimetablesPage />}
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
