const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./Routes/Routes');
const dotenv = require('dotenv');
const cors = require('cors');
const redis = require('redis');
const connectRedis = require('connect-redis');

//middleware init
dotenv.config({ path: './config.env' });
//create the app
const app = express();
//use morgan  to log the req
app.use(morgan('common'));
//use helmet for security
// app.use(helmet())

app.use('/avatar', express.static('uploads'));
//encode the url
app.use(express.urlencoded({ extended: false }));
//parse body
app.use(express.json());
//set cross origin protocol
app.use(
    cors({
        origin: 'http://localhost:3000', // <-- location of the react app were connecting to
        credentials: true,
    })
);
//create client for redis
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});
//use session in redis
const RedisStore = connectRedis(session);
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
//initialize the session
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'generetescrete',
        saveUninitialized: false,
        resave: false,
    })
);
//parse cookie
app.use(cookieParser('generetescrete')); // Old version of express-session was need to cookie parser

//initialize cookie
app.use(passport.initialize());
app.use(passport.session());
require('./passportSetup')(passport);

//Routes
app.use(routes);

//Error handler
app.use((req, res, next, err) => {
    if (res.status == 404) res.status(404).json({ error: 'URL not found' });
    else if (res.status == 500) {
        res.status(500).json({ error: 'error had been accrued' });
    }
});

const port = process.env.PORT;
const dbname = process.env.db_name;
const URI = process.env.db_URL;
console.log(`this is url ${URI}`);

mongoose
    .connect(`${URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })
    )
    .catch((err) => console.log('server not running ' + err));
