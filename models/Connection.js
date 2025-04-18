const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    topic: {type: String, enum:['Innovation Zone','Dusk-to-Dawn Events','Marathon','Arts','Others'],required: [true, 'topic is required']},
    title: {type: String, required: [true, 'title is required']},
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    details: {type: String, required: [true, 'details is required']},
    place: {type: String, required: [true, 'place is required']},
    startTime: {type: Date, required: [true, 'start time is required']},
    endTime: {type: Date, required: [true, 'end time is required']},
    image: {type: String, required: [true, 'imageUrl is required']}
},
{tiimestamps: true});

module.exports = mongoose.model('Connection',connectionSchema);




// const {v4: uuidv4} = require('uuid');

// const connections=[{
//     id: '1',
//     topic: 'Innovation Zone',
//     title: 'Startup Showcases', 
//     host: 'UNC Charlotte',
//     details: 'A platform where budding entrepreneurs present innovative products and ideas to investors and audiences.',
//     where: 'University Career center',
//     when: '2024-10-15',
//     start: '17:30',
//     end: '19:30',
//     image: '/images/StartupShowcases.jpg'
// },
// {
//     id: '2',
//     topic: 'Innovation Zone',
//     title: 'Tech Hackathons', 
//     host: 'UNC Charlotte',
//     details: 'Competitive coding events where teams develop software or hardware solutions within a short time frame.',
//     where: 'University Career center',
//     when: '2024-10-21',
//     start: '10:00',
//     end: '12:30',
//     image: '/images/TechHackathons.jpg'
// },
// {
//     id: '3',
//     topic: 'Innovation Zone',
//     title: 'VR Experiences', 
//     host: 'UNC Charlotte',
//     details: 'Immersive digital environments created using Virtual Reality technology for entertainment, education, or training.',
//     where: 'Cone Building',
//     when: '2024-10-23',
//     start: '20:00',
//     end: '21:30',
//     image: '/images/VR.jpg'
// },
// {
//     id: '4',
//     topic: 'Dusk-to-Dawn Events',
//     title: 'Star-Gazing Party', 
//     host: 'UNC Charlotte',
//     details: 'An outdoor event where participants observe celestial bodies using telescopes, often accompanied by guided astronomy discussions.',
//     where: 'Grigg Hall',
//     when: '2024-10-26',
//     start: '16:00',
//     end: '18:00',
//     image: '/images/Starparty.jpg'
// },
// {
//     id: '5',
//     topic: 'Dusk-to-Dawn Events',
//     title: 'Late-Night Comedy Jam', 
//     host: 'UNC Charlotte',
//     details: 'A live comedy event featuring stand-up acts and improv, typically held during late evening hours for a casual and fun atmosphere.',
//     where: 'Cato Building',
//     when: '2024-10-28',
//     start: '10:00',
//     end: '22:00',
//     image: '/images/latenightcomedy.jpg'
// },
// {
//     id: '6',
//     topic: 'Dusk-to-Dawn Events',
//     title: 'Glow-in-the-Dark Dance Party', 
//     host: 'UNC Charlotte',
//     details: 'A vibrant event where participants dance in a darkened space illuminated by neon and fluorescent lighting for a unique visual experience.    ',
//     where: 'Duke Centinnial Hall',
//     when: '2024-10-30',
//     start: '9:00',
//     end: '13:00',
//     image: '/images/glowinthedark.jpg'
// }]; 

// exports.find = function(){
//     return connections;
// }

// exports.findTopics = function(){
//     let topics=[];
//     connections.forEach(connection => {
//         if(topics.indexOf(connection.topic)==-1)
//         {
//             topics.push(connection.topic);
//         }
//     });
//     topics.sort();
//     console.log(topics);
//     return topics;
// }

// exports.findById = function(id){
//     return connections.find(connection=> connection.id===id);
// };

// exports.save = function(connection){
//     connection.id=uuidv4();
//     connections.push(connection);
// };

// exports.updateById = function(id, newConnection){
//     let connection = connections.find(connection=> connection.id===id);

//     if(connection){
//         connection.topic=newConnection.topic;
//         connection.title=newConnection.title;
//         connection.host=newConnection.host;
//         connection.details=newConnection.details;
//         connection.when=newConnection.when;
//         connection.where=newConnection.where;
//         connection.start=newConnection.start;
//         connection.end=newConnection.end;
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// exports.deleteById = function(id){
//     let idx = connections.findIndex(connection=>connection.id===id);
    
//     if(idx!=-1)
//     {
//         console.log(idx);
//         connections.splice(idx,1);
//         return true;
//     }
//     else{
//         return false;
//     }
// }