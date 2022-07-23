const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const {BotsModel} = require('../models/botsModel');

router.get('/', (req, res) => {
    BotsModel.find((err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.post('/', (req, res) => {
    const newRecord = new BotsModel({
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        icon: req.body.icon,
        status: req.body.status,
        progress: req.body.progress
    });

    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send("Error creating data : " + err);
    })
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    const updateRecord = {
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        icon: req.body.icon,
        status: req.body.status,
        progress: req.body.progress
    };

    BotsModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new: false},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error updating data : " + err);
        }
    )
});

router.put('/progressAndStatus/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    const updateRecord = {
        status: req.body.status,
        progress: req.body.progress
    };

    BotsModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new: false},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error updating data : " + err);
        }
    )
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    BotsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Delete error : " + err);
        }
    );
});

module.exports = router;