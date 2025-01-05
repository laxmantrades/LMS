const mongoose = require("mongoose");
const ConnectDB = async () => {

  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db Connected Succefully");
    
  } catch (error) {
    console.log(error);
  }
};

module.exports=ConnectDB