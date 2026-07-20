const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const productService = require('../services/productService')

//GET ALL (+ პაგინაცია, ძებნა, ფილტრაცია, სორტირება)
router.get('/', async (req, res) => {
    try {
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)

        const validPage = Number.isInteger(page) && page > 0 ? page : 1;
        const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 5;
        const finalLimit = Math.min(validLimit, 50);

        const mongoQuery = {}

        if (req.query.search) {
            mongoQuery.name = { $regex: req.query.search, $options: 'i' }
        }

        if (req.query.category) {
            mongoQuery.category = req.query.category.trim().toLowerCase()
        }

        if (req.query.minPrice || req.query.maxPrice) {
            mongoQuery.price = {};
            if (req.query.minPrice) mongoQuery.price.$gte = Number(req.query.minPrice)
            if (req.query.maxPrice) mongoQuery.price.$lte = Number(req.query.maxPrice)
        }

        let sortOption = { createdAt: -1 }
        if (req.query.sort) {
            const isDescending = req.query.sort.startsWith('-')
            const sortField = isDescending ? req.query.sort.substring(1) : req.query.sort;
            sortOption = { [sortField]: isDescending ? -1 : 1 };
        }

        const result = await productService.getAllProducts(validPage, finalLimit, mongoQuery, sortOption)
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// GET BY ID
router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID format" })
    }
    try {
        const product = await productService.getProductById(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST 
router.post('/', async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body)
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// PUT 
router.put('/:id', async (req, res) => {
    if (!mongoose.Types.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID format" })
    }
    
    const { name, price, category } = req.body;
    if (name === undefined || price === undefined || category === undefined) {
        return res.status(400).json({ message: 'PUT request requires ALL fields: name, price, and category' })
    }

    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body)
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' })
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// წაშლა
router.delete('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID format" })
    }
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id)
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router