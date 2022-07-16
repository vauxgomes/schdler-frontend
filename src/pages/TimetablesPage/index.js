// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { forwardRef, useContext, useEffect, useState } from 'react'

import Alert, { AlertTypes } from '../../components/Alert'
import ShiftSelector from '../../components/ShiftSelector'
import TimetableItem from './TimetableItem'

import { Context } from '../../providers/contexts/context'
import api from '../../providers/services/api'

export default function TimetablesPage() {
    const [id, setId] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [timetables, setTimetables] = useState([])

    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const refShiftSelector = React.createRef()

    const { token, project, setLoading } = useContext(Context)

    useEffect(() => {
        setLoading(true)

        api.setToken(token)
        api.getTimetables(project.id)
            .then((res) => {
                setTimetables(res)
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

        console.log(refShiftSelector)
    }

    const onRemove = () => {
        hideAlert()

        api.deleteLocation(id)
            .then((res) => {
                setTimetables((prev) => prev.filter((item) => item.id !== id))
            })
            .catch((err) => {
                showAlert(err.response.data.message)
            })

        onReset()
    }

    const onReset = () => {
        hideAlert()
        setId('')
        setStart('')
        setEnd('')
        refShiftSelector.current?.setShift('')
    }

    const onLoadItem = (item) => {
        hideAlert()
        setId(item.id)
        setStart(item.name)
        setEnd(item.end)
        refShiftSelector.current?.setShift(item.shift)
    }

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Períodos</h3>
                <i className="text-secondary fa-solid fa-location-dot"></i>
            </header>

            <div className="container-fluid">
                <div className="row gap-3 align-items-start">
                    <div className="col-sm-12 col-md-7 col-lg-8 p-0 py-1 card border-0 shadow-sm">
                        <div className="card-body">
                            <h6>Controle</h6>
                            <p className="text-secondary small">
                                Os períodos são intervalos de tempos associados
                                a um dos turnos (matutino, vespertino, noturno
                                ou diúrno).
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
                                    <ShiftSelector ref={refShiftSelector} />

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
                                        // required={true}
                                        value={start}
                                        onChange={(e) =>
                                            setStart(e.target.value)
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
                            <h6>Períodos</h6>
                            <p className="small text-muted">
                                Lista de Períodos
                            </p>

                            {timetables.map((item) => (
                                <TimetableItem
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
