require('dotenv').config()
const express = require('express');
const app = express();
const port = 3001;

// Passport configuration
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const session = require('express-session');

app.use(session({
        secret:'abc123', 
        resave: false, 
        saveUninitialized: false
    }));

// Passport configuration - Github Strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
})



// Importing our Order Routes
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');
const authRoutes = require('./routes/auth');

// Middleware

app.set('view engine','ejs');
// come back to this, try using public
//app.set('views', 'views');

// This is going to capture the request body (req.body), and 
// run it through JSON.parse(), returning an object that will 
// be available as req.body

app.use(express.json());
// request body has been parsed
app.use(express.urlencoded({extended: false}));
// request body has been url encoded

// Static Files
app.use(express.static('public')); // no match found? next()

// Custom Middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`) 
    next();
})

// Routes - Orders
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
    res.status(404).send('Not found');
})

app.listen(port, () => {
    console.log('server started');
})

