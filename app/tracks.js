const express = require('express');

const Track = require('../models/Track');
const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    let tracks;

    if (req.query.album) {
        const tracksByAlbum = await Track.find({album: req.query.album}).populate('album', 'title');
        return res.send(tracksByAlbum);
    } else if (req.query.artist) {
        const albums = await Album.find({artist : req.query.artist}).select('_id');
        const albumsId = albums.map(album => album._id);
        tracks = await Track.find({album : {$in : albumsId}});
        return res.send(tracks);
    } else {
        tracks = await Track.find().populate('album', 'title');
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