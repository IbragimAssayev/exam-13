const mongoose = require('mongoose');
const config = require('./config');
const Photo = require('./models/Photo');
const User = require('./models/User');
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
    }, {
        username: 'Doe Doe',
        password: '123',
        token: nanoid(10)
    });

    await Photo.create({
        title: 'Nature 1',
        userID: user1._id,
        author: user1.username,
        image: "1.jpg"
    }, {
        title: 'Nature 2',
        userID: user1._id,
        author: user1.username,
        image: "2.jpg"
    }, {
        title: 'Nature 3',
        userID: user2._id,
        author: user2.username,
        image: "3.jpg"
    }, {
        title: 'Nature 4',
        userID: user2._id,
        author: user2.username,
        image: "4.jpg"
    }, {
        title: 'Nature 5',
        userID: user3._id,
        author: user3.username,
        image: "5.jpg"
    }, {
        title: 'Nature 6',
        userID: user3._id,
        author: user3.username,
        image: "6.jpg"
    })

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});