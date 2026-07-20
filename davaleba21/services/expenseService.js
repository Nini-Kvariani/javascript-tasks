const Expense = require('../models/Expense')

//დამატება
const createExpense = async (expenseData, userId) => {
    const { title, amount, category } = expenseData;
    
    const expense = await Expense.create({
        title,
        amount,
        category,
        user: userId
    })
    
    return expense;
}

//წაკითხვა 
const getExpenses = async (userId, query) => {
    const page = parseInt(query.page, 10) || 1
    const limit = parseInt(query.limit, 10) || 10
    const skip = (page - 1) * limit

    //თუ სორტირება არ გადმოეცა, default არის -createdAt (ახლები ჯერ)
    const sortBy = query.sort ? query.sort.split(',').join(' ') : '-createdAt'

    const expenses = await Expense.find({ user: userId })
        .sort(sortBy)
        .skip(skip)
        .limit(limit);

    return expenses;
}

//კონკრეტული ხარჯის ნახვა 
const getExpenseById = async (expenseId, userId) => {
    const expense = await Expense.findOne({ _id: expenseId, user: userId })
    if (!expense) {
        const err = new Error('ხარჯი არ მოიძებნა')
        err.status = 404
        throw err
    }
    return expense
}

//განახლება
const updateExpense = async (expenseId, userId, updateData) => {
    const expense = await Expense.findOneAndUpdate(
        { _id: expenseId, user: userId },
        updateData,
        { new: true, runValidators: true } 
    )

    if (!expense) {
        const err = new Error('ხარჯი არ მოიძებნა ან განახლების უფლება არ გაქვთ')
        err.status = 404
        throw err
    }
    return expense
}

//წაშლა
const deleteExpense = async (expenseId, userId) => {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId })
    
    if (!expense) {
        const err = new Error('ხარჯი არ მოიძებნა ან წაშლის უფლება არ გაქვთ')
        err.status = 404
        throw err
    }
    return expense
}

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}