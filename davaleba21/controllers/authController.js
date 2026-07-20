const authService = require('../services/authService')

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = await authService.registerUser(username, email, password)
        
        res.status(201).json({
            message: 'მომხმარებელი წარმატებით დარეგისტრირდა',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { user, token } = await authService.loginUser(email, password)
        
        res.status(200).json({
            message: 'წარმატებული ლოგინი',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}