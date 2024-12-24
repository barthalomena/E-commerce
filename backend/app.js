const express = require('express');
const app = express();
const errorMiddelware = require('./middelewares/error')
app.use(express.json())

// app.use(express.json())
const products = require('./routes/product')

app.use('/api/v1/',products)
 app.use(errorMiddelware)



module.exports=app;
