const express = require('express');
const app = express();
const errorMiddelware = require('./middelewares/error')
app.use(express.json())

// app.use(express.json())
const products = require('./routes/product')
const auth = require('./routes/auth')


app.use('/api/v1/',products)
app.use('/api/v1/',auth)

 app.use(errorMiddelware)



module.exports=app;
