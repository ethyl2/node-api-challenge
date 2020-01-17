const express = require('express');
const db = require('../data/helpers/actionModel.js');

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

module.exports = router;