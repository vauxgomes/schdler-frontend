import React from 'react'
import './style.css'

export default function Item({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="d-flex align-items-start justify-content-start gap-3 py-3 px-3 border-top professor-item"
        >
            <i className="text-secondary mt-1 fas fa-user-alt"></i>

            <div className="d-flex align-items-start  justify-content-between gap-3 w-100">
                <div className="d-flex flex-column">
                    <strong>{item.name}</strong>
                    <small className="text-secondary">{item.created_at}</small>
                </div>

                <button className="btn py-0 px-0">
                    <i className="fas fa-ellipsis-v mt-1"></i>
                </button>
            </div>
        </div>
    )
}
