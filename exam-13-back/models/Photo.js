const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    rating: [{
        quality:{
            type:String
        },
        service:{
            type:String
        },
        interior:{
            type:String
        }
    }]
});

const Photo = mongoose.model('Place', PlaceSchema);

module.exports = Photo;