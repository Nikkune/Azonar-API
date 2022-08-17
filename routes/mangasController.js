const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const {MangasModel} = require('../models/mangasModel');

router.get('/', (req, res) => {
    MangasModel.find((err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.get('/viaID/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    MangasModel.findById(
        req.params.id,
        (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.get('/genres', (req, res) => {
    MangasModel.find((err, docs) => {
        let genres = [];
        for (const doc of docs) {
            for (const genre of doc.genres) {
                if (!genres.includes(genre))
                    genres.push(genre);
            }
        }
        genres.sort((a, b) => a.localeCompare(b));
        if (!err) res.send(genres);
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.get('/last', (req, res) => {
    MangasModel.find((err, docs) => {
        if (!err) res.send(docs.sort((a, b) => new Date(b.last_update) - new Date(a.last_update)).slice(0,6));
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.post('/', (req, res) => {
    const newRecord = new MangasModel({
        name: req.body.name,
        synopsis: req.body.synopsis,
        genres: req.body.genres,
        type_id: req.body.type_id,
        chapter_number: req.body.chapter_number,
        site_id: req.body.site_id,
        site_link: req.body.site_link,
        cover_link: req.body.cover_link
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
        synopsis: req.body.synopsis,
        genres: req.body.genres,
        type_id: req.body.type_id,
        chapter_number: req.body.chapter_number,
        site_id: req.body.site_id,
        site_link: req.body.site_link,
        cover_link: req.body.cover_link,
        last_update: new Date()
    };

    MangasModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new: false},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error updating data : " + err);
        }
    )
});

router.put('/chapter/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    const updateRecord = {
        chapter_number: req.body.chapter_number,
        site_id: req.body.site_id,
        site_link: req.body.site_link,
        last_update: new Date()
    };

    MangasModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new: false},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error updating chapter data : " + err);
        }
    )
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    MangasModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Delete error : " + err);
        }
    );
});

module.exports = router;