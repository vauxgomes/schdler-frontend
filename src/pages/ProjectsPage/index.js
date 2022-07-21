// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'
import Alert, { AlertTypes } from '../../components/Alert'
import ProjectItem from './ProjectItem'

import { Context } from '../../providers/contexts/context'
import api from '../../providers/services/api'
import ProjectSelector from '../../components/ProjectSelector'
import { isCompositeComponent } from 'react-dom/test-utils'

export default function ProjectsPage() {
    const { token, project, setProject, projects, setProjects, setLoading } =
        useContext(Context)

    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        setLoading(true)

        api.setToken(token)
        api.getProjects()
            .then((res) => {
                setProjects(res)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
            .then(() => setLoading(false))
    }, [token, setProjects, setLoading])

    const hideAlert = () => {
        setAlertStatus(false)
    }

    const showAlert = (message) => {
        setAlertStatus(true)
        setAlertMessage(message)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        hideAlert()

        if (!id) {
            // POST
            api.postProject(name)
                .then((res) => {
                    const item = {
                        id: res.data.id,
                        code: res.data.code,
                        name
                    }

                    if (projects.length === 0) {
                        setProject(item)
                    }

                    setProjects((prev) => [...prev, item])
                })
                .catch((err) => {
                    showAlert(err.response.data.message)
                })
        } else {
            // PUT
            api.putProject(id, name)
                .then((res) => {
                    setProjects(
                        projects.map((item) =>
                            item.id === id ? { ...item, name } : item
                        )
                    )
                })
                .catch((err) => {
                    showAlert(err.response.data.message)
                })
        }

        onReset()
    }

    const onRemove = () => {
        hideAlert()

        api.deleteProject(id)
            .then((res) => {
                setProjects((prev) => prev.filter((item) => item.id !== id))

                if (project && project.id === id) setProject('')
            })
            .catch((err) => {
                showAlert(err.response.data.message)
            })

        onReset()
    }

    const onReset = () => {
        hideAlert()
        setId('')
        setName('')
    }

    const onLoadItem = (item) => {
        hideAlert()
        setId(item.id)
        setName(item.name)
    }

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Projetos</h3>
                <i className="text-secondary fas fa-pencil-ruler"></i>
            </header>

            <div className="container-fluid">
                <div className="row mb-3 gap-3 align-items-start">
                    <div className="col-sm-12 col-md-7 col-lg-8">
                        <div className="row gap-3">
                            {/* Selection */}
                            <div className="col-12 p-0 py-1 card border-0 shadow-sm">
                                <div className="card-body">
                                    <h6>Seleção</h6>
                                    <p className="text-secondary small">
                                        Um único projeto pode estar ativo
                                    </p>

                                    <ProjectSelector />
                                </div>
                            </div>

                            {/* Control */}
                            <div className="col-12 p-0 py-1 card border-0 shadow-sm">
                                <div className="card-body">
                                    <h6>Controle</h6>
                                    <p className="text-secondary small">
                                        Os projetos representam um grupo de{' '}
                                        <strong>Quadros</strong>.
                                    </p>

                                    {/* Alert */}
                                    {alertStatus && (
                                        <Alert
                                            type={AlertTypes.DANGER}
                                            onClose={hideAlert}
                                        >
                                            {alertMessage}
                                        </Alert>
                                    )}
                                    <form onSubmit={onSubmit}>
                                        {/* Name */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="name-input"
                                                className="form-label"
                                            >
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                id="name-input"
                                                className="form-control"
                                                required={true}
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Buttons */}
                                        <div className="d-flex gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-sm btn-primary"
                                            >
                                                {id ? 'Atualizar' : 'Salvar'}
                                            </button>

                                            {id && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-warning"
                                                    onClick={onRemove}
                                                >
                                                    Remover
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-secondary"
                                                onClick={onReset}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List */}
                    <div className="col p-0 py-1 card border-0 shadow-sm">
                        <div className="card-body">
                            <h6>Projetos</h6>
                            <p className="small text-muted">
                                Lista de Projetos
                            </p>

                            {projects.map((item) => (
                                <ProjectItem
                                    key={item.id}
                                    item={item}
                                    onClick={() => onLoadItem(item)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
