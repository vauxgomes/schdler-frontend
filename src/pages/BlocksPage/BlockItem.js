import React from 'react'

export default function Item({ item, onClick }) {
    return (
        <div className="block-grid-item card border-0 shadow-sm p-1">
            <div className="card-body d-flex flex-column p-2 position-relative">
                <small className="text-secondary">Disciplina</small>
                <strong className="text-truncate pb-1 mb-1 border-bottom">
                    {item.module_name}
                </strong>

                <small className="text-secondary">Professor</small>
                <strong className="text-truncate">{item.professor_name}</strong>

                <button
                    className="btn btn-sm btn-secondary position-absolute top-0 end-0"
                    onClick={onClick}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    )
}
