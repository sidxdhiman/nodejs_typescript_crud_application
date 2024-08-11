import mongoose from "mongoose"

const mongoDB = "mongodb://localhost:27017/node_chil";

export const connection = mongoose.connect(mongoDB, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
  });
  
  const userSchema = new mongoose.Schema({
    userId:Number,
    name:String,
    email:String,
    password:String
  });
  
  const User = mongoose.model("users", userSchema);

export default User;

