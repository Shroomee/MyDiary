const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(cors());
app.use(bodyParser.json());


//database connection
mongoose.connect('mongodb://localhost:27017/MyDiary', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//api routes
const diaryRoutes = require('./routes/diary');
app.use('/api/diary', diaryRoutes);

//start server
app.listen(port, () => {
    console.log('Server started at port: ' + port);
});