// Global variables for our prototype
// Orders array for storing and manipulating orders
var customers = [];
// Used to assign unique ids to each order
var primaryId = 1;

exports.findAll = (req, res) => {
    res.send('All customers')
}

exports.create = (req, res) => {
    res.send('create customer');
}

exports.delete = (req, res) => {
    res.send('delete customer');
}

exports.findOne = (req, res) => {
   res.send('Customers by id');
}

