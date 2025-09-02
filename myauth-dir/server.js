const express=require('express');
const cors=require('cors');
require('dotenv').config();

const auth=require('./routes/auth');

const connectDB = require('./db');

const app=express();

app.use(express.json());
app.use(cors());

connectDB();
app.use('/api',auth);

const PORT=process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server Running on PORT ${PORT}`))