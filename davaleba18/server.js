const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

const MONGO_URI = 'mongodb+srv://prettyawesome31_db_user:NsU9Lh1hK1GCznAa@cluster0.qkwf6vw.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI, {
  family: 4 
})
  .then(() => {
    console.log('MongoDB-სთან კავშირი წარმატებულია!')
    app.listen(PORT, () => {
      console.log(`სერვერი გაეშვა პორტზე: ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB-სთან კავშირის შეცდომა:', err)
  })