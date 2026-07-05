const express = require('express')
const router = express.Router()
const orderService = require('../services/orderService')
const { isAdmin, isEditorOrAdmin } = require('../middlewares/auth')

// სტატუსების სია
const ALLOWED_STATUSES = ['pending', 'processing', 'completed', 'cancelled']

//ვალიდაცია
router.get('/', (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.max(1, Number(req.query.limit) || 10)
    
    const result = orderService.getAllOrders(page, limit)
    res.json(result)
})

const validateId = (req, res, next) => {
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'Invalid or incorrect ID format' })
    }
    req.validatedId = id;
    next();
}

//ID-ით წამოღება
router.get('/:id', validateId, (req, res) => {
    const order = orderService.getOrderById(req.validatedId)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
})

//ბიზნეს ლოგიკის ვალიდაციის ფუნქცია 
const validateOrderData = (req, res, next) => {
    const { quantity, totalPrice, status } = req.body;

    if (quantity > 10 || totalPrice > 500) {
        return res.status(400).json({ 
            message: 'Validation failed: quantity must be <= 10 and totalPrice must be <= 500' 
        });
    }

    if (status && !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ 
            message: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(', ')}` 
        });
    }

    next();
}

//დამატება
router.post('/', validateOrderData, (req, res) => {
    const { productName } = req.body;
    if (!productName) {
        return res.status(400).json({ message: 'productName is required' })
    }

    const newOrder = orderService.createOrder(req.body);
    res.status(201).json(newOrder);
})

//განახლება
router.put('/:id', validateId, isAdmin, validateOrderData, (req, res) => {
    const updatedOrder = orderService.updateOrder(req.validatedId, req.body)
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' })
    res.json(updatedOrder);
})

//სტატუსის შეცვლა
router.patch('/:id/status', validateId, isEditorOrAdmin, (req, res) => {
    const { status } = req.body
    
    if (!status || !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ 
            message: `Valid status is required. Allowed values: ${ALLOWED_STATUSES.join(', ')}` 
        });
    }

    const updatedOrder = orderService.updateOrderStatus(req.validatedId, status);
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
})

// წაშლა 
router.delete('/:id', validateId, isAdmin, (req, res) => {
    const isDeleted = orderService.deleteOrder(req.validatedId);
    if (!isDeleted) return res.status(404).json({ message: 'Order not found' })
    res.json({ message: 'Order deleted successfully' });
})

module.exports = router