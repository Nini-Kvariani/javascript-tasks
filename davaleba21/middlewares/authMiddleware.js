const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401)
        return next(new Error('წვდომა აკრძალულია, ტოკენი არ მოიძებნა'))
    }

    if (!process.env.JWT_SECRET) {
        res.status(500)
        return next(new Error('სერვერის შეცდომა: JWT_SECRET არ არის განსაზღვრული'))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findById(decoded.userId).select('-password')
        
        if (!req.user) {
            res.status(401)
            return next(new Error('მომხმარებელი არ მოიძებნა'))
        }

        next()
    } catch (error) {
        res.status(401)
        next(new Error('ტოკენი არასწორია ან ვადაგასულია'))
    }
}

module.exports = protect