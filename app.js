const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport")
const MongoStore = require('connect-mongo')(session);
const path = require('path')



// route imports
const authRouter = require('./routes/auth_routes')
const userRouter = require('./routes/user_routes')
const weekRouter = require('./routes/week_routes')
const employeeRouter = require('./routes/employee_routes')

// initiating server
const port = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.use(bodyParser.json());


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Connecting to mongodb database
const dbConn = process.env.MONGODB_URI
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    }
);

// initialing authentication through passportLocalMongoose
app.use(session({
    // resave and saveUninitialized set to false for deprecation warnings
    secret: "Express is awesome",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 18000000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter)
app.use('/api/weeks', weekRouter)
app.use('/api/employees', employeeRouter)


// Deployment redirect to static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));    
}
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


// Server start
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});