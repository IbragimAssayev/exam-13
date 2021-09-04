const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    PlaceID: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    quality:{
        type:String,
        required: true
    },
    service:{
        type:String,
        required: true
    },
    interior:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    comment:{
        type:String,
        required: true
    }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;