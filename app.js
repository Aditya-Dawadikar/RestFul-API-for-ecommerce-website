const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//require the route handlers
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');
const userRoutes = require('./api/routes/user.js');

//connect to database
mongoose.connect("mongodb+srv://chandler:" + process.env.DB_PASSWORD + "@cluster0-m728u.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//handling cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-with, Control-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//middleware to handle the requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//handling unwanted routes
app.use((req, res, next) => {
        const error = new Error('not found');
        error.status = 404;
        next(error);
    })
    //universal error handler for the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;