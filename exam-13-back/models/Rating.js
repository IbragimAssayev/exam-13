const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    PlaceID: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    ratingPhotos:[{
        photo:{
            type:String,
            required:true
        }
    }],
    rating: [{
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
        }
    }]
});

const Photo = mongoose.model('Rating', RatingSchema);

module.exports = Photo;