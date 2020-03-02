const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: false,
    }
}, {
    versionKey: false,
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;