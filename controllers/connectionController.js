const model = require('../models/connection')
const rsvpModel = require('../models/rsvp');
const{DateTime} = require('luxon')


exports.index = (req,res)=>{
    model.find({}).sort({topic: 'asc'})
    .then(connections=>{
        let topics=[];
        let j=0;
        for(let i=0;i<connections.length;i++)
        {
            if(j==0 || topics[j-1]!=connections[i].topic)
            {
                topics[j]=connections[i].topic;
                j++;
            }
        }
        res.render('./connection/connections',{connections: connections, topics: topics});
    })
    .catch(err=>next(err));
};

exports.show = (req,res,next)=>{
    let id = req.params.id;
    let user = req.session.user;
    console.log(user);
    

    
    
    Promise.all([
        model.findById(id).populate('host', 'firstName lastName'),
        rsvpModel.find({ connection: id, rsvp:'yes' }),
      ])
    .then((results)=>{
        const [connection, rsvps] = results;
        console.log(rsvps);
        if(connection){
            //console.log(connection.id);
            let isAuthor = req.session.user == connection.host._id;
            return res.render('./connection/connection',{connection, isAuthor, rsvps});
        }
        else{
            let err = new Error('Cannot find the connection with id '+ id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.new = (req,res)=>{
    res.render('./connection/newConnection');
};

exports.create = (req,res,next)=>{
    
    let connection = new model(req.body);
    connection.host = req.session.user;
    console.log(connection);
    if(req.file)
    {
        let image =  "/images/" + req.file.filename;
        connection.image=image;
    }
    
    connection.save()
    .then(connection=>{
        req.flash('success', 'Connection has been created successfully');
        res.redirect('./connections')
    })
    .catch(err=>{
        if(err.name==='ValidationError')
        {
            req.flash('error',err.message);
            return res.redirect('/back');
            //err.status=404;
        }
        next(err);
    });
    
};

exports.edit = (req,res,next)=>{
    let id = req.params.id;

   

    model.findById(id).lean()

    .then(connection=>{
 
        if(connection)
 
        {
            console.log(connection.startTime+", "+connection.endTime);
            let start_time = DateTime.fromJSDate(connection.startTime);
            let end_time = DateTime.fromJSDate(connection.endTime);
 
            connection.startTime =  start_time.toFormat('yyyy-MM-dd\'T\'HH:mm');
            connection.endTime =  end_time.toFormat('yyyy-MM-dd\'T\'HH:mm');
            

            req.flash('success', 'Connection has been edited successfully');
            res.render('./connection/edit',{connection: connection});
 
        }
 
        else{

            req.flash('error',err.message);
            let err= new Error('Cannot find the connection with id '+id);
 
            err.status=404;
 
            next(err);
 
        }
 
    })
 
    .catch(err=>next(err));
}

exports.update = (req,res,next)=>{
    let id = req.params.id;
    let connection = req.body;
    

    model.findByIdAndUpdate(id,connection,{userFindAndModify: false, runValidaters: true})
    .then(connection=>{
        if(connection)
        {
            req.flash('success', 'Connection has been updated successfully');
            res.redirect('/connections/'+id);
        }
        else{

            req.flash('error',err.message);
            let err= new Error('Cannot find the connection with id '+id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

exports.delete = (req,res,next)=>{
    let id = req.params.id;
    console.log(id);

    Promise.all([
        model.findByIdAndDelete(id),
        rsvpModel.deleteMany({connection: id})
      ])
    .then(results=>{
        const[connection,rsvp]=results;
        if(connection && rsvp)
        {
            req.flash('success', 'Connection has been deleted successfully');
            res.redirect('/connections');
        }
        else
        {
            let err= new Error('Cannot find the connection with id '+id);
            err.status=404;
            next(err);
        }
    })
    .catch(err=>next(err));
}



exports.editRsvp = (req, res, next) => {
    const connectionId = req.params.id;
    const userId = req.session.user;

    // Ensure findOne matches both user and connection
    rsvpModel.findOne({ connection: connectionId, user: userId })
        .then(rsvp => {
            if (rsvp) {
                // Update existing RSVP
                rsvp.rsvp = req.body.rsvp;
                return rsvp.save()
                    .then(() => {
                        req.flash('success', 'Successfully updated RSVP');
                        res.redirect('/users/profile');
                    })
                    .catch(err => {
                        if (err.name === 'ValidationError') {
                            req.flash('error', err.message);
                            return res.redirect('back');
                        }
                        next(err);
                    });
            } else {
                // Create a new RSVP if none exists
                const newRsvp = new rsvpModel({
                    connection: connectionId,
                    rsvp: req.body.rsvp,
                    user: userId,
                });
                return newRsvp.save()
                    .then(() => {
                        req.flash('success', 'Successfully created RSVP');
                        res.redirect('/users/profile');
                    })
                    .catch(err => {
                        if (err.name === 'ValidationError') {
                            req.flash('error', err.message);
                            return res.redirect('back');
                        }
                        next(err);
                    });
            }
        })
        .catch(err => {
            console.error('Error finding RSVP:', err);
            next(err);
        });
};





















