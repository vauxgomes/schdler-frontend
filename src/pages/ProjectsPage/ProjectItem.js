import React from 'react'

export default function Item({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="item d-flex align-items-center justify-content-between gap-2 p-2 border-top"
        >
            <div className="item-icon">
                <i className="text-white fas fa-project-diagram"></i>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-3 w-100">
                <strong>{item.name}</strong>
                <i className="fas fa-ellipsis-v mt-1"></i>
            </div>
        </div>
    )
}
