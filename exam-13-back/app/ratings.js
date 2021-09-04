const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const Rating = require('../models/Rating');
const User = require('../models/User');

const createRouter = () => {

    router.get('/:id', async (req, res) => {
        await Rating.find({PlaceID: req.params.id }).then(rating => {
            console.log(rating)
            if (rating) res.send(rating);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    });

    router.post('/:id', auth, async (req, res) => {
        console.log(req.body)
        const token = req.get("Authorization");
        const user = await User.findOne({ token: token });
        const rating = new Rating(req.body);
        rating.PlaceID = req.params.id;
        rating.author = user.username;
        rating.save().then(result => {
            res.send(result)
        }).catch(error => {
            res.status(400).send(error)
        });
    });

    router.delete('/:id', auth, async (req, res) => {
        const photo = await Rating.findOne({ _id: req.params.id })
        const thisPhotoID = JSON.stringify(photo.PlaceID);
        const thisUserID = (`"${req.user._id}"`);
        if (thisPhotoID === thisUserID) {
            await photo.remove();
            await Rating.find({ userID: req.user._id }).populate('userID').then(photo => {
                if (photo) res.send(photo);
                else res.sendStatus(404);
            }).catch(() => res.sendStatus(500));
        } else {
            res.status(401).send({ error: "Unauthorized" })
        }
    });

    return router;
};


module.exports = createRouter;