const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const users = require('./app/users');
const places = require('./app/places');
const config = require('./config');
const port = 8000;

const run = async () => {
    await mongoose.connect(config.location, config.mongoOptions);
    app.use(cors());
    app.use(express.static("public"));
    app.use(express.json());
    app.use('/users', users());
    app.use('/places', places());
    app.listen(port, () => {
        console.log("Server started at http://localhost:" + port);
    });
};
run().catch(e => console.log(e));
