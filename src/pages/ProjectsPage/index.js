// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'
import Alert, { AlertTypes } from '../../components/Alert'
import ProjectItem from './ProjectItem'

import { Context } from '../../providers/contexts/context'
import api from '../../providers/services/api'

export default function ProjectsPage() {
    const { token, project, setProject, setLoading } = useContext(Context)

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [projectId, setProjectId] = useState(project?.id || '')

    const [projects, setProjects] = useState([])

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
    }, [token, setLoading])

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

                if (id === projectId) {
                    setProjectId('')
                    setProject(null)
                }
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

    const onChangeProject = (e) => {
        const idx = projects.findIndex(
            (item) => item.id === Number(e.target.value)
        )

        setProjectId(projects[idx].id)
        setProject(projects[idx])
    }

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Projetos</h3>
                <i className="text-secondary fas fa-project-diagram"></i>
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

                                    <select
                                        className="form-select"
                                        value={projectId}
                                        onChange={onChangeProject}
                                    >
                                        <option value="">
                                            Selecione um Projeto
                                        </option>

                                        {projects.map((item) => (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
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
