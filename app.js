const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');



// Bring in the database object
const config = require('./config/database');

// Mongodb Config
mongoose.set('useCreateIndex', true);

// Connect with the database
mongoose.connect(config.database, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Databse connected successfully...! ' + config.database);
    }).catch(err => {
        console.log('Unable to connect with the database', err);
    });

    // Initialize the app
const app = express();

// Defining the PORT
const PORT = process.env.PORT || 5000;

// Defining the Middlewares
app.use(cors());

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    return res.json({
        message: "This is node.js role based authentication system"
    });
});

// Create a custom middleware function
const checkUserType = function (req, res, next) {
    const userType = req.originalUrl.split('/')[2];
    // Bring in the passport authentication starategy
    require('./config/passport')(userType, passport);
    next();
};

app.use(checkUserType);




// Bring in the user routes
const users = require('./routes/users');
app.use('/api/users', users);

const postRoutes= require('./routes/post');
 app.use('/api/posts', postRoutes);

//  app.post('/post-feedback', function (req, res) {
//     dbConn.then(function(db) {
//         delete req.body._id; // for safety reasons
//         db.collection('feedbacks').insertOne(req.body);
//     });    
//     res.send('Data received:\n' + JSON.stringify(req.body));
// });

// app.get('/view-feedbacks',  function(req, res) {
//     dbConn.then(function(db) {
//         db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
//             res.status(200).json(feedbacks);
//         });
//     });
// });


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

