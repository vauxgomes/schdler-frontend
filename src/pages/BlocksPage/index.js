// https://dribbble.com/shots/16083913-Account-Settings-Template-Webpixels

import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'

import { Context } from '../../providers/context'
import api from '../../services/api'
import ItemForm from './ItemForm'

export default function BlocksPage() {
    const [items, setItems] = useState([])
    const { token, project } = useContext(Context)

    useEffect(() => {
        api.setToken(token)
        api.getBlocks(project.id)
            .then((res) => {
                setItems(res)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }, [token])

    return (
        <>
            <header className="d-flex justify-content-between align-items-center mb-3">
                <h3>Blocos</h3>
                <i className="text-secondary fa-solid fa-object-group"></i>
            </header>

            <div className="container">
                <div className="row mb-2">
                    <div className="col-12 p-1">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <ItemForm />

                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    )
}
