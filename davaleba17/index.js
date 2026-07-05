const express = require('express')
const app = express()

const logger = require('./middlewares/logger')
const ordersRouter = require('./routes/orders')
const { isAdmin } = require('./middlewares/auth')

// Body Parser Middleware
app.use(express.json())

// Global Logger Middleware
app.use(logger)

// Base Routes
app.use('/api/orders', ordersRouter)

// Secret Route
app.get('/api/secret', isAdmin, (req, res) => {
    res.json({ message: 'Welcome to the top-secret dashboard! 🕵️‍♂️' })
})

// სერვერის პორტი
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`)
})