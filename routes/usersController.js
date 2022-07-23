const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const {UsersModel} = require('../models/usersModel');

router.get('/', (req, res) => {
    UsersModel.find((err, docs) => {
        let id = [];
        for (const doc of docs) {
            id.push(doc._id);
        }
        if (!err) res.send(id);
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.get('/:pseudonym', (req, res) => {
    UsersModel.findOne(
        {pseudonym: req.params.pseudonym},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error getting data : " + err);
        });
});

router.post('/', (req, res) => {
    const newRecord = new UsersModel({
        pseudonym: req.body.pseudonym,
        password: req.body.password,
        status: req.body.status
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
        pseudonym: req.body.pseudonym,
        password: req.body.password,
        status: req.body.status
    };

    UsersModel.findByIdAndUpdate(
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

    UsersModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Delete error : " + err);
        }
    );
});

module.exports = router;