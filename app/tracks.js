const express = require('express');

const Track = require('../models/Track');
const Artist = require('../models/Artist');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.album) {
        const tracksByAlbum = await Track.find({album: req.query.album});
        console.log(tracksByAlbum);
        return res.send(tracksByAlbum);
    } else {
        const tracks = await Track.find();
        return res.send(tracks);
    }
});

router.post('/', async (req, res) => {
    const trackData = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration
    };

    const track = new Track(trackData);

    try {
        await track.save();

        return res.send(track);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;