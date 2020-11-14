const express = require('express');
const app = express();
const port = 3001;

let orders = [];
let primaryId = 1;

// Middleware

// This is going to capture the request body (req.body), and 
// run it through JSON.parse(), returning an object that will 
// be available as req.body
app.use(express.json());
// request body has been parsed
app.use(express.urlencoded({extended: false}));
// request body has been url encoded

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

    res.status(200).send(order);
});



app.get('*', (req, res) => {
    res.status(404).send('Not found');
})


app.listen(port, () => {
    console.log('server started');
})