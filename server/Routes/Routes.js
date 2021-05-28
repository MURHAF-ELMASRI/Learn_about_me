const express = require('express');
const passport = require('passport');
const User = require('../model/users');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path=require('path');
const { clearScreenDown } = require('readline');
//initialize data storage

const imgTyp = ['png', 'jpg', 'webp', 'jpeg'];

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        if (req.isAuthenticated()) {
            const type = file.mimetype.match(/(png||jepg||jpg||webp)$/)[0]
            if (imgTyp.includes(type))
                cb(null, `${req.user.id}.${type}`);
            else {
                req.fileValidationError = 'Only image files are allowed!';
                return cb(null, false);
            }
        }
    },
});

const upload = multer({
    storage: storage,
});

const logIn = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(400).json({ msg: 'user Is not exists' });
        }
        if (info) res.status(400).json({ msg: info.message });

        req.login(user, (err) => {
            if (err) return next(err);
            res.json({
                user: {
                    id: user._id,
                    userName: user.userName,
                    avatar: user.avatar,
                    bio: user.bio,
                    createdAt: user.createdAt,
                },
            });
        });
    })(req, res, next);
};

const route = express.Router();
//send users
route.get('/users', (req, res, next) => {
    console.log('requesting ')
    User.find({}, { userName: 1, createdAt: 1, avatar: 1, _id: 1 })
        .sort({ createdAt: 'Descending' })
        
        .exec((err, users) => {
            if (err) {
                console.log('send users')
                ; next(err) };
            res.json(users);
        });
});

route.post(
    '/signup',
    async (req, res, next) => {
        try {
            const { userName, password } = req.body;
            //check if user exist
            const user = await User.findOne({ userName: userName });

            if (user) {
                return res.status(400).json({ msg: 'this user already exist' });
            }

            if (password.length < 6)
                return res.status(400).json({
                    msg: 'Password is at least 6 characters long.',
                });
            const hashed = await bcrypt.hash(password, 10);

            const newUser = new User({
                userName: userName,
                password: hashed,
            });
            await newUser.save();
            next();
        } catch (err) {
            next(err);
        }
    },
    logIn
);
//Send the general user info
route.get('/users/user', async (req, res, next) => {
    const id = req.query.userId;
    User.findOne(
        { _id: id },
        { userName: 1, createdAt: 1, bio: 1, avatar: 1 }
    ).exec((err, user) => {
        if (err) next(err);
        if (!user) {
            return res.status(404).json({ msg: 'user is not exist' });
        }
        res.json({
            id: user.id,
            userName: user.userName,
            bio: user.bio,
            createdAt: user.createdAt,
            avatar: user.avatar,
        });
    });
});

route.get('/users/user/info', async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({
            user: {
                id: req.user._id,
                userName: req.user.userName,
                avatar: req.user.avatar,
                bio: req.user.bio,
                createdAt: req.user.createdAt,
            },
        });
    } else res.status(401).json({ msg: 'unAuthorized' });
});

route.post('/login', logIn);

route.get('/logout', (req, res, next) => {
    console.log('logout');
    req.logOut();
    res.json({ mgs: 'done' });
    next();
});

const verfiyImg = (img64) => {
    const imgType = ['png', 'jpeg', 'jpg', 'webp'];
    const regex = /data:image\/([a-z]+);/;
    const capturedType = img64.match(regex)[1];
    if (imgType.includes(capturedType)) return capturedType;
    return false;
};

route.post('/edit',upload.single('avatar'), async (req, res, next) => {
    const {userName,password,bio,avatar} = req.body

    try {
        if (!req.isAuthenticated()) {
            return res.status(400).json({ msg: 'You have to log in or signup' });
        }

        if (
            !userName||
            !password
        ) {
           return res.status(400).json({ msg: 'userName or password missed' });
        }

        //check if user name is exist
        if (req.user.userName !== userName) {
            const user = await User.findOne({ userName });
            if (user) {
                return res.status(400).json({ msg: 'this user already exist' });
            }
        }
        if (password.length < 6)
            return res.status(400).json({
                msg: 'Password is at least 6 characters long.',
            });
        //if bio is not set assign '' to bio
        if (!bio) {
            bio = '';
        }
        //hash the new password
        const hash = await bcrypt.hash(password, 10);
        const updatedUser = {
            userName,
            password: hash,
            bio,
            avatar,
        };
        console.debug(updatedUser)
        await User.findOneAndUpdate({ _id: req.user.id }, updatedUser);
        res.status(200).json({ user: updatedUser });
    } catch (e) {
        console.log('at the edit route err: ' + e);
        res.status(400).json({ msg: 'erro' });
    }
});

module.exports = route;
