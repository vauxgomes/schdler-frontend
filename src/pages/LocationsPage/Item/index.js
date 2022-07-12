import React from 'react'
import './style.css'

export default function Item({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="d-flex align-items-start justify-content-start gap-3 py-3 px-3 border-top item"
        >
            <i className="text-secondary mt-1 fa-solid fa-location-dot"></i>

            <div className="d-flex align-items-start  justify-content-between gap-3 w-100">
                <strong>{item.name}</strong>
                <button className="btn py-0 px-0">
                    <i className="fas fa-ellipsis-v mt-1"></i>
                </button>
            </div>
        </div>
    )
}
