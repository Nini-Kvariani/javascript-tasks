let products = []
let nextId = 1

const createProduct = (data) => {
    const newProduct = { id: nextId++, ...data }
    products.push(newProduct)
    return newProduct
}

const getProducts = (queryPage, queryLimit) => {
    const page = Number(queryPage) || 1
    const limit = Number(queryLimit) || 5
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    const paginatedProducts = products.slice(startIndex, endIndex)
    return {
        total: products.length,
        page,
        limit,
        data: paginatedProducts
    }
}

const getProductById = (id) => {
    return products.find(p => p.id === Number(id))
}

const updateProduct = (id, data) => {
    const index = products.findIndex(p => p.id === Number(id))
    if (index === -1) return null

    products[index] = { ...products[index], ...data }
    return products[index]
}

const deleteProduct = (id) => {
    const index = products.findIndex(p => p.id === Number(id))
    if (index === -1) return false

    products.splice(index, 1)
    return true
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};