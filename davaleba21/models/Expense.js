const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'ხარჯის დასახელება სავალდებულოა'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'თანხის მითითება სავალდებულოა'],
        min: [0.01, 'თანხა უნდა იყოს მეტი ვიდრე 0'] 
    },
    category: {
        type: String,
        required: [true, 'კატეგორიის მითითება სავალდებულოა'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)