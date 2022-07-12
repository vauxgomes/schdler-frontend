import React from 'react'
import './style.css'

export default function Item({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="d-flex align-items-start justify-content-start gap-3 py-3 px-3 border-top item"
        >
            <i className="text-secondary mt-1 fa-solid fa-book"></i>

            <div className="d-flex align-items-start  justify-content-between gap-3 w-100">
                <div className="d-flex flex-column">
                    <strong>{item.name}</strong>
                    <div className="text-secondary">
                        <small>Créditos:</small>{' '}
                        <small className="badge bg-secondary">
                            {item.credits}
                        </small>
                    </div>
                </div>

                <button className="btn py-0 px-0">
                    <i className="fas fa-ellipsis-v mt-1"></i>
                </button>
            </div>
        </div>
    )
}
