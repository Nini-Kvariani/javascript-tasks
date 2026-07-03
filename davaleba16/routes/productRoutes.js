const express = require('express')
const router = express.Router()
const productService = require('../services/productService')
const { validateCreateProduct, validateUpdateProduct } = require('../middlewares/validation')
const { checkRole } = require('../middlewares/auth')


//Secret Route 
router.get('/secret', checkRole(['admin']), (req, res) => {
    res.json({ message: "ეს არის საიდუმლო როუტი, მხოლოდ ადმინისტრატორებისთვის!" })
})


// ინფორმაციის წამოღება 
router.get('/', (req, res) => {
    const { page, limit } = req.query
    const result = productService.getProducts(page, limit)
    res.json(result)
})


//დამატება
router.post('/', validateCreateProduct, (req, res) => {
    const newProduct = productService.createProduct(req.body)
    res.status(201).json(newProduct)
})


// ID-ის მიხედვით ინფორმაციის წამოღება
router.get('/:id', (req, res) => {
    const product = productService.getProductById(req.params.id)
    if (!product) return res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა." })
    res.json(product)
});


//ნაწილობრივი აფდეითი 
router.patch('/:id', checkRole(['admin', 'editor']), validateUpdateProduct, (req, res) => {
    const updatedProduct = productService.updateProduct(req.params.id, req.body)
    if (!updatedProduct) return res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა განახლებისთვის." })
    res.json(updatedProduct)
})


// წაშლა
router.delete('/:id', checkRole(['admin']), (req, res) => {
    const isDeleted = productService.deleteProduct(req.params.id)
    if (!isDeleted) return res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა" })
    res.json({ message: "პროდუქტი წარმატებით წაიშალა." })
})


module.exports = router