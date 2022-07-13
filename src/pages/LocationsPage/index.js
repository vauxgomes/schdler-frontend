// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'
import Alert, { AlertTypes } from '../../components/Alert'
import Item from './Item'

import { Context } from '../../providers/context'
import api from '../../services/api'

export default function LocationsPage() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [items, setItems] = useState([])

    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const { token } = useContext(Context)

    useEffect(() => {
        api.setToken(token)
        api.getLocations()
            .then((res) => {
                setItems(res)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }, [token])

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
            api.postLocation(name)
                .then((res) => {
                    const item = {
                        name,
                        id: res.data.id,
                        created_at: '--'
                    }

                    setItems((prev) => [...prev, item])
                })
                .catch((err) => {
                    showAlert(err.response.data.message)
                })
        } else {
            // PUT
            api.putLocation(id, name)
                .then((res) => {
                    setItems(
                        items.map((item) =>
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

        api.deleteLocation(id)
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
    }

    const onLoadItem = (item) => {
        hideAlert()
        setId(item.id)
        setName(item.name)
    }

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Localizações</h3>
                <i className="text-primary fa-solid fa-location-dot"></i>
            </header>

            <div className="container">
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
                            <h6>Localizações</h6>
                            <p className="small text-muted">
                                Lista de Localizações
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
