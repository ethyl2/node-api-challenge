const express = require('express');
const server = express();

const projectsRouter = require('../projects/projects-router.js');

server.use(express.json());

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the projects and actions API"});
});


module.exports = server;