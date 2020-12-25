const express = require('express')
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const session=require('express-session')
const cookieParser=require("cookie-parser")
const passport=require('passport');
const morgan=require('morgan')
const helmet=require('helmet')
const routes = require('./Routes/Routes')
const dotenv=require('dotenv')
//middleware init
dotenv.config({path:"./config.env"});


const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
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

const port = process.env.PORT;
const dbname = process.env.db_name
const URI = process.env.db_URL;
console.log(`${URI}${dbname}`);
mongoose
    .connect(`${URI}/${dbname}`)
    .then(
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })
    )
    .catch((err) => console.log('server not running' + err));
