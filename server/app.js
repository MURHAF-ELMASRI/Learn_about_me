const express = require('express')
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const session=require('express-session')
const cookieParser=require("cookie-parser")
const passport=require('passport');
const morgan=require('morgan')
const helmet=require('helmet')
const route=require('./Routes/Routes')
//middleware init
require('dotevn').config({'./config.env'})
const app = express();
app.use(bodyParser.urlencoded({extends:false}))
app.use(morgan('common'))
app.use(helmet())
app.use(session({
    secret: 'generetescrete',
    saveUninitialized: true,
    resave:true
}))
app.use(cookieParser())
app.use(passport.initialize())

//Routes
app.use(routes)

//Error handler
app.use((req, res, next, err) => {
    if (res.status == 404)
        res.json({ error: "URL not found" })
    else if (res.status == 500) {
        res.json({ error: "error had been accrued" })
    }
})

const port=process.env.port
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})