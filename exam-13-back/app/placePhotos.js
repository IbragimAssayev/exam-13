const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const router = express.Router();
const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const PlacePhotos = require('../models/PlacePhotos');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const createRouter = () => {

    router.get('/:id', async (req, res) => {
        await PlacePhotos.find({ PlaceID: req.params.id }).then(photo => {
            if (photo) res.send(photo);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    });

    router.post('/:id', [auth, upload.single('image')], async (req, res) => {
        const token = await req.get("Authorization");
        const user = await User.findOne({ token: token });
        const photo = new PlacePhotos(req.body);
        photo.PlaceID = req.params.id;
        photo.author = user.username;
        if (req.file) {
            photo.image = req.file.filename;
        }
        photo.save().then(result => {
            res.send(result)
        }).catch(error => {
            res.status(400).send(error)
        });
    });

    router.delete('/:id', auth, async (req, res) => {
        const photo = await PlacePhotos.findOne({ _id: req.params.id })
        const thisPhotoID = JSON.stringify(photo.PlaceID);
        const thisUserID = (`"${req.user._id}"`);
        if (thisPhotoID === thisUserID) {
            await photo.remove();
            await Photo.find({ userID: req.user._id }).populate('userID').then(photo => {
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