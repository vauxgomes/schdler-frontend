import React from 'react'
import './style.css'

export default function Alert({ children, type, onClose }) {
    return (
        <div className={`alert alert-${type}`}>
            <div>{children}</div>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={onClose}
            ></button>
        </div>
    )
}

export const AlertTypes = {
    DANGER: 'danger',
    WARNING: 'warning',
    SUCCESS: 'success'
}
