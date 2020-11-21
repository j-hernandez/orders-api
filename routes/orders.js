const express = require('express');
const router = express.Router();

// Every route should have a corresponding
// controller method
const controller = require('../controllers/orders');

// equivalent to app.get('/orders')
router.get('/', controller.findAll) // req, res, next

router.post('/', controller.create)

router.get('/list', controller.list)

router.get('/create', controller.new)

router.delete('/:id', controller.delete)

router.get('/:id', controller.findOne);




module.exports = router;