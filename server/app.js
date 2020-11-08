const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const PORT = config.get('port') || 5000;

app.use("/api/auth", require("./routes/auth.routhes"));

async function start(){
    try{
       await mongoose.connect(config.get("mongoUri"),{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
       });
       app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}`));
    }catch(error){
        console.log('Server Error', error.message);
        process.exit(1);
    }
}

start();

