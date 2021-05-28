const mongoose = require('mongoose');

// const SALT_FACTOR = process.env.salt_factor;

const userSchema = mongoose.Schema({
    userName: {type:String,required:true,unique:true},
    password: { type: String, required: true },
    createdAt:{type:Date,default:Date.now},
    displayName: String,
    bio: String
    ,avatar:String
})

//Add method to schema
// userSchema.methods.name = function (){
//     return this.displayName || this.userName
// }
//I was trying here to do like the book action in express but it so confusing and I decide to change it.
// userSchema.pre("save",(done) => {
//     const pass = this.password;
//     if (!pass) {
//         done()
//     }
//     bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
//         if (err)
//             done(err)
//         bcrypt.hash(pass, salt, (err, hash)=>{
//             if (err)
//                 done(err)
//             this.password = hash;

//             done();
//         })
//     })
// })

// userSchema.methods.checkPassword = (pass,done) => {
//     bcrypt.compare(pass, this.password, (err, isMatch) => {
//         done(err,isMatch)
//     })
// }

var User = mongoose.model("users",userSchema)

module.exports=User