const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the projects and actions API"});
});

module.exports = server;