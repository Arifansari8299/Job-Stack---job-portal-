import mongoose from "mongoose";
const connectDB = async (req, res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully')
    }
    catch(err){
        console.log('something error while connecting db',err)
    }
}
export default connectDB;