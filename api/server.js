const express = require('express');
const cors = require('cors');
const server = express();

const projectsRouter = require('../projects/projects-router.js');
const actionsRouter = require('../actions/actions-router.js');

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the projects and actions API"});
});


module.exports = server;