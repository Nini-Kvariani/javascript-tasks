const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'სახელის მითითება სავალდებულოა'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'ელ-ფოსტის მითითება სავალდებულოა'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'გთხოვთ მიუთითოთ ვალიდური ელ-ფოსტა'] 
    },
    password: {
        type: String,
        required: [true, 'პაროლის მითითება სავალდებულოა'],
        minlength: [6, 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს']
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)