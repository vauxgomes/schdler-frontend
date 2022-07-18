import React from 'react'

export const shifts = {
    morning: { name: 'Manhã', color: '' },
    daytime: { name: 'Diúrno', color: '' },
    afternoon: { name: 'Tarde', color: '' },
    night: { name: 'Noite', color: '' }
}

export default function ShiftSelector({ required, shift, setShift }) {
    return (
        <select
            className="form-select"
            value={shift}
            required={required}
            onChange={(e) => setShift(e.target.value)}
        >
            <option value="" disabled={true}>
                Selecione
            </option>

            {Object.keys(shifts).map((k, index) => (
                <option value={k} key={index}>
                    {shifts[k].name}
                </option>
            ))}
        </select>
    )
}
