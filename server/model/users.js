const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_FACTOR = process.env.salt_factor;

const userSchema = mongoose.Schema({
    userName: {type:String,required:true,unique:true},
    password: { type: String, required: true },
    createdAt:{type:Date,default:Date.now},
    displayName: String,
    bio:String
})

//Add method to schema
userSchema.methods.name = function (){
    return this.displayName || this.userName
}

userSchema.pre("save",async (done) => {
    const pass = this.password;
    if (!pass) {
        done()
    }
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err)
            done(err)
        bcrypt.hash(pass, salt, (err, hash){
            if (err)
                done(err)
            this.password = hash;
            done();
        })
    })
})

userSchema.methods.checkPassword = (pass,done) => {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        done(err,isMatch)
    })
}

var User = mongoose.model("User",userSchema)

module.exports=User