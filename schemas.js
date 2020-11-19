const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const blogSchema = new Schema({
  email:  String, // String is shorthand for {type: String}
  firstName: String,
  lastName:   String,
  password:   String,

});
//const Blog = mongoose.model('Blog', blogSchema);

module.exports = {blogSchema};

  /**  comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
    favs:  Number
  } */