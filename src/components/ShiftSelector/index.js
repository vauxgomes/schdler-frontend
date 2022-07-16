import React, { useState } from 'react'

const ShiftSelector = React.forwardRef((props, ref) => {
    const [shift, setShift] = useState('')

    const getShift = () => {
        return shift
    }

    return (
        <select
            className="form-select"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
        >
            <option value="" disabled={true}>
                Selecione
            </option>

            <option value={'morning'}>Manhã</option>
            <option value={'daytime'}>Diúrno</option>
            <option value={'afternoon'}>Tarde</option>
            <option value={'night'}>Noite</option>
        </select>
    )
})

export default ShiftSelector
