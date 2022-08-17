const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const {MangasListsModel} = require('../models/mangasListsModel');

router.get('/', (req, res) => {
    MangasListsModel.find((err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send("Error getting data : " + err);
    });
});

router.get('/:user_id', (req, res) => {
    if (!ObjectId.isValid(req.params.user_id))
        return res.status(400).send("User ID unknown : " + req.params.user_id);

    MangasListsModel.find(
        {user_id: req.params.user_id},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error getting data : " + err);
        });
});

router.get('/mangaID/:user_id', (req, res) => {
    if (!ObjectId.isValid(req.params.user_id))
        return res.status(400).send("User ID unknown : " + req.params.user_id);

    MangasListsModel.find(
        {user_id: req.params.user_id},
        (err, docs) => {
            if (!err) {
                let data = [];
                for (const doc of docs) {
                    data.push(doc.manga_id)
                }
                res.send(data);
            }
            else return res.status(500).send("Error getting data : " + err);
        });
});

router.post('/', (req, res) => {
    const newRecord = new MangasListsModel({
        user_id: req.body.user_id,
        manga_id: req.body.manga_id,
        manga_name: req.body.manga_name,
        current_chapter_link: req.body.current_chapter_link,
        current_chapter: req.body.current_chapter,
        is_read: req.body.is_read,
        status_id: req.body.status_id
    });

    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send("Error creating data : " + err);
    })
});

router.put('/current/:user_id', (req, res) => {
    if (!ObjectId.isValid(req.params.user_id))
        return res.status(400).send("User ID unknown : " + req.params.user_id)
    if (!ObjectId.isValid(req.body.manga_id))
        return res.status(400).send("Manga ID unknown : " + req.body.manga_id)

    const updateRecord = {
        current_chapter_link: req.body.current_chapter_link,
        current_chapter: req.body.current_chapter,
        is_read: req.body.is_read
    };

    MangasListsModel.findOneAndUpdate(
        {
            user_id: req.params.user_id,
            manga_id: req.body.manga_id
        },
        {$set: updateRecord},
        {new: false},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error updating data : " + err);
        }
    )
});

router.put('/read/:user_id', (req, res) => {
    if (!ObjectId.isValid(req.params.user_id))
        return res.status(400).send("User ID unknown : " + req.params.user_id)
    if (!ObjectId.isValid(req.body.manga_id))
        return res.status(400).send("Manga ID unknown : " + req.body.manga_id)

    const updateRecord = {
        is_read: req.body.is_read
    };

    MangasListsModel.findOneAndUpdate(
        {
            user_id: req.params.user_id,
            manga_id: req.body.manga_id
        },
        {$set: updateRecord},
        {new: false},
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Error updating data : " + err);
        }
    )
});

router.put('/status/:user_id', (req, res) => {
    if (!ObjectId.isValid(req.params.user_id))
        return res.status(400).send("User ID unknown : " + req.params.user_id)
    if (!ObjectId.isValid(req.body.manga_id))
        return res.status(400).send("Manga ID unknown : " + req.body.manga_id)

    const updateRecord = {
        status_id: req.body.status_id
    };

    MangasListsModel.findOneAndUpdate(
        {
            user_id: req.params.user_id,
            manga_id: req.body.manga_id
        },
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
        return res.status(400).send("User ID unknown : " + user_id)

    MangasListsModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else return res.status(500).send("Delete error : " + err);
        }
    );
});

module.exports = router;