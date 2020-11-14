const express = require('express');
const app = express();
const port = 3001;

let orders = [];
let primaryId = 1;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

app.get('/orders', (req, res) => {
    res.send(orders);
})

app.delete('/orders/:id', (req, res) => {

    const orderId = req.params.id;
    
})


app.listen(port, () => {
    console.log('server started');
})