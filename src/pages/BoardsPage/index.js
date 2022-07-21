import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../../providers/contexts/context'
import api from '../../providers/services/api'

import './style.css'

export default function BoardsPage() {
    const { token, project, setLoading } = useContext(Context)

    const [boards, setBoards] = useState([])
    const [blocks, setBlocks] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setLoading(true)
        api.setToken(token)
        Promise.all([
            api
                .getBlocks(project.id)
                .then((res) => setBlocks(res))
                .catch((err) => console.log(err.response.data.message)),
            api
                .getBoards(project.id)
                .then((res) => setBoards(res))
                .catch((err) => console.log(err.response.data.message))
        ]).then(() => setLoading(false))
    }, [token, project, setLoading])

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Quadros</h3>
                <i className="text-secondary fa-solid fa-table-cells-large"></i>
            </header>

            <div className="boards-page">
                <div className="boards-container">
                    {boards.map((board, key) => (
                        <Board board={board} key={key} />
                    ))}

                    {boards.length === 0 && (
                        <p className="text-muted">
                            Adicione um quadro no botão{' '}
                            <i className="text-primary fa-solid fa-circle-plus"></i>
                        </p>
                    )}
                </div>

                <div className="tools-container shadow-sm">
                    <header className="d-flex align-items-center justify-content-between pb-3 border-bottom">
                        <h6 className="m-0">Controle</h6>
                        <button className="btn btn-sm btn-primary">
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </header>

                    {/* Search */}
                    <div className="">
                        <input
                            type="text"
                            placeholder="Pesquisa"
                            id="filter-input"
                            className="form-control form-control-sm w-100"
                            value={search}
                            onChange={(e) => setSearch(e.target.value.trim())}
                            onKeyUp={(e) => e.key === 'Escape' && setSearch('')}
                        />
                        <span className="form-text">
                            Busque por nome de disciplina ou professor
                        </span>
                    </div>

                    {/* Buttons */}
                    <div></div>

                    {/* Modules */}
                    <fieldset className="modules-container">
                        <legend>Disciplinas</legend>
                        {blocks
                            .filter(
                                (item) =>
                                    item.professor_name
                                        .toLowerCase()
                                        .includes(search) ||
                                    item.module_name
                                        .toLowerCase()
                                        .includes(search)
                            )
                            .map((block, key) => (
                                <Block block={block} key={key} />
                            ))}
                    </fieldset>
                </div>
            </div>
        </>
    )
}

function Block({ block }) {
    return (
        <div id={block.id} className="block w-100" draggable="true">
            <span className="module text-truncate">{block.module_name}</span>
            <span className="professor text-truncate">
                {block.professor_name}
            </span>
            <i className="grip fas fa-grip-lines fa-sm"></i>
        </div>
    )
}

function Board({ board }) {
    return (
        <div className="board shadow-sm">
            <div className="board-header">
                <div className="description">
                    <small>Noite</small>
                    <h6>Semestre 1</h6>
                </div>

                <div className="menu">
                    <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                </div>
            </div>

            <div className="slots">
                <div className="slot"></div>
                <div className="slot">
                    <div id="2" className="block" draggable="true">
                        <span className="module">Lógica de Programação</span>
                        <span className="professor">Vaux Gomes</span>
                        <i className="grip fas fa-grip-lines"></i>
                    </div>
                </div>
                <div className="slot"></div>
                <div className="slot"></div>
                <div className="slot"></div>
                <div className="slot"></div>
                <div className="slot"></div>
                <div className="slot"></div>
                <div className="slot"></div>
                <div className="slot"></div>
            </div>
        </div>
    )
}
