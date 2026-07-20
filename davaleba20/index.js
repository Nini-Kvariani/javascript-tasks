require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')

const app = express()
app.use(express.json())

//ბაზის კავშირის ინიციალიზაცია
connectDB()

//როუტების ბაზური მისამართი
app.use('/products', productRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))