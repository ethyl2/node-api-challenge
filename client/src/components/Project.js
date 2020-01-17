import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = props => {
    const [project, setProject] = useState(null);
    const [actions, setActions] = useState(null);
    const id = props.match.params;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${id.id}`)
            .then(response => {
                console.log(response);
                setProject(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const displayActions = () => {
        axios.get(`http://localhost:5000/api/projects/${project.id}/actions`)
            .then(response => {
                console.log(response);
                setActions(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            {project &&
                <div> 
                <h2>{project.name}</h2>
                <p>Description: {project.description}</p>
                <p>{project.completed? 'Completed': 'Not Completed'}</p>
                <button onClick={displayActions}>Get Actions</button>
                </div>
                
            } 
            {actions && actions.map(action => {
                    return (
                        <div key={action.id}>
                            <h3>{action.description}</h3>
                            <p>Notes: {action.notes}</p>
                            <p>{action.completed? 'Completed': 'Not Completed'}</p>
                        </div>
                    )
                }
                )
            }  
          </div>
    )
}

export default Project;