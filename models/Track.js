const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectID,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;