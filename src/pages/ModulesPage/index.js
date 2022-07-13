// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'
import Alert, { AlertTypes } from '../../components/Alert'
import Item from './Item'

import { Context } from '../../providers/context'
import api from '../../services/api'

export default function ProfessorsPage() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [credits, setCredits] = useState(20)
    const [items, setItems] = useState([])

    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const { token, setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)

        api.setToken(token)
        api.getModules()
            .then((res) => {
                setItems(res)
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
            api.postModule(name, credits)
                .then((res) => {
                    const item = {
                        name,
                        credits,
                        id: res.data.id
                    }

                    setItems((prev) => [...prev, item])
                })
                .catch((err) => {
                    showAlert(err.response.data.message)
                })
        } else {
            // PUT
            api.putModule(id, name, credits)
                .then((res) => {
                    setItems(
                        items.map((item) =>
                            item.id === id ? { ...item, name, credits } : item
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

        api.deleteModule(id)
            .then((res) => {
                setItems((prev) => prev.filter((item) => item.id !== id))
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
        setCredits(20)
    }

    const onLoadItem = (item) => {
        hideAlert()
        setId(item.id)
        setName(item.name)
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

                                {/* Credits */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="credits-input"
                                        className="form-label"
                                    >
                                        Creditos
                                    </label>
                                    <input
                                        type="number"
                                        id="credits-input"
                                        className="form-control"
                                        required={true}
                                        value={credits}
                                        onChange={(e) =>
                                            setCredits(e.target.value)
                                        }
                                        min={0}
                                        step={10}
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

                    <div className="col p-0 py-1 card border-0 shadow-sm">
                        <div className="card-body">
                            <h6>Disciplinas</h6>
                            <p className="small text-muted">
                                Lista de Disciplinas
                            </p>

                            {items.map((item) => (
                                <Item
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
