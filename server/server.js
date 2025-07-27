import express from 'express'
const app = express()
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("basis server")
})


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})