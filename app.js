const express= require('express');
const ejs= require('ejs');
const morgan = require('morgan');
const connectionRoutes = require('./routes/connectionroutes');
const mongoose = require('mongoose');
const mainRoutes = require('./routes/mainroutes');
const userRoutes = require('./routes/userRoutes');
const model = require('./models/user')
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();


//configure app
const app=express();
let port=8080;
let host='localhost';
let url = process.env.MONGODB_URI;
app.set('view engine','ejs');

//connext to MongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
.then(()=>{
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err.message));

app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: process.env.MONGODB_URI}),
        cookie: {maxAge: 60*60*1000}
        })
);

app.use(flash());

app.use((req, res, next) => {
    
    res.locals.user = req.session.user||null;
    if(res.locals.user)
    {
        model.findById(res.locals.user)
        .then(user=>{   
            res.locals.userName = user.firstName;
            console.log(res.locals.userName);
            next();
        })
        .catch(err=>next(err));
        res.locals.errorMessages = req.flash('error');
        res.locals.successMessages = req.flash('success');
    }
    else{
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
    }
});


// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes

app.use('/',mainRoutes);

app.use('/connections',connectionRoutes);

app.use('/users',userRoutes);

app.use((req,res,next)=>{
    let err = new Error('The server cannot locate '+req.url);
    err.status=404;
    next(err);
});

app.use((err,req,res,next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status=500;
        err.message='Internal server error';
    }
    res.status=err.status;
    res.render('error',{error: err});
});






