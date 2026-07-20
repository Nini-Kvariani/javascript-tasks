const expenseService = require('../services/expenseService')

const createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.createExpense(req.body, req.user._id)
        res.status(201).json({ message: 'ხარჯი დაემატა', expense })
    } catch (error) {
        next(error)
    }
}

const getExpenses = async (req, res, next) => {
    try {
        const expenses = await expenseService.getExpenses(req.user._id, req.query)
        res.status(200).json({ count: expenses.length, expenses })
    } catch (error) {
        next(error)
    }
}

const getExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.getExpenseById(req.params.id, req.user._id)
        res.status(200).json(expense)
    } catch (error) {
        next(error)
    }
}

const updateExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.updateExpense(req.params.id, req.user._id, req.body)
        res.status(200).json({ message: 'ხარჯი განახლდა', expense })
    } catch (error) {
        next(error)
    }
}

const deleteExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.deleteExpense(req.params.id, req.user._id)
        res.status(200).json({ message: 'ხარჯი წაიშალა', expense })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense
}