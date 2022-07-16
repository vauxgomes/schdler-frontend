import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '../../providers/contexts/context'
import LoadBar from '../LoadBar'

import './style.css'

export default function MenuBar() {
    const [showComponentsDropdown, setShowComponentsDropdown] = useState(false)
    const { setToken } = useContext(Context)

    const getMenuClass = ({ isActive }) => {
        return `nav-link ${isActive ? 'active ' : ''}`
    }

    const getSubmenuClass = ({ isActive }) => {
        return `dropdown-item ${isActive ? 'active ' : ''}`
    }

    return (
        <div className="sticky-top">
            <div className="navbar navbar-expand bg-white border-bottom">
                <div className="container-xl">
                    <span className="logo d-flex align-items-center gap-2 navbar-brand">
                        <span>Schdler</span>
                    </span>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className={getMenuClass}>
                                Projetos
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/boards" className={getMenuClass}>
                                Grade
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/blocks" className={getMenuClass}>
                                Alocação
                            </NavLink>
                        </li>

                        <li
                            className="nav-item dropdown"
                            onMouseEnter={() => setShowComponentsDropdown(true)}
                            onMouseLeave={() =>
                                setShowComponentsDropdown(false)
                            }
                        >
                            <span className="nav-link dropdown-toggle">
                                Configuração
                            </span>

                            <ul
                                className={`dropdown-menu ${
                                    showComponentsDropdown && 'show'
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

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <NavLink
                                        to="/timetables"
                                        className={getSubmenuClass}
                                    >
                                        Períodos
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link btn"
                                onClick={() => setToken(null)}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Load Bar */}
            <LoadBar />
        </div>
    )
}
