const mongoose= require("mongoose")
const mongoDBURL = process.env.MONGO_URL

module.exports.connection = async () => {
    try{        
        await mongoose.connect(mongoDBURL);   
        console.log("MongoDB connected");    
    } catch (error) {
        console.log("MongoDB connection error: " + error);
        process.exit(1);
  }
}
