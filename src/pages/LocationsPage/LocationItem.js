import React from 'react'

export default function LocationItem({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="item d-flex align-items-center justify-content-between gap-3 p-2 border-top"
        >
            <div
                className="item-icon"
                style={{
                    backgroundColor: item.color
                }}
            >
                <i className="text-white fa-solid fa-location-dot"></i>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-3 w-100">
                <strong className="d-block w-100">{item.name}</strong>
                <small className="badge bg-primary">{item.capacity}</small>

                <button className="btn py-0 px-0">
                    <i className="fas fa-ellipsis-v mt-1"></i>
                </button>
            </div>
        </div>
    )
}
