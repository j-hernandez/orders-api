// Global variables for our prototype
// Orders array for storing and manipulating orders
var orders = [];
// Used to assign unique ids to each order
var primaryId = 1;

exports.findAll = (req, res) => {
    if (!orders.length) {
        next();
    }
    res.send(orders);
}

exports.create = (req, res) => {
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
}

exports.delete = (req, res) => {
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
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
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
}



exports.list = (req, res) => {

    res.render('orders', {orders});
};

exports.new = (req, res) => {
    res.render('create');
}