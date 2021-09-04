const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

const createRouter = () => {

    router.post('/', async (req, res) => {
        try {
            const user = new User(req.body);
            user.generateToken();
            await user.save();
            res.send({ token: user.token, username: user.username });
        } catch (error) {
            res.status(400).send(error);
        }
    });

    router.post('/sessions', async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send({ error: 'Username not found' });
        }
        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Incorrect password' });
        };
        user.generateToken()
        await user.save()
        res.send({ token: user.token, username: user.username });
    });

    router.delete('/sessions', auth, async (req, res) => {
        const token = req.get("Authorization");
        const success = { message: 'Success' };
        if (!token) return res.send(success);
        const user = await User.findOne({ token: token });
        if (!user) return res.send(success);
        user.generateToken();
        user.save();
        return res.send(success);
    });

    return router;
};


module.exports = createRouter;