import express from 'express';
import authRoute from './routes/authRoutes.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json())
const MONGOURL="mongodb://localhost:27017/paymentApp"

app.get("/", (req, res) => {
    res.json({
        "message":"Hey dude"
    })
})

const connect=async()=>{
    try{
        await mongoose.connect(MONGOURL);
        console.log("Connected to MongoDB")
    }catch(e){
        console.log(e.message)

    }
}

app.use("/api/auth",authRoute)

app.listen(5000, () => {
    connect();
    console.log("Server is running on port 3000")
})

