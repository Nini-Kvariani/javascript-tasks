const validateCreateProduct = (req, res, next) => {
    const { name, category, isExpire, price } = req.body

    // აუცილებელი ველების შემოწმება
    if (!name || !category || isExpire === undefined || price === undefined) {
        return res.status(400).json({ error: "name, category, isExpire და price აუცილებელი ველებია." })
    }

    //ფასის ვალიდაცია
    if (typeof price !== 'number' || isNaN(price)) {
        return res.status(400).json({ error: "price უნდა იყოს რიცხვი." })
    }
    if (price < 0 || price > 200) {
        return res.status(400).json({ error: "ფასი უნდა იყოს 0-დან 200-მდე." })
    }

    //isExpire ვალიდაცია
    if (typeof isExpire !== 'boolean') {
        return res.status(400).json({ error: "isExpire უნდა იყოს boolean (true ან false)." })
    }

    next()
}

const validateUpdateProduct = (req, res, next) => {
    const { price, isExpire } = req.body

    // ვამოწმებთ მხოლოდ იმ შემთხვევაში, თუ მომხმარებელს რეალურად უნდა ფასის განახლება
    if (price !== undefined) {
        if (typeof price !== 'number' || isNaN(price)) {
            return res.status(400).json({ error: "price უნდა იყოს რიცხვი." })
        }
        if (price < 0 || price > 200) {
            return res.status(400).json({ error: "ფასი უნდა იყოს 0-დან 200-მდე." })
        }
    }

    // ვამოწმებთ მხოლოდ იმ შემთხვევაში, თუ მომხმარებელს უნდა isExpire-ის განახლება
    if (isExpire !== undefined && typeof isExpire !== 'boolean') {
        return res.status(400).json({ error: "isExpire უნდა იყოს boolean (true ან false)." })
    }

    next()
}

module.exports = { validateCreateProduct, validateUpdateProduct }