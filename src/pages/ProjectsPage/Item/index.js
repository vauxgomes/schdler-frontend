import React from 'react'
import './style.css'

export default function Item({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="d-flex align-items-start justify-content-start gap-3 py-3 px-3 border-top item"
        >
            <i className="text-secondary mt-1 fas fa-project-diagram"></i>

            <div className="d-flex align-items-start  justify-content-between gap-3 w-100">
                <strong>{item.name}</strong>
                <i className="fas fa-ellipsis-v mt-1"></i>
            </div>
        </div>
    )
}
