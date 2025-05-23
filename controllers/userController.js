const model = require('../models/user');
const Connection = require('../models/Connection');
const rsvpModel = require('../models/rsvp');
exports.new = (req, res)=>{
    console.log("Sign Up Page");
        return res.render('./user/new');
};

exports.create = (req, res, next)=>{
    
    let user = new model(req.body);
    console.log(user);
    if(user.email)
        user.email = user.email.toLowerCase();
    user.save()
    .then(user=> {
        req.flash('success', 'Registration succeeded!');
        res.redirect('/users/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('back');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('back');
        }
        next(err);
    }); 
    
};

exports.getUserLogin = (req, res, next) => {
    console.log("login Page");
        return res.render('./user/login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    if(email)
        email = email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.session.username = user.firstName + " " + user.lastName;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'wrong password'); 
                req.flash('You must log in first!');    
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Connection.find({host: id}) ,  rsvpModel.find({user: id}).populate('connection',' title topic') ])
    .then(results=>{
        const [user,connections,rsvps] = results;
       // console.log(user);
        req.flash('User has not created any New Connections');
        console.log(rsvps);
        res.render('./user/profile', {user, connections, rsvps});
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
            req.flash('You must log in first!'); 
    });
   
 };



