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
        required: true,
         enum: [1, 2, 3, 4, 5]
    },
    service:{
        type:String,
        required: true,
         enum: [1, 2, 3, 4, 5]
    },
    interior:{
        type:String,
        required: true,
         enum: [1, 2, 3, 4, 5]
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