import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(express.json({extended: true, limit: "30mb"}));
app.use(express.urlencoded({extended: true, limit: "30mb"}))
app.use(cors());

app.use('/posts', postRoutes)
app.use('/user', userRoutes)



;(async () => {
    try {
        await mongoose.connect(`${process.env.CONNECTION_URL}/socialapp`);
        console.log(`\n Mongo DB connected`);
        app.listen(process.env.PORT || 5000, () => {
            console.log(`server running on port: ${process.env.PORT || 5000}`);
        })
    } catch (error) {
        console.log("MONGODB connection error: ", error);
        process.exit(1)
    }
})()
