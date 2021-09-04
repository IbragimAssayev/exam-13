const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlacePhotosSchema = new Schema({
    PlaceID: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    image:{
        type:String,
        required:true
    }
});

const PlacePhoto = mongoose.model('PlacePhoto', PlacePhotosSchema);

module.exports = PlacePhoto;