import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({})
const app = express()
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOptions))


app.get('/',(req,res)=>{
    res.send("basis server")
});
app.get('/home',(req,res)=>{
    return res.status(200).json({
        message:"I am coming from backend",
        success:true
    })
});


app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running at port ${PORT}`)
})