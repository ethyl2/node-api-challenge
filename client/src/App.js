import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Route, Link } from 'react-router-dom';

import Project from './components/Project';

function App() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        console.log(response);
        setProjects(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Projects and Actions
        </h1>
      </header>

    <Route exact path='/projects/:id' render={(props) => <Project {...props} projects={projects} />} />

      {projects && projects.map(project => {
        return (
          <div key={project.id}>
            <Link to={`/projects/${project.id}`}>
              {project.name}
            </Link>
          </div>
        )
      })}

    </div>
  );
}

export default App;

//<Project project={project} />