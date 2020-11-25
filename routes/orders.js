const express = require('express');
const router = express.Router();

// Every route should have a corresponding
// controller method
const controller = require('../controllers/orders');

// Ensure authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


// equivalent to app.get('/orders')
router.get('/', controller.findAll) // req, res, next

router.post('/', controller.create)

router.get('/list', controller.list)

router.get('/create', ensureAuthenticated, controller.new)

router.delete('/:id', controller.delete)

router.get('/:id', controller.findOne);




module.exports = router;