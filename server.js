import express from 'express';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js'; 
import mongoose from 'mongoose';

//gitup
const path = require('path');

//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Define a route for the root path
app.get('/', (req, res) => {
    res.status(200).send('Message : Welcome to Blood Bank App');
});

// Define routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);

//Static Floder
app.use(express.static(path.join(__dirname,'./client/build')));

//Static Routes
app.get('*', function(req,res){
    res.sendFile(path,join(__dirname,'./client/build/index.html'));
})

//port
const PORT = process.env.PORT || 8080;

// Start the server
//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
        .bgBlue.white
     );
});
