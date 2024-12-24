const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the config file
dotenv.config({ path: path.join(__dirname, "config/config.env") });

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

const connectionDB = require('./config/database');

// Connect to the database
connectionDB(); // calling function

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`My server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});





process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled rejection`)
server.close(()=>{
    process.exit(1)
})

})



process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught  exception`)
server.close(()=>{
    process.exit(1)
})

})
// console.log(a);
