const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [2, 'Price must be at least 2'],
        max: [4000, 'Price cannot exceed 4000']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: false
    }
}, { 
    timestamps: true 
})

module.exports = mongoose.model('Product', productSchema)