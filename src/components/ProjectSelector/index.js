import React, { useContext, useEffect } from 'react'
import { Context } from '../../providers/contexts/context'

export default function ProjectSelector({ ref, className }) {
    const { project, setProject, projects } = useContext(Context)

    const onChangeProject = (e) => {
        const idx = projects.findIndex(
            (item) => item.id === Number(e.target.value)
        )

        setProject(projects[idx])
    }

    return (
        <select
            value={project?.id || ''}
            onChange={onChangeProject}
            className={`form-select align-self-center ${className}`}
        >
            <option value="" disabled>
                Selecione um Projeto
            </option>

            {projects.map((item) => (
                <option value={item.id} key={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    )
}
