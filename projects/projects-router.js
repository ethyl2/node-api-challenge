const express = require('express');
const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: "Unable to retreive projects"});
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(response => {
            console.log(response);
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({message: `The project with id ${id} may not exist in the database`});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `The project with id ${id} could not be retrieved.`});
        });
});

router.post('/', (req, res) => {
   const newProject = req.body;
   if (!newProject.name || !newProject.description) {
       res.status(400).json({error: "Please provide name and description for the project."});
   } 
   db.insert(newProject)
    .then(response => {
        console.log(response);
        res.status(201).json(response);

        })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "There was an error while adding the new project to the database", error: err});
    });

});

module.exports = router;
