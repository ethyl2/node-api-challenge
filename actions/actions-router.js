const express = require('express');
const db = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: "Unable to retreive actions"});
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
                res.status(404).json({message: `The action with id ${id} may not exist in the database`});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `The action with id ${id} could not be retrieved.`});
        });
});

router.post('/', validateActionBody, (req, res) => {
    const newAction = req.body; 
    db.insert(newAction)
        .then(response => {
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "There was an error while adding the new action to the database", error: err});
        });
 });


function validateActionBody(req, res, next) {
    const newAction = req.body;
    if (!newAction.project_id) {
        res.status(400).json({error: "Please provide project_id for the action."});
    } else if (!newAction.description) {
        res.status(400).json({error: "Please provide a description for the action."});
    } else if (!newAction.notes) {
        res.status(400).json({error: "Please provide a notes object for the action."})
    }
    projectDb.get(newAction.project_id)
        .then(response => {
            console.log(response);
            if (response) {
               next();
            } else {
                res.status(404).json({message: `The project with id ${newAction.project_id} may not exist in the database`});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: `The project with id ${newAction.project_id} could not be retrieved.`});
        });
};

module.exports = router;