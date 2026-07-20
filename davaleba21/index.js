require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorMiddleware')

//მარშუტების იმპორტი
const authRoutes = require('./routes/authRoutes')
const expenseRoutes = require('./routes/expenseRoutes')

const app = express()

//მონაცემთა ბაზასთან დაკავშირება
connectDB()

//Middleware JSON მონაცემების წასაკითხად
app.use(express.json())

// მარშრუტების გამოყენება
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)

//შეცდომების მართვა
app.use(errorHandler)

//სერვერის გაშვება
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 სერვერი მუშაობს პორტზე: ${PORT}`)
})