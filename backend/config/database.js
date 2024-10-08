const mongoose = require('mongoose');
const connectionDB = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`mongoDb is connected to the host: ${con.connection.host}`)
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = connectionDB;