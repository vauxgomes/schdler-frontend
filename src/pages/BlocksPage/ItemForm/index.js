import React from 'react'
import './style.css'

export default function ItemForm() {
    return (
        <div className="col-md-6 col-lg-4 p-1">
            <div className="item-empty rounded h-100">
                <div className="card-body d-flex align-items-center justify-content-center gap-2 h-100 text-secondary p-3">
                    <i className="fa-lg fas fa-plus-circle"></i>
                    <span>Adicionar</span>
                </div>
            </div>
        </div>
    )
}
