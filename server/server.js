const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const logger = require('./middlewares/logger')
const register = require('./routes/register')
const login = require('./routes/login')
const recipes = require('./routes/recipes')

const serverless = require('serverless-http')

const app = express()
const PORT = process.env.PORT || 8001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/.netlify/functions/api')
app.use(cors({origin:'*'}))
app.use(logger)
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/recipes', recipes)


app.get('*', (req,res)=>{
    res.status(404).send('No such Endpoint')
})


mongoose.connect(process.env.DBSTRING, {useNewUrlParser: true}).then(()=> console.log('Connected To MongoDB...')).catch(()=> console.log('Cannot Connect To MongoDB'))


app.listen(PORT, ()=> console.log(`server has started on port: ${PORT}`))


module.exports.handler = serverless(app)