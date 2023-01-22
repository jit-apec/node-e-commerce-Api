require('./connection/db')
require('dotenv').config()

const app = require('./app')
const PORT = process.env.PORT || 3000
const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1'

app.listen(PORT,() => {
    // console.log(`listen  on ${PORT}`)
    console.log(`Server running at http://${DATABASE_HOST}:${PORT}/`);
})  