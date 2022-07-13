import React from 'react'
import './style.css'

export default function BoardsPage() {
    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Quadros</h3>
                <i className="text-secondary fa-solid fa-table-cells-large"></i>
            </header>

            <div className="boards-page">
                <div className="boards-container">
                    <div className="board shadow-sm">
                        <div className="board-header">
                            <div className="description">
                                <small>Noite</small>
                                <h5>Semestre 1</h5>
                            </div>

                            <div className="menu">
                                <i
                                    className="fas fa-ellipsis-v"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </div>

                        <div className="slots">
                            <div className="slot"></div>
                            <div className="slot">
                                <div id="2" class="block" draggable="true">
                                    <small>Nome Sobrenome</small>
                                    <span>Lógica de Programação</span>
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

                    <div className="board shadow-sm">
                        <div className="board-header">
                            <div className="description">
                                <small>Noite</small>
                                <h5>Semestre 1</h5>
                            </div>

                            <div className="menu">
                                <i
                                    className="fas fa-ellipsis-v"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </div>

                        <div className="slots">
                            <div className="slot"></div>
                            <div className="slot">
                                <div id="2" class="block" draggable="true">
                                    <small>Nome Sobrenome</small>
                                    <span>Lógica de Programação</span>
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

                    <div className="board shadow-sm">
                        <div className="board-header">
                            <div className="description">
                                <small>Noite</small>
                                <h5>Semestre 1</h5>
                            </div>

                            <div className="menu">
                                <i
                                    className="fas fa-ellipsis-v"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </div>

                        <div className="slots">
                            <div className="slot"></div>
                            <div className="slot">
                                <div id="2" class="block" draggable="true">
                                    <small>Nome Sobrenome</small>
                                    <span>Lógica de Programação</span>
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

                    <div className="board shadow-sm">
                        <div className="board-header">
                            <div className="description">
                                <small>Noite</small>
                                <h5>Semestre 1</h5>
                            </div>

                            <div className="menu">
                                <i
                                    className="fas fa-ellipsis-v"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </div>

                        <div className="slots">
                            <div className="slot"></div>
                            <div className="slot">
                                <div id="2" class="block" draggable="true">
                                    <small>Nome Sobrenome</small>
                                    <span>Lógica de Programação</span>
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
                </div>

                <div className="tools-container sticky">Tools</div>
            </div>
        </>
    )
}
