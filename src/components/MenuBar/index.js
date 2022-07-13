import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// import './style.css'

export default function MenuBar() {
    const [isComponents, setComponents] = useState(false)

    const getMenuClass = ({ isActive }) => {
        return `nav-link ${isActive ? 'active ' : ''}`
    }

    const getSubmenuClass = ({ isActive }) => {
        return `dropdown-item ${isActive ? 'active ' : ''}`
    }

    return (
        <div className="navbar navbar-expand bg-white border-bottom sticky-top">
            <div className="container">
                <span className="navbar-brand">Schdler</span>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/boards" className={getMenuClass}>
                            Quadros
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/blocks" className={getMenuClass}>
                            Blocos
                        </NavLink>
                    </li>

                    <li
                        className="nav-item dropdown"
                        onMouseEnter={() => setComponents(true)}
                        onMouseLeave={() => setComponents(false)}
                    >
                        <span className="nav-link dropdown-toggle">
                            Componentes
                        </span>

                        <ul
                            className={`dropdown-menu ${
                                isComponents && 'show'
                            }`}
                        >
                            <li>
                                <NavLink
                                    to="/professors"
                                    className={getSubmenuClass}
                                >
                                    Professores
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/modules"
                                    className={getSubmenuClass}
                                >
                                    Disciplinas
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/locations"
                                    className={getSubmenuClass}
                                >
                                    Locais
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/" className={getMenuClass}>
                            Projetos
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
