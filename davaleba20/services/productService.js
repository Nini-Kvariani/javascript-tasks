const Product = require('../models/Product.js')

class ProductService {
    async getAllProducts(page, limit, query = {}, sortOption = { createdAt: -1 }) {
        const skip = (page - 1) * limit;
        
        const data = await Product.find(query).sort(sortOption).skip(skip).limit(limit)
        const total = await Product.countDocuments(query)
        
        return {
            data,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total,
            limit
        }
    }

    getProductById(id) {
        return Product.findById(id);
    }

    createProduct(productData) {
        const product = new Product(productData);
        return product.save();
    }

    updateProduct(id, productData) {
        return Product.findByIdAndUpdate(
            id,
            productData,
            { new: true, runValidators: true, overwrite: false }
        );
    }

    deleteProduct(id) {
        return Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductService()