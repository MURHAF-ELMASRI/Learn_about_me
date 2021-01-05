const express = require('express');
const passport = require('passport');
const User = require('../model/users');
const bcrypt =require('bcrypt')
const route = express.Router();



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
        console.log({ userName });
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
       
        await bcrypt.hash(password, 10, (err, hashed) => {
            console.log('err  '+err);
            if (err)
                next(err)
            newUser = new User({
                userName: userName,
                password: hashed,
            });
        })

        
        await newUser.save();
        res.json({ msg: 'Signed up successfully' });
    } catch (err) {
       next(err)
    }
});
//Send the general user info
route.get('/users/user', async (req, res, next) => {
    const id = req.query.id;
    User.find(
        { _id: id },
        { userName: 1, createdAt: 1, bio: 1, imgUrl: 1 }
    ).exec((err, user) => {
        if (err) next(err);
        console.log(user);
        res.json(user);
    });
});

route.post('/login',(req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log(info);
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                
                res.status(400).json({ msg:'user Is not exists' });
            }
            if (info) res.status(400).json({ msg: info.message });
            req.login(user, (err) => {
                if (err) return next(err);
                res.json({
                    user: {
                        id:user._id,
                        userName: user.userName,
                        imgUrl: user.imgUrl,
                        bio: user.bio,
                        createdAt: user.createdAt
                    }
                });
            });
        })(req, res, next);
});

route.get('/logout', (req, res, next) => {
    console.log('logout');
    req.logOut();
    res.json({ mgs: 'done' })
    next()
})

route.get('/edit', (req, res, next) => {});

module.exports = route;
