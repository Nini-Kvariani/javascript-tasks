const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [2, 'Minimum price is 2'],
    max: [4000, 'Maximum price is 4000']
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'] 
  },
  description: { 
    type: String, 
    required: false 
  }
});

module.exports = mongoose.model('Product', productSchema)