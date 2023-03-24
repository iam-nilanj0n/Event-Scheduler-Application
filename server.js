const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8001;
const mongoose = require('mongoose');
const dotEnv = require('dotenv')
dotEnv.config()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// connecting with mongoDB

mongoose.connect(process.env.DATABASE_MONGODB_COMPASS).then(()=>{
    try {
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
    }
})

//routing
const eventRoute = require('./routes/eventRoute')
app.use(eventRoute)
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT:${PORT}`);
})