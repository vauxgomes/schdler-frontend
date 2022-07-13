import React, { useState } from 'react'

export default function BlockBuilder({ professors, modules, onSubmit }) {
    const [professor, setProfessor] = useState('')
    const [module_, setModule] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(professor, module_)
    }

    return (
        <div className="block-grid-form edit card p-1">
            <div className="card-body p-2 ">
                <h6>Bloco</h6>
                <p className="text-secondary small">
                    Os blocos são pares únicos de Professor-Disciplina e estão
                    relacionados a algum Projeto.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <small className="text-secondary">Disciplina</small>
                        <select
                            className="form-select form-select"
                            value={module_}
                            onChange={(e) => setModule(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {modules &&
                                modules.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <small className="text-secondary">Professor</small>
                        <select
                            className="form-select form-select"
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {professors &&
                                professors.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                                setProfessor('')
                                setModule('')
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
