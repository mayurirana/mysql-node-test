const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute = require('./src/user/router/userRoute')
const catRoute = require('./src/category/router/catRoute')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', userRoute)
app.use('/category', catRoute)


app.listen(process.env.PORT,() => console.log("Server start on port:" , process.env.PORT))