const express = require('express');
const app = express();
const port = 3001;

// Global variables for our prototype

// Orders array for storing and manipulating orders
let orders = [];
// Used to assign unique ids to each order
let primaryId = 1;

// Middleware

// This is going to capture the request body (req.body), and 
// run it through JSON.parse(), returning an object that will 
// be available as req.body


app.use(express.json());
// request body has been parsed
app.use(express.urlencoded({extended: false}));
// request body has been url encoded

// HTML Pages
app.use(express.static('html')); // no match found? next()

// Custom Middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`) 
    next();
})

// ROUTES 
// Start matching 
app.get('/orders', (req, res, next) => {
    if (!orders.length) {
        next();
    }
    res.send(orders);
})

// routes
app.post('/orders', (req, res) => {
    // req.body now represents the actual request body
    // as a javascript object
    // allow for food_name, customer_name, quantity
    orders.push({
        id: primaryId,
        food_name: req.body.food_name,
        customer_name: req.body.customer_name,
        quantity: req.body.quantity
    });
    primaryId++;

    res.status(200).json({
        message: "Order created succesfully"
    })
})

app.delete('/orders/:id', (req, res) => {
    const id = req.params.id;
    // First attempt
    // let index = orders.indexOf(id);
    // if (index > -1) {
    //     orders.splice(index, 1);
    // }

    let order = orders.find((order) => {
        return order.id === Number(id)
    });

    let orderIndex = orders.findIndex((o) => {
        return o === order;
    })

    if (orderIndex > -1) {
        orders.splice(orderIndex, 1);
    }
    res.status(200).send(orders);
})

app.get('/orders/:id', (req, res) => {
    const id = req.params.id;
    let order = orders.find((order) => {
        return order.id === Number(id)
    });

    const filter = req.body.filter || [];
    if (filter.length) {
        let newOrder = {};
        filter.forEach((f) => {
            // f is going to represent an item in the filter array
            // setting newOrder.property = whatever the found property on the 
            // order object
            // example:
            // f = customer_name 
            // newOrder['customer_name'] = order['customer_name'];
            newOrder[f] = order[f];
        })
        res.status(200).send(newOrder);
    }
    res.status(200).send(order);
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(query);
})

app.get('/index.html', (req, res) => {
    res.send('Here is the index');
})

app.get('/pixel.jpg', (req, res) => {
    // track everything about this person first

    // send back a generated jpeg response
    res.send(fakeImage);
})

app.get('*', (req, res) => {
    res.status(404).send('Not found');
})

app.listen(port, () => {
    console.log('server started');
})

