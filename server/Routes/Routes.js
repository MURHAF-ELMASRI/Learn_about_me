const express = require('express');
const passport = require('passport');
const User = require('../model/users');
const route = express.Router();
route.use(passport.initialize());

//send users
route.get('/', (req, res, next) => {
    User.find()
        .sort({ createdAt: 'Descending' })
        .exec((err, users) => {
            if (err) next(err);
            res.json(users);
        });
});

route.post('/signup', async (req, res, next) => {
    const { userName, password } = req.body;
    //check if user exist
    User.findOne(userName, (err, user) => {
        if (err) next(err);
        res.status(400).json({ msg: 'User Name already exist' });
        next(err)
    });

    if (password.length < 6)
        return res
            .status(400)
            .json({ msg: 'Password is at least 6 characters long.' });

    newUser = new User({
        userName: userName,
        password: password,
    });
    await newUser.save();
    res.json({msg:"Signed up successfully"})
});

route.get('/login', (req, res, next) => {});

route.post('/login', (req, res, next) => {});
route.get('/edit', (req, res, next) => {});
route.post('/edit', (req, res, next) => {});
route.get('/user/:userId', (req, res, next) => {});

module.exports = route;
