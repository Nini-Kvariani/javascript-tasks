const express = require('express')
const { 
    createExpense, 
    getExpenses, 
    getExpense, 
    updateExpense, 
    deleteExpense 
} = require('../controllers/expenseController')
const protect = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(protect)

// ვალაგებთ მარშრუტებს 
router.route('/')
    .post(createExpense)
    .get(getExpenses)

router.route('/:id')
    .get(getExpense)
    .put(updateExpense)
    .delete(deleteExpense)

module.exports = router