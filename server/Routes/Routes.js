const express = require('express');
const passport = require('passport');
const User = require('../model/users');
const route = express.Router();
route.use(passport.initialize());

//send users
route.get('/users', (req, res, next) => {
    User.find({}, { userName: 1, createdAt: 1, imgUrl: 1, _id: 1 })
        .sort({ createdAt: 'Descending' })
        .exec((err, users) => {
            if (err) next(err);
            res.json(users);
        });
});

route.post('/signup', async (req, res, next) => {
    try {
        console.log('print any thing please');
        // console.log(req.body);
        const { userName, password } = req.body;
        console.log({userName});
        console.log(password);
        //check if user exist
        const user = await User.findOne({ userName: userName });
        if (user) {
            return res.status(400).json({ msg: 'this user already exist' });
        }

        if (password.length < 6)
            return res.status(400).json({
                msg: 'Password is at least 6 characters long.',
            });

        newUser = new User({
            userName: userName,
            password: password,
        });
        await newUser.save();
        res.json({ msg: 'Signed up successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

route.get('/users/user',async (req, res, next) => {
    const id = req.query.id;
    User.find({ _id: id },{userName:1,createdAt:1,bio:1,imgUrl:1}).exec((err, user) => {
        if (err) next(err)
        console.log(user);
        res.json(user)
    }
    )

});

route.post('/login', (req, res, next) => {});
route.get('/edit', (req, res, next) => {});
route.post('/edit', (req, res, next) => {});
route.get('/user/:userId', (req, res, next) => {});

module.exports = route;
