const User = require('./model/users');
const localStrategy = require('passport-local').Strategy
const bcrypt =require('bcrypt')

module.exports=function (passport) {
    
    passport.serializeUser((user, done) => {
        console.log(user._id);
        return done(null,user._id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user) => {
            return done(err, user)
        })
    })


    passport.use(new localStrategy((userName, password, done) => {
        console.log('local strategy running');
        User.findOne({ userName }).then((user, err) => {
            if (err)
              return  done(err)
            if (!user)
               return done(null, false)
            
            bcrypt.compare(password,user.password,(err, same) => {
                if (err)
                    return done(err)
                if (!same)
                    return done(null, true, { message: 'Password is invalid' })
                else
                   return done(null,user)
            })
        })

    }))

}