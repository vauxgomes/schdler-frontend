import React from 'react'

import './style.css'

const colors = [
    '#f94144',
    '#f3722c',
    '#f8961e',
    '#f9c74f',
    '#90be6d',

    '#43aa8b',
    '#4d908e',
    '#577590',
    '#277da1',
    '#001219',

    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',

    '#f72585',
    '#b5179e',
    '#7209b7',
    '#3a0ca3',
    '#3f37c9',

    '#4361ee',
    '#4895ef',
    '#4cc9f0',
    '#8d99ae',
    '#03071e'
]

export default function ColorSelector({
    color = colors[0],
    setColor,
    required
}) {
    return (
        <div className="color-container">
            <ColorItem color={color} />

            <div className="color-grid">
                {colors.map((color, key) => (
                    <ColorItem
                        color={color}
                        key={key}
                        required={required}
                        onClick={() => setColor(color)}
                    />
                ))}
            </div>
        </div>
    )
}

function ColorItem({ color, onClick }) {
    return (
        <div
            className="color-item"
            style={{ backgroundColor: color }}
            onClick={onClick}
        ></div>
    )
}
