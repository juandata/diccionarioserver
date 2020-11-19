const schemas = require('./schemas')
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo", {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//creating models, ver si se pueden agregar despues
const signupInput = mongoose.model("signupInput", schemas.blogSchema);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('estamos conectados a la base de datos');

  const kittySchema = new mongoose.Schema({
    name: String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'\\




const fluffy = new Kitten({ name: 'fluffy' });

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('fluffy saved in mongodb');
  });

});