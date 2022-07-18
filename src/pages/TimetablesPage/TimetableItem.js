import React from 'react'
import { shifts } from '../../components/ShiftSelector'

export default function TimetableItem({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className="item d-flex align-items-center justify-content-start gap-2 p-2 border-top"
        >
            <div className="item-icon">
                <i className="text-white far fa-clock"></i>
            </div>

            <div className="d-flex flex-column w-100">
                <strong>{shifts[item.shift].name}</strong>
                <small>
                    {item.start.slice(0, 5)} - {item.end.slice(0, 5)}
                </small>
            </div>

            <i className="fas fa-ellipsis-v mt-1"></i>
        </div>
    )
}
