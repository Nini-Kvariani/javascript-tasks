const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const registerUser = async (username, email, password) => {
    if (!username || !email || !password) {
        const err = new Error('გთხოვთ შეავსოთ ყველა ველი')
        err.status = 400
        throw err
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        const err = new Error('ეს იმეილი უკვე გამოყენებულია')
        err.status = 400
        throw err
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    return user
}

const loginUser = async (email, password) => {
    if (!email || !password) {
        const err = new Error('გთხოვთ მიუთითოთ იმეილი და პაროლი')
        err.status = 400
        throw err
    }

    const user = await User.findOne({ email })
    
    // ვამოწმებთ იუზერს და პაროლს
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id)
        return { user, token }
    } else {
        const err = new Error('არასწორი იმეილი ან პაროლი')
        err.status = 401
        throw err
    }
}

module.exports = {
    registerUser,
    loginUser
}