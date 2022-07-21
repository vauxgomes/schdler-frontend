import React from 'react'

export default function ProjectItem({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="item d-flex align-items-center justify-content-between gap-2 p-2 border-top"
        >
            <div className="item-icon">
                <i className="text-white fas fa-pencil-ruler"></i>
            </div>

            <div className="w-100">
                <strong>{item.name}</strong>
            </div>
            
            <i className="fas fa-ellipsis-v mt-1"></i>
        </div>
    )
}
