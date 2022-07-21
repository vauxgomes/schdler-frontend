import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '../../providers/contexts/context'
import LoadBar from '../LoadBar'
import ProjectSelector from '../ProjectSelector'

export default function MenuBar() {
    const [showComponentsDropdown, setShowComponentsDropdown] = useState(false)
    const { setToken } = useContext(Context)

    const getMenuClass = ({ isActive }) => {
        return `nav-link ${isActive ? 'active ' : ''}`
    }

    const getSubmenuClass = ({ isActive }) => {
        return `dropdown-item d-flex align-items-center gap-2 ${
            isActive ? 'active ' : ''
        }`
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
                                Blocos
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
                                {'Elementos   '}
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
                                        <i className="fa-solid fa-chalkboard-user fa-xs"></i>
                                        <span>Professores</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/modules"
                                        className={getSubmenuClass}
                                    >
                                        <i className="fa-solid fa-book fa-xs"></i>
                                        <span>Disciplinas</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/locations"
                                        className={getSubmenuClass}
                                    >
                                        <i className="fa-solid fa-location-dot fa-xs"></i>
                                        <span>Locais</span>
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
                                        <i className="far fa-clock fa-xs"></i>
                                        Períodos
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item d-flex">
                            <ProjectSelector
                                className={
                                    'form-select-sm border border-primary'
                                }
                            />
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
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
