import React, { useContext, useState } from 'react'
import { Context } from '../../providers/context'
import './style.css'

export default function LoadBar() {
    const { isLoading } = useContext(Context)

    return (
        <div className={`progress-container ${isLoading && 'show'}`}>
            <div className="progress-bar"></div>
        </div>
    )
}
