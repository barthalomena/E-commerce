const app = require('./app');
const dotenv = require('dotenv');
const path=require("path");
const connectionDB = require('./config/database');

dotenv.config({path:path.join(__dirname,"config/config.env")});
connectionDB();
app.listen(process.env.PORT,()=>{
    console.log(`My server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})
