const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7777;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');// for authentication
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); //and it is used cookie stored in db // used connect-mongo@3 version 
const sassMiddleware = require('node-sass-middleware');

    app.use(sassMiddleware({
        src: './assets/scss',
        dest: './assets/css',
        debug: true,// it is false in production mode
        outputStyle: 'extended',
        prefix: '/css'
    }));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);//To use the layout after installation
//For extracting the multiple styles and scripts to to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');//ejs is set after installation
app.set('views', './views');//ejs is set to folder of where we use

//MongoStore is used to store the session cookie in the db
app.use(session({
    name: 'employee-review-sys',
    //TODO change the secret before deployment in production mode
    secret: 'LOLOLOL',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup oK');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);// for user data in views

//Router is added
app.use('/',require('./routes'));

//To run on a server
app.listen(port, function(err){
    if (err) {
        console.log(`Error in the server that is running on ${port}: ${ err}`);
    }
    console.log(`server is active on port:${port}`);
})