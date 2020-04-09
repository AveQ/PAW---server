const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const vehicleRoutes = require('./api/routes/vehicles')
const userRoutes = require('./api/routes/user');
const historyRoutes = require('./api/routes/history');


var allowedOrigins = ['http://localhost:3001',
                      'http://yourapp.com'];

mongoose.connect('mongodb+srv://admin:' + 
    process.env.MONGO_ATLAS_PW + 
    '@paw-project-ifjum.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//morgan
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

//body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//headers
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

// app.use(cors({
//     origin: function(origin, callback){
//       // allow requests with no origin 
//       // (like mobile apps or curl requests)
//       if(!origin) return callback(null, true);
//       if(allowedOrigins.indexOf(origin) === -1){
//         var msg = 'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   }));

// routes
app.use('/vehicles', vehicleRoutes);
app.use('/user', userRoutes);
app.use('/history', historyRoutes);


//handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;