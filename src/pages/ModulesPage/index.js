// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'

import Alert, { AlertTypes } from '../../components/Alert'
import ModuleItem from './ModuleItem'

import { Context } from '../../providers/contexts/context'
import api from '../../providers/services/api'

export default function ModulesPage() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [short, setShort] = useState('')
    const [code, setCode] = useState('')
    const [credits, setCredits] = useState(1)

    const [modules, setModules] = useState([])

    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const { token, project, setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)

        api.setToken(token)
        api.getModules(project.id)
            .then((res) => {
                setModules(res)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
            .then(() => setLoading(false))
    }, [token, project, setLoading])

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
            api.postModule(project.id, name, short, code, credits)
                .then((res) => {
                    const item = {
                        id: res.data.id,
                        name,
                        short,
                        code,
                        credits
                    }

                    setModules((prev) => [...prev, item])
                })
                .then(onReset)
                .catch((err) => {
                    showAlert(err.response.data.message)
                })
        } else {
            // PUT
            api.putModule(project.id, id, name, short, code, credits)
                .then((res) => {
                    setModules(
                        modules.map((item) =>
                            item.id === id
                                ? { ...item, name, short, code, credits }
                                : item
                        )
                    )
                })
                .then(onReset)
                .catch((err) => {
                    showAlert(err.response.data.message)
                })
        }
    }

    const onRemove = () => {
        hideAlert()

        api.deleteModule(project.id, id)
            .then((res) => {
                setModules((prev) => prev.filter((item) => item.id !== id))
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
        setShort('')
        setCode('')
        setCredits(1)
    }

    const onLoadItem = (item) => {
        hideAlert()
        setId(item.id)
        setName(item.name)
        setShort(item.short)
        setCode(item.code)
        setCredits(item.credits)
    }

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Disciplinas</h3>
                <i className="text-secondary fa-solid fa-book"></i>
            </header>

            <div className="container-fluid">
                <div className="row gap-3 align-items-start">
                    <div className="col-sm-12 col-md-7 col-lg-8 p-0 py-1 card border-0 shadow-sm">
                        <div className="card-body">
                            <h6>Controle</h6>
                            <p className="text-secondary small">
                                Os professores, disciplinas e as localizações
                                são elementos globais. Insira estes elementos de
                                maneira apropriada.
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
                                <div className="row mb-3">
                                    {/* Name */}
                                    <div className="col">
                                        <label
                                            htmlFor="name-input"
                                            className="form-label"
                                        >
                                            Nome*
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

                                    {/* Short */}
                                    <div className="col-3">
                                        <label
                                            htmlFor="short-input"
                                            className="form-label"
                                        >
                                            Abrev.*
                                        </label>
                                        <input
                                            type="text"
                                            id="short-input"
                                            className="form-control"
                                            required={true}
                                            value={short}
                                            maxLength="20"
                                            onChange={(e) =>
                                                setShort(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    {/* Code */}
                                    <div className="col">
                                        <label
                                            htmlFor="code-input"
                                            className="form-label"
                                        >
                                            Código
                                        </label>
                                        <input
                                            type="text"
                                            id="code-input"
                                            className="form-control"
                                            required={false}
                                            value={code}
                                            onChange={(e) =>
                                                setCode(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Credits */}
                                    <div className="col-3">
                                        <label
                                            htmlFor="credits-input"
                                            className="form-label"
                                        >
                                            Créditos*
                                        </label>
                                        <input
                                            type="number"
                                            id="credits-input"
                                            className="form-control"
                                            required={true}
                                            value={credits}
                                            min={0}
                                            onChange={(e) =>
                                                setCredits(e.target.value)
                                            }
                                        />
                                    </div>
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

                    <div className="col p-0 py-1 card border-0 shadow-sm">
                        <div className="card-body">
                            <h6>Disciplinas</h6>
                            <p className="small text-muted">
                                Lista de Disciplinas
                            </p>

                            {modules.map((item) => (
                                <ModuleItem
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
