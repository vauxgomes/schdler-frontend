import React, { useContext } from 'react'
import { Context } from '../../providers/contexts/context'
import './style.css'

export default function LoadBar() {
    const { isLoading } = useContext(Context)

    return (
        <div className={`progress-container ${isLoading && 'show'}`}>
            <div className="progress-bar"></div>
        </div>
    )
}
