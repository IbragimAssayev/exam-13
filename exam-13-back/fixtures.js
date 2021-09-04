const mongoose = require('mongoose');
const config = require('./config');
const Place = require('./models/Place');
const User = require('./models/User');
const Rating = require('./models/Rating');
const PlacePhotos = require('./models/PlacePhotos');
const { nanoid } = require('nanoid');

const run = async () => {
    await mongoose.connect(config.location, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user1, user2, user3] = await User.create({
        username: 'John Doe',
        password: '123',
        token: nanoid(10)
    }, {
        username: 'Doe John',
        password: '123',
        token: nanoid(10)
    });


    const [place1, place2] = await Place.create({
        title: 'Afterlife',
        description:"Club on the omega station!",
        userID: user1._id,
        author: user1.username,
        image: "1.jpg"
   },{
        title: 'Afterlife',
        description:"Club on the omega station!",
        userID: user2._id,
        author: user2.username,
        image: "1.jpg"
    });

    await Rating.create({
        PlaceID: place1._id,
        quality:5,
        service:5,
        interior: 5,
        author:user1.username,
        comment:"I love this place"
    });

    await PlacePhotos.create({
        PlaceID: place1._id,
        image:'2.jpg'
    });

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});