import React, { useContext, useState } from 'react'
import Alert, { AlertTypes } from '../../components/Alert'

import { Context } from '../../providers/context'

import api from '../../services/api'
import logo from '../../assets/img/logo64.png'
import './style.css'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [alertStatus, setAlertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const { setToken } = useContext(Context)

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

        api.login(username, password)
            .then((res) => {
                if (res.success) {
                    setToken(res.token)
                } else {
                    showAlert(res.message)
                }
            })
            .catch((err) => {
                showAlert(err.response.data.message)
            })
    }

    return (
        <div id="login">
            <div className="wrapper">
                {/* Alert */}
                {alertStatus && (
                    <Alert type={AlertTypes.DANGER} onClose={hideAlert}>
                        {alertMessage}
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={onSubmit}>
                    {/* Header */}
                    <header className="text-center mb-4">
                        <img
                            src={logo}
                            alt="logo"
                            className="p-2 mb-2 border rounded-circle"
                        />

                        <h2>Schdler</h2>
                        <p className="text-muted">
                            Sistema de horários que o Vaux fez
                        </p>
                    </header>

                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username-input" className="form-label">
                            Login
                        </label>
                        <input
                            type="text"
                            id="username-input"
                            className="form-control"
                            required={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password-input" className="form-label">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password-input"
                            className="form-control"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Remember me */}
                    <div className="mb-4 form-check">
                        <input
                            type="checkbox"
                            id="remember-checkbox"
                            className="form-check-input"
                        />
                        <label
                            htmlFor="remember-checkbox"
                            className="form-check-label"
                        >
                            Lembrar de mim!
                        </label>
                    </div>

                    {/* Buttons */}
                    <button type="submit" className="btn btn-primary">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
