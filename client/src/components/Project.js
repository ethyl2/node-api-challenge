import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = props => {
    const [actions, setActions] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${props.project.id}/actions`)
            .then(response => {
                console.log(response);
                setActions(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2>{props.project.name}</h2>
            <p>Description: {props.project.description}</p>
            <p>{props.project.completed? 'Completed': 'Not Completed'}</p>
            {actions && actions.map(action => {
                return (
                    <div key={action.id}>
                        <h3>{action.description}</h3>
                        <p>Notes: {action.notes}</p>
                        <p>{action.completed? 'Completed': 'Not Completed'}</p>
                    </div>
                )
            })}
            <hr />
          </div>
    )
}

export default Project;