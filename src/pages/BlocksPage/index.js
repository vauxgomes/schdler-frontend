// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'

import { Context } from '../../providers/context'
import api from '../../services/api'
import BlockBuilder from './BlockBuilder'

import './style.css'

export default function BlocksPage() {
    const { token, project, setLoading } = useContext(Context)

    const [professors, setProfessors] = useState([])
    const [modules, setModules] = useState([])
    const [blocks, setBlocks] = useState([])

    const [search, setSearch] = useState('')

    useEffect(() => {
        setLoading(true)
        api.setToken(token)

        Promise.all([
            api.getProfessors().then((res) => setProfessors(res)),
            api.getModules().then((res) => setModules(res)),
            api
                .getBlocks(project.id)
                .then((res) => setBlocks(res))
                .catch((err) => console.log(err.response.data.message))
        ]).then(() => setLoading(false))
    }, [token, project, setLoading])

    const handleSubmit = (professor_id, module_id) => {
        api.postBlock(project.id, professor_id, module_id).then((res) => {
            const professor = professors.find(
                (item) => item.id === Number(professor_id)
            )

            const module_ = modules.find(
                (item) => item.id === Number(module_id)
            )

            const block = {
                id: res.data.id,
                professor_id,
                professor_name: professor.name,
                module_id,
                module_name: module_.name
            }

            setBlocks((prev) => [block, ...prev])
        })
    }

    const handleRemove = (id) => {
        api.deleteBlock(project.id, id)
            .then(() =>
                setBlocks((prev) =>
                    prev.filter((block) => block.id !== Number(id))
                )
            )
            .catch((err) => console.log(err.response.data.message))
    }

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Blocos</h3>
                <i className="text-secondary fa-solid fa-object-group"></i>
            </header>

            <div className="blocks-grid">
                <div className="blocks-search-bar bg-white p-3 rounded shadow-sm">
                    <div className="input-group">
                        <label
                            className="input-group-text bg-light"
                            htmlFor="filter-input"
                        >
                            <i className="text-secondary fas fa-filter"></i>
                        </label>
                        <input
                            type="text"
                            id="filter-input"
                            className="form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value.trim())}
                            onKeyUp={(e) => e.key === 'Escape' && setSearch('')}
                        />
                    </div>
                </div>

                {/* Builder */}
                <BlockBuilder
                    professors={professors}
                    modules={modules}
                    onSubmit={handleSubmit}
                />

                {/* Items */}
                {blocks
                    .filter(
                        (item) =>
                            item.professor_name
                                .toLowerCase()
                                .includes(search) ||
                            item.module_name.toLowerCase().includes(search)
                    )
                    .map((item) => (
                        <Item
                            item={item}
                            key={item.id}
                            onClick={() => handleRemove(item.id)}
                        />
                    ))}
            </div>
        </>
    )
}
