const express = require('express');
const app = express();
const port = 3001;

// Importing our Order Routes
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');

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

app.get('*', (req, res) => {
    res.status(404).send('Not found');
})

app.listen(port, () => {
    console.log('server started');
})

