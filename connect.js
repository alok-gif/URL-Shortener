const mongoose = require('mongoose');

async function connectToDB(url){
    try{
        await mongoose.connect(url);
        console.log("connected to DB");
    }catch(error){
        console.log("failed to connect, error", error);
    }
}

module.exports=connectToDB;