
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/Product')


const app = express()
app.use(express.json())

//მონაცემთა ბაზასთან დაკავშირება
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// GET
app.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit)
    const total = await Product.countDocuments()

    res.json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//ID-ით პოვნა
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//POST 
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//PUT 
app.put('/products/:id', async (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    // ვამოწმებთ რომ სავალდებულო ველები გამოგზავნილია Update-ის დროს
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required for update' })
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    )

    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//DELETE 
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product successfully deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})