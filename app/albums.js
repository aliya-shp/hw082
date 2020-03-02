const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    let artist = req.query.artist;
    console.log(artist);

    let albums;

    if (artist) {
        albums = await Album.findById(artist).populate('artist');
        console.log(albums);
    } else {
        albums = await Album.find();
        console.log(albums);
    }

    return res.send(albums);
});


router.post('/', upload.single('image'), async (req, res) => {
    const albumData = {
        title: req.body.title,
        artist: req.body.artist,
        issueDate: req.body.issueDate
    };

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);

    try {
        await album.save();

        return res.send({id: album._id});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;